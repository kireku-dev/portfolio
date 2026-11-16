export function initProjectCarousels() {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  document.querySelectorAll('[data-project-carousel]').forEach((carousel) => {
    const slides = Array.from(carousel.querySelectorAll('[data-carousel-slide]'));
    if (slides.length < 2) return;

    const dots = Array.from(carousel.querySelectorAll('[data-carousel-dot]'));
    const previous = carousel.querySelector('[data-carousel-prev]');
    const next = carousel.querySelector('[data-carousel-next]');
    const toggle = carousel.querySelector('[data-carousel-toggle]');
    const dialog = carousel.closest('dialog');
    let index = 0;
    let timer;
    let paused = false;
    let hovering = false;

    function show(nextIndex) {
      index = (nextIndex + slides.length) % slides.length;
      slides.forEach((slide, slideIndex) => {
        const active = slideIndex === index;
        slide.classList.toggle('is-active', active);
        slide.setAttribute('aria-hidden', String(!active));
      });
      dots.forEach((dot, dotIndex) => dot.setAttribute('aria-pressed', String(dotIndex === index)));
    }

    function stop() {
      window.clearTimeout(timer);
    }

    function schedule() {
      stop();
      const dialogClosed = dialog && !dialog.open;
      const focusedInside = carousel.contains(document.activeElement);
      if (paused || reducedMotion || hovering || dialogClosed || focusedInside) return;
      timer = window.setTimeout(() => {
        show(index + 1);
        schedule();
      }, 5000);
    }

    previous?.addEventListener('click', () => {
      show(index - 1);
      schedule();
    });

    next?.addEventListener('click', () => {
      show(index + 1);
      schedule();
    });

    dots.forEach((dot, dotIndex) => {
      dot.addEventListener('click', () => {
        show(dotIndex);
        schedule();
      });
    });

    toggle?.addEventListener('click', () => {
      paused = !paused;
      toggle.setAttribute('aria-pressed', String(paused));
      toggle.textContent = paused ? 'Reanudar' : 'Pausar';
      schedule();
    });

    carousel.addEventListener('pointerenter', () => {
      hovering = true;
      stop();
    });

    carousel.addEventListener('pointerleave', () => {
      hovering = false;
      schedule();
    });

    carousel.addEventListener('focusin', stop);
    carousel.addEventListener('focusout', (event) => {
      if (!carousel.contains(event.relatedTarget)) schedule();
    });

    carousel.addEventListener('keydown', (event) => {
      if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
      event.preventDefault();
      show(index + (event.key === 'ArrowRight' ? 1 : -1));
      schedule();
    });

    dialog?.addEventListener('close', stop);
    if (dialog) {
      const observer = new MutationObserver(schedule);
      observer.observe(dialog, { attributes: true, attributeFilter: ['open'] });
    }
  });
}
