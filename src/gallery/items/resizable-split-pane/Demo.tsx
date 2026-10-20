import { File, Folder, PanelLeftClose, PanelLeftOpen } from 'lucide-react';
import { useRef, useState, type KeyboardEvent, type PointerEvent } from 'react';

const DEFAULT = [22, 43, 35];
const MIN = 12;

export default function Demo() {
  const [sizes, setSizes] = useState(DEFAULT);
  const [collapsed, setCollapsed] = useState(false);
  const [dragging, setDragging] = useState<number | null>(null);
  const box = useRef<HTMLDivElement>(null);

  const shown = collapsed
    ? [
        0,
        sizes[1] + sizes[0] * (sizes[1] / (sizes[1] + sizes[2])),
        sizes[2] + sizes[0] * (sizes[2] / (sizes[1] + sizes[2])),
      ]
    : sizes;

  /** Moves the divider between panel i and i+1 by delta percent. */
  const shift = (i: number, delta: number) =>
    setSizes((s) => {
      const a = Math.max(MIN, Math.min(s[i] + s[i + 1] - MIN, s[i] + delta));
      const next = [...s];
      next[i + 1] = s[i] + s[i + 1] - a;
      next[i] = a;
      return next;
    });

  const onMove = (i: number) => (e: PointerEvent<HTMLDivElement>) => {
    if (dragging !== i || !box.current) return;
    const r = box.current.getBoundingClientRect();
    const pct = ((e.clientX - r.left) / r.width) * 100;
    const left = shown.slice(0, i + 1).reduce((a, b) => a + b, 0);
    shift(i, pct - left);
  };

  const onKey = (i: number) => (e: KeyboardEvent) => {
    if (e.key === 'ArrowLeft') shift(i, -2);
    if (e.key === 'ArrowRight') shift(i, 2);
  };

  const handle = (i: number) => (
    <div
      role="separator"
      aria-orientation="vertical"
      aria-valuenow={Math.round(shown[i])}
      aria-label={i === 0 ? 'Resize sidebar' : 'Resize preview'}
      tabIndex={0}
      onPointerDown={(e) => {
        e.currentTarget.setPointerCapture(e.pointerId);
        setDragging(i);
      }}
      onPointerMove={onMove(i)}
      onPointerUp={() => setDragging(null)}
      onDoubleClick={() => setSizes(DEFAULT)}
      onKeyDown={onKey(i)}
      className="group relative z-10 -mx-1 w-2 shrink-0 cursor-col-resize touch-none"
    >
      <span
        className={`absolute inset-y-0 left-1/2 w-px -translate-x-1/2 transition-all group-hover:w-1 group-hover:bg-accent group-focus-visible:w-1 group-focus-visible:bg-accent ${dragging === i ? 'w-1 bg-accent' : 'bg-line'}`}
      />
    </div>
  );

  return (
    <div
      className={`flex h-full flex-col text-sm ${dragging !== null ? 'cursor-col-resize select-none' : ''}`}
    >
      <div className="flex h-10 items-center gap-2 border-b border-line bg-surface px-2">
        <button
          type="button"
          onClick={() => setCollapsed((c) => !c)}
          aria-label={collapsed ? 'Show sidebar' : 'Hide sidebar'}
          className="rounded-md p-1.5 text-muted hover:bg-surface-2"
        >
          {collapsed ? <PanelLeftOpen className="size-4" /> : <PanelLeftClose className="size-4" />}
        </button>
        <span className="text-xs text-muted">Drag the dividers · double-click to reset</span>
      </div>
      <div ref={box} className="flex min-h-0 flex-1">
        {!collapsed && (
          <>
            <aside className="overflow-auto bg-surface p-2" style={{ width: `${shown[0]}%` }}>
              {['src', 'components', 'pages'].map((d) => (
                <p
                  key={d}
                  className="flex items-center gap-1.5 truncate rounded px-1.5 py-1 text-muted"
                >
                  <Folder className="size-3.5 shrink-0" aria-hidden />
                  {d}
                </p>
              ))}
              <p className="flex items-center gap-1.5 truncate rounded bg-accent-soft px-1.5 py-1">
                <File className="size-3.5 shrink-0" aria-hidden />
                App.tsx
              </p>
            </aside>
            {handle(0)}
          </>
        )}
        <section
          className="overflow-auto bg-bg p-3 font-mono text-xs leading-6"
          style={{ width: `${shown[1]}%` }}
        >
          <p>
            <span className="text-violet-500">export function</span>{' '}
            <span className="text-sky-500">App</span>() {'{'}
          </p>
          <p className="pl-4">
            <span className="text-violet-500">return</span> &lt;
            <span className="text-emerald-500">Hello</span> name=
            <span className="text-amber-500">"AI"</span> /&gt;;
          </p>
          <p>{'}'}</p>
        </section>
        {handle(1)}
        <section
          className="flex items-center justify-center overflow-auto bg-surface-2 p-3"
          style={{ width: `${shown[2]}%` }}
        >
          <div className="rounded-xl border border-line bg-surface px-4 py-3 text-center">
            Hello, AI 👋
          </div>
        </section>
      </div>
    </div>
  );
}
