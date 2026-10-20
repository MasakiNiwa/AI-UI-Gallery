/// <reference lib="webworker" />
import { createSim, type Sim, type WorkerMessage } from './sim';

let sim: Sim | null = null;
let frames = 0;
let last = performance.now();

self.onmessage = (e: MessageEvent<WorkerMessage>) => {
  const msg = e.data;
  switch (msg.type) {
    case 'init': {
      const ctx = msg.canvas.getContext('2d')!;
      sim = createSim(ctx, msg.options);
      sim.resize(msg.options.width, msg.options.height, msg.options.dpr);
      if (!msg.animate) {
        sim.render();
        return;
      }
      const loop = () => {
        sim!.frame();
        frames++;
        const now = performance.now();
        if (now - last >= 500) {
          self.postMessage({ type: 'fps', fps: Math.round((frames * 1000) / (now - last)) });
          frames = 0;
          last = now;
        }
        requestAnimationFrame(loop);
      };
      requestAnimationFrame(loop);
      break;
    }
    case 'resize':
      sim?.resize(msg.width, msg.height, msg.dpr);
      sim?.render();
      break;
    case 'pointer':
      sim?.setPointer(msg.x, msg.y);
      break;
    case 'theme':
      sim?.setDark(msg.dark);
      sim?.render();
      break;
  }
};
