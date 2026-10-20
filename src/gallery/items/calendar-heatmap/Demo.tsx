import { useEffect, useMemo, useRef, useState } from 'react';

const WEEKS = 52;
const LEVELS = [
  'bg-surface-3',
  'bg-emerald-200 dark:bg-emerald-900',
  'bg-emerald-400 dark:bg-emerald-700',
  'bg-emerald-500 dark:bg-emerald-500',
  'bg-emerald-700 dark:bg-emerald-300',
];

/** Deterministic pseudo-random numbers so the demo looks the same on every render. */
function rng(seed: number) {
  return () => ((seed = (seed * 16807) % 2147483647) - 1) / 2147483646;
}

const level = (n: number) => (n === 0 ? 0 : n < 3 ? 1 : n < 6 ? 2 : n < 9 ? 3 : 4);
const fmt = (d: Date) =>
  d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

export default function Demo() {
  const scroller = useRef<HTMLDivElement>(null);
  const [hover, setHover] = useState<{ date: Date; count: number } | null>(null);

  const days = useMemo(() => {
    const rand = rng(42);
    const end = new Date(2026, 9, 17); // a Saturday
    const start = new Date(end);
    start.setDate(end.getDate() - WEEKS * 7 + 1);
    return Array.from({ length: WEEKS * 7 }, (_, i) => {
      const date = new Date(start);
      date.setDate(start.getDate() + i);
      const weekend = date.getDay() === 0 || date.getDay() === 6;
      const r = rand();
      const recent = i >= WEEKS * 7 - 9; // keep a current streak going for the demo
      const count =
        !recent && r < (weekend ? 0.55 : 0.2) ? 0 : Math.floor(rand() * (weekend ? 5 : 12)) + 1;
      return { date, count };
    });
  }, []);

  const stats = useMemo(() => {
    let longest = 0;
    let run = 0;
    for (const d of days) {
      run = d.count ? run + 1 : 0;
      longest = Math.max(longest, run);
    }
    return { total: days.reduce((s, d) => s + d.count, 0), current: run, longest };
  }, [days]);

  useEffect(() => {
    scroller.current?.scrollTo({ left: scroller.current.scrollWidth });
  }, []);

  const months = days
    .map((d, i) => ({ i, d: d.date }))
    .filter(({ i, d }) => i % 7 === 0 && d.getDate() <= 7)
    .map(({ i, d }) => ({ col: i / 7, label: d.toLocaleDateString('en-US', { month: 'short' }) }));

  return (
    <div className="flex h-full flex-col justify-center gap-4 p-6">
      <div className="flex flex-wrap gap-6 text-sm">
        <p>
          <span className="text-xl font-bold">{stats.total.toLocaleString()}</span>{' '}
          <span className="text-muted">contributions</span>
        </p>
        <p>
          <span className="text-xl font-bold">{stats.current}</span>{' '}
          <span className="text-muted">day streak</span>
        </p>
        <p>
          <span className="text-xl font-bold">{stats.longest}</span>{' '}
          <span className="text-muted">longest streak</span>
        </p>
      </div>
      <div ref={scroller} className="overflow-x-auto rounded-xl border border-line bg-surface p-3">
        <div className="relative ml-8 h-4 text-[10px] text-muted" style={{ width: WEEKS * 14 }}>
          {months.map((m) => (
            <span key={m.col} className="absolute" style={{ left: m.col * 14 }}>
              {m.label}
            </span>
          ))}
        </div>
        <div className="flex">
          <div className="grid w-8 shrink-0 grid-rows-7 gap-[3px] text-[10px] leading-[11px] text-muted">
            {['', 'Mon', '', 'Wed', '', 'Fri', ''].map((d, i) => (
              <span key={i}>{d}</span>
            ))}
          </div>
          <div
            className="grid grid-flow-col grid-rows-7 gap-[3px]"
            onMouseLeave={() => setHover(null)}
          >
            {days.map((d) => (
              <span
                key={d.date.toISOString()}
                tabIndex={-1}
                aria-label={`${d.count} contributions on ${fmt(d.date)}`}
                onMouseEnter={() => setHover(d)}
                className={`size-[11px] rounded-[2px] ${LEVELS[level(d.count)]} hover:ring-1 hover:ring-fg/50`}
              />
            ))}
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between text-xs text-muted">
        <span aria-live="polite">
          {hover ? `${hover.count} contributions on ${fmt(hover.date)}` : 'Hover a day for details'}
        </span>
        <span className="flex items-center gap-1">
          Less{' '}
          {LEVELS.map((c) => (
            <span key={c} className={`size-[11px] rounded-[2px] ${c}`} />
          ))}{' '}
          More
        </span>
      </div>
    </div>
  );
}
