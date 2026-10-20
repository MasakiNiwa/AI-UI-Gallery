import type { ItemMeta } from '../../types';

const meta: ItemMeta = {
  id: 'gantt-chart',
  category: 'data',
  tags: ['gantt chart', 'timeline', 'project plan', 'schedule', 'roadmap'],
  difficulty: 'hard',
  tech: ['CSS Grid', 'Pointer events', 'Date math'],
  addedAt: '2026-10-21',
  text: {
    en: {
      name: 'Gantt Chart',
      summary:
        'A project timeline with task bars you can drag to reschedule, progress fills and a "today" marker.',
      description:
        'A Gantt chart lays out tasks as horizontal bars on a calendar, so the plan, overlaps and deadlines are visible at a glance. Each row is a task; the bar spans its start and end dates, a darker fill shows progress, and a vertical line marks today. Dragging a bar moves the task in time.\n\nThe layout is a grid with a fixed task column and a scrollable day grid. Bar positions are computed from dates (days since the chart start × day width), and dragging converts the pointer offset back into whole days, snapping to the grid.',
      prompt:
        'Build a Gantt chart for a 4-week project.\n- Left column: task names grouped by phase (Design, Build, Launch); right: a horizontally scrollable day grid with week headers and weekend shading\n- Each task is a rounded bar from start to end date with a progress fill and the percentage; milestones are diamonds\n- A vertical "Today" line\n- Drag a bar to move the task (snapping to whole days); drag its right edge to change the duration; show a tooltip with the new dates while dragging\n- Zoom buttons switch between day and week widths\n- Hover a bar to highlight its row\nUse React, TypeScript and Tailwind CSS (no chart library).',
      tips: [
        'Draw dependency arrows between tasks.',
        'Show a resource/assignee avatar on each bar.',
        'Export the chart as an image or PDF.',
      ],
    },
    ja: {
      name: 'ガントチャート',
      summary:
        'ドラッグで日程を動かせるタスクバー、進捗の塗り、「今日」の線を備えたプロジェクトのタイムライン。',
      description:
        'ガントチャートは、タスクをカレンダー上の横棒として並べ、計画・重なり・締め切りをひと目でわかるようにするグラフです。1行が1つのタスクで、棒は開始日から終了日までを示し、濃い塗りで進捗を、縦線で今日を表します。棒をドラッグするとタスクの日程を動かせます。\n\nレイアウトは、固定のタスク列とスクロールできる日付のグリッドを並べた構成です。棒の位置は日付から計算し(チャート開始日からの日数×1日の幅)、ドラッグ時はポインターの移動量を日数に変換してグリッドにスナップさせます。',
      prompt:
        '4週間のプロジェクトのガントチャートを作ってください。\n- 左の列:フェーズ(デザイン、開発、リリース)ごとにまとめたタスク名。右:週の見出しと週末の網掛けがある、横スクロールできる日付グリッド\n- 各タスクは開始日から終了日までの角丸の棒で、進捗の塗りと割合を表示。マイルストーンはひし形\n- 縦の「今日」の線\n- 棒をドラッグするとタスクを移動(1日単位でスナップ)。右端をドラッグすると期間を変更。ドラッグ中は新しい日付をツールチップで表示\n- ズームボタンで日単位と週単位の幅を切り替え\n- 棒にホバーするとその行を強調\nグラフライブラリは使わず、React、TypeScript、Tailwind CSSで実装してください。',
      tips: [
        'タスク間の依存関係を矢印で描いて',
        '各棒に担当者のアバターを表示して',
        'チャートを画像やPDFとして書き出して',
      ],
    },
  },
};

export default meta;
