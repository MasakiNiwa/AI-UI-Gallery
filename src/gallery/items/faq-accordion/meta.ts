import type { ItemMeta } from '../../types';

const meta: ItemMeta = {
  id: 'faq-accordion',
  category: 'layout',
  tags: ['accordion', 'faq', 'disclosure', 'collapsible', 'details summary'],
  difficulty: 'easy',
  tech: ['<details> / <summary>', 'CSS grid animation'],
  addedAt: '2026-10-21',
  text: {
    en: {
      name: 'FAQ Accordion',
      summary:
        'Questions that expand smoothly to reveal answers, with an "expand all" toggle and search.',
      description:
        'An accordion stacks headings that each expand to reveal a panel of content. It keeps long pages such as FAQs scannable: users read the questions and open only what they need.\n\nThe smooth height animation uses a CSS grid trick: the panel wrapper animates grid-template-rows from 0fr to 1fr, which works with content of any height. Each header is a button with aria-expanded and aria-controls. A quick filter narrows questions as you type, and "Expand all" opens every item at once.',
      prompt:
        'Create an FAQ section with an animated accordion.\n- 6 questions; clicking a question expands its answer with a smooth height animation (animate grid-template-rows from 0fr to 1fr)\n- A plus icon rotates into a minus/× when open\n- Allow multiple items open at once, plus an "Expand all / Collapse all" toggle\n- A search box filters questions and answers as you type and highlights matches\n- Each header is a <button> with aria-expanded and aria-controls pointing to the panel (role="region")\n- Clean card styling with dividers; works in light and dark mode\nUse React and Tailwind CSS (or native <details>/<summary>).',
      tips: [
        'Only allow one item open at a time.',
        'Deep-link to a question with a URL hash.',
        'Add FAQPage structured data (JSON-LD) for SEO.',
      ],
    },
    ja: {
      name: 'FAQのアコーディオン',
      summary: '質問をクリックすると答えがなめらかに開く。「すべて開く」切り替えと検索付き。',
      description:
        'アコーディオンは見出しを縦に並べ、それぞれを開くと中身のパネルが現れるUIです。FAQのような長いページでも、利用者は質問だけを流し読みし、必要なものだけを開けます。\n\nなめらかな高さのアニメーションにはCSS Gridの技法を使い、パネルを包む要素の grid-template-rows を 0fr から 1fr へアニメーションさせます。中身の高さが何pxでも動きます。各見出しは aria-expanded と aria-controls を持つボタンにします。検索欄に入力すると質問が絞り込まれ、「すべて開く」で全項目を一度に開けます。',
      prompt:
        'アニメーションするアコーディオンでFAQセクションを作ってください。\n- 6つの質問。質問をクリックすると、なめらかな高さのアニメーションで答えが開く(grid-template-rows を 0fr から 1fr へアニメーション)\n- 開いているときは+アイコンが回転して−/×になる\n- 複数の項目を同時に開けるようにし、「すべて開く/すべて閉じる」の切り替えも用意\n- 検索欄に入力すると質問と答えを絞り込み、一致部分を強調表示\n- 各見出しは aria-expanded と、パネル(role="region")を指す aria-controls を持つ <button>\n- 区切り線のあるすっきりしたカードのデザインで、ライト/ダークモードに対応\nReactとTailwind CSS(またはネイティブの<details>/<summary>)で実装してください。',
      tips: [
        '同時に開ける項目を1つだけにして',
        'URLのハッシュで特定の質問へ直接リンクできるようにして',
        'SEO用にFAQPageの構造化データ(JSON-LD)を追加して',
      ],
    },
  },
};

export default meta;
