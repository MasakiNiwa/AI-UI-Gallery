import { useEffect, useState } from 'react';
import { useReducedMotion } from '../../hooks';

const PHRASES = ['landing page', 'dashboard', 'chat app', 'portfolio'];
const GRADIENTS = [
  'from-indigo-400 to-sky-400',
  'from-teal-400 to-emerald-400',
  'from-rose-400 to-amber-400',
  'from-violet-400 to-fuchsia-400',
];

export default function Demo() {
  const reduced = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [length, setLength] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const phrase = PHRASES[index];

  useEffect(() => {
    if (reduced) {
      const id = setTimeout(() => setIndex((i) => (i + 1) % PHRASES.length), 3000);
      return () => clearTimeout(id);
    }
    let delay = deleting ? 40 : 80;
    if (!deleting && length === phrase.length) delay = 1500;
    const id = setTimeout(() => {
      if (!deleting && length === phrase.length) setDeleting(true);
      else if (deleting && length === 0) {
        setDeleting(false);
        setIndex((i) => (i + 1) % PHRASES.length);
      } else setLength((l) => l + (deleting ? -1 : 1));
    }, delay);
    return () => clearTimeout(id);
  }, [length, deleting, phrase, reduced]);

  const visible = reduced ? phrase : phrase.slice(0, length);

  return (
    <div className="flex h-full flex-col items-center justify-center gap-4 p-6 text-center">
      <style>{`@keyframes demo-blink{50%{opacity:0}}`}</style>
      <p className="text-sm font-medium tracking-widest text-muted uppercase">Ask AI to…</p>
      <h2
        className="min-h-[2.5em] text-3xl font-bold @lg:text-5xl"
        aria-label={`Build a ${PHRASES.join(', ')}`}
      >
        <span aria-hidden>
          Build a{' '}
          <span className={`bg-gradient-to-r bg-clip-text text-transparent ${GRADIENTS[index]}`}>
            {visible}
          </span>
          <span
            className="ml-0.5 inline-block h-[1em] w-[3px] translate-y-[0.1em] bg-fg"
            style={{ animation: 'demo-blink 1s step-end infinite' }}
          />
        </span>
      </h2>
      <p className="max-w-sm text-muted">Describe what you want, and watch it come to life.</p>
    </div>
  );
}
