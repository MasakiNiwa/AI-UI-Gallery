import { useId, useRef, useState, type KeyboardEvent } from 'react';

const PEOPLE = [
  { name: 'Mina', role: 'Designer' },
  { name: 'Leo', role: 'Engineer' },
  { name: 'Hana', role: 'Engineer' },
  { name: 'Sam', role: 'Product' },
  { name: 'Yuki', role: 'QA' },
  { name: 'Aki', role: 'Marketing' },
];

/** Renders "@Name" tokens of known people as highlighted chips. */
function RichText({ text }: { text: string }) {
  const names = PEOPLE.map((p) => p.name).join('|');
  return (
    <>
      {text.split(new RegExp(`(@(?:${names})\\b)`)).map((part, i) =>
        part.startsWith('@') && PEOPLE.some((p) => `@${p.name}` === part) ? (
          <span key={i} className="rounded bg-accent-soft px-1 font-medium text-accent">
            {part}
          </span>
        ) : (
          part
        ),
      )}
    </>
  );
}

export default function Demo() {
  const [text, setText] = useState('');
  const [caret, setCaret] = useState(0);
  const [active, setActive] = useState(0);
  const [dismissed, setDismissed] = useState(false);
  const [comments, setComments] = useState(['Looks great @Mina, can @Leo review the code?']);
  const ref = useRef<HTMLTextAreaElement>(null);
  const id = useId();

  const match = /@(\w*)$/.exec(text.slice(0, caret));
  const query = match?.[1].toLowerCase() ?? '';
  const options = match ? PEOPLE.filter((p) => p.name.toLowerCase().startsWith(query)) : [];
  const open = !!match && !dismissed && options.length > 0;

  const insert = (name: string) => {
    if (!match) return;
    const start = caret - match[0].length;
    const next = `${text.slice(0, start)}@${name} ${text.slice(caret)}`;
    const pos = start + name.length + 2;
    setText(next);
    setCaret(pos);
    requestAnimationFrame(() => {
      ref.current?.focus();
      ref.current?.setSelectionRange(pos, pos);
    });
  };

  const onKeyDown = (e: KeyboardEvent) => {
    if (!open) return;
    if (e.key === 'ArrowDown') setActive((a) => (a + 1) % options.length);
    else if (e.key === 'ArrowUp') setActive((a) => (a - 1 + options.length) % options.length);
    else if (e.key === 'Enter' || e.key === 'Tab')
      insert(options[Math.min(active, options.length - 1)].name);
    else if (e.key === 'Escape') setDismissed(true);
    else return;
    e.preventDefault();
  };

  return (
    <div className="flex h-full justify-center overflow-auto p-4">
      <div className="w-full max-w-md space-y-3">
        <ul className="space-y-2">
          {comments.map((c, i) => (
            <li key={i} className="rounded-xl border border-line bg-surface p-3 text-sm">
              <b>You</b> <span className="text-xs text-muted">just now</span>
              <p className="mt-1">
                <RichText text={c} />
              </p>
            </li>
          ))}
        </ul>
        <div className="relative">
          <textarea
            ref={ref}
            value={text}
            rows={3}
            role="combobox"
            aria-expanded={open}
            aria-controls={`${id}-list`}
            aria-activedescendant={open ? `${id}-${active}` : undefined}
            aria-label="Comment"
            placeholder="Write a comment… type @ to mention someone"
            onChange={(e) => {
              setText(e.target.value);
              setCaret(e.target.selectionStart);
              setDismissed(false);
              setActive(0);
            }}
            onSelect={(e) => setCaret(e.currentTarget.selectionStart)}
            onKeyDown={onKeyDown}
            className="w-full resize-none rounded-xl border border-line bg-surface p-3 text-sm outline-none focus:border-accent"
          />
          {open && (
            <ul
              id={`${id}-list`}
              role="listbox"
              className="absolute top-full left-0 z-10 mt-1 w-56 overflow-hidden rounded-xl border border-line bg-surface py-1 shadow-xl"
            >
              {options.map((p, i) => (
                <li
                  key={p.name}
                  id={`${id}-${i}`}
                  role="option"
                  aria-selected={i === active}
                  onMouseDown={(e) => {
                    e.preventDefault();
                    insert(p.name);
                  }}
                  onMouseEnter={() => setActive(i)}
                  className={`flex cursor-pointer items-center gap-2 px-3 py-1.5 text-sm ${i === active ? 'bg-accent-soft' : ''}`}
                >
                  <span className="flex size-6 items-center justify-center rounded-full bg-surface-2 text-xs font-semibold">
                    {p.name[0]}
                  </span>
                  <span className="flex-1">{p.name}</span>
                  <span className="text-xs text-muted">{p.role}</span>
                </li>
              ))}
            </ul>
          )}
          <div className="mt-2 flex justify-end">
            <button
              type="button"
              disabled={!text.trim()}
              onClick={() => {
                setComments((c) => [...c, text.trim()]);
                setText('');
                setCaret(0);
              }}
              className="rounded-xl bg-accent px-4 py-1.5 text-sm font-medium text-accent-contrast disabled:opacity-40"
            >
              Post
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
