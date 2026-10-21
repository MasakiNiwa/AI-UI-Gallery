import { Check, ChevronsUpDown, Search } from 'lucide-react';
import { useEffect, useId, useMemo, useRef, useState, type KeyboardEvent } from 'react';
import type { DemoProps } from '../../types';

const COUNTRIES = [
  { code: 'JP', name: 'Japan', flag: '🇯🇵', region: 'Asia' },
  { code: 'KR', name: 'South Korea', flag: '🇰🇷', region: 'Asia' },
  { code: 'SG', name: 'Singapore', flag: '🇸🇬', region: 'Asia' },
  { code: 'IN', name: 'India', flag: '🇮🇳', region: 'Asia' },
  { code: 'FR', name: 'France', flag: '🇫🇷', region: 'Europe' },
  { code: 'DE', name: 'Germany', flag: '🇩🇪', region: 'Europe' },
  { code: 'SE', name: 'Sweden', flag: '🇸🇪', region: 'Europe' },
  { code: 'ES', name: 'Spain', flag: '🇪🇸', region: 'Europe' },
  { code: 'US', name: 'United States', flag: '🇺🇸', region: 'Americas' },
  { code: 'CA', name: 'Canada', flag: '🇨🇦', region: 'Americas' },
  { code: 'BR', name: 'Brazil', flag: '🇧🇷', region: 'Americas' },
  { code: 'AU', name: 'Australia', flag: '🇦🇺', region: 'Oceania' },
];

function Mark({ text, q }: { text: string; q: string }) {
  const i = q ? text.toLowerCase().indexOf(q) : -1;
  if (i < 0) return <>{text}</>;
  return (
    <>
      {text.slice(0, i)}
      <mark className="rounded bg-amber-300/50 text-inherit">{text.slice(i, i + q.length)}</mark>
      {text.slice(i + q.length)}
    </>
  );
}

export default function Demo({ mode }: DemoProps) {
  const [value, setValue] = useState('JP');
  const [open, setOpen] = useState(mode === 'preview');
  const [query, setQuery] = useState('');
  const [active, setActive] = useState(0);
  const trigger = useRef<HTMLButtonElement>(null);
  const box = useRef<HTMLDivElement>(null);
  const list = useRef<HTMLUListElement>(null);
  const id = useId();
  const q = query.trim().toLowerCase();
  const options = useMemo(
    () =>
      COUNTRIES.filter((c) => !q || c.name.toLowerCase().includes(q) || c.code.toLowerCase() === q),
    [q],
  );
  const selected = COUNTRIES.find((c) => c.code === value)!;

  useEffect(() => {
    if (!open || mode === 'preview') return;
    const down = (e: MouseEvent) => !box.current?.contains(e.target as Node) && setOpen(false);
    document.addEventListener('mousedown', down);
    return () => document.removeEventListener('mousedown', down);
  }, [open, mode]);

  useEffect(() => {
    // Scroll only the list (scrollIntoView would also scroll the page around the demo).
    const ul = list.current;
    const el = ul?.querySelector<HTMLElement>('[data-active="true"]');
    if (!ul || !el) return;
    const header = 28;
    if (el.offsetTop - header < ul.scrollTop) ul.scrollTop = el.offsetTop - header;
    else if (el.offsetTop + el.offsetHeight > ul.scrollTop + ul.clientHeight)
      ul.scrollTop = el.offsetTop + el.offsetHeight - ul.clientHeight;
  }, [active, open]);

  const choose = (code: string) => {
    setValue(code);
    setOpen(false);
    setQuery('');
    trigger.current?.focus();
  };

  const onKey = (e: KeyboardEvent) => {
    const last = options.length - 1;
    if (e.key === 'ArrowDown') setActive((a) => Math.min(a + 1, last));
    else if (e.key === 'ArrowUp') setActive((a) => Math.max(a - 1, 0));
    else if (e.key === 'Home') setActive(0);
    else if (e.key === 'End') setActive(last);
    else if (e.key === 'Enter' && options[active]) choose(options[active].code);
    else if (e.key === 'Escape') {
      setOpen(false);
      trigger.current?.focus();
    } else return;
    e.preventDefault();
  };

  return (
    <div className="flex h-full justify-center p-6 pt-[12%]">
      <div ref={box} className="relative h-fit w-full max-w-xs">
        <label className="mb-1.5 block text-sm font-medium" htmlFor={`${id}-trigger`}>
          Country
        </label>
        <button
          ref={trigger}
          id={`${id}-trigger`}
          type="button"
          aria-haspopup="listbox"
          aria-expanded={open}
          onClick={() => {
            setOpen((o) => !o);
            setActive(
              Math.max(
                0,
                options.findIndex((o) => o.code === value),
              ),
            );
          }}
          className="flex h-11 w-full items-center gap-2 rounded-xl border border-line bg-surface px-3 text-left text-sm focus-visible:border-accent"
        >
          <span className="text-lg">{selected.flag}</span>
          <span className="flex-1">{selected.name}</span>
          <ChevronsUpDown className="size-4 text-muted" aria-hidden />
        </button>
        {open && (
          <div className="absolute inset-x-0 top-full z-10 mt-1 overflow-hidden rounded-xl border border-line bg-surface shadow-xl">
            <div className="flex items-center gap-2 border-b border-line px-3">
              <Search className="size-4 text-muted" aria-hidden />
              <input
                autoFocus={mode === 'full'}
                role="combobox"
                aria-expanded="true"
                aria-controls={`${id}-list`}
                aria-activedescendant={
                  options[active] ? `${id}-${options[active].code}` : undefined
                }
                aria-label="Search countries"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setActive(0);
                }}
                onKeyDown={onKey}
                placeholder="Search…"
                className="h-10 flex-1 bg-transparent text-sm outline-none placeholder:text-muted"
              />
            </div>
            <ul
              ref={list}
              id={`${id}-list`}
              role="listbox"
              className="relative max-h-56 overflow-y-auto py-1 text-sm"
            >
              {options.length === 0 && (
                <li className="px-3 py-6 text-center text-muted">No countries found</li>
              )}
              {options.map((c, i) => {
                const header = i === 0 || options[i - 1].region !== c.region ? c.region : null;
                return (
                  <li key={c.code} role="presentation">
                    {header && (
                      <p className="sticky top-0 bg-surface/95 px-3 py-1 text-xs font-semibold text-muted backdrop-blur">
                        {header}
                      </p>
                    )}
                    <div
                      id={`${id}-${c.code}`}
                      role="option"
                      aria-selected={c.code === value}
                      data-active={i === active}
                      onMouseEnter={() => setActive(i)}
                      onClick={() => choose(c.code)}
                      className={`mx-1 flex cursor-pointer items-center gap-2 rounded-lg px-2 py-1.5 ${i === active ? 'bg-accent-soft' : ''}`}
                    >
                      <span className="text-base">{c.flag}</span>
                      <span className="flex-1">
                        <Mark text={c.name} q={q} />
                      </span>
                      <span className="text-xs text-muted">{c.code}</span>
                      <Check
                        className={`size-4 text-accent ${c.code === value ? '' : 'invisible'}`}
                        aria-hidden
                      />
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
