import { Moon, Sun } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from '../../hooks';

const DAY = {
  sky: ['#bfe3ff', '#f7e3c9'],
  sun: '#fff3c4',
  layers: ['#a9bfd8', '#7f9cc0', '#5b7aa3', '#3e5d84', '#25405f'],
};
const NIGHT = {
  sky: ['#0b1026', '#2b2350'],
  sun: '#e8e6ff',
  layers: ['#2a2f55', '#232848', '#1b203b', '#14182e', '#0c0f20'],
};
const PATHS = [
  'M0 220 L120 120 L220 190 L340 90 L470 200 L600 110 L760 210 L800 180 L800 400 L0 400 Z',
  'M0 260 L150 170 L260 240 L380 160 L520 250 L650 180 L800 250 L800 400 L0 400 Z',
  'M0 300 Q200 220 400 290 T800 280 L800 400 L0 400 Z',
  'M0 330 Q150 280 300 320 T600 310 T800 330 L800 400 L0 400 Z',
];
const DEPTH = [0.02, 0.04, 0.07, 0.1, 0.13];

export default function Demo() {
  const host = useRef<HTMLDivElement>(null);
  const layers = useRef<(HTMLDivElement | null)[]>([]);
  const reduced = useReducedMotion();
  const [night, setNight] = useState(false);
  const pal = night ? NIGHT : DAY;

  useEffect(() => {
    if (reduced) return;
    const el = host.current!;
    const target = { x: 0, y: 0 };
    const cur = { x: 0, y: 0 };
    const move = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      target.x = e.clientX - r.left - r.width / 2;
      target.y = e.clientY - r.top - r.height / 2;
    };
    el.addEventListener('pointermove', move);
    let raf = 0;
    const tick = () => {
      cur.x += (target.x - cur.x) * 0.08;
      cur.y += (target.y - cur.y) * 0.08;
      layers.current.forEach((l, i) => {
        if (l)
          l.style.transform = `translate3d(${-cur.x * DEPTH[i]}px, ${-cur.y * DEPTH[i] * 0.5}px, 0) scale(1.08)`;
      });
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener('pointermove', move);
    };
  }, [reduced]);

  return (
    <div
      ref={host}
      className="relative h-full overflow-hidden transition-[background] duration-700"
      style={{ background: `linear-gradient(${pal.sky[0]}, ${pal.sky[1]})` }}
    >
      <div
        ref={(e) => {
          layers.current[0] = e;
        }}
        className="absolute inset-0"
      >
        <span
          className="absolute top-[14%] right-[18%] size-16 rounded-full transition-colors duration-700"
          style={{ background: pal.sun, boxShadow: `0 0 60px ${pal.sun}` }}
        />
      </div>
      {PATHS.map((d, i) => (
        <div
          key={i}
          ref={(e) => {
            layers.current[i + 1] = e;
          }}
          className="absolute inset-x-0 bottom-0 h-[75%]"
        >
          <svg viewBox="0 0 800 400" preserveAspectRatio="none" className="size-full">
            <path d={d} fill={pal.layers[i + 1]} className="transition-[fill] duration-700" />
          </svg>
        </div>
      ))}
      <div className="relative z-10 flex h-[55%] flex-col items-center justify-center gap-3 p-6 text-center">
        <h2
          className={`text-3xl font-bold @lg:text-5xl ${night ? 'text-white' : 'text-slate-800'}`}
        >
          Go further
        </h2>
        <button
          type="button"
          onClick={() => setNight((n) => !n)}
          className="inline-flex items-center gap-2 rounded-full bg-white/80 px-4 py-2 text-sm font-medium text-slate-800 shadow backdrop-blur"
        >
          {night ? <Sun className="size-4" /> : <Moon className="size-4" />}{' '}
          {night ? 'Day' : 'Night'}
        </button>
      </div>
    </div>
  );
}
