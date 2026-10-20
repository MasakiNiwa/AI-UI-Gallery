import { Bell, BellOff, MessageSquare, UserPlus, Zap, type LucideIcon } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import type { DemoProps } from '../../types';

interface Note {
  id: number;
  icon: LucideIcon;
  who: string;
  text: string;
  minutesAgo: number;
  unread: boolean;
}

const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' });
const ago = (m: number) =>
  m < 1
    ? 'just now'
    : m < 60
      ? rtf.format(-m, 'minute')
      : m < 1440
        ? rtf.format(-Math.round(m / 60), 'hour')
        : rtf.format(-Math.round(m / 1440), 'day');

const INITIAL: Note[] = [
  {
    id: 1,
    icon: MessageSquare,
    who: 'Mina',
    text: 'commented on Dashboard redesign',
    minutesAgo: 5,
    unread: true,
  },
  {
    id: 2,
    icon: UserPlus,
    who: 'Leo',
    text: 'invited you to Mobile app',
    minutesAgo: 42,
    unread: true,
  },
  {
    id: 3,
    icon: Zap,
    who: 'Deploy bot',
    text: 'finished deploying v2.4.0',
    minutesAgo: 180,
    unread: true,
  },
  {
    id: 4,
    icon: MessageSquare,
    who: 'Hana',
    text: 'replied to your comment',
    minutesAgo: 1500,
    unread: false,
  },
];
const INCOMING = [
  { icon: MessageSquare, who: 'Sam', text: 'mentioned you in Roadmap' },
  { icon: Zap, who: 'CI', text: 'all checks passed on #128' },
  { icon: UserPlus, who: 'Yuki', text: 'joined your workspace' },
];

export default function Demo({ mode }: DemoProps) {
  const [notes, setNotes] = useState(INITIAL);
  const [open, setOpen] = useState(mode === 'preview');
  const [tab, setTab] = useState<'all' | 'unread'>('all');
  const [wiggle, setWiggle] = useState(0);
  const [announce, setAnnounce] = useState('');
  const box = useRef<HTMLDivElement>(null);
  const nextId = useRef(100);
  const unread = notes.filter((n) => n.unread).length;
  const shown = tab === 'all' ? notes : notes.filter((n) => n.unread);

  useEffect(() => {
    if (!open || mode === 'preview') return;
    const down = (e: MouseEvent) => !box.current?.contains(e.target as Node) && setOpen(false);
    const key = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('mousedown', down);
    document.addEventListener('keydown', key);
    return () => {
      document.removeEventListener('mousedown', down);
      document.removeEventListener('keydown', key);
    };
  }, [open, mode]);

  const simulate = () => {
    const src = INCOMING[nextId.current % INCOMING.length];
    setNotes((n) => [{ ...src, id: nextId.current++, minutesAgo: 0, unread: true }, ...n]);
    setWiggle((w) => w + 1);
    setAnnounce(`New notification: ${src.who} ${src.text}`);
  };

  return (
    <div className="flex h-full flex-col items-center gap-4 p-6">
      <style>{`@keyframes demo-wiggle{0%,100%{transform:rotate(0)}20%{transform:rotate(14deg)}40%{transform:rotate(-12deg)}60%{transform:rotate(8deg)}80%{transform:rotate(-4deg)}}`}</style>
      <div className="flex w-full max-w-sm items-center justify-between rounded-2xl border border-line bg-surface px-4 py-2">
        <span className="font-semibold">Workspace</span>
        <div ref={box} className="relative">
          <button
            type="button"
            aria-expanded={open}
            aria-label={`Notifications, ${unread} unread`}
            onClick={() => setOpen((o) => !o)}
            className="relative flex size-10 items-center justify-center rounded-full hover:bg-surface-2"
          >
            <Bell
              key={wiggle}
              className="size-5"
              style={{ animation: wiggle ? 'demo-wiggle 600ms ease-in-out' : undefined }}
            />
            {unread > 0 && (
              <span className="absolute top-1 right-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-rose-500 px-1 text-[10px] font-bold text-white ring-2 ring-surface">
                {unread > 9 ? '9+' : unread}
              </span>
            )}
          </button>
          {open && (
            <div className="absolute top-full right-0 z-10 mt-2 w-80 max-w-[85vw] overflow-hidden rounded-2xl border border-line bg-surface shadow-2xl">
              <div className="flex items-center justify-between px-4 pt-3">
                <p className="font-semibold">Notifications</p>
                <button
                  type="button"
                  disabled={!unread}
                  onClick={() => setNotes((n) => n.map((x) => ({ ...x, unread: false })))}
                  className="text-xs text-accent disabled:text-muted"
                >
                  Mark all as read
                </button>
              </div>
              <div role="tablist" className="mt-2 flex gap-4 border-b border-line px-4 text-sm">
                {(['all', 'unread'] as const).map((t) => (
                  <button
                    key={t}
                    type="button"
                    role="tab"
                    aria-selected={tab === t}
                    onClick={() => setTab(t)}
                    className={`-mb-px border-b-2 pb-2 capitalize ${tab === t ? 'border-accent font-medium' : 'border-transparent text-muted'}`}
                  >
                    {t}{' '}
                    <span className="text-xs text-muted">
                      {t === 'all' ? notes.length : unread}
                    </span>
                  </button>
                ))}
              </div>
              <ul className="max-h-72 overflow-y-auto">
                {shown.length === 0 && (
                  <li className="flex flex-col items-center gap-2 py-10 text-sm text-muted">
                    <BellOff className="size-8" aria-hidden /> You're all caught up!
                  </li>
                )}
                {shown.map((n) => (
                  <li key={n.id}>
                    <button
                      type="button"
                      onClick={() =>
                        setNotes((all) =>
                          all.map((x) => (x.id === n.id ? { ...x, unread: false } : x)),
                        )
                      }
                      className={`flex w-full gap-3 px-4 py-3 text-left text-sm hover:bg-surface-2 ${n.unread ? 'bg-accent-soft/60' : ''}`}
                    >
                      <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-surface-2 text-accent">
                        <n.icon className="size-4" aria-hidden />
                      </span>
                      <span className="flex-1">
                        <b>{n.who}</b> {n.text}
                        <span className="block text-xs text-muted">{ago(n.minutesAgo)}</span>
                      </span>
                      {n.unread && (
                        <span
                          className="mt-1.5 size-2 shrink-0 rounded-full bg-accent"
                          aria-label="Unread"
                        />
                      )}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
      <button
        type="button"
        onClick={simulate}
        className="mt-auto rounded-xl border border-line bg-surface px-4 py-2 text-sm hover:bg-surface-2"
      >
        Simulate new notification
      </button>
      <p className="sr-only" aria-live="polite">
        {announce}
      </p>
    </div>
  );
}
