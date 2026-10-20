import type { ItemMeta } from '../../types';

const meta: ItemMeta = {
  id: 'toast-notifications',
  category: 'feedback',
  tags: ['toast', 'snackbar', 'notification', 'alert'],
  difficulty: 'medium',
  tech: ['CSS animation', 'ARIA live region'],
  addedAt: '2026-10-20',
  text: {
    en: {
      name: 'Toast Notifications',
      summary: 'Small stacked messages that slide in, count down and dismiss themselves.',
      description:
        'A toast (or snackbar) is a brief, non-blocking message about the result of an action, such as "Saved" or "Upload failed". Toasts appear at the edge of the screen, stack when there are several, and disappear on their own after a few seconds.\n\nGood toasts pause their timer while hovered, can be dismissed manually, use color and an icon to show the type, and are announced to screen readers through an aria-live region.',
      prompt:
        'Implement a toast notification system.\n- Buttons to trigger success, error, info and warning toasts\n- Toasts stack in the bottom-right corner (top-center on mobile), newest on top, max 4 visible\n- Each toast has an icon, title, message, close button and a progress bar showing time left\n- Auto-dismiss after 4 seconds; pause the timer while hovered or focused\n- Slide-in and fade-out animations\n- Announce toasts with an aria-live="polite" region (assertive for errors)\n- Expose a simple toast.success("...") style API\nUse React and Tailwind CSS.',
      tips: [
        'Add an "Undo" action button to the toast.',
        'Allow swiping a toast away on touch devices.',
        'Use the Sonner library instead of a custom implementation.',
      ],
    },
    ja: {
      name: 'トースト通知',
      summary: 'スライドして現れ、時間が経つと自動で消える小さなメッセージ。',
      description:
        'トースト(スナックバー)は、「保存しました」「アップロードに失敗しました」のように、操作の結果を短く知らせる通知です。操作を妨げずに画面の端に現れ、複数あるときは積み重なり、数秒後に自動で消えます。\n\n良いトーストは、マウスを乗せている間はタイマーを止め、手動でも閉じられ、色とアイコンで種類を伝え、aria-live領域によってスクリーンリーダーにも読み上げられます。',
      prompt:
        'トースト通知の仕組みを実装してください。\n- 成功・エラー・情報・警告のトーストを出すボタン\n- トーストは右下(スマホでは上部中央)に積み重なり、新しいものが上、最大4件表示\n- 各トーストにアイコン、タイトル、メッセージ、閉じるボタン、残り時間を表すプログレスバー\n- 4秒後に自動で消える。ホバー中やフォーカス中はタイマーを一時停止\n- スライドインとフェードアウトのアニメーション\n- aria-live="polite" の領域で読み上げる(エラーは assertive)\n- toast.success("...") のような簡単なAPIを用意\nReactとTailwind CSSで実装してください。',
      tips: [
        'トーストに「元に戻す」ボタンを付けて',
        'タッチ端末ではスワイプで消せるようにして',
        '自作せずにSonnerライブラリを使って',
      ],
    },
  },
};

export default meta;
