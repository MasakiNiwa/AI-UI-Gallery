import * as Tabs from '@radix-ui/react-tabs';
import { ArrowLeft, Monitor, RotateCcw, Smartphone } from 'lucide-react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate, useParams } from 'react-router';
import { CategoryIcon } from '@/components/gallery/CategoryIcon';
import { DemoRenderer } from '@/components/gallery/DemoRenderer';
import { ItemGrid } from '@/components/gallery/ItemCard';
import { Button } from '@/components/ui/Button';
import { Chip } from '@/components/ui/Chip';
import { CopyButton } from '@/components/ui/CopyButton';
import { SegmentedControl } from '@/components/ui/SegmentedControl';
import { getItem, ITEMS, itemText } from '@/gallery/registry';
import { currentLanguage } from '@/i18n';
import { cn } from '@/lib/cn';
import { NotFoundPage } from './NotFoundPage';

type Viewport = 'full' | 'mobile';

const tabClass =
  'relative px-1 pb-2.5 text-sm font-medium text-muted transition-colors hover:text-fg data-[state=active]:text-fg data-[state=active]:after:absolute data-[state=active]:after:inset-x-0 data-[state=active]:after:-bottom-px data-[state=active]:after:h-0.5 data-[state=active]:after:rounded-full data-[state=active]:after:bg-accent';

export function ItemPage() {
  const { id = '' } = useParams();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [viewport, setViewport] = useState<Viewport>('full');
  const [runKey, setRunKey] = useState(0);
  const item = getItem(id);

  if (!item) return <NotFoundPage message={t('item.notFound')} />;

  const text = itemText(item, currentLanguage());
  const related = ITEMS.filter((i) => i.category === item.category && i.id !== item.id).slice(0, 3);

  return (
    <article className="flex flex-col gap-6">
      <div>
        <button
          type="button"
          onClick={() => (window.history.length > 1 ? navigate(-1) : navigate('/gallery'))}
          className="mb-3 inline-flex items-center gap-1.5 text-sm text-muted hover:text-fg"
        >
          <ArrowLeft className="size-4" aria-hidden />
          {t('item.back')}
        </button>
        <h1 className="text-2xl font-bold sm:text-3xl">{text.name}</h1>
        <p className="mt-2 text-muted">{text.summary}</p>
        <div className="mt-3 flex flex-wrap gap-1.5">
          <Link to={`/gallery?category=${item.category}`}>
            <Chip className="hover:text-fg">
              <CategoryIcon id={item.category} className="size-3.5" aria-hidden />
              {t(`categories.${item.category}`)}
            </Chip>
          </Link>
          <Chip>
            {t('difficulty.label')}: {t(`difficulty.${item.difficulty}`)}
          </Chip>
          {item.tech.map((tech) => (
            <Chip key={tech} className="bg-accent-soft text-accent">
              {tech}
            </Chip>
          ))}
        </div>
      </div>

      <section
        aria-label={t('item.demo')}
        className="overflow-hidden rounded-2xl border border-line"
      >
        <div className="flex items-center justify-between gap-2 border-b border-line bg-surface px-3 py-2">
          <span className="text-sm font-medium text-muted">{t('item.demo')}</span>
          <div className="flex items-center gap-1">
            <SegmentedControl<Viewport>
              label={t('item.viewport')}
              value={viewport}
              onChange={setViewport}
              iconOnly
              options={[
                { value: 'full', label: t('item.viewportFull'), icon: Monitor },
                { value: 'mobile', label: t('item.viewportMobile'), icon: Smartphone },
              ]}
            />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setRunKey((k) => k + 1)}
              aria-label={t('item.reload')}
              title={t('item.reload')}
            >
              <RotateCcw className="size-4" />
            </Button>
          </div>
        </div>
        <div className="bg-surface-2 p-3 sm:p-4">
          <div
            className={cn(
              '@container mx-auto h-[min(70vh,560px)] overflow-hidden rounded-xl border border-line bg-bg transition-[max-width] duration-300',
              viewport === 'mobile' ? 'max-w-[390px]' : 'max-w-full',
            )}
          >
            <DemoRenderer key={runKey} item={item} mode="full" />
          </div>
        </div>
      </section>

      <Tabs.Root defaultValue="about">
        <Tabs.List className="flex gap-6 border-b border-line">
          <Tabs.Trigger value="about" className={tabClass}>
            {t('item.about')}
          </Tabs.Trigger>
          <Tabs.Trigger value="prompt" className={tabClass}>
            {t('item.prompt')}
          </Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content value="about" className="pt-5">
          <div className="flex flex-col gap-4 leading-relaxed">
            {text.description.split('\n\n').map((para, i) => (
              <p key={i}>{para}</p>
            ))}
            <div className="flex flex-wrap items-center gap-1.5 text-sm">
              <span className="mr-1 text-muted">{t('item.tags')}:</span>
              {item.tags.map((tag) => (
                <Link key={tag} to={`/gallery?q=${encodeURIComponent(tag)}`}>
                  <Chip className="hover:text-fg">#{tag}</Chip>
                </Link>
              ))}
            </div>
          </div>
        </Tabs.Content>
        <Tabs.Content value="prompt" className="pt-5">
          <div className="flex flex-col gap-4">
            <div className="flex items-start justify-between gap-3">
              <p className="text-sm text-muted">{t('item.promptLead')}</p>
              <CopyButton text={text.prompt} />
            </div>
            <pre className="rounded-2xl border border-line bg-surface p-4 font-sans text-sm leading-relaxed whitespace-pre-wrap">
              {text.prompt}
            </pre>
            {text.tips && text.tips.length > 0 && (
              <div>
                <h3 className="mb-2 font-semibold">{t('item.tips')}</h3>
                <ul className="list-disc space-y-1 pl-5 text-sm text-muted">
                  {text.tips.map((tip) => (
                    <li key={tip}>{tip}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </Tabs.Content>
      </Tabs.Root>

      {related.length > 0 && (
        <section aria-labelledby="related">
          <h2 id="related" className="mb-3 text-lg font-semibold">
            {t('item.related')}
          </h2>
          <ItemGrid items={related} />
        </section>
      )}
    </article>
  );
}
