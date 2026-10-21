import { useState } from 'react';

const AXES = ['Design', 'Frontend', 'Backend', 'Testing', 'Communication', 'Leadership'];
const PEOPLE: Record<string, number[]> = {
  Mina: [9, 7, 3, 5, 8, 6],
  Leo: [4, 8, 9, 7, 5, 5],
  Hana: [6, 9, 6, 8, 7, 4],
  Sam: [5, 4, 4, 6, 9, 9],
};
const C = 150;
const R = 100;
const point = (i: number, v: number) => {
  const a = (Math.PI * 2 * i) / AXES.length - Math.PI / 2;
  return [C + (Math.cos(a) * (R * v)) / 10, C + (Math.sin(a) * (R * v)) / 10] as const;
};
const poly = (vals: number[]) => vals.map((v, i) => point(i, v).join(',')).join(' ');

export default function Demo() {
  const [other, setOther] = useState('Leo');
  const [show, setShow] = useState({ a: true, b: true });
  const [tip, setTip] = useState<{ x: number; y: number; text: string } | null>(null);
  const series = [
    { key: 'a' as const, name: 'Mina', vals: PEOPLE.Mina, color: '#6f7fd8' },
    { key: 'b' as const, name: other, vals: PEOPLE[other], color: '#2dd4bf' },
  ];

  return (
    <div className="flex h-full flex-col items-center justify-center gap-3 overflow-auto p-4">
      <div className="flex flex-wrap items-center gap-2 text-sm">
        {series.map((s) => (
          <button
            key={s.key}
            type="button"
            aria-pressed={show[s.key]}
            onClick={() => setShow((v) => ({ ...v, [s.key]: !v[s.key] }))}
            className={`flex items-center gap-1.5 rounded-full border px-3 py-1 ${show[s.key] ? 'border-line' : 'border-line opacity-40'}`}
          >
            <span className="size-2.5 rounded-full" style={{ background: s.color }} /> {s.name}
          </button>
        ))}
        <label className="text-muted">
          vs{' '}
          <select
            value={other}
            onChange={(e) => setOther(e.target.value)}
            className="rounded-lg border border-line bg-surface px-2 py-1 text-fg"
          >
            {Object.keys(PEOPLE)
              .filter((p) => p !== 'Mina')
              .map((p) => (
                <option key={p}>{p}</option>
              ))}
          </select>
        </label>
      </div>
      <div className="relative w-full max-w-sm">
        <svg
          viewBox="0 0 300 300"
          className="w-full"
          role="img"
          aria-label={`Skill comparison of Mina and ${other}`}
        >
          {[2, 4, 6, 8, 10].map((lvl) => (
            <polygon
              key={lvl}
              points={poly(AXES.map(() => lvl))}
              fill="none"
              stroke="var(--border)"
            />
          ))}
          {AXES.map((a, i) => {
            const [x, y] = point(i, 10);
            const [lx, ly] = point(i, 12.2);
            return (
              <g key={a}>
                <line x1={C} y1={C} x2={x} y2={y} stroke="var(--border)" />
                <text
                  x={lx}
                  y={ly}
                  fontSize="10"
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fill="var(--text-muted)"
                >
                  {a}
                </text>
              </g>
            );
          })}
          {series.map((s) =>
            show[s.key] ? (
              <g key={s.key}>
                <polygon
                  points={poly(s.vals)}
                  fill={s.color}
                  fillOpacity=".22"
                  stroke={s.color}
                  strokeWidth="2"
                  style={{ transition: 'all 500ms ease' }}
                />
                {s.vals.map((v, i) => {
                  const [x, y] = point(i, v);
                  return (
                    <circle
                      key={i}
                      cx={x}
                      cy={y}
                      r="4"
                      fill={s.color}
                      style={{ transition: 'all 500ms ease' }}
                      onMouseEnter={() => setTip({ x, y, text: `${s.name} · ${AXES[i]}: ${v}` })}
                      onMouseLeave={() => setTip(null)}
                    />
                  );
                })}
              </g>
            ) : null,
          )}
        </svg>
        {tip && (
          <span
            className="pointer-events-none absolute -translate-x-1/2 -translate-y-full rounded-md bg-fg px-2 py-0.5 text-xs whitespace-nowrap text-bg"
            style={{ left: `${(tip.x / 300) * 100}%`, top: `${(tip.y / 300) * 100 - 2}%` }}
          >
            {tip.text}
          </span>
        )}
      </div>
      <table className="text-xs text-muted">
        <caption className="sr-only">Scores</caption>
        <thead>
          <tr>
            <th className="px-1 text-left font-medium">Skill</th>
            {series.map((s) => (
              <th key={s.key} className="px-2 font-medium">
                {s.name}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {AXES.map((a, i) => (
            <tr key={a}>
              <td className="px-1">{a}</td>
              {series.map((s) => (
                <td key={s.key} className="px-2 text-center tabular-nums">
                  {s.vals[i]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
