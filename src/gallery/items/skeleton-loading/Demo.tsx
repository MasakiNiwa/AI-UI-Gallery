import { RotateCcw } from 'lucide-react';
import { useEffect, useState } from 'react';
import type { DemoProps } from '../../types';

const POSTS = [
  {
    name: 'Mina Sato',
    text: 'Finally finished the new onboarding flow. Feedback welcome!',
    color: 'from-indigo-300 to-sky-300',
  },
  {
    name: 'Leo Martin',
    text: 'Coffee + refactoring on a rainy morning ☕',
    color: 'from-teal-300 to-emerald-300',
  },
];

const shimmer =
  'bg-[linear-gradient(90deg,var(--surface-3)_0%,var(--surface-2)_50%,var(--surface-3)_100%)] bg-[length:200%_100%] [animation:demo-shimmer_1.4s_linear_infinite]';

function Bone({ className }: { className: string }) {
  return <div className={`rounded-md ${shimmer} ${className}`} />;
}

export default function Demo({ mode }: DemoProps) {
  const [loading, setLoading] = useState(true);
  const [run, setRun] = useState(0);

  useEffect(() => {
    if (mode === 'preview') return; // Keep the skeleton visible in gallery thumbnails.
    const id = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(id);
  }, [run, mode]);

  return (
    <div className="flex h-full flex-col items-center justify-center gap-3 p-6">
      <style>{`@keyframes demo-shimmer{from{background-position:200% 0}to{background-position:-200% 0}}@keyframes demo-in{from{opacity:0}}`}</style>
      <ul aria-busy={loading} className="flex w-full max-w-sm flex-col gap-3">
        {POSTS.map((p) => (
          <li key={p.name} className="rounded-2xl border border-line bg-surface p-4">
            {loading ? (
              <>
                <div className="flex items-center gap-3">
                  <Bone className="size-10 rounded-full" />
                  <div className="flex-1 space-y-2">
                    <Bone className="h-3 w-1/3" />
                    <Bone className="h-3 w-4/5" />
                  </div>
                </div>
                <Bone className="mt-3 h-20 w-full rounded-xl" />
              </>
            ) : (
              <div style={{ animation: 'demo-in 300ms ease-out' }}>
                <div className="flex items-center gap-3">
                  <div className={`size-10 rounded-full bg-gradient-to-br ${p.color}`} />
                  <div className="flex-1">
                    <p className="text-sm font-medium leading-3">{p.name}</p>
                    <p className="mt-1.5 text-sm text-muted">{p.text}</p>
                  </div>
                </div>
                <div className={`mt-3 h-20 rounded-xl bg-gradient-to-br opacity-60 ${p.color}`} />
              </div>
            )}
          </li>
        ))}
      </ul>
      <button
        type="button"
        onClick={() => {
          setLoading(true);
          setRun((r) => r + 1);
        }}
        className="inline-flex items-center gap-2 rounded-xl border border-line bg-surface px-4 py-2 text-sm hover:bg-surface-2"
      >
        <RotateCcw className="size-4" aria-hidden /> Reload
      </button>
    </div>
  );
}
