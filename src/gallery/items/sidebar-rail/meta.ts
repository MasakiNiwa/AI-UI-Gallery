import type { ItemMeta } from '../../types';

const meta: ItemMeta = {
  id: 'sidebar-rail',
  category: 'navigation',
  tags: ['sidebar', 'navigation rail', 'collapsible', 'side menu', 'tooltip', 'app shell'],
  difficulty: 'medium',
  tech: ['CSS transitions', 'Container queries'],
  addedAt: '2026-10-22',
  text: {
    en: {
      name: 'Collapsible Sidebar Rail',
      summary:
        'A sidebar that collapses into an icon rail, with tooltips, nested sections, badges and an active indicator.',
      description:
        'Desktop apps often need a sidebar that can get out of the way. This one collapses from a full menu with labels into a narrow rail of icons. In rail mode, hovering or focusing an icon shows its label as a tooltip, and nested groups open as a flyout.\n\nThe width animates smoothly, labels fade rather than wrap, and a sliding indicator marks the active page. Badges show counts in both modes (as a dot when collapsed). The toggle is a real button with aria-expanded, and the menu is a nav landmark with aria-current on the active link.',
      prompt:
        'Build a collapsible sidebar that turns into an icon rail.\n- Expanded (240px): app logo, nav items with icon + label, a collapsible "Projects" group with sub-items, unread count badges, and a user card at the bottom\n- Collapsed (64px): icons only; hovering/focusing an icon shows its label as a tooltip on the right; badges become small dots\n- A toggle button at the top (aria-expanded) animates the width with a CSS transition; labels fade out instead of wrapping\n- The active item has a highlighted background and an accent bar that slides between items\n- Use <nav> and aria-current="page"; on narrow screens start collapsed\nUse React and Tailwind CSS.',
      tips: [
        'Remember the collapsed state in localStorage.',
        'Expand temporarily when hovering the rail.',
        'Add a keyboard shortcut ([) to toggle it.',
      ],
    },
    ja: {
      name: '折りたためるサイドバー(レール)',
      summary:
        'アイコンだけのレールに折りたためるサイドバー。ツールチップ、入れ子のセクション、バッジ、選択中の印付き。',
      description:
        'デスクトップ向けのアプリでは、必要に応じて邪魔にならないサイドバーが求められます。このサイドバーは、ラベル付きのメニューから、アイコンだけの細いレールに折りたためます。レール表示では、アイコンにホバーまたはフォーカスするとラベルがツールチップで表示され、入れ子のグループはフライアウトで開きます。\n\n幅はなめらかにアニメーションし、ラベルは折り返さずにフェードします。選択中のページは滑って移動するインジケーターで示します。バッジはどちらの表示でも件数を示し、折りたたみ時は点になります。切り替えボタンは aria-expanded を持つ本物のボタンで、メニューは nav ランドマーク、選択中のリンクには aria-current を付けています。',
      prompt:
        'アイコンレールに折りたためるサイドバーを作ってください。\n- 展開時(240px):アプリのロゴ、アイコン+ラベルのナビ項目、サブ項目を持つ折りたたみ式の「プロジェクト」グループ、未読数のバッジ、下部にユーザーカード\n- 折りたたみ時(64px):アイコンのみ。ホバー/フォーカスで右側にラベルのツールチップを表示し、バッジは小さな点に\n- 上部の切り替えボタン(aria-expanded)で、幅をCSSトランジションでアニメーション。ラベルは折り返さずにフェードアウト\n- 選択中の項目は背景を強調し、アクセントのバーが項目間を滑って移動\n- <nav> と aria-current="page" を使い、狭い画面では折りたたんだ状態で開始\nReactとTailwind CSSで実装してください。',
      tips: [
        '折りたたみ状態をlocalStorageに保存して',
        'レールにホバーしている間だけ一時的に展開して',
        'キーボードショートカット([)で切り替えられるようにして',
      ],
    },
  },
};

export default meta;
