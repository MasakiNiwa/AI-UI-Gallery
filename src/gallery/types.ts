import type { ComponentType } from 'react';
import type { Language } from '@/i18n/languages';

export const CATEGORY_IDS = [
  'buttons',
  'inputs',
  'cards',
  'navigation',
  'feedback',
  'data',
  'animation',
  'effects',
  'layout',
  'games',
] as const;
export type CategoryId = (typeof CATEGORY_IDS)[number];

export type Difficulty = 'easy' | 'medium' | 'hard';

/** Text shown for an item, written once per language. */
export interface ItemText {
  /** Display name of the UI pattern. */
  name: string;
  /** One-line summary shown on cards. */
  summary: string;
  /** Longer explanation: what it is, when to use it, how it works. */
  description: string;
  /** An example prompt you can give an AI to build this UI. */
  prompt: string;
  /** Optional tips for tweaking the result through follow-up prompts. */
  tips?: string[];
}

export interface ItemMeta {
  /** Unique id, also used in the URL. Must equal the folder name. */
  id: string;
  category: CategoryId;
  tags: string[];
  difficulty: Difficulty;
  /** Web platform technology the demo relies on (e.g. "CSS", "Canvas", "WebGL", "Web Worker"). */
  tech: string[];
  /** ISO date the item was added; used for "newest" sorting. */
  addedAt: string;
  /** English is required; other languages fall back to English when missing. */
  text: { en: ItemText } & Partial<Record<Exclude<Language, 'en'>, ItemText>>;
}

export interface DemoProps {
  /** "preview" = scaled-down, non-interactive render inside a gallery card. */
  mode: 'preview' | 'full';
}

export type DemoComponent = ComponentType<DemoProps>;

export interface GalleryItem extends ItemMeta {
  /** Lazily loads the live demo component. */
  loadDemo: () => Promise<{ default: DemoComponent }>;
}
