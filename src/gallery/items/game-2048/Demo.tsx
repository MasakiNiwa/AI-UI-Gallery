import { RotateCcw, Undo2 } from 'lucide-react';
import { useCallback, useEffect, useRef, useState, type PointerEvent } from 'react';
import type { DemoProps } from '../../types';
import { canMove, move, newGame, SIZE, spawn, type Dir, type Tile } from './logic';

const KEY = 'ai-ui-gallery:demo-2048-best';
const COLORS: Record<number, string> = {
  2: 'bg-[#eee4da] text-[#776e65]',
  4: 'bg-[#ede0c8] text-[#776e65]',
  8: 'bg-[#f2b179] text-white',
  16: 'bg-[#f59563] text-white',
  32: 'bg-[#f67c5f] text-white',
  64: 'bg-[#f65e3b] text-white',
  128: 'bg-[#edcf72] text-white',
  256: 'bg-[#edcc61] text-white',
  512: 'bg-[#edc850] text-white',
  1024: 'bg-[#edc53f] text-white',
  2048: 'bg-[#edc22e] text-white',
};
const KEYS: Record<string, Dir> = {
  ArrowLeft: 'left',
  ArrowRight: 'right',
  ArrowUp: 'up',
  ArrowDown: 'down',
  a: 'left',
  d: 'right',
  w: 'up',
  s: 'down',
};

const readBest = () => {
  try {
    return Number(localStorage.getItem(KEY)) || 0;
  } catch {
    return 0;
  }
};

export default function Demo({ mode }: DemoProps) {
  const [tiles, setTiles] = useState<Tile[]>(() => newGame());
  const [score, setScore] = useState(0);
  const [best, setBest] = useState(readBest);
  const [history, setHistory] = useState<{ tiles: Tile[]; score: number } | null>(null);
  const [gain, setGain] = useState<{ n: number; key: number } | null>(null);
  const box = useRef<HTMLDivElement>(null);
  const swipe = useRef<{ x: number; y: number } | null>(null);
  const won = tiles.some((t) => t.value >= 2048);
  const over = !canMove(tiles);

  const play = useCallback(
    (dir: Dir) => {
      const result = move(tiles, dir);
      if (!result.moved) return;
      setHistory({ tiles, score });
      setTiles(spawn(result.tiles));
      if (result.score) {
        const total = score + result.score;
        setScore(total);
        setGain({ n: result.score, key: Date.now() });
        if (total > best) {
          setBest(total);
          try {
            localStorage.setItem(KEY, String(total));
          } catch {
            // Best score is a nice-to-have.
          }
        }
      }
    },
    [tiles, score, best],
  );

  useEffect(() => {
    if (mode === 'preview') return;
    const el = box.current!;
    const onKey = (e: KeyboardEvent) => {
      const dir = KEYS[e.key];
      if (!dir) return;
      e.preventDefault();
      play(dir);
    };
    el.addEventListener('keydown', onKey);
    return () => el.removeEventListener('keydown', onKey);
  }, [play, mode]);

  const reset = () => {
    setTiles(newGame());
    setScore(0);
    setHistory(null);
  };

  const pointerUp = (e: PointerEvent) => {
    const s = swipe.current;
    swipe.current = null;
    if (!s) return;
    const dx = e.clientX - s.x;
    const dy = e.clientY - s.y;
    if (Math.max(Math.abs(dx), Math.abs(dy)) < 30) return;
    play(Math.abs(dx) > Math.abs(dy) ? (dx > 0 ? 'right' : 'left') : dy > 0 ? 'down' : 'up');
  };

  const cell = 100 / SIZE;

  return (
    <div
      ref={box}
      tabIndex={0}
      className="flex h-full flex-col items-center justify-center gap-3 overflow-auto p-4 outline-none"
    >
      <style>{`
        @keyframes demo-pop{0%{transform:scale(0)}60%{transform:scale(1.12)}100%{transform:scale(1)}}
        @keyframes demo-gain{to{transform:translateY(-24px);opacity:0}}
      `}</style>
      <div className="flex w-full max-w-xs items-center gap-2">
        <p className="mr-auto text-3xl font-black text-[#776e65] dark:text-[#d6cfc7]">2048</p>
        {[
          { label: 'Score', v: score },
          { label: 'Best', v: best },
        ].map(({ label, v }) => (
          <div
            key={label}
            className="relative min-w-16 rounded-lg bg-[#bbada0] px-3 py-1 text-center text-white"
          >
            <p className="text-[10px] uppercase">{label}</p>
            <p className="font-bold tabular-nums">{v}</p>
            {label === 'Score' && gain && (
              <span
                key={gain.key}
                className="pointer-events-none absolute inset-x-0 top-1 font-bold text-[#776e65] dark:text-white"
                style={{ animation: 'demo-gain 600ms ease-out forwards' }}
              >
                +{gain.n}
              </span>
            )}
          </div>
        ))}
      </div>
      <div className="flex w-full max-w-xs justify-end gap-2">
        <button
          type="button"
          disabled={!history}
          onClick={() => {
            if (history) {
              setTiles(history.tiles);
              setScore(history.score);
              setHistory(null);
            }
          }}
          className="inline-flex items-center gap-1 rounded-lg px-2 py-1 text-sm text-muted hover:bg-surface-2 disabled:opacity-40"
        >
          <Undo2 className="size-4" aria-hidden /> Undo
        </button>
        <button
          type="button"
          onClick={reset}
          className="inline-flex items-center gap-1 rounded-lg bg-[#8f7a66] px-3 py-1 text-sm font-medium text-white"
        >
          <RotateCcw className="size-4" aria-hidden /> New game
        </button>
      </div>
      <div
        role="grid"
        aria-label="2048 board. Use arrow keys or swipe."
        onPointerDown={(e) => (swipe.current = { x: e.clientX, y: e.clientY })}
        onPointerUp={pointerUp}
        className="relative aspect-square w-full max-w-xs touch-none rounded-xl bg-[#bbada0] p-1.5 select-none"
      >
        <div className="grid size-full grid-cols-4 gap-1.5">
          {Array.from({ length: SIZE * SIZE }, (_, i) => (
            <span key={i} className="rounded-md bg-[#cdc1b4]" />
          ))}
        </div>
        <div className="absolute inset-1.5">
          {tiles.map((t) => (
            <div
              key={t.id}
              className="absolute p-[3px] transition-[top,left] duration-100 ease-out"
              style={{
                top: `${t.row * cell}%`,
                left: `${t.col * cell}%`,
                width: `${cell}%`,
                height: `${cell}%`,
              }}
            >
              <div
                className={`flex size-full items-center justify-center rounded-md font-bold ${COLORS[t.value] ?? 'bg-[#3c3a32] text-white'} ${t.value >= 1024 ? 'text-lg' : 'text-2xl'}`}
                style={{ animation: t.isNew || t.merged ? 'demo-pop 180ms ease-out' : undefined }}
              >
                {t.value}
              </div>
            </div>
          ))}
        </div>
        {(won || over) && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 rounded-xl bg-[#eee4da]/80 text-[#776e65]">
            <p className="text-2xl font-black">{won ? 'You win!' : 'Game over'}</p>
            <button
              type="button"
              onClick={reset}
              className="rounded-lg bg-[#8f7a66] px-4 py-1.5 text-sm font-medium text-white"
            >
              Try again
            </button>
          </div>
        )}
      </div>
      <p className="text-xs text-muted">
        Arrow keys / WASD or swipe · click the board first to focus
      </p>
    </div>
  );
}
