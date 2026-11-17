// Pure timeline of the scroll story, shared by the build (geometry, audits) and the
// client (live.js). No kit imports here: the client bundle stays small.
//
// The story runs on one number, s, from 0 to 4: one unit per chapter.
//   0 rack       the closed rack (the hero; hover and drag still work)
//   1 internals  the rack comes apart: roof up, sled off its rails, parts lifted
//   2 network    reassembled; uplinks climb to the tray, the mast and its antennas
//   3 desk       the desk where the rack is programmed from
//   4 together   zoomed out: rack, network and desk joined by their cables

export const SCENES = ["rack", "internals", "network", "desk", "together"];

export const SLED_TRAVEL = 112; // full extension of the slides
export const SLED_EXTRA = 40; // past the slides: the sled comes off its rails
export const STORY_ANGLE = -21; // the rack's turn while the story drives it: the sled comes out toward screen right

// Each lifted assembly: [group, rise in world units, start, end] on the explode share e.
export const LIFTS = [
  ["lift.front", 28, 0.6, 0.82], // drive cage and fan wall, flush with each other, lift together
  ["lift.psu", 30, 0.68, 0.88],
  ["lift.riser", 40, 0.7, 0.9],
  ["lift.dimms", 20, 0.74, 0.94],
  ["lift.sinks", 46, 0.8, 1],
];
export const ROOF_LIFT = 30;

export const clamp = (v, lo = 0, hi = 1) => Math.min(hi, Math.max(lo, v));
export const smooth = (x) => {
  const t = clamp(x);
  return t * t * (3 - 2 * t);
};
const span = (e, a, b) => smooth((e - a) / (b - a));

/** Maps the figure's values to group values: the intermediate slide member travels half as far, and stays at its stop once the sled leaves the rails. */
export const follow = (values) => ({ ...values, mid: Math.min(values.sled ?? 0, SLED_TRAVEL) / 2 });

/** Group values of the explode at share e (0 closed … 1 apart). The sled is fully off its rails before any part lifts. */
export function explodeAt(e) {
  const values = {
    roof: ROOF_LIFT * span(e, 0, 0.3),
    sled: SLED_TRAVEL * span(e, 0.05, 0.45) + SLED_EXTRA * span(e, 0.45, 0.6),
  };
  for (const [name, rise, a, b] of LIFTS) values[name] = rise * span(e, a, b);
  return values;
}

/** Scroll position s (0…4) → what the figure shows. */
export function storyAt(s) {
  const x = clamp(s, 0, SCENES.length - 1);
  // Explode out across chapter 1, back in during the first half of chapter 2.
  const explode = x <= 1 ? span(x, 0.25, 1) : 1 - span(x, 1.05, 1.55);
  return {
    s: x,
    turn: smooth(x / 0.25), // share of the way from the reader's angle to STORY_ANGLE
    explode,
    network: span(x, 1.5, 1.95),
    desk: span(x, 2.3, 2.9),
    links: span(x, 3.3, 3.85),
    camera: x, // the camera interpolates between the scene frames with smooth steps
  };
}

/** Interpolated camera frame [x, y, w, h] for s, from the per-scene frames. */
export function cameraAt(frames, s) {
  const x = clamp(s, 0, frames.length - 1);
  const i = Math.min(frames.length - 2, Math.floor(x));
  const t = smooth(x - i);
  const a = frames[i];
  const b = frames[i + 1];
  return a.map((v, j) => v + (b[j] - v) * t);
}
