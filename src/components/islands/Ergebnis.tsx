import { useEffect, useState } from 'react';

type Z = 'laden' | 'vorschau' | 'fehler' | 'schon-genutzt';
const ZIEL: Record<string, string> = { 'gmail.com': 'https://mail.google.com/', 'googlemail.com': 'https://mail.google.com/', 'outlook.com': 'https://outlook.live.com/mail/', 'hotmail.com': 'https://outlook.live.com/mail/', 'live.de': 'https://outlook.live.com/mail/', 'gmx.de': 'https://www.gmx.net/', 'gmx.net': 'https://www.gmx.net/', 'web.de': 'https://web.de/' };

export default function Ergebnis() {
  const [z, setZ] = useState<Z>('laden');
  const [weg, setWeg] = useState<'schnellcheck' | 'brandtest'>('schnellcheck');
  const [ziel, setZiel] = useState<string | null>(null);

  useEffect(() => {
    const q = new URLSearchParams(window.location.search);
    const zz = q.get('zustand') as Z | null;
    if (q.get('weg') === 'brandtest') setWeg('brandtest');
    try { const dom = sessionStorage.getItem('ff_mail_domain'); if (dom && ZIEL[dom]) setZiel(ZIEL[dom]); } catch { /* ohne Speicher */ }
    if (zz && ['laden', 'vorschau', 'fehler', 'schon-genutzt'].includes(zz)) { setZ(zz); return; }
    const t = setTimeout(() => setZ('vorschau'), 2500); // Vorschau: simulierter Lauf, kein Job-Status vom VPS
    return () => clearTimeout(t);
  }, []);

  const achsen = weg === 'brandtest' ? ['Brand', 'Positionierung', 'Leitsätze', 'Touchpoints'] : ['SEO', 'GEO', 'Ladezeit', 'Datenschutz'];
  const label = weg === 'brandtest' ? 'Brand-Test' : 'Website-Schnellcheck';

  return (
    <div data-testid="ergebnis" data-zustand={z}>
      <div className="zwei">
        <div aria-live="polite">
          {z === 'laden' && (<div data-testid="zustand-laden">
            <h1 style={{ fontSize: 'clamp(2rem,5vw,3.25rem)' }}>{weg === 'brandtest' ? 'Wir lesen deine Dokumente …' : 'Wir lesen deine Seite …'}</h1>
            <ul className="laden-schritte"><li>Seite abrufen</li><li>Konkurrenz vergleichen</li><li>Dokument setzen</li></ul>
            <div className="puls" aria-hidden="true" />
            <p className="muted klein" style={{ marginTop: '1rem' }}>Dauer je Schritt: noch nicht gemessen.</p>
          </div>)}
          {z === 'vorschau' && (<div data-testid="zustand-vorschau">
            <h1 style={{ fontSize: 'clamp(2rem,5vw,3.25rem)' }}>Deine Einschätzung ist fertig.</h1>
            <p style={{ margin: '1rem 0 1.5rem', fontSize: '1.15rem' }}>Bestätige deine Mail – dann kommt das ganze PDF.</p>
            {ziel ? <a className="btn btn-haupt" href={ziel} target="_blank" rel="noopener noreferrer" data-testid="cta-mailprogramm">Zu deinem E-Mail-Programm</a>
              : <div><span className="btn btn-haupt" role="note" data-testid="cta-mailprogramm" aria-disabled="true" style={{ opacity: 1 }}>Zu deinem E-Mail-Programm</span>
                  <p className="klein" style={{ marginTop: '0.75rem' }} data-testid="mail-hinweis">Öffne dein Postfach und klick den Link in unserer Mail.</p></div>}
            <p className="muted klein" style={{ marginTop: '0.9rem' }}>Link je nach Domain deiner Mail (Gmail, Outlook, GMX, web.de); sonst nur dieser Hinweis. Kein Link an uns.</p>
          </div>)}
          {z === 'fehler' && (<div data-testid="zustand-fehler">
            <h1 style={{ fontSize: 'clamp(2rem,5vw,3.25rem)' }}>Deine Seite war nicht erreichbar.</h1>
            <p style={{ margin: '1rem 0 1.5rem', fontSize: '1.15rem' }}>Prüf die Adresse und versuch es noch mal. Es zählt nicht als dein kostenloser Check.</p>
            <a className="btn btn-ink" href="/#check" data-testid="cta-check-zurueck">Zurück zum Check</a>
          </div>)}
          {z === 'schon-genutzt' && (<div data-testid="zustand-schon-genutzt">
            <h1 style={{ fontSize: 'clamp(2rem,5vw,3.25rem)' }}>Für diese Mail gibt es schon einen Check.</h1>
            <p style={{ margin: '1rem 0', fontSize: '1.15rem' }}>Der Check ist einmal je Mail kostenlos. Fragen zu deiner Einschätzung? Schreib uns – Nils ruft an, ohne Termin.</p>
          </div>)}
        </div>
        {(z === 'laden' || z === 'vorschau') && (
          <div className="pdf" data-testid="pdf-vorschau">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <img src="/favicon.svg" alt="" width="32" height="32" />
              <span className="klein muted" style={{ fontWeight: 700 }}>{label}</span>
            </div>
            {z === 'vorschau' && <p style={{ fontWeight: 800, fontSize: '1.2rem', marginTop: '1rem' }}>{weg === 'brandtest' ? 'Wie klar ist deine Marke?' : 'Was kannst du dir von deiner Konkurrenz abschauen?'}</p>}
            <div className="unscharf" aria-hidden="true">
              <svg viewBox="0 0 200 140" width="100%" role="presentation"><polygon points="100,10 190,70 100,130 10,70" fill="none" stroke="#121A38" strokeOpacity=".3" /><polygon points="100,40 150,70 100,100 50,70" fill="#EDA396" stroke="#D93A1E" /></svg>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 700, fontSize: '0.8rem' }}>{achsen.map((a) => <span key={a}>{a}</span>)}</div>
              {[90, 70, 85, 55].map((w, i) => <div key={i} className="balken" style={{ width: `${w}%` }} />)}
            </div>
            <p className="klein" style={{ marginTop: '0.75rem' }}><span className="luecke">Kopf und erste Zeilen aus dem Lead-Dokument: UNGEKLAERT, Skill nicht im Betrieb</span></p>
          </div>
        )}
      </div>
    </div>
  );
}
