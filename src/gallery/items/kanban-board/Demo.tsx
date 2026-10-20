import { useRef, useState, type KeyboardEvent, type PointerEvent } from 'react';

interface Card {
  id: string;
  title: string;
  label: string;
  color: string;
  who: string;
}
type Col = 'todo' | 'doing' | 'done';
const COLS: { id: Col; title: string }[] = [
  { id: 'todo', title: 'To do' },
  { id: 'doing', title: 'In progress' },
  { id: 'done', title: 'Done' },
];
const LABEL: Record<string, string> = {
  Design: 'bg-violet-500/15 text-violet-600 dark:text-violet-300',
  Frontend: 'bg-sky-500/15 text-sky-600 dark:text-sky-300',
  Bug: 'bg-rose-500/15 text-rose-600 dark:text-rose-300',
};

const INITIAL: Record<Col, Card[]> = {
  todo: [
    { id: 'a', title: 'Dark mode palette', label: 'Design', color: '', who: 'MS' },
    { id: 'b', title: 'Fix Safari scroll jump', label: 'Bug', color: '', who: 'LM' },
  ],
  doing: [{ id: 'c', title: 'Command palette', label: 'Frontend', color: '', who: 'HI' }],
  done: [{ id: 'd', title: 'Onboarding wizard', label: 'Frontend', color: '', who: 'YM' }],
};

interface Drag {
  card: Card;
  from: Col;
  x: number;
  y: number;
  dx: number;
  dy: number;
  width: number;
  over: Col;
  index: number;
}

export default function Demo() {
  const [board, setBoard] = useState(INITIAL);
  const [drag, setDrag] = useState<Drag | null>(null);
  const [msg, setMsg] = useState('');
  const root = useRef<HTMLDivElement>(null);

  /** Finds the column and insertion index under the pointer. */
  const locate = (x: number, y: number, fallback: Drag) => {
    const el = document.elementFromPoint(x, y)?.closest<HTMLElement>('[data-col]');
    if (!el) return { over: fallback.over, index: fallback.index };
    const col = el.dataset.col as Col;
    const cards = [...el.querySelectorAll<HTMLElement>('[data-card]')];
    const index = cards.filter(
      (c) => c.getBoundingClientRect().top + c.offsetHeight / 2 < y,
    ).length;
    return { over: col, index };
  };

  const start = (card: Card, from: Col) => (e: PointerEvent<HTMLDivElement>) => {
    if (e.button !== 0) return;
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.setPointerCapture(e.pointerId);
    const index = board[from].findIndex((c) => c.id === card.id);
    setDrag({
      card,
      from,
      x: e.clientX,
      y: e.clientY,
      dx: e.clientX - r.left,
      dy: e.clientY - r.top,
      width: r.width,
      over: from,
      index,
    });
  };

  const move = (e: PointerEvent) => {
    if (!drag) return;
    setDrag({ ...drag, x: e.clientX, y: e.clientY, ...locate(e.clientX, e.clientY, drag) });
  };

  const place = (card: Card, from: Col, to: Col, index: number) => {
    setBoard((b) => {
      const next = { ...b, [from]: b[from].filter((c) => c.id !== card.id) };
      const list = [...next[to]];
      list.splice(Math.min(index, list.length), 0, card);
      return { ...next, [to]: list };
    });
    setMsg(`Moved “${card.title}” to ${COLS.find((c) => c.id === to)!.title}`);
  };

  const end = () => {
    if (drag) place(drag.card, drag.from, drag.over, drag.index);
    setDrag(null);
  };

  const onKey = (card: Card, col: Col, i: number) => (e: KeyboardEvent) => {
    const ci = COLS.findIndex((c) => c.id === col);
    if (e.key === 'ArrowRight' && ci < 2) place(card, col, COLS[ci + 1].id, 0);
    else if (e.key === 'ArrowLeft' && ci > 0) place(card, col, COLS[ci - 1].id, 0);
    else if (e.key === 'ArrowDown') place(card, col, col, i + 1);
    else if (e.key === 'ArrowUp' && i > 0) place(card, col, col, i - 1);
    else return;
    e.preventDefault();
    requestAnimationFrame(() =>
      root.current?.querySelector<HTMLElement>(`[data-card="${card.id}"]`)?.focus(),
    );
  };

  return (
    <div
      ref={root}
      onPointerMove={move}
      onPointerUp={end}
      className={`relative flex h-full gap-3 overflow-x-auto p-4 ${drag ? 'cursor-grabbing select-none' : ''}`}
    >
      {COLS.map(({ id, title }) => {
        const cards = board[id].filter((c) => c.id !== drag?.card.id);
        return (
          <section
            key={id}
            data-col={id}
            className={`flex w-60 shrink-0 flex-col rounded-2xl p-2 transition-colors @2xl:flex-1 ${drag?.over === id ? 'bg-accent-soft' : 'bg-surface-2'}`}
          >
            <h3 className="flex items-center justify-between px-2 py-1.5 text-sm font-semibold">
              {title}
              <span className="rounded-full bg-surface px-2 text-xs text-muted">
                {board[id].length}
              </span>
            </h3>
            <div className="flex flex-1 flex-col gap-2">
              {cards.map((card, i) => (
                <div key={card.id} className="contents">
                  {drag?.over === id && drag.index === i && (
                    <div className="h-16 rounded-xl border-2 border-dashed border-accent/50" />
                  )}
                  <div
                    data-card={card.id}
                    tabIndex={0}
                    onPointerDown={start(card, id)}
                    onKeyDown={onKey(card, id, i)}
                    aria-roledescription="Draggable card"
                    className="cursor-grab touch-none rounded-xl border border-line bg-surface p-3 shadow-sm"
                  >
                    <span
                      className={`rounded px-1.5 py-0.5 text-[11px] font-medium ${LABEL[card.label]}`}
                    >
                      {card.label}
                    </span>
                    <p className="mt-1.5 text-sm font-medium">{card.title}</p>
                    <span className="mt-2 ml-auto flex size-6 items-center justify-center rounded-full bg-accent-soft text-[10px] font-semibold text-accent">
                      {card.who}
                    </span>
                  </div>
                </div>
              ))}
              {drag?.over === id && drag.index >= cards.length && (
                <div className="h-16 rounded-xl border-2 border-dashed border-accent/50" />
              )}
            </div>
          </section>
        );
      })}
      {drag && (
        <div
          aria-hidden
          className="pointer-events-none fixed z-50 rotate-2 rounded-xl border border-accent bg-surface p-3 shadow-2xl"
          style={{ left: drag.x - drag.dx, top: drag.y - drag.dy, width: drag.width }}
        >
          <span
            className={`rounded px-1.5 py-0.5 text-[11px] font-medium ${LABEL[drag.card.label]}`}
          >
            {drag.card.label}
          </span>
          <p className="mt-1.5 text-sm font-medium">{drag.card.title}</p>
        </div>
      )}
      <p className="sr-only" aria-live="polite">
        {msg}
      </p>
    </div>
  );
}
