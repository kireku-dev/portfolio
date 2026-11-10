import gsap from 'gsap';

export interface PresentationLoaderController {
  complete: () => void;
}

export function initPresentationLoader(): PresentationLoaderController {
  const loader = document.getElementById('presentationLoading');
  const count = document.getElementById('presentationLoadingCount');
  const bar = document.getElementById('presentationLoadingBar');
  const root = document.getElementById('presentation-root');
  const progress = { value: 0 };
  let completed = false;

  function renderProgress() {
    const value = Math.round(progress.value);
    if (count) count.textContent = String(value).padStart(3, '0');
    if (bar) bar.style.transform = `scaleX(${value / 100})`;
  }

  const loadingTween = gsap.to(progress, {
    value: 88,
    duration: 1.5,
    ease: 'power2.out',
    onUpdate: renderProgress,
  });

  function complete() {
    if (!loader || completed) return;
    completed = true;
    loadingTween.kill();

    const timeline = gsap.timeline({
      onComplete: () => {
        loader.hidden = true;
        loader.setAttribute('aria-hidden', 'true');
        root?.setAttribute('data-ready', 'true');
      },
    });

    timeline
      .to(progress, {
        value: 100,
        duration: 0.35,
        ease: 'power2.inOut',
        onUpdate: renderProgress,
      })
      .to('[data-loader-reveal]', {
        opacity: 0,
        y: -18,
        duration: 0.3,
        stagger: 0.035,
        ease: 'power2.in',
      }, '+=0.08')
      .set(loader, { backgroundColor: 'transparent' })
      .to('.presentation-loading__panel--left', {
        xPercent: -101,
        duration: 0.9,
        ease: 'power4.inOut',
      }, 'reveal')
      .to('.presentation-loading__panel--right', {
        xPercent: 101,
        duration: 0.9,
        ease: 'power4.inOut',
      }, 'reveal')
      .fromTo('.presentation-hud, .presentation-controls, .presentation-scroll-cue', {
        opacity: 0,
      }, {
        opacity: 1,
        duration: 0.6,
        ease: 'power2.out',
      }, 'reveal+=0.35')
      .fromTo('.typography-stage__content', {
        opacity: 0,
        y: 30,
      }, {
        opacity: 1,
        y: 0,
        duration: 0.75,
        ease: 'power3.out',
      }, 'reveal+=0.28');
  }

  renderProgress();
  return { complete };
}
