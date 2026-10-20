import { Heart, Pause, Play, Repeat, Shuffle, SkipBack, SkipForward } from 'lucide-react';
import { useEffect, useState, type CSSProperties } from 'react';

const TRACKS = [
  {
    title: 'Midnight Circuit',
    artist: 'Neon Harbor',
    length: 214,
    grad: 'from-indigo-500 via-violet-500 to-fuchsia-400',
  },
  {
    title: 'Paper Lanterns',
    artist: 'Kyoto Drift',
    length: 188,
    grad: 'from-amber-400 via-orange-500 to-rose-500',
  },
  {
    title: 'Low Tide',
    artist: 'Glass Coast',
    length: 241,
    grad: 'from-teal-300 via-cyan-500 to-blue-600',
  },
];

const time = (s: number) => `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, '0')}`;

export default function Demo() {
  const [index, setIndex] = useState(0);
  const [pos, setPos] = useState(64);
  const [playing, setPlaying] = useState(false);
  const [shuffle, setShuffle] = useState(false);
  const [repeat, setRepeat] = useState(false);
  const [liked, setLiked] = useState(true);
  const track = TRACKS[index];

  const play = (i: number) => {
    setIndex((i + TRACKS.length) % TRACKS.length);
    setPos(0);
    setPlaying(true);
  };

  useEffect(() => {
    if (!playing) return;
    const id = setInterval(() => {
      setPos((p) => {
        if (p + 1 < track.length) return p + 1;
        if (repeat) return 0;
        setIndex((i) => (i + 1) % TRACKS.length);
        return 0;
      });
    }, 1000);
    return () => clearInterval(id);
  }, [playing, track.length, repeat]);

  const toggleBtn = (on: boolean) =>
    `rounded-full p-2 ${on ? 'text-accent' : 'text-muted hover:text-fg'}`;

  return (
    <div className="flex h-full items-center justify-center overflow-auto p-4">
      <style>{`
        @keyframes demo-spin{to{transform:rotate(360deg)}}
        @keyframes demo-eq{0%,100%{height:20%}50%{height:100%}}
        .demo-seek{appearance:none;height:4px;border-radius:9999px;background:linear-gradient(to right,var(--accent) var(--p),var(--surface-3) var(--p))}
        .demo-seek::-webkit-slider-thumb{appearance:none;width:14px;height:14px;border-radius:50%;background:var(--text)}
        .demo-seek::-moz-range-thumb{width:14px;height:14px;border:0;border-radius:50%;background:var(--text)}
      `}</style>
      <div
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === ' ' && e.target === e.currentTarget) {
            e.preventDefault();
            setPlaying((p) => !p);
          }
        }}
        className="w-full max-w-xs rounded-3xl border border-line bg-surface p-5 shadow-lg"
      >
        <div
          className={`mx-auto aspect-square w-44 rounded-full bg-gradient-to-br ${track.grad} shadow-xl ring-8 ring-surface-2`}
          style={{
            animation: 'demo-spin 8s linear infinite',
            animationPlayState: playing ? 'running' : 'paused',
          }}
        >
          <span className="relative top-1/2 left-1/2 block size-8 -translate-1/2 rounded-full bg-surface ring-4 ring-black/10" />
        </div>
        <div className="mt-5 flex items-center gap-3">
          <div className="min-w-0 flex-1">
            <p className="flex items-center gap-2 truncate font-semibold">
              {track.title}
              {playing && (
                <span className="flex h-3 items-end gap-0.5" aria-hidden>
                  {[0, 1, 2, 3].map((b) => (
                    <span
                      key={b}
                      className="w-0.5 rounded-full bg-accent"
                      style={{ animation: `demo-eq ${0.6 + b * 0.15}s ease-in-out infinite` }}
                    />
                  ))}
                </span>
              )}
            </p>
            <p className="text-sm text-muted">{track.artist}</p>
          </div>
          <button
            type="button"
            aria-pressed={liked}
            aria-label="Like"
            onClick={() => setLiked((l) => !l)}
            className={liked ? 'text-rose-500' : 'text-muted'}
          >
            <Heart className={`size-5 ${liked ? 'fill-current' : ''}`} />
          </button>
        </div>
        <input
          type="range"
          min={0}
          max={track.length}
          value={pos}
          onChange={(e) => setPos(Number(e.target.value))}
          aria-label="Seek"
          aria-valuetext={`${time(pos)} of ${time(track.length)}`}
          className="demo-seek mt-4 w-full"
          style={{ '--p': `${(pos / track.length) * 100}%` } as CSSProperties}
        />
        <div className="mt-1 flex justify-between text-xs text-muted tabular-nums">
          <span>{time(pos)}</span>
          <span>-{time(track.length - pos)}</span>
        </div>
        <div className="mt-2 flex items-center justify-between">
          <button
            type="button"
            aria-pressed={shuffle}
            aria-label="Shuffle"
            onClick={() => setShuffle((s) => !s)}
            className={toggleBtn(shuffle)}
          >
            <Shuffle className="size-4" />
          </button>
          <button
            type="button"
            aria-label="Previous"
            onClick={() => play(index - 1)}
            className="rounded-full p-2 hover:bg-surface-2"
          >
            <SkipBack className="size-5 fill-current" />
          </button>
          <button
            type="button"
            aria-label={playing ? 'Pause' : 'Play'}
            onClick={() => setPlaying((p) => !p)}
            className="flex size-14 items-center justify-center rounded-full bg-fg text-bg transition-transform active:scale-95"
          >
            {playing ? (
              <Pause className="size-6 fill-current" />
            ) : (
              <Play className="ml-0.5 size-6 fill-current" />
            )}
          </button>
          <button
            type="button"
            aria-label="Next"
            onClick={() => play(index + 1)}
            className="rounded-full p-2 hover:bg-surface-2"
          >
            <SkipForward className="size-5 fill-current" />
          </button>
          <button
            type="button"
            aria-pressed={repeat}
            aria-label="Repeat"
            onClick={() => setRepeat((r) => !r)}
            className={toggleBtn(repeat)}
          >
            <Repeat className="size-4" />
          </button>
        </div>
        <ul className="mt-4 space-y-1 border-t border-line pt-3">
          {TRACKS.map((t, i) => (
            <li key={t.title}>
              <button
                type="button"
                onClick={() => play(i)}
                aria-current={i === index}
                className={`flex w-full items-center gap-3 rounded-xl p-2 text-left text-sm ${i === index ? 'bg-accent-soft' : 'hover:bg-surface-2'}`}
              >
                <span className={`size-8 rounded-lg bg-gradient-to-br ${t.grad}`} />
                <span className="flex-1">
                  <span className="block font-medium">{t.title}</span>
                  <span className="block text-xs text-muted">{t.artist}</span>
                </span>
                <span className="text-xs text-muted tabular-nums">{time(t.length)}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
