import { SmilePlus } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

interface Reaction {
  emoji: string;
  who: string[];
  mine: boolean;
}

const PICKER = ['👍', '❤️', '😂', '🎉', '😮', '🙏', '🔥', '👀'];
let floatId = 0;

const whoText = (r: Reaction) => {
  const names = [...(r.mine ? ['You'] : []), ...r.who];
  return names.length <= 2
    ? names.join(' and ')
    : `${names.slice(0, 2).join(', ')} and ${names.length - 2} others`;
};

export default function Demo() {
  const [reactions, setReactions] = useState<Reaction[]>([
    { emoji: '👍', who: ['Mina', 'Leo', 'Sam', 'Aki'], mine: false },
    { emoji: '🎉', who: ['Hana'], mine: true },
    { emoji: '🔥', who: ['Yuki', 'Leo'], mine: false },
  ]);
  const [floats, setFloats] = useState<{ id: number; emoji: string; x: number }[]>([]);
  const [open, setOpen] = useState(false);
  const pickerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const down = (e: MouseEvent) =>
      !pickerRef.current?.contains(e.target as Node) && setOpen(false);
    const key = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('mousedown', down);
    document.addEventListener('keydown', key);
    return () => {
      document.removeEventListener('mousedown', down);
      document.removeEventListener('keydown', key);
    };
  }, [open]);

  const toggle = (emoji: string, x = 40) => {
    const existing = reactions.find((r) => r.emoji === emoji);
    const adding = !existing?.mine;
    setReactions((rs) => {
      if (!existing) return [...rs, { emoji, who: [], mine: true }];
      return rs
        .map((r) => (r.emoji === emoji ? { ...r, mine: !r.mine } : r))
        .filter((r) => r.mine || r.who.length > 0);
    });
    if (adding) {
      const id = floatId++;
      setFloats((f) => [...f, { id, emoji, x }]);
      setTimeout(() => setFloats((f) => f.filter((x2) => x2.id !== id)), 900);
    }
  };

  return (
    <div className="flex h-full items-center justify-center p-6">
      <style>{`
        @keyframes demo-float{to{transform:translateY(-60px) scale(1.4);opacity:0}}
        @keyframes demo-bump{50%{transform:scale(1.15)}}
      `}</style>
      <div className="relative w-full max-w-md rounded-2xl border border-line bg-surface p-4">
        <div className="flex gap-3">
          <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-accent-soft text-sm font-semibold text-accent">
            MS
          </span>
          <div>
            <p className="text-sm">
              <b>Mina Sato</b> <span className="text-xs text-muted">10:42</span>
            </p>
            <p className="mt-0.5 text-sm">The new gallery release is live — 66 UIs now! 🚀</p>
          </div>
        </div>
        <div className="relative mt-3 flex flex-wrap items-center gap-1.5 pl-12">
          {reactions.map((r) => {
            const count = r.who.length + (r.mine ? 1 : 0);
            return (
              <button
                key={r.emoji}
                type="button"
                aria-pressed={r.mine}
                aria-label={`${r.emoji} ${count} reaction${count > 1 ? 's' : ''}${r.mine ? ', you reacted' : ''}`}
                title={whoText(r)}
                onClick={(e) => toggle(r.emoji, (e.currentTarget as HTMLElement).offsetLeft + 12)}
                className={`flex h-7 items-center gap-1 rounded-full border px-2 text-sm transition-colors ${r.mine ? 'border-accent bg-accent-soft' : 'border-line bg-surface-2 hover:border-muted'}`}
              >
                <span>{r.emoji}</span>
                <span
                  key={count}
                  className="text-xs font-medium tabular-nums"
                  style={{ animation: 'demo-bump 250ms ease-out' }}
                >
                  {count}
                </span>
              </button>
            );
          })}
          <div ref={pickerRef} className="relative">
            <button
              type="button"
              aria-label="Add reaction"
              aria-expanded={open}
              onClick={() => setOpen((o) => !o)}
              className="flex h-7 items-center rounded-full border border-dashed border-line px-2 text-muted hover:text-fg"
            >
              <SmilePlus className="size-4" />
            </button>
            {open && (
              <div
                role="dialog"
                aria-label="Pick a reaction"
                className="absolute bottom-full left-0 z-10 mb-2 grid grid-cols-4 gap-1 rounded-xl border border-line bg-surface p-2 shadow-xl"
              >
                {PICKER.map((e) => (
                  <button
                    key={e}
                    type="button"
                    aria-label={`React with ${e}`}
                    onClick={() => {
                      toggle(e, 120);
                      setOpen(false);
                    }}
                    className="flex size-9 items-center justify-center rounded-lg text-xl hover:scale-110 hover:bg-surface-2"
                  >
                    {e}
                  </button>
                ))}
              </div>
            )}
          </div>
          {floats.map((f) => (
            <span
              key={f.id}
              aria-hidden
              className="pointer-events-none absolute -top-2 text-xl"
              style={{ left: f.x + 48, animation: 'demo-float 900ms ease-out forwards' }}
            >
              {f.emoji}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
