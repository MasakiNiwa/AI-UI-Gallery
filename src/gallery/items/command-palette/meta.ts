import type { ItemMeta } from '../../types';

const meta: ItemMeta = {
  id: 'command-palette',
  category: 'navigation',
  tags: ['command palette', 'cmd+k', 'spotlight search', 'keyboard shortcuts', 'quick actions'],
  difficulty: 'medium',
  tech: ['Keyboard shortcuts', 'ARIA combobox'],
  addedAt: '2026-10-20',
  text: {
    en: {
      name: 'Command Palette (⌘K)',
      summary:
        'A keyboard-first search box that opens with ⌘K / Ctrl+K and runs commands or jumps to pages.',
      description:
        'A command palette is a searchable list of every action in an app, opened with a keyboard shortcut (usually ⌘K or Ctrl+K). Power users can do anything without reaching for the mouse: type a few letters, move with the arrow keys and press Enter. It is a staple of modern tools such as code editors and project management apps.\n\nCommands are grouped (Navigation, Actions, Settings), show their own shortcuts, and are filtered as you type. The palette is a modal dialog with a combobox and listbox inside, and closes with Escape.',
      prompt:
        'Build a command palette that opens with Cmd+K (Mac) or Ctrl+K (Windows), and from a "Search… ⌘K" button.\n- A centered modal with a search input at the top and grouped results below (Navigation, Actions, Theme)\n- Each command has an icon, a label and an optional keyboard shortcut hint on the right\n- Typing filters commands with fuzzy matching; show "No results" when empty\n- Arrow Up/Down move the highlighted item (scrolling it into view), Enter runs it, Escape closes\n- Remember the 3 most recently used commands and show them first under "Recent"\n- Accessible: role="dialog", combobox + listbox with aria-activedescendant\nUse React and Tailwind CSS (or the cmdk library).',
      tips: [
        'Support nested pages (e.g. "Change theme…" opens a sub-list).',
        'Search remote data with debouncing.',
        'Show a preview panel for the highlighted item.',
      ],
    },
    ja: {
      name: 'コマンドパレット(⌘K)',
      summary:
        '⌘K / Ctrl+Kで開き、コマンドの実行やページ移動ができる、キーボード中心の検索ボックス。',
      description:
        'コマンドパレットは、アプリのあらゆる操作を検索できる一覧で、キーボードショートカット(多くは⌘KかCtrl+K)で開きます。数文字入力し、矢印キーで選んでEnterを押すだけなので、マウスに手を伸ばさずに何でもできます。コードエディターやプロジェクト管理ツールなど、最近のツールの定番UIです。\n\nコマンドはグループ(ナビゲーション、操作、設定)に分け、それぞれのショートカットも表示し、入力に合わせて絞り込みます。パレットは中にコンボボックスとリストボックスを持つモーダルダイアログで、Escで閉じます。',
      prompt:
        'Cmd+K(Mac)かCtrl+K(Windows)、または「検索… ⌘K」ボタンで開くコマンドパレットを作ってください。\n- 画面中央のモーダルで、上部に検索欄、その下にグループ分けした結果(ナビゲーション、操作、テーマ)\n- 各コマンドにアイコン、ラベル、右側に任意のキーボードショートカット表示\n- 入力するとあいまい一致でコマンドを絞り込み、該当なしなら「結果なし」\n- 上下の矢印キーで選択中の項目を移動(見える位置までスクロール)、Enterで実行、Escで閉じる\n- 最近使った3つのコマンドを覚えて「最近」として最初に表示\n- アクセシブルに:role="dialog"、aria-activedescendant を使ったコンボボックス+リストボックス\nReactとTailwind CSS(またはcmdkライブラリ)で実装してください。',
      tips: [
        '入れ子のページ(例:「テーマを変更…」でサブリストを開く)に対応して',
        'デバウンスしてサーバーのデータを検索して',
        '選択中の項目のプレビューパネルを表示して',
      ],
    },
  },
};

export default meta;
