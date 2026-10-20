import type { ItemMeta } from '../../types';

const meta: ItemMeta = {
  id: 'speed-dial-fab',
  category: 'buttons',
  tags: ['floating action button', 'fab', 'speed dial', 'mobile', 'quick actions'],
  difficulty: 'medium',
  tech: ['CSS transitions', 'ARIA menu button'],
  addedAt: '2026-10-21',
  text: {
    en: {
      name: 'Speed Dial (Floating Action Button)',
      summary:
        'A round floating "+" button that rotates and fans out labeled quick actions with a staggered animation.',
      description:
        'A floating action button (FAB) gives the most important action of a screen a permanent, thumb-friendly spot in the corner. When there are a few related actions, a speed dial expands the FAB into a small stack of labeled mini buttons; the "+" rotates into an "×" to close.\n\nThe actions animate in with a slight stagger, a scrim dims the content so the choices stand out, and everything closes on outside tap, Escape or after choosing an action. For accessibility the FAB is a menu button with aria-expanded, and each action has a visible label rather than an icon alone.',
      prompt:
        'Create a speed dial floating action button for a notes app.\n- A 56px round accent-colored FAB fixed in the bottom-right corner with a "+" icon\n- Clicking it rotates the icon 45° into an "×" and reveals 4 smaller actions stacked above it (New note, Photo, Voice memo, Checklist), each with an icon and a text label pill\n- Actions appear with a staggered scale/fade animation (40ms apart) and hide in reverse order\n- A semi-transparent scrim behind; close on scrim click, Escape, or after picking an action (then show a toast)\n- aria-haspopup="menu", aria-expanded, and role="menuitem" for the actions; arrow keys move between them\n- Hide the FAB while scrolling down a list, show it on scroll up\nUse React and Tailwind CSS.',
      tips: [
        'Make it an extended FAB with a text label that collapses on scroll.',
        'Fan the actions out in a quarter circle instead of a stack.',
        'Add a long-press shortcut for the primary action.',
      ],
    },
    ja: {
      name: 'スピードダイヤル(フローティングボタン)',
      summary: '丸い「+」のフローティングボタンが回転し、ラベル付きの操作が時間差で広がる。',
      description:
        'フローティングアクションボタン(FAB)は、画面で最も重要な操作を、隅の親指で押しやすい位置に常に置いておくUIです。関連する操作がいくつかある場合、スピードダイヤルとしてFABを広げ、ラベル付きの小さなボタンを積み重ねて表示します。閉じるときは「+」が回転して「×」になります。\n\n操作ボタンは少しずつ時間差を付けて現れ、背景を暗くして選択肢を目立たせ、外側のタップ・Esc・操作の選択で閉じます。アクセシビリティのため、FABは aria-expanded を持つメニューボタンにし、各操作はアイコンだけでなく目に見えるラベルを付けます。',
      prompt:
        'メモアプリ用のスピードダイヤル型フローティングアクションボタンを作ってください。\n- 右下に固定した、アクセントカラーの直径56pxの丸いFAB(「+」アイコン)\n- クリックするとアイコンが45°回転して「×」になり、上に4つの小さな操作(新規メモ、写真、ボイスメモ、チェックリスト)が積み重なって現れる。それぞれアイコンとテキストラベルのピル付き\n- 操作は40msずつ時間差を付けた拡大+フェードで現れ、閉じるときは逆順で消える\n- 背後に半透明の幕。幕のクリック、Esc、操作の選択(そのあとトーストを表示)で閉じる\n- aria-haspopup="menu"、aria-expanded、操作には role="menuitem"。矢印キーで操作間を移動\n- 一覧を下にスクロール中はFABを隠し、上にスクロールしたら表示\nReactとTailwind CSSで実装してください。',
      tips: [
        'テキストラベル付きの拡張FABにして、スクロールで縮むようにして',
        '縦に積む代わりに四分円状に広げて',
        'メインの操作を長押しで実行できるようにして',
      ],
    },
  },
};

export default meta;
