import type { ItemMeta } from '../../types';

const meta: ItemMeta = {
  id: 'theme-toggle-switch',
  category: 'buttons',
  tags: ['dark mode toggle', 'theme switch', 'sun moon', 'animated icon', 'view transitions'],
  difficulty: 'medium',
  tech: ['CSS transitions', 'View Transitions API'],
  addedAt: '2026-10-22',
  text: {
    en: {
      name: 'Day / Night Theme Toggle',
      summary:
        'A playful sun-to-moon switch whose sky, clouds and stars animate, with a circular page reveal.',
      description:
        'A theme toggle is a tiny control that deserves some delight. This switch shows a daytime sky with a sun and clouds; flipping it slides the sun across, morphs it into a cratered moon and fades in twinkling stars.\n\nThe change of theme itself can use the View Transitions API: the browser captures the old and new page and reveals the new theme with a growing circle that starts at the toggle. Where the API is not supported, the colors simply cross-fade. The switch is a real button with role="switch" and aria-checked.',
      prompt:
        'Create an animated day/night theme toggle.\n- A pill-shaped switch (80×36px): day = blue sky with a yellow sun and two clouds; night = dark navy with a moon (with craters) and twinkling stars\n- On toggle, the knob slides across while morphing sun → moon; clouds slide out and stars fade in, all with CSS transitions\n- Use role="switch" and aria-checked; keyboard operable\n- Apply the theme to a preview card; use the View Transitions API (document.startViewTransition) to reveal the new theme with a circular clip-path expanding from the toggle, with a plain cross-fade fallback\n- Respect prefers-reduced-motion\nUse React and CSS.',
      tips: [
        'Add a third "system" position.',
        'Play a soft click sound on toggle.',
        'Persist the choice in localStorage.',
      ],
    },
    ja: {
      name: '昼/夜のテーマ切り替えスイッチ',
      summary: '太陽が月に変わり、空・雲・星が動く遊び心のあるスイッチ。ページは円形に切り替わる。',
      description:
        'テーマの切り替えは小さな操作ですが、ちょっとした楽しさを加える価値があります。このスイッチは昼間の空に太陽と雲を描き、切り替えると太陽が横へ滑りながらクレーターのある月に変わり、またたく星が現れます。\n\nテーマの変更自体には View Transitions API を使えます。ブラウザが変更前後のページを記録し、スイッチの位置から広がる円で新しいテーマを見せます。このAPIに対応していないブラウザでは、色がクロスフェードするだけにします。スイッチは role="switch" と aria-checked を持つ本物のボタンです。',
      prompt:
        'アニメーションする昼/夜のテーマ切り替えスイッチを作ってください。\n- ピル型のスイッチ(80×36px):昼は青空に黄色い太陽と2つの雲、夜は濃紺に(クレーター付きの)月とまたたく星\n- 切り替えると、つまみが滑りながら太陽→月に変わり、雲は外へ流れ、星がフェードイン。すべてCSSトランジションで\n- role="switch" と aria-checked を使い、キーボードでも操作可能に\n- テーマはプレビュー用のカードに適用。View Transitions API(document.startViewTransition)で、スイッチから広がる円形の clip-path で新しいテーマを見せ、非対応ならクロスフェード\n- prefers-reduced-motion に配慮\nReactとCSSで実装してください。',
      tips: [
        '3つ目の「システム」の位置を追加して',
        '切り替え時に小さなクリック音を鳴らして',
        '選択をlocalStorageに保存して',
      ],
    },
  },
};

export default meta;
