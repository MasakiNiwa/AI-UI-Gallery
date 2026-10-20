import type { ItemMeta } from '../../types';

const meta: ItemMeta = {
  id: 'number-ticker',
  category: 'animation',
  tags: ['odometer', 'number ticker', 'rolling digits', 'counter', 'stats'],
  difficulty: 'medium',
  tech: ['CSS transform', 'Intl.NumberFormat'],
  addedAt: '2026-10-20',
  text: {
    en: {
      name: 'Rolling Number Ticker',
      summary: 'Numbers whose digits roll vertically like an odometer when the value changes.',
      description:
        'A rolling number ticker animates each digit independently: every digit is a vertical strip of 0–9, and changing the value slides each strip to the new digit, like a car odometer or a flip counter. It draws attention to live values such as stock prices, follower counts or totals.\n\nEach digit column is a clipped container with a strip translated by -N × the line height; a CSS transition handles the motion. Using tabular numerals keeps the width stable, and the full value is exposed once to screen readers via aria-label instead of every digit.',
      prompt:
        'Create an odometer-style rolling number component.\n- Each digit is a column showing a vertical strip of 0–9, clipped to one line; changing the value translates each strip to the new digit with a 600ms cubic-bezier transition\n- Digits further to the right can roll slightly later (staggered) for a nicer effect\n- Support thousands separators and a currency prefix, formatted with Intl.NumberFormat\n- Show color feedback: green flash when the value increases, red when it decreases\n- Demo: a live "stock price" that changes every 2 seconds, and a follower counter with a +1 button\n- Accessible: the container has aria-label with the full value; digits are aria-hidden\nUse React and Tailwind CSS.',
      tips: [
        'Make the digits flip like an airport departure board.',
        'Animate only when the number scrolls into view.',
        'Use the @number-flow/react library.',
      ],
    },
    ja: {
      name: '回転するナンバーティッカー',
      summary: '値が変わると、オドメーターのように各桁の数字が縦に回転する数値表示。',
      description:
        'ナンバーティッカーは、各桁を個別にアニメーションさせる数値表示です。各桁は0〜9の縦長の帯で、値が変わると帯がスライドして新しい数字に止まります。車の走行距離計やめくり式カウンターのような動きで、株価・フォロワー数・合計金額のような変わり続ける値に目を引きます。\n\n各桁の列は1行分だけ見えるように切り抜いたコンテナで、中の帯を「-N × 行の高さ」だけ移動させ、動きはCSSトランジションで付けます。等幅数字(tabular numerals)を使うと幅が安定し、スクリーンリーダーには各桁ではなく値全体を aria-label で1度だけ伝えます。',
      prompt:
        'オドメーター風に回転する数値コンポーネントを作ってください。\n- 各桁は0〜9の縦の帯を1行分だけ見せる列で、値が変わると帯が600msの cubic-bezier トランジションで新しい数字へ移動\n- 右の桁ほど少し遅れて回転させ(時間差)、見栄えを良くする\n- 桁区切りと通貨記号に対応し、Intl.NumberFormat で整形\n- 値が増えたら緑、減ったら赤に一瞬光らせて変化を伝える\n- デモ:2秒ごとに変わる「株価」と、+1ボタン付きのフォロワー数カウンター\n- アクセシブルに:コンテナには値全体の aria-label、各桁は aria-hidden\nReactとTailwind CSSで実装してください。',
      tips: [
        '空港の発着案内板のように数字がパタパタめくれるようにして',
        '画面に入ったときだけアニメーションさせて',
        '@number-flow/reactライブラリを使って',
      ],
    },
  },
};

export default meta;
