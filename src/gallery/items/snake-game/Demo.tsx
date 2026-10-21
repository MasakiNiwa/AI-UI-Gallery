import { ArrowDown, ArrowLeft, ArrowRight, ArrowUp, Pause, Play, RotateCcw } from 'lucide-react';
import { useCallback, useEffect, useRef, useState, type PointerEvent } from 'react';
import type { DemoProps } from '../../types';
import { autopilot, GRID, newGame, step, turn, type Dir, type State } from './logic';

const BEST_KEY = 'ai-ui-gallery:demo-snake-best';
const KEYS: Record<string, Dir> = {
  ArrowUp: 'up',
  ArrowDown: 'down',
  ArrowLeft: 'left',
  ArrowRight: 'right',
  w: 'up',
  s: 'down',
  a: 'left',
  d: 'right',
};

const readBest = () => {
  try {
    return Number(localStorage.getItem(BEST_KEY)) || 0;
  } catch {
    return 0;
  }
};

function draw(canvas: HTMLCanvasElement, s: State) {
  const ctx = canvas.getContext('2d')!;
  const size = canvas.clientWidth;
  const dpr = Math.min(window.devicePixelRatio, 2);
  if (canvas.width !== Math.round(size * dpr))
    canvas.width = canvas.height = Math.round(size * dpr);
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  const c = size / GRID;
  ctx.fillStyle = '#12201a';
  ctx.fillRect(0, 0, size, size);
  ctx.fillStyle = '#16271f';
  for (let y = 0; y < GRID; y++)
    for (let x = y % 2; x < GRID; x += 2) ctx.fillRect(x * c, y * c, c, c);
  // Food
  ctx.fillStyle = '#f87171';
  ctx.shadowColor = '#f87171';
  ctx.shadowBlur = 12;
  ctx.beginPath();
  ctx.arc((s.food.x + 0.5) * c, (s.food.y + 0.5) * c, c * 0.32, 0, Math.PI * 2);
  ctx.fill();
  ctx.shadowBlur = 0;
  // Snake, fading toward the tail
  s.snake.forEach((p, i) => {
    const k = 1 - (i / s.snake.length) * 0.55;
    ctx.fillStyle = `hsl(150, 65%, ${30 + k * 32}%)`;
    ctx.beginPath();
    ctx.roundRect(p.x * c + 1, p.y * c + 1, c - 2, c - 2, i === 0 ? c * 0.38 : c * 0.25);
    ctx.fill();
  });
  // Eyes
  const h = s.snake[0];
  const fx = s.dir === 'left' ? -1 : s.dir === 'right' ? 1 : 0;
  const fy = s.dir === 'up' ? -1 : s.dir === 'down' ? 1 : 0;
  ctx.fillStyle = '#0b0d12';
  for (const side of [-1, 1]) {
    const ex = (h.x + 0.5 + fx * 0.18 + fy * side * 0.2) * c;
    const ey = (h.y + 0.5 + fy * 0.18 - fx * side * 0.2) * c;
    ctx.beginPath();
    ctx.arc(ex, ey, c * 0.08, 0, Math.PI * 2);
    ctx.fill();
  }
}

export default function Demo({ mode }: DemoProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const game = useRef<State>(newGame());
  const [score, setScore] = useState(0);
  const [best, setBest] = useState(readBest);
  const [status, setStatus] = useState<'ready' | 'playing' | 'paused' | 'over'>(
    mode === 'preview' ? 'playing' : 'ready',
  );
  const swipe = useRef<{ x: number; y: number } | null>(null);

  const press = useCallback((dir: Dir) => {
    game.current = turn(game.current, dir);
    setStatus((st) => (st === 'ready' || st === 'paused' ? 'playing' : st));
  }, []);

  const restart = () => {
    game.current = newGame();
    setScore(0);
    setStatus('playing');
    canvasRef.current?.focus();
  };

  useEffect(() => {
    const canvas = canvasRef.current!;
    draw(canvas, game.current);
    const ro = new ResizeObserver(() => draw(canvas, game.current));
    ro.observe(canvas);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    if (status !== 'playing') return;
    let timer = 0;
    const tick = () => {
      // The canvas ref is cleared before effect cleanup runs on unmount.
      const canvas = canvasRef.current;
      if (!canvas) return;
      let s = game.current;
      if (mode === 'preview') s = { ...s, queue: [autopilot(s)] };
      s = step(s);
      if (s.over && mode === 'preview') s = newGame();
      game.current = s;
      draw(canvas, s);
      setScore(s.score);
      if (s.over) {
        setStatus('over');
        setBest((b) => {
          if (s.score <= b) return b;
          try {
            localStorage.setItem(BEST_KEY, String(s.score));
          } catch {
            // Storage unavailable: keep the best score for this session only.
          }
          return s.score;
        });
        return;
      }
      // Speed up as the snake grows.
      timer = window.setTimeout(tick, Math.max(65, 140 - s.score * 4));
    };
    timer = window.setTimeout(tick, 140);
    return () => clearTimeout(timer);
  }, [status, mode]);

  const onKey = (e: React.KeyboardEvent) => {
    const dir = KEYS[e.key.length === 1 ? e.key.toLowerCase() : e.key];
    if (dir) {
      e.preventDefault();
      if (status === 'over') return;
      press(dir);
    } else if (e.key === ' ') {
      e.preventDefault();
      if (status === 'over') restart();
      else setStatus((st) => (st === 'playing' ? 'paused' : 'playing'));
    }
  };

  const onPointerUp = (e: PointerEvent) => {
    const start = swipe.current;
    swipe.current = null;
    if (!start || status === 'over') return;
    const dx = e.clientX - start.x;
    const dy = e.clientY - start.y;
    if (Math.max(Math.abs(dx), Math.abs(dy)) < 24) return;
    press(Math.abs(dx) > Math.abs(dy) ? (dx > 0 ? 'right' : 'left') : dy > 0 ? 'down' : 'up');
  };

  const pad =
    'grid size-11 place-items-center rounded-xl border border-line bg-surface text-muted active:scale-95 active:text-fg';

  return (
    <div className="flex h-full flex-col items-center justify-center gap-3 bg-bg p-4">
      <div className="flex w-full max-w-[min(100%,340px)] items-center justify-between text-sm">
        <span>
          Score <b className="tabular-nums">{score}</b>
        </span>
        <span className="text-muted">
          Best <b className="text-fg tabular-nums">{Math.max(best, score)}</b>
        </span>
        <button
          type="button"
          aria-label={status === 'playing' ? 'Pause' : 'Play'}
          onClick={() =>
            status === 'over'
              ? restart()
              : setStatus((st) => (st === 'playing' ? 'paused' : 'playing'))
          }
          className="grid size-8 place-items-center rounded-lg text-muted hover:bg-surface-2 hover:text-fg"
        >
          {status === 'playing' ? <Pause className="size-4" /> : <Play className="size-4" />}
        </button>
      </div>
      <div className="relative aspect-square max-h-full w-full max-w-[min(100%,340px)] min-h-0">
        <canvas
          ref={canvasRef}
          tabIndex={0}
          autoFocus={mode === 'full'}
          aria-label="Snake game board. Use the arrow keys to steer and Space to pause."
          onKeyDown={onKey}
          onPointerDown={(e) => (swipe.current = { x: e.clientX, y: e.clientY })}
          onPointerUp={onPointerUp}
          className="size-full touch-none rounded-xl outline-none focus-visible:ring-2 focus-visible:ring-accent"
        />
        {status !== 'playing' && (
          <div
            className="absolute inset-0 grid place-items-center rounded-xl bg-black/45 text-center text-white backdrop-blur-[2px]"
            role="status"
          >
            <div>
              <p className="text-lg font-semibold">
                {status === 'over' ? 'Game over' : status === 'paused' ? 'Paused' : 'Snake'}
              </p>
              <p className="mt-1 text-xs text-white/70">
                {status === 'over' ? `You scored ${score}` : 'Arrow keys, WASD or swipe'}
              </p>
              <button
                type="button"
                onClick={() => {
                  if (status === 'over') return restart();
                  setStatus('playing');
                  canvasRef.current?.focus();
                }}
                className="mt-3 inline-flex items-center gap-1.5 rounded-lg bg-emerald-500 px-3 py-1.5 text-sm font-medium text-white"
              >
                {status === 'over' ? (
                  <RotateCcw className="size-4" aria-hidden />
                ) : (
                  <Play className="size-4" aria-hidden />
                )}
                {status === 'over' ? 'Play again' : status === 'paused' ? 'Resume' : 'Start'}
              </button>
            </div>
          </div>
        )}
      </div>
      <div className="grid grid-cols-3 gap-1.5 @md:hidden" aria-label="Direction pad">
        <span />
        <button type="button" className={pad} aria-label="Up" onClick={() => press('up')}>
          <ArrowUp className="size-5" />
        </button>
        <span />
        <button type="button" className={pad} aria-label="Left" onClick={() => press('left')}>
          <ArrowLeft className="size-5" />
        </button>
        <button type="button" className={pad} aria-label="Down" onClick={() => press('down')}>
          <ArrowDown className="size-5" />
        </button>
        <button type="button" className={pad} aria-label="Right" onClick={() => press('right')}>
          <ArrowRight className="size-5" />
        </button>
      </div>
    </div>
  );
}
