import type { ItemMeta } from '../../types';

const meta: ItemMeta = {
  id: 'drawer-menu',
  category: 'navigation',
  tags: ['drawer', 'hamburger menu', 'off-canvas', 'side navigation', 'mobile menu'],
  difficulty: 'easy',
  tech: ['CSS transform', 'Focus management'],
  addedAt: '2026-10-20',
  text: {
    en: {
      name: 'Hamburger Drawer Menu',
      summary:
        'A hamburger icon that morphs into an × and slides a navigation drawer in from the side.',
      description:
        'On small screens, navigation often hides behind a "hamburger" icon (three lines). Tapping it slides a drawer in from the edge over a dimmed backdrop; the icon morphs into an × to show how to close it.\n\nA good drawer traps focus while open, closes on Escape or a backdrop tap, returns focus to the menu button afterwards, and uses aria-expanded / aria-controls on the button so assistive technology knows the menu state.',
      prompt:
        'Create a mobile navigation drawer opened by a hamburger button.\n- The hamburger icon (three lines) morphs into an × with CSS transforms when open\n- The drawer slides in from the left (280px wide) with a 250ms transition over a semi-transparent backdrop\n- Drawer content: user avatar and name, navigation links with icons (one marked active), a divider, and Settings / Log out at the bottom\n- Close on backdrop click, Escape key, or selecting a link; return focus to the hamburger button\n- Trap focus inside the drawer while open and lock page scrolling\n- Button uses aria-expanded and aria-controls\nUse HTML, CSS and JavaScript.',
      tips: [
        'Allow swiping the drawer closed on touch devices.',
        'Add collapsible sub-menus inside the drawer.',
        'Show the drawer permanently as a sidebar on desktop.',
      ],
    },
    ja: {
      name: 'ハンバーガードロワーメニュー',
      summary:
        'ハンバーガーアイコンが×に変わり、横からナビゲーションのドロワーがスライドして出るメニュー。',
      description:
        '狭い画面では、ナビゲーションを「ハンバーガー」アイコン(3本線)の奥に隠すことがよくあります。タップすると暗くなった背景の上に画面の端からドロワーがスライドして現れ、アイコンは閉じ方を示す×に変形します。\n\n良いドロワーは、開いている間フォーカスを内側に閉じ込め、Escや背景のタップで閉じ、閉じたらフォーカスをメニューボタンに戻します。ボタンには aria-expanded / aria-controls を付けて、支援技術にもメニューの状態を伝えます。',
      prompt:
        'ハンバーガーボタンで開くスマホ向けのナビゲーションドロワーを作ってください。\n- ハンバーガーアイコン(3本線)は、開くとCSSの変形で×に変わる\n- ドロワーは左から(幅280px)250msのトランジションでスライドし、背後に半透明の背景\n- ドロワーの内容:ユーザーのアバターと名前、アイコン付きのナビゲーションリンク(1つは選択中)、区切り線、下部に設定/ログアウト\n- 背景のクリック、Escキー、リンクの選択で閉じ、フォーカスをハンバーガーボタンに戻す\n- 開いている間はドロワー内にフォーカスを閉じ込め、ページのスクロールを止める\n- ボタンには aria-expanded と aria-controls を使う\nHTML・CSS・JavaScriptで実装してください。',
      tips: [
        'タッチ端末ではスワイプでドロワーを閉じられるようにして',
        'ドロワー内に折りたためるサブメニューを追加して',
        'PCではドロワーを常に表示するサイドバーにして',
      ],
    },
  },
};

export default meta;
