import type { Page } from '@playwright/test';
export const SEITEN = ['/', '/check/ergebnis?zustand=laden', '/check/ergebnis?zustand=vorschau', '/check/ergebnis?zustand=fehler', '/check/ergebnis?zustand=schon-genutzt', '/eingaben', '/danke', '/impressum', '/datenschutz', '/404'];
export async function durchscrollen(page: Page) {
  for (let y = 0; y < (await page.evaluate(() => document.documentElement.scrollHeight)); y += 400) {
    await page.evaluate((v) => window.scrollTo({ top: v, behavior: 'instant' }), y);
    await page.waitForTimeout(40);
  }
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
  await page.waitForTimeout(550); // 400 ms Einblenden abwarten
}
export async function oeffnen(page: Page, pfad: string) {
  await page.goto(pfad);
  await page.waitForLoadState('networkidle');
  await durchscrollen(page);
}
