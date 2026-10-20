import { Sparkles } from 'lucide-react';

const CSS = `
@property --demo-angle { syntax: '<angle>'; initial-value: 0deg; inherits: false; }
@keyframes demo-spin { to { --demo-angle: 360deg; } }
.demo-gb {
  --colors: #7c8cf8, #5eead4, #f0abfc, #fbbf24, #7c8cf8;
  position: relative;
  padding: 2px;
  background: conic-gradient(from var(--demo-angle), var(--colors));
  animation: demo-spin 4s linear infinite;
}
.demo-gb::before {
  content: '';
  position: absolute;
  inset: 0;
  z-index: -1;
  border-radius: inherit;
  background: inherit;
  filter: blur(20px);
  opacity: .45;
}
.demo-gb-btn:hover { animation-duration: 1.2s; }
`;

export default function Demo() {
  return (
    <div className="isolate flex h-full flex-col items-center justify-center gap-10 bg-[#0e1014] p-6 text-slate-100">
      <style>{CSS}</style>
      <div className="demo-gb w-full max-w-xs rounded-3xl">
        <div className="rounded-[22px] bg-[#15181e] p-6">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-2.5 py-0.5 text-xs">
            <Sparkles className="size-3.5" aria-hidden /> New
          </span>
          <p className="mt-3 text-xl font-semibold">AI Assistant</p>
          <p className="mt-1 text-sm text-slate-400">Generate components from a single sentence.</p>
        </div>
      </div>
      <button type="button" className="demo-gb demo-gb-btn rounded-full">
        <span className="block rounded-full bg-[#15181e] px-7 py-3 font-medium">Try it free</span>
      </button>
    </div>
  );
}
