import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from '../../hooks';

const CSS = `
.fc{position:relative;width:2.4em;height:3.2em;perspective:300px;font-variant-numeric:tabular-nums}
.fc span{position:absolute;left:0;right:0;height:50%;overflow:hidden;display:flex;justify-content:center;background:#20242c;color:#f1f3f6;backface-visibility:hidden}
.fc .t{top:0;border-radius:.25em .25em 0 0;align-items:flex-end}
.fc .b{bottom:0;border-radius:0 0 .25em .25em;align-items:flex-start;background:#1b1f26}
.fc .t b{transform:translateY(50%)}.fc .b b{transform:translateY(-50%)}
.fc b{font-weight:700;line-height:1;font-size:2em}
.fc .ft{transform-origin:bottom;animation:fc-top .3s ease-in forwards;z-index:2}
.fc .fb{transform-origin:top;transform:rotateX(90deg);animation:fc-bottom .3s .3s ease-out forwards;z-index:2}
.fc::after{content:'';position:absolute;left:0;right:0;top:50%;height:1px;background:rgba(0,0,0,.6);z-index:3}
@keyframes fc-top{to{transform:rotateX(-90deg)}}
@keyframes fc-bottom{to{transform:rotateX(0)}}
`;

function Digit({ value, reduced }: { value: string; reduced: boolean }) {
  const prev = useRef(value);
  const [pair, setPair] = useState({ from: value, to: value, key: 0 });

  useEffect(() => {
    if (value === prev.current) return;
    const from = prev.current;
    prev.current = value;
    const id = setTimeout(() => setPair((p) => ({ from, to: value, key: p.key + 1 })), 0);
    return () => clearTimeout(id);
  }, [value]);

  const flipping = !reduced && pair.from !== pair.to;
  return (
    <div className="fc" aria-hidden>
      <span className="t">
        <b>{pair.to}</b>
      </span>
      <span className="b">
        <b>{flipping ? pair.from : pair.to}</b>
      </span>
      {flipping && (
        <>
          <span key={`t${pair.key}`} className="t ft">
            <b>{pair.from}</b>
          </span>
          <span key={`b${pair.key}`} className="b fb">
            <b>{pair.to}</b>
          </span>
        </>
      )}
    </div>
  );
}

const TARGET_OFFSET = (3 * 86400 + 7 * 3600 + 42 * 60 + 10) * 1000;

export default function Demo() {
  const reduced = useReducedMotion();
  const [target] = useState(() => Date.now() + TARGET_OFFSET);
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  const left = Math.max(0, Math.floor((target - now) / 1000));
  const units = [
    { label: 'Days', v: Math.floor(left / 86400) },
    { label: 'Hours', v: Math.floor((left % 86400) / 3600) },
    { label: 'Minutes', v: Math.floor((left % 3600) / 60) },
    { label: 'Seconds', v: left % 60 },
  ];
  const spoken = `${units[0].v} days, ${units[1].v} hours and ${units[2].v} minutes left`;

  return (
    <div className="flex h-full flex-col items-center justify-center gap-5 bg-[#0f1115] p-4 text-slate-200">
      <style>{CSS}</style>
      <p className="text-sm tracking-[0.3em] text-slate-400 uppercase">Launching in</p>
      {left === 0 ? (
        <p className="text-3xl font-bold">We are live! 🚀</p>
      ) : (
        <div className="flex gap-3 text-[14px] @md:gap-5 @md:text-[20px]">
          {units.map(({ label, v }) => (
            <div key={label} className="flex flex-col items-center gap-2">
              <div className="flex gap-1">
                {String(v)
                  .padStart(2, '0')
                  .split('')
                  .map((d, i) => (
                    <Digit key={i} value={d} reduced={reduced} />
                  ))}
              </div>
              <span className="text-[11px] tracking-widest text-slate-500 uppercase">{label}</span>
            </div>
          ))}
        </div>
      )}
      <p className="sr-only" aria-live="polite">
        {spoken}
      </p>
    </div>
  );
}
