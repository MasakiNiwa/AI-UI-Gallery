import type { ItemMeta } from '../../types';

const meta: ItemMeta = {
  id: 'tooltip-popover',
  category: 'feedback',
  tags: ['tooltip', 'popover', 'hint', 'floating ui', 'positioning'],
  difficulty: 'medium',
  tech: ['Floating positioning', 'aria-describedby'],
  addedAt: '2026-10-20',
  text: {
    en: {
      name: 'Tooltip & Popover',
      summary:
        'Small hints on hover/focus and a click-to-open popover with an arrow, placed on any side.',
      description:
        'A tooltip is a short text label that appears when you hover over or focus an element, typically to explain an icon-only button. A popover is larger, opens on click, and can contain interactive content such as a small form or a menu.\n\nBoth float next to their trigger with a small arrow pointing at it. Tooltips appear after a short delay, are linked with aria-describedby and must also show on keyboard focus. Popovers close on outside click or Escape. Positioning libraries like Floating UI flip the placement automatically when there is not enough space.',
      prompt:
        'Create tooltip and popover components.\n- Tooltip: appears 300ms after hover or immediately on keyboard focus, hides on mouse leave / blur / Escape; dark rounded label with a small arrow; supports top, right, bottom and left placement\n- Link the tooltip with aria-describedby and role="tooltip"\n- Popover: opens on click, contains a title, text and two buttons; closes on outside click or Escape; returns focus to the trigger\n- Both animate in with a short fade and scale from the trigger side\n- Automatically flip to the opposite side when there is not enough space\n- Demo: a toolbar of icon buttons with tooltips, and a "Share" button with a popover\nUse React, Tailwind CSS and Floating UI.',
      tips: [
        'Add a "rich tooltip" with an image and a link.',
        'Use the native Popover API (popover attribute) instead.',
        'Make the tooltip follow the cursor.',
      ],
    },
    ja: {
      name: 'ツールチップとポップオーバー',
      summary:
        'ホバーやフォーカスで出る小さなヒントと、クリックで開く矢印付きのポップオーバー。表示位置は上下左右に対応。',
      description:
        'ツールチップは、要素にホバーやフォーカスしたときに現れる短い説明文で、アイコンだけのボタンを説明するのによく使います。ポップオーバーはもっと大きく、クリックで開き、小さなフォームやメニューのような操作できる内容も入れられます。\n\nどちらも起点の要素の隣に浮かび、小さな矢印で起点を指します。ツールチップは少し遅れて表示し、aria-describedby で関連付け、キーボードでのフォーカス時にも表示する必要があります。ポップオーバーは外側のクリックやEscで閉じます。Floating UIのような配置ライブラリを使うと、余白が足りないときに自動で反対側へ表示を切り替えられます。',
      prompt:
        'ツールチップとポップオーバーのコンポーネントを作ってください。\n- ツールチップ:ホバーから300ms後、キーボードフォーカスでは即座に表示し、マウスが離れたとき・フォーカスが外れたとき・Escで隠す。小さな矢印付きの暗い角丸ラベル。上・右・下・左の配置に対応\n- ツールチップは role="tooltip" とし、aria-describedby で関連付ける\n- ポップオーバー:クリックで開き、タイトル・本文・ボタン2つを含む。外側のクリックやEscで閉じ、フォーカスを起点に戻す\n- どちらも起点側から短いフェード+拡大で現れる\n- 余白が足りないときは自動で反対側に切り替える\n- デモ:ツールチップ付きのアイコンボタンを並べたツールバーと、ポップオーバー付きの「共有」ボタン\nReact、Tailwind CSS、Floating UIで実装してください。',
      tips: [
        '画像やリンク入りの「リッチツールチップ」を追加して',
        'ネイティブのPopover API(popover属性)を使って',
        'ツールチップがカーソルを追いかけるようにして',
      ],
    },
  },
};

export default meta;
