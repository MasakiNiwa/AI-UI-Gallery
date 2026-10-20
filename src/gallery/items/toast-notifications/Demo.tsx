import { CircleAlert, CircleCheck, Info, TriangleAlert, X, type LucideIcon } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import type { DemoProps } from '../../types';

type Kind = 'success' | 'error' | 'info' | 'warning';

const KINDS: Record<Kind, { icon: LucideIcon; color: string; title: string; msg: string }> = {
  success: {
    icon: CircleCheck,
    color: 'text-emerald-500 bg-emerald-500',
    title: 'Saved',
    msg: 'Your changes have been saved.',
  },
  error: {
    icon: CircleAlert,
    color: 'text-rose-500 bg-rose-500',
    title: 'Upload failed',
    msg: 'Check your connection and try again.',
  },
  info: {
    icon: Info,
    color: 'text-sky-500 bg-sky-500',
    title: 'New version',
    msg: 'A new version is available.',
  },
  warning: {
    icon: TriangleAlert,
    color: 'text-amber-500 bg-amber-500',
    title: 'Storage almost full',
    msg: '92% of your storage is used.',
  },
};

const DURATION = 4000;
let nextId = 0;

interface Toast {
  id: number;
  kind: Kind;
}

function ToastItem({
  toast,
  onClose,
  persistent,
}: {
  toast: Toast;
  onClose: () => void;
  persistent: boolean;
}) {
  const [hovered, setPaused] = useState(false);
  const paused = hovered || persistent;
  const remaining = useRef(DURATION);
  const { icon: Icon, color, title, msg } = KINDS[toast.kind];
  const [text, bar] = color.split(' ');

  useEffect(() => {
    if (paused) return;
    const start = Date.now();
    const id = setTimeout(onClose, remaining.current);
    return () => {
      clearTimeout(id);
      remaining.current -= Date.now() - start;
    };
  }, [paused, onClose]);

  return (
    <li
      role={toast.kind === 'error' ? 'alert' : 'status'}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      className="relative w-72 overflow-hidden rounded-xl border border-line bg-surface shadow-lg"
      style={{ animation: 'demo-toast-in 250ms ease-out' }}
    >
      <div className="flex gap-3 p-3.5">
        <Icon className={`mt-0.5 size-5 shrink-0 ${text}`} aria-hidden />
        <div className="flex-1 text-sm">
          <p className="font-medium">{title}</p>
          <p className="text-muted">{msg}</p>
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="h-fit text-muted hover:text-fg"
        >
          <X className="size-4" />
        </button>
      </div>
      <span
        className={`absolute bottom-0 left-0 h-0.5 w-full origin-left ${bar}`}
        style={{
          animation: `demo-toast-bar ${DURATION}ms linear forwards`,
          animationPlayState: paused ? 'paused' : 'running',
        }}
      />
    </li>
  );
}

export default function Demo({ mode }: DemoProps) {
  const [toasts, setToasts] = useState<Toast[]>(
    mode === 'preview'
      ? [
          { id: -2, kind: 'info' },
          { id: -1, kind: 'success' },
        ]
      : [],
  );
  const push = (kind: Kind) => setToasts((t) => [{ id: nextId++, kind }, ...t].slice(0, 4));

  return (
    <div className="relative flex h-full flex-col items-center justify-center gap-3 overflow-hidden p-6">
      <style>{`
        @keyframes demo-toast-in{from{opacity:0;transform:translateY(12px) scale(.97)}}
        @keyframes demo-toast-bar{to{transform:scaleX(0)}}
      `}</style>
      <p className="text-sm text-muted">Trigger a notification:</p>
      <div className="grid grid-cols-2 gap-2">
        {(Object.keys(KINDS) as Kind[]).map((k) => (
          <button
            key={k}
            type="button"
            onClick={() => push(k)}
            className="rounded-xl border border-line bg-surface px-4 py-2 text-sm font-medium capitalize hover:bg-surface-2"
          >
            {k}
          </button>
        ))}
      </div>
      <ol className="absolute right-4 bottom-4 flex flex-col gap-2" aria-live="polite">
        {toasts.map((t) => (
          <ToastItem
            key={t.id}
            toast={t}
            persistent={t.id < 0}
            onClose={() => setToasts((list) => list.filter((x) => x.id !== t.id))}
          />
        ))}
      </ol>
    </div>
  );
}
