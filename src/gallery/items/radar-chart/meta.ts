import type { ItemMeta } from '../../types';

const meta: ItemMeta = {
  id: 'radar-chart',
  category: 'data',
  tags: ['radar chart', 'spider chart', 'skills', 'comparison', 'svg'],
  difficulty: 'medium',
  tech: ['SVG polygons', 'Trigonometry'],
  addedAt: '2026-10-22',
  text: {
    en: {
      name: 'Radar Chart Comparison',
      summary:
        'A spider chart comparing two profiles across six skills, with animated shapes and toggles.',
      description:
        'A radar (spider) chart plots several measures on axes that radiate from a center, then connects the values into a shape. It is useful for comparing profiles, such as skills, product features or game characters, because differences in shape are easy to spot.\n\nEach point is placed with basic trigonometry (angle per axis, radius by value), and the shapes are SVG polygons with translucent fills so overlapping areas remain visible. Switching between profiles animates the polygon points, and the values are also listed in a small table for exact numbers and accessibility.',
      prompt:
        'Create a radar chart that compares two candidates across six skills (Design, Frontend, Backend, Testing, Communication, Leadership), scored 0–10.\n- Draw concentric hexagon grid lines with labels at each axis end\n- Each candidate is a translucent SVG polygon with a stroke and dots at the vertices\n- Toggle chips show/hide each candidate; a dropdown switches the second candidate and the polygon animates to the new values\n- Hovering a vertex shows a tooltip with the exact score\n- Also render a small accessible table with all values\n- Compute points with Math.cos/Math.sin; make the chart responsive with a viewBox\nUse React and Tailwind CSS without a chart library.',
      tips: [
        'Add a third series and a legend.',
        'Let users drag a vertex to edit the value.',
        'Rebuild it with Recharts RadarChart.',
      ],
    },
    ja: {
      name: 'レーダーチャートで比較',
      summary:
        '6つのスキルで2人のプロフィールを比べるレーダーチャート。形のアニメーションと表示切り替え付き。',
      description:
        'レーダーチャート(クモの巣グラフ)は、中心から放射状に伸びる軸に複数の値を置き、それらを結んだ形で表すグラフです。形の違いが見つけやすいので、スキル・製品の機能・ゲームのキャラクターのようなプロフィールの比較に向いています。\n\n各点は簡単な三角関数(軸ごとの角度と、値に応じた半径)で配置し、形は半透明の塗りのSVGポリゴンで描くので、重なった部分も見えます。比較相手を切り替えるとポリゴンの頂点がアニメーションで動きます。正確な数値とアクセシビリティのため、値は小さな表にも載せます。',
      prompt:
        '6つのスキル(デザイン、フロントエンド、バックエンド、テスト、コミュニケーション、リーダーシップ)を0〜10点で2人の候補者を比べるレーダーチャートを作ってください。\n- 同心の六角形のグリッド線と、各軸の先端にラベル\n- 各候補者は、線と頂点の点を持つ半透明のSVGポリゴン\n- チップで各候補者の表示/非表示を切り替え、プルダウンで2人目を変えるとポリゴンが新しい値へアニメーション\n- 頂点にホバーすると正確な点数をツールチップで表示\n- すべての値を載せた小さなアクセシブルな表も描画\n- 点は Math.cos/Math.sin で計算し、viewBox でレスポンシブに\nグラフライブラリは使わず、ReactとTailwind CSSで実装してください。',
      tips: [
        '3つ目の系列と凡例を追加して',
        '頂点をドラッグして値を編集できるようにして',
        'RechartsのRadarChartで作り直して',
      ],
    },
  },
};

export default meta;
