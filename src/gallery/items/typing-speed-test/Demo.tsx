import { RotateCcw } from 'lucide-react';
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import type { DemoProps } from '../../types';

const WORDS =
  'the of and to in is you that it he was for on are as with his they at be this have from or one had by word but not what all were we when your can said there use an each which she do how their if will up other about out many then them these so some her would make like him into time has look two more write go see number no way could people my than first water been call who oil its now find long down day did get come made may part'.split(
    ' ',
  );
const DURATION = 30;
const BEST_KEY = 'ai-ui-gallery:demo-typing-best';

function pick(seed: number) {
  let s = seed;
  return Array.from({ length: 30 }, () => {
    s = (s * 1103515245 + 12345) % 2 ** 31;
    return WORDS[s % WORDS.length];
  });
}

function readBest() {
  try {
    return Number(localStorage.getItem(BEST_KEY)) || 0;
  } catch {
    return 0;
  }
}

export default function Demo({ mode }: DemoProps) {
  const [seed, setSeed] = useState(() =>
    mode === 'preview' ? 7 : Math.floor(Math.random() * 1e9),
  );
  const words = useMemo(() => pick(seed), [seed]);
  const [typed, setTyped] = useState<string[]>(mode === 'preview' ? ['the', 'qiuck', 'to'] : ['']);
  const [startedAt, setStartedAt] = useState<number | null>(null);
  const [now, setNow] = useState(0);
  const [best, setBest] = useState(readBest);
  const input = useRef<HTMLInputElement>(null);
  const box = useRef<HTMLDivElement>(null);
  const [caret, setCaret] = useState({ x: 0, y: 0, h: 0 });

  const elapsed = startedAt === null ? 0 : Math.min(DURATION, (now - startedAt) / 1000);
  const done = elapsed >= DURATION;

  useEffect(() => {
    if (startedAt === null || done) return;
    const t = setInterval(() => setNow(performance.now()), 100);
    return () => clearInterval(t);
  }, [startedAt, done]);

  const stats = useMemo(() => {
    let correct = 0;
    let total = 0;
    typed.forEach((t, i) => {
      const target = words[i] ?? '';
      const last = i === typed.length - 1;
      for (let c = 0; c < t.length; c++) {
        total++;
        if (t[c] === target[c]) correct++;
      }
      if (!last) {
        total++;
        if (t === target) correct++;
      }
    });
    const minutes = Math.max(elapsed, 1) / 60;
    return {
      wpm: Math.round(correct / 5 / minutes),
      raw: Math.round(total / 5 / minutes),
      acc: total ? Math.round((correct / total) * 100) : 100,
    };
  }, [typed, words, elapsed]);

  useEffect(() => {
    if (!done || stats.wpm <= best) return;
    try {
      localStorage.setItem(BEST_KEY, String(stats.wpm));
    } catch {
      // Storage unavailable: keep the best score for this session only.
    }
    const t = setTimeout(() => setBest(stats.wpm));
    return () => clearTimeout(t);
  }, [done, stats.wpm, best]);

  useLayoutEffect(() => {
    const el = box.current?.querySelector<HTMLElement>('[data-caret]');
    if (!el || !box.current) return;
    const b = box.current.getBoundingClientRect();
    const r = el.getBoundingClientRect();
    const atEnd = el.dataset.caret === 'after';
    setCaret({ x: (atEnd ? r.right : r.left) - b.left, y: r.top - b.top, h: r.height });
  }, [typed, words]);

  const restart = () => {
    setSeed(Math.floor(Math.random() * 1e9));
    setTyped(['']);
    setStartedAt(null);
    setNow(0);
    input.current?.focus();
  };

  const onChange = (value: string) => {
    if (done) return;
    if (startedAt === null) {
      const t = performance.now();
      setStartedAt(t);
      setNow(t);
    }
    // The input holds the current word; a space commits it.
    if (value.endsWith(' ')) {
      if (value.trim() === '') return;
      setTyped((ts) => [...ts.slice(0, -1), value.trim(), '']);
    } else {
      setTyped((ts) => [...ts.slice(0, -1), value]);
    }
  };

  const current = typed.length - 1;

  return (
    <div className="flex h-full flex-col items-center justify-center gap-5 bg-bg p-6 font-mono">
      <div className="flex w-full max-w-xl items-center justify-between text-sm text-muted">
        <span className="text-2xl font-semibold text-accent tabular-nums">
          {Math.ceil(DURATION - elapsed)}
        </span>
        <span className="tabular-nums">{stats.wpm} wpm</span>
        <span>best {best}</span>
      </div>
      {done ? (
        <div className="grid w-full max-w-xl grid-cols-3 gap-3 text-center" role="status">
          {[
            ['wpm', stats.wpm],
            ['raw', stats.raw],
            ['acc', `${stats.acc}%`],
          ].map(([k, v]) => (
            <div key={k} className="rounded-2xl border border-line bg-surface p-4">
              <p className="text-3xl font-bold text-accent">{v}</p>
              <p className="text-xs text-muted">{k}</p>
            </div>
          ))}
        </div>
      ) : (
        <div
          ref={box}
          className="relative w-full max-w-xl cursor-text text-xl leading-relaxed select-none"
          onClick={() => input.current?.focus()}
        >
          <div className="flex flex-wrap gap-x-[0.6em]">
            {words.map((wd, i) => {
              const t = typed[i] ?? '';
              const extra = t.slice(wd.length);
              const wrongWord = i < current && t !== wd;
              return (
                <span key={i} className={wrongWord ? 'underline decoration-rose-500/70' : ''}>
                  {[...wd].map((ch, c) => {
                    const typedCh = t[c];
                    const color =
                      i > current || typedCh === undefined
                        ? 'text-muted/50'
                        : typedCh === ch
                          ? 'text-fg'
                          : 'text-rose-500';
                    return (
                      <span
                        key={c}
                        className={color}
                        data-caret={i === current && c === t.length ? 'before' : undefined}
                      >
                        {ch}
                      </span>
                    );
                  })}
                  {[...extra].map((ch, c) => (
                    <span
                      key={`x${c}`}
                      className="text-rose-500/70 line-through"
                      data-caret={i === current && c === extra.length - 1 ? 'after' : undefined}
                    >
                      {ch}
                    </span>
                  ))}
                </span>
              );
            })}
          </div>
          <span
            aria-hidden
            className="absolute top-0 left-0 w-0.5 animate-pulse rounded bg-accent transition-transform duration-100 ease-out"
            style={{ height: caret.h, transform: `translate(${caret.x}px, ${caret.y}px)` }}
          />
        </div>
      )}
      <input
        ref={input}
        autoFocus={mode === 'full'}
        value={typed[current] ?? ''}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Tab') {
            e.preventDefault();
            restart();
          }
        }}
        autoCapitalize="off"
        autoComplete="off"
        autoCorrect="off"
        spellCheck={false}
        aria-label="Type the words shown"
        className="absolute size-px opacity-0"
      />
      <button
        type="button"
        onClick={restart}
        className="flex items-center gap-2 rounded-xl px-3 py-2 text-sm text-muted hover:bg-surface-2 hover:text-fg"
      >
        <RotateCcw className="size-4" aria-hidden /> Restart{' '}
        <kbd className="rounded border border-line px-1 text-[10px]">Tab</kbd>
      </button>
    </div>
  );
}
