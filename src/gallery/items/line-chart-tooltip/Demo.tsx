import { useEffect, useMemo, useRef, useState, type PointerEvent } from 'react';

const RANGES = { '7D': 7, '30D': 30, '90D': 90 } as const;
type Range = keyof typeof RANGES;
const PAD = { top: 16, right: 12, bottom: 24, left: 40 };

function series(n: number, seed: number, base: number) {
  let s = seed;
  const rand = () => ((s = (s * 16807) % 2147483647) - 1) / 2147483646;
  let v = base;
  return Array.from({ length: n }, (_, i) => {
    v += (rand() - 0.45) * base * 0.12;
    return Math.round(Math.max(base * 0.4, v + Math.sin(i / 3) * base * 0.08));
  });
}

/** Smooth path through points using Catmull-Rom → cubic Bézier conversion. */
function smooth(pts: [number, number][]) {
  if (pts.length < 2) return '';
  let d = `M${pts[0][0]},${pts[0][1]}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const [x0, y0] = pts[i - 1] ?? pts[i];
    const [x1, y1] = pts[i];
    const [x2, y2] = pts[i + 1];
    const [x3, y3] = pts[i + 2] ?? pts[i + 1];
    d += ` C${x1 + (x2 - x0) / 6},${y1 + (y2 - y0) / 6} ${x2 - (x3 - x1) / 6},${y2 - (y3 - y1) / 6} ${x2},${y2}`;
  }
  return d;
}

export default function Demo() {
  const box = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({ w: 600, h: 260 });
  const [range, setRange] = useState<Range>('30D');
  const [hover, setHover] = useState<number | null>(null);

  useEffect(() => {
    const el = box.current!;
    const ro = new ResizeObserver(() => setSize({ w: el.clientWidth, h: el.clientHeight }));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const n = RANGES[range];
  const cur = useMemo(() => series(n, 7 + n, 1200), [n]);
  const prev = useMemo(() => series(n, 99 + n, 1000), [n]);
  const max = Math.ceil(Math.max(...cur, ...prev) / 500) * 500;
  const iw = size.w - PAD.left - PAD.right;
  const ih = size.h - PAD.top - PAD.bottom;
  const x = (i: number) => PAD.left + (i / (n - 1)) * iw;
  const y = (v: number) => PAD.top + ih - (v / max) * ih;
  const curPath = smooth(cur.map((v, i) => [x(i), y(v)]));
  const prevPath = smooth(prev.map((v, i) => [x(i), y(v)]));
  const date = (i: number) => {
    const d = new Date(2026, 9, 20);
    d.setDate(d.getDate() - (n - 1 - i));
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const onMove = (e: PointerEvent<SVGSVGElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    const i = Math.round(((e.clientX - r.left - PAD.left) / iw) * (n - 1));
    setHover(Math.max(0, Math.min(n - 1, i)));
  };

  const tipLeft = hover === null ? 0 : Math.min(Math.max(x(hover) - 70, 4), size.w - 144);

  return (
    <div className="flex h-full flex-col gap-3 p-4 @sm:p-6">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div>
          <p className="text-sm text-muted">Visitors</p>
          <p className="text-2xl font-bold tabular-nums">
            {cur.reduce((a, b) => a + b, 0).toLocaleString()}
          </p>
        </div>
        <div className="flex rounded-lg bg-surface-2 p-0.5 text-xs">
          {(Object.keys(RANGES) as Range[]).map((r) => (
            <button
              key={r}
              type="button"
              onClick={() => setRange(r)}
              aria-pressed={r === range}
              className={`rounded-md px-3 py-1 ${r === range ? 'bg-surface font-medium shadow' : 'text-muted'}`}
            >
              {r}
            </button>
          ))}
        </div>
      </div>
      <div ref={box} className="relative min-h-0 flex-1">
        <svg
          width={size.w}
          height={size.h}
          className="touch-none overflow-visible"
          onPointerMove={onMove}
          onPointerDown={onMove}
          onPointerLeave={() => setHover(null)}
        >
          <defs>
            <linearGradient id="demo-area" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="var(--accent)" stopOpacity=".35" />
              <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
            </linearGradient>
          </defs>
          {[0, 0.25, 0.5, 0.75, 1].map((t) => (
            <g key={t}>
              <line
                x1={PAD.left}
                x2={size.w - PAD.right}
                y1={y(max * t)}
                y2={y(max * t)}
                stroke="var(--border)"
              />
              <text
                x={PAD.left - 6}
                y={y(max * t) + 4}
                textAnchor="end"
                fontSize="10"
                fill="var(--text-muted)"
              >
                {max * t >= 1000 ? `${(max * t) / 1000}k` : max * t}
              </text>
            </g>
          ))}
          <path
            key={`a${range}`}
            d={`${curPath} L${x(n - 1)},${PAD.top + ih} L${PAD.left},${PAD.top + ih} Z`}
            fill="url(#demo-area)"
            style={{ animation: 'demo-fade-in 800ms ease-out' }}
          />
          <path
            key={`p${range}`}
            d={prevPath}
            fill="none"
            stroke="var(--text-muted)"
            strokeWidth="1.5"
            strokeDasharray="4 4"
            opacity=".6"
          />
          <path
            key={`c${range}`}
            d={curPath}
            fill="none"
            stroke="var(--accent)"
            strokeWidth="2.5"
            pathLength={1}
            strokeDasharray="1"
            style={{ animation: 'demo-draw 900ms ease-out' }}
          />
          {hover !== null && (
            <g>
              <line
                x1={x(hover)}
                x2={x(hover)}
                y1={PAD.top}
                y2={PAD.top + ih}
                stroke="var(--text-muted)"
                strokeDasharray="3 3"
              />
              <circle
                cx={x(hover)}
                cy={y(prev[hover])}
                r="4"
                fill="var(--surface)"
                stroke="var(--text-muted)"
                strokeWidth="2"
              />
              <circle
                cx={x(hover)}
                cy={y(cur[hover])}
                r="5"
                fill="var(--surface)"
                stroke="var(--accent)"
                strokeWidth="2.5"
              />
            </g>
          )}
        </svg>
        {hover !== null && (
          <div
            className="pointer-events-none absolute top-0 w-[140px] rounded-lg border border-line bg-surface p-2 text-xs shadow-lg"
            style={{ left: tipLeft }}
          >
            <p className="font-medium">{date(hover)}</p>
            <p className="mt-1 flex justify-between">
              <span className="text-accent">● This period</span>
              <span className="tabular-nums">{cur[hover].toLocaleString()}</span>
            </p>
            <p className="flex justify-between text-muted">
              <span>○ Previous</span>
              <span className="tabular-nums">{prev[hover].toLocaleString()}</span>
            </p>
          </div>
        )}
        <style>{`@keyframes demo-draw{from{stroke-dashoffset:1}to{stroke-dashoffset:0}}@keyframes demo-fade-in{from{opacity:0}}`}</style>
      </div>
    </div>
  );
}
