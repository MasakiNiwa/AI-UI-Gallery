import { Play, Square, Volume2 } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from '../../hooks';

const MELODY = [523.25, 659.25, 783.99, 659.25, 587.33, 698.46, 880, 698.46];
const BEAT = 0.3;

interface Engine {
  ctx: AudioContext;
  analyser: AnalyserNode;
  master: GainNode;
  timer: ReturnType<typeof setInterval>;
}

/** Starts a looping synth melody routed through an analyser. */
function startEngine(volume: number): Engine {
  const ctx = new AudioContext();
  const master = ctx.createGain();
  master.gain.value = volume;
  const analyser = ctx.createAnalyser();
  analyser.fftSize = 256;
  master.connect(analyser).connect(ctx.destination);

  const note = (freq: number, at: number, len: number, type: OscillatorType, peak: number) => {
    const osc = ctx.createOscillator();
    const env = ctx.createGain();
    osc.type = type;
    osc.frequency.value = freq;
    env.gain.setValueAtTime(0, at);
    env.gain.linearRampToValueAtTime(peak, at + 0.02);
    env.gain.exponentialRampToValueAtTime(0.001, at + len);
    osc.connect(env).connect(master);
    osc.start(at);
    osc.stop(at + len + 0.05);
  };

  let step = 0;
  let next = ctx.currentTime + 0.05;
  // Schedule notes slightly ahead of time for steady timing.
  const schedule = () => {
    while (next < ctx.currentTime + 0.5) {
      note(MELODY[step % MELODY.length], next, BEAT * 0.9, 'triangle', 0.25);
      if (step % 2 === 0) note(MELODY[step % MELODY.length] / 4, next, BEAT * 1.6, 'sine', 0.35);
      step++;
      next += BEAT;
    }
  };
  schedule();
  return { ctx, analyser, master, timer: setInterval(schedule, 100) };
}

export default function Demo() {
  const canvas = useRef<HTMLCanvasElement>(null);
  const engine = useRef<Engine | null>(null);
  const reduced = useReducedMotion();
  const [playing, setPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);

  const stop = () => {
    const e = engine.current;
    if (e) {
      clearInterval(e.timer);
      void e.ctx.close();
    }
    engine.current = null;
    setPlaying(false);
  };

  useEffect(() => () => stop(), []);

  useEffect(() => {
    if (engine.current) engine.current.master.gain.value = volume;
  }, [volume]);

  useEffect(() => {
    const c = canvas.current!;
    const ctx = c.getContext('2d')!;
    const freq = new Uint8Array(128);
    const wave = new Uint8Array(128);
    let raf = 0;
    const draw = (t: number) => {
      const dpr = Math.min(window.devicePixelRatio, 2);
      const w = c.clientWidth;
      const h = c.clientHeight;
      if (c.width !== w * dpr) {
        c.width = w * dpr;
        c.height = h * dpr;
      }
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);
      const a = engine.current?.analyser;
      if (a) {
        a.getByteFrequencyData(freq);
        a.getByteTimeDomainData(wave);
      } else {
        // Idle: a gentle breathing pattern so the canvas is not empty.
        for (let i = 0; i < 128; i++) {
          freq[i] = reduced ? 40 : 30 + 25 * Math.sin(t / 600 + i / 6);
          wave[i] = 128;
        }
      }
      const cx = w / 2;
      const cy = h * 0.45;
      const level = freq.slice(0, 64).reduce((s, v) => s + v, 0) / 64 / 255;
      const radius = Math.min(w, h) * (0.14 + level * 0.06);
      for (let i = 0; i < 64; i++) {
        const angle = (i / 64) * Math.PI * 2 - Math.PI / 2;
        const len = (freq[i] / 255) * Math.min(w, h) * 0.22;
        ctx.strokeStyle = `hsl(${200 + i * 2.5} 80% 65%)`;
        ctx.lineWidth = 3;
        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.moveTo(cx + Math.cos(angle) * radius, cy + Math.sin(angle) * radius);
        ctx.lineTo(
          cx + Math.cos(angle) * (radius + len + 2),
          cy + Math.sin(angle) * (radius + len + 2),
        );
        ctx.stroke();
      }
      const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius);
      grad.addColorStop(0, 'rgba(160,180,255,.55)');
      grad.addColorStop(1, 'rgba(90,110,200,.15)');
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(cx, cy, radius - 4, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = 'rgba(94,234,212,.8)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      for (let i = 0; i < 128; i++) {
        const x = (i / 127) * w;
        const y = h * 0.88 + ((wave[i] - 128) / 128) * h * 0.08;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();
      if (!reduced || engine.current) raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(raf);
  }, [reduced, playing]);

  return (
    <div className="relative h-full bg-[#0b0d14] text-slate-200">
      <canvas
        ref={canvas}
        className="absolute inset-0 size-full"
        aria-label="Audio spectrum and waveform"
        role="img"
      />
      <div className="absolute inset-x-0 bottom-3 flex flex-wrap items-center justify-center gap-3 px-4">
        <button
          type="button"
          onClick={() => {
            if (playing) stop();
            else {
              engine.current = startEngine(volume);
              setPlaying(true);
            }
          }}
          className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-slate-900"
        >
          {playing ? (
            <Square className="size-4 fill-current" />
          ) : (
            <Play className="size-4 fill-current" />
          )}
          {playing ? 'Stop' : 'Play'}
        </button>
        <label className="flex items-center gap-2 text-sm text-slate-300">
          <Volume2 className="size-4" aria-hidden />
          <span className="sr-only">Volume</span>
          <input
            type="range"
            min={0}
            max={1}
            step={0.05}
            value={volume}
            onChange={(e) => setVolume(Number(e.target.value))}
          />
        </label>
      </div>
    </div>
  );
}
