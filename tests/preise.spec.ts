import { test, expect } from '@playwright/test';
import { oeffnen } from './hilfe';

test.describe('Preise vom 14.10.2026', () => {
  test('Einfuehrungspreise 800 / 1.600 / 3.200 und Vollpreis nur als Text', async ({ page }) => {
    await oeffnen(page, '/');
    await expect(page.getByTestId('preis-1')).toHaveText('800 €');
    await expect(page.getByTestId('preis-2')).toHaveText('1.600 €');
    await expect(page.getByTestId('preis-3')).toHaveText('3.200 €');
    await expect(page.getByTestId('preis-einfuehrung')).toContainText('Einführungspreis bis 31.12.2026');
    await expect(page.getByTestId('preis-danach')).toContainText('Danach 1.600 / 3.200 / 6.400 EUR.');
    await expect(page.getByTestId('preis-hosting')).toContainText('20 € pro Monat');
    await expect(page.getByTestId('preis-ust')).toContainText('§ 19 UStG');
    // kein Streichpreis, keine alten Preise
    expect(await page.locator('s, del, strike').count()).toBe(0);
    const text = await page.locator('main').innerText();
    expect(text).not.toMatch(/statt\s+1\.600/i);
    expect(text).not.toMatch(/\b400 €|\b2\.400 €/);
    expect(await page.locator('#pakete [style*="line-through"]').count()).toBe(0);
  });

  test('Stelle des Vollpreises ist im Stand-Modus als UNGEKLAERT markiert', async ({ page }) => {
    await oeffnen(page, '/');
    await page.getByTestId('stand-zeigen').click();
    await expect(page.locator('html')).toHaveClass(/stand-an/);
    await expect(page.locator('#pakete')).toHaveAttribute('data-stand', 'UNGEKLAERT');
    await expect(page.getByTestId('preis-danach')).toHaveAttribute('data-stand-stelle', '');
    await expect(page.getByTestId('preis-danach').getByTestId('luecke')).toContainText('Lauterkeitsrecht');
    await expect(page.getByTestId('stand-zeigen')).toHaveAttribute('aria-pressed', 'true');
  });

  test('Platzhalter und Personendaten: keine Telefonnummer, keine wa.me-Nummer, kein Lorem', async ({ page }) => {
    for (const p of ['/', '/impressum', '/datenschutz', '/danke', '/eingaben']) {
      await oeffnen(page, p);
      const html = await page.content();
      expect(html).not.toMatch(/wa\.me\/\d/);
      expect(html).not.toMatch(/lorem ipsum/i);
      expect(html).not.toMatch(/(\+49|0049)[\s\d\/-]{6,}/);
    }
  });
});
