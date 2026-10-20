import type { ItemMeta } from '../../types';

const meta: ItemMeta = {
  id: 'audio-visualizer',
  category: 'effects',
  tags: ['audio', 'visualizer', 'web audio', 'spectrum', 'waveform', 'synth', 'canvas'],
  difficulty: 'hard',
  tech: ['Web Audio API', 'AnalyserNode', 'Canvas 2D'],
  addedAt: '2026-10-21',
  text: {
    en: {
      name: 'Audio Visualizer',
      summary:
        'A tiny synth plays a melody while a circular spectrum and waveform react in real time.',
      description:
        'An audio visualizer turns sound into motion: frequency bars that pulse with the beat and a waveform that traces the signal. It is a fun showcase of the Web Audio API, which can generate, process and analyse sound entirely in the browser.\n\nHere oscillators play a short looping melody, routed through an AnalyserNode. Every animation frame, getByteFrequencyData() and getByteTimeDomainData() provide the spectrum and waveform, which are drawn on a canvas as radial bars around a pulsing circle. Browsers only allow audio after a user gesture, so playback starts from a Play button, with a volume slider and a mute option.',
      prompt:
        'Build an audio visualizer with the Web Audio API.\n- A Play/Stop button creates an AudioContext (after the user gesture) and plays a looping 8-note melody with OscillatorNodes and a gain envelope; add a soft bass note on each beat\n- Route the sound through an AnalyserNode (fftSize 256) and a master GainNode with a volume slider\n- On a <canvas>, every animation frame: draw 64 frequency bars arranged in a circle around a center circle whose size pulses with the overall level, and draw the time-domain waveform as a line across the bottom\n- Color bars with a hue gradient; handle devicePixelRatio and resize\n- Clean up (stop oscillators, close the AudioContext) on stop and unmount\n- Show a static illustration when reduced motion is requested\nUse TypeScript and React.',
      tips: [
        'Visualize the microphone input with getUserMedia.',
        'Let users upload an audio file and visualize it.',
        'Render the bars with WebGL for a 3D look.',
      ],
    },
    ja: {
      name: 'オーディオビジュアライザー',
      summary: '小さなシンセがメロディを奏で、円形のスペクトラムと波形がリアルタイムに反応する。',
      description:
        'オーディオビジュアライザーは、音を動きに変える表現です。周波数のバーがビートに合わせて脈打ち、波形が信号をなぞります。音の生成・加工・分析をすべてブラウザ内で行えるWeb Audio APIのよい見本になります。\n\nこのデモでは、オシレーターが短いメロディをループ再生し、その音をAnalyserNodeに通しています。毎フレーム getByteFrequencyData() と getByteTimeDomainData() でスペクトラムと波形を取得し、脈打つ円のまわりに放射状のバーとしてキャンバスへ描きます。ブラウザはユーザーの操作のあとでしか音を出せないため、再生は「再生」ボタンから始め、音量スライダーとミュートも用意します。',
      prompt:
        'Web Audio APIでオーディオビジュアライザーを作ってください。\n- 再生/停止ボタンで(ユーザー操作のあとに)AudioContextを作り、OscillatorNodeと音量の包絡線で8音のメロディをループ再生。拍ごとに柔らかいベース音も鳴らす\n- 音はAnalyserNode(fftSize 256)と、音量スライダー付きのマスターGainNodeに通す\n- <canvas> に毎フレーム描画:中央の円(全体の音量で大きさが脈打つ)のまわりに64本の周波数バーを円状に並べ、下部に時間領域の波形を線で描く\n- バーは色相のグラデーションで色付けし、devicePixelRatio とリサイズに対応\n- 停止時とアンマウント時に後片付け(オシレーターの停止、AudioContextのclose)\n- 動きを減らす設定では静止したイラストを表示\nTypeScriptとReactで実装してください。',
      tips: [
        'getUserMediaでマイク入力を可視化して',
        '音声ファイルをアップロードして可視化できるようにして',
        'WebGLでバーを3D風に描いて',
      ],
    },
  },
};

export default meta;
