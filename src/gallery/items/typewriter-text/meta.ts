import type { ItemMeta } from '../../types';

const meta: ItemMeta = {
  id: 'typewriter-text',
  category: 'animation',
  tags: ['typewriter', 'typing', 'text animation', 'hero', 'cursor'],
  difficulty: 'easy',
  tech: ['JavaScript timers', 'CSS animation'],
  addedAt: '2026-10-20',
  text: {
    en: {
      name: 'Typewriter Text',
      summary: 'A headline that types and deletes rotating phrases with a blinking cursor.',
      description:
        'The typewriter effect reveals text one character at a time, then deletes it and types the next phrase. It is a popular way to show several value propositions in a hero section without taking extra space.\n\nA small state machine (typing → pause → deleting → next phrase) driven by timers updates the visible substring. The cursor is a CSS blinking bar. For accessibility, expose the full list of phrases to screen readers instead of every keystroke.',
      prompt:
        'Create a hero section headline with a typewriter effect.\n- Static text "Build a" followed by rotating phrases: "landing page", "dashboard", "chat app", "portfolio"\n- Type each phrase character by character (80 ms), pause 1.5 s, delete faster (40 ms), then type the next one, looping forever\n- Blinking cursor after the text using a CSS animation\n- Avoid layout shift: reserve width for the longest phrase or keep the line height fixed\n- Screen readers should read a static sentence (aria-label), not each character\n- If prefers-reduced-motion is set, simply swap phrases every 3 seconds without typing\nUse HTML, CSS and JavaScript.',
      tips: [
        'Give each phrase its own gradient color.',
        'Add a slight random delay between keystrokes for a natural feel.',
        'Pause the animation when the tab is not visible.',
      ],
    },
    ja: {
      name: 'タイプライターテキスト',
      summary: '点滅するカーソルとともに、フレーズを1文字ずつ打っては消していく見出し。',
      description:
        'タイプライター効果は、文字を1文字ずつ表示し、消してから次のフレーズを打つ表現です。ヒーローセクションで、場所を取らずに複数の魅力を順番に伝える方法として人気があります。\n\nタイマーで動く小さな状態遷移(入力中 → 一時停止 → 削除中 → 次のフレーズ)で、表示する部分文字列を更新します。カーソルはCSSで点滅させた縦棒です。アクセシビリティのため、スクリーンリーダーには1文字ずつではなくフレーズの一覧を伝えましょう。',
      prompt:
        'ヒーローセクションの見出しに、タイプライター効果を付けてください。\n- 固定テキスト「Build a」の後に、「landing page」「dashboard」「chat app」「portfolio」のフレーズを順番に表示\n- 各フレーズを1文字ずつ(80ms)入力し、1.5秒止まり、より速く(40ms)削除して次のフレーズへ。無限にループ\n- テキストの後ろにCSSアニメーションで点滅するカーソル\n- レイアウトのずれを防ぐ:最長フレーズ分の幅を確保するか、行の高さを固定\n- スクリーンリーダーには1文字ずつではなく固定の文章(aria-label)を読ませる\n- prefers-reduced-motion の場合は、入力アニメーションなしで3秒ごとにフレーズを切り替える\nHTML・CSS・JavaScriptで実装してください。',
      tips: [
        'フレーズごとに違うグラデーション色にして',
        '打鍵の間隔に少しランダムな揺らぎを入れて自然にして',
        'タブが非表示のときはアニメーションを止めて',
      ],
    },
  },
};

export default meta;
