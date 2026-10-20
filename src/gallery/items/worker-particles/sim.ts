/** Constellation particle simulation. Shared by the worker (OffscreenCanvas) and the main-thread fallback. */

export interface SimOptions {
  width: number;
  height: number;
  dpr: number;
  count: number;
  dark: boolean;
}

interface P {
  x: number;
  y: number;
  vx: number;
  vy: number;
}

type Ctx = OffscreenCanvasRenderingContext2D | CanvasRenderingContext2D;

export function createSim(ctx: Ctx, opts: SimOptions) {
  let { width, height, dpr, dark } = opts;
  const pointer = { x: -1e4, y: -1e4 };
  const LINK = 110;
  const ps: P[] = Array.from({ length: opts.count }, () => ({
    x: Math.random() * width,
    y: Math.random() * height,
    vx: (Math.random() - 0.5) * 0.6,
    vy: (Math.random() - 0.5) * 0.6,
  }));

  function step() {
    for (const p of ps) {
      const dx = pointer.x - p.x;
      const dy = pointer.y - p.y;
      const d2 = dx * dx + dy * dy;
      if (d2 < 160 * 160) {
        // Gentle attraction toward the pointer.
        p.vx += dx * 0.00004 * 60;
        p.vy += dy * 0.00004 * 60;
      }
      p.vx *= 0.99;
      p.vy *= 0.99;
      p.vx += (Math.random() - 0.5) * 0.03;
      p.vy += (Math.random() - 0.5) * 0.03;
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < 0 || p.x > width) p.vx *= -1;
      if (p.y < 0 || p.y > height) p.vy *= -1;
      p.x = Math.min(width, Math.max(0, p.x));
      p.y = Math.min(height, Math.max(0, p.y));
    }
  }

  function render() {
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, width, height);
    const rgb = dark ? '138,156,191' : '74,95,134';
    ctx.lineWidth = 1;
    for (let i = 0; i < ps.length; i++) {
      const a = ps[i];
      for (let j = i + 1; j < ps.length; j++) {
        const b = ps[j];
        const dx = a.x - b.x;
        const dy = a.y - b.y;
        const d2 = dx * dx + dy * dy;
        if (d2 < LINK * LINK) {
          ctx.strokeStyle = `rgba(${rgb},${(1 - Math.sqrt(d2) / LINK) * 0.5})`;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }
    }
    ctx.fillStyle = `rgba(${rgb},0.9)`;
    for (const p of ps) {
      ctx.beginPath();
      ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  return {
    frame() {
      step();
      render();
    },
    render,
    resize(w: number, h: number, ratio: number) {
      width = w;
      height = h;
      dpr = ratio;
      ctx.canvas.width = Math.round(w * ratio);
      ctx.canvas.height = Math.round(h * ratio);
    },
    setPointer(x: number, y: number) {
      pointer.x = x;
      pointer.y = y;
    },
    setDark(value: boolean) {
      dark = value;
    },
  };
}

export type Sim = ReturnType<typeof createSim>;

export type WorkerMessage =
  | { type: 'init'; canvas: OffscreenCanvas; options: SimOptions; animate: boolean }
  | { type: 'resize'; width: number; height: number; dpr: number }
  | { type: 'pointer'; x: number; y: number }
  | { type: 'theme'; dark: boolean };
