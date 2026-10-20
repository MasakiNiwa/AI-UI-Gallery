import type { ItemMeta } from '../../types';

const meta: ItemMeta = {
  id: 'notification-center',
  category: 'feedback',
  tags: ['notifications', 'bell', 'dropdown', 'unread badge', 'inbox', 'activity'],
  difficulty: 'medium',
  tech: ['Popover', 'aria-live', 'Relative time'],
  addedAt: '2026-10-21',
  text: {
    en: {
      name: 'Notification Center',
      summary:
        'A bell icon with an unread badge that opens a panel of notifications with tabs and "mark all as read".',
      description:
        'A notification center collects everything that happened while the user was away: mentions, comments, invitations and system messages. A bell icon with a count badge signals unread items; clicking it opens a panel grouped into tabs (All / Unread).\n\nUnread notifications are highlighted with a dot and a tinted background, and clicking one marks it as read. "Mark all as read" clears the badge at once. Relative timestamps ("5 min ago") come from Intl.RelativeTimeFormat, and the badge count is exposed in the button label for screen readers.',
      prompt:
        'Build a notification center dropdown.\n- A bell icon button with a red badge showing the unread count (hidden when 0, "9+" above 9); the bell wiggles when a new notification arrives\n- Clicking opens a panel with tabs: All and Unread (with counts)\n- Each notification: avatar or icon, rich text ("Mina commented on Dashboard"), relative time via Intl.RelativeTimeFormat, and an unread dot with a tinted background\n- Clicking a notification marks it read; a "Mark all as read" button in the header\n- An empty state illustration when there are no unread notifications\n- A "Simulate new notification" button for the demo; announce new items via aria-live\n- Close on outside click and Escape; button label includes the unread count\nUse React and Tailwind CSS.',
      tips: [
        'Group notifications by Today / Earlier.',
        'Add inline actions such as "Accept invite".',
        'Receive notifications in real time via WebSocket or Server-Sent Events.',
      ],
    },
    ja: {
      name: '通知センター',
      summary: '未読数バッジ付きのベルから開く通知パネル。タブ切り替えと「すべて既読にする」付き。',
      description:
        '通知センターは、ユーザーが離れている間に起きたこと(メンション、コメント、招待、システムからのお知らせ)をまとめて表示するUIです。件数バッジ付きのベルのアイコンで未読があることを知らせ、クリックするとタブ(すべて/未読)に分かれたパネルが開きます。\n\n未読の通知は点と色付きの背景で強調し、クリックすると既読になります。「すべて既読にする」でバッジを一度に消せます。「5分前」のような相対時刻は Intl.RelativeTimeFormat で作り、未読数はボタンのラベルに含めてスクリーンリーダーにも伝えます。',
      prompt:
        '通知センターのドロップダウンを作ってください。\n- 未読数を示す赤いバッジ付きのベルのアイコンボタン(0なら非表示、10以上は「9+」)。新しい通知が届くとベルが揺れる\n- クリックすると、すべて/未読(件数付き)のタブを持つパネルが開く\n- 各通知:アバターかアイコン、装飾付きの本文(「Minaさんがダッシュボードにコメントしました」)、Intl.RelativeTimeFormat による相対時刻、未読の点と色付きの背景\n- 通知をクリックすると既読になり、ヘッダーに「すべて既読にする」ボタン\n- 未読がないときは空状態のイラスト\n- デモ用に「新しい通知を受け取る」ボタンを用意し、新着は aria-live で読み上げる\n- 外側のクリックとEscで閉じる。ボタンのラベルに未読数を含める\nReactとTailwind CSSで実装してください。',
      tips: [
        '通知を「今日」「それ以前」でグループ分けして',
        '「招待を承認」のような操作ボタンを通知の中に追加して',
        'WebSocketやServer-Sent Eventsでリアルタイムに受け取れるようにして',
      ],
    },
  },
};

export default meta;
