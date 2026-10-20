import { Quote } from 'lucide-react';
import type { ReactNode } from 'react';

const LOGOS = ['Northwind', 'Acme', 'Globex', 'Umbrella', 'Initech', 'Hooli', 'Stark', 'Wayne'];
const QUOTES = [
  { text: 'Shipped our redesign in a week.', who: 'Mina, Designer' },
  { text: 'The prompts are pure gold.', who: 'Leo, Engineer' },
  { text: 'Finally I know what to call things.', who: 'Sam, PM' },
  { text: 'My go-to for UI inspiration.', who: 'Hana, Founder' },
  { text: 'Saved hours of back-and-forth.', who: 'Yuki, Freelancer' },
];

function Row({
  children,
  reverse,
  duration,
}: {
  children: ReactNode;
  reverse?: boolean;
  duration: string;
}) {
  return (
    <div className="group flex overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_12%,#000_88%,transparent)]">
      {[0, 1].map((copy) => (
        <div
          key={copy}
          aria-hidden={copy === 1}
          className="flex shrink-0 gap-4 pr-4 group-hover:[animation-play-state:paused]"
          style={{
            animation: `demo-marquee ${duration} linear infinite ${reverse ? 'reverse' : ''}`,
          }}
        >
          {children}
        </div>
      ))}
    </div>
  );
}

export default function Demo() {
  return (
    <div className="flex h-full flex-col justify-center gap-6 py-6">
      <style>{`@keyframes demo-marquee{to{transform:translateX(-100%)}}`}</style>
      <p className="text-center text-sm font-medium tracking-wide text-muted uppercase">
        Trusted by teams everywhere
      </p>
      <Row duration="25s">
        {LOGOS.map((l) => (
          <span
            key={l}
            className="flex h-12 items-center gap-2 rounded-xl px-5 text-lg font-bold text-muted grayscale transition hover:text-fg"
          >
            <span
              className="size-6 rounded-md bg-gradient-to-br from-accent to-teal-400 opacity-70"
              aria-hidden
            />
            {l}
          </span>
        ))}
      </Row>
      <Row duration="40s" reverse>
        {QUOTES.map((q) => (
          <figure key={q.who} className="w-64 rounded-2xl border border-line bg-surface p-4">
            <Quote className="size-4 text-accent" aria-hidden />
            <blockquote className="mt-2 text-sm">{q.text}</blockquote>
            <figcaption className="mt-2 text-xs text-muted">{q.who}</figcaption>
          </figure>
        ))}
      </Row>
    </div>
  );
}
