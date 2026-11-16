// Geometry audit for the datacenter figure (not shipped):
//   node src/experience/datacenter/audit.mjs --audit [--quick] [--only=order,rigid,...]
// Runs the kit audit (clearances, supports, depth order) and the 3D orbit audit
// over the turn range with the sled in and out.

import * as A from "../anatomy/audit.mjs";
import * as TA from "../anatomy/turn-audit.mjs";
import { buildDatacenter, follow, TURN_RANGE, SLED_TRAVEL } from "./figure.mjs";

const argv = process.argv.slice(2);
const { T, R, P, out } = buildDatacenter();
console.log(`built ${out.report.parts} parts in ${out.report.seconds.toFixed(1)} s`);
A.auditOrExit(R, P);
const only = argv.find((a) => a.startsWith("--only="))?.slice(7).split(",");
const ease = (x) => x * x * (3 - 2 * x);
TA.orbitOrExit(T, R, P, {
  sweep: { at: (x) => follow({ rack: x, sled: 0 }), from: TURN_RANGE[0], to: TURN_RANGE[1], frame: 0.3 },
  clips: [
    { name: "open", at: (t) => follow({ rack: 18, sled: ease(Math.min(1, t)) * SLED_TRAVEL }), from: 0, to: 1, frame: 1 / 60 },
    { name: "turn-open", at: (t) => follow({ rack: TURN_RANGE[0] + (TURN_RANGE[1] - TURN_RANGE[0]) * (t / 4), sled: SLED_TRAVEL }), from: 0, to: 4, frame: 1 / 60 },
  ],
  quick: argv.includes("--quick"),
  only,
});
