import type { ItemMeta } from '../../types';

const meta: ItemMeta = {
  id: 'dashboard-shell',
  category: 'layout',
  tags: ['dashboard', 'admin', 'app shell', 'responsive layout', 'KPI', 'CSS grid'],
  difficulty: 'medium',
  tech: ['CSS Grid', 'Container queries', 'SVG'],
  addedAt: '2026-10-22',
  text: {
    en: {
      name: 'Responsive Dashboard Layout',
      summary:
        'An admin dashboard shell whose sidebar becomes bottom tabs and whose grid reflows from four columns to one.',
      description:
        'Most business apps share the same skeleton: navigation, a top bar with search and the user, a row of KPI cards, a main chart and a recent-activity list. This layout shows how one grid adapts to any width with container queries, so it responds to the space it actually has rather than the window.\n\nOn wide containers there is a sidebar and a four-column KPI row, with the chart spanning two thirds. On medium widths the KPI row becomes two columns and the list moves below the chart. On narrow widths the sidebar turns into a bottom tab bar and everything stacks. The period switch updates the numbers and the chart.',
      prompt:
        'Build a responsive admin dashboard layout.\n- Wide: left sidebar (logo + nav), top bar (page title, search field, notification bell, avatar), 4 KPI cards (label, value, % change with up/down color, tiny sparkline), an area chart card spanning 2/3 and a "Recent orders" list in the remaining 1/3\n- Medium: KPI cards in 2 columns, the list below the chart\n- Narrow: the sidebar becomes a bottom tab bar, search collapses to an icon, everything stacks in one column\n- Use CSS Grid with container queries (not media queries) so it adapts to its container\n- A 7d / 30d / 90d segmented control updates the KPI values and the chart\n- Draw the charts with plain SVG\nUse React and Tailwind CSS.',
      tips: [
        'Let users drag cards to rearrange the grid.',
        'Add skeleton states while data loads.',
        'Show a date range picker instead of fixed periods.',
      ],
    },
    ja: {
      name: 'レスポンシブなダッシュボードレイアウト',
      summary:
        'サイドバーが下部のタブに変わり、グリッドが4列から1列へ組み替わる管理画面のダッシュボード。',
      description:
        '多くの業務アプリは同じ骨組みを持っています。ナビゲーション、検索とユーザーがある上部バー、KPIカードの列、メインのグラフ、最近の動きのリストです。このレイアウトは、ひとつのグリッドがコンテナクエリでどんな幅にも合わせる方法を示しています。ウィンドウではなく、実際に使える幅に応じて変わります。\n\n広いコンテナではサイドバーと4列のKPIが並び、グラフが3分の2を占めます。中くらいの幅ではKPIが2列になり、リストはグラフの下に移ります。狭い幅ではサイドバーが下部のタブバーに変わり、すべてが縦に並びます。期間の切り替えで数値とグラフが更新されます。',
      prompt:
        'レスポンシブな管理画面のダッシュボードレイアウトを作ってください。\n- 広い幅:左にサイドバー(ロゴ+ナビ)、上部バー(ページタイトル、検索欄、通知ベル、アバター)、4つのKPIカード(ラベル、値、増減%を上下で色分け、小さなスパークライン)、3分の2を占める面グラフのカード、残り3分の1に「最近の注文」リスト\n- 中くらいの幅:KPIカードは2列、リストはグラフの下\n- 狭い幅:サイドバーは下部のタブバーに、検索はアイコンに縮め、すべて1列に並べる\n- メディアクエリではなくコンテナクエリとCSS Gridを使い、コンテナに合わせて変わるように\n- 7日 / 30日 / 90日の切り替えでKPIの値とグラフを更新\n- グラフは素のSVGで描画\nReactとTailwind CSSで実装してください。',
      tips: [
        'カードをドラッグしてグリッドを並べ替えられるようにして',
        'データの読み込み中はスケルトンを表示して',
        '固定の期間の代わりに日付範囲ピッカーを使って',
      ],
    },
  },
};

export default meta;
