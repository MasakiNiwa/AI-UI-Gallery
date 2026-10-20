import type { ItemMeta } from '../../types';

const meta: ItemMeta = {
  id: 'music-player',
  category: 'cards',
  tags: ['music player', 'audio', 'media controls', 'progress bar', 'equalizer', 'now playing'],
  difficulty: 'medium',
  tech: ['Range input', 'CSS animation'],
  addedAt: '2026-10-21',
  text: {
    en: {
      name: 'Music Player Card',
      summary:
        'A "now playing" card with album art, a seekable progress bar, playback controls and an animated equalizer.',
      description:
        'A compact music player shows the current track with its artwork, a progress bar you can drag to seek, and the usual controls: previous, play/pause, next, shuffle and repeat. An animated equalizer and a softly rotating record make the playing state obvious at a glance.\n\nThe seek bar is a native range input styled with CSS, so it is keyboard- and touch-accessible for free. In a real app it would be connected to an <audio> element (currentTime, duration and the timeupdate event); this demo simulates playback with a timer.',
      prompt:
        'Design a "now playing" music player card.\n- Album art (gradient placeholder) that slowly rotates like a vinyl record while playing\n- Track title, artist and a like button\n- A seek bar built on <input type="range"> with custom styling, showing elapsed and remaining time (m:ss); dragging seeks\n- Controls: shuffle, previous, a large play/pause toggle, next, repeat (toggles show an active color)\n- An animated 4-bar equalizer next to the title while playing\n- A playlist of 3 tracks below; clicking one plays it and the current track is highlighted\n- Space toggles play/pause when the card is focused\n- Simulate playback with a timer (or connect to an <audio> element)\nUse React and Tailwind CSS.',
      tips: [
        'Connect it to a real audio file and the Media Session API.',
        'Extract the accent color from the album art.',
        'Add a volume slider and a mini-player mode.',
      ],
    },
    ja: {
      name: '音楽プレイヤーのカード',
      summary:
        'アルバムアート、シークできる進捗バー、再生操作、動くイコライザーを備えた「再生中」カード。',
      description:
        'コンパクトな音楽プレイヤーは、再生中の曲をアートワークとともに表示し、ドラッグしてシークできる進捗バーと、前へ・再生/一時停止・次へ・シャッフル・リピートといった定番の操作を備えます。動くイコライザーとゆっくり回るレコードで、再生中であることがひと目でわかります。\n\nシークバーはCSSで装飾したネイティブのrange入力なので、キーボードやタッチでの操作に標準で対応します。実際のアプリでは <audio> 要素(currentTime、duration、timeupdateイベント)とつなぎますが、このデモではタイマーで再生を模擬しています。',
      prompt:
        '「再生中」の音楽プレイヤーのカードをデザインしてください。\n- 再生中はレコードのようにゆっくり回転するアルバムアート(グラデーションの仮画像)\n- 曲名、アーティスト名、いいねボタン\n- <input type="range"> をカスタム装飾したシークバー。経過時間と残り時間(m:ss)を表示し、ドラッグでシーク\n- 操作:シャッフル、前へ、大きな再生/一時停止の切り替え、次へ、リピート(切り替え式は有効時にアクセントカラー)\n- 再生中は曲名の横に4本のバーが動くイコライザー\n- 下に3曲のプレイリスト。クリックするとその曲を再生し、再生中の曲を強調表示\n- カードにフォーカスしているときはSpaceで再生/一時停止\n- 再生はタイマーで模擬する(または <audio> 要素につなぐ)\nReactとTailwind CSSで実装してください。',
      tips: [
        '本物の音声ファイルとMedia Session APIにつないで',
        'アルバムアートからアクセントカラーを抽出して',
        '音量スライダーとミニプレイヤーモードを追加して',
      ],
    },
  },
};

export default meta;
