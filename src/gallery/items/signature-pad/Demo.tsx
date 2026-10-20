import { Eraser, Undo2 } from 'lucide-react';
import { useCallback, useEffect, useRef, useState, type PointerEvent } from 'react';

interface Pt {
  x: number;
  y: number;
  w: number;
}
interface Stroke {
  color: string;
  pts: Pt[];
}

const COLORS = { Black: '#1f2328', Blue: '#2f4fb5' };

export default function Demo() {
  const canvas = useRef<HTMLCanvasElement>(null);
  const strokes = useRef<Stroke[]>([]);
  const last = useRef<{ t: number; x: number; y: number } | null>(null);
  const [count, setCount] = useState(0);
  const [color, setColor] = useState(COLORS.Black);
  const [size, setSize] = useState(3);
  const [saved, setSaved] = useState<string | null>(null);

  const redraw = useCallback(() => {
    // A resize callback can still fire after the canvas has been unmounted.
    const c = canvas.current;
    if (!c) return;
    const ctx = c.getContext('2d')!;
    const dpr = Math.min(window.devicePixelRatio, 2);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, c.width, c.height);
    ctx.lineCap = 'round';
    for (const s of strokes.current) {
      ctx.strokeStyle = s.color;
      for (let i = 1; i < s.pts.length; i++) {
        const a = s.pts[i - 1];
        const b = s.pts[i];
        const p = s.pts[i - 2] ?? a;
        // Quadratic curve between midpoints for smooth ink.
        ctx.lineWidth = (a.w + b.w) / 2;
        ctx.beginPath();
        ctx.moveTo((p.x + a.x) / 2, (p.y + a.y) / 2);
        ctx.quadraticCurveTo(a.x, a.y, (a.x + b.x) / 2, (a.y + b.y) / 2);
        ctx.stroke();
      }
    }
  }, []);

  useEffect(() => {
    const c = canvas.current!;
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio, 2);
      c.width = c.clientWidth * dpr;
      c.height = c.clientHeight * dpr;
      redraw();
    };
    const ro = new ResizeObserver(resize);
    ro.observe(c);
    return () => ro.disconnect();
  }, [redraw]);

  const point = (e: PointerEvent<HTMLCanvasElement>): Pt => {
    const r = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - r.left;
    const y = e.clientY - r.top;
    const now = performance.now();
    const prev = last.current;
    const speed = prev ? Math.hypot(x - prev.x, y - prev.y) / Math.max(1, now - prev.t) : 0;
    last.current = { t: now, x, y };
    const pressure = e.pointerType === 'pen' && e.pressure > 0 ? e.pressure * 2 : 1;
    return { x, y, w: Math.max(0.6, size * pressure * (1.3 - Math.min(speed, 1.2) * 0.6)) };
  };

  const down = (e: PointerEvent<HTMLCanvasElement>) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    last.current = null;
    strokes.current.push({ color, pts: [point(e)] });
    setSaved(null);
  };
  const move = (e: PointerEvent<HTMLCanvasElement>) => {
    if (!e.currentTarget.hasPointerCapture(e.pointerId)) return;
    strokes.current[strokes.current.length - 1].pts.push(point(e));
    redraw();
  };
  const up = () => setCount(strokes.current.length);

  const undo = () => {
    strokes.current.pop();
    setCount(strokes.current.length);
    redraw();
  };
  const clear = () => {
    strokes.current = [];
    setCount(0);
    setSaved(null);
    redraw();
  };

  return (
    <div className="flex h-full flex-col items-center justify-center gap-3 overflow-auto p-4">
      <div className="relative w-full max-w-lg overflow-hidden rounded-2xl border border-line bg-white">
        <canvas
          ref={canvas}
          onPointerDown={down}
          onPointerMove={move}
          onPointerUp={up}
          aria-label="Signature area. Draw your signature here."
          className="block h-48 w-full cursor-crosshair touch-none"
        />
        {count === 0 && (
          <p className="pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2 text-center text-sm text-slate-400">
            Sign here
          </p>
        )}
        <span className="pointer-events-none absolute right-6 bottom-10 left-6 border-b border-dashed border-slate-300" />
        <span className="pointer-events-none absolute bottom-10 left-6 text-lg text-slate-400">
          ×
        </span>
      </div>
      <div className="flex w-full max-w-lg flex-wrap items-center gap-2 text-sm">
        {Object.entries(COLORS).map(([name, c]) => (
          <button
            key={name}
            type="button"
            aria-label={`${name} ink`}
            aria-pressed={color === c}
            onClick={() => setColor(c)}
            className={`size-7 rounded-full ${color === c ? 'ring-2 ring-accent ring-offset-2 ring-offset-bg' : ''}`}
            style={{ background: c }}
          />
        ))}
        <label className="flex items-center gap-2 text-muted">
          Size
          <input
            type="range"
            min={1}
            max={6}
            value={size}
            onChange={(e) => setSize(Number(e.target.value))}
          />
        </label>
        <span className="flex-1" />
        <button
          type="button"
          onClick={undo}
          disabled={!count}
          className="inline-flex items-center gap-1 rounded-lg px-2 py-1.5 hover:bg-surface-2 disabled:opacity-40"
        >
          <Undo2 className="size-4" aria-hidden /> Undo
        </button>
        <button
          type="button"
          onClick={clear}
          disabled={!count}
          className="inline-flex items-center gap-1 rounded-lg px-2 py-1.5 hover:bg-surface-2 disabled:opacity-40"
        >
          <Eraser className="size-4" aria-hidden /> Clear
        </button>
        <button
          type="button"
          disabled={!count}
          onClick={() => setSaved(canvas.current!.toDataURL('image/png'))}
          className="rounded-lg bg-accent px-3 py-1.5 font-medium text-accent-contrast disabled:opacity-40"
        >
          Save
        </button>
      </div>
      {saved && (
        <figure className="flex items-center gap-3 text-xs text-muted">
          <img
            src={saved}
            alt="Saved signature"
            className="h-12 rounded border border-line bg-white"
          />
          Exported as PNG
        </figure>
      )}
    </div>
  );
}
