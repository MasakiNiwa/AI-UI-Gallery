import type { ItemMeta } from '../../types';

const meta: ItemMeta = {
  id: 'magnetic-button',
  category: 'buttons',
  tags: ['button', 'magnetic', 'hover', 'cursor', 'micro-interaction'],
  difficulty: 'medium',
  tech: ['Pointer events', 'CSS transform'],
  addedAt: '2026-10-20',
  text: {
    en: {
      name: 'Magnetic Button',
      summary: 'A button that is pulled toward the cursor when it comes close, then springs back.',
      description:
        'A magnetic button follows the pointer slightly when it hovers nearby, as if attracted by a magnet, and its label moves a bit further than the button itself for a sense of depth. It is a playful micro-interaction often seen on creative portfolio and agency sites.\n\nThe offset between the pointer and the button center is scaled down and applied with transform: translate(). When the pointer leaves, a spring-like CSS transition brings the button back to its place.',
      prompt:
        'Create a "magnetic" call-to-action button.\n- When the pointer is within the button area (plus a 40px margin), the button moves toward the pointer by 30% of the distance from its center\n- The label inside moves 50% for a parallax effect\n- When the pointer leaves, it springs back with a cubic-bezier transition that slightly overshoots\n- Use transform only (no layout changes) and requestAnimationFrame\n- Disable the effect on touch devices and with prefers-reduced-motion\nUse HTML, CSS and vanilla JavaScript.',
      tips: [
        'Add a circle that follows the cursor and grows over the button.',
        'Use GSAP quickTo for smoother motion.',
        'Apply it to a row of social icons.',
      ],
    },
    ja: {
      name: 'マグネティックボタン',
      summary: 'カーソルが近づくと引き寄せられ、離れるとバネのように戻るボタン。',
      description:
        'マグネティックボタンは、ポインターが近くに来ると磁石に引かれるように少しだけ追いかけてくるボタンです。中のラベルはボタン本体よりも大きく動くので、奥行きが感じられます。クリエイティブ系のポートフォリオや制作会社のサイトでよく見かける、遊び心のあるマイクロインタラクションです。\n\nポインターとボタン中心のずれを縮小して transform: translate() で適用します。ポインターが離れると、バネのようなCSSトランジションで元の位置に戻ります。',
      prompt:
        '「マグネティック」な行動喚起ボタンを作ってください。\n- ポインターがボタンの範囲(+周囲40px)に入ると、中心からの距離の30%だけボタンがポインターの方へ動く\n- 中のラベルは50%動かして視差効果を出す\n- ポインターが離れたら、少し行き過ぎる cubic-bezier のトランジションでバネのように戻る\n- transform だけを使い(レイアウトは変えない)、requestAnimationFrame で更新\n- タッチ端末と prefers-reduced-motion では効果を無効化\nHTML・CSS・素のJavaScriptで実装してください。',
      tips: [
        'カーソルを追いかけ、ボタンの上で大きくなる円を追加して',
        'GSAPのquickToでより滑らかに動かして',
        'SNSアイコンの列に適用して',
      ],
    },
  },
};

export default meta;
