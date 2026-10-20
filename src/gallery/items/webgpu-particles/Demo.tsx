import { Cpu } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import type { DemoProps } from '../../types';
import { useReducedMotion } from '../../hooks';

const SHARED = /* wgsl */ `
struct P { pos: vec2f, vel: vec2f };
struct U { time: f32, aspect: f32, mouse: vec2f };
`;

const COMPUTE = /* wgsl */ `${SHARED}
@group(0) @binding(0) var<storage, read_write> ps: array<P>;
@group(0) @binding(1) var<uniform> u: U;

@compute @workgroup_size(64)
fn main(@builtin(global_invocation_id) id: vec3u) {
  let i = id.x;
  if (i >= arrayLength(&ps)) { return; }
  var p = ps[i];
  let d = (u.mouse - p.pos) * vec2f(u.aspect, 1.0);
  let dist = max(length(d), 0.06);
  let dir = d / dist;
  let swirl = vec2f(-dir.y, dir.x);
  p.vel += (dir * 0.00022 + swirl * 0.00028) / dist * vec2f(1.0 / u.aspect, 1.0);
  p.vel *= 0.982;
  p.pos += p.vel;
  p.pos = (fract(p.pos * 0.5 + 0.5) * 2.0) - 1.0; // wrap at the edges
  ps[i] = p;
}`;

/** Additive brightness per particle, scaled so the overall density looks the same at any count. */
const renderShader = (intensity: number) => /* wgsl */ `${SHARED}
@group(0) @binding(0) var<storage, read> ps: array<P>;
@group(0) @binding(1) var<uniform> u: U;

struct VOut { @builtin(position) pos: vec4f, @location(0) color: vec3f, @location(1) uv: vec2f };

@vertex
fn vs(@builtin(vertex_index) v: u32, @builtin(instance_index) i: u32) -> VOut {
  var corners = array<vec2f, 6>(vec2f(-1, -1), vec2f(1, -1), vec2f(-1, 1), vec2f(-1, 1), vec2f(1, -1), vec2f(1, 1));
  let p = ps[i];
  let c = corners[v];
  let size = 0.006;
  let speed = clamp(length(p.vel) * 70.0, 0.0, 1.0);
  var out: VOut;
  out.pos = vec4f(p.pos + c * vec2f(size / u.aspect, size), 0.0, 1.0);
  out.color = mix(vec3f(0.30, 0.38, 0.95), vec3f(0.35, 0.95, 0.85), speed) * ${intensity.toFixed(4)};
  out.uv = c;
  return out;
}

@fragment
fn fs(in: VOut) -> @location(0) vec4f {
  let a = 1.0 - smoothstep(0.2, 1.0, length(in.uv));
  return vec4f(in.color * a, 1.0);
}`;

type Status = 'loading' | 'running' | 'unsupported';

export default function Demo({ mode }: DemoProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduced = useReducedMotion();
  const [status, setStatus] = useState<Status>('loading');
  const [fps, setFps] = useState(0);
  const count = mode === 'preview' ? 20_000 : 100_000;

  useEffect(() => {
    const canvas = canvasRef.current!;
    let disposed = false;
    let cleanup = () => {};

    (async () => {
      const adapter = await navigator.gpu?.requestAdapter();
      const device = await adapter?.requestDevice();
      const context = canvas.getContext('webgpu');
      if (!device || !context || disposed) {
        if (!disposed) setStatus('unsupported');
        return;
      }
      const format = navigator.gpu.getPreferredCanvasFormat();
      context.configure({ device, format, alphaMode: 'opaque' });

      const init = new Float32Array(count * 4);
      for (let i = 0; i < count; i++) {
        init[i * 4] = Math.random() * 2 - 1;
        init[i * 4 + 1] = Math.random() * 2 - 1;
      }
      const particles = device.createBuffer({
        size: init.byteLength,
        usage: GPUBufferUsage.STORAGE | GPUBufferUsage.COPY_DST,
      });
      device.queue.writeBuffer(particles, 0, init);
      const uniforms = device.createBuffer({
        size: 16,
        usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST,
      });

      const computePipeline = device.createComputePipeline({
        layout: 'auto',
        compute: { module: device.createShaderModule({ code: COMPUTE }), entryPoint: 'main' },
      });
      const renderModule = device.createShaderModule({ code: renderShader(6000 / count) });
      const add: GPUBlendComponent = { srcFactor: 'one', dstFactor: 'one', operation: 'add' };
      const keepAlpha: GPUBlendComponent = {
        srcFactor: 'zero',
        dstFactor: 'one',
        operation: 'add',
      };
      const renderPipeline = device.createRenderPipeline({
        layout: 'auto',
        vertex: { module: renderModule, entryPoint: 'vs' },
        fragment: {
          module: renderModule,
          entryPoint: 'fs',
          targets: [{ format, blend: { color: add, alpha: keepAlpha } }],
        },
        primitive: { topology: 'triangle-list' },
      });
      const entries = [
        { binding: 0, resource: { buffer: particles } },
        { binding: 1, resource: { buffer: uniforms } },
      ];
      const computeGroup = device.createBindGroup({
        layout: computePipeline.getBindGroupLayout(0),
        entries,
      });
      const renderGroup = device.createBindGroup({
        layout: renderPipeline.getBindGroupLayout(0),
        entries,
      });

      const dpr = Math.min(window.devicePixelRatio, 2);
      const resize = () => {
        canvas.width = Math.max(1, canvas.clientWidth * dpr);
        canvas.height = Math.max(1, canvas.clientHeight * dpr);
      };
      const ro = new ResizeObserver(resize);
      ro.observe(canvas);
      resize();

      const mouse = { x: 0, y: 0, last: -1e9 };
      const onMove = (e: PointerEvent) => {
        const r = canvas.getBoundingClientRect();
        mouse.x = ((e.clientX - r.left) / r.width) * 2 - 1;
        mouse.y = -(((e.clientY - r.top) / r.height) * 2 - 1);
        mouse.last = performance.now();
      };
      canvas.addEventListener('pointermove', onMove);

      let raf = 0;
      let frames = 0;
      let lastFps = performance.now();
      const frame = (now: number) => {
        if (now - mouse.last > 2000) {
          mouse.x = Math.cos(now / 1500) * 0.45;
          mouse.y = Math.sin(now / 1100) * 0.35;
        }
        device.queue.writeBuffer(
          uniforms,
          0,
          new Float32Array([now / 1000, canvas.width / canvas.height, mouse.x, mouse.y]),
        );
        const encoder = device.createCommandEncoder();
        const cpass = encoder.beginComputePass();
        cpass.setPipeline(computePipeline);
        cpass.setBindGroup(0, computeGroup);
        cpass.dispatchWorkgroups(Math.ceil(count / 64));
        cpass.end();
        const rpass = encoder.beginRenderPass({
          colorAttachments: [
            {
              view: context.getCurrentTexture().createView(),
              clearValue: [0.027, 0.031, 0.051, 1],
              loadOp: 'clear',
              storeOp: 'store',
            },
          ],
        });
        rpass.setPipeline(renderPipeline);
        rpass.setBindGroup(0, renderGroup);
        rpass.draw(6, count);
        rpass.end();
        device.queue.submit([encoder.finish()]);
        frames++;
        if (now - lastFps > 500) {
          setFps(Math.round((frames * 1000) / (now - lastFps)));
          frames = 0;
          lastFps = now;
        }
        if (!reduced) raf = requestAnimationFrame(frame);
      };
      raf = requestAnimationFrame(frame);
      setStatus('running');

      cleanup = () => {
        cancelAnimationFrame(raf);
        ro.disconnect();
        canvas.removeEventListener('pointermove', onMove);
        particles.destroy();
        uniforms.destroy();
        device.destroy();
      };
    })().catch(() => !disposed && setStatus('unsupported'));

    return () => {
      disposed = true;
      cleanup();
    };
  }, [count, reduced]);

  return (
    <div className="relative h-full overflow-hidden bg-[#07080d] text-slate-200">
      <canvas ref={canvasRef} className="absolute inset-0 size-full touch-none" />
      {status === 'running' && mode === 'full' && (
        <span className="absolute top-3 left-3 rounded-lg bg-white/10 px-2.5 py-1 font-mono text-xs backdrop-blur">
          WebGPU · {count.toLocaleString()} particles · {fps} fps
        </span>
      )}
      {status === 'unsupported' && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 p-6 text-center">
          <Cpu className="size-10 text-slate-500" aria-hidden />
          <p className="font-semibold">WebGPU is not available in this browser</p>
          <p className="max-w-sm text-sm text-slate-400">
            Try a recent version of Chrome, Edge or Safari with WebGPU enabled to see 100,000
            particles simulated on your GPU.
          </p>
        </div>
      )}
    </div>
  );
}
