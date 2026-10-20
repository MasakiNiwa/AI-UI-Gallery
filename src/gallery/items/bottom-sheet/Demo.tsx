import { Coffee, MapPin, Star, UtensilsCrossed } from 'lucide-react';
import { useEffect, useRef, useState, type PointerEvent } from 'react';

const SNAPS = [0.15, 0.5, 0.9];
const PLACES = [
  { name: 'Kissa Hoshi', type: 'Coffee', icon: Coffee, rating: 4.7, dist: '120 m' },
  { name: 'Ramen Kaze', type: 'Ramen', icon: UtensilsCrossed, rating: 4.5, dist: '260 m' },
  { name: 'Blue Bottle Kyoto', type: 'Coffee', icon: Coffee, rating: 4.6, dist: '400 m' },
  { name: 'Soba Tsuki', type: 'Soba', icon: UtensilsCrossed, rating: 4.4, dist: '550 m' },
  { name: 'Weekenders', type: 'Coffee', icon: Coffee, rating: 4.8, dist: '700 m' },
  { name: 'Izakaya Mori', type: 'Izakaya', icon: UtensilsCrossed, rating: 4.3, dist: '850 m' },
];

export default function Demo() {
  const box = useRef<HTMLDivElement>(null);
  const [h, setH] = useState(0); // container height in px
  const [snap, setSnap] = useState(1);
  const [dragY, setDragY] = useState<number | null>(null); // current sheet height while dragging
  const drag = useRef<{
    startY: number;
    startH: number;
    lastY: number;
    lastT: number;
    v: number;
  } | null>(null);

  useEffect(() => {
    const el = box.current!;
    const ro = new ResizeObserver(() => setH(el.clientHeight));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const height = dragY ?? SNAPS[snap] * h;

  const down = (e: PointerEvent<HTMLDivElement>) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    drag.current = {
      startY: e.clientY,
      startH: height,
      lastY: e.clientY,
      lastT: performance.now(),
      v: 0,
    };
    setDragY(height);
  };
  const move = (e: PointerEvent<HTMLDivElement>) => {
    const d = drag.current;
    if (!d) return;
    const now = performance.now();
    d.v = (d.lastY - e.clientY) / Math.max(1, now - d.lastT); // px/ms, positive = upward
    d.lastY = e.clientY;
    d.lastT = now;
    setDragY(Math.min(h * 0.95, Math.max(h * 0.08, d.startH + (d.startY - e.clientY))));
  };
  const up = () => {
    const d = drag.current;
    if (!d || dragY === null) return;
    const ratio = dragY / h;
    let target = SNAPS.reduce(
      (best, s, i) => (Math.abs(s - ratio) < Math.abs(SNAPS[best] - ratio) ? i : best),
      0,
    );
    if (Math.abs(d.v) > 0.5)
      target = d.v > 0 ? Math.min(SNAPS.length - 1, snap + 1) : Math.max(0, snap - 1);
    drag.current = null;
    setDragY(null);
    setSnap(target);
  };

  return (
    <div ref={box} className="relative h-full overflow-hidden bg-[#e8eef0] dark:bg-[#1c2427]">
      {/* map placeholder */}
      <svg className="absolute inset-0 size-full opacity-60" aria-hidden>
        <defs>
          <pattern
            id="demo-grid"
            width="60"
            height="60"
            patternUnits="userSpaceOnUse"
            patternTransform="rotate(12)"
          >
            <path
              d="M60 0H0V60"
              fill="none"
              stroke="currentColor"
              strokeWidth="6"
              className="text-white dark:text-slate-700"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#demo-grid)" />
      </svg>
      {PLACES.slice(0, 4).map((p, i) => (
        <MapPin
          key={p.name}
          className="absolute size-7 fill-rose-500 text-white"
          style={{ left: `${20 + i * 18}%`, top: `${18 + (i % 2) * 14}%` }}
          aria-hidden
        />
      ))}
      <div
        className="absolute inset-0 bg-black transition-opacity"
        style={{
          opacity: Math.max(0, (height / h - 0.3) * 0.6) || 0,
          pointerEvents: snap > 0 ? 'auto' : 'none',
        }}
        onClick={() => setSnap(0)}
      />
      <section
        aria-label="Nearby places"
        className="absolute inset-x-0 bottom-0 flex flex-col rounded-t-3xl bg-surface shadow-[0_-8px_30px_rgba(0,0,0,.15)]"
        style={{
          height,
          transition: dragY === null ? 'height 400ms cubic-bezier(.2,.9,.3,1.1)' : 'none',
        }}
      >
        <div
          onPointerDown={down}
          onPointerMove={move}
          onPointerUp={up}
          className="shrink-0 cursor-grab touch-none px-5 pt-2 pb-3 active:cursor-grabbing"
        >
          <button
            type="button"
            aria-label={`Sheet height: ${['peek', 'half', 'full'][snap]}. Press Enter to change.`}
            onClick={() => setSnap((s) => (s + 1) % SNAPS.length)}
            onKeyDown={(e) => {
              if (e.key === 'ArrowUp') setSnap((s) => Math.min(2, s + 1));
              if (e.key === 'ArrowDown') setSnap((s) => Math.max(0, s - 1));
            }}
            className="mx-auto block h-5 w-16"
          >
            <span className="mx-auto block h-1.5 w-10 rounded-full bg-surface-3" />
          </button>
          <p className="font-semibold">Nearby places</p>
          <p className="text-xs text-muted">{PLACES.length} results · Kyoto</p>
        </div>
        <ul
          className={`flex-1 space-y-1 px-3 pb-4 ${snap === 2 && dragY === null ? 'overflow-y-auto' : 'overflow-hidden'}`}
        >
          {PLACES.map((p) => (
            <li key={p.name} className="flex items-center gap-3 rounded-xl p-2 hover:bg-surface-2">
              <span className="flex size-10 items-center justify-center rounded-xl bg-accent-soft text-accent">
                <p.icon className="size-5" aria-hidden />
              </span>
              <span className="flex-1">
                <span className="block text-sm font-medium">{p.name}</span>
                <span className="flex items-center gap-1 text-xs text-muted">
                  <Star className="size-3 fill-amber-400 text-amber-400" aria-hidden /> {p.rating} ·{' '}
                  {p.type}
                </span>
              </span>
              <span className="text-xs text-muted">{p.dist}</span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
