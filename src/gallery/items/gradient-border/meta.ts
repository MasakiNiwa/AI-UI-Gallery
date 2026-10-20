import type { ItemMeta } from '../../types';

const meta: ItemMeta = {
  id: 'gradient-border',
  category: 'effects',
  tags: ['gradient border', 'conic-gradient', 'glow', '@property', 'animated border'],
  difficulty: 'medium',
  tech: ['CSS @property', 'conic-gradient'],
  addedAt: '2026-10-20',
  text: {
    en: {
      name: 'Animated Gradient Border',
      summary: 'Cards and buttons with a glowing border of colors that rotates around the edge.',
      description:
        'A rotating gradient border draws a band of color that travels around the edge of a card or button, often with a soft glow behind it. It is an eye-catching way to highlight a featured plan, an AI feature or a primary call to action.\n\nThe border is a conic-gradient whose start angle is animated. Registering the angle as a typed custom property with @property lets the browser interpolate it smoothly in a CSS animation. The content sits on an inner layer so only a thin ring of the gradient shows, and a blurred copy of the gradient behind creates the glow.',
      prompt:
        'Create a card and a button with an animated rotating gradient border, using CSS only.\n- Register a custom property with @property --angle { syntax: "<angle>"; initial-value: 0deg; inherits: false; }\n- Border: background conic-gradient(from var(--angle), …colors…) on an outer element with 2px padding; the inner element has the card background and slightly smaller radius\n- Animate --angle from 0deg to 360deg over 4s, linear, infinite\n- Add a soft glow: a pseudo-element behind with the same gradient and filter: blur(20px), low opacity\n- The button version speeds up on hover\n- Fall back to a static gradient border if @property is unsupported; pause for prefers-reduced-motion\nUse HTML and CSS.',
      tips: [
        'Show the gradient only on a short arc, like a comet tail.',
        'Make the glow follow the mouse position.',
        'Apply it to an input field on focus.',
      ],
    },
    ja: {
      name: 'アニメーションするグラデーション枠',
      summary: '色の帯が縁をぐるりと回る、光るグラデーションの枠を持つカードとボタン。',
      description:
        '回転するグラデーション枠は、カードやボタンの縁を色の帯が回り続ける表現で、背後に柔らかな光を添えることもよくあります。おすすめプラン・AI機能・主要な行動喚起ボタンを目立たせるのに効果的です。\n\n枠は conic-gradient で描き、その開始角度をアニメーションさせます。角度を @property で型付きのカスタムプロパティとして登録すると、ブラウザがCSSアニメーションで滑らかに補間してくれます。中身は内側の層に置き、グラデーションが細い輪としてだけ見えるようにします。背後にぼかしたグラデーションを重ねると光が生まれます。',
      prompt:
        'CSSだけで、回転するグラデーションの枠を持つカードとボタンを作ってください。\n- @property --angle { syntax: "<angle>"; initial-value: 0deg; inherits: false; } でカスタムプロパティを登録\n- 枠:外側の要素に background: conic-gradient(from var(--angle), …色…) と2pxのpadding。内側の要素にカードの背景と、少し小さい角丸\n- --angle を0degから360degまで、4秒・線形・無限でアニメーション\n- 柔らかな光:同じグラデーションに filter: blur(20px) をかけた疑似要素を背後に、低い不透明度で\n- ボタン版はホバー時に回転が速くなる\n- @property 非対応の場合は静止したグラデーション枠に。prefers-reduced-motion では止める\nHTMLとCSSで実装してください。',
      tips: [
        '彗星の尾のように、短い弧の部分だけグラデーションを見せて',
        '光がマウスの位置を追いかけるようにして',
        '入力欄のフォーカス時に適用して',
      ],
    },
  },
};

export default meta;
