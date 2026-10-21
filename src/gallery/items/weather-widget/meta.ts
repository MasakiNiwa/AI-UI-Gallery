import type { ItemMeta } from '../../types';

const meta: ItemMeta = {
  id: 'weather-widget',
  category: 'cards',
  tags: ['weather', 'widget', 'forecast', 'animated icons', 'dashboard card'],
  difficulty: 'medium',
  tech: ['CSS animation', 'Intl.DateTimeFormat', 'Scroll snap'],
  addedAt: '2026-10-22',
  text: {
    en: {
      name: 'Weather Widget',
      summary:
        'A weather card with an animated sky that changes by condition, an hourly strip and a 5-day forecast.',
      description:
        'A weather widget packs a lot of information into a small, friendly card: the current temperature and condition, feels-like, wind and humidity, an hourly forecast you can swipe, and the next few days with temperature ranges.\n\nThe background gradient and the animated icon (drifting clouds, falling rain, a slowly rotating sun) change with the selected condition, which makes the card feel alive. Temperature range bars on the daily rows show the low and high relative to the whole week, so trends are visible at a glance. A °C/°F toggle converts every value.',
      prompt:
        "Design a weather widget card.\n- Header: city, current temperature (large), condition, and high/low; a background gradient that changes with the condition (sunny, cloudy, rainy, night)\n- An animated icon made with CSS: a rotating sun, drifting clouds, falling rain drops\n- Details row: feels like, wind, humidity with small icons\n- An hourly forecast strip (12 hours) that scrolls horizontally with scroll-snap\n- A 5-day forecast where each row has a range bar positioned relative to the week's min and max temperatures\n- A °C/°F toggle and condition chips to preview each state\n- Format times and weekdays with Intl.DateTimeFormat\nUse React and Tailwind CSS.",
      tips: [
        'Fetch real data from the Open-Meteo API.',
        'Add a precipitation probability chart.',
        'Make a compact home-screen widget size.',
      ],
    },
    ja: {
      name: '天気ウィジェット',
      summary: '天気によって変わる動く空、時間ごとの予報、5日間の予報を備えた天気カード。',
      description:
        '天気ウィジェットは、多くの情報を小さく親しみやすいカードにまとめたUIです。現在の気温と天気、体感温度、風、湿度、横にスワイプできる時間ごとの予報、数日先の最高・最低気温までを表示します。\n\n背景のグラデーションと動くアイコン(流れる雲、降る雨、ゆっくり回る太陽)が天気に合わせて変わり、カードに生命感を与えます。日ごとの行の気温幅バーは週全体の最低・最高に対する位置で描くので、傾向がひと目でわかります。°C/°Fの切り替えですべての値を換算します。',
      prompt:
        '天気ウィジェットのカードをデザインしてください。\n- ヘッダー:都市名、現在の気温(大きく)、天気、最高/最低気温。天気(晴れ、くもり、雨、夜)に応じて変わる背景グラデーション\n- CSSで作る動くアイコン:回転する太陽、流れる雲、降る雨粒\n- 詳細の行:体感温度、風、湿度を小さなアイコン付きで\n- 横スクロールする12時間分の予報(scroll-snap)\n- 5日間の予報。各行の気温幅バーは週の最低・最高気温に対する位置で描く\n- °C/°F の切り替えと、各状態をプレビューできる天気のチップ\n- 時刻と曜日は Intl.DateTimeFormat で整形\nReactとTailwind CSSで実装してください。',
      tips: [
        'Open-Meteo APIから本物のデータを取得して',
        '降水確率のグラフを追加して',
        'ホーム画面用の小さいウィジェットサイズを作って',
      ],
    },
  },
};

export default meta;
