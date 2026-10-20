import { RotateCcw, Trophy } from 'lucide-react';
import { useEffect, useState } from 'react';

const EMOJI = ['🐱', '🦊', '🐼', '🐸', '🦉', '🐙', '🦋', '🐢'];
const KEY = 'ai-ui-gallery:demo-memory-best';
/** Wall-clock time, read only from event handlers and timers. */
const clock = () => Date.now();

function shuffle<T>(arr: T[]) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const newDeck = () => shuffle([...EMOJI, ...EMOJI]).map((e, i) => ({ id: i, emoji: e }));

function readBest() {
  try {
    return Number(localStorage.getItem(KEY)) || null;
  } catch {
    return null;
  }
}

export default function Demo() {
  const [deck, setDeck] = useState(newDeck);
  const [open, setOpen] = useState<number[]>([]);
  const [matched, setMatched] = useState<Set<string>>(new Set());
  const [moves, setMoves] = useState(0);
  const [start, setStart] = useState<number | null>(null);
  const [now, setNow] = useState(clock);
  const [best, setBest] = useState(readBest);
  const won = matched.size === EMOJI.length;

  useEffect(() => {
    if (!start || won) return;
    const id = setInterval(() => setNow(clock()), 1000);
    return () => clearInterval(id);
  }, [start, won]);

  const flip = (i: number) => {
    if (open.length === 2 || open.includes(i) || matched.has(deck[i].emoji)) return;
    if (!start) {
      const t = clock();
      setStart(t);
      setNow(t);
    }
    const next = [...open, i];
    setOpen(next);
    if (next.length < 2) return;
    setMoves((m) => m + 1);
    const [a, b] = next;
    if (deck[a].emoji === deck[b].emoji) {
      const done = new Set(matched).add(deck[a].emoji);
      setMatched(done);
      setOpen([]);
      if (done.size === EMOJI.length) {
        const total = moves + 1;
        if (!best || total < best) {
          setBest(total);
          try {
            localStorage.setItem(KEY, String(total));
          } catch {
            // Best score is a nice-to-have.
          }
        }
      }
    } else setTimeout(() => setOpen([]), 800);
  };

  const reset = () => {
    setDeck(newDeck());
    setOpen([]);
    setMatched(new Set());
    setMoves(0);
    setStart(null);
  };

  const seconds = start ? Math.floor((now - start) / 1000) : 0;

  return (
    <div className="flex h-full flex-col items-center justify-center gap-3 overflow-auto p-4">
      <style>{`@keyframes demo-match{50%{transform:rotateY(180deg) scale(1.08)}}`}</style>
      <div className="flex w-full max-w-xs items-center justify-between text-sm">
        <span>
          Moves <b className="tabular-nums">{moves}</b>
        </span>
        <span className="tabular-nums">
          ⏱ {Math.floor(seconds / 60)}:{String(seconds % 60).padStart(2, '0')}
        </span>
        <span className="text-muted">Best {best ?? '—'}</span>
        <button
          type="button"
          onClick={reset}
          aria-label="New game"
          className="rounded-lg p-1.5 hover:bg-surface-2"
        >
          <RotateCcw className="size-4" />
        </button>
      </div>
      <div className="relative grid w-full max-w-xs grid-cols-4 gap-2">
        {deck.map((card, i) => {
          const isMatched = matched.has(card.emoji);
          const shown = isMatched || open.includes(i);
          return (
            <button
              key={card.id}
              type="button"
              aria-label={`Card ${i + 1}, ${shown ? card.emoji : 'hidden'}`}
              onClick={() => flip(i)}
              className="aspect-square [perspective:600px]"
            >
              <span
                className="relative block size-full transition-transform duration-300 [transform-style:preserve-3d]"
                style={{
                  transform: shown ? 'rotateY(180deg)' : 'none',
                  animation: isMatched ? 'demo-match 400ms ease-out' : undefined,
                }}
              >
                <span className="absolute inset-0 flex items-center justify-center rounded-xl bg-gradient-to-br from-accent to-indigo-400 text-lg text-white/70 shadow [backface-visibility:hidden]">
                  ?
                </span>
                <span
                  className={`absolute inset-0 flex items-center justify-center rounded-xl text-3xl shadow [backface-visibility:hidden] [transform:rotateY(180deg)] ${isMatched ? 'bg-emerald-500/20 ring-2 ring-emerald-500/50' : 'bg-surface ring-1 ring-line'}`}
                >
                  {card.emoji}
                </span>
              </span>
            </button>
          );
        })}
        {won && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 rounded-xl bg-surface/90 text-center backdrop-blur">
            <Trophy className="size-10 text-amber-500" aria-hidden />
            <p className="text-lg font-bold">You won!</p>
            <p className="text-sm text-muted">
              {moves} moves · {seconds}s
            </p>
            <button
              type="button"
              onClick={reset}
              className="rounded-xl bg-accent px-4 py-2 text-sm font-medium text-accent-contrast"
            >
              New game
            </button>
          </div>
        )}
      </div>
      <p className="sr-only" aria-live="polite">
        {won ? `You won in ${moves} moves` : `${matched.size} of ${EMOJI.length} pairs found`}
      </p>
    </div>
  );
}
