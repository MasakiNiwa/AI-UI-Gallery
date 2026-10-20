import type { ItemMeta } from '../../types';

const meta: ItemMeta = {
  id: 'animated-tabs',
  category: 'navigation',
  tags: ['tabs', 'segmented control', 'indicator', 'navigation'],
  difficulty: 'medium',
  tech: ['CSS transition', 'ARIA tabs'],
  addedAt: '2026-10-20',
  text: {
    en: {
      name: 'Tabs with Sliding Indicator',
      summary: 'Tabs whose highlight slides smoothly to the selected item, in two styles.',
      description:
        'Tabs switch between views that share the same space. A sliding indicator, an underline or a "pill" behind the active tab that moves to the newly selected tab, helps users follow the change.\n\nThe indicator is a single absolutely positioned element whose left offset and width are measured from the active tab and animated with CSS transitions. Proper tabs use role="tablist", role="tab" and role="tabpanel" and support arrow-key navigation.',
      prompt:
        'Build accessible tabs with an animated sliding indicator.\n- Two variants: an underline indicator and a pill (segmented control) background\n- The indicator measures the active tab\'s position and width and slides there with a CSS transition\n- Re-measure on window resize and font load\n- Use role="tablist" / "tab" / "tabpanel", aria-selected and aria-controls\n- Left/Right arrow keys move between tabs, Home/End jump to first/last\n- Fade the panel content when switching\nUse React and Tailwind CSS.',
      tips: [
        'Make the tab bar horizontally scrollable on mobile.',
        "Use Framer Motion's layoutId for the indicator.",
        'Add a badge with a count to one tab.',
      ],
    },
    ja: {
      name: 'スライドするインジケーター付きタブ',
      summary: '選んだタブへハイライトがなめらかに移動するタブ。2種類のスタイル。',
      description:
        'タブは、同じ場所で表示内容を切り替えるためのUIです。選択中のタブの下線や背景(ピル型)が新しいタブへスライドして移動すると、何が切り替わったのかを目で追いやすくなります。\n\nインジケーターは絶対配置した要素1つで、選択中タブの位置と幅を測ってCSSトランジションで動かします。正しいタブUIでは role="tablist"・role="tab"・role="tabpanel" を使い、矢印キーでの移動にも対応します。',
      prompt:
        'スライドするインジケーター付きの、アクセシブルなタブを作ってください。\n- 2種類:下線のインジケーターと、ピル型(セグメンテッドコントロール)の背景\n- インジケーターは選択中のタブの位置と幅を測り、CSSトランジションでそこへスライドする\n- ウィンドウのリサイズ時やフォント読み込み後に再計測する\n- role="tablist" / "tab" / "tabpanel"、aria-selected、aria-controls を使う\n- 左右の矢印キーでタブを移動、Home/Endで最初/最後へ\n- 切り替え時にパネルの内容をフェードさせる\nReactとTailwind CSSで実装してください。',
      tips: [
        'スマホではタブバーを横スクロールできるようにして',
        'インジケーターをFramer MotionのlayoutIdで動かして',
        '1つのタブに件数バッジを付けて',
      ],
    },
  },
};

export default meta;
