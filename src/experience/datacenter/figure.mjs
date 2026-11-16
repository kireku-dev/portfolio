// Rack kr-01: a 12U four-post rack on a turntable with one 2U compute sled
// pulled out on its slides, lid off. Built once (at Astro build time) with the
// anatomy kit (MIT, ../anatomy/LICENSE): every live part is a convex kit
// primitive that the 3D "turn" runtime re-projects when the reader drags.
//
// World units are about 5 mm. x runs back → front (the rack faces +x),
// y runs right → left as seen from the front, z is up. 1U = 8.9 units.

import * as k from "../anatomy/iso-kit.mjs";
import * as A from "../anatomy/audit.mjs";
import { turning } from "../anatomy/turn-build.mjs";

export const WIDTH = 640;
export const HEIGHT = 560;
export const AZIMUTH = 30;
export const ELEVATION = 32;
// Degrees the reader can turn the rack. With the camera at 30° this keeps every face of
// the rack between 3° and 57° from the view, so no large face ever turns edge-on.
export const TURN_RANGE = [-27, 27];
export const SLED_TRAVEL = 112; // full extension of the slides
export const U = 8.9;

const U1 = 13; // bottom of U1
const uz = (n) => U1 + (n - 1) * U; // bottom of unit n
const TOP_BAR = [126, 131];
const BASE_BAR = [6, 12];
const RAIL_X = [56, 60];
const BODY_X = [-68, 59.6];
const BEZEL_X = [59.6, 61.6];
const EAR_X = [60, 61.6];
const CH = 42; // chassis half width
const PLINTH_R = 108;
const PLATTER_R = 103;

const SLED_U = 7; // the sled fills U7–U8
const ZB = uz(SLED_U); // sled floor reference

export const P = (() => {
  const boxes = [
    [[-75, 75], [-60, 60], [0, 131]],
    [[59, 61.6 + 2.2 + SLED_TRAVEL], [-48.5, 48.5], [ZB, ZB + 18]],
  ];
  const pts = [];
  for (let a = TURN_RANGE[0]; a <= TURN_RANGE[1]; a += 2) {
    const r = (a * Math.PI) / 180;
    const c = Math.cos(r);
    const s = Math.sin(r);
    for (const [[x0, x1], [y0, y1], [z0, z1]] of boxes)
      for (const x of [x0, x1]) for (const y of [y0, y1]) for (const z of [z0, z1]) pts.push([x * c - y * s, x * s + y * c, z]);
  }
  for (let i = 0; i < 48; i++) {
    const t = (i / 48) * Math.PI * 2;
    pts.push([PLINTH_R * Math.cos(t), PLINTH_R * Math.sin(t), -14]);
  }
  return k.fitProjection(pts, WIDTH, HEIGHT, { pad: 18, azimuth: AZIMUTH, elevation: ELEVATION });
})();

export function buildDatacenter() {
  const R = A.recorder(P);
  const T = turning(P, { recorder: R });
  const rack = T.group("rack", { turn: { pivot: [0, 0] } });
  const sled = T.group("sled", { parent: rack, slide: { direction: [1, 0, 0], travel: SLED_TRAVEL } });
  const mid = T.group("mid", { parent: rack, slide: { direction: [1, 0, 0], travel: SLED_TRAVEL / 2 } });
  const live = T.layer("rack");
  T.stack(["back", "rack", "front"]);

  const leds = [];
  const fans = [];

  // ---- helpers -------------------------------------------------------------
  const box = (name, group, [x0, x1], [y0, y1], [z0, z1], o = {}) =>
    T.prism({ name, group, layer: live, plan: { x: x0, y: y0, w: x1 - x0, d: y1 - y0, r: o.r ?? 0 }, z: z0, h: z1 - z0, steps: o.steps ?? (o.r ? 2 : 1), tone: o.tone ?? "mid", crease: o.crease ?? "faint", lit: o.lit ?? false, bevel: o.bevel, owner: o.owner, details: o.details ?? {} });
  const vround = (name, group, [x, y], r, [z0, z1], o = {}) =>
    T.round({ name, group, layer: live, F: { o: [x, y, 0], a: [0, 0, 1], u: [1, 0, 0], v: [0, 1, 0] }, s0: z0, s1: z1, r, tone: o.tone ?? "mid", crease: o.crease ?? "faint", details: o.details ?? {} });
  const line = (d, tone = "lo", extra = "") => `<path class="iso-line" data-tone="${tone}"${extra} d="${d}"/>`;
  // A closed slot with round ends (a vent), w along local a, h across.
  const slot = (x, y, w, h, upright = false) =>
    upright
      ? `M${f(x)} ${f(y + h / 2)}A${f(h / 2)} ${f(h / 2)} 0 0 1 ${f(x + h)} ${f(y + h / 2)}V${f(y + w - h / 2)}A${f(h / 2)} ${f(h / 2)} 0 0 1 ${f(x)} ${f(y + w - h / 2)}Z`
      : `M${f(x + h / 2)} ${f(y)}H${f(x + w - h / 2)}A${f(h / 2)} ${f(h / 2)} 0 0 1 ${f(x + w - h / 2)} ${f(y + h)}H${f(x + h / 2)}A${f(h / 2)} ${f(h / 2)} 0 0 1 ${f(x + h / 2)} ${f(y)}Z`;
  const rect = (x, y, w, h) => `M${f(x)} ${f(y)}H${f(x + w)}V${f(y + h)}H${f(x)}Z`;
  const f = (v) => String(Math.round(v * 100) / 100);
  // Markup on the front face (normal +x): local a runs screen-left → right (−y), b runs down.
  const front = (part, x, [, y1], [, z1], svg) => T.plane({ part, o: [x, y1, z1], u: [0, -1, 0], v: [0, 0, -1], normal: [1, 0, 0], svg });
  const top = (part, [x0], [y0], z, svg) => T.plane({ part, o: [x0, y0, z], u: [1, 0, 0], v: [0, 1, 0], normal: [0, 0, 1], svg });
  const side = (part, [x0], y, [, z1], svg, sign = 1) =>
    T.plane({ part, o: [x0, y, z1], u: [1, 0, 0], v: [0, 0, -1], normal: [0, sign, 0], svg });
  const led = (part, at, normal, kind, extra = {}) => {
    const id = leds.length;
    leds.push({ id, kind, ...extra });
    T.billboard({ part, at, normal, fade: [0.05, 0.35], svg: `<g class="dcx-led" data-led="${id}" data-kind="${kind}"><circle class="dcx-led-glow" r="2.4"/><circle class="dcx-led-core" r="0.85"/></g>` });
  };

  // ---- rack frame ------------------------------------------------------------
  vround("platter", rack, [0, 0], PLATTER_R, [-4, 0], { tone: "lo" });
  for (const sx of [-1, 1])
    for (const sy of [-1, 1]) {
      vround(`foot.pad.${sx}${sy}`, rack, [72 * sx, 57 * sy], 3.6, [0, 1.6], { tone: "lo" });
      vround(`foot.stem.${sx}${sy}`, rack, [72 * sx, 57 * sy], 1.5, [1.6, BASE_BAR[0]], { tone: "mid" });
    }
  for (const [zr, tag] of [[BASE_BAR, "base"], [TOP_BAR, "top"]]) {
    // Long frame bars are cut (unstroked) so no bar spans the whole drawing in the painter's order.
    T.split(box(`${tag}.front`, rack, [69, 75], [-60, 60], zr, { bevel: 0.4 }), { n: [0, 1, 0], d: 0 });
    T.split(box(`${tag}.back`, rack, [-75, -69], [-60, 60], zr, { bevel: 0.4 }), { n: [0, 1, 0], d: 0 });
    T.split(box(`${tag}.left`, rack, [-69, 69], [-60, -45], zr, { bevel: 0.4 }), { n: [1, 0, 0], d: 0 });
    T.split(box(`${tag}.right`, rack, [-69, 69], [45, 60], zr, { bevel: 0.4 }), { n: [1, 0, 0], d: 0 });
  }
  for (const sx of [-1, 1])
    for (const sy of [-1, 1]) {
      const xs = sx > 0 ? [69, 75] : [-75, -69];
      const ys = sy > 0 ? [54, 60] : [-60, -54];
      box(`upright.${sx}${sy}`, rack, xs, ys, [BASE_BAR[1], TOP_BAR[0]], { tone: "mid" });
    }
  // Mounting rails with square holes (three per U) and U boundaries.
  // Square holes (three per U) and U boundaries on a stretch of rail face from z0 up to z1.
  const railMarkup = (z0, z1) => {
    const width = 7;
    const holes = [];
    const ticks = [];
    for (let n = 1; n <= 12; n++)
      for (const t of [0.17, 0.5, 0.83]) {
        const zc = uz(n) + U - t * U;
        if (zc - 0.9 > z0 && zc + 0.9 < z1) holes.push(rect(width / 2 - 0.9, z1 - zc - 0.9, 1.8, 1.8));
      }
    for (let n = 1; n <= 13; n++) if (uz(n) > z0 && uz(n) < z1) ticks.push(`M0 ${f(z1 - uz(n))}H${width}`);
    return line(holes.join(""), "lo") + line(ticks.join(""), "faint");
  };
  // The front rails are cut (unstroked) just below and above the sled's slides, so the
  // slide members, the rail and the ears of the units below can always be ordered.
  const RAIL_CUTS = [ZB, ZB + 14.6];
  for (const sy of [-1, 1]) {
    const ys = sy > 0 ? [45, 52] : [-52, -45];
    const whole = box(`rail.front.${sy}`, rack, RAIL_X, ys, [BASE_BAR[1], TOP_BAR[0]], { tone: "mid" });
    const [low, rest] = T.split(whole, { n: [0, 0, 1], d: RAIL_CUTS[0] });
    const [midPiece, high] = T.split(rest, { n: [0, 0, 1], d: RAIL_CUTS[1] });
    for (const [piece, z0, z1] of [[low, BASE_BAR[1], RAIL_CUTS[0]], [midPiece, RAIL_CUTS[0], RAIL_CUTS[1]], [high, RAIL_CUTS[1], TOP_BAR[0]]]) front(piece, RAIL_X[1], ys, [z0, z1], railMarkup(z0, z1));
    box(`rail.rear.${sy}`, rack, [-RAIL_X[1], -RAIL_X[0]], ys, [BASE_BAR[1], TOP_BAR[0]], { tone: "mid" });
  }
  // Roof panel with two exhaust fans whose rotors turn with the model's fan duty.
  const roof = box("roof.panel", rack, [-69, 69], [-45, 45], [TOP_BAR[1] - 2, TOP_BAR[1]], { tone: "mid", bevel: 0.5 });
  {
    // Perforated vent field between the fans, a label plate, and a cable-entry brush at the rear.
    const holes = [];
    for (let i = 0; i < 3; i++) for (let j = 0; j < 12; j++) holes.push(slot(57 + i * 8.6, 17 + j * 5, 6.4, 1.3));
    const label = line(rect(118, 66, 13, 8), "lo") + line("M120 68.6H128M120 70.6H126M120 72.6H129", "lo", ' data-free=""');
    top(roof, [-69], [-45], TOP_BAR[1], line(holes.join(""), "lo") + label);
    const brush = box("roof.brush", rack, [-62, -50], [-26, 26], [TOP_BAR[1], TOP_BAR[1] + 0.8], { tone: "mid", r: 1.2, steps: 3 });
    const bristles = [];
    for (let j = 1; j < 26; j++) bristles.push(`M${f(5.2)} ${f(j * 2)}H${f(6.8)}`);
    top(brush, [-62], [-26], TOP_BAR[1] + 0.8, line(rect(1.2, 1.2, 9.6, 49.6), "faint") + line(bristles.join(""), "faint") + line("M6 1.2V50.8", "lo"));
    // Lifting eye nuts on the four corners.
    for (const [x, y] of [[-60, -37], [-60, 37], [60, -37], [60, 37]]) {
      vround(`roof.eye.${x}.${y}`, rack, [x, y], 2.6, [TOP_BAR[1], TOP_BAR[1] + 2.2], { tone: "mid", details: { rings: [{ at: [TOP_BAR[1] + 2.2, 0, 0], normal: [0, 0, 1], r: 1.2, tone: "lo" }] } });
    }
  }
  for (const [i, x] of [-30, 30].entries()) {
    const RF = 15;
    const housing = vround(`roof.fan.${i}`, rack, [x, 0], RF, [TOP_BAR[1], TOP_BAR[1] + 3.2], { tone: "mid" });
    const zf = TOP_BAR[1] + 3.2;
    const ring = (r, steps = 72) => Array.from({ length: steps + 1 }, (_, j) => `${j ? "L" : "M"}${f(r * Math.cos((j / steps) * Math.PI * 2))} ${f(r * Math.sin((j / steps) * Math.PI * 2))}`).join("") + "Z";
    const blades = Array.from({ length: 7 }, (_, j) => {
      const a = (j / 7) * Math.PI * 2;
      const p = (r, da) => `${f(r * Math.cos(a + da))} ${f(r * Math.sin(a + da))}`;
      return `M${p(3.4, 0)}Q${p(9, 0.42)} ${p(12.6, 0.62)}L${p(12.6, 0.98)}Q${p(8.4, 0.72)} ${p(3.4, 0.5)}Z`;
    }).join("");
    const grill = [ring(RF - 1.2), ring(9.2), ring(5.2)].join("");
    const spokes = [0, 1, 2, 3].map((j) => {
      const a = (j / 4) * Math.PI * 2 + Math.PI / 4;
      return `M${f(3.4 * Math.cos(a))} ${f(3.4 * Math.sin(a))}L${f((RF - 1.2) * Math.cos(a))} ${f((RF - 1.2) * Math.sin(a))}`;
    }).join("");
    fans.push(i);
    T.plane({
      part: housing,
      o: [x, 0, zf],
      u: [1, 0, 0],
      v: [0, 1, 0],
      normal: [0, 0, 1],
      svg: `<g class="dcx-rotor" data-fan="${i}">${line(blades, "lo")}</g>${line(grill, "mid")}${line(spokes, "lo")}${line(ring(3.4, 36), "mid")}`,
    });
  }
  // Vertical PDU on the rear right, outlets facing the open side.
  const pdu = box("pdu", rack, [-68, -63], [47, 53], [BASE_BAR[1], 116], { tone: "mid", details: { seams: [20, 108] } });
  {
    const out = [];
    for (let i = 0; i < 12; i++) out.push(rect(1.2, 12 + i * 7, 2.6, 3.2));
    side(pdu, [-68], 53, [0, 116], line(out.join(""), "lo") + line(rect(0.9, 3, 3.2, 5), "mid"));
    led(pdu, [-65.5, 53, 111], [0, 1, 0], "status");
  }

  // ---- equipment fronts -----------------------------------------------------
  const ears = (tag, group, [z0, z1], o = {}) => {
    for (const sy of [-1, 1]) {
      const ys = sy > 0 ? [CH, 48.5] : [-48.5, -CH];
      box(`${tag}.ear.${sy}`, group, EAR_X, ys, [z0, z1], { tone: o.tone ?? "mid", details: { dots: [[z0 + (z1 - z0) * 0.22], [z0 + (z1 - z0) * 0.78]].map(([z]) => ({ at: [z, EAR_X[1], sy * 46.6], normal: [1, 0, 0], size: 0.5, tone: "mid" })) } });
      if (o.handles) box(`${tag}.handle.${sy}`, group, [EAR_X[1], EAR_X[1] + 2.2], sy > 0 ? [43.4, 45.4] : [-45.4, -43.4], [z0 + 2.2, z1 - 2.2], { tone: o.tone ?? "mid" });
    }
  };
  // Drive bays and a control panel on a 2U bezel; returns LED anchors.
  const bayMarkup = (h, { bays = 10, label = "" } = {}) => {
    const w = 2 * CH;
    const out = [];
    const latch = [];
    const bw = 5.6;
    for (let i = 0; i < bays; i++) {
      const x = 3 + i * (bw + 0.4);
      out.push(rect(x, 1.6, bw, h - 3.2));
      latch.push(rect(x + 1, h - 5.2, bw - 2, 1.3));
    }
    const panel = 3 + bays * (bw + 0.4) + 1.2;
    out.push(rect(panel, 1.6, w - panel - 2.4, h - 3.2));
    const text = label ? `<text class="iso-face-text" data-tone="mid" font-size="3.1" x="${f(panel + 1.4)}" y="${f(h - 3.6)}">${label}</text>` : "";
    return { svg: line(out.join(""), "lo") + line(latch.join(""), "faint") + text, bays: Array.from({ length: bays }, (_, i) => 3 + i * (bw + 0.4) + bw / 2), panel };
  };
  const bezelAt = (a, b, bz) => [BEZEL_X[1], CH - a, bz[1] - b]; // local (a, b) on a bezel → world

  const server = (tag, group, n, o = {}) => {
    const zr = [uz(n) + 0.3, uz(n) + 2 * U - 0.3];
    const body = box(`${tag}.body`, group, BODY_X, [-CH, CH], zr, { tone: o.tone ?? "mid", details: { seams: [zr[1] - 1.4] } });
    // Side vents and the inner slide member's outline on both chassis sides.
    const hgt = zr[1] - zr[0];
    const sideVents = Array.from({ length: 9 }, (_, i) => slot(98 + i * 2.6, 4.2, hgt - 9.6, 1.2, true)).join("");
    for (const sy of [-1, 1]) side(body, [BODY_X[0]], sy * CH, zr, line(sideVents, "lo") + line(rect(6, hgt / 2 - 2, 108, 4), "faint"), sy);
    const bezel = box(`${tag}.bezel`, group, BEZEL_X, [-CH, CH], zr, { tone: o.tone ?? "mid", bevel: 0.3 });
    const m = bayMarkup(zr[1] - zr[0], o);
    front(bezel, BEZEL_X[1], [-CH, CH], zr, m.svg);
    ears(tag, group, zr, { handles: true, tone: o.tone });
    m.bays.forEach((a, i) => {
      if (o.driveLeds || i % 3 === 0) led(bezel, bezelAt(a + 1.6, 3.3, zr), [1, 0, 0], "drive", { unit: tag, bay: i });
    });
    led(bezel, bezelAt(m.panel + 3, 3.4, zr), [1, 0, 0], "power", { unit: tag });
    return { body, bezel, zr };
  };

  // U12: top-of-rack switch, 24 ports + 4 uplinks.
  {
    const zr = [uz(12) + 0.3, uz(12) + U - 0.3];
    box("switch.body", rack, [-24, BEZEL_X[0]], [-CH, CH], zr, { tone: "mid", details: { seams: [zr[1] - 1] } });
    const bezel = box("switch.bezel", rack, BEZEL_X, [-CH, CH], zr, { tone: "mid", bevel: 0.3 });
    const h = zr[1] - zr[0];
    const out = [];
    const ports = [];
    for (let row = 0; row < 2; row++)
      for (let i = 0; i < 12; i++) {
        const a = 6 + i * 4.6 + Math.floor(i / 6) * 1.6;
        const b = 1.3 + row * 3.3;
        out.push(rect(a, b, 3.6, 2.6));
        ports.push([a + 1.8, b + 1.3]);
      }
    for (let i = 0; i < 4; i++) out.push(rect(64 + i * 4.4, 2.2, 3.6, 3.8));
    front(bezel, BEZEL_X[1], [-CH, CH], zr, line(out.join(""), "lo") + line(rect(1.6, 1.6, 2.6, h - 3.2), "faint"));
    ports.forEach(([a, b], i) => led(bezel, [BEZEL_X[1], CH - a, zr[1] - b + 1.2], [1, 0, 0], "port", { port: i }));
    for (let i = 0; i < 4; i++) led(bezel, [BEZEL_X[1], CH - (65.8 + i * 4.4), zr[1] - 1.4], [1, 0, 0], "uplink", { port: 24 + i });
    ears("switch", rack, zr);
  }
  // U11: horizontal cable manager: plate, trough and fingers. Patch cords from the
  // switch's lower port row drop straight into the trough between the fingers.
  {
    const zr = [uz(11) + 0.6, uz(11) + U - 0.6];
    box("manager.plate", rack, BEZEL_X, [-CH, CH], zr, { tone: "mid", bevel: 0.3 });
    const trough = [zr[0], zr[0] + 1.2];
    box("manager.trough", rack, [BEZEL_X[1], BEZEL_X[1] + 4.8], [-CH, CH], trough, { tone: "mid" });
    const fingers = [];
    for (let i = 0; i < 9; i++) {
      const y = -36 + i * 9;
      fingers.push(y);
      box(`manager.finger.${i}`, rack, [BEZEL_X[1], BEZEL_X[1] + 4.4], [y - 0.8, y + 0.8], [trough[1], zr[1] - 1.4], { tone: "mid" });
    }
    ears("manager", rack, zr);
    const sw = [uz(12) + 0.3, uz(12) + U - 0.3];
    for (const i of [1, 3, 4, 5, 6, 8, 10]) {
      const y = CH - (6 + i * 4.6 + Math.floor(i / 6) * 1.6 + 1.8);
      if (fingers.some((fy) => Math.abs(fy - y) < 2.1)) continue;
      const zc = sw[1] - (1.3 + 3.3) - 1.3;
      box(`cord.plug.${i}`, rack, [BEZEL_X[1], BEZEL_X[1] + 2.8], [y - 1.4, y + 1.4], [zc - 1.2, zc + 1.2], { tone: "hi", owner: `cord.${i}` });
      vround(`cord.${i}`, rack, [BEZEL_X[1] + 1.6, y], 0.65, [trough[1], zc - 1.2], { tone: "hi" });
    }
  }
  server("srv09", rack, 9, { label: "09" });
  server("srv05", rack, 5, { label: "05" });
  server("srv03", rack, 3, { label: "03" });
  // U1–U2: UPS with a display window and vents.
  {
    const zr = [uz(1) + 0.3, uz(1) + 2 * U - 0.3];
    box("ups.body", rack, [-60, BEZEL_X[0]], [-CH, CH], zr, { tone: "mid" });
    const bezel = box("ups.bezel", rack, BEZEL_X, [-CH, CH], zr, { tone: "mid", bevel: 0.3 });
    const h = zr[1] - zr[0];
    const vents = Array.from({ length: 14 }, (_, i) => rect(30 + i * 3.6, 2.4, 1.6, h - 4.8)).join("");
    front(bezel, BEZEL_X[1], [-CH, CH], zr, line(rect(4, 3, 20, 8), "mid") + line(vents, "faint") + line("M6 6H16M6 8.4H13", "lo", ' data-free=""'));
    led(bezel, bezelAt(26.4, 4.2, zr), [1, 0, 0], "power", { unit: "ups" });
    ears("ups", rack, zr, { handles: true });
  }

  // ---- the sled (U7–U8), pulled out on three-stage slides -----------------------
  const z = (v) => ZB + v;
  const S = { group: sled };
  const hi = { tone: "hi" };
  box("sled.floor", sled, BODY_X, [-CH, CH], [z(0.3), z(1.3)], hi);
  for (const sy of [-1, 1]) {
    const ys = sy > 0 ? [CH - 1, CH] : [-CH, -CH + 1];
    box(`sled.wall.${sy}`, sled, [BODY_X[0] + 1, BODY_X[1]], ys, [z(1.3), z(17.2)], { ...hi, details: { dots: [-50, -10, 30].map((x) => ({ at: [z(16.2), x, sy * CH], normal: [0, sy, 0], size: 0.45, tone: "mid" })) } });
    // Three-stage slide: inner member on the sled, intermediate, outer member in the rack.
    box(`slide.inner.${sy}`, sled, [-62, 52], sy > 0 ? [CH, CH + 1] : [-CH - 1, -CH], [z(6), z(10)], { tone: "hi" });
    box(`slide.mid.${sy}`, mid, [-56, 50], sy > 0 ? [CH + 1, CH + 2] : [-CH - 2, -CH - 1], [z(6.3), z(9.7)], { tone: "mid" });
    box(`slide.outer.${sy}`, rack, [-RAIL_X[0], RAIL_X[0]], sy > 0 ? [CH + 2, 45] : [-45, -CH - 2], [z(5.6), z(10.4)], { tone: "mid", details: { dots: [-40, 0, 40].map((x) => ({ at: [z(8), x, sy * 45], normal: [0, sy, 0], size: 0.4 })) } });
  }
  box("sled.rear", sled, [BODY_X[0], BODY_X[0] + 1], [-CH, CH], [z(1.3), z(17.2)], hi);
  const sledZr = [z(0.3), z(17.5)];
  const sledBezel = box("sled.bezel", sled, BEZEL_X, [-CH, CH], sledZr, { tone: "hi", bevel: 0.3 });
  {
    const m = bayMarkup(sledZr[1] - sledZr[0], { label: "07" });
    front(sledBezel, BEZEL_X[1], [-CH, CH], sledZr, m.svg);
    m.bays.forEach((a, i) => led(sledBezel, bezelAt(a + 1.6, 3.3, sledZr), [1, 0, 0], "drive", { unit: "sled", bay: i }));
    led(sledBezel, bezelAt(m.panel + 3, 3.4, sledZr), [1, 0, 0], "power", { unit: "sled" });
  }
  ears("sled", sled, sledZr, { handles: true, tone: "hi" });

  // Drive cage behind the bezel: ten NVMe carriers seen from above.
  const cage = box("sled.cage", sled, [45, BEZEL_X[0]], [-40, 40], [z(1.3), z(16.4)], { tone: "hi", bevel: 0.3 });
  {
    const lanes = [];
    for (let i = 1; i < 10; i++) lanes.push(`M0 ${f(i * 8)}H${f(BEZEL_X[0] - 45)}`);
    top(cage, [45], [-40], z(16.4), line(lanes.join(""), "faint") + line("M3 0V80", "lo"));
  }
  // Fan wall: six hot-swap modules, each with a pull tab and a status LED.
  for (let i = 0; i < 6; i++) {
    const y0 = -40 + i * 13.4;
    const mod = box(`sled.fan.${i}`, sled, [37, 45], [y0, y0 + 12.6], [z(1.3), z(15.3)], { tone: "hi", bevel: 0.3, details: { seams: [z(11)] } });
    top(mod, [37], [y0], z(15.3), line(rect(1, 1.2, 6, 10.2), "faint"));
    box(`sled.fan.tab.${i}`, sled, [39.2, 42.8], [y0 + 4.6, y0 + 8], [z(15.3), z(16.3)], { tone: "mid" });
    led(mod, [44, y0 + 10.6, z(15.3)], [0, 0, 1], "fan", { fan: i });
  }
  // Motherboard.
  const pcb = box("sled.board", sled, [-34.5, 37], [-40, 40], [z(1.3), z(2.1)], { tone: "mid" });
  top(pcb, [-34.5], [-40], z(2.1), line(rect(2, 3, 16, 2.4) + rect(2, 74.6, 16, 2.4) + rect(55, 37.6, 15, 4.8), "faint") + line(rect(26, 36, 6, 8), "faint"));
  // Two sockets with tower heatsinks (the lit parts), DIMMs either side, VRM chokes behind.
  for (const [ci, cy] of [-20, 20].entries()) {
    box(`sled.cpu.${ci}.socket`, sled, [3.6, 24.4], [cy - 10.6, cy + 10.6], [z(2.1), z(3.1)], { tone: "mid" });
    const sink = box(`sled.cpu.${ci}.sink`, sled, [5, 23], [cy - 9.4, cy + 9.4], [z(3.1), z(15.4)], {
      tone: "hi",
      lit: true,
      bevel: 0.3,
      details: { seams: [z(5.2)], dots: [[6.4, cy - 8], [6.4, cy + 8], [21.6, cy - 8], [21.6, cy + 8]].map(([x, y]) => ({ at: [z(15.4), x, y], normal: [0, 0, 1], size: 0.5, tone: "hi" })) },
    });
    const fins = [];
    for (let j = 1; j < 19; j++) fins.push(`M0 ${f(j * (18.8 / 19))}H18`);
    top(sink, [5], [cy - 9.4], z(15.4), line(fins.join(""), "hi") + line("M4.5 2.4V16.4M13.5 2.4V16.4", "mid"));
    for (const side of [-1, 1])
      for (let d = 0; d < 4; d++) {
        const y = side < 0 ? cy - 10.9 - d * 1.55 - 0.9 : cy + 10.9 + d * 1.55;
        box(`sled.dimm.${ci}.${side}.${d}`, sled, [2, 27], [y, y + 0.9], [z(2.1), z(8.6)], { tone: "hi", details: { seams: [z(3.1)] } });
      }
    for (let j = 0; j < 5; j++) {
      const y = cy - 8 + j * 4;
      box(`sled.vrm.${ci}.${j}`, sled, [-4.4, -1.6], [y - 1.4, y + 1.4], [z(2.1), z(4.9)], { tone: "mid" });
    }
  }
  box("sled.pch", sled, [-24, -14], [-6, 4], [z(2.1), z(4.3)], { tone: "mid", bevel: 0.2 });
  box("sled.bmc", sled, [-30, -26], [10, 14], [z(2.1), z(2.9)], { tone: "mid" });
  vround("sled.battery", sled, [-28, -12], 2.2, [z(2.1), z(2.7)], { tone: "mid" });
  // Redundant PSUs at the rear right, riser cage with the NIC at the rear left.
  for (const [i, y0] of [19.4, 30.2].entries()) {
    const psu = box(`sled.psu.${i}`, sled, [BODY_X[0] + 1, -36], [y0, y0 + 10.4], [z(1.3), z(8.6)], { tone: "hi", bevel: 0.3, details: { seams: [z(7.6)] } });
    const slots = Array.from({ length: 6 }, (_, j) => rect(16 + j * 2.6, 2, 1.2, 6.4)).join("");
    top(psu, [BODY_X[0] + 1], [y0], z(8.6), line(slots, "faint"));
  }
  const riser = box("sled.riser", sled, [BODY_X[0] + 1, -42], [-40, -13], [z(1.3), z(16.4)], { tone: "hi", bevel: 0.3 });
  top(riser, [BODY_X[0] + 1], [-40], z(16.4), line(rect(2, 3, 21, 21), "faint") + line(rect(9, 9, 7, 7), "lo") + line("M9 10.4H16M9 12H16M9 13.6H16", "lo"));

  // ---- static: turntable plinth with degree ticks ---------------------------------
  const put = (item) => R.put({ ...item, shapes: item.shapes.map((shape, index) => R.solid(Object.assign(shape, { name: shape.name ?? (index ? `${item.name}#${index + 1}` : item.name) }))) });
  {
    const zt = -4;
    const ticks = k.radialTicks(0, 0, PLINTH_R - 0.6, 72, 6, zt, [1.4, 3], P);
    const svg =
      `<path class="iso-halo dcx-halo" d="${k.haloOf({ x: -PLINTH_R, y: -PLINTH_R, w: 2 * PLINTH_R, d: 2 * PLINTH_R, r: PLINTH_R }, -14, 10, P)}"/>` +
      k.solidSvg(k.cylinder(0, 0, PLINTH_R, -14, 10, P, 96, 0.8), { tone: "lo", inner: k.lineSvg(k.sideArc(0, 0, PLINTH_R, -9, P, 96), { tone: "faint" }) }) +
      k.lineSvg(ticks.minor, { tone: "faint" }) +
      k.lineSvg(ticks.major, { tone: "lo" });
    put({ name: "plinth", layer: "back", at: [0, 0, -14], svg, shapes: [A.cylinder(0, 0, PLINTH_R, -14, 10, { ground: true })] });
  }

  const poses = () => {
    const out = [];
    for (let a = TURN_RANGE[0]; a <= TURN_RANGE[1]; a += 2) for (const s of [0, 0.2, 0.4, 0.6, 0.8, 1]) out.push(follow({ rack: a, sled: s * SLED_TRAVEL }));
    return out;
  };
  const out = T.build({ statics: R.items, poses });
  A.settle(R, P);
  return { T, R, P, out, leds, fans, poses };
}

/** Maps the figure's values to group values: the intermediate slide member travels half as far. */
export const follow = (values) => ({ ...values, mid: (values.sled ?? 0) / 2 });

export const LABEL =
  "Ilustración isométrica de un rack de servidores de 12U sobre una base giratoria: switch en la parte superior, organizador de cables, servidores de 2U, un UPS abajo y una PDU vertical. El servidor 07 sale sobre sus rieles telescópicos sin tapa y deja ver la jaula de discos NVMe, la pared de seis ventiladores, la placa base con dos procesadores bajo disipadores de aletas, dieciséis módulos de memoria, fuentes redundantes y la tarjeta de red.";
