import { useState } from 'react';

const CARDS = [
  {
    word: 'Ephemeral',
    meaning: 'Lasting for a very short time.',
    example: 'Fame on social media is often ephemeral.',
  },
  {
    word: 'Serendipity',
    meaning: 'Finding something good by chance.',
    example: 'We met by pure serendipity.',
  },
  {
    word: 'Ubiquitous',
    meaning: 'Present everywhere.',
    example: 'Smartphones are now ubiquitous.',
  },
];

const face =
  'absolute inset-0 flex flex-col items-center justify-center rounded-2xl p-4 text-center [backface-visibility:hidden]';

export default function Demo() {
  const [flipped, setFlipped] = useState<boolean[]>([false, true, false]);
  const allFlipped = flipped.every(Boolean);

  return (
    <div className="flex h-full flex-col items-center justify-center gap-4 overflow-auto p-6">
      <div className="grid w-full max-w-2xl grid-cols-1 gap-4 @md:grid-cols-3">
        {CARDS.map((c, i) => (
          <button
            key={c.word}
            type="button"
            aria-pressed={flipped[i]}
            aria-label={flipped[i] ? `${c.word}: ${c.meaning}` : c.word}
            onClick={() => setFlipped((f) => f.map((v, j) => (j === i ? !v : v)))}
            className="h-40 [perspective:800px]"
          >
            <span
              className="relative block size-full transition-transform duration-[600ms] [transform-style:preserve-3d]"
              style={{ transform: flipped[i] ? 'rotateY(180deg)' : 'none' }}
            >
              <span className={`${face} border border-line bg-surface`}>
                <span className="text-xs tracking-widest text-muted uppercase">Word</span>
                <span className="mt-1 text-2xl font-bold">{c.word}</span>
              </span>
              <span
                className={`${face} bg-accent text-accent-contrast [transform:rotateY(180deg)]`}
              >
                <span className="font-semibold">{c.meaning}</span>
                <span className="mt-2 text-sm italic opacity-80">“{c.example}”</span>
              </span>
            </span>
          </button>
        ))}
      </div>
      <button
        type="button"
        onClick={() => setFlipped(CARDS.map(() => !allFlipped))}
        className="rounded-xl border border-line bg-surface px-4 py-2 text-sm hover:bg-surface-2"
      >
        {allFlipped ? 'Show words' : 'Flip all'}
      </button>
    </div>
  );
}
