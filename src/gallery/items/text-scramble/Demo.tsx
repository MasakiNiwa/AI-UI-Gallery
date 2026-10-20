import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from '../../hooks';

const GLYPHS = '!<>-_\\/[]{}—=+*^?#ｱｲｳｴｵｶｷｸｹｺ';
const PHRASES = ['ACCESS GRANTED', 'DECODING UI…', 'BUILT WITH AI', 'HELLO, HUMAN'];
const LINKS = ['Work', 'About', 'Lab', 'Contact'];

interface Char {
  ch: string;
  done: boolean;
}

/** Returns the current scrambled characters and a function to scramble toward a new text. */
function useScramble(initial: string, reduced: boolean) {
  const [chars, setChars] = useState<Char[]>([...initial].map((ch) => ({ ch, done: true })));
  const raf = useRef(0);

  useEffect(() => () => cancelAnimationFrame(raf.current), []);

  const scramble = (target: string) => {
    cancelAnimationFrame(raf.current);
    if (reduced) {
      setChars([...target].map((ch) => ({ ch, done: true })));
      return;
    }
    const ends = [...target].map(() => 10 + Math.floor(Math.random() * 38));
    let frame = 0;
    const tick = () => {
      frame++;
      setChars(
        [...target].map((ch, i) =>
          frame >= ends[i] || ch === ' '
            ? { ch, done: true }
            : { ch: GLYPHS[Math.floor(Math.random() * GLYPHS.length)], done: false },
        ),
      );
      if (frame < Math.max(...ends)) raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
  };
  return [chars, scramble] as const;
}

function Scrambled({ chars }: { chars: Char[] }) {
  return (
    <span aria-hidden>
      {chars.map((c, i) => (
        <span key={i} className={c.done ? '' : 'text-accent/60'}>
          {c.ch}
        </span>
      ))}
    </span>
  );
}

function NavLink({ label, reduced }: { label: string; reduced: boolean }) {
  const [chars, scramble] = useScramble(label, reduced);
  return (
    <a
      href="#"
      onClick={(e) => e.preventDefault()}
      onMouseEnter={() => scramble(label)}
      onFocus={() => scramble(label)}
      aria-label={label}
      className="rounded-lg px-3 py-1.5 font-mono text-sm hover:bg-surface-2"
    >
      <Scrambled chars={chars} />
    </a>
  );
}

export default function Demo() {
  const reduced = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [chars, scramble] = useScramble(PHRASES[0], reduced);

  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % PHRASES.length), 3000);
    return () => clearInterval(id);
  }, []);

  const firstRun = useRef(true);
  useEffect(() => {
    if (firstRun.current) {
      firstRun.current = false;
      return;
    }
    scramble(PHRASES[index]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index]);

  return (
    <div className="flex h-full flex-col items-center justify-center gap-8 bg-[#0e1014] p-6 text-slate-100">
      <nav className="flex gap-1 text-slate-300">
        {LINKS.map((l) => (
          <NavLink key={l} label={l} reduced={reduced} />
        ))}
      </nav>
      <h2
        aria-label={PHRASES[index]}
        className="font-mono text-2xl font-bold tracking-wider @md:text-4xl"
      >
        <Scrambled chars={chars} />
      </h2>
      <p className="font-mono text-xs text-slate-500">hover the links ↑</p>
    </div>
  );
}
