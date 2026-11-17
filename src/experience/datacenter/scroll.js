// Native-scroll driver for the story: turns the reader's position among the hero and the
// chapters into one number p (0 hero, 1…5 chapters) and hands it to the figure. No scroll library: a passive
// scroll listener read once per animation frame, and an IntersectionObserver that
// switches the listener on only while the story is near the viewport and marks the
// chapter being read.

const clamp = (v, lo, hi) => Math.min(hi, Math.max(lo, v));

/**
 * @param {HTMLElement} wrapper  the element that holds the hero, the pinned figure and the chapters
 * @param {{ setStory(p: number): void }} figure
 */
export function driveStory(wrapper, figure) {
  const chapters = [...wrapper.querySelectorAll("[data-story-chapter]")];
  const pin = wrapper.querySelector("[data-story-pin]");
  const hero = wrapper.querySelector(".hero");
  const heading = wrapper.querySelector(".story-heading");
  if (!chapters.length || !figure || !hero) return;
  wrapper.setAttribute("data-story-live", "");
  const still = matchMedia("(prefers-reduced-motion: reduce)");
  const wide = matchMedia("(min-width: 1081px)");
  // The anchors p counts: the hero copy is 0, each chapter's text block 1…5.
  const blocks = [hero, ...chapters.map((chapter) => chapter.querySelector("article") ?? chapter)];
  let queued = 0;
  let active = -1;
  let faded = false;

  // The reading line: the middle of the viewport, or of what the pinned figure leaves free on a phone.
  const readingLine = () => {
    const h = window.innerHeight;
    const pinned = !wide.matches && pin && getComputedStyle(pin).position === "sticky";
    const top = pinned ? Math.max(0, pin.getBoundingClientRect().bottom) : 0;
    return top + (h - top) * 0.5;
  };

  // Beside the figure, a text block shows only while the figure is clear of its column: it fades
  // out in the first 12 % of a crossing and back in over the last 12 %, so the two never overlap.
  // With reduced motion p only takes whole values, so this shows just the current block, at once.
  const fade = (p) => {
    if (!wide.matches) {
      if (faded) for (const el of [...blocks, heading]) el?.style.removeProperty("opacity");
      faded = false;
      return;
    }
    faded = true;
    const show = (k) => String(Math.round((1 - clamp(Math.abs(p - k) / 0.12, 0, 1)) * 100) / 100);
    blocks.forEach((el, k) => (el.style.opacity = show(k)));
    if (heading) heading.style.opacity = show(1);
  };

  const measure = () => {
    queued = 0;
    const line = readingLine();
    const mids = blocks.map((el) => {
      const box = el.getBoundingClientRect();
      return box.top + box.height / 2;
    });
    let p;
    if (still.matches) {
      // Reduced motion: one place per block, no scrubbing. A block is current once its top passes the line.
      p = 0;
      blocks.forEach((el, i) => {
        if (el.getBoundingClientRect().top < line) p = i;
      });
    } else if (line <= mids[0]) p = 0;
    else if (line >= mids[mids.length - 1]) p = mids.length - 1;
    else {
      const i = mids.findIndex((mid, j) => line >= mid && line < mids[j + 1]);
      const t = (line - mids[i]) / (mids[i + 1] - mids[i]);
      // Hold while a block sits on the line; move (scene and side) in the middle 70 % between two.
      p = i + clamp((t - 0.15) / 0.7, 0, 1);
    }
    const current = Math.round(p) - 1;
    if (current !== active) {
      chapters[active]?.removeAttribute("data-current");
      chapters[current]?.setAttribute("data-current", "");
      active = current;
    }
    fade(p);
    figure.setStory(p);
  };
  const queue = () => {
    if (!queued) queued = requestAnimationFrame(measure);
  };

  let listening = false;
  const listen = (on) => {
    if (on === listening) return;
    listening = on;
    if (on) {
      window.addEventListener("scroll", queue, { passive: true });
      window.addEventListener("resize", queue, { passive: true });
      queue();
    } else {
      window.removeEventListener("scroll", queue);
      window.removeEventListener("resize", queue);
    }
  };
  new IntersectionObserver((entries) => listen(entries[entries.length - 1].isIntersecting), { rootMargin: "50% 0px" }).observe(wrapper);
  still.addEventListener?.("change", queue);
  wide.addEventListener?.("change", queue);
  measure();
}
