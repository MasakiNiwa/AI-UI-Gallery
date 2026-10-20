import { useTranslation } from 'react-i18next';
import { buildPrompt, EXTRAS, STACKS, type Extra } from '@/gallery/promptBuilder';
import type { Language } from '@/i18n/languages';
import { cn } from '@/lib/cn';
import { useSettings } from '@/stores/settings';
import { CopyButton } from '../ui/CopyButton';

const chip = (active: boolean) =>
  cn(
    'h-8 rounded-full border px-3 text-sm transition-colors',
    active
      ? 'border-accent bg-accent text-accent-contrast'
      : 'border-line bg-surface text-muted hover:text-fg',
  );

/** Shows an item's prompt, rewritten for the user's preferred stack and extra requirements. */
export function PromptPanel({ prompt, lang }: { prompt: string; lang: Language }) {
  const { t } = useTranslation();
  const stack = useSettings((s) => s.promptStack);
  const extras = useSettings((s) => s.promptExtras);
  const set = useSettings((s) => s.set);
  const built = buildPrompt(prompt, lang, stack, extras);

  const toggleExtra = (e: Extra) =>
    set('promptExtras', extras.includes(e) ? extras.filter((x) => x !== e) : [...extras, e]);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-3 rounded-2xl border border-line bg-surface-2/60 p-3">
        <div
          role="radiogroup"
          aria-label={t('promptBuilder.stack')}
          className="flex flex-wrap items-center gap-1.5"
        >
          <span className="mr-1 text-xs font-medium text-muted">{t('promptBuilder.stack')}</span>
          {STACKS.map((s) => (
            <button
              key={s}
              type="button"
              role="radio"
              aria-checked={stack === s}
              onClick={() => set('promptStack', s)}
              className={chip(stack === s)}
            >
              {t(`promptBuilder.${s}`)}
            </button>
          ))}
        </div>
        <div
          role="group"
          aria-label={t('promptBuilder.extras')}
          className="flex flex-wrap items-center gap-1.5"
        >
          <span className="mr-1 text-xs font-medium text-muted">{t('promptBuilder.extras')}</span>
          {EXTRAS.map((e) => (
            <button
              key={e}
              type="button"
              aria-pressed={extras.includes(e)}
              onClick={() => toggleExtra(e)}
              className={chip(extras.includes(e))}
            >
              {extras.includes(e) ? '✓ ' : '+ '}
              {t(`promptBuilder.${e}`)}
            </button>
          ))}
        </div>
      </div>
      <div className="flex items-start justify-between gap-3">
        <p className="text-sm text-muted">{t('item.promptLead')}</p>
        <CopyButton text={built.text} />
      </div>
      <pre className="rounded-2xl border border-line bg-surface p-4 font-sans text-sm leading-relaxed whitespace-pre-wrap">
        {built.base}
        {built.added.map((line) => (
          <span key={line} className="mt-1 block rounded-md bg-accent-soft px-1.5 text-fg">
            {line}
          </span>
        ))}
      </pre>
      {built.added.length > 0 && (
        <p className="-mt-2 text-xs text-muted">{t('promptBuilder.addedNote')}</p>
      )}
    </div>
  );
}
