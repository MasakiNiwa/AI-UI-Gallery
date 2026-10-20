import { FileCode } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { loadItemSources } from '@/gallery/registry';
import { highlightTsx } from '@/lib/highlight';
import { cn } from '@/lib/cn';
import { CopyButton } from '../ui/CopyButton';

interface Source {
  name: string;
  code: string;
  html: string;
}

/** The demo's real source code, highlighted on demand. */
export function CodePanel({ id }: { id: string }) {
  const { t } = useTranslation();
  const [state, setState] = useState<{ id: string; files: Source[] } | 'error' | null>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    let cancelled = false;
    loadItemSources(id)
      .then((files) =>
        Promise.all(files.map(async (f) => ({ ...f, html: await highlightTsx(f.code) }))),
      )
      .then((files) => !cancelled && setState({ id, files }))
      .catch(() => !cancelled && setState('error'));
    return () => {
      cancelled = true;
    };
  }, [id]);

  if (state === 'error') return <p className="text-sm text-muted">{t('item.error')}</p>;
  // Ignore results that belong to a previously viewed item.
  const files = state && state.id === id ? state.files : null;
  const file = files?.[Math.min(active, files.length - 1)];

  return (
    <div className="flex flex-col gap-3">
      <p className="text-sm text-muted">{t('item.codeNote')}</p>
      <div className="overflow-hidden rounded-2xl border border-line">
        <div className="flex items-center gap-1 border-b border-line bg-surface px-2 py-1.5">
          <div
            role="tablist"
            aria-label={t('item.code')}
            className="scrollbar-none flex flex-1 gap-1 overflow-x-auto"
          >
            {(files ?? [{ name: 'Demo.tsx' }]).map((f, i) => (
              <button
                key={f.name}
                type="button"
                role="tab"
                aria-selected={file?.name === f.name}
                onClick={() => setActive(i)}
                className={cn(
                  'flex shrink-0 items-center gap-1.5 rounded-lg px-2.5 py-1 font-mono text-xs',
                  file?.name === f.name ? 'bg-surface-2 text-fg' : 'text-muted hover:text-fg',
                )}
              >
                <FileCode className="size-3.5" aria-hidden />
                {f.name}
              </button>
            ))}
          </div>
          {file && <CopyButton text={file.code} />}
        </div>
        {file ? (
          <div
            className="max-h-[70vh] overflow-auto"
            // Shiki output is generated locally from our own source files.
            dangerouslySetInnerHTML={{ __html: file.html }}
          />
        ) : (
          <p className="p-6 text-sm text-muted">{t('item.codeLoading')}</p>
        )}
      </div>
    </div>
  );
}
