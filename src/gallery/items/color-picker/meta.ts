import type { ItemMeta } from '../../types';

const meta: ItemMeta = {
  id: 'color-picker',
  category: 'inputs',
  tags: ['color picker', 'hsv', 'hue slider', 'hex', 'swatches', 'eyedropper'],
  difficulty: 'hard',
  tech: ['Pointer capture', 'HSV ↔ RGB', 'EyeDropper API'],
  addedAt: '2026-10-21',
  text: {
    en: {
      name: 'Color Picker',
      summary:
        'A saturation/brightness area, hue slider, hex input, recent swatches and an eyedropper.',
      description:
        'A full color picker lets users choose any color visually. The large square controls saturation (left to right) and brightness (top to bottom) for the current hue, and a rainbow slider below picks the hue. A hex field accepts typed values, preset swatches give quick choices, and the browser EyeDropper API (where supported) samples a color from anywhere on screen.\n\nInternally the color is kept in HSV, which maps directly to the controls, and converted to RGB/hex for display. Dragging uses pointer capture so it keeps working outside the square, and both controls also respond to arrow keys.',
      prompt:
        'Build a color picker component.\n- A square area: x = saturation, y = brightness, background = current hue with white→transparent and transparent→black gradients; a circular handle shows the selection\n- A horizontal hue slider with a rainbow gradient\n- Drag with mouse or touch using setPointerCapture; arrow keys move the handles (Shift for bigger steps); both are role="slider" with aria-valuetext\n- Hex input that validates and updates the picker; show RGB and HSL values\n- A preview swatch, 8 preset swatches and the last 6 recently used colors\n- An eyedropper button using window.EyeDropper when available (hidden otherwise)\n- Copy the hex value with one click\n- Keep the state in HSV\nUse React and TypeScript.',
      tips: [
        'Add an alpha (opacity) slider with a checkerboard background.',
        'Show the WCAG contrast ratio against white and black text.',
        'Generate a palette of tints and shades from the chosen color.',
      ],
    },
    ja: {
      name: 'カラーピッカー',
      summary:
        '彩度・明度のエリア、色相スライダー、HEX入力、最近使った色、スポイトを備えた色選択UI。',
      description:
        'フル機能のカラーピッカーは、どんな色でも見た目で選べるUIです。大きな四角のエリアは現在の色相に対する彩度(左右)と明度(上下)を、下の虹色のスライダーは色相を決めます。HEXの入力欄で値を直接入れることもでき、プリセットの色見本ですばやく選べ、ブラウザのEyeDropper API(対応環境のみ)で画面上のどこからでも色を拾えます。\n\n内部では操作と直接対応するHSVで色を保持し、表示用にRGBやHEXへ変換します。ドラッグはポインターキャプチャを使うのでエリアの外に出ても動き続け、どちらの操作も矢印キーに対応します。',
      prompt:
        'カラーピッカーのコンポーネントを作ってください。\n- 四角いエリア:横が彩度、縦が明度。背景は現在の色相に、白→透明と透明→黒のグラデーションを重ねる。丸いハンドルで選択位置を表示\n- 虹色グラデーションの横向きの色相スライダー\n- setPointerCapture を使ってマウスやタッチでドラッグ。矢印キーでハンドルを移動(Shiftで大きく)。どちらも aria-valuetext 付きの role="slider"\n- 入力を検証してピッカーに反映するHEX入力欄。RGBとHSLの値も表示\n- プレビュー、8色のプリセット、最近使った6色\n- window.EyeDropper が使える場合はスポイトボタン(使えない場合は非表示)\n- ワンクリックでHEX値をコピー\n- 状態はHSVで持つ\nReactとTypeScriptで実装してください。',
      tips: [
        '市松模様の背景付きでアルファ(不透明度)スライダーを追加して',
        '白文字・黒文字に対するWCAGのコントラスト比を表示して',
        '選んだ色から明暗のパレットを生成して',
      ],
    },
  },
};

export default meta;
