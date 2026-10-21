import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from '../../hooks';
import type { DemoProps } from '../../types';

const MAX = 6000;
const RADIUS = 80;

export default function Demo({ mode }: DemoProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [word, setWord] = useState('HELLO');
  const wordRef = useRef(word);
  const relayout = useRef<() => void>(() => {});
  const reduced = useReducedMotion();

  useEffect(() => {
    wordRef.current = word;
    relayout.current();
  }, [word]);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext('2d')!;
    const dpr = Math.min(window.devicePixelRatio, 2);
    const px = new Float32Array(MAX);
    const py = new Float32Array(MAX);
    const vx = new Float32Array(MAX);
    const vy = new Float32Array(MAX);
    const hx = new Float32Array(MAX);
    const hy = new Float32Array(MAX);
    let count = 0;
    let w = 0;
    let h = 0;
    let step = 4;
    const pointer = { x: -1e4, y: -1e4 };

    const layout = () => {
      const text = wordRef.current.trim().toUpperCase() || ' ';
      const off = document.createElement('canvas');
      off.width = w;
      off.height = h;
      const o = off.getContext('2d', { willReadFrequently: true })!;
      let size = Math.min(h * 0.55, 200);
      o.font = `900 ${size}px system-ui, sans-serif`;
      const tw = o.measureText(text).width;
      if (tw > w * 0.9) size *= (w * 0.9) / tw;
      o.font = `900 ${size}px system-ui, sans-serif`;
      o.textAlign = 'center';
      o.textBaseline = 'middle';
      o.fillText(text, w / 2, h / 2);
      const data = o.getImageData(0, 0, w, h).data;
      step = Math.max(3, Math.round(Math.sqrt((w * h) / 9000)));
      const prev = count;
      count = 0;
      for (let y = 0; y < h && count < MAX; y += step) {
        for (let x = 0; x < w && count < MAX; x += step) {
          if (data[(y * w + x) * 4 + 3] < 128) continue;
          hx[count] = x;
          hy[count] = y;
          if (count >= prev) {
            px[count] = Math.random() * w;
            py[count] = Math.random() * h;
          }
          count++;
        }
      }
    };

    const draw = () => {
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);
      const s = step * 0.75;
      for (let i = 0; i < count; i++) {
        ctx.fillStyle = `hsl(${200 + (hx[i] / w) * 140}, 85%, 62%)`;
        ctx.fillRect(px[i], py[i], s, s);
      }
    };

    const resize = () => {
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      layout();
      if (reduced) {
        px.set(hx);
        py.set(hy);
        draw();
      }
    };
    relayout.current = () => {
      layout();
      if (reduced) {
        px.set(hx);
        py.set(hy);
        draw();
      }
    };
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    resize();

    const onMove = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      pointer.x = e.clientX - r.left;
      pointer.y = e.clientY - r.top;
    };
    const onLeave = () => {
      pointer.x = pointer.y = -1e4;
    };
    canvas.addEventListener('pointermove', onMove);
    canvas.addEventListener('pointerdown', onMove);
    canvas.addEventListener('pointerleave', onLeave);

    let raf = 0;
    const tick = (now: number) => {
      // In the gallery preview, a ghost pointer sweeps across the text.
      if (mode === 'preview') {
        pointer.x = w / 2 + Math.sin(now / 900) * w * 0.35;
        pointer.y = h / 2 + Math.cos(now / 600) * h * 0.12;
      }
      for (let i = 0; i < count; i++) {
        const dx = px[i] - pointer.x;
        const dy = py[i] - pointer.y;
        const d2 = dx * dx + dy * dy;
        if (d2 < RADIUS * RADIUS) {
          const d = Math.sqrt(d2) || 1;
          const f = (1 - d / RADIUS) * 6;
          vx[i] += (dx / d) * f;
          vy[i] += (dy / d) * f;
        }
        vx[i] = (vx[i] + (hx[i] - px[i]) * 0.06) * 0.85;
        vy[i] = (vy[i] + (hy[i] - py[i]) * 0.06) * 0.85;
        px[i] += vx[i];
        py[i] += vy[i];
      }
      draw();
      raf = requestAnimationFrame(tick);
    };
    if (!reduced) raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      relayout.current = () => {};
      canvas.removeEventListener('pointermove', onMove);
      canvas.removeEventListener('pointerdown', onMove);
      canvas.removeEventListener('pointerleave', onLeave);
    };
  }, [reduced, mode]);

  return (
    <div className="flex h-full flex-col bg-[#0b0d12]">
      <canvas
        ref={canvasRef}
        className="min-h-0 w-full flex-1 touch-none"
        aria-label={`Particle text: ${word}`}
        role="img"
      />
      {mode === 'full' && (
        <div className="flex justify-center p-3">
          <input
            value={word}
            maxLength={10}
            onChange={(e) => setWord(e.target.value)}
            aria-label="Word"
            className="h-10 w-48 rounded-xl border border-white/15 bg-white/5 px-3 text-center font-semibold tracking-widest text-white uppercase outline-none focus:border-sky-400"
          />
        </div>
      )}
    </div>
  );
}
