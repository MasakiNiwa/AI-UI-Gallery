import { ArrowRight, BookOpen, Copy, Search } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router';
import { ItemGrid } from '@/components/gallery/ItemCard';
import { buttonClass } from '@/components/ui/buttonClass';
import { CATEGORIES } from '@/gallery/categories';
import { ITEMS } from '@/gallery/registry';

const STEPS = [
  { icon: Search, title: 'home.how1Title', desc: 'home.how1Desc' },
  { icon: BookOpen, title: 'home.how2Title', desc: 'home.how2Desc' },
  { icon: Copy, title: 'home.how3Title', desc: 'home.how3Desc' },
];

export function HomePage() {
  const { t } = useTranslation();
  const latest = ITEMS.slice(0, 6);

  return (
    <div className="flex flex-col gap-10">
      <section className="rounded-3xl border border-line bg-gradient-to-br from-accent-soft via-surface to-surface p-6 sm:p-10">
        <p className="text-sm font-medium text-accent">
          {t('app.name')} · {t('home.itemsCount', { count: ITEMS.length })}
        </p>
        <h1 className="mt-2 max-w-2xl text-2xl leading-tight font-bold sm:text-4xl">
          {t('home.heroTitle')}
        </h1>
        <p className="mt-3 max-w-2xl text-muted">{t('home.heroLead')}</p>
        <Link to="/gallery" className={buttonClass('primary', 'md', 'mt-6')}>
          {t('home.browseAll')}
          <ArrowRight className="size-4" aria-hidden />
        </Link>
      </section>

      <section aria-labelledby="home-categories">
        <h2 id="home-categories" className="mb-3 text-lg font-semibold">
          {t('home.categories')}
        </h2>
        <ul className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-5">
          {CATEGORIES.map(({ id, icon: Icon }) => (
            <li key={id}>
              <Link
                to={`/gallery?category=${id}`}
                className="flex h-full items-center gap-3 rounded-2xl border border-line bg-surface p-3 text-sm transition-colors hover:border-accent/40 hover:bg-surface-2"
              >
                <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-accent-soft text-accent">
                  <Icon className="size-5" aria-hidden />
                </span>
                <span className="min-w-0">
                  <span className="block truncate font-medium">{t(`categories.${id}`)}</span>
                  <span className="text-xs text-muted">
                    {t('home.itemsCount', {
                      count: ITEMS.filter((i) => i.category === id).length,
                    })}
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="home-latest">
        <div className="mb-3 flex items-baseline justify-between">
          <h2 id="home-latest" className="text-lg font-semibold">
            {t('home.latest')}
          </h2>
          <Link to="/gallery" className="text-sm text-accent hover:underline">
            {t('home.seeAll')}
          </Link>
        </div>
        <ItemGrid items={latest} />
      </section>

      <section aria-labelledby="home-how">
        <h2 id="home-how" className="mb-3 text-lg font-semibold">
          {t('home.howTitle')}
        </h2>
        <ol className="grid gap-3 sm:grid-cols-3">
          {STEPS.map(({ icon: Icon, title, desc }, i) => (
            <li key={title} className="rounded-2xl border border-line bg-surface p-4">
              <div className="flex items-center gap-2 font-medium">
                <span className="flex size-7 items-center justify-center rounded-full bg-accent-soft text-xs text-accent">
                  {i + 1}
                </span>
                <Icon className="size-4 text-accent" aria-hidden />
                {t(title)}
              </div>
              <p className="mt-2 text-sm text-muted">{t(desc)}</p>
            </li>
          ))}
        </ol>
      </section>
    </div>
  );
}
