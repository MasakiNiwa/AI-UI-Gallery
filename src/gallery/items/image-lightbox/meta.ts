import type { ItemMeta } from '../../types';

const meta: ItemMeta = {
  id: 'image-lightbox',
  category: 'feedback',
  tags: ['lightbox', 'image viewer', 'gallery', 'zoom', 'pinch', 'thumbnails'],
  difficulty: 'hard',
  tech: ['Pointer events', 'CSS transform', 'Focus trap'],
  addedAt: '2026-10-21',
  text: {
    en: {
      name: 'Image Lightbox',
      summary:
        'Open a thumbnail into a full-screen viewer with zoom, pan, swipe navigation and a filmstrip.',
      description:
        'A lightbox shows an image large on a dark overlay without leaving the page. Users move between images with arrows, keys or swipes, zoom in with a double-click, the wheel or buttons, and drag to pan around when zoomed; a filmstrip of thumbnails and a "3 / 8" counter show where they are.\n\nThe viewer is a modal dialog: focus moves into it and is trapped there, Escape closes it, and focus returns to the thumbnail that opened it. Zoom and pan are a single CSS transform (translate + scale) updated from pointer events, which keeps the interaction smooth.',
      prompt:
        'Create an image gallery with a lightbox viewer.\n- A grid of 8 thumbnails; clicking one opens a full-screen dark overlay showing the large image, the caption and a "3 / 8" counter\n- Previous/next buttons, Left/Right keys and horizontal swipes navigate; navigation wraps around\n- Zoom with double-click, Ctrl/⌘ + wheel, pinch, or +/− buttons (1× to 4×); drag to pan while zoomed; reset zoom when changing images\n- A filmstrip of thumbnails at the bottom highlights the current image\n- Modal behavior: role="dialog", focus trap, Escape closes, focus returns to the thumbnail\n- Fade/scale-in animation from the thumbnail\nUse React and Tailwind CSS (or a library such as PhotoSwipe).',
      tips: [
        'Animate the image from the exact thumbnail position (FLIP).',
        'Add a download and share button to the toolbar.',
        'Support video items in the same viewer.',
      ],
    },
    ja: {
      name: '画像のライトボックス',
      summary:
        'サムネイルを全画面ビューアーで開く。拡大、移動、スワイプでの切り替え、フィルムストリップ付き。',
      description:
        'ライトボックスは、ページを離れずに、暗いオーバーレイの上で画像を大きく見せるUIです。矢印・キー・スワイプで画像を切り替え、ダブルクリック・ホイール・ボタンで拡大し、拡大中はドラッグで見たい場所へ移動できます。サムネイルのフィルムストリップと「3 / 8」の表示で現在地がわかります。\n\nビューアーはモーダルダイアログで、開くとフォーカスが中に移って閉じ込められ、Escで閉じ、開いたサムネイルにフォーカスが戻ります。拡大と移動はポインターイベントから更新する1つのCSS transform(translate + scale)なので、操作がなめらかです。',
      prompt:
        'ライトボックスで見られる画像ギャラリーを作ってください。\n- 8枚のサムネイルのグリッド。クリックすると全画面の暗いオーバーレイを開き、大きな画像、キャプション、「3 / 8」の表示を出す\n- 前へ/次へボタン、左右の矢印キー、横スワイプで切り替え。端ではループする\n- ダブルクリック、Ctrl/⌘+ホイール、ピンチ、+/−ボタンで拡大(1〜4倍)。拡大中はドラッグで移動。画像を切り替えたら拡大をリセット\n- 下部にサムネイルのフィルムストリップを置き、現在の画像を強調\n- モーダルとしての振る舞い:role="dialog"、フォーカスの閉じ込め、Escで閉じる、閉じたらサムネイルにフォーカスを戻す\n- サムネイルからのフェード+拡大のアニメーション\nReactとTailwind CSS(またはPhotoSwipeなどのライブラリ)で実装してください。',
      tips: [
        'サムネイルの位置から画像がそのまま広がるアニメーションにして(FLIP)',
        'ツールバーにダウンロードと共有のボタンを追加して',
        '同じビューアーで動画も扱えるようにして',
      ],
    },
  },
};

export default meta;
