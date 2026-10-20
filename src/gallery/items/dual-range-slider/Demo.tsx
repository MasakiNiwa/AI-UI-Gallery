import { useMemo, useState } from 'react';

const MAX = 500;
const GAP = 20;
const BINS = 20;
const usd = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0,
});

// Deterministic product prices skewed toward the lower end.
const PRICES = Array.from({ length: 600 }, (_, i) => {
  const r = ((i * 9301 + 49297) % 233280) / 233280;
  return Math.round(Math.pow(r, 1.8) * MAX);
});

const THUMB =
  'pointer-events-none absolute inset-x-0 top-0 h-6 w-full appearance-none bg-transparent [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:size-5 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-accent [&::-webkit-slider-thumb]:bg-surface [&::-webkit-slider-thumb]:shadow [&::-moz-range-thumb]:pointer-events-auto [&::-moz-range-thumb]:size-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-accent [&::-moz-range-thumb]:bg-surface';

export default function Demo() {
  const [lo, setLo] = useState(60);
  const [hi, setHi] = useState(320);

  const bins = useMemo(() => {
    const b = Array(BINS).fill(0);
    for (const p of PRICES) b[Math.min(BINS - 1, Math.floor((p / MAX) * BINS))]++;
    return b;
  }, []);
  const peak = Math.max(...bins);
  const count = PRICES.filter((p) => p >= lo && p <= hi).length;

  const setLow = (v: number) => setLo(Math.max(0, Math.min(v, hi - GAP)));
  const setHigh = (v: number) => setHi(Math.min(MAX, Math.max(v, lo + GAP)));

  return (
    <div className="flex h-full items-center justify-center p-6">
      <div className="w-full max-w-sm rounded-2xl border border-line bg-surface p-5">
        <div className="flex items-baseline justify-between">
          <p className="font-semibold">Price range</p>
          <button
            type="button"
            onClick={() => {
              setLo(0);
              setHi(MAX);
            }}
            className="text-xs text-accent"
          >
            Reset
          </button>
        </div>
        <div className="mt-4 flex h-16 items-end gap-0.5" aria-hidden>
          {bins.map((n, i) => {
            const from = (i / BINS) * MAX;
            const inRange = from + MAX / BINS > lo && from < hi;
            return (
              <span
                key={i}
                className={`flex-1 rounded-t-sm transition-colors ${inRange ? 'bg-accent/70' : 'bg-surface-3'}`}
                style={{ height: `${(n / peak) * 100}%` }}
              />
            );
          })}
        </div>
        <div className="relative h-6">
          <span className="absolute inset-x-0 top-1/2 h-1 -translate-y-1/2 rounded-full bg-surface-3" />
          <span
            className="absolute top-1/2 h-1 -translate-y-1/2 rounded-full bg-accent"
            style={{ left: `${(lo / MAX) * 100}%`, right: `${100 - (hi / MAX) * 100}%` }}
          />
          <input
            type="range"
            min={0}
            max={MAX}
            value={lo}
            onChange={(e) => setLow(Number(e.target.value))}
            aria-label="Minimum price"
            aria-valuetext={usd.format(lo)}
            className={THUMB}
          />
          <input
            type="range"
            min={0}
            max={MAX}
            value={hi}
            onChange={(e) => setHigh(Number(e.target.value))}
            aria-label="Maximum price"
            aria-valuetext={usd.format(hi)}
            className={THUMB}
          />
        </div>
        <div className="mt-4 flex items-center gap-3">
          {[
            { label: 'Min', value: lo, set: setLow },
            { label: 'Max', value: hi, set: setHigh },
          ].map(({ label, value, set }) => (
            <label key={label} className="flex-1 text-xs text-muted">
              {label}
              <span className="mt-1 flex items-center rounded-lg border border-line bg-bg px-2 focus-within:border-accent">
                <span className="text-sm">$</span>
                <input
                  type="number"
                  min={0}
                  max={MAX}
                  value={value}
                  onChange={(e) => set(Number(e.target.value))}
                  className="h-9 w-full bg-transparent px-1 text-sm text-fg outline-none"
                />
              </span>
            </label>
          ))}
        </div>
        <p className="mt-4 text-center text-sm" aria-live="polite">
          <b>{count}</b>{' '}
          <span className="text-muted">
            products between {usd.format(lo)} and {usd.format(hi)}
          </span>
        </p>
      </div>
    </div>
  );
}
