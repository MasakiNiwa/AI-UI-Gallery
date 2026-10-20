import { useEffect, useState } from 'react';

const DATA = [
  { name: 'Housing', value: 1200, color: '#6f7fd8' },
  { name: 'Food', value: 520, color: '#2dd4bf' },
  { name: 'Transport', value: 260, color: '#f59e0b' },
  { name: 'Fun', value: 310, color: '#f472b6' },
  { name: 'Savings', value: 600, color: '#34d399' },
  { name: 'Other', value: 180, color: '#a78bfa' },
];
const usd = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0,
});
const R = 70;
const C = 2 * Math.PI * R;
const GAP = 3;

export default function Demo() {
  const [hidden, setHidden] = useState<Set<string>>(new Set());
  const [hover, setHover] = useState<string | null>(null);
  const [grown, setGrown] = useState(false);

  useEffect(() => {
    const id = requestAnimationFrame(() => setGrown(true));
    return () => cancelAnimationFrame(id);
  }, []);

  const shown = DATA.filter((d) => !hidden.has(d.name));
  const total = shown.reduce((s, d) => s + d.value, 0);
  // Each segment starts where the previous visible one ended.
  const segments = DATA.reduce<((typeof DATA)[number] & { len: number; start: number })[]>(
    (acc, d) => {
      const prev = acc.at(-1);
      const len = !hidden.has(d.name) && total ? (d.value / total) * C : 0;
      return [...acc, { ...d, len, start: prev ? prev.start + prev.len : 0 }];
    },
    [],
  );
  const focus = hover ? DATA.find((d) => d.name === hover && !hidden.has(d.name)) : null;

  return (
    <div className="flex h-full items-center justify-center overflow-auto p-4">
      <div className="flex w-full max-w-lg flex-col items-center gap-6 @md:flex-row">
        <div className="relative size-52 shrink-0">
          <svg
            viewBox="0 0 200 200"
            className="size-full -rotate-90"
            role="img"
            aria-label={`Monthly budget ${usd.format(total)}: ${shown.map((d) => `${d.name} ${usd.format(d.value)}`).join(', ')}`}
          >
            <circle
              cx="100"
              cy="100"
              r={R}
              fill="none"
              stroke="var(--surface-3)"
              strokeWidth="22"
            />
            {segments.map((s) => (
              <circle
                key={s.name}
                cx="100"
                cy="100"
                r={R}
                fill="none"
                stroke={s.color}
                strokeWidth={hover === s.name ? 30 : 22}
                strokeDasharray={`${grown ? Math.max(0, s.len - GAP) : 0} ${C}`}
                strokeDashoffset={-s.start}
                opacity={hover && hover !== s.name ? 0.35 : 1}
                onMouseEnter={() => setHover(s.name)}
                onMouseLeave={() => setHover(null)}
                className="cursor-pointer transition-all duration-500 ease-out"
              />
            ))}
          </svg>
          <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center text-center">
            <p className="text-xs text-muted">{focus ? focus.name : 'Total'}</p>
            <p className="text-2xl font-bold tabular-nums">
              {usd.format(focus ? focus.value : total)}
            </p>
            {focus && (
              <p className="text-xs text-muted">{Math.round((focus.value / total) * 100)}%</p>
            )}
          </div>
        </div>
        <table className="w-full text-sm">
          <caption className="sr-only">Budget by category</caption>
          <tbody>
            {DATA.map((d) => {
              const off = hidden.has(d.name);
              return (
                <tr
                  key={d.name}
                  onMouseEnter={() => setHover(d.name)}
                  onMouseLeave={() => setHover(null)}
                  className={hover === d.name ? 'bg-surface-2' : ''}
                >
                  <td className="py-1 pl-1">
                    <button
                      type="button"
                      aria-pressed={!off}
                      onClick={() =>
                        setHidden((h) => {
                          const n = new Set(h);
                          if (n.has(d.name)) n.delete(d.name);
                          else n.add(d.name);
                          return n;
                        })
                      }
                      className={`flex items-center gap-2 rounded-md px-1 ${off ? 'text-muted line-through' : ''}`}
                    >
                      <span
                        className="size-3 rounded-sm"
                        style={{ background: off ? 'var(--surface-3)' : d.color }}
                      />
                      {d.name}
                    </button>
                  </td>
                  <td className="text-right tabular-nums">{usd.format(d.value)}</td>
                  <td className="w-12 pr-1 text-right text-muted tabular-nums">
                    {off || !total ? '—' : `${Math.round((d.value / total) * 100)}%`}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
