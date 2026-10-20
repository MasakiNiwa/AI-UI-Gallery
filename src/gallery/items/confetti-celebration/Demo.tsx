import { PartyPopper } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from '../../hooks';

const COLORS = ['#f43f5e', '#f59e0b', '#10b981', '#3b82f6', '#a855f7', '#ec4899', '#facc15'];

interface Piece {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  vr: number;
  w: number;
  h: number;
  color: string;
  round: boolean;
  life: number;
}

export default function Demo() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const pieces = useRef<Piece[]>([]);
  const raf = useRef(0);
  const reduced = useReducedMotion();
  const [done, setDone] = useState(false);

  useEffect(() => () => cancelAnimationFrame(raf.current), []);

  const loop = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d')!;
    const dpr = Math.min(window.devicePixelRatio, 2);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const h = canvas.height / dpr;
    pieces.current = pieces.current.filter((p) => p.y < h + 20 && p.life > 0);
    for (const p of pieces.current) {
      p.vy += 0.25; // gravity
      p.vx *= 0.99; // air drag
      p.vy *= 0.99;
      p.x += p.vx;
      p.y += p.vy;
      p.r += p.vr;
      p.life -= 0.006;
      ctx.save();
      ctx.globalAlpha = Math.min(1, p.life * 3);
      ctx.translate(p.x, p.y);
      ctx.rotate(p.r);
      ctx.fillStyle = p.color;
      if (p.round) {
        ctx.beginPath();
        ctx.arc(0, 0, p.w / 2, 0, Math.PI * 2);
        ctx.fill();
      } else ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h * Math.abs(Math.cos(p.r * 2)));
      ctx.restore();
    }
    if (pieces.current.length) raf.current = requestAnimationFrame(loop);
  };

  const fire = () => {
    setDone(true);
    const canvas = canvasRef.current;
    if (!canvas || reduced) return;
    const dpr = Math.min(window.devicePixelRatio, 2);
    canvas.width = canvas.clientWidth * dpr;
    canvas.height = canvas.clientHeight * dpr;
    const c = canvas.getBoundingClientRect();
    const b = buttonRef.current!.getBoundingClientRect();
    const ox = b.left + b.width / 2 - c.left;
    const oy = b.top - c.top;
    for (let i = 0; i < 150; i++) {
      const angle = -Math.PI / 2 + (Math.random() - 0.5) * 1.2;
      const speed = 8 + Math.random() * 10;
      pieces.current.push({
        x: ox,
        y: oy,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        r: Math.random() * Math.PI,
        vr: (Math.random() - 0.5) * 0.3,
        w: 6 + Math.random() * 6,
        h: 8 + Math.random() * 8,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        round: Math.random() < 0.3,
        life: 1,
      });
    }
    cancelAnimationFrame(raf.current);
    raf.current = requestAnimationFrame(loop);
  };

  return (
    <div className="relative flex h-full flex-col items-center justify-center gap-4 overflow-hidden p-6 text-center">
      <canvas ref={canvasRef} className="pointer-events-none absolute inset-0 z-10 size-full" />
      {done ? (
        <div
          className="rounded-2xl border border-line bg-surface p-6"
          style={{ animation: 'demo-done 300ms ease-out' }}
        >
          <style>{`@keyframes demo-done{from{opacity:0;transform:scale(.9)}}`}</style>
          <PartyPopper className="mx-auto size-10 text-amber-500" aria-hidden />
          <p className="mt-2 text-lg font-semibold">Thank you for your order!</p>
          <p className="text-sm text-muted">Order #A-2048 is on its way.</p>
        </div>
      ) : (
        <div className="rounded-2xl border border-line bg-surface p-6">
          <p className="text-sm text-muted">Total</p>
          <p className="text-3xl font-bold">$48.00</p>
        </div>
      )}
      <button
        ref={buttonRef}
        type="button"
        onClick={fire}
        className="rounded-xl bg-accent px-6 py-3 font-medium text-accent-contrast"
      >
        {done ? 'Celebrate again 🎉' : 'Complete purchase'}
      </button>
    </div>
  );
}
