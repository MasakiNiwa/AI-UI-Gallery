import {
  BarChart3,
  Bell,
  Home,
  Package,
  Search,
  Settings,
  Users,
  type LucideIcon,
} from 'lucide-react';
import { useMemo, useState } from 'react';

type Period = '7d' | '30d' | '90d';

const NAV: [string, LucideIcon][] = [
  ['Overview', Home],
  ['Orders', Package],
  ['Customers', Users],
  ['Reports', BarChart3],
  ['Settings', Settings],
];
const ORDERS = [
  ['#3201', 'Aiko S.', '$128', 'Paid'],
  ['#3200', 'Ben T.', '$64', 'Pending'],
  ['#3199', 'Chloé M.', '$212', 'Paid'],
  ['#3198', 'Dev P.', '$39', 'Refunded'],
  ['#3197', 'Emma L.', '$96', 'Paid'],
];
const STATUS: Record<string, string> = {
  Paid: 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400',
  Pending: 'bg-amber-500/15 text-amber-600 dark:text-amber-400',
  Refunded: 'bg-slate-500/15 text-muted',
};

/** Deterministic pseudo-random series so each period looks different but stable. */
function series(n: number, seed: number, base: number) {
  let s = seed;
  let v = base;
  return Array.from({ length: n }, () => {
    s = (s * 9301 + 49297) % 233280;
    v = Math.max(base * 0.4, v + (s / 233280 - 0.42) * base * 0.18);
    return v;
  });
}

function path(values: number[], w: number, h: number, close = false) {
  const max = Math.max(...values);
  const min = Math.min(...values);
  const pts = values.map((v, i) => [
    (i / (values.length - 1)) * w,
    h - ((v - min) / (max - min || 1)) * h * 0.9 - h * 0.05,
  ]);
  const d = pts.map(([x, y], i) => `${i ? 'L' : 'M'}${x.toFixed(1)},${y.toFixed(1)}`).join('');
  return close ? `${d}L${w},${h}L0,${h}Z` : d;
}

export default function Demo() {
  const [period, setPeriod] = useState<Period>('30d');
  const [nav, setNav] = useState('Overview');
  const days = { '7d': 7, '30d': 30, '90d': 90 }[period];

  const kpis = useMemo(() => {
    const seed = days * 7;
    return [
      {
        label: 'Revenue',
        value: `$${(days * 1.84).toFixed(1)}k`,
        change: 12.4,
        data: series(14, seed, 100),
      },
      { label: 'Orders', value: String(days * 23), change: 8.1, data: series(14, seed + 1, 60) },
      { label: 'Customers', value: String(days * 9), change: -2.3, data: series(14, seed + 2, 40) },
      {
        label: 'Conversion',
        value: `${(3.2 + days / 100).toFixed(1)}%`,
        change: 0.6,
        data: series(14, seed + 3, 20),
      },
    ];
  }, [days]);
  const main = useMemo(() => series(Math.min(days, 45), days, 100), [days]);

  return (
    <div className="flex h-full flex-col bg-bg text-fg @3xl:flex-row">
      <nav
        aria-label="Dashboard"
        className="order-last flex shrink-0 justify-around border-t border-line bg-surface @3xl:order-first @3xl:w-48 @3xl:flex-col @3xl:justify-start @3xl:gap-1 @3xl:border-t-0 @3xl:border-r @3xl:p-3"
      >
        <p className="hidden px-2 pb-3 font-semibold @3xl:block">◆ Northwind</p>
        {NAV.map(([label, Icon]) => (
          <button
            key={label}
            type="button"
            aria-current={nav === label ? 'page' : undefined}
            onClick={() => setNav(label)}
            className={`flex flex-col items-center gap-0.5 px-2 py-2 text-[10px] @3xl:flex-row @3xl:gap-2.5 @3xl:rounded-lg @3xl:text-sm ${nav === label ? 'text-accent @3xl:bg-accent-soft' : 'text-muted hover:text-fg'}`}
          >
            <Icon className="size-[18px]" aria-hidden />
            {label}
          </button>
        ))}
      </nav>
      <div className="flex min-h-0 min-w-0 flex-1 flex-col">
        <header className="flex h-14 shrink-0 items-center gap-3 border-b border-line px-4">
          <h2 className="font-semibold">{nav}</h2>
          <label className="ml-auto hidden h-9 w-56 items-center gap-2 rounded-lg border border-line bg-surface px-2.5 text-sm text-muted @xl:flex">
            <Search className="size-4" aria-hidden />
            <input
              placeholder="Search…"
              aria-label="Search"
              className="w-full bg-transparent outline-none"
            />
          </label>
          <button
            type="button"
            aria-label="Search"
            className="ml-auto grid size-9 place-items-center rounded-lg text-muted @xl:hidden"
          >
            <Search className="size-[18px]" />
          </button>
          <button
            type="button"
            aria-label="Notifications"
            className="relative grid size-9 place-items-center rounded-lg text-muted hover:text-fg"
          >
            <Bell className="size-[18px]" />
            <span className="absolute top-2 right-2 size-2 rounded-full bg-rose-500" />
          </button>
          <span className="grid size-8 place-items-center rounded-full bg-gradient-to-br from-sky-400 to-indigo-500 text-xs font-bold text-white">
            KT
          </span>
        </header>
        <main className="flex-1 overflow-auto p-4">
          <div className="mb-4 flex items-center justify-between gap-2">
            <p className="text-sm text-muted">Last {days} days</p>
            <div
              role="radiogroup"
              aria-label="Period"
              className="flex rounded-lg border border-line bg-surface p-0.5 text-xs"
            >
              {(['7d', '30d', '90d'] as const).map((p) => (
                <button
                  key={p}
                  type="button"
                  role="radio"
                  aria-checked={period === p}
                  onClick={() => setPeriod(p)}
                  className={`rounded-md px-2.5 py-1 ${period === p ? 'bg-accent text-accent-contrast' : 'text-muted hover:text-fg'}`}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-1 gap-3 @md:grid-cols-2 @5xl:grid-cols-4">
            {kpis.map((k) => (
              <div key={k.label} className="rounded-2xl border border-line bg-surface p-4">
                <p className="text-xs text-muted">{k.label}</p>
                <div className="mt-1 flex items-end justify-between gap-2">
                  <p className="text-2xl font-semibold tabular-nums">{k.value}</p>
                  <svg viewBox="0 0 80 28" className="h-7 w-20" aria-hidden>
                    <path
                      d={path(k.data, 80, 28)}
                      fill="none"
                      stroke={k.change >= 0 ? '#22c55e' : '#f43f5e'}
                      strokeWidth="1.8"
                    />
                  </svg>
                </div>
                <p
                  className={`mt-1 text-xs font-medium ${k.change >= 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-500'}`}
                >
                  {k.change >= 0 ? '▲' : '▼'} {Math.abs(k.change)}%{' '}
                  <span className="font-normal text-muted">vs previous</span>
                </p>
              </div>
            ))}
          </div>
          <div className="mt-3 grid grid-cols-1 gap-3 @5xl:grid-cols-3">
            <section
              className="rounded-2xl border border-line bg-surface p-4 @5xl:col-span-2"
              aria-label="Revenue chart"
            >
              <p className="mb-3 text-sm font-medium">Revenue</p>
              <svg
                viewBox="0 0 400 140"
                preserveAspectRatio="none"
                className="h-40 w-full"
                role="img"
                aria-label={`Revenue trend over the last ${days} days`}
              >
                <defs>
                  <linearGradient id="dash-area" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0" stopColor="var(--accent)" stopOpacity="0.35" />
                    <stop offset="1" stopColor="var(--accent)" stopOpacity="0" />
                  </linearGradient>
                </defs>
                {[35, 70, 105].map((y) => (
                  <line
                    key={y}
                    x1="0"
                    x2="400"
                    y1={y}
                    y2={y}
                    className="stroke-line"
                    strokeDasharray="3 4"
                  />
                ))}
                <path
                  d={path(main, 400, 140, true)}
                  fill="url(#dash-area)"
                  className="transition-all duration-500"
                />
                <path
                  d={path(main, 400, 140)}
                  fill="none"
                  stroke="var(--accent)"
                  strokeWidth="2"
                  vectorEffect="non-scaling-stroke"
                  className="transition-all duration-500"
                />
              </svg>
            </section>
            <section
              className="rounded-2xl border border-line bg-surface p-4"
              aria-label="Recent orders"
            >
              <p className="mb-2 text-sm font-medium">Recent orders</p>
              <ul className="divide-y divide-line text-sm">
                {ORDERS.map(([id, name, amount, status]) => (
                  <li key={id} className="flex items-center gap-2 py-2">
                    <span className="w-12 text-xs text-muted">{id}</span>
                    <span className="flex-1 truncate">{name}</span>
                    <span className="tabular-nums">{amount}</span>
                    <span
                      className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${STATUS[status]}`}
                    >
                      {status}
                    </span>
                  </li>
                ))}
              </ul>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}
