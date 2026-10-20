import type { ItemMeta } from '../../types';

const meta: ItemMeta = {
  id: 'donut-chart',
  category: 'data',
  tags: ['donut chart', 'pie chart', 'svg', 'legend', 'breakdown', 'budget'],
  difficulty: 'medium',
  tech: ['SVG arcs', 'stroke-dasharray'],
  addedAt: '2026-10-21',
  text: {
    en: {
      name: 'Interactive Donut Chart',
      summary:
        'A budget breakdown donut with hover highlighting, a center total and a toggleable legend.',
      description:
        'A donut chart shows how a whole splits into parts, such as a budget by category. Hovering a segment (or its legend row) lifts it out and shows its value and share in the center, and clicking a legend item hides that category so the remaining segments re-balance with an animation.\n\nEach segment is an SVG circle drawn with stroke-dasharray (the segment length) and stroke-dashoffset (where it starts), which is simpler than computing arc paths and animates smoothly. The legend doubles as an accessible data table, and colors are paired with labels so the chart does not rely on color alone.',
      prompt:
        'Create an interactive donut chart for a monthly budget.\n- 6 categories with amounts; draw each segment as an SVG <circle> using stroke-dasharray and stroke-dashoffset, with a small gap between segments\n- The center shows the total, or the hovered category\'s amount and percentage\n- Hovering a segment or its legend row highlights it (others dim, the active one gets thicker)\n- Clicking a legend row toggles the category; the remaining segments animate to fill the circle\n- The legend shows color swatch, name, amount and percent, and acts as an accessible table; the SVG has role="img" with a text summary\n- Animate segments in on load\nUse React and Tailwind CSS without a chart library.',
      tips: [
        'Add a drill-down that shows sub-categories when a segment is clicked.',
        'Compare two months with a nested inner ring.',
        'Rebuild it with Recharts PieChart.',
      ],
    },
    ja: {
      name: 'インタラクティブなドーナツグラフ',
      summary: 'ホバーで強調、中央に合計、凡例で表示を切り替えられる予算内訳のドーナツグラフ。',
      description:
        'ドーナツグラフは、予算のカテゴリ別内訳のように、全体が何に分かれているかを示すグラフです。部分(または凡例の行)にホバーするとその部分が浮き上がり、中央に金額と割合を表示します。凡例をクリックするとそのカテゴリを隠し、残りの部分がアニメーションで割合を調整します。\n\n各部分は stroke-dasharray(長さ)と stroke-dashoffset(開始位置)で描いたSVGの円で、弧のパスを計算するより簡単で、なめらかにアニメーションできます。凡例はアクセシブルなデータ表を兼ね、色だけに頼らないようラベルと組み合わせます。',
      prompt:
        '月の予算を示すインタラクティブなドーナツグラフを作ってください。\n- 金額付きの6カテゴリ。各部分は stroke-dasharray と stroke-dashoffset を使ったSVGの <circle> で描き、部分の間に小さな隙間を入れる\n- 中央には合計、ホバー中はそのカテゴリの金額と割合を表示\n- 部分か凡例の行にホバーすると強調(他は薄く、対象は太く)\n- 凡例の行をクリックするとカテゴリの表示を切り替え、残りの部分がアニメーションで円を埋める\n- 凡例には色見本・名前・金額・割合を表示し、アクセシブルな表を兼ねる。SVGは要約テキスト付きの role="img"\n- 読み込み時に部分をアニメーションで表示\nグラフライブラリは使わず、ReactとTailwind CSSで実装してください。',
      tips: [
        '部分をクリックすると内訳が出るドリルダウンを追加して',
        '内側にもう1つリングを置いて2か月を比較して',
        'RechartsのPieChartで作り直して',
      ],
    },
  },
};

export default meta;
