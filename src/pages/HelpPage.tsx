import { BookOpen, Code, Cpu, ExternalLink, Heart, Info, Lightbulb, Scale } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Logo } from '@/components/layout/Logo';
import { Accordion, AccordionSection } from '@/components/ui/Accordion';
import { buttonClass } from '@/components/ui/buttonClass';
import { APP_INFO } from '@/lib/appInfo';

interface LicenseEntry {
  name: string;
  version: string;
  license: string;
  repository: string | null;
  licenseText: string | null;
}

function useLicenses() {
  const [state, setState] = useState<LicenseEntry[] | 'loading' | 'unavailable'>('loading');
  useEffect(() => {
    // Generated at build time by rollup-plugin-license (see vite.config.ts).
    fetch(`${import.meta.env.BASE_URL}licenses.json`)
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error(String(r.status)))))
      .then((data: LicenseEntry[]) => setState(data))
      .catch(() => setState('unavailable'));
  }, []);
  return state;
}

function Credits() {
  const { t } = useTranslation();
  const licenses = useLicenses();
  if (licenses === 'loading') return <p className="text-muted">{t('help.creditsLoading')}</p>;
  if (licenses === 'unavailable')
    return <p className="text-muted">{t('help.creditsUnavailable')}</p>;
  return (
    <ul className="divide-y divide-line rounded-xl border border-line">
      {licenses.map((l) => (
        <li key={`${l.name}@${l.version}`} className="px-3 py-2.5">
          <div className="flex flex-wrap items-baseline justify-between gap-x-3">
            {l.repository ? (
              <a
                href={l.repository}
                target="_blank"
                rel="noreferrer"
                className="font-medium text-accent hover:underline"
              >
                {l.name}
              </a>
            ) : (
              <span className="font-medium">{l.name}</span>
            )}
            <span className="text-xs text-muted">
              v{l.version} · {l.license}
            </span>
          </div>
          {l.licenseText && (
            <details className="mt-1.5">
              <summary className="cursor-pointer text-xs text-muted hover:text-fg">
                {t('help.showLicense')}
              </summary>
              <pre className="mt-2 max-h-60 overflow-auto rounded-lg bg-surface-2 p-3 text-xs whitespace-pre-wrap">
                {l.licenseText}
              </pre>
            </details>
          )}
        </li>
      ))}
    </ul>
  );
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="list-disc space-y-1.5 pl-5">
      {items.map((s) => (
        <li key={s}>{s}</li>
      ))}
    </ul>
  );
}

export function HelpPage() {
  const { t, i18n } = useTranslation();
  const buildDate = new Date(APP_INFO.buildTime).toLocaleString(i18n.language);
  const list = (key: string) => t(key, { returnObjects: true }) as string[];

  return (
    <div className="flex flex-col gap-5">
      <h1 className="text-2xl font-bold">{t('help.title')}</h1>

      <section className="flex items-center gap-4 rounded-2xl border border-line bg-gradient-to-br from-accent-soft to-surface p-5">
        <Logo className="size-14 shrink-0" />
        <div className="min-w-0">
          <p className="text-lg font-semibold">{t('app.name')}</p>
          <p className="text-sm text-muted">{t('app.tagline')}</p>
          <dl className="mt-2 grid grid-cols-[auto_1fr] gap-x-3 gap-y-0.5 text-xs">
            <dt className="text-muted">{t('help.version')}</dt>
            <dd className="font-mono">v{APP_INFO.version}</dd>
            <dt className="text-muted">{t('help.build')}</dt>
            <dd className="font-mono">{buildDate}</dd>
            <dt className="text-muted">{t('help.commit')}</dt>
            <dd className="font-mono">{APP_INFO.commit}</dd>
            <dt className="text-muted">{t('help.license')}</dt>
            <dd className="font-mono">{APP_INFO.license}</dd>
          </dl>
        </div>
      </section>

      <Accordion>
        <AccordionSection value="about" title={t('help.about')} icon={Info}>
          <p>{t('help.aboutBody')}</p>
        </AccordionSection>
        <AccordionSection value="how" title={t('help.howToUse')} icon={BookOpen}>
          <BulletList items={list('help.howToUseItems')} />
        </AccordionSection>
        <AccordionSection value="tips" title={t('help.promptTips')} icon={Lightbulb}>
          <BulletList items={list('help.promptTipsItems')} />
        </AccordionSection>
        <AccordionSection value="tech" title={t('help.technology')} icon={Cpu}>
          <p>{t('help.technologyBody')}</p>
        </AccordionSection>
        <AccordionSection value="source" title={t('help.source')} icon={Code}>
          <p className="mb-3">{t('help.sourceBody')}</p>
          <a
            href={APP_INFO.repoUrl}
            target="_blank"
            rel="noreferrer"
            className={buttonClass('secondary')}
          >
            <ExternalLink className="size-4" aria-hidden />
            {t('help.openRepo')}
          </a>
        </AccordionSection>
        <AccordionSection value="credits" title={t('help.credits')} icon={Heart}>
          <p className="mb-3">{t('help.creditsBody')}</p>
          <Credits />
        </AccordionSection>
        <AccordionSection value="license" title={t('help.appLicense')} icon={Scale}>
          <p>{t('help.appLicenseBody')}</p>
        </AccordionSection>
      </Accordion>
    </div>
  );
}
