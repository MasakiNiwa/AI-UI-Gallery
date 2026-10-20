import { CircleCheck, FileText, UploadCloud, X } from 'lucide-react';
import { useEffect, useRef, useState, type DragEvent } from 'react';

interface Item {
  id: number;
  name: string;
  size: number;
  url: string | null;
  progress: number;
}

const MAX = 5 * 1024 * 1024;
let nextId = 0;

const formatSize = (b: number) =>
  b < 1024
    ? `${b} B`
    : b < 1024 * 1024
      ? `${(b / 1024).toFixed(1)} KB`
      : `${(b / 1024 / 1024).toFixed(1)} MB`;

export default function Demo() {
  const [items, setItems] = useState<Item[]>([
    { id: -1, name: 'project-brief.pdf', size: 248_000, url: null, progress: 100 },
  ]);
  const [over, setOver] = useState(false);
  const [error, setError] = useState('');
  const input = useRef<HTMLInputElement>(null);

  // Simulated upload progress for every unfinished file.
  useEffect(() => {
    if (!items.some((i) => i.progress < 100)) return;
    const id = setInterval(() => {
      setItems((list) =>
        list.map((i) =>
          i.progress < 100
            ? { ...i, progress: Math.min(100, i.progress + 8 + Math.random() * 12) }
            : i,
        ),
      );
    }, 200);
    return () => clearInterval(id);
  }, [items]);

  const addFiles = (files: FileList | null) => {
    if (!files) return;
    const accepted: Item[] = [];
    const rejected: string[] = [];
    for (const f of Array.from(files)) {
      const ok = (f.type.startsWith('image/') || f.type === 'application/pdf') && f.size <= MAX;
      if (!ok) rejected.push(f.name);
      else
        accepted.push({
          id: nextId++,
          name: f.name,
          size: f.size,
          url: f.type.startsWith('image/') ? URL.createObjectURL(f) : null,
          progress: 0,
        });
    }
    setError(rejected.length ? `Not accepted (images/PDF up to 5 MB): ${rejected.join(', ')}` : '');
    setItems((list) => [...accepted, ...list]);
  };

  const remove = (item: Item) => {
    if (item.url) URL.revokeObjectURL(item.url);
    setItems((list) => list.filter((i) => i.id !== item.id));
  };

  const onDrop = (e: DragEvent) => {
    e.preventDefault();
    setOver(false);
    addFiles(e.dataTransfer.files);
  };

  return (
    <div className="flex h-full items-start justify-center overflow-auto p-6">
      <div className="w-full max-w-md">
        <button
          type="button"
          onClick={() => input.current?.click()}
          onDragOver={(e) => {
            e.preventDefault();
            setOver(true);
          }}
          onDragLeave={() => setOver(false)}
          onDrop={onDrop}
          className={`flex w-full flex-col items-center gap-2 rounded-2xl border-2 border-dashed p-8 text-center transition-colors ${over ? 'border-accent bg-accent-soft' : 'border-line bg-surface hover:bg-surface-2'}`}
        >
          <UploadCloud className={`size-9 ${over ? 'text-accent' : 'text-muted'}`} aria-hidden />
          <span className="font-medium">Drag files here or click to browse</span>
          <span className="text-xs text-muted">Images or PDF, up to 5 MB</span>
        </button>
        <input
          ref={input}
          type="file"
          multiple
          accept="image/*,application/pdf"
          className="hidden"
          onChange={(e) => {
            addFiles(e.target.files);
            e.target.value = '';
          }}
        />
        {error && <p className="mt-2 text-xs text-rose-600 dark:text-rose-400">{error}</p>}
        <ul className="mt-3 flex flex-col gap-2">
          {items.map((item) => (
            <li
              key={item.id}
              className="flex items-center gap-3 rounded-xl border border-line bg-surface p-2.5"
            >
              {item.url ? (
                <img src={item.url} alt="" className="size-10 rounded-lg object-cover" />
              ) : (
                <span className="flex size-10 items-center justify-center rounded-lg bg-surface-2 text-muted">
                  <FileText className="size-5" aria-hidden />
                </span>
              )}
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium">{item.name}</p>
                <div className="mt-1 flex items-center gap-2">
                  <span className="h-1 flex-1 overflow-hidden rounded-full bg-surface-3">
                    <span
                      className="block h-full rounded-full bg-accent transition-[width]"
                      style={{ width: `${item.progress}%` }}
                    />
                  </span>
                  <span className="text-xs text-muted tabular-nums">{formatSize(item.size)}</span>
                </div>
              </div>
              {item.progress >= 100 && (
                <CircleCheck className="size-5 text-emerald-500" aria-label="Uploaded" />
              )}
              <button
                type="button"
                aria-label={`Remove ${item.name}`}
                onClick={() => remove(item)}
                className="text-muted hover:text-fg"
              >
                <X className="size-4" />
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
