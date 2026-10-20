import * as Tabs from '@radix-ui/react-tabs';
import {
  ArrowLeft,
  Check,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Minimize2,
  Monitor,
  RotateCcw,
  Share2,
  Smartphone,
} from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate, useParams } from 'react-router';
import { CategoryIcon } from '@/components/gallery/CategoryIcon';
import { DemoRenderer } from '@/components/gallery/DemoRenderer';
import { FavoriteButton } from '@/components/gallery/FavoriteButton';
import { PromptPanel } from '@/components/gallery/PromptPanel';
import { CodePanel } from '@/components/gallery/CodePanel';
import { ItemGrid } from '@/components/gallery/ItemCard';
import { Button } from '@/components/ui/Button';
import { Chip } from '@/components/ui/Chip';
import { SegmentedControl } from '@/components/ui/SegmentedControl';
import { getItem, ITEMS, itemText } from '@/gallery/registry';
import { currentLanguage } from '@/i18n';
import { cn } from '@/lib/cn';
import { useLibrary } from '@/stores/library';
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
  const addRecent = useLibrary((s) => s.addRecent);
  const stageRef = useRef<HTMLElement>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [shared, setShared] = useState(false);

  useEffect(() => {
    if (item) addRecent(item.id);
  }, [item, addRecent]);

  useEffect(() => {
    const onChange = () => setIsFullscreen(document.fullscreenElement === stageRef.current);
    document.addEventListener('fullscreenchange', onChange);
    return () => document.removeEventListener('fullscreenchange', onChange);
  }, []);

  useEffect(() => {
    if (!shared) return;
    const timer = setTimeout(() => setShared(false), 1800);
    return () => clearTimeout(timer);
  }, [shared]);

  if (!item) return <NotFoundPage message={t('item.notFound')} />;

  const text = itemText(item, currentLanguage());
  const related = ITEMS.filter((i) => i.category === item.category && i.id !== item.id).slice(0, 3);
  const index = ITEMS.indexOf(item);
  const prev = ITEMS[(index - 1 + ITEMS.length) % ITEMS.length];
  const next = ITEMS[(index + 1) % ITEMS.length];

  const share = async () => {
    const url = window.location.href;
    if (navigator.share && matchMedia('(pointer: coarse)').matches) {
      try {
        await navigator.share({ title: text.name, text: text.summary, url });
        return;
      } catch {
        // Cancelled or unsupported: fall back to copying the link.
      }
    }
    await navigator.clipboard?.writeText(url).catch(() => {});
    setShared(true);
  };

  const toggleFullscreen = () => {
    if (document.fullscreenElement) void document.exitFullscreen();
    else void stageRef.current?.requestFullscreen?.();
  };
  const canFullscreen = typeof document !== 'undefined' && document.fullscreenEnabled;

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
        <div className="flex items-start justify-between gap-3">
          <h1 className="text-2xl font-bold sm:text-3xl">{text.name}</h1>
          <div className="flex shrink-0 items-center gap-1">
            <FavoriteButton
              id={item.id}
              name={text.name}
              withLabel
              className="h-9 border border-line px-3"
            />
            <Button
              variant="ghost"
              size="icon"
              onClick={share}
              aria-label={t('item.share')}
              title={shared ? t('item.shareCopied') : t('item.share')}
              className="h-9 w-9"
            >
              {shared ? <Check className="size-4 text-success" /> : <Share2 className="size-4" />}
            </Button>
            <span className="sr-only" aria-live="polite">
              {shared ? t('item.shareCopied') : ''}
            </span>
          </div>
        </div>
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
            {canFullscreen && (
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleFullscreen}
                aria-label={isFullscreen ? t('item.exitFullscreen') : t('item.fullscreen')}
                title={isFullscreen ? t('item.exitFullscreen') : t('item.fullscreen')}
              >
                {isFullscreen ? <Minimize2 className="size-4" /> : <Maximize2 className="size-4" />}
              </Button>
            )}
          </div>
        </div>
        <div className="flex-1 bg-surface-2 p-3 sm:p-4">
          <div
            className={cn(
              '@container mx-auto',
              isFullscreen ? 'h-full' : 'h-[min(70vh,560px)]',
              'overflow-hidden rounded-xl border border-line bg-bg transition-[max-width] duration-300',
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
          <Tabs.Trigger value="code" className={tabClass}>
            {t('item.code')}
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
            <PromptPanel prompt={text.prompt} lang={currentLanguage()} />
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
        <Tabs.Content value="code" className="pt-5">
          <CodePanel id={item.id} />
        </Tabs.Content>
      </Tabs.Root>

      <nav aria-label={t('item.prev') + ' / ' + t('item.next')} className="grid grid-cols-2 gap-3">
        {(
          [
            { to: prev, label: t('item.prev'), dir: 'prev' },
            { to: next, label: t('item.next'), dir: 'next' },
          ] as const
        ).map(({ to, label, dir }) => (
          <Link
            key={dir}
            to={`/item/${to.id}`}
            className={cn(
              'flex flex-col gap-0.5 rounded-2xl border border-line bg-surface p-4 transition-colors hover:border-accent/40',
              dir === 'prev' ? 'items-start text-left' : 'items-end text-right',
            )}
          >
            <span className="flex items-center gap-1 text-xs text-muted">
              {dir === 'prev' && <ChevronLeft className="size-3.5" aria-hidden />}
              {label}
              {dir === 'next' && <ChevronRight className="size-3.5" aria-hidden />}
            </span>
            <span className="line-clamp-1 font-medium">{itemText(to, currentLanguage()).name}</span>
          </Link>
        ))}
      </nav>

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
