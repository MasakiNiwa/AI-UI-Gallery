import {
  ChevronRight,
  Copy,
  ExternalLink,
  FileText,
  Link,
  Mail,
  MessageSquare,
  Pencil,
  Share2,
  Trash2,
  Lock,
  type LucideIcon,
} from 'lucide-react';
import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type KeyboardEvent,
  type MouseEvent as ReactMouseEvent,
  type PointerEvent,
} from 'react';
import type { DemoProps } from '../../types';

interface Item {
  label: string;
  icon: LucideIcon;
  shortcut?: string;
  danger?: boolean;
  disabled?: boolean;
  sub?: Item[];
}

const ITEMS: (Item | 'divider')[] = [
  { label: 'Open', icon: ExternalLink, shortcut: '↵' },
  { label: 'Rename', icon: Pencil, shortcut: 'F2' },
  { label: 'Duplicate', icon: Copy, shortcut: '⌘D' },
  {
    label: 'Share',
    icon: Share2,
    sub: [
      { label: 'Copy link', icon: Link },
      { label: 'Email', icon: Mail },
      { label: 'Slack', icon: MessageSquare },
    ],
  },
  { label: 'Lock file', icon: Lock, disabled: true },
  'divider',
  { label: 'Move to trash', icon: Trash2, shortcut: '⌫', danger: true },
];
const MENU_W = 220;

function Menu({
  items,
  onPick,
  onClose,
  autoFocus,
  style,
}: {
  items: (Item | 'divider')[];
  onPick: (l: string) => void;
  onClose: () => void;
  autoFocus: boolean;
  style: CSSProperties;
}) {
  const ref = useRef<HTMLUListElement>(null);
  const [subOpen, setSubOpen] = useState<string | null>(null);
  const focusables = () => [
    ...(ref.current?.querySelectorAll<HTMLElement>(
      ':scope > li > [role=menuitem]:not([aria-disabled=true])',
    ) ?? []),
  ];

  useEffect(() => {
    if (autoFocus) focusables()[0]?.focus();
  }, [autoFocus]);

  const onKey = (e: KeyboardEvent, item: Item) => {
    const list = focusables();
    const i = list.indexOf(e.currentTarget as HTMLElement);
    if (e.key === 'ArrowDown') list[(i + 1) % list.length]?.focus();
    else if (e.key === 'ArrowUp') list[(i - 1 + list.length) % list.length]?.focus();
    else if (e.key === 'ArrowRight' && item.sub) setSubOpen(item.label);
    else if (e.key === 'ArrowLeft' || e.key === 'Escape') onClose();
    else if (e.key === 'Enter' || e.key === ' ') {
      if (item.sub) setSubOpen(item.label);
      else onPick(item.label);
    } else return;
    e.preventDefault();
    e.stopPropagation();
  };

  return (
    <ul
      ref={ref}
      role="menu"
      className="absolute z-20 rounded-xl border border-line bg-surface p-1 text-sm shadow-2xl"
      style={{ width: MENU_W, animation: 'demo-menu-in 120ms ease-out', ...style }}
    >
      {items.map((it, i) =>
        it === 'divider' ? (
          <li key={i} role="separator" className="my-1 h-px bg-line" />
        ) : (
          <li
            key={it.label}
            role="none"
            className="relative"
            onMouseEnter={() => setSubOpen(it.sub ? it.label : null)}
          >
            <div
              role="menuitem"
              tabIndex={-1}
              aria-disabled={it.disabled}
              aria-haspopup={it.sub ? 'menu' : undefined}
              aria-expanded={it.sub ? subOpen === it.label : undefined}
              onClick={() => !it.disabled && !it.sub && onPick(it.label)}
              onKeyDown={(e) => onKey(e, it)}
              className={`flex cursor-default items-center gap-2.5 rounded-lg px-2.5 py-1.5 outline-none ${it.disabled ? 'opacity-40' : it.danger ? 'text-rose-600 hover:bg-rose-500/10 focus:bg-rose-500/10 dark:text-rose-400' : 'hover:bg-surface-2 focus:bg-surface-2'}`}
            >
              <it.icon className="size-4" aria-hidden />
              <span className="flex-1">{it.label}</span>
              {it.shortcut && <kbd className="font-sans text-xs text-muted">{it.shortcut}</kbd>}
              {it.sub && <ChevronRight className="size-4 text-muted" aria-hidden />}
            </div>
            {it.sub && subOpen === it.label && (
              <Menu
                items={it.sub}
                onPick={onPick}
                onClose={() => {
                  setSubOpen(null);
                  focusables()
                    .find((f) => f.textContent?.includes(it.label))
                    ?.focus();
                }}
                autoFocus
                style={{ left: MENU_W - 8, top: -4 }}
              />
            )}
          </li>
        ),
      )}
    </ul>
  );
}

export default function Demo({ mode }: DemoProps) {
  const area = useRef<HTMLDivElement>(null);
  const card = useRef<HTMLDivElement>(null);
  const press = useRef<ReturnType<typeof setTimeout>>(undefined);
  const [menu, setMenu] = useState<{ x: number; y: number; kb: boolean } | null>(
    mode === 'preview' ? { x: 180, y: 90, kb: false } : null,
  );
  const [last, setLast] = useState('');

  const openAt = (clientX: number, clientY: number, kb: boolean) => {
    const r = area.current!.getBoundingClientRect();
    let x = clientX - r.left;
    let y = clientY - r.top;
    if (x + MENU_W > r.width) x = Math.max(4, x - MENU_W); // flip left near the edge
    if (y + 260 > r.height) y = Math.max(4, y - 260); // flip up
    setMenu({ x, y, kb });
  };
  const close = () => {
    setMenu(null);
    card.current?.focus();
  };

  useEffect(() => {
    if (!menu || mode === 'preview') return;
    const down = (e: MouseEvent) =>
      !(e.target as HTMLElement).closest('[role=menu]') && setMenu(null);
    document.addEventListener('mousedown', down);
    return () => document.removeEventListener('mousedown', down);
  }, [menu, mode]);

  return (
    <div
      ref={area}
      className="relative flex h-full flex-col items-center justify-center gap-3 overflow-hidden p-6"
    >
      <style>{`@keyframes demo-menu-in{from{opacity:0;transform:scale(.96)}}`}</style>
      <div
        ref={card}
        tabIndex={0}
        aria-haspopup="menu"
        onContextMenu={(e: ReactMouseEvent) => {
          e.preventDefault();
          openAt(e.clientX, e.clientY, false);
        }}
        onPointerDown={(e: PointerEvent) => {
          if (e.pointerType !== 'touch') return;
          const { clientX, clientY } = e;
          press.current = setTimeout(() => openAt(clientX, clientY, false), 500);
        }}
        onPointerUp={() => clearTimeout(press.current)}
        onPointerLeave={() => clearTimeout(press.current)}
        onKeyDown={(e) => {
          if (e.key === 'ContextMenu' || (e.shiftKey && e.key === 'F10')) {
            e.preventDefault();
            const r = e.currentTarget.getBoundingClientRect();
            openAt(r.left + 24, r.bottom - 8, true);
          }
        }}
        className="flex w-56 items-center gap-3 rounded-2xl border border-line bg-surface p-4 select-none focus-visible:ring-2 focus-visible:ring-accent"
      >
        <span className="flex size-10 items-center justify-center rounded-xl bg-accent-soft text-accent">
          <FileText className="size-5" aria-hidden />
        </span>
        <span>
          <span className="block font-medium">Roadmap.pdf</span>
          <span className="text-xs text-muted">2.4 MB</span>
        </span>
      </div>
      <p className="text-sm text-muted">Right-click (or long-press) the file</p>
      <p className="h-5 text-sm" aria-live="polite">
        {last && `Selected: ${last}`}
      </p>
      {menu && (
        <Menu
          items={ITEMS}
          autoFocus={mode === 'full'}
          onPick={(l) => {
            setLast(l);
            close();
          }}
          onClose={close}
          style={{ left: menu.x, top: menu.y }}
        />
      )}
    </div>
  );
}
