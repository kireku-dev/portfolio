// Client runtime for the datacenter figure: one loop per figure that turns the
// rack, slides the sled, spins the roof fans and blinks the port and drive LEDs,
// all from the same model the readout prints.

import { TURN } from "../anatomy/turn.mjs";
import { loadAt, stateAt, blinkHz, readoutOf, detailOf } from "./model.mjs";
import { follow, storyAt, explodeAt, cameraAt, travelAt, sceneOf, STORY_ANGLE, SCENES, SIDES, clamp, smooth } from "./scenes.mjs";
const hash = (a, b) => {
  let h = (a * 374761393 + b * 668265263) | 0;
  h = Math.imul(h ^ (h >>> 13), 1274126177);
  return ((h ^ (h >>> 16)) >>> 0) / 4294967296;
};

// Idle tour: turn a little, pull the sled out, hold so the reader can look inside,
// slide it home, turn the other way and hold again. During the holds nothing is
// re-projected, so the figure costs only its LEDs and fans.
const TOUR = [
  // [time s, angle °, sled open 0/1]
  [0, 0, 0],
  [2.8, 14, 0],
  [3.6, 14, 1],
  [10.5, 14, 1],
  [11.3, 14, 0],
  [14.5, -16, 0],
  [19.5, -16, 0],
  [22.5, 0, 0],
  [24, 0, 0],
];
const TOUR_LENGTH = TOUR[TOUR.length - 1][0];
const tourAt = (t) => {
  const p = t % TOUR_LENGTH;
  let i = 1;
  while (i < TOUR.length - 1 && TOUR[i][0] < p) i++;
  const [t0, a0, o0] = TOUR[i - 1];
  const [t1, a1, o1] = TOUR[i];
  const u = smooth(clamp((p - t0) / (t1 - t0 || 1), 0, 1));
  return { angle: a0 + (a1 - a0) * u, open: u < 0.5 ? o0 : o1 };
};
export function mountDatacenter(root) {
  if (root.dataset.mounted) return root.__dcx;
  root.dataset.mounted = "1";
  const data = JSON.parse(root.querySelector("script[data-dcx]").textContent);
  const stage = root.querySelector(".dcx-stage");
  const readout = root.querySelector("[data-readout]");
  const detail = root.querySelector("[data-detail]");
  const announcer = root.querySelector("[data-announce]");
  const sceneText = root.querySelector("[data-scene-text]");
  const sceneTitle = root.querySelector("[data-scene-title]");
  const sceneFig = root.querySelector("[data-scene-fig]");
  const world = stage.querySelector(".dcx-world");
  const layers = [...stage.querySelectorAll(":scope > svg")];
  const scenes = JSON.parse(root.querySelector("script[data-dcx-scenes]")?.textContent ?? "[]");
  const still = matchMedia("(prefers-reduced-motion: reduce)");
  const [lo, hi] = data.range;

  let touring = !still.matches;
  let tourClock = 0;
  let simClock = 0;
  let angle = 0;
  let angleTarget = 0;
  const open = { x: 0, v: 0 };
  let openTarget = 0;
  let drawn = { angle: null, open: null };
  let frame = 0;
  let last = 0;
  let visible = false;
  let idle = 0;
  let hovering = false;
  let drag = null;
  let fanTurn = 0;
  let readoutAt = 0;
  // Scroll story: the page sets p (0 hero, 1…5 chapters); the scenes run on s = p − 1 (0…4).
  let place = 0;
  let placeTarget = 0;
  let story = 0;
  let storyTarget = 0;
  // Beside the text on wide screens the figure crosses the page; pinned on top it only drifts.
  const wide = matchMedia("(min-width: 1081px)");
  let travelKey = "";
  const scrolled = () => story > 0.02 || storyTarget > 0.02;
  const steps = (data.steps ?? []).map((key) => {
    const scene = key[0];
    const siblings = data.steps.filter((other) => other[0] === scene);
    return { key, scene, index: siblings.indexOf(key), count: siblings.length, value: -1 };
  });
  let camera = "";
  let sceneIndex = 0;
  let announced = "";
  let announceTimer = 0;

  let own = false;
  let held = false; // a tool (window.__isoTurn) holds the figure: freeze LEDs and fans too
  const controller = TURN.mount(stage, data.turn, {
    follow,
    // A tool driving window.__isoTurn holds the figure where it put it.
    onHold: () => {
      touring = false;
      held = true;
      clearTimeout(idle);
    },
    onFrame: (turned) => {
      if (own) return;
      angle = angleTarget = turned.values.rack ?? angle;
      open.x = openTarget = (turned.values.sled ?? open.x * data.travel) / data.travel;
      open.v = 0;
      drawn = { angle, open: open.x };
    },
  });

  const ledEls = new Map();
  for (const el of stage.querySelectorAll(".dcx-led")) ledEls.set(Number(el.dataset.led), el);
  const leds = data.leds.map(([id, kind]) => ({ id, kind, el: ledEls.get(id), on: null }));
  const rotors = [...stage.querySelectorAll(".dcx-rotor")];

  // Adaptive half rate: when re-projecting costs more than ~14 ms (a slow phone), the
  // live layer is redrawn every other frame; motion stays time-based either way.
  let cost = 0;
  let skip = false;
  // The story's share of each step of the world layer: assemblies arrive one after another.
  const paintWorld = (at, calm) => {
    if (!world) return;
    const shares = { n: at.network, d: at.desk, l: at.links };
    for (const step of steps) {
      const share = shares[step.scene] ?? 0;
      const lead = (step.index / (step.count + 1)) * 0.6;
      const value = calm ? (share > 0.5 ? 1 : 0) : Math.round(smooth((share - lead) / 0.4) * 1000) / 1000;
      if (value !== step.value) {
        world.style.setProperty(`--${step.key}`, String(value));
        step.value = value;
      }
    }
    world.toggleAttribute("data-flowing", !calm && (at.network > 0.95 || at.links > 0.6));
    const frame = cameraAt(data.frames, at.camera)
      .map((v) => v.toFixed(1))
      .join(" ");
    if (frame !== camera) {
      camera = frame;
      for (const svg of layers) svg.setAttribute("viewBox", frame);
    }
  };
  // The figure's place on the page: one transform on the figure, no layout reads.
  const paintTravel = (go, calm) => {
    let transform;
    if (wide.matches) {
      const scale = calm ? 1 : go.scale;
      transform = `translate3d(${(go.side * 100).toFixed(2)}%, ${(calm ? 0 : -go.lift * 10).toFixed(1)}px, 0) scale(${scale.toFixed(4)})`;
    } else transform = `translate3d(${((go.side - 0.5) * (calm ? 0 : 12)).toFixed(1)}px, 0, 0)`;
    if (transform !== travelKey) {
      travelKey = transform;
      root.style.transform = transform;
    }
  };
  // The live rack is re-projected only when its group values change; the world layer and the
  // camera are cheap attribute writes and follow the story every frame.
  let groupsKey = "";
  const draw = (force = false) => {
    const at = storyAt(story);
    const key = `${angle}|${open.x}|${place}`;
    if (!force && drawn.key === key) return;
    const calm = still.matches;
    const go = travelAt(calm ? Math.round(place) : place);
    const values = explodeAt(at.explode);
    values.sled = Math.max(open.x * data.travel, values.sled);
    values.rack = clamp(angle + (STORY_ANGLE - angle) * at.turn + (calm || !wide.matches ? 0 : go.swing), -27, 27);
    paintTravel(go, calm);
    const next = Object.values(values)
      .map((v) => v.toFixed(3))
      .join("|");
    if (force || next !== groupsKey) {
      if (!force && cost > 14 && (skip = !skip)) return;
      const t0 = performance.now();
      own = true;
      controller.set(values);
      own = false;
      groupsKey = next;
      const ms = performance.now() - t0;
      cost = cost ? cost * 0.85 + ms * 0.15 : ms;
      if (cost < 9) skip = false;
    }
    paintWorld(at, still.matches);
    drawn = { angle, open: open.x, key };
  };

  const paintModel = (dt, calm, now) => {
    simClock += dt;
    const state = stateAt(loadAt(simClock));
    // Roof fans follow the server fans' duty, slowed to a speed the eye can follow.
    if (!calm) {
      fanTurn = (fanTurn + dt * (state.rpm / 16800) * 260) % 360;
      for (const rotor of rotors) rotor.setAttribute("transform", `rotate(${fanTurn.toFixed(1)})`);
    }
    for (const led of leds) {
      if (!led.el) continue;
      let on = 1;
      if (!calm && (led.kind === "port" || led.kind === "uplink" || led.kind === "drive")) {
        const share = led.kind === "uplink" ? 0.5 : led.kind === "port" ? 0.12 : 0.2;
        const hz = blinkHz(state.rps, share);
        const step = Math.floor(simClock * hz + led.id * 0.37);
        on = hash(led.id, step) < 0.25 + 0.65 * state.load ? 1 : 0.18;
      } else if (led.kind === "status" || led.kind === "power") on = 0.75;
      if (led.on !== on) {
        led.el.style.opacity = String(on);
        led.on = on;
      }
    }
    if (now - readoutAt > 240 || calm) {
      readoutAt = now;
      const text = readoutOf(state, Math.max(open.x, explodeAt(storyAt(story).explode).sled / data.travel));
      if (readout.textContent !== text) readout.textContent = text;
      const more = detailOf(state);
      if (detail && detail.textContent !== more) detail.textContent = more;
    }
  };

  // One description per scene, for the slider's text and the polite announcer.
  const showScene = (index) => {
    if (index === sceneIndex || !scenes[index]) return;
    sceneIndex = index;
    const scene = scenes[index];
    root.dataset.scene = SCENES[index];
    if (sceneText) sceneText.textContent = scene.description;
    if (sceneTitle) sceneTitle.textContent = scene.title;
    if (sceneFig) sceneFig.textContent = scene.fig;
    describe();
    clearTimeout(announceTimer);
    announceTimer = setTimeout(() => {
      if (announcer && announcer.textContent !== scene.description) announcer.textContent = announced = scene.description;
    }, 700);
  };
  const describe = () => {
    const where = openTarget > 0.5 ? "Servidor 07 fuera del rack, sin tapa" : "Servidor 07 dentro del rack";
    stage.setAttribute("aria-valuenow", String(Math.round(angleTarget)));
    if (sceneIndex > 0 && scenes[sceneIndex]) stage.setAttribute("aria-valuetext", scenes[sceneIndex].description);
    else stage.setAttribute("aria-valuetext", `${where}; giro ${Math.round(angleTarget)} grados`);
  };
  const announce = () => {
    clearTimeout(announceTimer);
    announceTimer = setTimeout(() => {
      const text = `${openTarget > 0.5 ? "Servidor 07 abierto" : "Servidor 07 en el rack"}, giro ${Math.round(angleTarget)}°`;
      if (text !== announced && announcer) announcer.textContent = announced = text;
    }, 700);
  };

  function tick(now) {
    const dt = last ? Math.min((now - last) / 1000, 1 / 30) : 1 / 60;
    last = now;
    const calm = still.matches;
    // Ease toward the scroll target; scrolling owns the rack once the story has begun.
    if (calm) place = placeTarget;
    else {
      place += (placeTarget - place) * (1 - Math.exp(-dt / 0.09));
      if (Math.abs(placeTarget - place) < 1e-3) place = placeTarget;
    }
    story = sceneOf(place);
    if (scrolled()) {
      touring = false;
      openTarget = 0;
    }
    if (touring && !calm) {
      tourClock += dt;
      const at = tourAt(tourClock);
      angleTarget = at.angle;
      openTarget = at.open;
    }
    if (calm) {
      angle = angleTarget;
      open.x = openTarget;
      open.v = 0;
    } else {
      angle += (angleTarget - angle) * (1 - Math.exp(-dt / (drag ? 0.12 : 0.4)));
      if (Math.abs(angleTarget - angle) < 0.01) angle = angleTarget;
      // Critically damped spring on the slides, 0.32 s.
      const w = 1 / 0.32;
      for (let i = 0; i < 4; i++) {
        open.v += (w * w * (openTarget - open.x) - 2 * w * open.v) * (dt / 4);
        open.x += open.v * (dt / 4);
      }
      if (Math.abs(openTarget - open.x) < 1e-4 && Math.abs(open.v) < 1e-4) {
        open.x = openTarget;
        open.v = 0;
      }
      open.x = clamp(open.x, 0, 1);
    }
    draw();
    if (!held) paintModel(dt, calm, now);
    frame = visible && !calm ? requestAnimationFrame(tick) : 0;
    showScene(Math.round(story));
  }
  const run = () => {
    if (!frame && visible) {
      last = 0;
      frame = requestAnimationFrame(tick);
    }
  };
  const once = () => {
    // Reduced motion: no loop; jump to the targets and paint one still frame.
    place = placeTarget;
    story = storyTarget;
    if (scrolled()) openTarget = 0;
    showScene(Math.round(story));
    angle = angleTarget;
    open.x = openTarget;
    open.v = 0;
    draw(true);
    paintModel(0, true, performance.now());
  };
  const kick = () => (still.matches ? once() : run());
  const hold = () => {
    touring = false;
    clearTimeout(idle);
    idle = setTimeout(() => {
      if (hovering || drag || scrolled()) return;
      touring = !still.matches;
      tourClock = 0;
      kick();
    }, 3600);
  };
  const steer = (next) => {
    held = false;
    hold();
    if (next.angle !== undefined) angleTarget = clamp(next.angle, lo, hi);
    if (next.open !== undefined) openTarget = next.open;
    describe();
    announce();
    kick();
  };

  new IntersectionObserver(
    (entries) => {
      visible = entries[entries.length - 1].isIntersecting;
      if (visible) kick();
      else if (frame) {
        cancelAnimationFrame(frame);
        frame = 0;
      }
    },
    { rootMargin: "120px 0px" },
  ).observe(stage);
  still.addEventListener?.("change", () => {
    touring = !still.matches;
    if (still.matches) {
      if (frame) cancelAnimationFrame(frame);
      frame = 0;
      once();
    } else kick();
  });

  stage.addEventListener("pointerenter", (event) => {
    if (event.pointerType !== "mouse" || scrolled()) return;
    hovering = true;
    steer({ open: 1 });
  });
  stage.addEventListener("pointerleave", (event) => {
    if (event.pointerType !== "mouse") return;
    hovering = false;
    if (!drag) steer({ open: 0 });
  });
  stage.addEventListener("pointerdown", (event) => {
    if ((event.button !== undefined && event.button !== 0) || scrolled()) return;
    drag = { id: event.pointerId, x: event.clientX, base: angle, captured: false, type: event.pointerType };
    hold();
  });
  stage.addEventListener("pointermove", (event) => {
    if (!drag || event.pointerId !== drag.id) return;
    const dx = event.clientX - drag.x;
    if (!drag.captured && Math.abs(dx) > 4) {
      drag.captured = true;
      stage.setPointerCapture(event.pointerId);
      stage.setAttribute("data-drag", "");
    }
    if (!drag.captured) return;
    const width = stage.getBoundingClientRect().width || 600;
    steer({ angle: drag.base + (dx / width) * 150 });
  });
  const release = (event) => {
    if (!drag || event.pointerId !== drag.id) return;
    const tapped = !drag.captured;
    const touch = drag.type !== "mouse";
    if (drag.captured && stage.hasPointerCapture(event.pointerId)) stage.releasePointerCapture(event.pointerId);
    stage.removeAttribute("data-drag");
    drag = null;
    if (tapped && touch && event.type === "pointerup") steer({ open: openTarget > 0.5 ? 0 : 1 });
    else if (!hovering && event.type === "pointercancel") steer({});
    else hold();
  };
  stage.addEventListener("pointerup", release);
  stage.addEventListener("pointercancel", release);
  stage.addEventListener("keydown", (event) => {
    if (scrolled()) return;
    const step = event.shiftKey ? 15 : 5;
    // Step from the angle the reader sees, not from where the tour was heading.
    const from = touring ? angle : angleTarget;
    if (event.key === "ArrowLeft") steer({ angle: from - step });
    else if (event.key === "ArrowRight") steer({ angle: from + step });
    else if (event.key === "Enter" || event.key === " ") steer({ open: openTarget > 0.5 ? 0 : 1 });
    else if (event.key === "Escape") steer({ open: 0 });
    else if (event.key === "Home") steer({ angle: 0, open: 0 });
    else if (event.key === "End") steer({ angle: hi, open: 1 });
    else return;
    event.preventDefault();
  });
  stage.addEventListener("focus", () => {
    hold();
    if (announcer && !announcer.textContent) announcer.textContent = openTarget > 0.5 ? "Servidor 07 abierto" : "Servidor 07 en el rack";
  });

  describe();
  if (still.matches) {
    // A still frame that still shows the point of the figure: sled out, slight turn.
    angleTarget = 14;
    openTarget = 1;
    once();
    describe();
  } else paintModel(0, false, performance.now());

  // The page's scroll story drives the figure through this.
  const api = {
    setStory(next) {
      const target = clamp(next, 0, SIDES.length - 1);
      if (target === placeTarget) return;
      const was = scrolled();
      placeTarget = target;
      storyTarget = sceneOf(target);
      if (was && !scrolled()) hold(); // back in the hero: the idle tour resumes after a pause
      kick();
    },
  };
  wide.addEventListener?.("change", () => {
    travelKey = "";
    draw(true);
  });
  root.__dcx = api;
  return api;
}
