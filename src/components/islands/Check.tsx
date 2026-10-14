import { useEffect, useRef, useState } from 'react';

type Weg = 'schnellcheck' | 'brandtest';
type Fehler = Record<string, string>;

const mailOk = (m: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(m.trim());
const urlOk = (u: string) => { try { const x = new URL(/^https?:\/\//i.test(u.trim()) ? u.trim() : `https://${u.trim()}`); return x.hostname.includes('.'); } catch { return false; } };

export default function Check() {
  const [weg, setWeg] = useState<Weg>('schnellcheck');
  const [fehler, setFehler] = useState<Fehler>({});
  const [dateien, setDateien] = useState<string[]>([]);
  const tabs = useRef<Record<Weg, HTMLButtonElement | null>>({ schnellcheck: null, brandtest: null });

  useEffect(() => {
    if (window.__weg === 'brandtest' || window.__weg === 'schnellcheck') setWeg(window.__weg);
    const h = (e: Event) => setWeg((e as CustomEvent).detail as Weg);
    window.addEventListener('ff-weg', h);
    return () => window.removeEventListener('ff-weg', h);
  }, []);

  function tabKey(e: React.KeyboardEvent) {
    if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
      e.preventDefault();
      const n: Weg = weg === 'schnellcheck' ? 'brandtest' : 'schnellcheck';
      setWeg(n); tabs.current[n]?.focus();
    }
  }

  function absenden(e: React.SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const err: Fehler = {};
    if (weg === 'schnellcheck') {
      const u = String(f.get('url') || '');
      if (!u.trim()) err.url = 'Trag die Adresse deiner Website ein.';
      else if (!urlOk(u)) err.url = 'Diese Adresse sieht nicht richtig aus. Beispiel: https://deine-seite.de';
    } else if (dateien.length === 0) err.dateien = 'Lade mindestens ein Brand-Dokument hoch.';
    const k = ['k1', 'k2', 'k3'].map((n) => String(f.get(n) || '').trim());
    if (!k.some(Boolean)) err.k1 = 'Trag mindestens eine Konkurrenz-Website ein.';
    else if (k.some((x) => x && !urlOk(x))) err.k1 = 'Eine Konkurrenz-Adresse sieht nicht richtig aus.';
    const m = String(f.get('mail') || '');
    if (!m.trim()) err.mail = 'Trag deine Mail-Adresse ein.';
    else if (!mailOk(m)) err.mail = 'Diese Mail-Adresse sieht nicht richtig aus.';
    setFehler(err);
    if (Object.keys(err).length) {
      const erst = Object.keys(err)[0];
      (document.getElementById(`${weg}-${erst}`) as HTMLElement | null)?.focus();
      return;
    }
    // Vorschau: nichts wird gesendet. Nur die Domain der Mail bleibt fuer den Mail-Link im Browser (sessionStorage).
    try { sessionStorage.setItem('ff_mail_domain', m.trim().split('@')[1].toLowerCase()); } catch { /* ohne Speicher */ }
    window.location.href = `/check/ergebnis?weg=${weg}`;
  }

  const p = weg;
  const FeldFehler = ({ name }: { name: string }) => fehler[name] ? <span className="fehler" id={`${p}-${name}-f`} role="alert"><span aria-hidden="true">✕ </span>{fehler[name]}</span> : null;
  const desc = (name: string, hilfe?: string) => [fehler[name] ? `${p}-${name}-f` : '', hilfe ? `${p}-${name}-h` : ''].filter(Boolean).join(' ') || undefined;

  return (
    <div>
      <div role="tablist" aria-label="Welchen Check willst du?" className="tabs" onKeyDown={tabKey}>
        <button role="tab" type="button" id="tab-schnellcheck" aria-selected={weg === 'schnellcheck'} aria-controls="panel-check" tabIndex={weg === 'schnellcheck' ? 0 : -1} data-testid="check-weg-schnellcheck" ref={(el) => { tabs.current.schnellcheck = el; }} onClick={() => { setWeg('schnellcheck'); setFehler({}); }}>Website-Schnellcheck</button>
        <button role="tab" type="button" id="tab-brandtest" aria-selected={weg === 'brandtest'} aria-controls="panel-check" tabIndex={weg === 'brandtest' ? 0 : -1} data-testid="check-weg-brandtest" ref={(el) => { tabs.current.brandtest = el; }} onClick={() => { setWeg('brandtest'); setFehler({}); }}>Brand-Test</button>
      </div>
      <div role="tabpanel" id="panel-check" aria-labelledby={`tab-${weg}`} className="formkarte">
        <p style={{ marginBottom: '1.25rem' }} data-testid="check-beschreibung">
          {weg === 'schnellcheck'
            ? 'Was du dir von deiner Konkurrenz abschauen kannst – dazu SEO, GEO, Ladezeit und Datenschutz.'
            : 'Wie klar deine Marke ist – Brand, Positionierung, Leitsätze, Touchpoints, im Vergleich mit deiner Konkurrenz.'}
        </p>
        <form noValidate onSubmit={absenden} data-testid={weg === 'schnellcheck' ? 'form-schnellcheck' : 'form-brandtest'} key={weg}>
          {weg === 'schnellcheck' ? (
            <div className="feld">
              <label htmlFor={`${p}-url`}>Deine Website</label>
              <input id={`${p}-url`} name="url" type="url" inputMode="url" placeholder="https://" autoComplete="url" required aria-required="true" aria-invalid={!!fehler.url} aria-describedby={desc('url')} />
              <FeldFehler name="url" />
            </div>
          ) : (
            <div className="feld">
              <label htmlFor={`${p}-dateien`}>Brand-Dokumente</label>
              <span className="hilfe" id={`${p}-dateien-h`}>PDF, PNG, JPG, SVG oder DOCX.</span>
              <input id={`${p}-dateien`} name="dateien" type="file" multiple accept=".pdf,.png,.jpg,.jpeg,.svg,.docx" aria-invalid={!!fehler.dateien} aria-describedby={desc('dateien', 'h')} onChange={(e) => setDateien(Array.from(e.target.files || []).map((f) => f.name))} />
              <FeldFehler name="dateien" />
              <span className="luecke">Höchstgröße je Datei: UNGEKLAERT</span>
            </div>
          )}
          <fieldset style={{ border: 0, padding: 0, margin: 0 }}>
            <legend style={{ fontWeight: 700, marginBottom: '0.35rem', padding: 0 }}>Konkurrenz – 1 bis 3 Websites</legend>
            <div className="feld">
              <label htmlFor={`${p}-k1`} className="sr-only">Konkurrenz 1</label>
              <input id={`${p}-k1`} name="k1" type="url" inputMode="url" placeholder="https://" aria-invalid={!!fehler.k1} aria-describedby={desc('k1')} />
              <FeldFehler name="k1" />
            </div>
            <div className="feld"><label htmlFor={`${p}-k2`} className="sr-only">Konkurrenz 2, optional</label><input id={`${p}-k2`} name="k2" type="url" inputMode="url" placeholder="https:// (optional)" /></div>
            <div className="feld"><label htmlFor={`${p}-k3`} className="sr-only">Konkurrenz 3, optional</label><input id={`${p}-k3`} name="k3" type="url" inputMode="url" placeholder="https:// (optional)" /></div>
          </fieldset>
          <div className="feld">
            <label htmlFor={`${p}-mail`}>Deine Mail</label>
            <input id={`${p}-mail`} name="mail" type="email" autoComplete="email" required aria-required="true" aria-invalid={!!fehler.mail} aria-describedby={desc('mail')} />
            <FeldFehler name="mail" />
          </div>
          <p className="muted klein" style={{ marginBottom: '0.4rem' }}>Deine Dokumente werden nur für die Einschätzung gelesen und danach gelöscht. <span className="luecke">Wortlaut S4/V8 UNGEKLAERT</span></p>
          <p className="muted klein" style={{ marginBottom: '0.4rem' }}>Nach dem Klick bestätigst du deine Mail; danach kommt das PDF.</p>
          <p className="muted klein" style={{ marginBottom: '1.25rem' }}>Bot-Prüfung: unauffällig, kein Bilderrätsel. <span className="luecke">Verfahren (ALTCHA) nicht gebaut</span></p>
          <button type="submit" className="btn btn-ink">Generieren</button>
          <p className="muted klein" style={{ marginTop: '0.75rem' }}>Vorschau: Das Formular sendet nichts.</p>
        </form>
      </div>
    </div>
  );
}
