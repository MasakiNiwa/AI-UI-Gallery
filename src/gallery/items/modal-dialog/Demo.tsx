import { Trash2, TriangleAlert } from 'lucide-react';
import { useRef, useState } from 'react';

export default function Demo() {
  const ref = useRef<HTMLDialogElement>(null);
  const [result, setResult] = useState<string | null>(null);

  const close = (value: string) => {
    ref.current?.close();
    setResult(value);
  };

  return (
    <div className="flex h-full flex-col items-center justify-center gap-4 p-6">
      <style>{`
        .demo-dialog[open] { animation: demo-dialog-in 200ms ease-out; }
        .demo-dialog::backdrop { background: rgb(0 0 0 / .45); backdrop-filter: blur(3px); }
        @keyframes demo-dialog-in { from { opacity: 0; transform: scale(.95); } }
        @media (max-width: 639px) {
          .demo-dialog { margin: auto 0 0; width: 100%; max-width: 100%; border-radius: 1.25rem 1.25rem 0 0; }
          @keyframes demo-dialog-in { from { transform: translateY(100%); } }
        }
      `}</style>
      <div className="w-full max-w-sm rounded-2xl border border-line bg-surface p-4">
        <p className="font-medium">my-awesome-project</p>
        <p className="text-sm text-muted">Updated 2 hours ago</p>
        <button
          type="button"
          onClick={() => {
            setResult(null);
            ref.current?.showModal();
          }}
          className="mt-3 inline-flex items-center gap-2 rounded-xl bg-danger-soft px-4 py-2 text-sm font-medium text-danger"
        >
          <Trash2 className="size-4" aria-hidden /> Delete
        </button>
      </div>
      <p className="h-5 text-sm text-muted" aria-live="polite">
        {result && `Result: ${result}`}
      </p>
      <dialog
        ref={ref}
        aria-labelledby="demo-dialog-title"
        onClick={(e) => e.target === ref.current && close('cancelled')}
        onCancel={() => setResult('cancelled')}
        className="demo-dialog m-auto w-[min(92vw,24rem)] rounded-2xl border border-line bg-surface p-0 text-fg shadow-2xl"
      >
        <div className="p-5">
          <div className="flex size-11 items-center justify-center rounded-full bg-danger-soft text-danger">
            <TriangleAlert className="size-5" aria-hidden />
          </div>
          <h2 id="demo-dialog-title" className="mt-3 text-lg font-semibold">
            Delete project?
          </h2>
          <p className="mt-1 text-sm text-muted">
            “my-awesome-project” and all of its files will be permanently deleted. This cannot be
            undone.
          </p>
          <div className="mt-5 flex justify-end gap-2">
            <button
              type="button"
              autoFocus
              onClick={() => close('cancelled')}
              className="rounded-xl border border-line px-4 py-2 text-sm font-medium hover:bg-surface-2"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={() => close('deleted')}
              className="rounded-xl bg-danger px-4 py-2 text-sm font-medium text-white"
            >
              Delete
            </button>
          </div>
        </div>
      </dialog>
    </div>
  );
}
