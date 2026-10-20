import { useEffect, useRef, useState } from 'react';
import type { DemoProps } from '../../types';
import { useReducedMotion } from '../../hooks';

const VERT = `#version 300 es
in vec2 p;
void main() { gl_Position = vec4(p, 0.0, 1.0); }`;

const FRAG = `#version 300 es
precision highp float;
uniform vec2 uRes;
uniform float uTime;
uniform vec2 uMouse;
out vec4 outColor;

vec3 c0 = vec3(0.07, 0.09, 0.16);
vec3 c1 = vec3(0.28, 0.33, 0.62);
vec3 c2 = vec3(0.20, 0.55, 0.58);
vec3 c3 = vec3(0.80, 0.55, 0.62);

void main() {
  vec2 uv = gl_FragCoord.xy / uRes;
  vec2 q = uv * vec2(uRes.x / uRes.y, 1.0);
  float t = uTime * 0.12;
  q += (uMouse - 0.5) * 0.25 * (1.0 - length(uv - uMouse));
  for (float i = 1.0; i < 5.0; i++) {
    q.x += 0.35 / i * sin(i * 2.2 * q.y + t * 1.3 + i);
    q.y += 0.30 / i * cos(i * 1.8 * q.x + t + i * 0.7);
  }
  float a = 0.5 + 0.5 * sin(q.x * 1.4 + t);
  float b = 0.5 + 0.5 * cos(q.y * 1.7 - t * 0.8);
  vec3 col = mix(c0, c1, a);
  col = mix(col, c2, b * 0.75);
  col = mix(col, c3, smoothstep(0.6, 1.0, a * b) * 0.5);
  col = mix(col, c0, 0.25);
  col *= 0.75 + 0.2 * smoothstep(1.2, 0.2, length(uv - 0.5));
  outColor = vec4(col, 1.0);
}`;

function compile(gl: WebGL2RenderingContext, type: number, src: string) {
  const s = gl.createShader(type)!;
  gl.shaderSource(s, src);
  gl.compileShader(s);
  if (!gl.getShaderParameter(s, gl.COMPILE_STATUS))
    throw new Error(gl.getShaderInfoLog(s) ?? 'shader');
  return s;
}

export default function Demo({ mode }: DemoProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduced = useReducedMotion();
  const [supported, setSupported] = useState(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const gl = canvas.getContext('webgl2', { antialias: false, powerPreference: 'low-power' });
    if (!gl) {
      setSupported(false);
      return;
    }
    const prog = gl.createProgram()!;
    gl.attachShader(prog, compile(gl, gl.VERTEX_SHADER, VERT));
    gl.attachShader(prog, compile(gl, gl.FRAGMENT_SHADER, FRAG));
    gl.linkProgram(prog);
    gl.useProgram(prog);

    // One triangle that covers the whole viewport.
    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(prog, 'p');
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

    const uRes = gl.getUniformLocation(prog, 'uRes');
    const uTime = gl.getUniformLocation(prog, 'uTime');
    const uMouse = gl.getUniformLocation(prog, 'uMouse');
    const mouse = { x: 0.5, y: 0.5, tx: 0.5, ty: 0.5 };

    // Half resolution (quarter in previews): invisible on soft gradients, much cheaper on the GPU.
    const scale = (mode === 'preview' ? 0.25 : 0.5) * Math.min(window.devicePixelRatio, 2);
    const resize = () => {
      canvas.width = Math.max(1, Math.round(canvas.clientWidth * scale));
      canvas.height = Math.max(1, Math.round(canvas.clientHeight * scale));
      gl.viewport(0, 0, canvas.width, canvas.height);
    };
    const onMove = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      mouse.tx = (e.clientX - r.left) / r.width;
      mouse.ty = 1 - (e.clientY - r.top) / r.height;
    };
    canvas.addEventListener('pointermove', onMove);

    let visible = true;
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting));
    io.observe(canvas);

    let raf = 0;
    const start = performance.now();
    const draw = (now: number) => {
      mouse.x += (mouse.tx - mouse.x) * 0.05;
      mouse.y += (mouse.ty - mouse.y) * 0.05;
      gl.uniform2f(uRes, canvas.width, canvas.height);
      gl.uniform1f(uTime, reduced ? 8 : (now - start) / 1000);
      gl.uniform2f(uMouse, mouse.x, mouse.y);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    };
    const loop = (now: number) => {
      if (visible && !document.hidden) draw(now);
      raf = requestAnimationFrame(loop);
    };
    const ro = new ResizeObserver(() => {
      resize();
      if (reduced) draw(start); // still frame must be redrawn after the canvas is cleared by resizing
    });
    ro.observe(canvas);
    resize();
    if (reduced) draw(start);
    else raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      canvas.removeEventListener('pointermove', onMove);
      gl.getExtension('WEBGL_lose_context')?.loseContext();
    };
  }, [mode, reduced]);

  return (
    <div className="relative h-full overflow-hidden bg-gradient-to-br from-slate-900 via-indigo-900 to-teal-800">
      {supported && <canvas ref={canvasRef} className="absolute inset-0 size-full" />}
      <div className="pointer-events-none relative flex h-full flex-col items-center justify-center gap-3 p-6 text-center text-white">
        <p className="text-xs tracking-[0.3em] text-white/60 uppercase">WebGL · GPU</p>
        <h2 className="text-3xl font-bold @lg:text-5xl">Calm by design</h2>
        <p className="max-w-sm text-white/75">
          Every pixel of this background is computed in parallel on your GPU.
        </p>
      </div>
    </div>
  );
}
