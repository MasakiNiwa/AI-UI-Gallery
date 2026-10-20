import { useEffect, useRef, useState } from 'react';
import type { DemoProps } from '../../types';

function Ticker({
  value,
  format,
  className = '',
}: {
  value: number;
  format: Intl.NumberFormat;
  className?: string;
}) {
  const prev = useRef(value);
  const [flash, setFlash] = useState<'up' | 'down' | null>(null);
  const text = format.format(value);

  useEffect(() => {
    if (value === prev.current) return;
    const dir = value > prev.current ? 'up' : 'down';
    prev.current = value;
    const show = setTimeout(() => setFlash(dir), 0);
    const hide = setTimeout(() => setFlash(null), 700);
    return () => {
      clearTimeout(show);
      clearTimeout(hide);
    };
  }, [value]);

  const chars = text.split('');
  return (
    <span
      aria-label={text}
      className={`inline-flex rounded-lg px-1 tabular-nums transition-colors duration-300 ${flash === 'up' ? 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400' : flash === 'down' ? 'bg-rose-500/15 text-rose-600 dark:text-rose-400' : ''} ${className}`}
    >
      {chars.map((ch, i) => {
        const digit = Number(ch);
        if (Number.isNaN(digit) || ch === ' ')
          return (
            <span key={`${i}-${ch}`} aria-hidden>
              {ch}
            </span>
          );
        return (
          <span
            key={chars.length - i}
            aria-hidden
            className="relative inline-block h-[1.15em] overflow-hidden leading-[1.15em]"
          >
            <span
              className="flex flex-col"
              style={{
                transform: `translateY(${-digit * 1.15}em)`,
                transition: `transform 600ms cubic-bezier(.2,.8,.2,1) ${(i / chars.length) * 120}ms`,
              }}
            >
              {Array.from({ length: 10 }, (_, d) => (
                <span key={d}>{d}</span>
              ))}
            </span>
          </span>
        );
      })}
    </span>
  );
}

const usd = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' });
const plain = new Intl.NumberFormat('en-US');

export default function Demo({ mode }: DemoProps) {
  const [price, setPrice] = useState(18432.57);
  const [followers, setFollowers] = useState(9_998);

  useEffect(() => {
    if (mode === 'preview') return;
    const id = setInterval(
      () => setPrice((p) => Math.round((p + (Math.random() - 0.48) * 120) * 100) / 100),
      2000,
    );
    return () => clearInterval(id);
  }, [mode]);

  return (
    <div className="flex h-full flex-col items-center justify-center gap-6 p-6">
      <div className="text-center">
        <p className="text-sm text-muted">AIUI · Live price</p>
        <Ticker value={price} format={usd} className="text-4xl font-bold @md:text-5xl" />
      </div>
      <div className="flex items-center gap-4 rounded-2xl border border-line bg-surface px-5 py-3">
        <div>
          <p className="text-xs text-muted">Followers</p>
          <Ticker value={followers} format={plain} className="text-2xl font-semibold" />
        </div>
        <button
          type="button"
          onClick={() => setFollowers((f) => f + 1)}
          className="rounded-xl bg-accent px-4 py-2 text-sm font-medium text-accent-contrast"
        >
          +1 Follow
        </button>
      </div>
    </div>
  );
}
