/**
 * Generates the static gallery thumbnails in public/previews/{light,dark}/<id>.jpg.
 *
 *   npm run build && npm run previews            # all items
 *   npm run previews -- color-picker kanban-board  # only these items
 *
 * Each demo is rendered by the hidden #/capture/<id> route of the production build (served by
 * `vite preview`), at the size a gallery card gives its live preview, and saved as a JPEG.
 */
import { spawn } from 'node:child_process';
import { mkdirSync, readdirSync } from 'node:fs';
import { chromium } from '@playwright/test';

const PORT = 4174;
const ROOT = 'src/gallery/items';
const OUT = 'public/previews';

const all = readdirSync(ROOT, { withFileTypes: true })
  .filter((d) => d.isDirectory())
  .map((d) => d.name);
const ids = process.argv.slice(2).length ? process.argv.slice(2) : all;

const server = spawn('npx', ['vite', 'preview', '--port', String(PORT), '--strictPort'], {
  stdio: 'ignore',
});
const waitForServer = async () => {
  for (let i = 0; i < 50; i++) {
    try {
      if ((await fetch(`http://localhost:${PORT}/`)).ok) return;
    } catch {
      // not up yet
    }
    await new Promise((r) => setTimeout(r, 200));
  }
  throw new Error('preview server did not start');
};

try {
  await waitForServer();
  const browser = await chromium.launch({
    args: ['--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader'],
  });
  for (const theme of ['light', 'dark'] as const) {
    mkdirSync(`${OUT}/${theme}`, { recursive: true });
    // 640×480 CSS px ≈ the 2× area a card renders its live preview at; saved at 0.75 scale.
    const context = await browser.newContext({
      viewport: { width: 640, height: 480 },
      deviceScaleFactor: 0.75,
      colorScheme: theme,
      reducedMotion: 'no-preference',
      serviceWorkers: 'block',
    });
    const page = await context.newPage();
    for (const id of ids) {
      await page.goto(`http://localhost:${PORT}/#/capture/${id}?theme=${theme}`);
      await page.locator('[data-capture-ready]').waitFor();
      await page.waitForTimeout(1800); // let entrance animations settle
      await page.screenshot({ path: `${OUT}/${theme}/${id}.jpg`, type: 'jpeg', quality: 72 });
      process.stdout.write(`${theme}/${id} `);
    }
    await context.close();
  }
  await browser.close();
  console.log('\ndone');
} finally {
  server.kill();
}
