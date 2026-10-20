import { useRef, type PointerEvent } from 'react';
import { useReducedMotion } from '../../hooks';

export default function Demo() {
  const cardRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    const el = cardRef.current;
    if (!el || reduced) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    el.style.setProperty('--rx', `${(0.5 - py) * 30}deg`);
    el.style.setProperty('--ry', `${(px - 0.5) * 30}deg`);
    el.style.setProperty('--gx', `${px * 100}%`);
    el.style.setProperty('--gy', `${py * 100}%`);
    el.style.setProperty('--glare', '1');
    el.style.transition = 'transform 60ms linear';
  };

  const onLeave = () => {
    const el = cardRef.current;
    if (!el) return;
    el.style.transition = 'transform 500ms cubic-bezier(.2,.8,.2,1)';
    el.style.setProperty('--rx', '0deg');
    el.style.setProperty('--ry', '0deg');
    el.style.setProperty('--glare', '0');
  };

  return (
    <div className="flex h-full items-center justify-center p-6" style={{ perspective: '900px' }}>
      <div
        ref={cardRef}
        onPointerMove={onMove}
        onPointerLeave={onLeave}
        onPointerUp={onLeave}
        className="relative aspect-[3/4] w-56 touch-none rounded-3xl bg-gradient-to-br from-slate-700 via-slate-800 to-slate-900 p-5 text-white shadow-2xl select-none"
        style={{
          transform: 'rotateX(var(--rx, 0deg)) rotateY(var(--ry, 0deg))',
          transformStyle: 'preserve-3d',
        }}
      >
        <div
          className="pointer-events-none absolute inset-0 rounded-3xl transition-opacity duration-300"
          style={{
            opacity: 'var(--glare, 0)',
            background:
              'radial-gradient(circle at var(--gx, 50%) var(--gy, 50%), rgba(255,255,255,.35), transparent 55%)',
          }}
        />
        <div style={{ transform: 'translateZ(40px)' }}>
          <p className="text-xs tracking-widest text-white/60 uppercase">Rare · No. 042</p>
          <p className="mt-1 text-xl font-bold">Aurora Fox</p>
        </div>
        <div
          className="mt-5 flex aspect-square items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-400/60 to-teal-300/50 text-6xl"
          style={{ transform: 'translateZ(60px)' }}
        >
          🦊
        </div>
        <p className="mt-4 text-xs text-white/70" style={{ transform: 'translateZ(30px)' }}>
          Move your pointer over the card.
        </p>
      </div>
    </div>
  );
}
