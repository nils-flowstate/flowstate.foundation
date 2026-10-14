import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { SEITEN, oeffnen } from './hilfe';

const TAGS = ['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa'];

for (const breite of [360, 1440]) {
  for (const pfad of SEITEN) {
    test(`axe ${pfad} bei ${breite} px`, async ({ page }) => {
      await page.setViewportSize({ width: breite, height: breite === 360 ? 740 : 900 });
      await oeffnen(page, pfad);
      const r = await new AxeBuilder({ page }).withTags(TAGS).analyze();
      expect(r.violations.map((v) => `${v.id}: ${v.nodes.map((n) => n.target.join(' ')).slice(0, 4).join(' | ')}`)).toEqual([]);
    });
    test(`kein waagrechtes Scrollen ${pfad} bei ${breite} px`, async ({ page }) => {
      await page.setViewportSize({ width: breite, height: breite === 360 ? 740 : 900 });
      await oeffnen(page, pfad);
      const w = await page.evaluate(() => ({ s: document.documentElement.scrollWidth, c: document.documentElement.clientWidth }));
      expect(w.s).toBeLessThanOrEqual(w.c);
    });
  }
}

test('axe auf / im Modus Stand zeigen (1440)', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await oeffnen(page, '/');
  await page.getByTestId('stand-zeigen').click();
  const r = await new AxeBuilder({ page }).withTags(TAGS).analyze();
  expect(r.violations.map((v) => `${v.id}: ${v.nodes.map((n) => n.target.join(' ')).slice(0, 4).join(' | ')}`)).toEqual([]);
});

test('axe auf / mit offenem Overlay der Eingaben', async ({ page }) => {
  await oeffnen(page, '/eingaben');
  await page.getByTestId('frage-whatsapp').click();
  const r = await new AxeBuilder({ page }).withTags(TAGS).analyze();
  expect(r.violations.map((v) => v.id)).toEqual([]);
});

test('Fokus sichtbar und Tastaturreihenfolge beginnt mit Skip-Link', async ({ page }) => {
  await oeffnen(page, '/');
  await page.keyboard.press('Tab');
  await expect(page.locator('.skip')).toBeFocused();
  await page.keyboard.press('Tab');
  const ol = await page.evaluate(() => getComputedStyle(document.activeElement!).outlineStyle);
  expect(ol).not.toBe('none');
});

test('prefers-reduced-motion: kein Einblenden-Versatz, kein Hinweis-Wackeln', async ({ browser }) => {
  const ctx = await browser.newContext({ reducedMotion: 'reduce' });
  const page = await ctx.newPage();
  await page.goto('/');
  await page.waitForLoadState('networkidle');
  const v = await page.evaluate(() => { const e = document.querySelector('#pakete')!; const s = getComputedStyle(e); return { o: s.opacity, t: s.transform, sb: getComputedStyle(document.documentElement).scrollBehavior }; });
  expect(v.o).toBe('1'); expect(v.t).toBe('none'); expect(v.sb).toBe('auto');
  await page.locator('#swipe').scrollIntoViewIfNeeded();
  await expect(page.getByTestId('swipe-karte')).not.toHaveClass(/hinweis/);
  await ctx.close();
});

test('Kontrast: Zinnober nur als grosse Schrift (Knoepfe >= 18,7 px und fett)', async ({ page }) => {
  await oeffnen(page, '/');
  const r = await page.evaluate(() => [...document.querySelectorAll('.btn-haupt')].map((e) => { const s = getComputedStyle(e); return { px: parseFloat(s.fontSize), w: parseInt(s.fontWeight) }; }));
  expect(r.length).toBeGreaterThan(0);
  for (const b of r) { expect(b.px).toBeGreaterThanOrEqual(18.7); expect(b.w).toBeGreaterThanOrEqual(700); }
  // kein kleiner Text in Zinnober
  const klein = await page.evaluate(() => { const bad: string[] = []; document.querySelectorAll('body *').forEach((e) => { const s = getComputedStyle(e); if (s.color === 'rgb(217, 58, 30)' && e.childNodes.length && [...e.childNodes].some((n) => n.nodeType === 3 && n.textContent!.trim()) && parseFloat(s.fontSize) < 24) bad.push(e.tagName + ':' + e.textContent!.slice(0, 30)); }); return bad; });
  expect(klein).toEqual([]);
});
