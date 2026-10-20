import type { ItemMeta } from '../../types';

const meta: ItemMeta = {
  id: 'calendar-heatmap',
  category: 'data',
  tags: ['heatmap', 'contribution graph', 'calendar', 'activity', 'streak'],
  difficulty: 'medium',
  tech: ['CSS Grid', 'Date math'],
  addedAt: '2026-10-20',
  text: {
    en: {
      name: 'Activity Calendar Heatmap',
      summary: 'A year of daily activity as a grid of colored squares, like a contribution graph.',
      description:
        'A calendar heatmap shows one value per day as a small square: columns are weeks, rows are days of the week, and darker colors mean more activity. It makes habits, streaks and quiet periods visible at a glance, as in the well-known code contribution graph.\n\nThe grid is built with CSS Grid using grid-auto-flow: column so days fill top to bottom, week by week. Month labels sit above the first week of each month, and a legend explains the color scale. Hovering a square shows the exact date and count.',
      prompt:
        'Create a GitHub-style contribution heatmap for the last 52 weeks.\n- Generate random daily activity counts (0–12) for demo data\n- CSS Grid with 7 rows (Sun–Sat) and one column per week, using grid-auto-flow: column\n- 5 color levels from empty to dark green, based on the count; theme-aware colors for light and dark mode\n- Month labels above the columns and Mon / Wed / Fri labels on the left\n- Hover or focus a cell to show a tooltip like "5 contributions on Mar 12, 2026"\n- Show the total for the year, the current streak and the longest streak above the grid\n- Horizontally scrollable on small screens, starting scrolled to the most recent week\nUse React and Tailwind CSS.',
      tips: [
        'Let users click a day to see the details below.',
        'Switch between years with tabs.',
        'Use a different color scale for each activity type.',
      ],
    },
    ja: {
      name: 'アクティビティのカレンダーヒートマップ',
      summary: '1年分の日々の活動量を色の濃さで並べたマス目。コントリビューショングラフ風。',
      description:
        'カレンダーヒートマップは、1日ぶんの値を小さな四角1つで表し、列が週、行が曜日、色が濃いほど活動が多いことを示すグラフです。習慣・連続記録・休みの期間がひと目でわかり、コードのコントリビューショングラフとしてよく知られています。\n\nCSS Gridで grid-auto-flow: column を使い、日付を週ごとに上から下へ並べます。各月の最初の週の上に月のラベルを置き、色の段階は凡例で説明します。マスにホバーすると正確な日付と件数が表示されます。',
      prompt:
        '直近52週分の、GitHub風のコントリビューションヒートマップを作ってください。\n- デモ用に、日々の活動数(0〜12)をランダムに生成\n- CSS Gridで7行(日〜土)×週ごとの列とし、grid-auto-flow: column を使う\n- 件数に応じて、空から濃い緑までの5段階の色。ライト/ダークモードに合わせた色にする\n- 列の上に月のラベル、左に月・水・金のラベル\n- マスにホバーやフォーカスすると「2026年3月12日に5件」のようなツールチップを表示\n- グリッドの上に、年間の合計、現在の連続日数、最長の連続日数を表示\n- 狭い画面では横スクロールでき、最初は最新の週までスクロールした状態にする\nReactとTailwind CSSで実装してください。',
      tips: [
        '日付をクリックすると下に詳細が出るようにして',
        'タブで年を切り替えられるようにして',
        '活動の種類ごとに違う色の段階にして',
      ],
    },
  },
};

export default meta;
