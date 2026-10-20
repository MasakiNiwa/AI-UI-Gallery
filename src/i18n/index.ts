import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';
import en from './locales/en.json';
import ja from './locales/ja.json';

import { SUPPORTED_LANGUAGES, type Language } from './languages';

export { SUPPORTED_LANGUAGES, type Language };

const detector = new LanguageDetector();

/** Language from the browser environment, narrowed to a supported one (English as fallback). */
export function detectLanguage(): Language {
  const candidates = navigator.languages?.length ? navigator.languages : [navigator.language];
  for (const c of candidates) {
    const base = c?.toLowerCase().split('-')[0];
    if ((SUPPORTED_LANGUAGES as readonly string[]).includes(base)) return base as Language;
  }
  return 'en';
}

void i18n
  .use(detector)
  .use(initReactI18next)
  .init({
    resources: { en: { translation: en }, ja: { translation: ja } },
    supportedLngs: SUPPORTED_LANGUAGES,
    nonExplicitSupportedLngs: true,
    fallbackLng: 'en',
    // Language choice is persisted by the settings store, so the detector only reads the browser.
    detection: { order: ['navigator'], caches: [] },
    interpolation: { escapeValue: false },
  });

export function currentLanguage(): Language {
  const base = (i18n.resolvedLanguage ?? i18n.language ?? 'en').split('-')[0];
  return (SUPPORTED_LANGUAGES as readonly string[]).includes(base) ? (base as Language) : 'en';
}

export default i18n;
