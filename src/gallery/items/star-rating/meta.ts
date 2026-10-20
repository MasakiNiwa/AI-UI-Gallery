import type { ItemMeta } from '../../types';

const meta: ItemMeta = {
  id: 'star-rating',
  category: 'inputs',
  tags: ['rating', 'stars', 'review', 'radio group', 'feedback'],
  difficulty: 'easy',
  tech: ['Radio inputs', 'CSS'],
  addedAt: '2026-10-20',
  text: {
    en: {
      name: 'Star Rating',
      summary: 'A 5-star rating input with hover preview, half-star display and a review summary.',
      description:
        'A star rating lets users give a score from 1 to 5 in one tap. Hovering previews the rating before committing, and a text label ("Great!") explains what each value means.\n\nUnder the hood it is a radio group, so it works with the keyboard (arrow keys) and is announced correctly by screen readers. Displaying an average such as 4.3 uses partially filled stars, drawn by clipping a filled star layer over an empty one. The rating breakdown bars show how the votes are distributed.',
      prompt:
        'Create a product review rating component.\n- Interactive 5-star input built on a radio group (keyboard arrows work, each star has an accessible label like "4 stars")\n- Hovering highlights stars up to the pointer as a preview; clicking selects\n- Show a word for the current value (Terrible, Bad, OK, Good, Great!)\n- Also show a read-only average rating of 4.3 with partially filled stars (clip a filled layer by percentage)\n- Add a breakdown with 5 horizontal bars showing the percentage of each star count\n- Use amber stars, and make it look good in light and dark mode\nUse React and Tailwind CSS.',
      tips: [
        'Allow half-star selection.',
        'Animate the stars with a small bounce when selected.',
        'Add a text area that appears after rating.',
      ],
    },
    ja: {
      name: '星評価',
      summary: 'ホバーでのプレビュー、端数の星表示、評価の内訳を備えた5段階の星評価。',
      description:
        '星評価は、1〜5の点数をワンタップで付けられる入力UIです。ホバーすると確定前に評価をプレビューでき、「最高!」のような言葉で各点数の意味も伝えます。\n\n中身はラジオボタンのグループなので、キーボード(矢印キー)で操作でき、スクリーンリーダーにも正しく読み上げられます。4.3のような平均点の表示では、塗りつぶした星の層を割合で切り抜いて空の星に重ね、端数の星を描きます。内訳のバーで、評価の分布もひと目でわかります。',
      prompt:
        '商品レビュー用の評価コンポーネントを作ってください。\n- ラジオボタンのグループで作った5つ星の入力(矢印キーで操作でき、各星に「4つ星」のようなアクセシブルなラベル)\n- ホバーするとポインターの位置までの星が光ってプレビューし、クリックで確定\n- 現在の値を表す言葉を表示(最悪、悪い、普通、良い、最高!)\n- 平均評価4.3を、端数まで塗った星で読み取り専用表示(塗りつぶした層を割合で切り抜く)\n- 各星の割合を示す5本の横棒による内訳を追加\n- 星は琥珀色で、ライト/ダークモードの両方で見栄えよく\nReactとTailwind CSSで実装してください。',
      tips: [
        '半星単位で選べるようにして',
        '選択したときに星が小さく弾むアニメーションを付けて',
        '評価後にコメント入力欄が現れるようにして',
      ],
    },
  },
};

export default meta;
