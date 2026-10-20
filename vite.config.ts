/// <reference types="vitest/config" />
import { execSync } from 'node:child_process';
import { mkdirSync, writeFileSync } from 'node:fs';
import { fileURLToPath, URL } from 'node:url';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import license, { type Dependency } from 'rollup-plugin-license';
import { defineConfig } from 'vite';
import pkg from './package.json' with { type: 'json' };

/** Licenses we accept for bundled third-party code. The build fails on anything else. */
const ALLOWED_LICENSES = ['MIT', 'ISC', 'BSD-2-Clause', 'BSD-3-Clause', 'Apache-2.0', '0BSD'];

function gitCommit(): string {
  if (process.env.GITHUB_SHA) return process.env.GITHUB_SHA.slice(0, 7);
  try {
    return execSync('git rev-parse --short HEAD').toString().trim();
  } catch {
    return 'unknown';
  }
}

function repositoryUrl(dep: Dependency): string | null {
  const repo = dep.repository as string | { url?: string } | null;
  const url = typeof repo === 'string' ? repo : repo?.url;
  if (!url) return dep.homepage ?? null;
  if (/^[\w.-]+\/[\w.-]+$/.test(url)) return `https://github.com/${url}`; // "owner/repo" shorthand
  return url
    .replace(/^git\+/, '')
    .replace(/^git:\/\//, 'https://')
    .replace(/^git@([^:]+):/, 'https://$1/')
    .replace(/^github:/, 'https://github.com/')
    .replace(/\.git$/, '');
}

/**
 * Web Workers are bundled in a separate pass that finishes before the main bundle is written, so their
 * dependencies are collected here and merged into the main report.
 */
const workerDeps: Dependency[] = [];

const allowLicenses = {
  test: (dep: Dependency) => ALLOWED_LICENSES.some((l) => dep.license?.includes(l)),
  failOnUnlicensed: true,
  failOnViolation: true,
};

/**
 * Writes the list of bundled third-party packages:
 * - dist/licenses.json         → shown on the Help page
 * - THIRD_PARTY_NOTICES.md     → committed to the repository (CI checks it is up to date)
 */
function writeLicenseReports(mainDeps: Dependency[]) {
  const unique = new Map<string, Dependency>();
  for (const d of [...mainDeps, ...workerDeps]) if (d.name) unique.set(`${d.name}@${d.version}`, d);
  const sorted = [...unique.values()].sort((a, b) => a.name!.localeCompare(b.name!));
  const entries = sorted.map((d) => ({
    name: d.name!,
    version: d.version ?? '',
    license: d.license ?? 'UNKNOWN',
    repository: repositoryUrl(d),
    licenseText: d.licenseText?.trim() ?? null,
  }));
  mkdirSync('dist', { recursive: true });
  writeFileSync('dist/licenses.json', JSON.stringify(entries));

  const md = [
    '# Third-Party Notices',
    '',
    'This file is generated automatically by `npm run build`. Do not edit it by hand.',
    '',
    'AI UI Gallery bundles the following open-source packages:',
    '',
    '| Package | Version | License |',
    '| --- | --- | --- |',
    ...entries.map(
      (e) =>
        `| ${e.repository ? `[${e.name}](${e.repository})` : e.name} | ${e.version} | ${e.license} |`,
    ),
    '',
    '---',
    '',
    ...entries.flatMap((e) => [
      `## ${e.name}@${e.version} (${e.license})`,
      '',
      '```',
      e.licenseText ?? `License: ${e.license} (no license file shipped with the package)`,
      '```',
      '',
    ]),
  ].join('\n');
  writeFileSync('THIRD_PARTY_NOTICES.md', md);
}

export default defineConfig({
  // Relative base so the site works under https://<user>.github.io/<repo>/ without hard-coding the path.
  base: './',
  plugins: [
    react(),
    tailwindcss(),
    license({
      thirdParty: { allow: allowLicenses, output: writeLicenseReports },
    }),
  ],
  resolve: {
    alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) },
  },
  define: {
    __APP_VERSION__: JSON.stringify(pkg.version),
    __BUILD_TIME__: JSON.stringify(new Date().toISOString()),
    __COMMIT__: JSON.stringify(gitCommit()),
    __REPO_URL__: JSON.stringify('https://github.com/MasakiNiwa/AI-UI-Gallery'),
  },
  build: {
    // Heavy libraries used by a single demo (e.g. three.js) live in that demo's lazy chunk; only the
    // entry chunks are loaded up front, so a larger limit for lazy chunks is fine.
    chunkSizeWarningLimit: 600,
    rolldownOptions: {
      output: {
        // Long-lived vendor chunks cache well across deploys; gallery metadata grows with every new item.
        codeSplitting: {
          groups: [
            {
              name: 'react',
              test: /node_modules[\\/](react|react-dom|scheduler|react-router)[\\/]/,
            },
            { name: 'ui', test: /node_modules[\\/](@radix-ui|@floating-ui|react-remove-scroll)/ },
            { name: 'i18n', test: /node_modules[\\/](i18next|react-i18next)/ },
            { name: 'gallery-meta', test: /src[\\/]gallery[\\/]items[\\/][^\\/]+[\\/]meta\.ts$/ },
          ],
        },
      },
    },
  },
  worker: {
    format: 'es',
    plugins: () => [
      license({
        thirdParty: { allow: allowLicenses, output: (deps) => workerDeps.push(...deps) },
      }),
    ],
  },
  test: {
    environment: 'node',
  },
});
