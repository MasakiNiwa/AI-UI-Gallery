import type { ItemMeta } from '../../types';

const meta: ItemMeta = {
  id: 'dual-range-slider',
  category: 'inputs',
  tags: ['range slider', 'price filter', 'two thumbs', 'histogram', 'e-commerce'],
  difficulty: 'medium',
  tech: ['Range inputs', 'CSS'],
  addedAt: '2026-10-21',
  text: {
    en: {
      name: 'Price Range Slider',
      summary:
        'A two-thumb slider for a price range, with a histogram of products and synced number inputs.',
      description:
        'A dual-thumb range slider selects a minimum and maximum in one control, which is common for price, date or size filters in online shops. A small histogram above the track shows how many items fall in each price band, and bars outside the selected range are dimmed, so users can see the effect of their filter before applying it.\n\nIt is built from two native range inputs stacked on top of each other with transparent tracks (only the thumbs receive pointer events), so keyboard and screen reader support come for free. Number inputs stay in sync, and the thumbs cannot cross.',
      prompt:
        'Create a price range filter for an online shop.\n- Two stacked <input type="range"> elements (min and max) sharing one track; make the tracks transparent and only the thumbs clickable (pointer-events)\n- The selected segment of the track is highlighted with the accent color\n- A 20-bar histogram above the track shows product counts per price band; bars outside the range are dimmed\n- Number inputs for min and max stay in sync; the thumbs cannot cross (keep a minimum gap)\n- Show "128 products" for the current range and a Reset button\n- Format prices with Intl.NumberFormat\n- Each thumb has an accessible label ("Minimum price", "Maximum price")\nUse React and Tailwind CSS.',
      tips: [
        'Snap to round numbers like $5 steps.',
        'Show a tooltip with the value above the thumb while dragging.',
        'Use the Radix UI Slider component.',
      ],
    },
    ja: {
      name: '価格帯スライダー',
      summary: '2つのつまみで価格帯を選ぶスライダー。商品数のヒストグラムと連動する数値入力付き。',
      description:
        '2つのつまみを持つ範囲スライダーは、最小値と最大値を1つの操作で選べるUIで、ネットショップの価格・日付・サイズの絞り込みでよく使われます。トラックの上の小さなヒストグラムが価格帯ごとの商品数を示し、範囲外のバーは薄く表示されるので、適用前に絞り込みの効果がわかります。\n\n2つのネイティブのrange入力を重ね、トラックを透明にして(つまみだけがポインターを受け付ける)作るので、キーボードやスクリーンリーダーへの対応も標準で手に入ります。数値入力は連動し、つまみ同士が交差しないようにします。',
      prompt:
        'ネットショップ用の価格帯フィルターを作ってください。\n- 1本のトラックを共有する2つの <input type="range">(最小と最大)を重ねる。トラックは透明にし、つまみだけをクリック可能にする(pointer-events)\n- トラックの選択範囲をアクセントカラーで強調\n- トラックの上に、価格帯ごとの商品数を示す20本のヒストグラム。範囲外のバーは薄くする\n- 最小・最大の数値入力が連動し、つまみは交差しない(最小の間隔を保つ)\n- 現在の範囲の「128件の商品」とリセットボタンを表示\n- 価格は Intl.NumberFormat で整形\n- 各つまみにアクセシブルなラベル(「最低価格」「最高価格」)\nReactとTailwind CSSで実装してください。',
      tips: [
        '$5刻みのようにきりのいい値にスナップさせて',
        'ドラッグ中はつまみの上に値のツールチップを表示して',
        'Radix UIのSliderコンポーネントを使って',
      ],
    },
  },
};

export default meta;
