import { useEffect, useRef, useState } from 'react';
import {
  Color,
  DirectionalLight,
  HemisphereLight,
  Mesh,
  MeshPhysicalMaterial,
  PerspectiveCamera,
  Scene,
  TorusKnotGeometry,
  WebGLRenderer,
} from 'three';
import type { DemoProps } from '../../types';
import { useReducedMotion } from '../../hooks';

export default function Demo({ mode }: DemoProps) {
  const hostRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const [supported] = useState(() => {
    try {
      return !!document.createElement('canvas').getContext('webgl2');
    } catch {
      return false;
    }
  });

  useEffect(() => {
    const host = hostRef.current!;
    if (!supported) return;
    let renderer: WebGLRenderer;
    try {
      renderer = new WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'low-power' });
    } catch {
      return;
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, mode === 'preview' ? 1 : 2));
    host.appendChild(renderer.domElement);
    renderer.domElement.className = 'absolute inset-0 size-full touch-none';

    const scene = new Scene();
    const camera = new PerspectiveCamera(40, 1, 0.1, 100);
    camera.position.set(0, 0, 7);
    scene.add(new HemisphereLight(0xdde6ff, 0x1a1d2e, 1.2));
    const teal = new DirectionalLight(0x5eead4, 2.2);
    teal.position.set(4, 2, 3);
    const pink = new DirectionalLight(0xf0abfc, 1.8);
    pink.position.set(-4, -2, 2);
    scene.add(teal, pink);

    const geometry = new TorusKnotGeometry(1.1, 0.36, mode === 'preview' ? 120 : 220, 32);
    const material = new MeshPhysicalMaterial({
      color: new Color('#6f7fd8'),
      metalness: 0.2,
      roughness: 0.25,
      clearcoat: 1,
      clearcoatRoughness: 0.1,
    });
    const mesh = new Mesh(geometry, material);
    scene.add(mesh);

    const resize = () => {
      const w = host.clientWidth;
      const h = host.clientHeight;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      // Pull the camera back on narrow screens so the object always fits.
      camera.position.z = w < h ? 9.5 : 7;
      camera.updateProjectionMatrix();
    };
    const ro = new ResizeObserver(resize);
    ro.observe(host);
    resize();

    // Drag to rotate, with inertia.
    const vel = { x: 0.004, y: 0.006 };
    let dragging = false;
    let last = { x: 0, y: 0 };
    const el = renderer.domElement;
    const down = (e: PointerEvent) => {
      dragging = true;
      last = { x: e.clientX, y: e.clientY };
      el.setPointerCapture(e.pointerId);
    };
    const move = (e: PointerEvent) => {
      if (!dragging) return;
      vel.y = (e.clientX - last.x) * 0.006;
      vel.x = (e.clientY - last.y) * 0.006;
      last = { x: e.clientX, y: e.clientY };
    };
    const up = () => (dragging = false);
    el.addEventListener('pointerdown', down);
    el.addEventListener('pointermove', move);
    el.addEventListener('pointerup', up);

    let visible = true;
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting));
    io.observe(host);

    let raf = 0;
    const start = performance.now();
    const frame = (now: number) => {
      raf = requestAnimationFrame(frame);
      if (!visible || document.hidden) return;
      mesh.rotation.x += vel.x;
      mesh.rotation.y += vel.y;
      if (!dragging) {
        // Ease back toward a gentle idle spin.
        vel.x += (0.003 - vel.x) * 0.02;
        vel.y += (0.005 - vel.y) * 0.02;
      }
      mesh.position.y = Math.sin((now - start) / 1200) * 0.15;
      renderer.render(scene, camera);
    };
    if (reduced) renderer.render(scene, camera);
    else raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      el.removeEventListener('pointerdown', down);
      el.removeEventListener('pointermove', move);
      el.removeEventListener('pointerup', up);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      el.remove();
    };
  }, [mode, reduced, supported]);

  return (
    <div
      ref={hostRef}
      className="relative h-full overflow-hidden bg-[radial-gradient(ellipse_at_top,#2a2f4a,#0d0f16_70%)] text-white"
    >
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 flex flex-col items-center gap-2 p-6 text-center">
        <h2 className="text-2xl font-bold @lg:text-4xl">Shape the future</h2>
        <p className="text-sm text-white/70">
          {!supported ? 'WebGL is not available.' : 'Drag the object to spin it.'}
        </p>
      </div>
    </div>
  );
}
