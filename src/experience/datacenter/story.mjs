// The world around rack kr-01 for the scroll story, built once at Astro build time with
// the anatomy kit (MIT, ../anatomy/LICENSE): the uplinks and the mast with its antennas
// (scene "network"), the desk where Daniel programs (scene "desk") and the floor cable
// that joins the desk to the rack (scene "together").
//
// Same world and camera as figure.mjs (x back → front of the rack, y right → left, z up,
// about 5 mm a unit). The rack stands at the origin turned by STORY_ANGLE, the angle the
// story holds it at, so everything here is drawn against that pose. All of it lies either
// beside the rack on screen or above its roof, so this layer is painted after the live rack.

import * as k from "../anatomy/iso-kit.mjs";
import * as A from "../anatomy/audit.mjs";
import * as G from "../anatomy/lathe.mjs";
import { tubePieces, tubeSvg } from "../anatomy/tube.mjs";
import { P, WIDTH, HEIGHT } from "./figure.mjs";
import { STORY_ANGLE, SLED_TRAVEL, SLED_EXTRA, ROOF_LIFT, LIFTS } from "./scenes.mjs";

export const FLOOR = -14; // the floor the turntable plinth stands on
const RAD = (STORY_ANGLE * Math.PI) / 180;
const turned = ([x, y, z]) => [x * Math.cos(RAD) - y * Math.sin(RAD), x * Math.sin(RAD) + y * Math.cos(RAD), z];

// Network layout. The uplinks leave the rack through the cable-entry brush on its roof.
const BRUSH_TOP = 131.8;
const BRUSH = turned([-56, 0, 0]); // centre of the cable-entry brush, in the world
const RISER = [-5, 5].map((dx) => [BRUSH[0] + dx, BRUSH[1]]); // two uplinks, inside the brush
const MAST = { x: BRUSH[0], y: -196, r: 4.2, top: 312 };
const JBOX = { x: [MAST.x - 9, MAST.x + 9], y: [MAST.y + MAST.r, MAST.y + MAST.r + 7], z: [180, 206] };
const TRAY = { x: [BRUSH[0] - 14, BRUSH[0] + 14], y: [JBOX.y[1], BRUSH[1] + 12], z: 186, rail: 7 };
// Rungs every 13 units, with a gap where the uplinks come up through the tray.
const RUNG_Y = [BRUSH[1] + 9.5, ...Array.from({ length: 30 }, (_, i) => BRUSH[1] - 13 - i * 13).filter((y) => y > JBOX.y[1] + 3)];
const CLOUD = [-110, -91, 330];

// Desk layout (the +y side of the room, screen left and low), in the desk's own frame:
// a runs from the monitor toward the chair, b along the desk; DESK_ORIGIN places it.
const DESK = { a: [-10, 100], b: [200, 400], top: 106, thick: 4 };
const DESK_ORIGIN = [340, 250];

const V = G.viewOf(P);

/** Builds every static item of the story and returns the recorder, ready for the audit or the page. */
export function buildStory() {
  const R = A.recorder(P);
  const lines = []; // flow lines drawn over everything: [scene step, svg]

  const put = (name, scene, step, at, svg, shapes, bias = 0) => R.put({ name, piece: `${scene}${step}`, at, bias, svg, shapes: shapes.map((shape) => R.solid(Object.assign(shape, { name: shape.name ?? name }))) });
  const S = (paths, style) => k.solidSvg(paths, style);
  const L = (d, style) => k.lineSvg(d, style);
  const box = (name, scene, step, [x0, x1], [y0, y1], [z0, z1], o = {}) => {
    const plan = { x: x0, y: y0, w: x1 - x0, d: y1 - y0, r: o.r ?? 0 };
    const paths = k.slabOf(plan, z0, z1 - z0, P, o.steps ?? (o.r ? 3 : 1), o.bevel ?? 0);
    put(name, scene, step, [(x0 + x1) / 2, (y0 + y1) / 2, (z0 + z1) / 2], S(paths, { tone: o.tone ?? "mid", crease: o.crease ?? "faint", lit: o.lit, inner: o.inner }) + (o.extra ?? ""), [A.slab(plan, z0, z1 - z0, { name, ...o.meta }, o.steps ?? (o.r ? 3 : 1))], o.bias);
    return plan;
  };
  const post = (name, scene, step, [x, y], r, [z0, z1], o = {}) => {
    put(name, scene, step, [x, y, (z0 + z1) / 2], S(k.cylinder(x, y, r, z0, z1 - z0, P, o.steps ?? 24, o.bevel ?? 0), { tone: o.tone ?? "mid", inner: o.inner }) + (o.extra ?? ""), [A.cylinder(x, y, r, z0, z1 - z0, { name, ...o.meta })], o.bias);
  };
  const disc = (name, scene, step, F, s0, s1, r, o = {}) => {
    put(name, scene, step, G.add3(F.o, G.mul3(F.a, (s0 + s1) / 2)), S(G.disc(s0, s1, r, F, P, { bevel: o.bevel ?? 0 }), { tone: o.tone ?? "mid" }) + (o.extra ?? ""), [A.disc(F, s0, s1, r, { name, ...o.meta })], o.bias);
  };
  const cable = (name, scene, step, points, r, o = {}) => {
    const route = G.fillet(points, o.bend ?? Math.max(4, 8 * r), 10, { P, tube: r });
    R.route(name, route, r, { owner: name, limp: true, touch: o.touch, piece: `${scene}${step}` });
    tubePieces(route, r, P, { maxLength: o.maxLength ?? 14, spacing: 1 }).forEach((part, index) =>
      R.put({ name: `${name}:${index}`, piece: `${scene}${step}`, at: part.mid, bias: o.bias ?? 0, route: name, chunk: index, svg: tubeSvg(part, { tone: o.tone ?? "mid" }), shapes: [A.tube(part.points, part.radii)] }),
    );
    if (o.flow) lines.push([`${scene}${step}`, L(k.pathOf(route.map((p) => k.iso(p, P))), { tone: "lit", flow: true, className: "dcx-flow", free: true })]);
    return route;
  };

  // The floor everything stands on: recorded, not drawn (the page is the floor).
  R.solid(A.box([-420, -420, FLOOR - 4], [420, 520, FLOOR], { name: "stand.floor" }));

  // ---- network: uplinks, ladder tray, mast, antennas, dish, cloud -------------------------
  {
    const [tx0, tx1] = TRAY.x;
    const z = TRAY.z;
    const { x: mx, y: my, r: mr, top } = MAST;
    // The rack's cable-entry brush (drawn by the live rack): recorded so the uplinks end on it.
    const c = Math.cos(RAD);
    const sn = Math.sin(RAD);
    R.solid(A.orientedBox([BRUSH[0], BRUSH[1], 131.4], [[c, sn, 0], [-sn, c, 0], [0, 0, 1]], [6, 26, 0.4], { name: "stand.rack.brush" }));
    // A floor stand under the tray, clear of the rack on screen.
    const SY = -164;
    const sx = (tx0 + tx1) / 2;
    const base = { x: sx - 9, y: SY - 9, w: 18, d: 18, r: 1.5 };
    box("net.stand.base", "n", 0, [sx - 9, sx + 9], [SY - 9, SY + 9], [FLOOR, FLOOR + 2], { tone: "lo", r: 1.5, meta: { ground: true }, extra: k.dotsSvg(k.corners(base, 2.6).map((p) => k.iso([p[0], p[1], FLOOR + 2], P)), { size: 0.45 }) });
    box("net.stand.post", "n", 0, [sx - 2, sx + 2], [SY - 2, SY + 2], [FLOOR + 2, z - 3], { tone: "mid" });
    box("net.stand.arm", "n", 0, [tx0, tx1], [SY - 2.5, SY + 2.5], [z - 3, z], { tone: "mid", bevel: 0.3 });
    // Ladder tray: two side rails and rungs, from above the rack to the junction box on the mast.
    for (const [i, [a, b]] of [[tx0, tx0 + 1.6], [tx1 - 1.6, tx1]].entries()) box(`net.tray.rail.${i}`, "n", 1, [a, b], TRAY.y, [z, z + TRAY.rail], { tone: "mid" });
    for (const [i, y] of RUNG_Y.entries()) box(`net.tray.rung.${i}`, "n", 1, [tx0 + 1.6, tx1 - 1.6], [y - 1, y + 1], [z, z + 1.6], { tone: "lo" });
    // The mast: base plate with anchor bolts, a steel pole cut at the arm collar, a cap.
    const own = { owner: "net.mast" };
    const plate = { x: mx - 16, y: my - 16, w: 32, d: 32, r: 2 };
    box("net.mast.plate", "n", 0, [plate.x, plate.x + plate.w], [plate.y, plate.y + plate.d], [FLOOR, FLOOR + 2.4], {
      tone: "lo",
      r: 2,
      meta: { ground: true },
      extra: L(k.corners(plate, 5).map(([x, y]) => k.ring(x, y, 1.8, FLOOR + 2.4, P, 14)).join(""), { tone: "lo" }) + k.dotsSvg(k.corners(plate, 5).map(([x, y]) => k.iso([x, y, FLOOR + 2.4], P)), { size: 0.5 }),
    });
    const AZ = 250; // the cross arm's collar
    post("net.mast.pole", "n", 0, [mx, my], mr, [FLOOR + 2.4, AZ], { tone: "mid", meta: own, inner: L(k.sideArc(mx, my, mr, 60, P, 24) + k.sideArc(mx, my, mr, 170, P, 24), { tone: "faint" }) });
    post("net.mast.collar", "n", 3, [mx, my], mr + 1.4, [AZ, AZ + 8], { tone: "mid", meta: own });
    post("net.mast.pole.top", "n", 3, [mx, my], mr, [AZ + 8, top], { tone: "mid", meta: own });
    post("net.mast.cap", "n", 3, [mx, my], mr + 1, [top, top + 2], { tone: "mid", meta: own });
    // Junction box on the pole: the uplinks end in it, the feeders leave its top.
    box("net.jbox", "n", 1, JBOX.x, JBOX.y, JBOX.z, { tone: "mid", bevel: 0.3, inner: L(k.sideSeam({ x: JBOX.x[0], y: JBOX.y[0], w: 18, d: 7, r: 0 }, JBOX.z[1] - 4, P, 1), { tone: "faint" }) });
    // Uplinks: up through the brush, over into the tray and straight along it into the junction box.
    const CZ = z + 1.6 + 1.3;
    RISER.forEach(([x, y], i) => cable(`net.uplink.${i}`, "n", 1, [[x, y, 131.8], [x, y, CZ], [x, JBOX.y[1], CZ]], 1.3, { tone: "hi", flow: true, bend: 9, touch: ["net.tray.*"] }));
    // Cross arm on the collar with a sector panel at each end, fed from the junction box.
    const PZ = [248, 300];
    [-1, 1].forEach((side, i) => {
      const ax = mx + side * 26;
      const near = mx + side * (mr + 1.4 - 0.4);
      box(`net.arm.${i}`, "n", 3, side < 0 ? [ax - 3, near] : [near, ax + 3], [my - 2, my + 2], [AZ + 2, AZ + 6], { tone: "mid", bevel: 0.3, meta: own });
      box(`net.panel.${i}.bracket`, "n", 3, [ax - 2, ax + 2], [my + 2, my + 6], [AZ + 2, AZ + 6], { tone: "mid", meta: own });
      const py = [my + 6, my + 12];
      const ribs = [];
      for (let j = 1; j < 7; j++) ribs.push(k.segment([ax - 6, py[1], PZ[0] + j * 8.5], [ax + 6, py[1], PZ[0] + j * 8.5], P));
      // The radome's ribs end on the vertical edge between its two visible faces, drawn as a seam.
      const corner = k.segment([ax + 6, py[1], PZ[0]], [ax + 6, py[1], PZ[1]], P);
      box(`net.panel.${i}`, "n", 3, [ax - 6, ax + 6], py, PZ, { tone: "hi", bevel: 0.4, inner: L(corner, { tone: "lo" }), extra: L(ribs.join(""), { tone: "faint" }) });
      const fx = mx + side * 4;
      const fy = (py[0] + py[1]) / 2;
      cable(`net.feeder.${i}`, "n", 3, [[fx, fy, JBOX.z[1]], [fx, fy, 227], [ax, fy, 227], [ax, fy, PZ[0]]], 1, { tone: "mid", bend: 10 });
    });
    // Microwave dish on a stub above the cap, aimed at the cloud.
    const toward = G.unit3(G.sub3(CLOUD, [mx, my, top + 24]));
    post("net.dish.stub", "n", 4, [mx, my], 1.6, [top + 2, top + 22], { tone: "mid", meta: { owner: "net.dish" } });
    const dishAt = [mx, my, top + 22 + 3.2];
    const F = G.frameAlong(dishAt, toward);
    put("net.dish", "n", 4, dishAt, S(G.solidOf([[0, 4], [2, 11, 1], [4, 15, 1], [5.4, 17]], F, P, {}), { tone: "hi" }), [A.solid(F, [[0, 4], [2, 11], [4, 15], [5.4, 17]], { name: "net.dish", owner: "net.dish" })]);
    disc("net.dish.feed", "n", 4, F, 5.4, 14, 1, { tone: "mid", meta: { owner: "net.dish" } });
    disc("net.dish.horn", "n", 4, F, 14, 16.5, 2.4, { tone: "mid", meta: { owner: "net.dish" } });
    // The cloud: a cumulus of overlapping balls, drawn as one item, back balls first.
    const balls = [[0, 0, 0, 26], [24, -22, -7, 19], [-22, 24, -9, 18], [8, 30, -11, 15], [-12, -30, -6, 17], [30, 10, -12, 14]]
      .map(([dx, dy, dz, r]) => ({ c: G.add3(CLOUD, [dx, dy, dz]), r }))
      .sort((a, b) => G.dot3(a.c, V) - G.dot3(b.c, V));
    put("net.cloud", "n", 5, CLOUD, balls.map(({ c, r }) => S(G.sphereOf(c, r, P), { tone: "hi" })).join(""), balls.map(({ c, r }, i) => A.ball(c, r, { name: `net.cloud#${i + 1}`, ground: true, owner: "net.cloud" })));
    // The link from the dish to the cloud: three arcs that fade at both ends.
    const from = G.add3(dishAt, G.mul3(toward, 20));
    const to = G.add3(CLOUD, G.mul3(toward, -30));
    const sa = k.iso(from, P);
    const sb = k.iso(to, P);
    for (const t of [0.25, 0.5, 0.75]) {
      const c = [sa[0] + (sb[0] - sa[0]) * t, sa[1] + (sb[1] - sa[1]) * t];
      const dir = [sb[0] - sa[0], sb[1] - sa[1]];
      const len = Math.hypot(...dir);
      const n = [-dir[1] / len, dir[0] / len];
      const w = 9 + t * 8;
      const arc = Array.from({ length: 13 }, (_, j) => {
        const u = (j / 12) * 2 - 1;
        return [c[0] + n[0] * u * w + (dir[0] / len) * (1 - u * u) * 4, c[1] + n[1] * u * w + (dir[1] / len) * (1 - u * u) * 4];
      });
      lines.push(["n5", `<g class="dcx-wave">${k.fadeLineSvg(arc, { fade: [6, 6], tone: "lit" })}</g>`]);
    }
  }

  // ---- desk: desk, monitor with code, keyboard, mouse, mug, tower, chair, Daniel --------
  // Laid out in a desk frame (a, b): a runs from the monitor toward the chair, b along the
  // desk. The frame is turned so Daniel faces −y: the reader sees his left side in profile,
  // and the screen (facing +y) over his shoulder.
  {
    const toWorld = (a, b) => [DESK_ORIGIN[0] - b, DESK_ORIGIN[1] + a];
    const span = ([a0, a1], [b0, b1]) => [[DESK_ORIGIN[0] - b1, DESK_ORIGIN[0] - b0], [DESK_ORIGIN[1] + a0, DESK_ORIGIN[1] + a1]];
    const dbox = (name, step, as, bs, zs, o = {}) => {
      const [xs, ys] = span(as, bs);
      return box(name, "d", step, xs, ys, zs, o);
    };
    const dplan = ({ a, b, wa, wb, r }) => {
      const [[x0, x1], [y0, y1]] = span([a, a + wa], [b, b + wb]);
      return { x: x0, y: y0, w: x1 - x0, d: y1 - y0, r };
    };
    const dpost = (name, step, [a, b], r, zs, o = {}) => post(name, "d", step, toWorld(a, b), r, zs, o);
    const seg = ([a0, b0, z0], [a1, b1, z1]) => k.segment([...toWorld(a0, b0), z0], [...toWorld(a1, b1), z1], P);
    const { a: [a0, a1], b: [b0, b1], top, thick } = DESK;

    // Legs and a back rail.
    for (const [i, [la, lb]] of [[a0 + 4, b0 + 4], [a1 - 8, b0 + 4], [a0 + 4, b1 - 8], [a1 - 8, b1 - 8]].entries())
      dbox(`desk.leg.${i}`, 0, [la, la + 4], [lb, lb + 4], [FLOOR, top - thick], { tone: "mid", meta: { ground: true } });
    dbox("desk.rail", 0, [a0 + 4, a0 + 8], [b0 + 8, b1 - 8], [top - thick - 14, top - thick], { tone: "mid" });
    const deskPlan = dplan({ a: a0, b: b0, wa: a1 - a0, wb: b1 - b0, r: 2 });
    dbox("desk.top", 0, [a0, a1], [b0, b1], [top - thick, top], { tone: "mid", r: 2, bevel: 0.8, inner: L(k.sideSeam(deskPlan, top - 1.4, P, 3), { tone: "faint" }) });
    // Tower under the desk, at the end nearest the rack; its vents face the rack.
    const TW = { a: [8, 62], b: [212, 234], z: [FLOOR, FLOOR + 88] };
    const towerVents = [];
    // Closed vent slots on the face toward the rack.
    for (let i = 0; i < 7; i++) {
      const [a, w] = [17.4 + i * 5, 1.2];
      towerVents.push(seg([a, TW.b[0], FLOOR + 66], [a, TW.b[0], FLOOR + 80]) + seg([a, TW.b[0], FLOOR + 80], [a + w, TW.b[0], FLOOR + 80]).replace("M", "L") + seg([a + w, TW.b[0], FLOOR + 80], [a + w, TW.b[0], FLOOR + 66]).replace("M", "L") + "Z");
    }
    dbox("desk.tower", 1, TW.a, TW.b, TW.z, {
      tone: "mid",
      r: 1.5,
      bevel: 0.5,
      meta: { ground: true },
      extra: L(towerVents.join(""), { tone: "faint" }) + k.dotsSvg([k.iso([...toWorld(TW.a[1] - 6, TW.b[0]), FLOOR + 78], P)], { size: 0.8, tone: "hi" }),
    });
    // Monitor: foot, stand, panel; the screen faces the chair.
    dbox("desk.monitor.foot", 2, [6, 32], [286, 314], [top, top + 1.8], { tone: "lo", r: 3 });
    dbox("desk.monitor.stand", 2, [12, 16], [296, 304], [top + 1.8, 138], { tone: "mid" });
    const MON = { a: [16, 20], b: [254, 346], z: [132, 186] };
    dbox("desk.monitor", 2, MON.a, MON.b, MON.z, { tone: "hi", r: 0.6, bevel: 0.3, extra: codeMarkup(toWorld(MON.a[1], MON.b[1]), MON.b[1] - MON.b[0], MON.z) });
    // Keyboard with its key grid, a mouse on a pad, a mug.
    const KB = { a: [74, 94], b: [266, 334], z: [top, top + 2.4] };
    const keys = [];
    for (let row = 0; row < 4; row++)
      for (let col = 0; col < 14; col++) {
        if (row === 3 && col > 3 && col < 10) continue;
        keys.push(k.planOutline(dplan({ a: KB.a[0] + 2 + row * 4.2, b: KB.b[0] + 2.2 + col * 4.6, wa: 3.4, wb: 3.8, r: 0.5 }), KB.z[1], P, 2));
      }
    keys.push(k.planOutline(dplan({ a: KB.a[0] + 2 + 3 * 4.2, b: KB.b[0] + 2.2 + 4 * 4.6, wa: 3.4, wb: 6 * 4.6 - 0.8, r: 0.5 }), KB.z[1], P, 2));
    dbox("desk.keyboard", 3, KB.a, KB.b, KB.z, { tone: "mid", r: 1, bevel: 0.3, extra: L(keys.join(""), { tone: "lo" }) });
    dbox("desk.pad", 3, [70, 96], [234, 262], [top, top + 0.6], { tone: "lo", r: 2 });
    dbox("desk.mouse", 3, [78, 90], [244, 252], [top + 0.6, top + 4], { tone: "hi", r: 3.5, steps: 4, inner: L(seg([78, 248, top + 4], [83, 248, top + 4]), { tone: "faint", free: "end" }) });
    const mug = toWorld(58, 372);
    post("desk.mug", "d", 3, mug, 5, [top, top + 12], { tone: "mid", extra: L(k.ring(mug[0], mug[1], 3.8, top + 12, P, 20), { tone: "lo" }) });
    dbox("desk.mug.handle", 3, [62.6, 66], [369, 375], [top + 3, top + 9], { tone: "mid" });
    // Office chair: four-arm base on casters, gas lift, seat, low back.
    const CH = [125, 300];
    for (const [i, [ca, cb]] of [[CH[0] - 24, CH[1]], [CH[0] + 24, CH[1]], [CH[0], CH[1] - 24], [CH[0], CH[1] + 24]].entries()) dpost(`chair.caster.${i}`, 4, [ca, cb], 2.6, [FLOOR, FLOOR + 5], { tone: "lo", meta: { ground: true } });
    dbox("chair.base.a", 4, [CH[0] - 26, CH[0] + 26], [CH[1] - 2, CH[1] + 2], [FLOOR + 5, FLOOR + 8], { tone: "mid" });
    dbox("chair.base.b0", 4, [CH[0] - 2, CH[0] + 2], [CH[1] - 26, CH[1] - 2], [FLOOR + 5, FLOOR + 8], { tone: "mid" });
    dbox("chair.base.b1", 4, [CH[0] - 2, CH[0] + 2], [CH[1] + 2, CH[1] + 26], [FLOOR + 5, FLOOR + 8], { tone: "mid" });
    dpost("chair.lift", 4, CH, 3, [FLOOR + 8, 42], { tone: "hi" });
    dbox("chair.seat", 4, [104, 150], [279, 321], [42, 48], { tone: "mid", r: 4, bevel: 0.6 });
    dbox("chair.post", 4, [146, 150], [297, 303], [48, 62], { tone: "mid" });
    dbox("chair.back", 4, [146, 152], [284, 316], [62, 92], { tone: "mid", r: 3, bevel: 0.5 });
    // Daniel, seated and typing: a blocky figure in the kit's own solids.
    const me = { tone: "hi" };
    for (const [i, [c0, c1]] of [[289, 299], [301, 311]].entries()) {
      dbox(`daniel.foot.${i}`, 5, [78, 97], [c0, c1], [FLOOR, FLOOR + 5], { tone: "mid", r: 1.5, meta: { ground: true } });
      dbox(`daniel.shin.${i}`, 5, [88, 97], [c0, c1], [FLOOR + 5, 48], me);
      dbox(`daniel.thigh.${i}`, 5, [88, 122], [c0, c1], [48, 58], me);
    }
    dbox("daniel.hips", 5, [122, 144], [288, 312], [48, 60], me);
    dbox("daniel.torso", 5, [124, 144], [284, 316], [60, 128], { ...me, r: 2, bevel: 0.4 });
    for (const [i, [c0, c1]] of [[277, 284], [316, 323]].entries()) {
      dbox(`daniel.arm.${i}`, 5, [127, 135], [c0, c1], [106.5, 126], me);
      dbox(`daniel.forearm.${i}`, 5, [96, 127], [c0, c1], [106.5, 112], me);
      dbox(`daniel.hand.${i}`, 5, [82, 96], [c0, c1], [KB.z[1], 111], { ...me, r: 1.5 });
    }
    dbox("daniel.neck", 5, [130, 138], [296, 304], [128, 133], me);
    dbox("daniel.head", 5, [122, 144], [289, 311], [133, 157], { ...me, r: 3, meta: { owner: "daniel.head" } });
    dbox("daniel.hair", 5, [124, 145], [288, 312], [157, 161], { tone: "mid", r: 3.5, meta: { owner: "daniel.head" } });
    dbox("daniel.nose", 5, [120, 122], [298.5, 301.5], [142, 147], me);
    // Headphones: a band over the hair and a cup on each ear.
    dbox("daniel.phones.band", 5, [131, 135], [286, 314], [161, 163.4], { tone: "mid", r: 1 });
    for (const [i, [c0, c1]] of [[284, 289], [311, 316]].entries()) {
      dbox(`daniel.phones.stem.${i}`, 5, [131.5, 134.5], i ? [312, 314] : [286, 288], [150, 161], { tone: "mid" });
      dbox(`daniel.phones.cup.${i}`, 5, [128, 138], [c0, c1], [139, 150], { tone: "mid", r: 2.4, steps: 4, bevel: 0.3 });
    }
  }

  // ---- together: the floor cable from the tower to the floor box beside the rack -----------
  {
    const FB = { x: [86, 104], y: [70, 84] };
    box("link.floorbox", "l", 0, FB.x, FB.y, [FLOOR, FLOOR + 3], { tone: "lo", r: 1.5, meta: { ground: true }, extra: L(k.planOutline({ x: 89, y: 73, w: 12, d: 8, r: 1 }, FLOOR + 3, P, 2), { tone: "faint" }) });
    const r = 1.2;
    const face = DESK_ORIGIN[0] - 212; // the tower's face toward the rack
    cable("link.floor", "l", 1, [[face, 285, FLOOR + 10], [face + 8, 285, FLOOR + 10], [face + 16, 285, FLOOR + r], [face + 16, 122, FLOOR + r], [95, 122, FLOOR + r], [95, 84, FLOOR + r]], r, { tone: "hi", flow: true, bend: 10, touch: ["stand.floor"] });
  }

  A.settle(R, P);
  R.items.sort((a, b) => a.key - b.key);
  return { R, lines };
}

/** Lines of code on the monitor, in the plane of its screen (normal +y, starting at its left end `at`). They stand for text, so their ends are free. */
function codeMarkup(at, width, [z0, z1]) {
  const height = z1 - z0;
  const m = k.sideMatrix(at, z1, P, "left");
  const B = 3; // bezel
  const rows = [
    [0, 9, "lit"], [2, 22, "lo"], [2, 16, "lo"], [4, 26, "hi"], [4, 18, "lo"], [2, 8, "lit"],
    [0, 0, ""], [0, 12, "lit"], [2, 28, "lo"], [4, 20, "hi"], [2, 14, "lo"], [0, 6, "lit"],
  ];
  const lines = rows
    .map(([indent, len, tone], i) => (len ? `<path class="iso-line dcx-code" data-tone="${tone}" data-free="" style="--i:${i}" d="M${B + 9 + indent * 3} ${(B + 5 + i * 3.6).toFixed(1)}h${len}"/>` : ""))
    .join("");
  const gutter = rows.map((_, i) => `M${B + 3} ${(B + 5 + i * 3.6).toFixed(1)}h2.6`).join("");
  const screen = `M${B} ${B}H${width - B}V${height - B}H${B}Z`;
  return (
    `<g transform="${m}">` +
    `<path class="dcx-screen" d="${screen}"/>` +
    `<path class="iso-line" data-tone="faint" data-free="" d="${gutter}"/>` +
    lines +
    `<rect class="dcx-cursor" x="${B + 9 + 2 * 3 + 30}" y="${(B + 5 + 10 * 3.6 - 1.4).toFixed(1)}" width="1.6" height="2.8"/>` +
    `<path class="iso-line" data-tone="lo" d="${screen}"/>` +
    `</g>`
  );
}

/** A camera frame [x, y, w, h] around screen points, padded, at the figure's aspect. */
function frameAround(points, pad, aspect = WIDTH / HEIGHT, share = 0) {
  const xs = points.map((p) => p[0]);
  const ys = points.map((p) => p[1]);
  // `share` keeps a margin of that share of the extent, so nothing sits in the stage's faded edges.
  const grow = Math.max(pad, share * Math.max(Math.max(...xs) - Math.min(...xs), Math.max(...ys) - Math.min(...ys)));
  let x0 = Math.min(...xs) - grow;
  let x1 = Math.max(...xs) + grow;
  let y0 = Math.min(...ys) - grow;
  let y1 = Math.max(...ys) + grow;
  const w = x1 - x0;
  const h = y1 - y0;
  if (w / h > aspect) {
    const grow = w / aspect - h;
    y0 -= grow / 2;
    y1 += grow / 2;
  } else {
    const grow = h * aspect - w;
    x0 -= grow / 2;
    x1 += grow / 2;
  }
  return [x0, y0, x1 - x0, y1 - y0].map((v) => Math.round(v * 10) / 10);
}

const boxPoints = ([x0, x1], [y0, y1], [z0, z1], move = [0, 0, 0]) => {
  const out = [];
  for (const x of [x0, x1]) for (const y of [y0, y1]) for (const z of [z0, z1]) out.push(k.iso(turned([x + move[0], y + move[1], z + move[2]]), P));
  return out;
};

/** The five camera frames, one per scene, from the extents of what each scene shows. */
export function storyFrames(R) {
  const rack = [...boxPoints([-75, 75], [-60, 60], [FLOOR, 136])];
  for (let i = 0; i < 48; i++) {
    const t = (i / 48) * Math.PI * 2;
    rack.push(k.iso([108 * Math.cos(t), 108 * Math.sin(t), FLOOR], P));
  }
  const rise = Math.max(...LIFTS.map(([, r]) => r));
  const sled = boxPoints([-68, 64], [-48.5, 48.5], [66.4, 66.4 + 17.5 + rise], [SLED_TRAVEL + SLED_EXTRA, 0, 0]);
  const roof = boxPoints([-69, 69], [-45, 45], [129, 136 + ROOF_LIFT]);
  const of = (prefix) => R.items.filter((item) => item.piece.startsWith(prefix)).flatMap((item) => item.shapes.flatMap((shape) => cornersOf(A.boundsOf(shape))));
  const net = of("n");
  const desk = of("d");
  const link = of("l");
  return [
    [0, 0, WIDTH, HEIGHT],
    frameAround([...sled, ...roof, ...boxPoints([0, 75], [-60, 60], [FLOOR, 136])], 16),
    frameAround([...rack, ...net], 24),
    // The desk with the whole rack beside it (the mast is away in this scene): every frame from
    // chapter 03 on holds the whole rack, so no camera move between them ever cuts it.
    frameAround([...desk, ...rack], 26, WIDTH / HEIGHT, 0.08),
    frameAround([...rack, ...net, ...desk, ...link], 22),
  ];
}

const cornersOf = (b) => {
  const out = [];
  for (const x of [b.min[0], b.max[0]]) for (const y of [b.min[1], b.max[1]]) for (const z of [b.min[2], b.max[2]]) out.push(k.iso([x, y, z], P));
  return out;
};

/** The story layer as markup: every item in painter's order, tagged with its scene step. */
export function storySvg() {
  const { R, lines } = buildStory();
  const body = R.items.map((item) => `<g data-k="${item.piece}">${item.svg}</g>`).join("") + lines.map(([key, svg]) => `<g data-k="${key}">${svg}</g>`).join("");
  return { body, frames: storyFrames(R), steps: [...new Set(R.items.map((item) => item.piece))].sort() };
}
