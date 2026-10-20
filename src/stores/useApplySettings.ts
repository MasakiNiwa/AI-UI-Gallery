import { useEffect, useSyncExternalStore } from 'react';
import i18n, { detectLanguage } from '@/i18n';
import { useSettings } from './settings';

const darkQuery = () => window.matchMedia('(prefers-color-scheme: dark)');

function useSystemDark() {
  return useSyncExternalStore(
    (cb) => {
      const mq = darkQuery();
      mq.addEventListener('change', cb);
      return () => mq.removeEventListener('change', cb);
    },
    () => darkQuery().matches,
  );
}

/** Resolved theme (system preference applied). */
export function useIsDark() {
  const theme = useSettings((s) => s.theme);
  const systemDark = useSystemDark();
  return theme === 'dark' || (theme === 'system' && systemDark);
}

/** Syncs persisted settings to the document (theme, motion) and to i18next (language). */
export function useApplySettings() {
  const isDark = useIsDark();
  const language = useSettings((s) => s.language);
  const reduceMotion = useSettings((s) => s.reduceMotion);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark);
  }, [isDark]);

  useEffect(() => {
    document.documentElement.classList.toggle('reduce-motion', reduceMotion);
  }, [reduceMotion]);

  useEffect(() => {
    const lng = language === 'auto' ? detectLanguage() : language;
    if (i18n.language !== lng) void i18n.changeLanguage(lng);
    document.documentElement.lang = lng;
  }, [language]);
}
