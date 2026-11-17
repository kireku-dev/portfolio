// Build-time renderer: runs the geometry once per process and returns the
// static markup, styles and the data the client runtime needs.

import * as k from "../anatomy/iso-kit.mjs";
import { buildDatacenter, WIDTH, HEIGHT, LABEL, SLED_TRAVEL, TURN_RANGE } from "./figure.mjs";
import { storySvg } from "./story.mjs";

let cached = null;

export function datacenterFigure() {
  if (cached) return cached;
  const { R, out, leds, fans } = buildDatacenter();
  const layerOf = (name) =>
    R.items
      .filter((item) => item.layer === name)
      .sort((a, b) => a.key - b.key)
      .map((item) => item.svg);
  const backSvg = k.figureSvg({ width: WIDTH, height: HEIGHT, label: LABEL, body: layerOf("back"), className: "dcx-back" });
  const liveSvg = out.layerSvg("rack", { width: WIDTH, height: HEIGHT });
  // The world of the scroll story (uplinks and mast, desk, floor cable), painted over the live rack.
  const story = storySvg();
  const worldSvg = `<svg xmlns="http://www.w3.org/2000/svg" class="iso-svg iso-layer dcx-world" viewBox="0 0 ${WIDTH} ${HEIGHT}" aria-hidden="true">${story.body}</svg>`;
  cached = {
    width: WIDTH,
    height: HEIGHT,
    label: LABEL,
    markup: backSvg + liveSvg + worldSvg,
    css: k.ISO_CSS + "\n" + out.css,
    steps: story.steps,
    data: {
      turn: out.data,
      leds: leds.map(({ id, kind }) => [id, kind]),
      fans: fans.length,
      travel: SLED_TRAVEL,
      range: TURN_RANGE,
      frames: story.frames,
      steps: story.steps,
    },
    parts: out.report.parts,
  };
  return cached;
}
