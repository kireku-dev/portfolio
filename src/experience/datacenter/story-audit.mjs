// Geometry audit for the story's static world (not shipped):
//   node src/experience/datacenter/story-audit.mjs --audit
// Runs the kit audit (clearances, terminals, supports, depth order, coverage) on the
// uplinks and mast, the desk with Daniel, and the floor cable.

import * as A from "../anatomy/audit.mjs";
import { P } from "./figure.mjs";
import { buildStory } from "./story.mjs";

const { R } = buildStory();
console.log(`story: ${R.items.length} items, ${R.solids.length} shapes, ${R.routes.length} routes`);
A.auditOrExit(R, P);
