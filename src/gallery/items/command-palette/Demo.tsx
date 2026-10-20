import {
  FilePlus,
  FolderOpen,
  House,
  Moon,
  Search,
  Settings,
  Sun,
  UserPlus,
  type LucideIcon,
} from 'lucide-react';
import { useEffect, useId, useMemo, useRef, useState, type KeyboardEvent } from 'react';
import type { DemoProps } from '../../types';

interface Command {
  id: string;
  group: string;
  label: string;
  icon: LucideIcon;
  shortcut?: string;
}

const COMMANDS: Command[] = [
  { id: 'home', group: 'Navigation', label: 'Go to Dashboard', icon: House, shortcut: 'G D' },
  {
    id: 'projects',
    group: 'Navigation',
    label: 'Go to Projects',
    icon: FolderOpen,
    shortcut: 'G P',
  },
  { id: 'settings', group: 'Navigation', label: 'Open Settings', icon: Settings, shortcut: '⌘ ,' },
  { id: 'new', group: 'Actions', label: 'Create new file', icon: FilePlus, shortcut: '⌘ N' },
  { id: 'invite', group: 'Actions', label: 'Invite teammate', icon: UserPlus },
  { id: 'light', group: 'Theme', label: 'Switch to light theme', icon: Sun },
  { id: 'dark', group: 'Theme', label: 'Switch to dark theme', icon: Moon },
];

/** Every character of the query must appear in order (simple fuzzy match). */
const fuzzy = (text: string, q: string) => {
  let i = 0;
  for (const ch of text.toLowerCase()) if (ch === q[i]) i++;
  return i === q.length;
};

export default function Demo({ mode }: DemoProps) {
  const [open, setOpen] = useState(mode === 'preview');
  const [query, setQuery] = useState('');
  const [active, setActive] = useState(0);
  const [recent, setRecent] = useState<string[]>([]);
  const [last, setLast] = useState('');
  const listRef = useRef<HTMLUListElement>(null);
  const id = useId();

  useEffect(() => {
    if (mode === 'preview') return; // Thumbnails must not react to the global shortcut.
    const onKey = (e: globalThis.KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setOpen((o) => !o);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [mode]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    const matched = COMMANDS.filter((c) => fuzzy(c.label, q));
    if (q) return matched;
    const rec = recent.map((r) => ({ ...COMMANDS.find((c) => c.id === r)!, group: 'Recent' }));
    return [...rec, ...matched.filter((c) => !recent.includes(c.id))];
  }, [query, recent]);

  useEffect(() => {
    listRef.current?.querySelector('[aria-selected="true"]')?.scrollIntoView({ block: 'nearest' });
  }, [active]);

  const run = (c: Command) => {
    setLast(c.label);
    setRecent((r) => [c.id, ...r.filter((x) => x !== c.id)].slice(0, 3));
    setOpen(false);
    setQuery('');
    setActive(0);
  };

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActive((a) => Math.min(a + 1, results.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActive((a) => Math.max(a - 1, 0));
    } else if (e.key === 'Enter' && results[active]) run(results[active]);
    else if (e.key === 'Escape') setOpen(false);
  };

  return (
    <div className="relative flex h-full flex-col items-center gap-3 p-6 pt-[12%]">
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="flex w-full max-w-xs items-center gap-2 rounded-xl border border-line bg-surface px-3 py-2 text-sm text-muted hover:bg-surface-2"
      >
        <Search className="size-4" aria-hidden /> Search…
        <kbd className="ml-auto rounded border border-line px-1.5 font-sans text-xs">⌘K</kbd>
      </button>
      <p className="h-5 text-sm text-muted" aria-live="polite">
        {last && `Ran: ${last}`}
      </p>

      {open && (
        <div
          className="absolute inset-0 z-10 flex items-start justify-center bg-black/40 p-4 pt-[8%] backdrop-blur-sm"
          onMouseDown={() => setOpen(false)}
        >
          <div
            role="dialog"
            aria-label="Command palette"
            onMouseDown={(e) => e.stopPropagation()}
            className="w-full max-w-md overflow-hidden rounded-2xl border border-line bg-surface shadow-2xl"
            style={{ animation: 'demo-cmd-in 150ms ease-out' }}
          >
            <style>{`@keyframes demo-cmd-in{from{opacity:0;transform:scale(.97)}}`}</style>
            <div className="flex items-center gap-2 border-b border-line px-3">
              <Search className="size-4 text-muted" aria-hidden />
              <input
                autoFocus={mode === 'full'}
                role="combobox"
                aria-expanded="true"
                aria-controls={`${id}-list`}
                aria-activedescendant={results[active] ? `${id}-${active}` : undefined}
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setActive(0);
                }}
                onKeyDown={onKeyDown}
                placeholder="Type a command or search…"
                className="h-12 flex-1 bg-transparent text-sm outline-none placeholder:text-muted"
              />
              <kbd className="rounded border border-line px-1.5 text-xs text-muted">Esc</kbd>
            </div>
            <ul
              ref={listRef}
              id={`${id}-list`}
              role="listbox"
              className="max-h-64 overflow-y-auto p-1.5"
            >
              {results.length === 0 && (
                <li className="px-3 py-6 text-center text-sm text-muted">No results</li>
              )}
              {results.map((c, i) => {
                const header = i === 0 || results[i - 1].group !== c.group ? c.group : null;
                const Icon = c.icon;
                return (
                  <li key={`${c.group}-${c.id}`} role="presentation">
                    {header && (
                      <p className="px-2.5 pt-2 pb-1 text-xs font-medium text-muted">{header}</p>
                    )}
                    <div
                      id={`${id}-${i}`}
                      role="option"
                      aria-selected={i === active}
                      onMouseEnter={() => setActive(i)}
                      onClick={() => run(c)}
                      className={`flex cursor-pointer items-center gap-3 rounded-lg px-2.5 py-2 text-sm ${i === active ? 'bg-accent-soft' : ''}`}
                    >
                      <Icon className="size-4 text-muted" aria-hidden />
                      <span className="flex-1">{c.label}</span>
                      {c.shortcut && <kbd className="text-xs text-muted">{c.shortcut}</kbd>}
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
