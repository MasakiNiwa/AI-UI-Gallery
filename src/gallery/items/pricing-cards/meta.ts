import type { ItemMeta } from '../../types';

const meta: ItemMeta = {
  id: 'pricing-cards',
  category: 'cards',
  tags: ['pricing', 'plans', 'billing toggle', 'saas', 'landing page'],
  difficulty: 'easy',
  tech: ['CSS Grid', 'Container queries'],
  addedAt: '2026-10-20',
  text: {
    en: {
      name: 'Pricing Plans',
      summary:
        'Three pricing cards with a monthly/yearly toggle and a highlighted recommended plan.',
      description:
        'A pricing section compares plans side by side so visitors can choose quickly. The recommended plan is emphasized with a badge, accent border and slightly raised position, and a billing toggle switches all prices between monthly and yearly (showing the discount).\n\nFeature lists use check marks, and features not included in a plan are shown dimmed so differences are easy to scan. On narrow screens, the cards stack vertically with the recommended plan first.',
      prompt:
        'Create a SaaS pricing section with three plans: Free, Pro (recommended) and Team.\n- A monthly / yearly segmented toggle at the top; yearly shows "Save 20%" and updates every price with an animated number change\n- Each card: plan name, short description, price per month, call-to-action button and a feature list with check marks; features not included are dimmed with an × icon\n- The Pro card is highlighted: accent border, "Most popular" badge, slightly larger and raised\n- Responsive: 3 columns on desktop, stacked on mobile with Pro first\n- Accessible toggle (radio group)\nUse React and Tailwind CSS.',
      tips: [
        'Add a feature comparison table below the cards.',
        "Show prices in the visitor's local currency.",
        'Add an FAQ accordion under the pricing.',
      ],
    },
    ja: {
      name: '料金プラン',
      summary: '月払い/年払いの切り替えと、おすすめプランの強調表示を備えた3つの料金カード。',
      description:
        '料金セクションは、プランを横に並べて比べられるようにし、訪問者がすばやく選べるようにするUIです。おすすめのプランはバッジ・アクセントカラーの枠・少し浮いた位置で目立たせ、支払い周期の切り替えですべての価格を月払い/年払い(割引額付き)に切り替えます。\n\n機能一覧にはチェックマークを付け、そのプランに含まれない機能は薄く表示して違いを見比べやすくします。狭い画面ではカードを縦に並べ、おすすめプランを最初に置きます。',
      prompt:
        'Free、Pro(おすすめ)、Teamの3プランを持つSaaSの料金セクションを作ってください。\n- 上部に月払い/年払いのセグメント切り替え。年払いでは「20%お得」を表示し、すべての価格を数字が変化するアニメーションで更新\n- 各カード:プラン名、短い説明、月額、行動喚起ボタン、チェックマーク付きの機能一覧。含まれない機能は×アイコンで薄く表示\n- Proのカードを強調:アクセントカラーの枠、「人気No.1」バッジ、少し大きく浮かせる\n- レスポンシブ:PCは3列、スマホは縦並びでProを最初に\n- 切り替えはアクセシブルに(ラジオグループ)\nReactとTailwind CSSで実装してください。',
      tips: [
        'カードの下に機能比較表を追加して',
        '訪問者の地域の通貨で価格を表示して',
        '料金の下にFAQのアコーディオンを追加して',
      ],
    },
  },
};

export default meta;
