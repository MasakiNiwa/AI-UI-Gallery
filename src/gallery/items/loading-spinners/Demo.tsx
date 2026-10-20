import type { ReactNode } from 'react';

const CSS = `
.dl{--c:var(--accent);position:relative;display:inline-block}
.dl-ring{width:36px;height:36px;border-radius:50%;border:4px solid var(--surface-3);border-top-color:var(--c);animation:dl-rot .8s linear infinite}
.dl-dots{display:flex;gap:6px}.dl-dots i{width:9px;height:9px;border-radius:50%;background:var(--c);animation:dl-bounce 1s ease-in-out infinite}
.dl-dots i:nth-child(2){animation-delay:.15s}.dl-dots i:nth-child(3){animation-delay:.3s}
.dl-bars{display:flex;gap:4px;align-items:center;height:32px}.dl-bars i{width:5px;height:100%;border-radius:3px;background:var(--c);animation:dl-bar 1s ease-in-out infinite}
.dl-bars i:nth-child(2){animation-delay:.1s}.dl-bars i:nth-child(3){animation-delay:.2s}.dl-bars i:nth-child(4){animation-delay:.3s}
.dl-pulse{width:32px;height:32px;border-radius:50%;background:var(--c);animation:dl-pulse 1.2s ease-out infinite}
.dl-orbit{width:40px;height:40px;animation:dl-rot 1.4s linear infinite}.dl-orbit i{position:absolute;width:9px;height:9px;border-radius:50%;background:var(--c)}
.dl-orbit i:nth-child(1){top:0;left:15px}.dl-orbit i:nth-child(2){bottom:0;left:15px;opacity:.5}
.dl-morph{width:28px;height:28px;background:var(--c);animation:dl-morph 1.6s ease-in-out infinite}
.dl-bar{width:120px;height:5px;border-radius:9999px;background:var(--surface-3);overflow:hidden}.dl-bar i{display:block;height:100%;width:40%;border-radius:inherit;background:var(--c);animation:dl-slide 1.2s ease-in-out infinite}
.dl-text::after{content:'';animation:dl-ellipsis 1.2s steps(4) infinite}
@keyframes dl-rot{to{transform:rotate(360deg)}}
@keyframes dl-bounce{0%,80%,100%{transform:translateY(0);opacity:.4}40%{transform:translateY(-10px);opacity:1}}
@keyframes dl-bar{0%,100%{transform:scaleY(.3)}50%{transform:scaleY(1)}}
@keyframes dl-pulse{from{transform:scale(.3);opacity:1}to{transform:scale(1.2);opacity:0}}
@keyframes dl-morph{0%{transform:rotate(0);border-radius:4px}50%{transform:rotate(180deg);border-radius:50%}100%{transform:rotate(360deg);border-radius:4px}}
@keyframes dl-slide{0%{transform:translateX(-100%)}100%{transform:translateX(250%)}}
@keyframes dl-ellipsis{0%{content:''}25%{content:'.'}50%{content:'..'}75%{content:'...'}}
@media (prefers-reduced-motion: reduce){.dl,.dl *{animation-duration:3s!important}}
`;

const LOADERS: { name: string; el: ReactNode }[] = [
  { name: 'Ring', el: <span className="dl dl-ring" /> },
  {
    name: 'Dots',
    el: (
      <span className="dl dl-dots">
        <i />
        <i />
        <i />
      </span>
    ),
  },
  {
    name: 'Bars',
    el: (
      <span className="dl dl-bars">
        <i />
        <i />
        <i />
        <i />
      </span>
    ),
  },
  { name: 'Pulse', el: <span className="dl dl-pulse" /> },
  {
    name: 'Orbit',
    el: (
      <span className="dl dl-orbit">
        <i />
        <i />
      </span>
    ),
  },
  { name: 'Morph', el: <span className="dl dl-morph" /> },
  {
    name: 'Progress',
    el: (
      <span className="dl dl-bar">
        <i />
      </span>
    ),
  },
  { name: 'Text', el: <span className="dl dl-text text-sm font-medium">Loading</span> },
];

export default function Demo() {
  return (
    <div className="flex h-full items-center justify-center overflow-auto p-4">
      <style>{CSS}</style>
      <ul className="grid w-full max-w-2xl grid-cols-2 gap-3 @md:grid-cols-4">
        {LOADERS.map(({ name, el }) => (
          <li
            key={name}
            className="flex aspect-square flex-col items-center justify-center gap-4 rounded-2xl border border-line bg-surface"
          >
            <span role="status" className="flex h-12 items-center">
              {el}
              <span className="sr-only">Loading…</span>
            </span>
            <span className="text-xs text-muted">{name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
