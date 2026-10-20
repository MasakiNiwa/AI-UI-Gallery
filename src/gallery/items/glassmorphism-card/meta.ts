import type { ItemMeta } from '../../types';

const meta: ItemMeta = {
  id: 'glassmorphism-card',
  category: 'cards',
  tags: ['glassmorphism', 'frosted glass', 'backdrop-filter', 'card'],
  difficulty: 'easy',
  tech: ['CSS backdrop-filter'],
  addedAt: '2026-10-20',
  text: {
    en: {
      name: 'Glassmorphism Card',
      summary: 'A frosted-glass card floating over soft, slowly moving color blobs.',
      description:
        'Glassmorphism imitates frosted glass: a semi-transparent surface that blurs whatever is behind it, with a subtle light border. It works best over colorful backgrounds, where the blur creates depth.\n\nThe key ingredient is the CSS backdrop-filter: blur() property, combined with a translucent background color and a thin, light border. Keep text contrast high so the card stays readable.',
      prompt:
        'Make a glassmorphism profile card.\n- Background: three large, blurred, softly colored circles that drift slowly\n- Card: semi-transparent white background, backdrop-filter: blur(16px), 1px light border, large border radius, soft shadow\n- Card content: avatar, name, role, short bio and two buttons\n- Ensure the text has enough contrast\n- Provide a fallback for browsers without backdrop-filter\n- Responsive, centered on the screen\nUse HTML and CSS only.',
      tips: [
        'Make the blobs follow the mouse slowly.',
        'Create a dark mode version with a tinted glass.',
        'Turn it into a pricing card layout with three plans.',
      ],
    },
    ja: {
      name: 'グラスモーフィズムカード',
      summary: 'ゆっくり動く色の玉の上に浮かぶ、すりガラス風のカード。',
      description:
        'グラスモーフィズムは、すりガラスを模したデザインです。半透明の面が背後をぼかして映し、うっすら光る縁取りを持ちます。カラフルな背景の上で使うと、ぼかしによって奥行きが生まれます。\n\n要となるのはCSSの backdrop-filter: blur() で、半透明の背景色と細く明るい枠線を組み合わせます。カードの文字が読みにくくならないよう、コントラストは高めに保ちましょう。',
      prompt:
        'グラスモーフィズムのプロフィールカードを作ってください。\n- 背景:ぼかした大きな円を3つ、柔らかい色で配置し、ゆっくり漂わせる\n- カード:半透明の白い背景、backdrop-filter: blur(16px)、1pxの明るい枠線、大きめの角丸、柔らかい影\n- カードの内容:アバター、名前、役職、短い自己紹介、ボタン2つ\n- 文字のコントラストを十分に確保する\n- backdrop-filter 非対応ブラウザ向けの代替スタイルを用意\n- レスポンシブで画面中央に配置\nHTMLとCSSだけで実装してください。',
      tips: [
        '色の玉がマウスをゆっくり追いかけるようにして',
        '色付きガラスのダークモード版を作って',
        '3プランの料金カードのレイアウトにして',
      ],
    },
  },
};

export default meta;
