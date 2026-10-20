import { ZoomIn, ZoomOut } from 'lucide-react';
import { useRef, useState, type PointerEvent } from 'react';

interface Task {
  id: string;
  phase: string;
  name: string;
  start: number; // day offset from the chart start
  days: number;
  progress: number;
  color: string;
  track: string;
  milestone?: boolean;
}

const START = new Date(2026, 9, 5); // Monday
const DAYS = 28;
const TODAY = 15;
const INITIAL: Task[] = [
  {
    id: 'a',
    phase: 'Design',
    name: 'Research',
    start: 0,
    days: 4,
    progress: 100,
    color: 'bg-violet-500',
    track: 'bg-violet-500/30',
  },
  {
    id: 'b',
    phase: 'Design',
    name: 'Wireframes',
    start: 3,
    days: 5,
    progress: 100,
    color: 'bg-violet-500',
    track: 'bg-violet-500/30',
  },
  {
    id: 'c',
    phase: 'Design',
    name: 'Visual design',
    start: 8,
    days: 6,
    progress: 70,
    color: 'bg-violet-500',
    track: 'bg-violet-500/30',
  },
  {
    id: 'd',
    phase: 'Build',
    name: 'Frontend',
    start: 11,
    days: 9,
    progress: 40,
    color: 'bg-sky-500',
    track: 'bg-sky-500/30',
  },
  {
    id: 'e',
    phase: 'Build',
    name: 'API',
    start: 12,
    days: 7,
    progress: 30,
    color: 'bg-sky-500',
    track: 'bg-sky-500/30',
  },
  {
    id: 'f',
    phase: 'Launch',
    name: 'QA & fixes',
    start: 19,
    days: 5,
    progress: 0,
    color: 'bg-emerald-500',
    track: 'bg-emerald-500/30',
  },
  {
    id: 'g',
    phase: 'Launch',
    name: 'Release',
    start: 25,
    days: 1,
    progress: 0,
    color: 'bg-amber-500',
    track: 'bg-amber-500/30',
    milestone: true,
  },
];

const dateOf = (offset: number) => {
  const d = new Date(START);
  d.setDate(START.getDate() + offset);
  return d;
};
const fmt = (offset: number) =>
  dateOf(offset).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

export default function Demo() {
  const [tasks, setTasks] = useState(INITIAL);
  const [dayW, setDayW] = useState(28);
  const [hover, setHover] = useState<string | null>(null);
  const drag = useRef<{
    id: string;
    mode: 'move' | 'resize';
    x: number;
    start: number;
    days: number;
  } | null>(null);
  const [tip, setTip] = useState<string | null>(null);

  const begin = (t: Task, mode: 'move' | 'resize') => (e: PointerEvent<HTMLElement>) => {
    e.stopPropagation();
    e.currentTarget.setPointerCapture(e.pointerId);
    drag.current = { id: t.id, mode, x: e.clientX, start: t.start, days: t.days };
  };
  const onMove = (e: PointerEvent) => {
    const d = drag.current;
    if (!d) return;
    const delta = Math.round((e.clientX - d.x) / dayW);
    const t = tasks.find((x) => x.id === d.id)!;
    const next =
      d.mode === 'move'
        ? { ...t, start: Math.max(0, Math.min(DAYS - t.days, d.start + delta)) }
        : { ...t, days: Math.max(1, Math.min(DAYS - t.start, d.days + delta)) };
    setTasks((ts) => ts.map((x) => (x.id === d.id ? next : x)));
    setTip(`${t.name}: ${fmt(next.start)} – ${fmt(next.start + next.days - 1)}`);
  };
  const end = () => {
    drag.current = null;
    setTip(null);
  };

  const phases = [...new Set(tasks.map((t) => t.phase))];
  const rowH = 36;

  return (
    <div className="flex h-full flex-col gap-2 p-3" onPointerMove={onMove} onPointerUp={end}>
      <div className="flex items-center gap-2 text-sm">
        <p className="flex-1 font-semibold">Website relaunch</p>
        <span className="text-xs text-muted" aria-live="polite">
          {tip}
        </span>
        <button
          type="button"
          aria-label="Zoom out"
          onClick={() => setDayW((w) => Math.max(14, w - 7))}
          className="rounded-lg p-1.5 hover:bg-surface-2"
        >
          <ZoomOut className="size-4" />
        </button>
        <button
          type="button"
          aria-label="Zoom in"
          onClick={() => setDayW((w) => Math.min(42, w + 7))}
          className="rounded-lg p-1.5 hover:bg-surface-2"
        >
          <ZoomIn className="size-4" />
        </button>
      </div>
      <div className="flex min-h-0 flex-1 overflow-hidden rounded-xl border border-line bg-surface text-xs">
        <div className="w-32 shrink-0 border-r border-line">
          <div className="h-12 border-b border-line" />
          {phases.map((p) => (
            <div key={p}>
              <p className="flex h-7 items-center bg-surface-2 px-2 font-semibold text-muted uppercase">
                {p}
              </p>
              {tasks
                .filter((t) => t.phase === p)
                .map((t) => (
                  <p
                    key={t.id}
                    className={`flex items-center truncate px-2 ${hover === t.id ? 'bg-accent-soft' : ''}`}
                    style={{ height: rowH }}
                  >
                    {t.name}
                  </p>
                ))}
            </div>
          ))}
        </div>
        <div className="min-w-0 flex-1 overflow-x-auto">
          <div className="relative" style={{ width: DAYS * dayW }}>
            <div className="flex h-12 border-b border-line">
              {Array.from({ length: DAYS / 7 }, (_, w) => (
                <div key={w} className="border-r border-line" style={{ width: dayW * 7 }}>
                  <p className="h-6 px-1.5 pt-1 font-medium">Week of {fmt(w * 7)}</p>
                  <div className="flex h-6">
                    {Array.from({ length: 7 }, (_, d) => (
                      <span
                        key={d}
                        className="flex items-center justify-center text-muted"
                        style={{ width: dayW }}
                      >
                        {dayW >= 21 ? dateOf(w * 7 + d).getDate() : ''}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            {/* weekend shading and today line */}
            {Array.from({ length: DAYS }, (_, d) =>
              d % 7 >= 5 ? (
                <span
                  key={d}
                  aria-hidden
                  className="absolute top-12 bottom-0 bg-surface-2/70"
                  style={{ left: d * dayW, width: dayW }}
                />
              ) : null,
            )}
            <span
              className="absolute top-10 bottom-0 z-10 w-0.5 bg-rose-500"
              style={{ left: TODAY * dayW + dayW / 2 }}
            >
              <span className="absolute -top-1 -left-1 size-2.5 rounded-full bg-rose-500" />
            </span>
            {phases.map((p) => (
              <div key={p} className="relative">
                <div className="h-7" />
                {tasks
                  .filter((t) => t.phase === p)
                  .map((t) => (
                    <div
                      key={t.id}
                      className={`relative ${hover === t.id ? 'bg-accent-soft/60' : ''}`}
                      style={{ height: rowH }}
                      onMouseEnter={() => setHover(t.id)}
                      onMouseLeave={() => setHover(null)}
                    >
                      {t.milestone ? (
                        <span
                          onPointerDown={begin(t, 'move')}
                          title={`${t.name}: ${fmt(t.start)}`}
                          className={`absolute top-1/2 size-4 -translate-y-1/2 rotate-45 cursor-grab touch-none ${t.color}`}
                          style={{ left: t.start * dayW + dayW / 2 - 8 }}
                        />
                      ) : (
                        <div
                          onPointerDown={begin(t, 'move')}
                          title={`${t.name}: ${fmt(t.start)} – ${fmt(t.start + t.days - 1)}`}
                          className={`absolute top-1.5 bottom-1.5 cursor-grab touch-none overflow-hidden rounded-md ${t.track}`}
                          style={{ left: t.start * dayW + 2, width: t.days * dayW - 4 }}
                        >
                          <span
                            className={`block h-full ${t.color}`}
                            style={{ width: `${t.progress}%` }}
                          />
                          <span className="absolute inset-y-0 left-1.5 flex items-center font-medium text-white mix-blend-luminosity">
                            {t.progress}%
                          </span>
                          <span
                            onPointerDown={begin(t, 'resize')}
                            aria-hidden
                            className="absolute inset-y-0 right-0 w-2 cursor-ew-resize hover:bg-white/30"
                          />
                        </div>
                      )}
                    </div>
                  ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
