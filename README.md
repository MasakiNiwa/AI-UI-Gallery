# AI UI Gallery

**English** | [日本語](README.ja.md)

A gallery of web UIs you can build by asking AI. Every exhibit is a **live, working demo** with its common
**name**, an **explanation**, and an **example prompt** you can paste into an AI assistant.

🔗 **https://masakiniwa.github.io/AI-UI-Gallery/**

## Features

- Live demos of many UI patterns, organized by category, with fuzzy search (runs in a Web Worker)
- Example prompts with one-click copy, plus ideas for follow-up prompts
- Preview demos at full width or mobile width
- Responsive: bottom navigation bar on phones, sidebar on desktop
- Favorites, viewing history and app-wide quick search (⌘K / Ctrl+K)
- Light / dark theme (calm, low-contrast dark palette)
- Automatic language selection from your browser (English and Japanese)
- GPU and parallelism showcases: WebGL shaders, three.js 3D, WebGPU compute shaders, OffscreenCanvas rendering in a Web Worker

## Tech stack

| Area     | Library                                                                                                                                     |
| -------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| Build    | [Vite](https://vite.dev/), [TypeScript](https://www.typescriptlang.org/)                                                                    |
| UI       | [React](https://react.dev/), [Tailwind CSS](https://tailwindcss.com/), [Radix UI](https://www.radix-ui.com/), [Lucide](https://lucide.dev/) |
| Routing  | [React Router](https://reactrouter.com/) (hash routing for GitHub Pages)                                                                    |
| i18n     | [i18next](https://www.i18next.com/), react-i18next, i18next-browser-languagedetector                                                        |
| State    | [Zustand](https://zustand.docs.pmnd.rs/) (persisted to localStorage)                                                                        |
| Search   | [Fuse.js](https://www.fusejs.io/) in a Web Worker via [Comlink](https://github.com/GoogleChromeLabs/comlink)                                |
| Demos    | [three.js](https://threejs.org/) (3D), WebGL / WebGPU (WGSL), Canvas 2D, OffscreenCanvas                                                    |
| Quality  | ESLint, Prettier, Vitest, Playwright                                                                                                        |
| Licenses | [rollup-plugin-license](https://github.com/mjeanroy/rollup-plugin-license)                                                                  |

## Development

Requires Node.js 22+.

```bash
npm install
npm run dev        # start the dev server
npm run lint       # ESLint
npm test           # unit tests (Vitest)
npm run test:e2e   # end-to-end tests (Playwright; run `npm run build` first)
npm run build      # type-check and build into dist/ (also regenerates THIRD_PARTY_NOTICES.md)
npm run preview    # serve the production build
```

## Project structure

```
src/
  components/      layout (header, sidebar, bottom nav), UI primitives, gallery cards & demo renderer
  gallery/
    items/<id>/    one folder per exhibit: meta.ts + Demo.tsx (auto-registered)
    categories.ts  category order and icons
    registry.ts    discovers items with import.meta.glob
    types.ts       ItemMeta / DemoProps types
  i18n/            i18next setup and locale files (en.json, ja.json)
  pages/           Home, Gallery, Item detail, Settings, Help
  stores/          persisted settings (theme, language, …)
  workers/         Web Workers (search)
```

## Adding a new UI to the gallery

1. Create a folder `src/gallery/items/<your-id>/` (the folder name is the id used in the URL).
2. Add `meta.ts` exporting an `ItemMeta` (category, tags, difficulty, tech, and `text.en` / `text.ja` with
   name, summary, description, prompt and optional tips).
3. Add `Demo.tsx` with a default-exported component. It receives `mode: 'preview' | 'full'`; it should fill
   its container (`h-full`) and use container-query variants (`@md:`, `@lg:` …) rather than viewport
   breakpoints so it responds to the preview width.
4. Run `npm test`: the tests check that every item has complete metadata in every language.

The item is picked up automatically: no registration code needed. Demo code is split into its own chunk and
only loaded when shown.

## Adding a language

Add `src/i18n/locales/<lang>.json` (same keys as `en.json`, enforced by tests), register it in
`src/i18n/languages.ts` and `src/i18n/index.ts`, add its name in the settings page, and add `text.<lang>` to
items (missing item texts fall back to English).

## Deployment

Pushing to `main` builds the site and deploys it to GitHub Pages with GitHub Actions
(`.github/workflows/deploy.yml`). In the repository settings, set **Settings → Pages → Source** to
**GitHub Actions**.

## License

[MIT](LICENSE). Third-party software bundled in the app is listed in
[THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md) (generated at build time) and on the app's Help page.
