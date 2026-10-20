import { describe, expect, it } from 'vitest';
import { buildPrompt } from './promptBuilder';

const PROMPT = 'Create a button.\n- Ripple effect\nUse React and Tailwind CSS.';

describe('buildPrompt', () => {
  it('keeps the prompt unchanged by default', () => {
    expect(buildPrompt(PROMPT, 'en', 'original', []).text).toBe(PROMPT);
  });

  it('replaces the stack line', () => {
    const built = buildPrompt(PROMPT, 'en', 'vue', []);
    expect(built.text).not.toContain('Use React and Tailwind CSS.');
    expect(built.text.split('\n').at(-1)).toMatch(/^Use Vue 3/);
  });

  it('appends extras in a stable order', () => {
    const built = buildPrompt(PROMPT, 'ja', 'original', ['comments', 'a11y']);
    expect(built.added).toHaveLength(2);
    expect(built.added[0]).toContain('アクセシビリティ');
    expect(built.text.startsWith(PROMPT)).toBe(true);
  });
});
