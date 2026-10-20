import { Bell, ChartBar, House, Inbox, LogOut, Settings, type LucideIcon } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import type { DemoProps } from '../../types';

const LINKS: { icon: LucideIcon; label: string }[] = [
  { icon: House, label: 'Home' },
  { icon: Inbox, label: 'Inbox' },
  { icon: ChartBar, label: 'Reports' },
  { icon: Bell, label: 'Notifications' },
];

export default function Demo({ mode }: DemoProps) {
  const [open, setOpen] = useState(mode === 'preview');
  const [active, setActive] = useState('Home');
  const button = useRef<HTMLButtonElement>(null);
  const drawer = useRef<HTMLElement>(null);

  const close = () => {
    setOpen(false);
    button.current?.focus();
  };

  useEffect(() => {
    if (!open || mode === 'preview') return;
    drawer.current?.querySelector<HTMLElement>('a,button')?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
      if (e.key === 'Tab' && drawer.current) {
        // Keep focus inside the drawer.
        const els = drawer.current.querySelectorAll<HTMLElement>('a,button');
        const first = els[0];
        const last = els[els.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, mode]);

  const line = 'absolute left-0 h-0.5 w-5 rounded bg-current transition-all duration-300';

  return (
    <div className="relative h-full overflow-hidden">
      <header className="flex h-14 items-center gap-3 border-b border-line bg-surface px-4">
        <button
          ref={button}
          type="button"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          aria-controls="demo-drawer"
          onClick={() => (open ? close() : setOpen(true))}
          className="relative z-30 flex size-10 items-center justify-center rounded-lg hover:bg-surface-2"
        >
          <span className="relative block h-4 w-5">
            <span className={`${line} ${open ? 'top-[7px] rotate-45' : 'top-0'}`} />
            <span className={`${line} top-[7px] ${open ? 'opacity-0' : ''}`} />
            <span className={`${line} ${open ? 'top-[7px] -rotate-45' : 'top-[14px]'}`} />
          </span>
        </button>
        <span className="font-semibold">{active}</span>
      </header>
      <div className="space-y-3 p-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-16 rounded-xl bg-surface-2" />
        ))}
      </div>

      <div
        onClick={close}
        className={`absolute inset-0 z-10 bg-black/40 transition-opacity duration-300 ${open ? 'opacity-100' : 'pointer-events-none opacity-0'}`}
      />
      <nav
        ref={drawer}
        id="demo-drawer"
        aria-label="Main menu"
        inert={!open}
        className={`absolute inset-y-0 left-0 z-20 flex w-[280px] max-w-[85%] flex-col bg-surface pt-16 shadow-2xl transition-transform duration-[250ms] ease-out ${open ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <div className="flex items-center gap-3 border-b border-line px-4 pb-4">
          <span className="flex size-10 items-center justify-center rounded-full bg-accent-soft font-semibold text-accent">
            YM
          </span>
          <div>
            <p className="font-medium">Yuki Mori</p>
            <p className="text-xs text-muted">yuki@example.com</p>
          </div>
        </div>
        <ul className="flex-1 p-2">
          {LINKS.map(({ icon: Icon, label }) => (
            <li key={label}>
              <a
                href="#"
                aria-current={active === label ? 'page' : undefined}
                onClick={(e) => {
                  e.preventDefault();
                  setActive(label);
                  close();
                }}
                className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm ${active === label ? 'bg-accent-soft font-medium' : 'hover:bg-surface-2'}`}
              >
                <Icon className="size-5 text-muted" aria-hidden /> {label}
              </a>
            </li>
          ))}
        </ul>
        <div className="border-t border-line p-2">
          <button
            type="button"
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm hover:bg-surface-2"
          >
            <Settings className="size-5 text-muted" aria-hidden /> Settings
          </button>
          <button
            type="button"
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm hover:bg-surface-2"
          >
            <LogOut className="size-5 text-muted" aria-hidden /> Log out
          </button>
        </div>
      </nav>
    </div>
  );
}
