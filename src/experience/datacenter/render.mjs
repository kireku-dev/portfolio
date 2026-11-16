// Build-time renderer: runs the geometry once per process and returns the
// static markup, styles and the data the client runtime needs.

import * as k from "../anatomy/iso-kit.mjs";
import { buildDatacenter, WIDTH, HEIGHT, LABEL, SLED_TRAVEL, TURN_RANGE } from "./figure.mjs";

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
  cached = {
    width: WIDTH,
    height: HEIGHT,
    label: LABEL,
    markup: backSvg + liveSvg,
    css: k.ISO_CSS + "\n" + out.css,
    data: { turn: out.data, leds: leds.map(({ id, kind }) => [id, kind]), fans: fans.length, travel: SLED_TRAVEL, range: TURN_RANGE },
    parts: out.report.parts,
  };
  return cached;
}
