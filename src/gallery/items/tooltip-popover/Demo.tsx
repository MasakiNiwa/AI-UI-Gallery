import { Bold, Copy, Italic, Link2, Share2, Underline, type LucideIcon } from 'lucide-react';
import { useEffect, useId, useRef, useState, type ReactNode } from 'react';
import type { DemoProps } from '../../types';

type Side = 'top' | 'bottom' | 'left' | 'right';

const POS: Record<Side, string> = {
  top: 'bottom-full left-1/2 mb-2 -translate-x-1/2',
  bottom: 'top-full left-1/2 mt-2 -translate-x-1/2',
  left: 'right-full top-1/2 mr-2 -translate-y-1/2',
  right: 'left-full top-1/2 ml-2 -translate-y-1/2',
};
const ARROW: Record<Side, string> = {
  top: 'top-full left-1/2 -translate-x-1/2 -mt-1',
  bottom: 'bottom-full left-1/2 -translate-x-1/2 -mb-1',
  left: 'left-full top-1/2 -translate-y-1/2 -ml-1',
  right: 'right-full top-1/2 -translate-y-1/2 -mr-1',
};

function Tooltip({
  label,
  side = 'top',
  children,
}: {
  label: string;
  side?: Side;
  children: (describedBy: string) => ReactNode;
}) {
  const [show, setShow] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);
  const id = useId();
  const hide = () => {
    clearTimeout(timer.current);
    setShow(false);
  };
  const delayedShow = () => {
    timer.current = setTimeout(() => setShow(true), 300);
  };
  // Handlers sit on the wrapper; focus/blur bubble from the trigger in React.
  return (
    <span
      className="relative inline-flex"
      onMouseEnter={delayedShow}
      onMouseLeave={hide}
      onFocus={() => setShow(true)}
      onBlur={hide}
      onKeyDown={(e) => e.key === 'Escape' && hide()}
    >
      {children(id)}
      <span
        role="tooltip"
        id={id}
        className={`pointer-events-none absolute z-10 rounded-md bg-slate-900 px-2 py-1 text-xs whitespace-nowrap text-white shadow transition-all duration-150 dark:bg-slate-100 dark:text-slate-900 ${POS[side]} ${show ? 'scale-100 opacity-100' : 'scale-90 opacity-0'}`}
      >
        {label}
        <span className={`absolute size-2 rotate-45 bg-inherit ${ARROW[side]}`} />
      </span>
    </span>
  );
}

const TOOLS: { icon: LucideIcon; label: string; side: Side }[] = [
  { icon: Bold, label: 'Bold (⌘B)', side: 'top' },
  { icon: Italic, label: 'Italic (⌘I)', side: 'bottom' },
  { icon: Underline, label: 'Underline (⌘U)', side: 'left' },
  { icon: Link2, label: 'Insert link', side: 'right' },
];

export default function Demo({ mode }: DemoProps) {
  const [open, setOpen] = useState(mode === 'preview');
  const [copied, setCopied] = useState(false);
  const trigger = useRef<HTMLButtonElement>(null);
  const panel = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open || mode === 'preview') return;
    const onDown = (e: MouseEvent) => {
      if (
        !panel.current?.contains(e.target as Node) &&
        !trigger.current?.contains(e.target as Node)
      )
        setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
        trigger.current?.focus();
      }
    };
    document.addEventListener('mousedown', onDown);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDown);
      document.removeEventListener('keydown', onKey);
    };
  }, [open, mode]);

  return (
    <div className="flex h-full flex-col items-center justify-center gap-12 p-6">
      <div className="flex gap-1 rounded-xl border border-line bg-surface p-1">
        {TOOLS.map(({ icon: Icon, label, side }) => (
          <Tooltip key={label} label={label} side={side}>
            {(describedBy) => (
              <button
                type="button"
                aria-label={label.split(' (')[0]}
                className="flex size-10 items-center justify-center rounded-lg hover:bg-surface-2"
                aria-describedby={describedBy}
              >
                <Icon className="size-4" />
              </button>
            )}
          </Tooltip>
        ))}
      </div>
      <div className="relative">
        <button
          ref={trigger}
          type="button"
          aria-expanded={open}
          aria-haspopup="dialog"
          onClick={() => setOpen((o) => !o)}
          className="inline-flex items-center gap-2 rounded-xl bg-accent px-4 py-2 text-sm font-medium text-accent-contrast"
        >
          <Share2 className="size-4" aria-hidden /> Share
        </button>
        {open && (
          <div
            ref={panel}
            role="dialog"
            aria-label="Share"
            className="absolute bottom-full left-1/2 z-10 mb-3 w-64 -translate-x-1/2 origin-bottom rounded-xl border border-line bg-surface p-4 shadow-xl"
            style={{ animation: 'demo-pop-in 150ms ease-out' }}
          >
            <style>{`@keyframes demo-pop-in{from{opacity:0;transform:translateX(-50%) scale(.95)}}`}</style>
            <p className="font-medium">Share this design</p>
            <p className="mt-1 text-xs text-muted">Anyone with the link can view.</p>
            <div className="mt-3 flex gap-2">
              <input
                readOnly
                value="ai-ui.dev/d/42"
                className="min-w-0 flex-1 rounded-lg border border-line bg-surface-2 px-2 text-xs"
              />
              <button
                type="button"
                onClick={() => setCopied(true)}
                className="inline-flex items-center gap-1 rounded-lg border border-line px-2 py-1.5 text-xs hover:bg-surface-2"
              >
                <Copy className="size-3.5" aria-hidden /> {copied ? 'Copied' : 'Copy'}
              </button>
            </div>
            <span className="absolute top-full left-1/2 -mt-1.5 size-3 -translate-x-1/2 rotate-45 border-r border-b border-line bg-surface" />
          </div>
        )}
      </div>
    </div>
  );
}
