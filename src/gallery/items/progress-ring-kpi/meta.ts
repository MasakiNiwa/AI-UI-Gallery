import type { ItemMeta } from '../../types';

const meta: ItemMeta = {
  id: 'progress-ring-kpi',
  category: 'data',
  tags: ['kpi', 'dashboard', 'progress ring', 'count up', 'sparkline', 'svg'],
  difficulty: 'easy',
  tech: ['SVG', 'requestAnimationFrame'],
  addedAt: '2026-10-20',
  text: {
    en: {
      name: 'KPI Cards with Progress Rings',
      summary:
        'Dashboard stat cards with animated SVG progress rings, count-up numbers and sparklines.',
      description:
        'KPI (key performance indicator) cards summarize the most important numbers at the top of a dashboard. Animating the numbers counting up and the rings filling draws attention to them when the page loads.\n\nA progress ring is an SVG circle whose stroke-dasharray / stroke-dashoffset represent the percentage. Sparklines are tiny line charts drawn with an SVG polyline, showing the trend without axes.',
      prompt:
        'Create a row of 3 KPI cards for a dashboard.\n- Each card: label, big number, change vs. last week (green ▲ / red ▼), and either a circular progress ring or a sparkline\n- Progress ring: SVG circle with stroke-dashoffset, animating from 0 to the target percentage on load\n- Numbers count up from 0 with an ease-out curve using requestAnimationFrame\n- Sparkline: small SVG polyline with a soft gradient fill underneath\n- Responsive: 1 column on mobile, 3 on desktop\n- Respect prefers-reduced-motion (show final values immediately)\nUse React and Tailwind CSS, without a chart library.',
      tips: [
        'Add a tooltip on the sparkline showing each value.',
        'Re-animate when the data refreshes every 5 seconds.',
        'Use Recharts for a full-size chart below the cards.',
      ],
    },
    ja: {
      name: 'プログレスリング付きKPIカード',
      summary:
        'アニメーションするSVGのリング、カウントアップする数字、スパークラインを備えたダッシュボード用カード。',
      description:
        'KPI(重要業績評価指標)カードは、ダッシュボードの上部で最も重要な数値をまとめて見せるUIです。ページを開いたときに数字がカウントアップし、リングが満ちていくアニメーションは、視線を集めるのに効果的です。\n\nプログレスリングはSVGの円で、stroke-dasharray / stroke-dashoffset によって割合を表します。スパークラインは軸のない小さな折れ線グラフで、SVGのpolylineで描き、傾向をひと目で伝えます。',
      prompt:
        'ダッシュボード用のKPIカードを3枚横に並べて作ってください。\n- 各カード:ラベル、大きな数値、先週比(緑の▲/赤の▼)、円形のプログレスリングかスパークラインのどちらか\n- プログレスリング:stroke-dashoffset を使ったSVGの円で、読み込み時に0から目標の割合までアニメーション\n- 数値は requestAnimationFrame とイーズアウトで0からカウントアップ\n- スパークライン:小さなSVGのpolylineと、その下に柔らかいグラデーションの塗り\n- レスポンシブ:スマホでは1列、PCでは3列\n- prefers-reduced-motion の場合は最終値をすぐに表示\nグラフライブラリは使わず、ReactとTailwind CSSで実装してください。',
      tips: [
        'スパークラインに各値を表示するツールチップを付けて',
        '5秒ごとにデータを更新して再アニメーションさせて',
        'カードの下にRechartsで大きなグラフを追加して',
      ],
    },
  },
};

export default meta;
