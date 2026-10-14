import { test, expect } from '@playwright/test';
import { SEITEN, oeffnen } from './hilfe';

for (const pfad of SEITEN) {
  test(`keine Drittanbieter-Anfrage auf ${pfad}`, async ({ page }) => {
    const fremd: string[] = [];
    page.on('request', (r) => { const u = new URL(r.url()); if (!['localhost', '127.0.0.1'].includes(u.hostname) && !r.url().startsWith('data:')) fremd.push(r.url()); });
    await oeffnen(page, pfad);
    if (pfad === '/') { await page.getByTestId('check-weg-brandtest').click().catch(() => {}); }
    expect(fremd).toEqual([]);
  });
}

test('Schrift selbst gehostet, Formulare senden nichts (kein POST)', async ({ page }) => {
  const posts: string[] = [];
  page.on('request', (r) => { if (r.method() !== 'GET') posts.push(r.method() + ' ' + r.url()); });
  await oeffnen(page, '/');
  await page.locator('#kontakt').scrollIntoViewIfNeeded();
  await page.locator('#anfrage-name').fill('Test'); await page.locator('#anfrage-kontakt').fill('t@example.org');
  await page.getByTestId('form-anfrage-absenden').click();
  await expect(page).toHaveURL(/\/danke$/);
  expect(posts).toEqual([]);
  const fonts = await page.evaluate(() => document.fonts.size);
  expect(fonts).toBeGreaterThan(0);
});
