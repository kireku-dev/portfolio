import { presentationBeats, presentationMeta } from '../data/presentation';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { initInputController } from './input-controller';
import { initPointerParallax } from './pointer-parallax';
import { initPresentationLoader } from './presentation-loader';
import { initHelpPanel, initQualitySettings } from './quality-settings';
import { initScrollTimeline } from './scroll-timeline';
import { initSmoothScroll } from './smooth-scroll';
import { initThreeScene } from './three-scene';
import { initTypographyDriver } from './typography-driver';
import { initWorldConsume } from './world-consume';

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function showWebGLFallback(onReady: () => void) {
  const fallback = document.getElementById('presentationFallback');
  const canvas = document.getElementById('webgl-canvas');
  if (fallback) fallback.hidden = false;
  if (canvas) canvas.hidden = true;
  onReady();
}

function watchThemeColor(scene: ReturnType<typeof initThreeScene>) {
  const observer = new MutationObserver(() => {
    const color = getComputedStyle(document.documentElement).getPropertyValue('--primary').trim();
    if (color) scene?.setThemeColor(color);
  });

  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['data-theme'],
  });
}

export function initPresentation() {
  initWorldConsume();

  if (prefersReducedMotion) {
    window.location.replace(import.meta.env.BASE_URL + '/cv');
    return;
  }

  const canvas = document.getElementById('webgl-canvas') as HTMLCanvasElement | null;
  if (!canvas) return;

  const loader = initPresentationLoader();
  const typography = initTypographyDriver(presentationBeats);
  const lenis = initSmoothScroll();

  const quality = initQualitySettings();
  const scene = initThreeScene(canvas, quality.getSettings());

  if (!scene) {
    showWebGLFallback(loader.complete);
    const timeline = initScrollTimeline({
      beats: presentationBeats,
      typography,
      onProgress: () => {},
    });
    initInputController({ timeline, beats: presentationBeats, lenis });
    initHelpPanel(presentationMeta.helpCopy);
    return;
  }

  quality.setScene(scene);
  quality.applyToScene();
  watchThemeColor(scene);
  initPointerParallax();

  const timeline = initScrollTimeline({
    beats: presentationBeats,
    typography,
    onProgress: (progress) => {
      scene.update(progress);
      document.getElementById('presentation-root')?.style.setProperty('--presentation-progress', String(progress));
    },
  });

  initInputController({ timeline, beats: presentationBeats, lenis });
  initHelpPanel(presentationMeta.helpCopy);

  window.requestAnimationFrame(() => {
    ScrollTrigger.refresh();
    loader.complete();
  });

  console.log('[PRESENTATION] Scroll + WebGL initialized');
}
