import * as RadixAccordion from '@radix-ui/react-accordion';
import { ChevronDown, type LucideIcon } from 'lucide-react';
import type { ReactNode } from 'react';

/** Page-level collapsible sections. All sections start collapsed by design. */
export function Accordion({ children }: { children: ReactNode }) {
  return (
    <RadixAccordion.Root type="multiple" defaultValue={[]} className="flex flex-col gap-3">
      {children}
    </RadixAccordion.Root>
  );
}

export function AccordionSection({
  value,
  title,
  icon: Icon,
  children,
}: {
  value: string;
  title: string;
  icon?: LucideIcon;
  children: ReactNode;
}) {
  return (
    <RadixAccordion.Item
      value={value}
      className="overflow-hidden rounded-2xl border border-line bg-surface shadow-card"
    >
      <RadixAccordion.Header asChild>
        <h2>
          <RadixAccordion.Trigger className="group flex w-full items-center gap-3 px-4 py-4 text-left font-medium hover:bg-surface-2 sm:px-5">
            {Icon && <Icon className="size-5 shrink-0 text-accent" aria-hidden />}
            <span className="flex-1">{title}</span>
            <ChevronDown
              className="size-5 shrink-0 text-muted transition-transform duration-200 group-data-[state=open]:rotate-180"
              aria-hidden
            />
          </RadixAccordion.Trigger>
        </h2>
      </RadixAccordion.Header>
      <RadixAccordion.Content className="accordion-content overflow-hidden">
        <div className="border-t border-line px-4 py-4 text-sm leading-relaxed sm:px-5">
          {children}
        </div>
      </RadixAccordion.Content>
    </RadixAccordion.Item>
  );
}
