import type { ItemMeta } from '../../types';

const meta: ItemMeta = {
  id: 'text-scramble',
  category: 'animation',
  tags: ['text scramble', 'decode', 'glitch', 'hacker', 'text effect'],
  difficulty: 'medium',
  tech: ['requestAnimationFrame', 'JavaScript'],
  addedAt: '2026-10-20',
  text: {
    en: {
      name: 'Text Scramble Effect',
      summary: 'Text that "decodes" from random characters into the real words, letter by letter.',
      description:
        'The scramble (or decode) effect replaces each letter with random glyphs for a short time before it settles on the real character, so the text appears to be decrypted. It suits tech, security or sci-fi themes and works well for headings that cycle between phrases or for hover effects on links.\n\nEach character gets a random start and end frame; on every animation frame, characters before their end show a random glyph, and after it the real letter. Keeping a monospace or fixed-width font avoids jitter. Screen readers should read only the final text.',
      prompt:
        'Create a text scramble / decode effect.\n- A heading cycles through phrases every 3 seconds; when changing, each character scrambles through random glyphs (!<>-_\\/[]{}—=+*^?#) and resolves to the target letter at a random time within 0.8s\n- Unresolved characters use a dimmer accent color\n- Use requestAnimationFrame and cancel the previous animation when a new one starts\n- Also apply the effect to a row of nav links on hover\n- Use a monospace font to avoid width jitter; expose the final text with aria-label\n- With prefers-reduced-motion, swap the text instantly\nUse vanilla JavaScript (or React).',
      tips: [
        'Use Japanese katakana as the random glyphs.',
        'Trigger the effect when the heading scrolls into view.',
        'Add a subtle RGB glitch offset during scrambling.',
      ],
    },
    ja: {
      name: 'テキストスクランブル',
      summary: 'ランダムな文字から1文字ずつ本当の言葉に「解読」されていくテキスト。',
      description:
        'スクランブル(デコード)効果は、各文字を短いあいだランダムな記号で置き換えてから本当の文字に落ち着かせる表現で、暗号が解読されていくように見えます。テック・セキュリティ・SF系の雰囲気に合い、フレーズが切り替わる見出しや、リンクのホバー効果に向いています。\n\n各文字にランダムな開始・終了フレームを割り当て、毎フレーム、終了前の文字はランダムな記号、終了後は本来の文字を表示します。等幅フォントを使うと文字幅のガタつきを防げます。スクリーンリーダーには最終的なテキストだけを読ませます。',
      prompt:
        'テキストのスクランブル(解読)効果を作ってください。\n- 見出しが3秒ごとにフレーズを切り替え、切り替え時は各文字がランダムな記号(!<>-_\\/[]{}—=+*^?#)を経て、0.8秒以内のランダムなタイミングで目的の文字に確定する\n- 未確定の文字は薄めのアクセントカラーにする\n- requestAnimationFrame を使い、新しいアニメーションが始まったら前のものを止める\n- ナビゲーションリンクの列にも、ホバー時にこの効果を適用\n- 幅のガタつきを防ぐため等幅フォントを使い、最終的なテキストは aria-label で伝える\n- prefers-reduced-motion では即座に切り替える\n素のJavaScript(またはReact)で実装してください。',
      tips: [
        'ランダムな文字にカタカナを使って',
        '見出しが画面に入ったときに効果を発動させて',
        'スクランブル中にRGBがずれるグリッチ効果を少し加えて',
      ],
    },
  },
};

export default meta;
