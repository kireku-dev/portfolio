import gsap from 'gsap';

interface ParallaxLayer {
  element: HTMLElement;
  x: (value: number) => void;
  y: (value: number) => void;
  depth: number;
}

export function initPointerParallax() {
  if (!window.matchMedia('(pointer: fine)').matches) return () => {};

  const layers = Array.from(document.querySelectorAll<HTMLElement>('[data-parallax-depth]')).map((element): ParallaxLayer => ({
    element,
    depth: Number(element.dataset.parallaxDepth ?? 1),
    x: gsap.quickTo(element, 'x', { duration: 0.85, ease: 'power3.out' }),
    y: gsap.quickTo(element, 'y', { duration: 0.85, ease: 'power3.out' }),
  }));

  function move(event: PointerEvent) {
    const x = (event.clientX / window.innerWidth - 0.5) * 2;
    const y = (event.clientY / window.innerHeight - 0.5) * 2;
    layers.forEach((layer) => {
      layer.x(x * layer.depth * 12);
      layer.y(y * layer.depth * 9);
    });
  }

  function reset() {
    layers.forEach((layer) => {
      layer.x(0);
      layer.y(0);
    });
  }

  window.addEventListener('pointermove', move, { passive: true });
  document.documentElement.addEventListener('mouseleave', reset);

  return () => {
    window.removeEventListener('pointermove', move);
    document.documentElement.removeEventListener('mouseleave', reset);
    layers.forEach((layer) => gsap.killTweensOf(layer.element));
  };
}
