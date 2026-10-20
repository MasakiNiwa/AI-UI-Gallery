import type { ItemMeta } from '../../types';

const meta: ItemMeta = {
  id: 'flip-card',
  category: 'cards',
  tags: ['flip', 'card', '3d', 'flashcard', 'backface-visibility'],
  difficulty: 'easy',
  tech: ['CSS 3D transform', 'backface-visibility'],
  addedAt: '2026-10-20',
  text: {
    en: {
      name: 'Flip Card',
      summary: 'Cards that turn over in 3D to reveal content on the back, like flashcards.',
      description:
        'A flip card has two faces. Clicking (or hovering) rotates it 180° around the Y axis to show the back side, which is useful for flashcards, team member bios or "reveal the answer" interactions.\n\nBoth faces are stacked in the same place; the back is pre-rotated by 180°, and backface-visibility: hidden hides whichever face is turned away. The container needs perspective for the 3D look, and the cards should be buttons with aria-pressed so keyboard users can flip them too.',
      prompt:
        'Create a set of vocabulary flashcards that flip in 3D.\n- Front: a word in large text; back: its meaning and an example sentence\n- Click, Enter or Space flips the card with a 600ms rotateY(180deg) transition\n- Use perspective on the container, transform-style: preserve-3d, and backface-visibility: hidden on both faces\n- Each card is a button with aria-pressed reflecting the flipped state\n- Show 3 cards in a responsive grid, plus a "Flip all" button\n- With prefers-reduced-motion, cross-fade instead of rotating\nUse HTML, CSS and JavaScript.',
      tips: [
        'Flip vertically (rotateX) instead.',
        'Add a "shuffle" button that animates the cards to new positions.',
        'Track which cards the user marked as learned.',
      ],
    },
    ja: {
      name: 'フリップカード',
      summary: '単語カードのように、立体的に裏返って裏面の内容を見せるカード。',
      description:
        'フリップカードは表と裏の2つの面を持つカードです。クリック(またはホバー)するとY軸まわりに180°回転して裏面が現れます。単語カード、メンバー紹介、「答えを見る」といった演出に便利です。\n\n2つの面は同じ位置に重ね、裏面はあらかじめ180°回転させておき、backface-visibility: hidden で向こう側を向いた面を隠します。立体的に見せるには親要素に perspective が必要です。カードは aria-pressed 付きのボタンにすると、キーボードでも裏返せます。',
      prompt:
        '3Dで裏返る英単語の暗記カードを作ってください。\n- 表:大きな文字で単語、裏:意味と例文\n- クリック、Enter、Spaceで、600msの rotateY(180deg) トランジションで裏返る\n- 親要素に perspective、transform-style: preserve-3d、両面に backface-visibility: hidden を使う\n- 各カードは、裏返った状態を aria-pressed で示すボタンにする\n- レスポンシブなグリッドにカードを3枚並べ、「すべて裏返す」ボタンも用意\n- prefers-reduced-motion では回転の代わりにクロスフェード\nHTML・CSS・JavaScriptで実装してください。',
      tips: [
        '縦方向(rotateX)に裏返るようにして',
        'カードを新しい位置へアニメーションで動かす「シャッフル」ボタンを追加して',
        '覚えたカードに印を付けられるようにして',
      ],
    },
  },
};

export default meta;
