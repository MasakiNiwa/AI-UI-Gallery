import { X } from 'lucide-react';
import { useId, useRef, useState, type KeyboardEvent } from 'react';

const OPTIONS = [
  'React',
  'Vue',
  'Svelte',
  'Angular',
  'Solid',
  'TypeScript',
  'JavaScript',
  'Tailwind CSS',
  'Vite',
  'Next.js',
  'Nuxt',
  'Astro',
  'Node.js',
  'Deno',
  'Three.js',
  'WebGL',
  'WebGPU',
];
const MAX = 8;

function Highlight({ text, query }: { text: string; query: string }) {
  const i = text.toLowerCase().indexOf(query.toLowerCase());
  if (!query || i < 0) return <>{text}</>;
  return (
    <>
      {text.slice(0, i)}
      <mark className="rounded bg-accent-soft text-fg">{text.slice(i, i + query.length)}</mark>
      {text.slice(i + query.length)}
    </>
  );
}

export default function Demo() {
  const [tags, setTags] = useState<string[]>(['React', 'TypeScript']);
  const [text, setText] = useState('');
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const id = useId();

  const suggestions = OPTIONS.filter(
    (o) => !tags.includes(o) && o.toLowerCase().includes(text.trim().toLowerCase()),
  ).slice(0, 6);
  const expanded = open && suggestions.length > 0 && tags.length < MAX;

  const add = (value: string) => {
    const v = value.trim();
    if (v && !tags.some((t) => t.toLowerCase() === v.toLowerCase()) && tags.length < MAX) {
      setTags([...tags, v]);
    }
    setText('');
    setActive(0);
  };

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      add(expanded ? suggestions[active] : text);
    } else if (e.key === 'Backspace' && !text && tags.length) {
      setTags(tags.slice(0, -1));
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      setOpen(true);
      setActive((a) => Math.min(a + 1, suggestions.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActive((a) => Math.max(a - 1, 0));
    } else if (e.key === 'Escape') setOpen(false);
  };

  return (
    <div className="flex h-full items-start justify-center p-6 pt-[15%]">
      <div className="relative w-full max-w-md">
        <label htmlFor={id} className="mb-1.5 flex justify-between text-sm font-medium">
          Tech stack{' '}
          <span className="font-normal text-muted">
            {tags.length}/{MAX}
          </span>
        </label>
        <div
          onClick={() => inputRef.current?.focus()}
          className="flex min-h-12 flex-wrap items-center gap-1.5 rounded-xl border border-line bg-surface p-2 focus-within:border-accent"
        >
          {tags.map((t) => (
            <span
              key={t}
              className="inline-flex items-center gap-1 rounded-lg bg-accent-soft py-1 pr-1 pl-2.5 text-sm"
            >
              {t}
              <button
                type="button"
                aria-label={`Remove ${t}`}
                onClick={() => setTags(tags.filter((x) => x !== t))}
                className="rounded p-0.5 text-muted hover:bg-surface hover:text-fg"
              >
                <X className="size-3.5" />
              </button>
            </span>
          ))}
          <input
            ref={inputRef}
            id={id}
            role="combobox"
            aria-expanded={expanded}
            aria-controls={`${id}-list`}
            aria-activedescendant={expanded ? `${id}-opt-${active}` : undefined}
            value={text}
            onChange={(e) => {
              setText(e.target.value);
              setOpen(true);
              setActive(0);
            }}
            onFocus={() => setOpen(true)}
            onBlur={() => setTimeout(() => setOpen(false), 120)}
            onKeyDown={onKeyDown}
            placeholder={tags.length < MAX ? 'Add a technology…' : 'Limit reached'}
            disabled={tags.length >= MAX}
            className="min-w-24 flex-1 bg-transparent px-1 py-1 text-sm outline-none placeholder:text-muted"
          />
        </div>
        {expanded && (
          <ul
            id={`${id}-list`}
            role="listbox"
            className="absolute inset-x-0 top-full z-10 mt-1 overflow-hidden rounded-xl border border-line bg-surface py-1 shadow-lg"
          >
            {suggestions.map((s, i) => (
              <li
                key={s}
                id={`${id}-opt-${i}`}
                role="option"
                aria-selected={i === active}
                onMouseDown={(e) => {
                  e.preventDefault();
                  add(s);
                }}
                onMouseEnter={() => setActive(i)}
                className={`cursor-pointer px-3 py-2 text-sm ${i === active ? 'bg-surface-2' : ''}`}
              >
                <Highlight text={s} query={text.trim()} />
              </li>
            ))}
          </ul>
        )}
        <p className="mt-2 text-xs text-muted">Press Enter or comma to add · Backspace to remove</p>
      </div>
    </div>
  );
}
