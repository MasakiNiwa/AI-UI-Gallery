/** To add a language: add a locale JSON file, register it in ./index.ts, and add its name in the settings page. */
export const SUPPORTED_LANGUAGES = ['en', 'ja'] as const;
export type Language = (typeof SUPPORTED_LANGUAGES)[number];
