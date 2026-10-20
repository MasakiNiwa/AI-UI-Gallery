import { useEffect, useRef, useState } from 'react';
import { useIsDark } from '@/stores/useApplySettings';
import type { DemoProps } from '../../types';
import { useReducedMotion } from '../../hooks';
import { createSim, type WorkerMessage } from './sim';

const supportsOffscreen =
  typeof OffscreenCanvas !== 'undefined' &&
  'transferControlToOffscreen' in HTMLCanvasElement.prototype;

export default function Demo({ mode }: DemoProps) {
  const hostRef = useRef<HTMLDivElement>(null);
  const postRef = useRef<(msg: WorkerMessage, transfer?: Transferable[]) => void>(() => {});
  const isDark = useIsDark();
  const darkRef = useRef(isDark);
  const reduced = useReducedMotion();
  const [fps, setFps] = useState<number | null>(null);
  const [blocking, setBlocking] = useState(false);

  useEffect(() => {
    const host = hostRef.current!;
    // The canvas is created here (not in JSX) because transferControlToOffscreen() can only be called once
    // per element, and React may run effects twice in development.
    const canvas = document.createElement('canvas');
    canvas.className = 'absolute inset-0 size-full';
    host.prepend(canvas);
    const dpr = Math.min(window.devicePixelRatio, 2);
    const options = {
      width: host.clientWidth,
      height: host.clientHeight,
      dpr,
      count: mode === 'preview' ? 70 : 140,
      dark: darkRef.current,
    };
    const animate = !reduced;
    let cleanup: () => void;

    if (supportsOffscreen) {
      const worker = new Worker(new URL('./particles.worker.ts', import.meta.url), {
        type: 'module',
        name: 'particles',
      });
      const offscreen = canvas.transferControlToOffscreen();
      postRef.current = (msg, transfer = []) => worker.postMessage(msg, transfer);
      postRef.current({ type: 'init', canvas: offscreen, options, animate }, [offscreen]);
      worker.onmessage = (e: MessageEvent<{ type: 'fps'; fps: number }>) => setFps(e.data.fps);
      cleanup = () => worker.terminate();
    } else {
      // Fallback: same simulation on the main thread.
      const sim = createSim(canvas.getContext('2d')!, options);
      sim.resize(options.width, options.height, dpr);
      let raf = 0;
      const loop = () => {
        sim.frame();
        raf = requestAnimationFrame(loop);
      };
      if (animate) raf = requestAnimationFrame(loop);
      else sim.render();
      postRef.current = (msg) => {
        if (msg.type === 'resize') sim.resize(msg.width, msg.height, msg.dpr);
        if (msg.type === 'pointer') sim.setPointer(msg.x, msg.y);
        if (msg.type === 'theme') sim.setDark(msg.dark);
        if (msg.type !== 'pointer') sim.render();
      };
      cleanup = () => cancelAnimationFrame(raf);
    }

    const ro = new ResizeObserver(() =>
      postRef.current({ type: 'resize', width: host.clientWidth, height: host.clientHeight, dpr }),
    );
    ro.observe(host);
    const onMove = (e: PointerEvent) => {
      const r = host.getBoundingClientRect();
      postRef.current({ type: 'pointer', x: e.clientX - r.left, y: e.clientY - r.top });
    };
    const onLeave = () => postRef.current({ type: 'pointer', x: -1e4, y: -1e4 });
    host.addEventListener('pointermove', onMove);
    host.addEventListener('pointerleave', onLeave);

    return () => {
      ro.disconnect();
      host.removeEventListener('pointermove', onMove);
      host.removeEventListener('pointerleave', onLeave);
      cleanup();
      canvas.remove();
    };
  }, [mode, reduced]);

  useEffect(() => {
    darkRef.current = isDark;
    postRef.current({ type: 'theme', dark: isDark });
  }, [isDark]);

  /** Freezes the main thread for 1.5 s to show that worker rendering keeps going. */
  const blockMainThread = () => {
    setBlocking(true);
    setTimeout(() => {
      const end = performance.now() + 1500;
      while (performance.now() < end) {
        /* busy wait on purpose */
      }
      setBlocking(false);
    }, 50);
  };

  return (
    <div ref={hostRef} className="relative h-full touch-none overflow-hidden">
      {mode === 'full' && (
        <div className="absolute top-3 left-3 flex flex-col items-start gap-2">
          <span className="rounded-lg bg-surface/80 px-2.5 py-1 font-mono text-xs backdrop-blur">
            {supportsOffscreen ? 'Web Worker + OffscreenCanvas' : 'Main thread (fallback)'}
            {fps !== null && ` · ${fps} fps`}
          </span>
          <button
            type="button"
            onClick={blockMainThread}
            disabled={blocking}
            className="rounded-lg border border-line bg-surface/80 px-2.5 py-1 text-xs backdrop-blur hover:bg-surface disabled:opacity-60"
          >
            {blocking ? 'Main thread busy…' : 'Block main thread for 1.5 s'}
          </button>
        </div>
      )}
    </div>
  );
}
