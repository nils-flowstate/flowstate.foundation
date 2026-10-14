import { test, expect } from '@playwright/test';
import { oeffnen } from './hilfe';

// Eine Pruefung je Kennung aus Bauplan Abschnitt 7.
test.describe('Funktionen (Bauplan 7)', () => {
  test('cta-swipe-start: Anker auf #swipe', async ({ page }) => {
    await oeffnen(page, '/');
    await page.getByTestId('cta-swipe-start').click();
    await expect(page).toHaveURL(/#swipe$/);
    await expect(page.getByTestId('swipe-karte')).toBeVisible();
  });

  test('ext-whatsapp-*: Link fuehrt auf #kontakt, kein erfundenes Ziel', async ({ page }) => {
    for (const [pfad, id, soll] of [['/', 'ext-whatsapp-hero', '#kontakt'], ['/', 'ext-whatsapp-kontakt', '#kontakt'], ['/check/ergebnis?zustand=vorschau', 'ext-whatsapp-ergebnis', '/#kontakt'], ['/danke', 'ext-whatsapp-danke', '/#kontakt']] as const) {
      await oeffnen(page, pfad);
      const a = page.getByTestId(id);
      await expect(a).toBeVisible();
      await expect(a).toHaveAttribute('href', soll);
      expect(await a.getAttribute('href')).not.toMatch(/wa\.me/);
    }
  });

  test('swipe-ja / swipe-nein / Pfeiltasten / Endkarte / swipe-neu', async ({ page }) => {
    await oeffnen(page, '/');
    await page.locator('#swipe').scrollIntoViewIfNeeded();
    await expect(page.getByTestId('swipe-zaehler')).toHaveText('1 von 8');
    await page.getByTestId('swipe-ja').click();
    await expect(page.getByTestId('swipe-zaehler')).toHaveText('2 von 8');
    await page.getByTestId('swipe-nein').click();
    await expect(page.getByTestId('swipe-zaehler')).toHaveText('3 von 8');
    await page.getByTestId('swipe-ja').focus();
    await page.keyboard.press('ArrowLeft');
    await expect(page.getByTestId('swipe-zaehler')).toHaveText('4 von 8');
    await page.keyboard.press('ArrowRight');
    await expect(page.getByTestId('swipe-zaehler')).toHaveText('5 von 8');
    for (let i = 0; i < 4; i++) await page.getByTestId('swipe-ja').click();
    const end = page.getByTestId('swipe-endkarte');
    await expect(end).toBeVisible();
    await expect(end).toContainText('Bei 2 von 8 Fragen gibt es eine Lücke.');
    await page.getByTestId('swipe-neu').click();
    await expect(page.getByTestId('swipe-zaehler')).toHaveText('1 von 8');
  });

  test('Wischen ueber die Schwelle wertet die Karte', async ({ page }) => {
    await oeffnen(page, '/');
    await page.locator('#swipe').scrollIntoViewIfNeeded();
    const k = page.getByTestId('swipe-karte');
    const b = (await k.boundingBox())!;
    await page.mouse.move(b.x + b.width / 2, b.y + b.height / 2);
    await page.mouse.down(); await page.mouse.move(b.x + b.width / 2 + 160, b.y + b.height / 2, { steps: 6 }); await page.mouse.up();
    await expect(page.getByTestId('swipe-zaehler')).toHaveText('2 von 8');
  });

  test('Empfehlung: Lücken bei Marke waehlen Brand-Test, cta-swipe-check und Weg vorgewaehlt', async ({ page }) => {
    await oeffnen(page, '/');
    await page.locator('#swipe').scrollIntoViewIfNeeded();
    for (const a of ['ja', 'ja', 'ja', 'ja', 'nein', 'nein', 'ja', 'ja']) await page.getByTestId(`swipe-${a}`).click();
    await page.getByTestId('cta-swipe-check').click();
    await expect(page).toHaveURL(/#check$/);
    await expect(page.getByTestId('check-weg-brandtest')).toHaveAttribute('aria-selected', 'true');
  });

  test('check-weg-*: Umschalter per Klick und Tastatur', async ({ page }) => {
    await oeffnen(page, '/');
    await page.locator('#check').scrollIntoViewIfNeeded();
    await expect(page.getByTestId('form-schnellcheck')).toBeVisible();
    await page.getByTestId('check-weg-brandtest').click();
    await expect(page.getByTestId('form-brandtest')).toBeVisible();
    await page.getByTestId('check-weg-brandtest').focus();
    await page.keyboard.press('ArrowLeft');
    await expect(page.getByTestId('form-schnellcheck')).toBeVisible();
  });

  test('form-schnellcheck: Fehler am Feld, dann Ergebnisseite, cta-mailprogramm nach Domain', async ({ page }) => {
    await oeffnen(page, '/');
    await page.locator('#check').scrollIntoViewIfNeeded();
    await page.getByRole('button', { name: 'Generieren' }).click();
    await expect(page.locator('#schnellcheck-url-f')).toBeVisible();
    await expect(page.locator('#schnellcheck-url')).toHaveAttribute('aria-invalid', 'true');
    await page.locator('#schnellcheck-url').fill('https://beispiel.de');
    await page.locator('#schnellcheck-k1').fill('https://konkurrenz.de');
    await page.locator('#schnellcheck-mail').fill('nicht-gueltig');
    await page.getByRole('button', { name: 'Generieren' }).click();
    await expect(page.locator('#schnellcheck-mail-f')).toBeVisible();
    await page.locator('#schnellcheck-mail').fill('test@gmail.com');
    await page.getByRole('button', { name: 'Generieren' }).click();
    await expect(page).toHaveURL(/\/check\/ergebnis\?weg=schnellcheck/);
    await expect(page.getByTestId('zustand-laden')).toBeVisible();
    await expect(page.getByTestId('zustand-vorschau')).toBeVisible({ timeout: 6000 });
    await expect(page.getByTestId('cta-mailprogramm')).toHaveAttribute('href', 'https://mail.google.com/');
    await expect(page.getByTestId('cta-mailprogramm')).toHaveAttribute('rel', /noopener/);
  });

  test('form-brandtest: Upload Pflicht, dann Ergebnisseite', async ({ page }) => {
    await oeffnen(page, '/');
    await page.locator('#check').scrollIntoViewIfNeeded();
    await page.getByTestId('check-weg-brandtest').click();
    await page.getByRole('button', { name: 'Generieren' }).click();
    await expect(page.locator('#brandtest-dateien-f')).toBeVisible();
    await page.locator('#brandtest-dateien').setInputFiles({ name: 'brand.pdf', mimeType: 'application/pdf', buffer: Buffer.from('%PDF-1.4 test') });
    await page.locator('#brandtest-k1').fill('https://konkurrenz.de');
    await page.locator('#brandtest-mail').fill('test@example.org');
    await page.getByRole('button', { name: 'Generieren' }).click();
    await expect(page).toHaveURL(/weg=brandtest/);
    await expect(page.getByTestId('zustand-laden')).toContainText('Dokumente');
    await expect(page.getByTestId('zustand-vorschau')).toBeVisible({ timeout: 6000 });
    await expect(page.getByTestId('mail-hinweis')).toBeVisible(); // unbekannte Domain: nur Hinweis
  });

  test('cta-check-zurueck und Zustaende der Ergebnisseite', async ({ page }) => {
    await oeffnen(page, '/check/ergebnis?zustand=fehler');
    await expect(page.getByTestId('zustand-fehler')).toBeVisible();
    await page.getByTestId('cta-check-zurueck').click();
    await expect(page).toHaveURL(/\/#check$/);
    await oeffnen(page, '/check/ergebnis?zustand=schon-genutzt');
    await expect(page.getByTestId('zustand-schon-genutzt')).toBeVisible();
    await oeffnen(page, '/check/ergebnis?zustand=vorschau');
    await expect(page.getByTestId('pdf-vorschau')).not.toContainText(/\d+ ?(von|\/) ?100|Punkte:/);
  });

  test('cta-paket-1..3: Anker und Paket im Formular vorbelegt', async ({ page }) => {
    await oeffnen(page, '/');
    for (const n of ['1', '2', '3']) {
      await page.getByTestId(`cta-paket-${n}`).click();
      await expect(page).toHaveURL(/#kontakt$/);
      await expect(page.getByTestId('anfrage-paket')).toHaveValue(n);
      await page.locator('#pakete').scrollIntoViewIfNeeded();
    }
  });

  test('filter-zweck filtert Kacheln', async ({ page }) => {
    await oeffnen(page, '/');
    await page.locator('#funktionen').scrollIntoViewIfNeeded();
    await expect(page.getByTestId('kachel')).toHaveCount(12);
    await page.getByTestId('filter-zweck').filter({ hasText: 'Kontakt' }).click();
    await expect(page.getByTestId('kachel')).toHaveCount(5);
    await page.getByTestId('filter-zweck').filter({ hasText: 'Alle' }).click();
    await expect(page.getByTestId('kachel')).toHaveCount(12);
  });

  test('Funktionsschau ohne JavaScript: alle Kacheln sichtbar', async ({ browser }) => {
    const ctx = await browser.newContext({ javaScriptEnabled: false });
    const page = await ctx.newPage();
    await page.goto('/');
    await expect(page.getByTestId('kachel')).toHaveCount(12);
    await ctx.close();
  });

  test('form-anfrage: Fehler am Feld, dann /danke', async ({ page }) => {
    await oeffnen(page, '/');
    await page.locator('#kontakt').scrollIntoViewIfNeeded();
    await page.getByTestId('form-anfrage-absenden').click();
    await expect(page.locator('#anfrage-name-f')).toBeVisible();
    await expect(page.locator('#anfrage-kontakt-f')).toBeVisible();
    await page.locator('#anfrage-name').fill('Test Person');
    await page.locator('#anfrage-kontakt').fill('test@example.org');
    await page.getByTestId('form-anfrage-absenden').click();
    await expect(page).toHaveURL(/\/danke$/);
  });

  test('nav-*: Kopfzeile, Fusszeile, Danke, 404', async ({ page }) => {
    await oeffnen(page, '/');
    for (const [id, ziel] of [['nav-check', '#check'], ['nav-pakete', '#pakete'], ['nav-ablauf', '#ablauf'], ['nav-kontakt', '#kontakt']] as const) {
      await page.getByTestId(id).click();
      await expect(page).toHaveURL(new RegExp(ziel + '$'));
    }
    await page.getByTestId('nav-impressum').click();
    await expect(page).toHaveURL(/\/impressum$/);
    await page.getByTestId('nav-datenschutz').click();
    await expect(page).toHaveURL(/\/datenschutz$/);
    await page.goto('/danke'); await page.getByTestId('nav-start').click(); await expect(page).toHaveURL(/\/$/);
    await page.goto('/404'); 
    await page.getByTestId('nav-check-404').click(); await expect(page).toHaveURL(/\/#check$/);
    await page.goto('/404'); await page.getByTestId('nav-kontakt-404').click(); await expect(page).toHaveURL(/\/#kontakt$/);
    await page.goto('/404'); await page.getByTestId('nav-start').click(); await expect(page).toHaveURL(/\/$/);
  });

  test('Mobile Menue (details) mit Links', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await oeffnen(page, '/');
    await page.getByTestId('menue-mobil').click();
    await page.getByTestId('nav-pakete-mobil').click();
    await expect(page).toHaveURL(/#pakete$/);
  });

  test('form-eingaben: Brand-Zweig, + Rezension, Overlay Handy/Computer, filter-tools, Speichern', async ({ page }) => {
    await oeffnen(page, '/eingaben');
    await expect(page.getByTestId('brand-upload')).toHaveCount(0);
    await page.getByLabel('Ja', { exact: true }).check();
    await expect(page.getByTestId('brand-upload')).toBeVisible();
    await page.getByTestId('plus-rezension').click();
    await expect(page.getByLabel('Link zu einer Rezension 2')).toBeVisible();
    await page.getByTestId('frage-rezension').first().click();
    await expect(page.getByTestId('overlay')).toBeVisible();
    await page.getByTestId('overlay-tab-handy').click();
    await expect(page.getByTestId('overlay')).toContainText('Google-Maps-App');
    await page.getByTestId('overlay-tab-computer').click();
    await expect(page.getByTestId('overlay')).toContainText('maps.google.com');
    await page.keyboard.press('Escape');
    await expect(page.getByTestId('overlay')).toBeHidden();
    await page.getByTestId('filter-tools').fill('sales');
    await expect(page.getByTestId('tool-liste').locator('li')).toHaveCount(1);
    await page.getByTestId('tool-liste').getByRole('button').click();
    await page.getByTestId('form-eingaben-speichern').click();
    await expect(page.getByTestId('eingaben-status')).toContainText('nichts gespeichert');
  });

  test('Weiterleitungen 5.2: Ziel stimmt (Vorschau liefert meta refresh, 301 steht in deploy/Caddyfile.snippet)', async ({ page }) => {
    for (const [von, nach] of [['/about-us', '/#werkzeuge'], ['/services', '/#pakete'], ['/grow-together', '/#kontakt'], ['/grow-together/thank-you', '/danke']]) {
      const r = await page.request.get(von);
      expect(await r.text()).toContain(`url=${nach}`);
    }
    const fs = await import('node:fs');
    const snip = fs.readFileSync('deploy/Caddyfile.snippet', 'utf8');
    for (const von of ['/about-us', '/services', '/grow-together', '/grow-together/thank-you']) expect(snip).toContain(`redir ${von} `);
    expect(snip.split('\n').filter((l) => l.startsWith('redir ') && l.endsWith(' 301')).length).toBe(4);
  });
});
