import * as THREE from 'three';

export function initCvScene(canvas: HTMLCanvasElement) {
  const root = canvas.closest<HTMLElement>('[data-cv-scene]');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let renderer: THREE.WebGLRenderer;

  try {
    renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;
  } catch {
    return null;
  }

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 50);
  camera.position.set(0, 0.2, 10);

  const neutral = new THREE.MeshStandardMaterial({
    color: 0x85878e,
    metalness: 0.88,
    roughness: 0.24,
  });
  const accent = new THREE.MeshStandardMaterial({
    color: 0xe62815,
    metalness: 0.55,
    roughness: 0.3,
  });
  const line = new THREE.MeshBasicMaterial({
    color: 0xe62815,
    transparent: true,
    opacity: 0.55,
  });

  const sculpture = new THREE.Group();
  const geometry = new THREE.TorusKnotGeometry(1.4, 0.46, 180, 28, 2, 3);
  const core = new THREE.Mesh(geometry, neutral);
  const contour = new THREE.Mesh(
    geometry,
    new THREE.MeshBasicMaterial({ color: 0xe62815, wireframe: true, transparent: true, opacity: 0.055 }),
  );
  contour.scale.setScalar(1.006);
  sculpture.add(core, contour);

  const outerRing = new THREE.Mesh(new THREE.TorusGeometry(2.45, 0.018, 8, 140), line);
  outerRing.rotation.set(1.12, 0.25, 0.25);
  const innerRing = new THREE.Mesh(new THREE.TorusGeometry(2.05, 0.012, 8, 140), line.clone());
  innerRing.rotation.set(0.45, 0.8, -0.3);
  const satellite = new THREE.Mesh(new THREE.SphereGeometry(0.09, 20, 20), accent);
  satellite.position.set(2.25, 0.65, 0.4);
  sculpture.add(outerRing, innerRing, satellite);
  sculpture.rotation.set(0.35, -0.45, -0.12);
  scene.add(sculpture);

  const ambient = new THREE.HemisphereLight(0xf2f4fa, 0x111116, 2.1);
  const key = new THREE.DirectionalLight(0xffffff, 4.5);
  key.position.set(-3, 6, 7);
  const rim = new THREE.DirectionalLight(0x91a0c4, 2.5);
  rim.position.set(5, 0, -4);
  const redLight = new THREE.PointLight(0xe62815, 32, 20, 2);
  redLight.position.set(0, -2, 4);
  scene.add(ambient, key, rim, redLight);

  const clock = new THREE.Clock();
  const pointer = new THREE.Vector2();
  const pointerCurrent = new THREE.Vector2();
  let scrollTarget = 0;
  let scrollCurrent = 0;
  let mobile = false;
  let visible = true;
  let frame = 0;

  function themeColor() {
    return getComputedStyle(document.documentElement).getPropertyValue('--primary').trim() || '#e62815';
  }

  function syncTheme() {
    const color = new THREE.Color(themeColor());
    const lightMode = document.documentElement.dataset.colorMode === 'light';
    accent.color.copy(color);
    line.color.copy(color);
    (innerRing.material as THREE.MeshBasicMaterial).color.copy(color);
    (contour.material as THREE.MeshBasicMaterial).color.copy(color);
    redLight.color.copy(color);
    neutral.color.set(lightMode ? 0x686d76 : 0x85878e);
    ambient.intensity = lightMode ? 2.5 : 2.1;
  }

  function resize() {
    const width = window.innerWidth;
    const height = window.innerHeight;
    mobile = width < 800;
    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    sculpture.position.x = mobile ? 0 : Math.min(2.4, width / 600);
    sculpture.position.y = mobile ? 1.85 : 0.15;
    sculpture.scale.setScalar(mobile ? 0.58 : 1);
    if (reducedMotion) renderer.render(scene, camera);
  }

  function onPointerMove(event: PointerEvent) {
    pointer.set(
      (event.clientX / window.innerWidth - 0.5) * 2,
      (event.clientY / window.innerHeight - 0.5) * 2,
    );
  }

  function onScroll() {
    scrollTarget = Math.min(Math.max(window.scrollY / window.innerHeight, 0), 1);
  }

  function render() {
    const delta = Math.min(clock.getDelta(), 0.05);
    const elapsed = clock.elapsedTime;
    pointerCurrent.lerp(pointer, 1 - Math.exp(-delta * 4));
    scrollCurrent += (scrollTarget - scrollCurrent) * (1 - Math.exp(-delta * 5));

    sculpture.rotation.y = -0.45 + elapsed * 0.09 + pointerCurrent.x * 0.22;
    sculpture.rotation.x = 0.35 + pointerCurrent.y * 0.14 + scrollCurrent * 0.35;
    sculpture.position.y = (mobile ? 1.85 : 0.15) + scrollCurrent * 1.1;
    outerRing.rotation.z = 0.25 + elapsed * 0.055;
    innerRing.rotation.z = -0.3 - elapsed * 0.045;
    canvas.style.opacity = String(1 - scrollCurrent * 0.72);
    renderer.render(scene, camera);
  }

  function animate() {
    frame = window.requestAnimationFrame(animate);
    if (visible && !document.hidden) render();
  }

  const observer = new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
  });
  if (root) observer.observe(root);

  const themeObserver = new MutationObserver(syncTheme);
  themeObserver.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['data-color-mode', 'data-theme'],
  });

  window.addEventListener('resize', resize);
  window.addEventListener('pointermove', onPointerMove, { passive: true });
  window.addEventListener('scroll', onScroll, { passive: true });
  resize();
  syncTheme();
  onScroll();
  renderer.render(scene, camera);
  root?.setAttribute('data-ready', 'true');
  if (!reducedMotion) animate();

  return () => {
    window.cancelAnimationFrame(frame);
    window.removeEventListener('resize', resize);
    window.removeEventListener('pointermove', onPointerMove);
    window.removeEventListener('scroll', onScroll);
    observer.disconnect();
    themeObserver.disconnect();
    const geometries = new Set<THREE.BufferGeometry>();
    const materials = new Set<THREE.Material>();
    scene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        geometries.add(child.geometry);
        const childMaterials = Array.isArray(child.material) ? child.material : [child.material];
        childMaterials.forEach((material) => materials.add(material));
      }
    });
    geometries.forEach((geometry) => geometry.dispose());
    materials.forEach((material) => material.dispose());
    renderer.dispose();
  };
}
