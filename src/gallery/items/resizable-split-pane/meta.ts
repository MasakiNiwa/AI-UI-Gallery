import type { ItemMeta } from '../../types';

const meta: ItemMeta = {
  id: 'resizable-split-pane',
  category: 'layout',
  tags: ['split view', 'resizable panels', 'splitter', 'ide layout', 'drag handle'],
  difficulty: 'medium',
  tech: ['Pointer capture', 'ARIA separator'],
  addedAt: '2026-10-20',
  text: {
    en: {
      name: 'Resizable Split Panes',
      summary:
        'An editor-like layout with draggable dividers to resize panels, plus keyboard support.',
      description:
        'Resizable split panes divide the screen into panels separated by a draggable handle, as in code editors, email clients and design tools. Users can give more room to what they are working on, collapse a panel completely, or double-click the handle to reset.\n\nThe divider uses pointer capture so dragging continues even if the pointer leaves the thin handle, and sizes are clamped to sensible minimums. For accessibility, the handle is a focusable element with role="separator", aria-valuenow, and arrow-key resizing.',
      prompt:
        'Create a three-panel IDE-like layout with resizable split panes.\n- Left: file tree sidebar; center: editor; right: preview. Separated by vertical drag handles\n- Dragging a handle resizes the adjacent panels; use setPointerCapture so dragging is smooth; clamp to a minimum width of 120px\n- Double-click a handle to reset to the default sizes; a button collapses/expands the sidebar\n- Handles have role="separator", aria-orientation="vertical", aria-valuenow (percent), and are focusable; Left/Right arrow keys resize by 2%\n- Show a highlight on the handle while hovering or dragging and change the cursor to col-resize\n- Save sizes to localStorage\nUse React and Tailwind CSS (or react-resizable-panels).',
      tips: [
        'Add a horizontal split inside the editor for a terminal.',
        'Stack the panels vertically on mobile.',
        'Snap panels closed when dragged below a threshold.',
      ],
    },
    ja: {
      name: 'サイズ変更できる分割ペイン',
      summary:
        'ドラッグできる仕切りでパネルの大きさを変えられる、エディター風のレイアウト。キーボード操作にも対応。',
      description:
        'サイズ変更できる分割ペインは、ドラッグ可能な仕切りで画面を複数のパネルに分けるレイアウトで、コードエディター・メールソフト・デザインツールでおなじみです。作業中のものに広い場所を割り当てたり、パネルを完全にたたんだり、仕切りをダブルクリックして元の大きさに戻したりできます。\n\n仕切りではポインターキャプチャを使うので、細い仕切りからポインターが外れてもドラッグが続き、サイズは適切な最小値で制限します。アクセシビリティのため、仕切りは role="separator" と aria-valuenow を持つフォーカス可能な要素にし、矢印キーでも大きさを変えられるようにします。',
      prompt:
        'サイズ変更できる分割ペインを使った、IDE風の3パネルレイアウトを作ってください。\n- 左:ファイルツリーのサイドバー、中央:エディター、右:プレビュー。縦のドラッグハンドルで区切る\n- ハンドルをドラッグすると隣のパネルの大きさが変わる。setPointerCapture で滑らかにドラッグでき、最小幅は120px\n- ハンドルをダブルクリックすると既定の大きさに戻る。ボタンでサイドバーを折りたたみ/展開\n- ハンドルには role="separator"、aria-orientation="vertical"、aria-valuenow(パーセント)を付け、フォーカス可能にし、左右の矢印キーで2%ずつ変更\n- ホバー中やドラッグ中はハンドルを強調表示し、カーソルを col-resize にする\n- 大きさをlocalStorageに保存\nReactとTailwind CSS(またはreact-resizable-panels)で実装してください。',
      tips: [
        'エディターの中を横に分割してターミナルを追加して',
        'スマホではパネルを縦に積み重ねて',
        '一定より小さくドラッグしたらパネルが閉じるようにして',
      ],
    },
  },
};

export default meta;
