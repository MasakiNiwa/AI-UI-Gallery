import { useEffect, useState } from 'react';
import { useReducedMotion } from '../../hooks';

/** Animates from 0 to 1 over `duration` ms with an ease-out curve. */
function useProgress(duration = 1200) {
  const reduced = useReducedMotion();
  const [p, setP] = useState(reduced ? 1 : 0);
  useEffect(() => {
    if (reduced) return;
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      setP(1 - Math.pow(1 - t, 3));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [duration, reduced]);
  return reduced ? 1 : p;
}

function Ring({ percent, p }: { percent: number; p: number }) {
  const r = 26;
  const c = 2 * Math.PI * r;
  return (
    <svg viewBox="0 0 64 64" className="size-16 -rotate-90">
      <circle cx="32" cy="32" r={r} fill="none" strokeWidth="7" className="stroke-surface-3" />
      <circle
        cx="32"
        cy="32"
        r={r}
        fill="none"
        strokeWidth="7"
        strokeLinecap="round"
        className="stroke-accent"
        strokeDasharray={c}
        strokeDashoffset={c * (1 - (percent / 100) * p)}
      />
    </svg>
  );
}

const SPARK = [12, 18, 14, 22, 19, 27, 24, 31, 29, 36];

function Sparkline({ p }: { p: number }) {
  const w = 120;
  const h = 40;
  const max = Math.max(...SPARK);
  const pts = SPARK.map((v, i) => `${(i / (SPARK.length - 1)) * w},${h - (v / max) * h * p}`);
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="h-10 w-28" preserveAspectRatio="none">
      <defs>
        <linearGradient id="demo-spark" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="currentColor" stopOpacity=".3" />
          <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
        </linearGradient>
      </defs>
      <polygon points={`0,${h} ${pts.join(' ')} ${w},${h}`} fill="url(#demo-spark)" />
      <polyline points={pts.join(' ')} fill="none" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

export default function Demo() {
  const p = useProgress();
  const cards = [
    {
      label: 'Monthly goal',
      value: Math.round(78 * p),
      suffix: '%',
      delta: '+6%',
      up: true,
      ring: 78,
    },
    {
      label: 'Revenue',
      value: Math.round(48250 * p).toLocaleString('en-US'),
      prefix: '$',
      delta: '+12.4%',
      up: true,
    },
    {
      label: 'Churn rate',
      value: (2.3 * p).toFixed(1),
      suffix: '%',
      delta: '-0.4%',
      up: false,
      ring: 23,
    },
  ];

  return (
    <div className="flex h-full items-center justify-center p-6">
      <div className="grid w-full max-w-3xl gap-3 @2xl:grid-cols-3">
        {cards.map((c) => (
          <div
            key={c.label}
            className="flex items-center justify-between gap-3 rounded-2xl border border-line bg-surface p-4"
          >
            <div>
              <p className="text-sm text-muted">{c.label}</p>
              <p className="mt-1 text-2xl font-bold tabular-nums">
                {c.prefix}
                {c.value}
                {c.suffix}
              </p>
              <p
                className={`mt-1 text-xs font-medium ${c.up ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'}`}
              >
                {c.up ? '▲' : '▼'} {c.delta}{' '}
                <span className="font-normal text-muted">vs last week</span>
              </p>
            </div>
            <div className="text-accent">
              {c.ring ? <Ring percent={c.ring} p={p} /> : <Sparkline p={p} />}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
