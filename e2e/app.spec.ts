import { expect, test, type Page } from '@playwright/test';

/** Fails the test on any uncaught page error. */
function trackErrors(page: Page) {
  const errors: string[] = [];
  page.on('pageerror', (e) => errors.push(e.message));
  return errors;
}

test('home renders with navigation and items', async ({ page }) => {
  const errors = trackErrors(page);
  await page.goto('./');
  await expect(page.locator('h1')).toBeVisible();
  await expect(page.getByRole('navigation').first()).toBeVisible();
  await expect(page.locator('main article').first()).toBeVisible();
  expect(errors).toEqual([]);
});

test('language follows the browser locale', async ({ page }, info) => {
  await page.goto('./#/help');
  const heading = page.getByRole('heading', { level: 1 });
  await expect(heading).toHaveText(info.project.name === 'mobile' ? 'ヘルプ' : 'Help');
});

test('theme toggle switches dark mode', async ({ page }) => {
  await page.goto('./');
  const html = page.locator('html');
  const before = await html.getAttribute('class');
  await page
    .locator('header button[title]')
    .filter({ has: page.locator('svg') })
    .last()
    .click();
  await expect(html).not.toHaveAttribute('class', before ?? '');
});

test('gallery search filters and Clear resets', async ({ page }) => {
  await page.goto('./#/gallery');
  const cards = page.locator('main article');
  const total = await cards.count();
  await page.getByRole('searchbox').fill('kanban');
  await expect(cards).toHaveCount(1);
  await page
    .locator('button[title]')
    .filter({ hasText: /Clear|クリア/ })
    .click();
  await expect(cards).toHaveCount(total);
  await expect(page).toHaveURL(/#\/gallery$/);
});

test('favorites persist across reloads', async ({ page }) => {
  await page.goto('./#/gallery');
  await page.locator('main article button[aria-pressed]').first().click();
  await page.goto('./#/favorites');
  await page.reload();
  await expect(page.locator('main section').first().locator('article')).toHaveCount(1);
});

test('settings and help sections start collapsed', async ({ page }) => {
  for (const path of ['./#/settings', './#/help']) {
    await page.goto(path);
    const triggers = page.locator('main h2 > button[aria-expanded]');
    expect(await triggers.count()).toBeGreaterThan(2);
    for (const t of await triggers.all()) await expect(t).toHaveAttribute('aria-expanded', 'false');
  }
  await expect(page.getByText(/v\d+\.\d+\.\d+/)).toBeVisible();
});

test('quick search opens with the keyboard and navigates', async ({ page }, info) => {
  test.skip(info.project.name === 'mobile', 'keyboard shortcut is a desktop feature');
  await page.goto('./');
  await page.keyboard.press('Control+k');
  await page.getByRole('combobox').fill('carousel');
  await page.keyboard.press('Enter');
  await expect(page).toHaveURL(/#\/item\/image-carousel$/);
});

test('every gallery item page renders without errors', async ({ page }, info) => {
  test.skip(info.project.name === 'mobile', 'covered once on desktop');
  test.setTimeout(180_000);
  await page.goto('./#/gallery');
  const hrefs = await page
    .locator('main article h3 a')
    .evaluateAll((links) => links.map((a) => a.getAttribute('href')!));
  expect(hrefs.length).toBeGreaterThan(40);
  const errors = trackErrors(page);
  for (const href of hrefs) {
    await page.goto(`./${href}`);
    await expect(page.locator('h1')).toBeVisible();
    // The demo stage must not show the error boundary fallback.
    await expect(page.getByText(/could not be displayed|表示できませんでした/)).toHaveCount(0);
  }
  expect(errors).toEqual([]);
});
