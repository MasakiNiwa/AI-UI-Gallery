import { CalendarDays, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState, type KeyboardEvent } from 'react';
import type { DemoProps } from '../../types';

const TODAY = new Date(2026, 9, 21);
const DAY = 86_400_000;
const sameDay = (a: Date | null, b: Date | null) =>
  !!a && !!b && a.toDateString() === b.toDateString();
const addDays = (d: Date, n: number) => new Date(d.getFullYear(), d.getMonth(), d.getDate() + n);
const fmt = (d: Date | null) =>
  d ? d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : '—';
const WEEKDAYS = Array.from({ length: 7 }, (_, i) =>
  new Date(2026, 0, 4 + i).toLocaleDateString('en-US', { weekday: 'narrow' }),
);

function Month({
  month,
  start,
  end,
  hover,
  focus,
  onPick,
  onHover,
  onKey,
}: {
  month: Date;
  start: Date | null;
  end: Date | null;
  hover: Date | null;
  focus: Date;
  onPick: (d: Date) => void;
  onHover: (d: Date | null) => void;
  onKey: (e: KeyboardEvent, d: Date) => void;
}) {
  const first = new Date(month.getFullYear(), month.getMonth(), 1);
  const days = new Date(month.getFullYear(), month.getMonth() + 1, 0).getDate();
  const cells: (Date | null)[] = [
    ...Array(first.getDay()).fill(null),
    ...Array.from(
      { length: days },
      (_, i) => new Date(month.getFullYear(), month.getMonth(), i + 1),
    ),
  ];
  const rangeEnd = end ?? hover;

  return (
    <div className="w-64">
      <p className="mb-2 text-center text-sm font-semibold">
        {month.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
      </p>
      <div
        role="grid"
        className="grid grid-cols-7 text-center text-xs"
        onMouseLeave={() => onHover(null)}
      >
        {WEEKDAYS.map((w, i) => (
          <span key={i} role="columnheader" className="py-1 text-muted">
            {w}
          </span>
        ))}
        {cells.map((d, i) => {
          if (!d) return <span key={i} />;
          const past = d < TODAY && !sameDay(d, TODAY);
          const isStart = sameDay(d, start);
          const isEnd = sameDay(d, rangeEnd);
          const inRange = start && rangeEnd && d > start && d < rangeEnd;
          return (
            <span
              key={i}
              role="gridcell"
              className={`py-0.5 ${inRange ? 'bg-accent-soft' : ''} ${isStart && rangeEnd && rangeEnd > start! ? 'rounded-l-full bg-accent-soft' : ''} ${isEnd && start && rangeEnd! > start ? 'rounded-r-full bg-accent-soft' : ''}`}
            >
              <button
                type="button"
                disabled={past}
                tabIndex={sameDay(d, focus) ? 0 : -1}
                data-date={d.toDateString()}
                aria-pressed={isStart || sameDay(d, end)}
                aria-label={d.toDateString()}
                onClick={() => onPick(d)}
                onMouseEnter={() => onHover(d)}
                onKeyDown={(e) => onKey(e, d)}
                className={`mx-auto flex size-8 items-center justify-center rounded-full text-sm disabled:text-muted/40 ${isStart || isEnd ? 'bg-accent font-semibold text-accent-contrast' : 'hover:bg-surface-2'} ${sameDay(d, TODAY) && !isStart && !isEnd ? 'ring-1 ring-accent' : ''}`}
              >
                {d.getDate()}
              </button>
            </span>
          );
        })}
      </div>
    </div>
  );
}

export default function Demo({ mode }: DemoProps) {
  const [open, setOpen] = useState(mode === 'preview');
  const [view, setView] = useState(new Date(2026, 9, 1));
  const [start, setStart] = useState<Date | null>(new Date(2026, 9, 24));
  const [end, setEnd] = useState<Date | null>(new Date(2026, 9, 27));
  const [hover, setHover] = useState<Date | null>(null);
  const [focus, setFocus] = useState(TODAY);

  const pick = (d: Date) => {
    if (!start || end || d <= start) {
      setStart(d);
      setEnd(null);
    } else setEnd(d);
    setFocus(d);
  };

  const onKey = (e: KeyboardEvent, d: Date) => {
    const delta = { ArrowLeft: -1, ArrowRight: 1, ArrowUp: -7, ArrowDown: 7 }[e.key];
    if (e.key === 'Escape') setOpen(false);
    if (!delta) return;
    e.preventDefault();
    const next = addDays(d, delta);
    setFocus(next);
    if (next.getMonth() !== view.getMonth() && next.getMonth() !== view.getMonth() + 1) {
      setView(new Date(next.getFullYear(), next.getMonth(), 1));
    }
    requestAnimationFrame(() =>
      document.querySelector<HTMLButtonElement>(`[data-date="${next.toDateString()}"]`)?.focus(),
    );
  };

  const preset = (s: Date, e: Date) => {
    setStart(s);
    setEnd(e);
    setView(new Date(s.getFullYear(), s.getMonth(), 1));
  };
  const nights = start && end ? Math.round((end.getTime() - start.getTime()) / DAY) : 0;
  const saturday = addDays(TODAY, (6 - TODAY.getDay() + 7) % 7 || 7);

  return (
    <div className="flex h-full justify-center overflow-auto p-4 pt-6">
      <div className="relative w-full max-w-xl">
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          className="flex w-full max-w-sm items-center gap-3 rounded-xl border border-line bg-surface px-4 py-3 text-left"
        >
          <CalendarDays className="size-5 text-muted" aria-hidden />
          <span className="flex-1">
            <span className="block text-xs text-muted">Check-in → Check-out</span>
            <span className="font-medium">
              {fmt(start)} → {fmt(end)}
            </span>
          </span>
        </button>
        {open && (
          <div className="mt-2 rounded-2xl border border-line bg-surface p-4 shadow-xl">
            <div className="mb-3 flex flex-wrap gap-2">
              {[
                ['Tonight', TODAY, addDays(TODAY, 1)],
                ['This weekend', saturday, addDays(saturday, 1)],
                ['Next 7 days', TODAY, addDays(TODAY, 7)],
              ].map(([label, s, e]) => (
                <button
                  key={label as string}
                  type="button"
                  onClick={() => preset(s as Date, e as Date)}
                  className="rounded-full border border-line px-3 py-1 text-xs hover:bg-surface-2"
                >
                  {label as string}
                </button>
              ))}
            </div>
            <div className="relative flex flex-wrap justify-center gap-6">
              <button
                type="button"
                aria-label="Previous month"
                onClick={() => setView(new Date(view.getFullYear(), view.getMonth() - 1, 1))}
                className="absolute top-0 left-0 rounded-lg p-1 hover:bg-surface-2"
              >
                <ChevronLeft className="size-4" />
              </button>
              <button
                type="button"
                aria-label="Next month"
                onClick={() => setView(new Date(view.getFullYear(), view.getMonth() + 1, 1))}
                className="absolute top-0 right-0 rounded-lg p-1 hover:bg-surface-2"
              >
                <ChevronRight className="size-4" />
              </button>
              {[0, 1].map((o) => (
                <div key={o} className={o === 1 ? 'hidden @xl:block' : ''}>
                  <Month
                    month={new Date(view.getFullYear(), view.getMonth() + o, 1)}
                    {...{ start, end, hover, focus, onKey }}
                    onPick={pick}
                    onHover={setHover}
                  />
                </div>
              ))}
            </div>
            <div className="mt-3 flex items-center justify-between border-t border-line pt-3 text-sm">
              <span className="text-muted">
                {nights ? `${nights} night${nights > 1 ? 's' : ''}` : 'Select check-out'}
              </span>
              <span className="flex gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setStart(null);
                    setEnd(null);
                  }}
                  className="rounded-lg px-3 py-1.5 text-muted hover:bg-surface-2"
                >
                  Clear
                </button>
                <button
                  type="button"
                  disabled={!nights}
                  onClick={() => setOpen(false)}
                  className="rounded-lg bg-accent px-3 py-1.5 font-medium text-accent-contrast disabled:opacity-50"
                >
                  Apply
                </button>
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
