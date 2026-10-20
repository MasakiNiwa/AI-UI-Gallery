import { Cloud, Gauge, Globe, Lock, Sparkles, Zap, type LucideIcon } from 'lucide-react';
import type { ReactNode } from 'react';

function Tile({
  icon: Icon,
  title,
  desc,
  className = '',
  children,
}: {
  icon: LucideIcon;
  title: string;
  desc: string;
  className?: string;
  children?: ReactNode;
}) {
  return (
    <div
      className={`flex flex-col rounded-2xl border border-line bg-surface p-4 transition hover:-translate-y-0.5 hover:border-accent/50 ${className}`}
    >
      <span className="flex size-9 items-center justify-center rounded-xl bg-accent-soft text-accent">
        <Icon className="size-5" aria-hidden />
      </span>
      {children}
      <p className="mt-3 font-semibold">{title}</p>
      <p className="text-sm text-muted">{desc}</p>
    </div>
  );
}

const BARS = [40, 65, 50, 80, 60, 95, 75];

export default function Demo() {
  return (
    <div className="h-full overflow-auto p-4 @sm:p-6">
      <div className="mx-auto grid max-w-3xl auto-rows-[minmax(140px,auto)] grid-cols-1 gap-3 @md:grid-cols-2 @3xl:grid-cols-4">
        <Tile
          icon={Gauge}
          title="Real-time analytics"
          desc="Watch every metric update live."
          className="@md:col-span-2 @md:row-span-2"
        >
          <div
            className="mt-4 flex min-h-28 flex-1 items-end gap-2 rounded-xl bg-surface-2 p-3"
            aria-hidden
          >
            {BARS.map((h, i) => (
              <span
                key={i}
                className="flex-1 rounded-t-md bg-accent/70"
                style={{ height: `${h}%`, minHeight: 12 }}
              />
            ))}
          </div>
        </Tile>
        <Tile icon={Zap} title="Fast" desc="Loads in under 100 ms." />
        <Tile icon={Lock} title="Secure" desc="End-to-end encryption." />
        <Tile
          icon={Globe}
          title="Global"
          desc="Edge network in 40 regions."
          className="@md:col-span-2"
        />
        <Tile icon={Cloud} title="Sync" desc="Every device, always up to date." />
        <Tile icon={Sparkles} title="AI assist" desc="Smart suggestions as you type." />
      </div>
    </div>
  );
}
