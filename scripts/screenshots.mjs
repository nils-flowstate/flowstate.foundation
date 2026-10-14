import { chromium } from '@playwright/test';
import sharp from 'sharp';
import { mkdirSync, writeFileSync } from 'node:fs';

const OUT = process.argv[2];
mkdirSync(OUT, { recursive: true });
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome', args: ['--no-sandbox'] });

async function scrollThrough(page) {
  for (let y = 0; y < (await page.evaluate(() => document.documentElement.scrollHeight)); y += 400) { await page.evaluate((v) => window.scrollTo({ top: v, behavior: 'instant' }), y); await page.waitForTimeout(150); }
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
  await page.waitForTimeout(600);
}
async function speichern(buf, name, breite) {
  let q = 70, out;
  for (; q >= 25; q -= 8) {
    out = await sharp(buf).resize({ width: breite, withoutEnlargement: true }).jpeg({ quality: q, mozjpeg: true }).toBuffer();
    if (out.length <= 200 * 1024) break;
  }
  writeFileSync(`${OUT}/${name}.jpg`, out);
  console.log(name, Math.round(out.length / 1024) + ' KB', 'q' + q);
}
async function seite(ctx, pfad, name, opts = {}) {
  const page = await ctx.newPage();
  await page.goto('http://localhost:4321' + pfad);
  await page.waitForLoadState('networkidle');
  if (opts.vor) await opts.vor(page);
  if (opts.voll) { await scrollThrough(page); }
  const buf = await page.screenshot({ fullPage: !!opts.voll });
  await speichern(buf, name, opts.breite ?? 1200);
  await page.close();
}

const desk = await browser.newContext({ viewport: { width: 1440, height: 900 } });
const mob = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 1, isMobile: true });
const stand = async (p) => { await p.getByTestId('stand-zeigen').click(); };

await seite(desk, '/', '01-start-hero-desktop');
await seite(desk, '/', '02-start-ganz-desktop', { voll: true, breite: 900 });
await seite(mob, '/', '03-start-ganz-mobil', { voll: true, breite: 390 });
await seite(desk, '/', '04-swipe-karte', { vor: async (p) => { await p.locator('#swipe').scrollIntoViewIfNeeded(); await p.waitForTimeout(700); } });
await seite(desk, '/', '05-swipe-endkarte', { vor: async (p) => { await p.locator('#swipe').scrollIntoViewIfNeeded(); await p.waitForTimeout(700); for (let i = 0; i < 8; i++) await p.getByTestId(i % 3 ? 'swipe-ja' : 'swipe-nein').click(); await p.waitForTimeout(500); } });
await seite(desk, '/', '06-check', { vor: async (p) => { await p.locator('#check').scrollIntoViewIfNeeded(); await p.waitForTimeout(700); } });
await seite(desk, '/', '07-pakete', { vor: async (p) => { await p.locator('#pakete').scrollIntoViewIfNeeded(); await p.waitForTimeout(700); } });
await seite(desk, '/', '08-pakete-stand-sichtbar', { vor: async (p) => { await p.locator('#pakete').scrollIntoViewIfNeeded(); await p.waitForTimeout(700); await stand(p); } });
await seite(desk, '/', '09-start-stand-sichtbar', { voll: true, breite: 900, vor: async (p) => { await stand(p); } });
await seite(desk, '/check/ergebnis?zustand=vorschau', '10-ergebnis-vorschau');
await seite(mob, '/check/ergebnis?zustand=laden', '11-ergebnis-laden-mobil');
await seite(desk, '/eingaben', '12-eingaben', { voll: true, breite: 900 });
await seite(desk, '/impressum', '13-impressum', { vor: stand });
await seite(desk, '/datenschutz', '14-datenschutz');
await seite(mob, '/danke', '15-danke-mobil');
await seite(desk, '/404', '16-404');
await browser.close();
