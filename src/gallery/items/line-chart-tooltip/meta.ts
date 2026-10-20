import type { ItemMeta } from '../../types';

const meta: ItemMeta = {
  id: 'line-chart-tooltip',
  category: 'data',
  tags: ['line chart', 'area chart', 'crosshair', 'tooltip', 'svg', 'time series'],
  difficulty: 'hard',
  tech: ['SVG', 'Pointer events'],
  addedAt: '2026-10-20',
  text: {
    en: {
      name: 'Interactive Line Chart',
      summary:
        'A smooth area chart with a crosshair that snaps to the nearest point and a floating tooltip.',
      description:
        'An interactive line chart shows a value over time and reveals exact numbers on demand. Moving the pointer over the chart shows a vertical crosshair snapped to the nearest data point, a highlighted dot and a tooltip with the date and values; a second series can be compared at the same time.\n\nThe lines are SVG paths with smooth curves, the area below uses a gradient fill, and the lines "draw themselves" on load with an animated stroke-dashoffset. Range buttons (7D / 30D / 90D) switch the data shown.',
      prompt:
        'Create an interactive line/area chart of website visitors, drawn with SVG (no chart library).\n- Two series: this period (solid line with a soft gradient area fill) and the previous period (dashed line)\n- Smooth curves (Catmull-Rom or monotone cubic), horizontal grid lines and Y-axis labels\n- On pointer move, snap a vertical crosshair to the nearest point, show dots on both series and a floating tooltip with the date and both values (keep it inside the chart bounds)\n- Range buttons 7D / 30D / 90D switch the data with a smooth transition\n- Lines animate in on load using stroke-dasharray / stroke-dashoffset\n- Responsive width using a ResizeObserver; touch support\nUse React and TypeScript.',
      tips: [
        'Add brushing to zoom into a selected range.',
        'Rebuild it with Recharts or Visx.',
        'Show annotations for important events on the timeline.',
      ],
    },
    ja: {
      name: 'インタラクティブな折れ線グラフ',
      summary:
        '最も近いデータ点に吸い付く十字線と、浮かぶツールチップを備えた滑らかなエリアグラフ。',
      description:
        'インタラクティブな折れ線グラフは、時間とともに変わる値を示しつつ、必要なときに正確な数値を見せるグラフです。グラフ上でポインターを動かすと、最も近いデータ点に吸い付く縦の十字線、強調された点、日付と値を表示するツールチップが現れ、2つ目の系列とも同時に比べられます。\n\n線はなめらかな曲線のSVGパスで、その下の領域はグラデーションで塗ります。読み込み時には stroke-dashoffset のアニメーションで線が「描かれて」いきます。期間ボタン(7日/30日/90日)で表示するデータを切り替えます。',
      prompt:
        'Webサイトの訪問者数を示すインタラクティブな折れ線/エリアグラフを、SVGで作ってください(グラフライブラリなし)。\n- 2系列:今期(実線と、柔らかいグラデーションの塗り)と前期(破線)\n- なめらかな曲線(Catmull-Romか単調3次)、横のグリッド線、Y軸のラベル\n- ポインターを動かすと、最も近いデータ点に縦の十字線を吸い付かせ、両系列に点を表示し、日付と両方の値を示すツールチップを浮かべる(グラフの範囲からはみ出さないように)\n- 7日/30日/90日の期間ボタンで、なめらかなトランジション付きでデータを切り替える\n- 読み込み時は stroke-dasharray / stroke-dashoffset で線をアニメーション表示\n- ResizeObserverで幅をレスポンシブに。タッチ操作にも対応\nReactとTypeScriptで実装してください。',
      tips: [
        '範囲を選択して拡大できるブラッシング機能を追加して',
        'RechartsやVisxで作り直して',
        '重要な出来事の注釈をタイムライン上に表示して',
      ],
    },
  },
};

export default meta;
