import type { ItemMeta } from '../../types';

const meta: ItemMeta = {
  id: 'ripple-button',
  category: 'buttons',
  tags: ['button', 'ripple', 'material', 'click effect'],
  difficulty: 'easy',
  tech: ['CSS animation', 'JavaScript'],
  addedAt: '2026-10-20',
  text: {
    en: {
      name: 'Ripple Button',
      summary: 'Buttons that spread a ripple from the exact point you click or tap.',
      description:
        'A ripple button gives instant visual feedback: a circle expands from the pointer position and fades out. The effect was popularized by Material Design and makes taps feel responsive, especially on touch screens.\n\nThe ripple is a temporary element positioned at the click coordinates and scaled up with a CSS animation, then removed when the animation ends.',
      prompt:
        'Create a set of buttons with a Material Design style ripple effect.\n- When clicked, a circular ripple expands from the exact click position and fades out\n- Provide filled, outlined and text button variants\n- Support multiple quick clicks (each click creates its own ripple)\n- Remove ripple elements after the animation ends\n- Work with mouse, touch and keyboard (Enter/Space ripple from the center)\n- Respect prefers-reduced-motion\nUse plain HTML, CSS and JavaScript.',
      tips: [
        'Make the ripple color follow the button text color.',
        'Turn it into a reusable React component.',
        'Add an icon button and a loading state.',
      ],
    },
    ja: {
      name: 'リップルボタン',
      summary: 'クリックやタップした位置から波紋が広がるボタン。',
      description:
        'リップルボタンは、押した位置から円が広がって消えていくことで、操作したことをすぐに伝えるボタンです。マテリアルデザインで広く知られるようになった表現で、特にタッチ操作の手応えを良くしてくれます。\n\n仕組みは、クリック座標に一時的な円要素を置き、CSSアニメーションで拡大・フェードアウトさせ、終わったら削除するというシンプルなものです。',
      prompt:
        'マテリアルデザイン風のリップルエフェクト付きボタンを作ってください。\n- クリックした位置から円形の波紋が広がり、フェードアウトする\n- 塗りつぶし・アウトライン・テキストの3種類のボタン\n- 素早く連打しても、クリックごとに波紋が出る\n- アニメーション終了後に波紋の要素を削除する\n- マウス・タッチ・キーボード(Enter/Spaceでは中央から波紋)に対応\n- prefers-reduced-motion に配慮する\n素のHTML・CSS・JavaScriptで実装してください。',
      tips: [
        '波紋の色をボタンの文字色に合わせて',
        '再利用できるReactコンポーネントにして',
        'アイコンボタンとローディング状態を追加して',
      ],
    },
  },
};

export default meta;
