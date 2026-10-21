import type { ItemMeta } from '../../types';

const meta: ItemMeta = {
  id: 'typing-speed-test',
  category: 'games',
  tags: ['typing test', 'WPM', 'keyboard', 'accuracy', 'game', 'caret'],
  difficulty: 'medium',
  tech: ['Keyboard events', 'CSS animation'],
  addedAt: '2026-10-22',
  text: {
    en: {
      name: 'Typing Speed Test',
      summary:
        'A minimalist typing test with a smooth caret, per-letter feedback, a countdown and a WPM / accuracy result.',
      description:
        'Inspired by minimalist typing sites, this test shows a line of words and colors each letter as you type: correct letters light up, mistakes turn red and extra letters are shown struck through. A caret glides smoothly to the next position instead of jumping.\n\nThe timer starts on the first keystroke and counts down 30 seconds. Words per minute are calculated from correctly typed characters (5 characters = 1 word), along with raw speed and accuracy. Backspace corrects the current word, and Tab or the restart button starts a new set of words. A hidden input catches keys so it also works with mobile keyboards.',
      prompt:
        'Build a minimalist typing speed test.\n- Show ~30 random common English words; a hidden input captures typing (works with mobile keyboards; clicking the text focuses it)\n- Color each letter: untyped = muted, correct = normal text, wrong = red, extra letters = red with strikethrough; Space moves to the next word\n- A caret that animates smoothly (CSS transition on transform) to the current letter\n- The 30-second countdown starts on the first key; show remaining seconds and live WPM\n- At the end show WPM (correct chars / 5 / minutes), raw WPM, accuracy and a "Restart" button (Tab also restarts)\n- Keep the best WPM in localStorage\nUse React and Tailwind CSS.',
      tips: [
        'Add 15 / 30 / 60 second modes.',
        'Draw a WPM-over-time line chart on the result screen.',
        'Highlight the keys you miss most on a keyboard map.',
      ],
    },
    ja: {
      name: 'タイピング速度テスト',
      summary:
        'なめらかなキャレット、1文字ずつのフィードバック、カウントダウン、WPMと正確さの結果を表示するシンプルなタイピングテスト。',
      description:
        'ミニマルなタイピングサイトをヒントにしたテストです。単語の並びを表示し、入力に合わせて1文字ずつ色を付けます。正しい文字は明るくなり、間違いは赤、余分な文字は取り消し線付きで表示します。キャレットは飛ばずに次の位置へなめらかに移動します。\n\n最初のキー入力でタイマーが始まり、30秒をカウントダウンします。1分あたりの単語数(WPM)は正しく入力した文字数から計算し(5文字=1単語)、入力全体の速度と正確さも表示します。Backspaceで今の単語を修正でき、Tabかリスタートボタンで新しい単語に切り替わります。見えない入力欄でキーを受け取るので、スマホのキーボードでも動作します。',
      prompt:
        'ミニマルなタイピング速度テストを作ってください。\n- よく使われる英単語をランダムに約30個表示。見えない入力欄で入力を受け取る(スマホのキーボードでも動作し、テキストをクリックするとフォーカス)\n- 1文字ずつ色分け:未入力=控えめ、正しい=通常の文字色、間違い=赤、余分な文字=赤の取り消し線。スペースで次の単語へ\n- 現在の文字へなめらかに移動する(transformのCSSトランジション)キャレット\n- 最初のキーで30秒のカウントダウンを開始し、残り秒数とリアルタイムのWPMを表示\n- 終了時にWPM(正しい文字数 / 5 / 分)、入力全体のWPM、正確さ、「もう一度」ボタンを表示(Tabでもリスタート)\n- 最高WPMをlocalStorageに保存\nReactとTailwind CSSで実装してください。',
      tips: [
        '15 / 30 / 60秒のモードを追加して',
        '結果画面にWPMの推移の折れ線グラフを描いて',
        'よく間違えるキーをキーボードの図で強調して',
      ],
    },
  },
};

export default meta;
