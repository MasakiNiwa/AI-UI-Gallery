import { ChevronsLeftRight } from 'lucide-react';
import { useState, type CSSProperties } from 'react';

/** A tiny landscape "photo" drawn with SVG so the demo needs no image files. */
function Scene({ edited }: { edited: boolean }) {
  return (
    <svg
      viewBox="0 0 400 250"
      className="size-full"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden
      style={{
        filter: edited
          ? 'saturate(1.5) contrast(1.1)'
          : 'grayscale(.75) brightness(.8) contrast(.85)',
      }}
    >
      <defs>
        <linearGradient id={`sky-${edited}`} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#f6a76b" />
          <stop offset="1" stopColor="#fbe3b8" />
        </linearGradient>
      </defs>
      <rect width="400" height="250" fill={`url(#sky-${edited})`} />
      <circle cx="290" cy="110" r="34" fill="#fff4d6" />
      <path d="M0 170 L80 110 L150 160 L230 95 L320 165 L400 120 L400 250 L0 250Z" fill="#7a6c9c" />
      <path d="M0 200 Q100 160 200 195 T400 190 L400 250 L0 250Z" fill="#3f5a6e" />
      <path d="M0 225 Q120 205 260 228 T400 222 L400 250 L0 250Z" fill="#23394a" />
    </svg>
  );
}

export default function Demo() {
  const [pos, setPos] = useState(50);
  const [animate, setAnimate] = useState(false);

  return (
    <div className="flex h-full items-center justify-center p-4 @sm:p-6">
      <div
        className="relative aspect-[16/10] w-full max-w-2xl overflow-hidden rounded-2xl shadow-xl select-none"
        style={{ '--pos': `${pos}%` } as CSSProperties}
      >
        <Scene edited={false} />
        <div
          className={`absolute inset-0 ${animate ? 'transition-[clip-path] duration-300' : ''}`}
          style={{ clipPath: 'inset(0 0 0 var(--pos))' }}
        >
          <Scene edited />
        </div>
        <span
          className="absolute top-3 left-3 rounded-md bg-black/50 px-2 py-0.5 text-xs font-medium text-white transition-opacity"
          style={{ opacity: pos < 18 ? 0 : 1 }}
        >
          Before
        </span>
        <span
          className="absolute top-3 right-3 rounded-md bg-black/50 px-2 py-0.5 text-xs font-medium text-white transition-opacity"
          style={{ opacity: pos > 82 ? 0 : 1 }}
        >
          After
        </span>
        <div
          className={`pointer-events-none absolute inset-y-0 w-0.5 -translate-x-1/2 bg-white shadow ${animate ? 'transition-[left] duration-300' : ''}`}
          style={{ left: 'var(--pos)' }}
        >
          <span className="absolute top-1/2 left-1/2 flex size-10 -translate-1/2 items-center justify-center rounded-full bg-white text-slate-800 shadow-lg">
            <ChevronsLeftRight className="size-5" />
          </span>
        </div>
        <input
          type="range"
          min={0}
          max={100}
          step={0.5}
          value={pos}
          aria-label="Comparison position"
          onPointerDown={() => setAnimate(true)}
          onInput={() => setAnimate(false)}
          onChange={(e) => setPos(Number(e.target.value))}
          className="absolute inset-0 size-full cursor-ew-resize opacity-0"
        />
      </div>
    </div>
  );
}
