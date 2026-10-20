import type { ItemMeta } from '../../types';

const meta: ItemMeta = {
  id: 'signature-pad',
  category: 'inputs',
  tags: ['signature', 'drawing', 'canvas', 'pressure', 'undo', 'export png'],
  difficulty: 'medium',
  tech: ['Canvas 2D', 'Pointer events (pressure)'],
  addedAt: '2026-10-21',
  text: {
    en: {
      name: 'Signature Pad',
      summary:
        'Draw a smooth signature with mouse, finger or pen, with undo, clear and PNG export.',
      description:
        'A signature pad captures a handwritten signature for contracts, deliveries and forms. Strokes should feel like ink: smooth curves instead of jagged lines, and slightly thicker when drawn slowly or pressed harder with a pen.\n\nPointer events unify mouse, touch and stylus input (including pen pressure). Each stroke is stored as a list of points, drawn with quadratic curves through the midpoints for smoothness, and the canvas is redrawn from the stroke list so Undo is easy. The result can be exported as a PNG with canvas.toDataURL().',
      prompt:
        'Create a signature pad component.\n- A canvas with a baseline and "Sign here" hint; scale for devicePixelRatio and keep strokes on resize\n- Draw with pointer events (mouse, touch, pen); prevent page scrolling while drawing (touch-action: none)\n- Smooth strokes using quadratic curves through midpoints; vary line width by speed and pen pressure\n- Store strokes as point arrays; Undo removes the last stroke, Clear removes all\n- Pen color choices (black, blue) and a thickness slider\n- "Save" exports a trimmed PNG with toDataURL and shows a preview; disable Save when empty\n- Keyboard users can type their name as an alternative signature\nUse React and TypeScript.',
      tips: [
        'Export as SVG instead of PNG.',
        'Use the signature_pad library.',
        'Replay the signature as an animation.',
      ],
    },
    ja: {
      name: '手書きサインパッド',
      summary: 'マウス・指・ペンでなめらかにサインを書ける。元に戻す、クリア、PNG書き出し付き。',
      description:
        'サインパッドは、契約・配達・各種フォームのために手書きのサインを取り込むUIです。線はインクのような書き心地が大切で、ガタガタの線ではなくなめらかな曲線にし、ゆっくり書いたときやペンを強く押したときは少し太くします。\n\nポインターイベントを使うと、マウス・タッチ・スタイラスの入力(ペンの筆圧を含む)をまとめて扱えます。1画ごとに点の配列として保存し、中点を通る2次曲線でなめらかに描き、キャンバスは画の一覧から描き直すので「元に戻す」も簡単です。結果は canvas.toDataURL() でPNGとして書き出せます。',
      prompt:
        'サインパッドのコンポーネントを作ってください。\n- 基準線と「ここにサイン」の案内があるキャンバス。devicePixelRatio に合わせて拡大し、リサイズしても線を保つ\n- ポインターイベント(マウス、タッチ、ペン)で描画し、描いている間はページのスクロールを防ぐ(touch-action: none)\n- 中点を通る2次曲線でなめらかな線にし、速さとペンの筆圧で線の太さを変える\n- 画を点の配列として保存し、「元に戻す」で最後の1画を、「クリア」ですべてを消す\n- ペンの色(黒、青)と太さのスライダー\n- 「保存」で余白を切り詰めたPNGを toDataURL で書き出してプレビュー表示。何も書いていないときは無効化\n- キーボード利用者向けに、名前を入力して代わりのサインにできるようにする\nReactとTypeScriptで実装してください。',
      tips: [
        'PNGの代わりにSVGで書き出して',
        'signature_padライブラリを使って',
        'サインを書いた順にアニメーションで再生して',
      ],
    },
  },
};

export default meta;
