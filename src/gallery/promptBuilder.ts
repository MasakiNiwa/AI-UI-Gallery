import type { Language } from '@/i18n/languages';

/*
 * Convention (enforced by registry.test.ts): the last line of every prompt names the tech stack,
 * e.g. "Use React and Tailwind CSS." / "ReactとTailwind CSSで実装してください。". The builder swaps that
 * line for the stack the user picked and appends optional requirements.
 */

export const STACKS = ['original', 'html', 'react', 'vue', 'svelte'] as const;
export type Stack = (typeof STACKS)[number];

export const EXTRAS = ['a11y', 'darkMode', 'responsive', 'comments'] as const;
export type Extra = (typeof EXTRAS)[number];

const STACK_LINES: Record<Language, Record<Exclude<Stack, 'original'>, string>> = {
  en: {
    html: 'Use plain HTML, CSS and JavaScript in a single file, without frameworks.',
    react: 'Use React with TypeScript and Tailwind CSS.',
    vue: 'Use Vue 3 (Composition API with <script setup lang="ts">) and Tailwind CSS.',
    svelte: 'Use Svelte 5 with TypeScript and Tailwind CSS.',
  },
  ja: {
    html: 'フレームワークを使わず、素のHTML・CSS・JavaScriptで1つのファイルに実装してください。',
    react: 'React(TypeScript)とTailwind CSSで実装してください。',
    vue: 'Vue 3(Composition API、<script setup lang="ts">)とTailwind CSSで実装してください。',
    svelte: 'Svelte 5(TypeScript)とTailwind CSSで実装してください。',
  },
};

const EXTRA_LINES: Record<Language, Record<Extra, string>> = {
  en: {
    a11y: 'Make it accessible (WCAG 2.2 AA): semantic HTML, full keyboard support and ARIA where needed.',
    darkMode: 'Support light and dark mode with prefers-color-scheme.',
    responsive: 'Make it responsive from a 320px-wide phone to a wide desktop screen.',
    comments: 'Add short comments explaining the key parts of the code.',
  },
  ja: {
    a11y: 'アクセシビリティ(WCAG 2.2 AA相当)に対応してください:セマンティックなHTML、キーボード操作、必要に応じてARIA。',
    darkMode: 'prefers-color-scheme を使ってライト/ダークモードに対応してください。',
    responsive: '幅320pxのスマホから広いPC画面までレスポンシブに対応してください。',
    comments: 'コードの要所に短いコメントを付けてください。',
  },
};

export interface BuiltPrompt {
  /** The original prompt, with its stack line replaced when a stack was chosen. */
  base: string;
  /** Lines added by the builder (shown highlighted in the UI). */
  added: string[];
  /** Full text to copy. */
  text: string;
}

export function buildPrompt(
  prompt: string,
  lang: Language,
  stack: Stack,
  extras: readonly Extra[],
): BuiltPrompt {
  const lines = prompt.split('\n');
  const added: string[] = [];
  if (stack !== 'original') {
    lines.pop();
    added.push(STACK_LINES[lang][stack]);
  }
  for (const extra of EXTRAS) if (extras.includes(extra)) added.push(EXTRA_LINES[lang][extra]);
  const base = lines.join('\n');
  return { base, added, text: [base, ...added].join('\n') };
}
