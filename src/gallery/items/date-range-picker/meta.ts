import type { ItemMeta } from '../../types';

const meta: ItemMeta = {
  id: 'date-range-picker',
  category: 'inputs',
  tags: ['date picker', 'calendar', 'date range', 'booking', 'popover'],
  difficulty: 'hard',
  tech: ['Date math', 'ARIA grid', 'Intl.DateTimeFormat'],
  addedAt: '2026-10-21',
  text: {
    en: {
      name: 'Date Range Picker',
      summary:
        'A calendar popover for picking check-in and check-out dates, with range highlighting and presets.',
      description:
        'A date range picker lets users choose a start and end date on a visual calendar, as on hotel and flight booking sites. The first click sets the start, the second the end, and hovering previews the range in between. Past dates can be disabled, and presets like "This weekend" save clicks.\n\nThe calendar is a grid of weeks built with date arithmetic; month and weekday names come from Intl.DateTimeFormat so they follow the user\'s language. For accessibility, days are buttons inside role="grid" with arrow-key navigation.',
      prompt:
        'Create a date range picker for a hotel booking form.\n- A trigger field shows "Check-in → Check-out" and opens a calendar popover\n- Show the current month with previous/next month buttons (two months side by side on desktop)\n- First click selects the start date, second click the end date; hovering previews the range; clicking before the start restarts the selection\n- Highlight the range with a soft background and round the start/end days; mark today; disable past dates\n- Preset buttons: Tonight, This weekend, Next 7 days\n- Show the number of nights and Apply / Clear buttons\n- Keyboard: arrow keys move between days, Enter selects, Escape closes; role="grid"\n- Use Intl.DateTimeFormat for month and weekday names\nUse React and Tailwind CSS without a date library.',
      tips: [
        'Show prices under each day.',
        'Use date-fns or Temporal for the date math.',
        'Turn it into a bottom sheet on mobile.',
      ],
    },
    ja: {
      name: '期間を選べる日付ピッカー',
      summary:
        'チェックイン・チェックアウトの日付を選ぶカレンダー。期間の強調表示とプリセット付き。',
      description:
        '期間選択の日付ピッカーは、ホテルや航空券の予約サイトのように、見た目のカレンダー上で開始日と終了日を選べるUIです。1回目のクリックで開始日、2回目で終了日を決め、ホバー中はその間の期間をプレビューします。過去の日付は選べないようにし、「今週末」のようなプリセットで手間も減らせます。\n\nカレンダーは日付計算で作った週のグリッドで、月や曜日の名前は Intl.DateTimeFormat から取るのでユーザーの言語に合わせて表示されます。アクセシビリティのため、日付は role="grid" の中のボタンにし、矢印キーで移動できるようにします。',
      prompt:
        'ホテル予約フォーム用の、期間を選べる日付ピッカーを作ってください。\n- 入力欄には「チェックイン → チェックアウト」を表示し、クリックでカレンダーのポップオーバーを開く\n- 今月を表示し、前月/翌月ボタンで移動(PCでは2か月を横に並べる)\n- 1回目のクリックで開始日、2回目で終了日を選択。ホバーで期間をプレビュー。開始日より前をクリックしたら選び直し\n- 期間は柔らかい背景で強調し、開始日・終了日は丸く表示。今日に印を付け、過去の日付は無効化\n- プリセットボタン:今夜、今週末、7日間\n- 泊数と「適用」「クリア」ボタンを表示\n- キーボード:矢印キーで日付を移動、Enterで選択、Escで閉じる。role="grid"\n- 月と曜日の名前には Intl.DateTimeFormat を使う\n日付ライブラリは使わず、ReactとTailwind CSSで実装してください。',
      tips: [
        '各日付の下に料金を表示して',
        '日付計算にdate-fnsかTemporalを使って',
        'スマホではボトムシートにして',
      ],
    },
  },
};

export default meta;
