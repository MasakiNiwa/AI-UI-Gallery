import type { ItemMeta } from '../../types';

const meta: ItemMeta = {
  id: 'threejs-3d-object',
  category: 'effects',
  tags: ['3d', 'three.js', 'webgl', 'hero', 'product viewer', 'orbit'],
  difficulty: 'hard',
  tech: ['three.js', 'WebGL', 'GPU'],
  addedAt: '2026-10-21',
  text: {
    en: {
      name: '3D Object Hero (three.js)',
      summary:
        'A glossy 3D object you can drag to rotate, lit by soft lights and rendered on the GPU.',
      description:
        'A real-time 3D object in the hero section instantly makes a page feel premium and interactive. Visitors can drag to spin it, and it keeps floating gently when left alone. The same technique powers 3D product viewers.\n\nthree.js wraps WebGL so you can describe a scene (camera, lights, meshes and materials) instead of writing raw GPU code. A physically based material with clearcoat gives the glossy look, and the object rotates with inertia from pointer drags. Rendering pauses when the canvas is off-screen to save battery.',
      prompt:
        'Create a hero section with an interactive 3D object using three.js.\n- A TorusKnot mesh with MeshPhysicalMaterial (metalness 0.2, roughness 0.25, clearcoat 1) in a soft indigo color\n- Lighting: a hemisphere light plus two colored directional lights (teal and pink) for rim highlights\n- Drag (mouse or touch) to rotate the object with inertia; when idle, it slowly auto-rotates and floats up and down\n- Transparent canvas over a dark gradient background, with the headline and a button overlaid\n- Resize with a ResizeObserver, cap devicePixelRatio at 2, pause rendering when off-screen\n- Dispose geometry, material and renderer on unmount\n- Show a static fallback if WebGL is not available\nUse TypeScript and three.js (or React Three Fiber).',
      tips: [
        'Load a real product model (GLTF) instead of the torus knot.',
        'Add a bloom post-processing effect.',
        'Change the material color with swatches below the canvas.',
      ],
    },
    ja: {
      name: '3Dオブジェクトのヒーロー(three.js)',
      summary: 'ドラッグで回せる、つややかな3Dオブジェクト。柔らかな光で照らし、GPUで描画する。',
      description:
        'ヒーローセクションにリアルタイムの3Dオブジェクトを置くと、ページが一気に上質でインタラクティブな印象になります。訪問者はドラッグして回すことができ、何もしなければふわふわと漂い続けます。同じ技術は3Dの商品ビューアーにも使われています。\n\nthree.jsはWebGLを包み込んだライブラリで、GPU向けの低レベルなコードを書かずに、シーン(カメラ・光源・メッシュ・マテリアル)を記述するだけで描画できます。クリアコート付きの物理ベースのマテリアルでつややかな質感を出し、ポインターのドラッグに慣性を付けて回転させています。キャンバスが画面外にあるときは描画を止めて電池を節約します。',
      prompt:
        'three.jsを使って、インタラクティブな3Dオブジェクトのあるヒーローセクションを作ってください。\n- MeshPhysicalMaterial(metalness 0.2、roughness 0.25、clearcoat 1)を使った、柔らかい藍色のTorusKnotメッシュ\n- 照明:半球光と、縁を光らせる色付きの平行光源2つ(ティールとピンク)\n- ドラッグ(マウスまたはタッチ)で慣性付きで回転。操作がないときはゆっくり自動回転し、上下にふわふわ漂う\n- 暗いグラデーション背景の上に透明なキャンバスを置き、見出しとボタンを重ねる\n- ResizeObserverでリサイズに対応し、devicePixelRatio は最大2、画面外では描画を停止\n- アンマウント時にジオメトリ・マテリアル・レンダラーを破棄\n- WebGLが使えない場合は静止画の代替を表示\nTypeScriptとthree.js(またはReact Three Fiber)で実装してください。',
      tips: [
        'トーラスノットの代わりに本物の商品モデル(GLTF)を読み込んで',
        'ブルーム(光のにじみ)のポストエフェクトを追加して',
        'キャンバスの下の色見本でマテリアルの色を変えられるようにして',
      ],
    },
  },
};

export default meta;
