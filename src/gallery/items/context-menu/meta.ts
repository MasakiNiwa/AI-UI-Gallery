import type { ItemMeta } from '../../types';

const meta: ItemMeta = {
  id: 'context-menu',
  category: 'navigation',
  tags: ['context menu', 'right click', 'long press', 'submenu', 'keyboard shortcuts', 'menu'],
  difficulty: 'hard',
  tech: ['contextmenu event', 'ARIA menu', 'Viewport collision'],
  addedAt: '2026-10-21',
  text: {
    en: {
      name: 'Right-Click Context Menu',
      summary:
        'A custom right-click (or long-press) menu with icons, shortcuts, a submenu and a destructive action.',
      description:
        'A context menu offers actions for the thing under the pointer: right-click on desktop, long-press on touch screens. It appears exactly at the pointer, flips to stay inside the viewport, and closes on selection, Escape or a click elsewhere.\n\nIt follows the ARIA menu pattern: role="menu" and role="menuitem", with arrow keys to move, Right to open a submenu, Left to close it, and Enter to activate. Items can show keyboard shortcuts, be disabled, or be styled as destructive (red). Keyboard users can also open it with the Menu key or Shift+F10.',
      prompt:
        'Create a custom context menu for a file card.\n- Opens on right-click (contextmenu event) at the pointer position, and on long-press (500ms) on touch devices; Shift+F10 / Menu key opens it for the focused card\n- Items with icons and right-aligned shortcuts: Open, Rename (F2), Duplicate (⌘D), Share ▸ (submenu: Copy link, Email, Slack), a divider, Move to trash (red)\n- One disabled item\n- Reposition to stay inside the viewport (flip left/up near edges)\n- ARIA menu pattern: role="menu"/"menuitem", arrow-key navigation, Right/Left for the submenu, Enter to activate, Escape and outside click to close, focus returns to the card\n- Fade/scale-in animation from the pointer position\nUse React and Tailwind CSS (or Radix UI Context Menu).',
      tips: [
        'Add checkable items (e.g. "Show hidden files").',
        'Show different menus for different targets.',
        'Use the same menu for a "…" button on mobile.',
      ],
    },
    ja: {
      name: '右クリックのコンテキストメニュー',
      summary:
        'アイコン、ショートカット、サブメニュー、削除系の操作を備えた独自の右クリック(長押し)メニュー。',
      description:
        'コンテキストメニューは、ポインターの下にあるものに対する操作を出すUIで、PCでは右クリック、タッチ画面では長押しで開きます。ポインターのちょうどその位置に現れ、画面からはみ出さないよう向きを反転し、選択・Esc・他の場所のクリックで閉じます。\n\nARIAのメニューのパターンに従い、role="menu" と role="menuitem" を使い、矢印キーで移動、右キーでサブメニューを開き、左キーで閉じ、Enterで実行します。項目にはキーボードショートカットの表示、無効化、削除系の赤い表示を付けられます。キーボード利用者はメニューキーかShift+F10でも開けます。',
      prompt:
        'ファイルカード用の独自のコンテキストメニューを作ってください。\n- 右クリック(contextmenuイベント)でポインターの位置に開き、タッチ端末では長押し(500ms)で開く。フォーカス中のカードではShift+F10やメニューキーでも開く\n- アイコンと右寄せのショートカット付きの項目:開く、名前を変更(F2)、複製(⌘D)、共有 ▸(サブメニュー:リンクをコピー、メール、Slack)、区切り線、ゴミ箱へ移動(赤)\n- 無効化した項目を1つ含める\n- 画面からはみ出さないよう位置を調整(端の近くでは左/上へ反転)\n- ARIAのメニューのパターン:role="menu"/"menuitem"、矢印キーでの移動、左右でサブメニュー、Enterで実行、Escと外側のクリックで閉じ、フォーカスをカードに戻す\n- ポインターの位置からのフェード+拡大のアニメーション\nReactとTailwind CSS(またはRadix UIのContext Menu)で実装してください。',
      tips: [
        'チェックできる項目(例:「隠しファイルを表示」)を追加して',
        '対象ごとに違うメニューを出して',
        'スマホでは同じメニューを「…」ボタンから開けるようにして',
      ],
    },
  },
};

export default meta;
