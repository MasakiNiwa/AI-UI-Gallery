import { Droplets, Thermometer, Wind } from 'lucide-react';
import { useState } from 'react';

type Cond = 'sunny' | 'cloudy' | 'rainy' | 'night';
const BG: Record<Cond, string> = {
  sunny: 'from-sky-400 to-amber-200',
  cloudy: 'from-slate-400 to-slate-600',
  rainy: 'from-slate-600 to-indigo-900',
  night: 'from-indigo-950 to-slate-800',
};
const LABEL: Record<Cond, string> = {
  sunny: 'Sunny',
  cloudy: 'Cloudy',
  rainy: 'Light rain',
  night: 'Clear night',
};
const NOW: Record<Cond, number> = { sunny: 24, cloudy: 19, rainy: 16, night: 14 };
const DAYS = [
  { lo: 14, hi: 24, c: 'sunny' as Cond },
  { lo: 13, hi: 20, c: 'cloudy' as Cond },
  { lo: 12, hi: 17, c: 'rainy' as Cond },
  { lo: 11, hi: 19, c: 'cloudy' as Cond },
  { lo: 15, hi: 26, c: 'sunny' as Cond },
];

function Icon({ c, size = 64 }: { c: Cond; size?: number }) {
  return (
    <span className="relative inline-block" style={{ width: size, height: size }} aria-hidden>
      {(c === 'sunny' || c === 'cloudy') && (
        <span
          className="absolute top-[10%] left-[10%] size-[60%] rounded-full bg-amber-300 shadow-[0_0_20px_rgba(252,211,77,.8)]"
          style={{ animation: 'demo-sun 6s ease-in-out infinite' }}
        />
      )}
      {c === 'night' && (
        <span className="absolute top-[10%] left-[15%] size-[55%] rounded-full bg-slate-100 shadow-[inset_-8px_-4px_0_rgba(100,116,139,.6)]" />
      )}
      {(c === 'cloudy' || c === 'rainy') && (
        <span
          className="absolute top-[38%] left-[20%] h-[34%] w-[70%] rounded-full bg-white/90"
          style={{ animation: 'demo-cloud 4s ease-in-out infinite' }}
        >
          <span className="absolute -top-[45%] left-[20%] size-[90%] rounded-full bg-white/90" />
        </span>
      )}
      {c === 'rainy' &&
        [0, 1, 2].map((i) => (
          <span
            key={i}
            className="absolute top-[72%] h-[18%] w-[3px] rounded bg-sky-200"
            style={{
              left: `${35 + i * 15}%`,
              animation: `demo-rain 0.9s ${i * 0.25}s linear infinite`,
            }}
          />
        ))}
    </span>
  );
}

export default function Demo() {
  const [cond, setCond] = useState<Cond>('sunny');
  const [unit, setUnit] = useState<'C' | 'F'>('C');
  const t = (c: number) => Math.round(unit === 'C' ? c : (c * 9) / 5 + 32);
  const weekLo = Math.min(...DAYS.map((d) => d.lo));
  const weekHi = Math.max(...DAYS.map((d) => d.hi));
  const hourFmt = new Intl.DateTimeFormat('en-US', { hour: 'numeric' });
  const dayFmt = new Intl.DateTimeFormat('en-US', { weekday: 'short' });

  return (
    <div className="flex h-full flex-col items-center justify-center gap-3 overflow-auto p-4">
      <style>{`
        @keyframes demo-sun{50%{transform:rotate(20deg) scale(1.06)}}
        @keyframes demo-cloud{50%{transform:translateX(6px)}}
        @keyframes demo-rain{from{transform:translateY(-4px);opacity:0}50%{opacity:1}to{transform:translateY(10px);opacity:0}}
      `}</style>
      <div
        className={`w-full max-w-xs overflow-hidden rounded-3xl bg-gradient-to-br p-5 text-white shadow-xl transition-colors duration-700 ${BG[cond]}`}
      >
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm font-medium text-white/85">Kyoto</p>
            <p className="text-5xl font-light">{t(NOW[cond])}°</p>
            <p className="text-sm">{LABEL[cond]}</p>
            <p className="text-xs text-white/75">
              H {t(DAYS[0].hi)}° · L {t(DAYS[0].lo)}°
            </p>
          </div>
          <Icon c={cond} />
        </div>
        <div className="mt-3 flex justify-between rounded-xl bg-white/15 px-3 py-2 text-xs backdrop-blur">
          <span className="flex items-center gap-1">
            <Thermometer className="size-3.5" aria-hidden />
            Feels {t(NOW[cond] - 1)}°
          </span>
          <span className="flex items-center gap-1">
            <Wind className="size-3.5" aria-hidden />
            12 km/h
          </span>
          <span className="flex items-center gap-1">
            <Droplets className="size-3.5" aria-hidden />
            {cond === 'rainy' ? 88 : 54}%
          </span>
        </div>
        <ul className="scrollbar-none mt-3 flex snap-x gap-3 overflow-x-auto text-center text-xs">
          {Array.from({ length: 12 }, (_, i) => {
            const d = new Date(2026, 9, 22, 9 + i);
            return (
              <li key={i} className="flex shrink-0 snap-start flex-col items-center gap-1">
                <span className="text-white/75">{i === 0 ? 'Now' : hourFmt.format(d)}</span>
                <Icon c={i > 9 ? 'night' : cond} size={24} />
                <span>{t(NOW[cond] - Math.abs(i - 4) * 0.8)}°</span>
              </li>
            );
          })}
        </ul>
        <ul className="mt-3 space-y-1.5 border-t border-white/20 pt-3 text-xs">
          {DAYS.map((d, i) => (
            <li key={i} className="flex items-center gap-2">
              <span className="w-9">
                {i === 0 ? 'Today' : dayFmt.format(new Date(2026, 9, 22 + i))}
              </span>
              <Icon c={d.c} size={18} />
              <span className="w-7 text-right text-white/75">{t(d.lo)}°</span>
              <span className="relative h-1.5 flex-1 rounded-full bg-white/20">
                <span
                  className="absolute inset-y-0 rounded-full bg-gradient-to-r from-sky-200 to-amber-300"
                  style={{
                    left: `${((d.lo - weekLo) / (weekHi - weekLo)) * 100}%`,
                    right: `${100 - ((d.hi - weekLo) / (weekHi - weekLo)) * 100}%`,
                  }}
                />
              </span>
              <span className="w-7">{t(d.hi)}°</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="flex flex-wrap justify-center gap-1.5 text-xs">
        {(Object.keys(LABEL) as Cond[]).map((c) => (
          <button
            key={c}
            type="button"
            aria-pressed={cond === c}
            onClick={() => setCond(c)}
            className={`rounded-full border px-2.5 py-1 capitalize ${cond === c ? 'border-accent bg-accent-soft' : 'border-line'}`}
          >
            {c}
          </button>
        ))}
        <button
          type="button"
          onClick={() => setUnit((u) => (u === 'C' ? 'F' : 'C'))}
          className="rounded-full border border-line px-2.5 py-1"
        >
          °{unit === 'C' ? 'F' : 'C'}
        </button>
      </div>
    </div>
  );
}
