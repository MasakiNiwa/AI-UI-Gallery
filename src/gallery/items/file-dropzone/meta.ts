import type { ItemMeta } from '../../types';

const meta: ItemMeta = {
  id: 'file-dropzone',
  category: 'inputs',
  tags: ['file upload', 'drag and drop', 'dropzone', 'progress', 'image preview'],
  difficulty: 'medium',
  tech: ['Drag and Drop API', 'File API', 'Object URL'],
  addedAt: '2026-10-20',
  text: {
    en: {
      name: 'Drag & Drop File Upload',
      summary:
        'A drop zone that highlights while dragging, previews images and shows upload progress per file.',
      description:
        'A dropzone lets users drag files from their computer onto the page instead of browsing for them. While a file is dragged over it, the zone highlights to confirm it will accept the drop. Each file then appears in a list with its name, size, an image thumbnail and a progress bar.\n\nThe zone is also a regular button that opens the file picker, so it works on touch devices and with the keyboard. Image previews are created locally with URL.createObjectURL(), and validation (type and size) happens before upload.',
      prompt:
        'Create a drag-and-drop file upload area.\n- A dashed-border drop zone with an upload icon and "Drag files here or click to browse"\n- Highlight the zone (border color and background) while files are dragged over it\n- Clicking or pressing Enter opens the file picker (hidden <input type="file" multiple>)\n- Accept images and PDFs up to 5 MB; show an inline error for rejected files\n- List each file with a thumbnail (URL.createObjectURL for images), name, formatted size, a progress bar and a remove button\n- Simulate upload progress for each file, then show a check mark\n- Revoke object URLs when files are removed\nUse React and Tailwind CSS.',
      tips: [
        'Upload with real progress using XMLHttpRequest upload events.',
        'Allow pasting images from the clipboard.',
        'Use the react-dropzone library.',
      ],
    },
    ja: {
      name: 'ドラッグ&ドロップのファイルアップロード',
      summary:
        'ドラッグ中にハイライトし、画像をプレビューしてファイルごとに進捗を表示するドロップエリア。',
      description:
        'ドロップゾーンは、ファイル選択ダイアログを開かずに、パソコンのファイルをページへドラッグして渡せるUIです。ファイルを上に重ねている間はエリアが強調され、ドロップできることを伝えます。ドロップしたファイルは、名前・サイズ・画像のサムネイル・進捗バー付きで一覧表示されます。\n\nエリアは通常のボタンでもあり、クリックするとファイル選択が開くので、タッチ端末やキーボードでも使えます。画像のプレビューは URL.createObjectURL() で端末内で作り、形式やサイズのチェックはアップロード前に行います。',
      prompt:
        'ドラッグ&ドロップでファイルをアップロードできるエリアを作ってください。\n- アップロードのアイコンと「ここにファイルをドラッグ、またはクリックして選択」と書かれた点線枠のドロップゾーン\n- ファイルをドラッグしている間は、枠線の色と背景でエリアを強調\n- クリックやEnterキーでファイル選択を開く(非表示の <input type="file" multiple>)\n- 5MBまでの画像とPDFを受け付け、対象外のファイルにはその場でエラーを表示\n- 各ファイルをサムネイル(画像は URL.createObjectURL)、名前、整形したサイズ、進捗バー、削除ボタン付きで一覧表示\n- ファイルごとにアップロードの進捗を模擬し、完了したらチェックマークを表示\n- ファイルを削除したらオブジェクトURLを解放する\nReactとTailwind CSSで実装してください。',
      tips: [
        'XMLHttpRequestのuploadイベントで本当の進捗を表示して',
        'クリップボードから画像を貼り付けられるようにして',
        'react-dropzoneライブラリを使って',
      ],
    },
  },
};

export default meta;
