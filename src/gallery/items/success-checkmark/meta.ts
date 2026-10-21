import type { ItemMeta } from '../../types';

const meta: ItemMeta = {
  id: 'success-checkmark',
  category: 'animation',
  tags: [
    'checkmark',
    'success',
    'stroke animation',
    'SVG',
    'payment complete',
    'micro-interaction',
  ],
  difficulty: 'easy',
  tech: ['SVG stroke-dashoffset', 'CSS keyframes'],
  addedAt: '2026-10-22',
  text: {
    en: {
      name: 'Success Checkmark Animation',
      summary:
        'A circle draws itself, a checkmark strokes in and a burst of dots celebrates a completed payment.',
      description:
        'A short, satisfying animation tells people their action worked. Here the circle and the check are SVG paths animated with stroke-dasharray and stroke-dashoffset: each path starts fully "dashed out" and its offset animates to zero, so it appears to be drawn by a pen.\n\nThe steps are chained with animation delays: the ring draws, the circle fills with a gentle scale bounce, the check strokes in, and small dots burst outward. The same component also shows an error state with a cross and a shake. Everything is CSS, so it costs almost nothing, and it is skipped when reduced motion is preferred.',
      prompt:
        'Create an animated success checkmark for a "Payment complete" screen.\n- SVG: a circle and a checkmark path; animate them with stroke-dasharray / stroke-dashoffset so they look hand-drawn (ring 0.6s, then check 0.35s)\n- After the ring draws, fill the circle green with a small scale bounce, then burst 8 dots outward and fade them\n- Below it, fade/slide in a title, the amount and a summary card\n- Add an error variant (red circle, an X drawn in two strokes, a short horizontal shake) and a toggle to replay success / error\n- Pure CSS keyframes chained with animation-delay; respect prefers-reduced-motion\nUse React and CSS.',
      tips: [
        'Add a gentle haptic vibration on mobile.',
        'Use the animation inside a submit button.',
        'Make the confetti burst with brand colors.',
      ],
    },
    ja: {
      name: '完了チェックマークのアニメーション',
      summary: '円が描かれ、チェックマークが引かれ、点が弾けて支払いの完了を祝う。',
      description:
        '短く心地よいアニメーションは、操作がうまくいったことを伝えます。ここでは円とチェックがSVGのパスで、stroke-dasharray と stroke-dashoffset でアニメーションします。各パスは線がすべて「隠れた」状態から始まり、オフセットが0に向かうことで、ペンで描かれていくように見えます。\n\n各ステップは animation-delay でつながっています。輪が描かれ、円が軽く弾みながら塗られ、チェックが引かれ、小さな点が外へ弾けます。同じコンポーネントで、×印と揺れを使ったエラー状態も表示できます。すべてCSSなので負荷はほとんどなく、視差効果を減らす設定のときは省略します。',
      prompt:
        '「支払い完了」画面のための、アニメーションする完了チェックマークを作ってください。\n- SVG:円とチェックマークのパス。stroke-dasharray / stroke-dashoffset でアニメーションし、手で描いたように見せる(輪は0.6秒、続いてチェックは0.35秒)\n- 輪を描いた後、円を緑で塗りつつ小さく弾ませ、8個の点を外へ弾けさせてフェード\n- その下に、タイトル、金額、内容のカードをフェード/スライドで表示\n- エラー版(赤い円、2本の線で描く×印、短い横揺れ)と、成功/エラーを再生し直す切り替えを追加\n- animation-delay でつないだ純粋なCSSキーフレームで。prefers-reduced-motion に配慮\nReactとCSSで実装してください。',
      tips: [
        'スマホでは軽く振動させて',
        'このアニメーションを送信ボタンの中で使って',
        '紙吹雪をブランドカラーで弾けさせて',
      ],
    },
  },
};

export default meta;
