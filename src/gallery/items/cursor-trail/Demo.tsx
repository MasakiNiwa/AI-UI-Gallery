import { useEffect, useRef } from 'react';
import { useReducedMotion } from '../../hooks';

const N = 40;

export default function Demo() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext('2d')!;
    const dpr = Math.min(window.devicePixelRatio, 2);
    let w = 0;
    let h = 0;
    const resize = () => {
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
    };
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    resize();

    const pts = Array.from({ length: N }, () => ({ x: w / 2, y: h / 2 }));
    const target = { x: w / 2, y: h / 2 };
    let lastMove = -1e9;
    const onMove = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      target.x = e.clientX - r.left;
      target.y = e.clientY - r.top;
      lastMove = performance.now();
    };
    canvas.addEventListener('pointermove', onMove);
    canvas.addEventListener('pointerdown', onMove);

    let raf = 0;
    const draw = (now: number) => {
      if (now - lastMove > 1500) {
        // Idle: drift along a slow figure-eight.
        const t = now / 1400;
        target.x = w / 2 + Math.sin(t) * w * 0.3;
        target.y = h / 2 + Math.sin(t * 2) * h * 0.2;
      }
      pts[0].x += (target.x - pts[0].x) * 0.35;
      pts[0].y += (target.y - pts[0].y) * 0.35;
      for (let i = 1; i < N; i++) {
        pts[i].x += (pts[i - 1].x - pts[i].x) * 0.42;
        pts[i].y += (pts[i - 1].y - pts[i].y) * 0.42;
      }
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.globalCompositeOperation = 'source-over';
      ctx.fillStyle = 'rgba(11,13,18,0.35)';
      ctx.fillRect(0, 0, w, h);
      ctx.globalCompositeOperation = 'lighter';
      ctx.lineCap = 'round';
      ctx.shadowBlur = 16;
      for (let i = 0; i < N - 1; i++) {
        const k = 1 - i / N;
        const hue = 185 + i * 2.2;
        ctx.strokeStyle = `hsla(${hue}, 85%, 65%, ${k * 0.9})`;
        ctx.shadowColor = `hsla(${hue}, 90%, 60%, ${k})`;
        ctx.lineWidth = 14 * k;
        ctx.beginPath();
        ctx.moveTo(pts[i].x, pts[i].y);
        ctx.lineTo(pts[i + 1].x, pts[i + 1].y);
        ctx.stroke();
      }
      raf = requestAnimationFrame(draw);
    };
    if (!reduced) raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      canvas.removeEventListener('pointermove', onMove);
      canvas.removeEventListener('pointerdown', onMove);
    };
  }, [reduced]);

  return (
    <div className="relative h-full overflow-hidden bg-[#0b0d12]">
      <canvas ref={canvasRef} className="absolute inset-0 size-full touch-none" />
      <p className="pointer-events-none absolute inset-x-0 bottom-6 text-center text-sm text-slate-400">
        {reduced ? 'Animation disabled (reduced motion)' : 'Move your cursor or finger'}
      </p>
    </div>
  );
}
