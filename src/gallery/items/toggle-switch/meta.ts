import type { ItemMeta } from '../../types';

const meta: ItemMeta = {
  id: 'toggle-switch',
  category: 'inputs',
  tags: ['switch', 'toggle', 'settings', 'checkbox'],
  difficulty: 'easy',
  tech: ['CSS transition', 'ARIA'],
  addedAt: '2026-10-20',
  text: {
    en: {
      name: 'Toggle Switch',
      summary: 'On/off switches with a sliding thumb, as seen in settings screens.',
      description:
        'A toggle switch represents a setting that takes effect immediately, such as enabling notifications. Compared with a checkbox, it communicates "on/off right now" rather than "select and submit later".\n\nAccessible switches use role="switch" with aria-checked (or a native checkbox underneath) so screen readers announce the state, and the whole row is clickable for comfortable touch use.',
      prompt:
        'Build a settings panel with iOS-style toggle switches.\n- Each row has a label, a short description and a switch on the right\n- The thumb slides smoothly and the track changes color when on\n- Use role="switch" and aria-checked, operable with Space/Enter\n- Clicking anywhere on the row toggles the switch\n- Include one disabled switch\n- Support light and dark mode\nUse HTML, CSS and a little JavaScript.',
      tips: [
        'Show an icon inside the thumb for on/off.',
        'Save the states to localStorage.',
        'Add a "loading" state while a setting is being saved.',
      ],
    },
    ja: {
      name: 'トグルスイッチ',
      summary: '設定画面でおなじみの、つまみがスライドするオン/オフスイッチ。',
      description:
        'トグルスイッチは、通知のオン/オフのように「切り替えた瞬間に反映される設定」を表すUIです。チェックボックスが「選んであとで送信」なのに対して、スイッチは「今すぐオン/オフ」を伝えます。\n\nアクセシビリティのために role="switch" と aria-checked(または内部で本物のチェックボックス)を使い、スクリーンリーダーに状態が伝わるようにします。行全体をタップできるようにすると、スマホでも操作しやすくなります。',
      prompt:
        'iOS風のトグルスイッチを並べた設定パネルを作ってください。\n- 各行に、ラベル・短い説明・右側のスイッチ\n- つまみが滑らかにスライドし、オンのときはトラックの色が変わる\n- role="switch" と aria-checked を使い、Space/Enterでも操作できる\n- 行のどこをクリックしても切り替わる\n- 無効化(disabled)されたスイッチを1つ含める\n- ライトモードとダークモードに対応\nHTML・CSSと少しのJavaScriptで実装してください。',
      tips: [
        'つまみの中にオン/オフのアイコンを表示して',
        '状態をlocalStorageに保存して',
        '保存中を表すローディング状態を追加して',
      ],
    },
  },
};

export default meta;
