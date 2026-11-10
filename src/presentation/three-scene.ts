import * as THREE from 'three';
import type { SceneKey } from '../data/presentation';
import { presentationBeats } from '../data/presentation';
import { getSceneStateForBeat } from './scene-states';

export interface QualitySettings {
  highQuality: boolean;
  pixelRatio: number;
  particleCount: number;
}

export interface ThreeSceneController {
  update: (progress: number) => void;
  setQuality: (settings: QualitySettings) => void;
  setThemeColor: (hex: string) => void;
  dispose: () => void;
  isReady: () => boolean;
}

type SceneMaterial = THREE.Material & {
  color?: THREE.Color;
  opacity?: number;
};

function getThemePrimaryColor() {
  const value = getComputedStyle(document.documentElement).getPropertyValue('--primary').trim();
  return value || '#E62815';
}

function tagMaterial<T extends SceneMaterial>(material: T, baseOpacity: number, themeBound = false) {
  material.transparent = true;
  material.opacity = baseOpacity;
  material.userData.baseOpacity = baseOpacity;
  material.userData.themeBound = themeBound;
  return material;
}

function solidMaterial(accent = false, opacity = 1) {
  return tagMaterial(
    new THREE.MeshStandardMaterial({
      color: accent ? getThemePrimaryColor() : 0x777b84,
      metalness: accent ? 0.58 : 0.86,
      roughness: accent ? 0.3 : 0.23,
    }),
    opacity,
    accent,
  );
}

function glowMaterial(opacity = 0.5, wireframe = false) {
  return tagMaterial(
    new THREE.MeshBasicMaterial({
      color: getThemePrimaryColor(),
      wireframe,
      depthWrite: !wireframe,
    }),
    opacity,
    true,
  );
}

function lineMaterial(opacity = 0.3) {
  return tagMaterial(
    new THREE.LineBasicMaterial({ color: getThemePrimaryColor() }),
    opacity,
    true,
  );
}

function createParticleField(count: number, spread: number) {
  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count; i += 1) {
    positions[i * 3] = (Math.random() - 0.5) * spread;
    positions[i * 3 + 1] = (Math.random() - 0.5) * spread;
    positions[i * 3 + 2] = (Math.random() - 0.5) * spread;
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  const material = tagMaterial(
    new THREE.PointsMaterial({
      color: getThemePrimaryColor(),
      size: 0.025,
      sizeAttenuation: true,
      depthWrite: false,
    }),
    0.5,
    true,
  );

  return new THREE.Points(geometry, material);
}

function createWireGrid(size: number, divisions: number) {
  const mesh = new THREE.Mesh(
    new THREE.PlaneGeometry(size, size, divisions, divisions),
    glowMaterial(0.09, true),
  );
  mesh.rotation.x = -Math.PI / 2;
  mesh.position.y = -3.1;
  return mesh;
}

function createIntroSculpture() {
  const group = new THREE.Group();
  const geometry = new THREE.TorusKnotGeometry(1.65, 0.48, 180, 28, 2, 3);
  const core = new THREE.Mesh(geometry, solidMaterial());
  const contour = new THREE.Mesh(geometry, glowMaterial(0.08, true));
  contour.scale.setScalar(1.006);
  group.add(core, contour);

  [2.75, 3.15].forEach((radius, index) => {
    const ring = new THREE.Mesh(
      new THREE.TorusGeometry(radius, index === 0 ? 0.018 : 0.009, 8, 140),
      glowMaterial(index === 0 ? 0.52 : 0.2),
    );
    ring.rotation.set(Math.PI / (2.5 + index * 0.3), index * 0.45, index * 0.3);
    group.add(ring);
  });

  const satellite = new THREE.Mesh(new THREE.SphereGeometry(0.075, 20, 20), glowMaterial(0.95));
  satellite.position.set(2.7, 0.35, 0.3);
  group.add(satellite, createWireGrid(22, 28));
  group.rotation.set(0.25, -0.35, 0.08);
  return group;
}

function createCodeBlocks() {
  const group = new THREE.Group();
  for (let i = 0; i < 7; i += 1) {
    const width = 1.5 + (i % 3) * 0.75;
    const block = new THREE.Mesh(
      new THREE.BoxGeometry(width, 0.34, 0.65),
      solidMaterial(i === 2 || i === 5),
    );
    block.position.set((i % 2 === 0 ? -0.55 : 0.55), (i - 3) * 0.58, (i % 3) * -0.28);
    block.rotation.y = (i % 2 === 0 ? -1 : 1) * 0.08;
    group.add(block);
  }
  group.rotation.set(-0.12, -0.35, -0.08);
  return group;
}

function createTreeGraph() {
  const group = new THREE.Group();
  const nodes: THREE.Vector3[] = [];
  const edges: number[] = [];
  const levels = 4;
  let index = 0;

  for (let level = 0; level < levels; level += 1) {
    const count = 2 ** level;
    const spread = count * 1.25;
    for (let i = 0; i < count; i += 1) {
      const x = count === 1 ? 0 : (i / (count - 1) - 0.5) * spread;
      const y = (levels / 2 - level) * 0.95;
      nodes.push(new THREE.Vector3(x, y, Math.sin(index * 2.3) * 0.3));
      if (level > 0) edges.push(Math.floor((index - 1) / 2), index);
      index += 1;
    }
  }

  nodes.forEach((position, nodeIndex) => {
    const sphere = new THREE.Mesh(
      new THREE.IcosahedronGeometry(nodeIndex === 0 ? 0.3 : 0.2, 2),
      solidMaterial(nodeIndex === 0 || nodeIndex === nodes.length - 1),
    );
    sphere.position.copy(position);
    group.add(sphere);
  });

  const linePositions = new Float32Array(edges.length * 3);
  edges.forEach((nodeIndex, i) => {
    const position = nodes[nodeIndex];
    linePositions[i * 3] = position.x;
    linePositions[i * 3 + 1] = position.y;
    linePositions[i * 3 + 2] = position.z;
  });
  const lineGeometry = new THREE.BufferGeometry();
  lineGeometry.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));
  group.add(new THREE.LineSegments(lineGeometry, lineMaterial(0.35)));
  group.rotation.set(0.08, -0.25, -0.08);
  return group;
}

function createBrowserPlanes() {
  const group = new THREE.Group();
  for (let i = 0; i < 4; i += 1) {
    const windowGroup = new THREE.Group();
    const geometry = new THREE.BoxGeometry(2.7, 1.72, 0.08);
    const panel = new THREE.Mesh(geometry, solidMaterial(i === 3));
    const edges = new THREE.LineSegments(new THREE.EdgesGeometry(geometry), lineMaterial(0.38));
    const addressBar = new THREE.Mesh(new THREE.BoxGeometry(2.25, 0.025, 0.02), glowMaterial(0.7));
    addressBar.position.set(0, 0.58, 0.06);
    windowGroup.add(panel, edges, addressBar);
    windowGroup.position.set((i - 1.5) * 0.8, Math.sin(i * 1.4) * 0.65, -i * 0.85);
    windowGroup.rotation.y = (i - 1.5) * 0.18;
    group.add(windowGroup);
  }
  group.rotation.set(-0.08, -0.2, 0);
  return group;
}

function createServerStack() {
  const group = new THREE.Group();
  for (let i = 0; i < 5; i += 1) {
    const unit = new THREE.Group();
    const box = new THREE.Mesh(new THREE.BoxGeometry(2.15, 0.62, 1.35), solidMaterial(i === 2));
    const status = new THREE.Mesh(new THREE.BoxGeometry(0.48, 0.035, 0.025), glowMaterial(0.9));
    status.position.set(0.55, 0, 0.69);
    unit.add(box, status);
    unit.position.y = (i - 2) * 0.83;
    unit.rotation.y = (i - 2) * 0.035;
    group.add(unit);
  }
  group.rotation.set(0.08, -0.5, -0.06);
  return group;
}

function createColumnGrid() {
  const group = new THREE.Group();
  for (let i = 0; i < 5; i += 1) {
    const height = 1.6 + (i % 2 === 0 ? 1.35 : 0);
    const column = new THREE.Mesh(
      new THREE.BoxGeometry(0.68, height, 0.68),
      solidMaterial(i === 2),
    );
    column.position.set((i - 2) * 1.05, height / 2 - 1.6, (i % 2) * -0.25);
    group.add(column);
  }
  const baseline = new THREE.Mesh(new THREE.BoxGeometry(5.5, 0.025, 1.4), glowMaterial(0.5));
  baseline.position.y = -1.62;
  group.add(baseline);
  group.rotation.set(0.05, -0.35, 0);
  return group;
}

function createNodeNetwork() {
  const group = new THREE.Group();
  const nodes: THREE.Vector3[] = [];
  const count = 10;

  for (let i = 0; i < count; i += 1) {
    const angle = (i / count) * Math.PI * 2;
    const radius = 2.1 + (i % 3) * 0.45;
    const position = new THREE.Vector3(
      Math.cos(angle) * radius,
      Math.sin(i * 1.7) * 1.4,
      Math.sin(angle) * radius,
    );
    nodes.push(position);
    const sphere = new THREE.Mesh(new THREE.IcosahedronGeometry(0.18, 2), solidMaterial(i % 4 === 0));
    sphere.position.copy(position);
    group.add(sphere);
  }

  const edgePoints: number[] = [];
  for (let i = 0; i < count; i += 1) {
    const a = nodes[i];
    const b = nodes[(i + 1) % count];
    edgePoints.push(a.x, a.y, a.z, b.x, b.y, b.z);
    if (i % 2 === 0) {
      const c = nodes[(i + 3) % count];
      edgePoints.push(a.x, a.y, a.z, c.x, c.y, c.z);
    }
  }
  const lineGeometry = new THREE.BufferGeometry();
  lineGeometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array(edgePoints), 3));
  group.add(new THREE.LineSegments(lineGeometry, lineMaterial(0.25)));
  return group;
}

function createPlanetSystem(options: { radius: number; ringRadius: number; moons: number; detail?: number }) {
  const { radius, ringRadius, moons, detail = 2 } = options;
  const group = new THREE.Group();
  const geometry = new THREE.IcosahedronGeometry(radius, detail);
  const planet = new THREE.Mesh(geometry, solidMaterial());
  const contour = new THREE.Mesh(geometry, glowMaterial(0.1, true));
  contour.scale.setScalar(1.005);
  group.add(planet, contour);

  const ring = new THREE.Mesh(
    new THREE.TorusGeometry(ringRadius, 0.018, 8, 120),
    glowMaterial(0.48),
  );
  ring.rotation.x = Math.PI / 2.4;
  group.add(ring);

  for (let i = 0; i < moons; i += 1) {
    const angle = (i / moons) * Math.PI * 2;
    const orbit = ringRadius + 0.35 + i * 0.32;
    const moon = new THREE.Mesh(new THREE.IcosahedronGeometry(0.13, 1), solidMaterial(i === 0));
    moon.position.set(Math.cos(angle) * orbit, Math.sin(angle * 2) * 0.45, Math.sin(angle) * orbit);
    group.add(moon);
  }
  return group;
}

function createCloudBurst() {
  const group = new THREE.Group();
  for (let i = 0; i < 7; i += 1) {
    const mesh = new THREE.Mesh(
      new THREE.IcosahedronGeometry(0.35 + (i % 3) * 0.13, 1),
      solidMaterial(i === 3),
    );
    const angle = (i / 7) * Math.PI * 2;
    mesh.position.set(Math.cos(angle) * 2.6, 1.3 + Math.sin(i * 2) * 1.1, Math.sin(angle) * 2.6);
    group.add(mesh);
  }
  return group;
}

function createOutro() {
  const group = new THREE.Group();
  [2.2, 3.1, 4].forEach((radius, index) => {
    const ring = new THREE.Mesh(
      new THREE.TorusGeometry(radius, index === 0 ? 0.045 : 0.015, 10, 140),
      index === 0 ? solidMaterial(true) : glowMaterial(0.3),
    );
    ring.rotation.set(Math.PI / (2.2 + index * 0.25), index * 0.35, index * 0.45);
    group.add(ring);
  });
  group.add(new THREE.Mesh(new THREE.IcosahedronGeometry(0.7, 3), solidMaterial()));
  return group;
}

export function initThreeScene(
  canvas: HTMLCanvasElement,
  initialQuality: QualitySettings,
): ThreeSceneController | null {
  let renderer: THREE.WebGLRenderer;

  try {
    renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: initialQuality.highQuality,
      alpha: false,
      powerPreference: initialQuality.highQuality ? 'high-performance' : 'low-power',
    });
    renderer.setClearColor(0x0b0b0d, 1);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.12;
  } catch {
    return null;
  }

  const scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0x0b0b0d, 0.026);

  const camera = new THREE.PerspectiveCamera(46, 1, 0.1, 100);
  camera.position.set(0, 2, 12);

  const ambient = new THREE.HemisphereLight(0xe7ebf2, 0x09090b, 1.8);
  const key = new THREE.DirectionalLight(0xffffff, 4.2);
  key.position.set(-3, 7, 8);
  const rim = new THREE.DirectionalLight(0x8294bd, 2.8);
  rim.position.set(6, 1, -5);
  const accentLight = new THREE.PointLight(getThemePrimaryColor(), 42, 28, 2);
  accentLight.position.set(1, -1, 5);
  scene.add(ambient, key, rim, accentLight);

  const groups: Record<SceneKey, THREE.Object3D> = {
    intro: createIntroSculpture(),
    compile: createCodeBlocks(),
    datastructures: createTreeGraph(),
    web: createBrowserPlanes(),
    lowlevel: createServerStack(),
    oracle: createColumnGrid(),
    network: new THREE.Group(),
    cloud: new THREE.Group(),
    ai: new THREE.Group(),
    outro: createOutro(),
  };

  groups.network.add(createNodeNetwork(), createPlanetSystem({ radius: 0.75, ringRadius: 1.35, moons: 2 }));
  groups.cloud.add(
    createPlanetSystem({ radius: 1.35, ringRadius: 2.45, moons: 4 }),
    createCloudBurst(),
  );
  groups.ai.add(createPlanetSystem({ radius: 1.05, ringRadius: 1.9, moons: 3, detail: 3 }));
  Object.values(groups).forEach((group) => scene.add(group));

  let particleField = createParticleField(initialQuality.particleCount, 28);
  scene.add(particleField);

  let quality = initialQuality;
  let progress = 0;
  let ready = false;
  let animationId = 0;
  let stageOffset = 0;
  let mobileLayout = false;
  const clock = new THREE.Clock();
  const lookAtTarget = new THREE.Vector3();
  const pointerTarget = new THREE.Vector2();
  const pointerCurrent = new THREE.Vector2();

  function resize() {
    const width = window.innerWidth;
    const height = window.innerHeight;
    mobileLayout = width < 800;
    stageOffset = mobileLayout ? 0 : Math.min(2.7, width / 570);
    Object.values(groups).forEach((group) => {
      group.position.x = stageOffset;
      group.position.y = mobileLayout ? 1.65 : 0;
      group.scale.setScalar(mobileLayout ? 0.72 : 1);
    });
    renderer.setPixelRatio(quality.pixelRatio);
    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
  }

  function onPointerMove(event: PointerEvent) {
    pointerTarget.set(
      (event.clientX / window.innerWidth - 0.5) * 2,
      (event.clientY / window.innerHeight - 0.5) * 2,
    );
  }

  function updateMaterial(child: THREE.Object3D, weight?: number) {
    if (!('material' in child) || !child.material) return;
    const materials = Array.isArray(child.material) ? child.material : [child.material];
    materials.forEach((material) => {
      const sceneMaterial = material as SceneMaterial;
      if (weight !== undefined && sceneMaterial.opacity !== undefined) {
        sceneMaterial.opacity = (sceneMaterial.userData.baseOpacity ?? 1) * weight;
      }
    });
  }

  function applyGroupWeights(weights: Record<SceneKey, number>) {
    (Object.keys(groups) as SceneKey[]).forEach((sceneKey) => {
      const group = groups[sceneKey];
      const weight = THREE.MathUtils.smoothstep(weights[sceneKey], 0, 1);
      group.visible = weight > 0.008;
      if (!group.visible) return;
      group.traverse((child) => updateMaterial(child, weight));
    });
  }

  function renderFrame() {
    const delta = Math.min(clock.getDelta(), 0.05);
    const elapsed = clock.elapsedTime;
    const state = getSceneStateForBeat(presentationBeats, progress);

    pointerCurrent.lerp(pointerTarget, 1 - Math.exp(-delta * 3.5));
    camera.position.set(...state.cameraPosition);
    camera.position.x += pointerCurrent.x * 0.32;
    camera.position.y -= pointerCurrent.y * 0.2;
    lookAtTarget.set(...state.cameraLookAt);
    lookAtTarget.x += stageOffset * 0.3 + pointerCurrent.x * 0.1;
    lookAtTarget.y += mobileLayout ? 0.8 : 0;
    camera.lookAt(lookAtTarget);

    groups.intro.rotation.y = -0.35 + elapsed * 0.075 + pointerCurrent.x * 0.14;
    groups.intro.rotation.x = 0.25 + Math.sin(elapsed * 0.35) * 0.04 - pointerCurrent.y * 0.08;
    groups.compile.rotation.y = -0.35 + Math.sin(elapsed * 0.25) * 0.18;
    groups.datastructures.rotation.y = -0.25 + elapsed * 0.065;
    groups.web.rotation.y = -0.2 + Math.sin(elapsed * 0.3) * 0.15;
    groups.lowlevel.rotation.y = -0.5 + elapsed * 0.055;
    groups.oracle.rotation.y = -0.35 + Math.sin(elapsed * 0.2) * 0.18;
    groups.network.rotation.y = elapsed * 0.075;
    groups.cloud.rotation.y = -elapsed * 0.055;
    groups.ai.rotation.y = elapsed * 0.09;
    groups.ai.rotation.z = Math.sin(elapsed * 0.25) * 0.08;
    groups.outro.rotation.y = elapsed * 0.06;
    groups.outro.rotation.z = Math.sin(elapsed * 0.2) * 0.12;
    particleField.rotation.y = elapsed * 0.015 * state.particleSpeed;
    particleField.rotation.x = Math.sin(elapsed * 0.08) * 0.05;

    applyGroupWeights(state.groupWeights);
    renderer.render(scene, camera);
    ready = true;
  }

  function animate() {
    animationId = window.requestAnimationFrame(animate);
    if (!document.hidden) renderFrame();
  }

  resize();
  window.addEventListener('resize', resize);
  window.addEventListener('pointermove', onPointerMove, { passive: true });
  renderFrame();
  animate();

  return {
    update: (nextProgress: number) => {
      progress = nextProgress;
    },
    setQuality: (settings: QualitySettings) => {
      quality = settings;
      resize();
      scene.remove(particleField);
      particleField.geometry.dispose();
      (particleField.material as THREE.Material).dispose();
      particleField = createParticleField(settings.particleCount, settings.highQuality ? 28 : 22);
      scene.add(particleField);
    },
    setThemeColor: (hex: string) => {
      const themeColor = new THREE.Color(hex);
      accentLight.color.copy(themeColor);
      scene.traverse((child) => {
        if (!('material' in child) || !child.material) return;
        const materials = Array.isArray(child.material) ? child.material : [child.material];
        materials.forEach((material) => {
          const sceneMaterial = material as SceneMaterial;
          if (sceneMaterial.userData.themeBound && sceneMaterial.color) {
            sceneMaterial.color.copy(themeColor);
          }
        });
      });
    },
    dispose: () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointermove', onPointerMove);
      window.cancelAnimationFrame(animationId);
      const geometries = new Set<THREE.BufferGeometry>();
      const materials = new Set<THREE.Material>();
      scene.traverse((child) => {
        if ('geometry' in child && child.geometry) geometries.add(child.geometry as THREE.BufferGeometry);
        if ('material' in child && child.material) {
          const childMaterials = Array.isArray(child.material) ? child.material : [child.material];
          childMaterials.forEach((material) => materials.add(material));
        }
      });
      geometries.forEach((geometry) => geometry.dispose());
      materials.forEach((material) => material.dispose());
      renderer.dispose();
    },
    isReady: () => ready,
  };
}
