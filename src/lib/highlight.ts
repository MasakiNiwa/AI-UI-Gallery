import type { HighlighterCore } from 'shiki/core';

let highlighter: Promise<HighlighterCore> | null = null;

/**
 * Lazily creates a small Shiki highlighter (TSX only, two themes, JavaScript regex engine — no WASM),
 * so syntax highlighting costs nothing until the Code tab is opened.
 */
function getHighlighter() {
  highlighter ??= (async () => {
    const [{ createHighlighterCore }, { createJavaScriptRegexEngine }] = await Promise.all([
      import('shiki/core'),
      import('shiki/engine/javascript'),
    ]);
    return createHighlighterCore({
      themes: [
        import('@shikijs/themes/github-light'),
        import('@shikijs/themes/github-dark-dimmed'),
      ],
      langs: [import('@shikijs/langs/tsx')],
      engine: createJavaScriptRegexEngine(),
    });
  })();
  return highlighter;
}

/** Returns highlighted HTML using CSS variables for both themes (switched by the `.dark` class). */
export async function highlightTsx(code: string): Promise<string> {
  const h = await getHighlighter();
  return h.codeToHtml(code, {
    lang: 'tsx',
    themes: { light: 'github-light', dark: 'github-dark-dimmed' },
    defaultColor: false,
  });
}
