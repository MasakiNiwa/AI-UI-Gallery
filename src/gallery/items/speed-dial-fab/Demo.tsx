import { Camera, ListChecks, Mic, Plus, StickyNote, type LucideIcon } from 'lucide-react';
import { useEffect, useRef, useState, type KeyboardEvent } from 'react';
import type { DemoProps } from '../../types';

const ACTIONS: { label: string; icon: LucideIcon }[] = [
  { label: 'New note', icon: StickyNote },
  { label: 'Photo', icon: Camera },
  { label: 'Voice memo', icon: Mic },
  { label: 'Checklist', icon: ListChecks },
];

export default function Demo({ mode }: DemoProps) {
  const [open, setOpen] = useState(mode === 'preview');
  const [toast, setToast] = useState('');
  const [hideFab, setHideFab] = useState(false);
  const lastY = useRef(0);
  const fab = useRef<HTMLButtonElement>(null);
  const menu = useRef<HTMLUListElement>(null);

  useEffect(() => {
    if (!open || mode === 'preview') return;
    menu.current?.querySelector<HTMLElement>('[role=menuitem]')?.focus();
    const key = (e: globalThis.KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
        fab.current?.focus();
      }
    };
    document.addEventListener('keydown', key);
    return () => document.removeEventListener('keydown', key);
  }, [open, mode]);

  useEffect(() => {
    if (!toast) return;
    const id = setTimeout(() => setToast(''), 1800);
    return () => clearTimeout(id);
  }, [toast]);

  const onMenuKey = (e: KeyboardEvent) => {
    const items = [...(menu.current?.querySelectorAll<HTMLElement>('[role=menuitem]') ?? [])];
    const i = items.indexOf(document.activeElement as HTMLElement);
    // Items are listed bottom-up visually, so ArrowUp moves to the next one.
    if (e.key === 'ArrowUp') items[(i + 1) % items.length]?.focus();
    else if (e.key === 'ArrowDown') items[(i - 1 + items.length) % items.length]?.focus();
    else return;
    e.preventDefault();
  };

  return (
    <div className="relative h-full overflow-hidden">
      <div
        onScroll={(e) => {
          const y = e.currentTarget.scrollTop;
          if (Math.abs(y - lastY.current) > 6) setHideFab(y > lastY.current && y > 60);
          lastY.current = y;
        }}
        className="h-full space-y-2 overflow-y-auto p-4"
      >
        {Array.from({ length: 12 }, (_, i) => (
          <div key={i} className="rounded-xl border border-line bg-surface p-3 text-sm">
            <p className="font-medium">Note {i + 1}</p>
            <p className="text-muted">Ideas for the next release…</p>
          </div>
        ))}
      </div>
      <div
        onClick={() => setOpen(false)}
        className={`absolute inset-0 bg-black/30 transition-opacity duration-200 ${open ? 'opacity-100' : 'pointer-events-none opacity-0'}`}
      />
      <div
        className={`absolute right-5 bottom-5 flex flex-col items-end gap-3 transition-transform duration-300 ${hideFab && !open ? 'translate-y-28' : ''}`}
      >
        <ul
          ref={menu}
          role="menu"
          aria-label="Create"
          onKeyDown={onMenuKey}
          className="flex flex-col-reverse items-end gap-3"
        >
          {ACTIONS.map(({ label, icon: Icon }, i) => (
            <li
              key={label}
              role="none"
              className="transition-all duration-200"
              style={{
                transitionDelay: `${(open ? i : ACTIONS.length - 1 - i) * 40}ms`,
                opacity: open ? 1 : 0,
                transform: open ? 'none' : 'translateY(12px) scale(.6)',
                pointerEvents: open ? 'auto' : 'none',
              }}
            >
              <button
                type="button"
                role="menuitem"
                tabIndex={open ? 0 : -1}
                onClick={() => {
                  setOpen(false);
                  setToast(`${label} created`);
                  fab.current?.focus();
                }}
                className="flex items-center gap-3"
              >
                <span className="rounded-lg bg-surface px-2.5 py-1 text-sm font-medium shadow">
                  {label}
                </span>
                <span className="flex size-11 items-center justify-center rounded-full bg-surface text-accent shadow-lg">
                  <Icon className="size-5" aria-hidden />
                </span>
              </button>
            </li>
          ))}
        </ul>
        <button
          ref={fab}
          type="button"
          aria-haspopup="menu"
          aria-expanded={open}
          aria-label={open ? 'Close actions' : 'Create'}
          onClick={() => setOpen((o) => !o)}
          className="flex size-14 items-center justify-center rounded-full bg-accent text-accent-contrast shadow-xl transition-transform active:scale-95"
        >
          <Plus className={`size-7 transition-transform duration-300 ${open ? 'rotate-45' : ''}`} />
        </button>
      </div>
      <p
        role="status"
        className={`absolute bottom-6 left-4 rounded-lg bg-fg px-3 py-1.5 text-sm text-bg transition-opacity ${toast ? 'opacity-100' : 'opacity-0'}`}
      >
        {toast || ' '}
      </p>
    </div>
  );
}
