// Native-scroll driver for the story: turns the reader's position among the chapters
// into one number s (0…4) and hands it to the figure. No scroll library: a passive
// scroll listener read once per animation frame, and an IntersectionObserver that
// switches the listener on only while the story is near the viewport and marks the
// chapter being read.

const clamp = (v, lo, hi) => Math.min(hi, Math.max(lo, v));

/**
 * @param {HTMLElement} wrapper  the element that holds the hero, the pinned figure and the chapters
 * @param {{ setStory(s: number): void }} figure
 */
export function driveStory(wrapper, figure) {
  const chapters = [...wrapper.querySelectorAll("[data-story-chapter]")];
  const pin = wrapper.querySelector("[data-story-pin]");
  if (!chapters.length || !figure) return;
  wrapper.setAttribute("data-story-live", "");
  const still = matchMedia("(prefers-reduced-motion: reduce)");
  let queued = 0;
  let active = -1;

  // The reading line: the middle of the viewport, or of what the pinned figure leaves free on a phone.
  const readingLine = () => {
    const h = window.innerHeight;
    const pinned = pin && getComputedStyle(pin).position === "sticky" && pin.getBoundingClientRect().width > window.innerWidth * 0.8;
    const top = pinned ? Math.max(0, pin.getBoundingClientRect().bottom) : 0;
    return top + (h - top) * 0.5;
  };

  const measure = () => {
    queued = 0;
    const line = readingLine();
    // Each chapter sits on the line when its text block does (centred on desktop, at the top of the chapter on a phone).
    const mids = chapters.map((chapter) => {
      const box = (chapter.querySelector("article") ?? chapter).getBoundingClientRect();
      return box.top + box.height / 2;
    });
    let s;
    if (still.matches) {
      // Reduced motion: one scene per chapter, no scrubbing. A chapter is current once its top passes the line.
      s = 0;
      chapters.forEach((chapter, i) => {
        if (chapter.getBoundingClientRect().top < line) s = i;
      });
    } else if (line <= mids[0]) s = 0;
    else if (line >= mids[mids.length - 1]) s = mids.length - 1;
    else {
      const i = mids.findIndex((mid, j) => line >= mid && line < mids[j + 1]);
      const t = (line - mids[i]) / (mids[i + 1] - mids[i]);
      // Hold each scene while its chapter sits on the line; move between them in the middle 70 %.
      s = i + clamp((t - 0.15) / 0.7, 0, 1);
    }
    const current = Math.round(s);
    if (current !== active) {
      chapters[active]?.removeAttribute("data-current");
      chapters[current]?.setAttribute("data-current", "");
      active = current;
    }
    figure.setStory(s);
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
  measure();
}
