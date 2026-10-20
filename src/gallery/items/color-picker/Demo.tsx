import { Check, Copy, Pipette } from 'lucide-react';
import { useState, type KeyboardEvent, type PointerEvent } from 'react';

interface HSV {
  h: number;
  s: number;
  v: number;
}

function hsvToRgb({ h, s, v }: HSV): [number, number, number] {
  const f = (n: number) => {
    const k = (n + h / 60) % 6;
    return Math.round((v - v * s * Math.max(0, Math.min(k, 4 - k, 1))) * 255);
  };
  return [f(5), f(3), f(1)];
}

function rgbToHsv(r: number, g: number, b: number): HSV {
  r /= 255;
  g /= 255;
  b /= 255;
  const max = Math.max(r, g, b);
  const d = max - Math.min(r, g, b);
  const h =
    d === 0 ? 0 : max === r ? ((g - b) / d) % 6 : max === g ? (b - r) / d + 2 : (r - g) / d + 4;
  return { h: (h * 60 + 360) % 360, s: max ? d / max : 0, v: max };
}

const toHex = (rgb: number[]) => `#${rgb.map((c) => c.toString(16).padStart(2, '0')).join('')}`;
const fromHex = (hex: string) => {
  const m = /^#?([0-9a-f]{6})$/i.exec(hex.trim());
  if (!m) return null;
  const n = parseInt(m[1], 16);
  return rgbToHsv((n >> 16) & 255, (n >> 8) & 255, n & 255);
};
const PRESETS = [
  '#4a5f86',
  '#8a9cbf',
  '#10b981',
  '#f59e0b',
  '#ef4444',
  '#ec4899',
  '#8b5cf6',
  '#0ea5e9',
];
const clamp = (n: number) => Math.min(1, Math.max(0, n));

type EyeDropperCtor = new () => { open: () => Promise<{ sRGBHex: string }> };

export default function Demo() {
  const [hsv, setHsv] = useState<HSV>(fromHex('#6f7fd8')!);
  const [text, setText] = useState('#6f7fd8');
  const [recent, setRecent] = useState<string[]>(['#14161a', '#d5d8dd']);
  const [copied, setCopied] = useState(false);
  const rgb = hsvToRgb(hsv);
  const hex = toHex(rgb);
  const EyeDropper = (window as unknown as { EyeDropper?: EyeDropperCtor }).EyeDropper;

  const update = (next: HSV) => {
    setHsv(next);
    setText(toHex(hsvToRgb(next)));
  };
  const commit = () => setRecent((r) => [hex, ...r.filter((c) => c !== hex)].slice(0, 6));

  const drag = (fn: (x: number, y: number) => void) => ({
    onPointerDown: (e: PointerEvent<HTMLDivElement>) => {
      e.currentTarget.setPointerCapture(e.pointerId);
      const r = e.currentTarget.getBoundingClientRect();
      fn(clamp((e.clientX - r.left) / r.width), clamp((e.clientY - r.top) / r.height));
    },
    onPointerMove: (e: PointerEvent<HTMLDivElement>) => {
      if (!e.currentTarget.hasPointerCapture(e.pointerId)) return;
      const r = e.currentTarget.getBoundingClientRect();
      fn(clamp((e.clientX - r.left) / r.width), clamp((e.clientY - r.top) / r.height));
    },
    onPointerUp: commit,
  });

  const keys = (fn: (dx: number, dy: number) => void) => (e: KeyboardEvent) => {
    const step = e.shiftKey ? 0.1 : 0.01;
    const map: Record<string, [number, number]> = {
      ArrowLeft: [-step, 0],
      ArrowRight: [step, 0],
      ArrowUp: [0, -step],
      ArrowDown: [0, step],
    };
    if (!map[e.key]) return;
    e.preventDefault();
    fn(...map[e.key]);
  };

  return (
    <div className="flex h-full items-center justify-center overflow-auto p-4">
      <div className="w-full max-w-xs space-y-3 rounded-2xl border border-line bg-surface p-4 shadow-lg">
        <div
          role="slider"
          tabIndex={0}
          aria-label="Saturation and brightness"
          aria-valuetext={`Saturation ${Math.round(hsv.s * 100)}%, brightness ${Math.round(hsv.v * 100)}%`}
          {...drag((x, y) => update({ ...hsv, s: x, v: 1 - y }))}
          onKeyDown={keys((dx, dy) =>
            update({ ...hsv, s: clamp(hsv.s + dx), v: clamp(hsv.v - dy) }),
          )}
          className="relative h-40 cursor-crosshair touch-none rounded-xl"
          style={{
            background: `linear-gradient(to top, #000, transparent), linear-gradient(to right, #fff, hsl(${hsv.h} 100% 50%))`,
          }}
        >
          <span
            className="pointer-events-none absolute size-4 -translate-1/2 rounded-full border-2 border-white shadow-[0_0_0_1px_rgba(0,0,0,.3)]"
            style={{ left: `${hsv.s * 100}%`, top: `${(1 - hsv.v) * 100}%`, background: hex }}
          />
        </div>
        <div
          role="slider"
          tabIndex={0}
          aria-label="Hue"
          aria-valuemin={0}
          aria-valuemax={360}
          aria-valuenow={Math.round(hsv.h)}
          {...drag((x) => update({ ...hsv, h: x * 360 }))}
          onKeyDown={keys((dx) =>
            update({ ...hsv, h: Math.min(360, Math.max(0, hsv.h + dx * 360)) }),
          )}
          className="relative h-3 cursor-pointer touch-none rounded-full"
          style={{ background: 'linear-gradient(to right,#f00,#ff0,#0f0,#0ff,#00f,#f0f,#f00)' }}
        >
          <span
            className="pointer-events-none absolute top-1/2 size-4 -translate-1/2 rounded-full border-2 border-white shadow"
            style={{ left: `${(hsv.h / 360) * 100}%`, background: `hsl(${hsv.h} 100% 50%)` }}
          />
        </div>
        <div className="flex items-center gap-2">
          <span
            className="size-9 shrink-0 rounded-lg border border-line"
            style={{ background: hex }}
          />
          <input
            value={text}
            onChange={(e) => {
              setText(e.target.value);
              const parsed = fromHex(e.target.value);
              if (parsed) setHsv(parsed);
            }}
            onBlur={() => {
              setText(hex);
              commit();
            }}
            aria-label="Hex color"
            aria-invalid={!fromHex(text)}
            className="h-9 min-w-0 flex-1 rounded-lg border border-line bg-bg px-2 font-mono text-sm uppercase aria-[invalid=true]:border-rose-500"
          />
          <button
            type="button"
            aria-label="Copy hex"
            onClick={() => {
              void navigator.clipboard?.writeText(hex);
              setCopied(true);
              setTimeout(() => setCopied(false), 1200);
            }}
            className="flex size-9 items-center justify-center rounded-lg border border-line hover:bg-surface-2"
          >
            {copied ? <Check className="size-4 text-emerald-500" /> : <Copy className="size-4" />}
          </button>
          {EyeDropper && (
            <button
              type="button"
              aria-label="Pick a color from the screen"
              onClick={() =>
                void new EyeDropper()
                  .open()
                  .then((r) => {
                    update(fromHex(r.sRGBHex)!);
                    commit();
                  })
                  .catch(() => {})
              }
              className="flex size-9 items-center justify-center rounded-lg border border-line hover:bg-surface-2"
            >
              <Pipette className="size-4" />
            </button>
          )}
        </div>
        <p className="font-mono text-xs text-muted">
          rgb({rgb.join(', ')}) · hsv({Math.round(hsv.h)}°, {Math.round(hsv.s * 100)}%,{' '}
          {Math.round(hsv.v * 100)}%)
        </p>
        {[
          { label: 'Presets', colors: PRESETS },
          { label: 'Recent', colors: recent },
        ].map(({ label, colors }) => (
          <div key={label}>
            <p className="mb-1 text-xs text-muted">{label}</p>
            <div className="flex flex-wrap gap-1.5">
              {colors.map((c) => (
                <button
                  key={c}
                  type="button"
                  aria-label={c}
                  onClick={() => update(fromHex(c)!)}
                  className={`size-6 rounded-md border border-black/10 ${c === hex ? 'ring-2 ring-accent ring-offset-1 ring-offset-surface' : ''}`}
                  style={{ background: c }}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
