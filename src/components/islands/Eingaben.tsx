import { useEffect, useRef, useState } from 'react';

// Anleitungen AL-01 und AL-03 aus 30-knowledge/08-brand/50-eingaben-je-funktion.md (Suchauszug 08.10.2026, am Geraet nicht durchgeklickt), in Du-Form.
const ANLEITUNGEN = {
  rezension: { titel: 'So findest du den Link zu einer Rezension', handy: ['Google-Maps-App öffnen, dein Unternehmen suchen.', 'Rezensionen antippen.', 'Bei der gewünschten Rezension auf Teilen tippen.', 'Link kopieren.', 'Hier ins Feld einfügen.', 'Für die nächste Rezension auf + tippen und wiederholen.'], computer: ['maps.google.com öffnen, dein Unternehmen suchen.', 'Auf die Rezensionen klicken.', 'Bei der gewünschten Rezension Teilen klicken.', 'Link kopieren.', 'Hier einfügen.', '+ für die nächste.'] },
  whatsapp: { titel: 'So gibst du deine WhatsApp-Nummer an', handy: ['Nummer mit Ländervorwahl, ohne + und ohne führende 0: aus 0171 … wird 49171 …', 'Mit WhatsApp Business: iPhone Einstellungen → Unternehmenstools → Kurzlink, Android ⋮ → Unternehmenstools → Kurzlink.', 'Dort auch den Text für den Chatbeginn festlegen.'], computer: ['Nummer wie links eintragen.', 'Kurzlink und Text legt die Handy-App fest, am Computer nicht nötig.'] },
} as const;
type Anl = keyof typeof ANLEITUNGEN;

const TOOLS = [
  { name: 'Brevo', zweck: 'Maildienst, CRM' }, { name: 'Apollo', zweck: 'Sales' }, { name: 'Notion', zweck: 'Projektmanagement' },
  { name: 'Instagram', zweck: 'Kanal' }, { name: 'LinkedIn', zweck: 'Kanal' },
];

function Overlay({ anl, onClose }: { anl: Anl | null; onClose: () => void }) {
  const ref = useRef<HTMLDialogElement>(null);
  const [tab, setTab] = useState<'handy' | 'computer'>('handy');
  useEffect(() => {
    const d = ref.current; if (!d) return;
    if (anl && !d.open) { setTab(/Mobi|Android|iPhone/.test(navigator.userAgent) ? 'handy' : 'computer'); d.showModal(); }
    if (!anl && d.open) d.close();
  }, [anl]);
  const a = anl ? ANLEITUNGEN[anl] : null;
  return (
    <dialog ref={ref} className="overlay" aria-labelledby="ov-titel" data-testid="overlay" onClose={onClose} onClick={(e) => { if (e.target === ref.current) onClose(); }}>
      {a && <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem', alignItems: 'flex-start' }}>
          <h2 id="ov-titel" style={{ fontSize: '1.35rem' }}>{a.titel}</h2>
          <button type="button" className="frage-knopf" onClick={onClose} aria-label="Schließen" data-testid="overlay-zu">×</button>
        </div>
        <div role="tablist" aria-label="Gerät" className="tabs" style={{ margin: '1rem 0' }}>
          <button role="tab" type="button" aria-selected={tab === 'handy'} onClick={() => setTab('handy')} data-testid="overlay-tab-handy">Handy</button>
          <button role="tab" type="button" aria-selected={tab === 'computer'} onClick={() => setTab('computer')} data-testid="overlay-tab-computer">Computer</button>
        </div>
        <div role="tabpanel"><ol style={{ paddingLeft: '1.25rem', display: 'grid', gap: '0.5rem' }}>{a[tab].map((s) => <li key={s}>{s}</li>)}</ol></div>
        <p className="klein muted" style={{ marginTop: '1rem' }}>Menüs ändern sich je Version; die Anleitung ist am Gerät noch nicht durchgeklickt.</p>
      </div>}
    </dialog>
  );
}

export default function Eingaben() {
  const [hatBrand, setHatBrand] = useState<'ja' | 'nein'>('nein');
  const [links, setLinks] = useState<string[]>(['']);
  const [nachweise, setNachweise] = useState<number>(1);
  const [anl, setAnl] = useState<Anl | null>(null);
  const [suche, setSuche] = useState('');
  const [gewaehlt, setGewaehlt] = useState<string[]>([]);
  const [gespeichert, setGespeichert] = useState(false);
  const fragezeichen = (a: Anl, label: string) => <button type="button" className="frage-knopf" aria-label={`Anleitung: ${label}`} onClick={() => setAnl(a)} data-testid={`frage-${a}`}>?</button>;
  const treffer = TOOLS.filter((t) => (t.name + ' ' + t.zweck).toLowerCase().includes(suche.trim().toLowerCase()));

  return (
    <form noValidate onSubmit={(e) => { e.preventDefault(); setGespeichert(true); }} data-testid="form-eingaben" style={{ display: 'grid', gap: '2.5rem', gridTemplateColumns: 'minmax(0, 1fr)' }}>
      <section aria-labelledby="g-grundlage" data-stand="vorschlag"><span className="stand-chip" aria-hidden="true">Abschnitt 2 · formular Grundlage · vorschlag</span>
        <h2 id="g-grundlage" style={{ fontSize: '1.6rem', marginBottom: '1.25rem' }}>Grundlage</h2>
        <div className="formkarte">
          <div className="feld"><label htmlFor="e-mail">Mail</label><input id="e-mail" type="email" autoComplete="email" required aria-required="true" /></div>
          <div className="feld"><label htmlFor="e-url">Deine Website</label><input id="e-url" type="url" placeholder="https://" /></div>
          <div className="feld"><label htmlFor="e-dom">Domain-Anbieter</label><input id="e-dom" type="text" /></div>
          <fieldset className="feld" style={{ border: 0, padding: 0, margin: '0 0 1.1rem' }}>
            <legend className="label" style={{ fontWeight: 700, padding: 0 }}>Ich habe schon eine Brand</legend>
            <label style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}><input type="radio" name="brand" checked={hatBrand === 'ja'} onChange={() => setHatBrand('ja')} /> Ja</label>
            <label style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}><input type="radio" name="brand" checked={hatBrand === 'nein'} onChange={() => setHatBrand('nein')} /> Nein</label>
          </fieldset>
          {hatBrand === 'ja' && <div className="feld" data-testid="brand-upload"><label htmlFor="e-brand">Brand-Dokumente hochladen</label><input id="e-brand" type="file" multiple /></div>}
          <div className="feld"><label htmlFor="e-farbe">Farben wählen (Farbwähler, Hex)</label>
            <div className="zeile-mit-plus"><input id="e-farbe" type="color" aria-label="Farbwähler" style={{ width: '3.5rem', height: '2.75rem', padding: 0, border: '2px solid rgb(18 26 56 / .55)', borderRadius: '0.5rem' }} defaultValue="#121a38" /><input type="text" aria-label="Hex-Wert" placeholder="#121A38" /></div>
            <span className="hilfe">Gilt für den Fall „nein“ oder zusätzlich zu deinen Dokumenten.</span></div>
          <div className="feld"><label htmlFor="e-zweck">Zweck der Website</label><textarea id="e-zweck" /></div>
          <div className="feld"><label htmlFor="e-fehlt">Was fehlt dir an deiner Website, was wünschst du dir?</label><span className="hilfe">Nur bei bestehender Website.</span><textarea id="e-fehlt" /></div>
          <div className="feld"><label htmlFor="e-medien">Bilder und Videos</label><span className="hilfe">Je Datei mit Bezug („Hero“, „Über uns“, …) oder ohne.</span><input id="e-medien" type="file" multiple accept="image/*,video/*" />
            <span className="luecke">Höchstgröße und -länge: später mit Nils</span></div>
        </div>
      </section>

      <section aria-labelledby="g-werkzeug" data-stand="UNGEKLAERT"><span className="stand-chip" aria-hidden="true">Abschnitt 3 · werkzeugwahl · vorschlag · Tool-Liste UNGEKLAERT (G4)</span>
        <h2 id="g-werkzeug" style={{ fontSize: '1.6rem', marginBottom: '1.25rem' }}>Womit arbeitest du heute?</h2>
        <div className="formkarte">
          <div className="feld"><label htmlFor="e-tools">Tool suchen (nach Name oder Zweck)</label>
            <input id="e-tools" type="search" value={suche} onChange={(e) => setSuche(e.target.value)} data-testid="filter-tools" aria-controls="tool-liste" />
          </div>
          <ul id="tool-liste" style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }} data-testid="tool-liste">
            {treffer.map((t) => <li key={t.name}><button type="button" className="chip" aria-pressed={gewaehlt.includes(t.name)} onClick={() => setGewaehlt((g) => g.includes(t.name) ? g.filter((x) => x !== t.name) : [...g, t.name])}>{t.name} · {t.zweck}</button></li>)}
            {treffer.length === 0 && <li className="muted">Kein Tool gefunden.</li>}
          </ul>
          <p className="klein" style={{ marginTop: '0.9rem' }} aria-live="polite">Ausgewählt: {gewaehlt.length ? gewaehlt.join(', ') : 'noch nichts'}</p>
          <p className="klein"><span className="luecke">Liste der Tools: UNGEKLAERT (G4) – hier nur die Beispiele von Nils</span></p>
        </div>
      </section>

      <section aria-labelledby="g-funktionen" data-stand="vorschlag"><span className="stand-chip" aria-hidden="true">Abschnitt 4 · formular je gekaufter Funktion · vorschlag</span>
        <h2 id="g-funktionen" style={{ fontSize: '1.6rem', marginBottom: '0.5rem' }}>Deine Funktionen</h2>
        <p className="muted" style={{ marginBottom: '1.25rem' }}>Die vier Funktionen, die in jedem Paket frei sind. Ab hier erscheinen nur Felder der Funktionen, die du hast.</p>
        <div className="formkarte" style={{ display: 'grid', gap: '2rem', gridTemplateColumns: 'minmax(0, 1fr)' }}>
          <fieldset style={{ border: 0, padding: 0, margin: 0 }}>
            <legend style={{ fontWeight: 800, fontSize: '1.15rem', padding: 0, marginBottom: '0.75rem' }}>Google-Rezensionen</legend>
            <div className="feld"><label htmlFor="r-profil">Link zu deinem Google-Unternehmensprofil</label><span className="hilfe">Der Link zu deinem Eintrag auf Google Maps.</span><input id="r-profil" type="url" placeholder="https://" /></div>
            {links.map((l, n) => (
              <div className="feld" key={n}>
                <label htmlFor={`r-${n}`}>Link zu einer Rezension {n + 1}</label>
                <span className="hilfe">Je Rezension ein Link. Mit + fügst du weitere hinzu.</span>
                <div className="zeile-mit-plus"><input id={`r-${n}`} type="url" placeholder="https://" value={l} onChange={(e) => setLinks((x) => x.map((v, k) => k === n ? e.target.value : v))} />{fragezeichen('rezension', 'Link zu einer Rezension')}</div>
              </div>))}
            <button type="button" className="btn btn-linie btn-klein" onClick={() => setLinks((x) => [...x, ''])} data-testid="plus-rezension">+ weitere Rezension</button>
            <p className="klein" style={{ marginTop: '0.5rem' }}><span className="luecke">Anleitung zum Profil-Link (AL-02): nicht übernommen</span></p>
          </fieldset>
          <fieldset style={{ border: 0, padding: 0, margin: 0 }}>
            <legend style={{ fontWeight: 800, fontSize: '1.15rem', padding: 0, marginBottom: '0.75rem' }}>WhatsApp-Button</legend>
            <div className="feld"><label htmlFor="w-nr">WhatsApp-Nummer</label><span className="hilfe">Die Nummer, auf der du WhatsApp nutzt – mit Ländervorwahl.</span>
              <div className="zeile-mit-plus"><input id="w-nr" type="text" inputMode="numeric" />{fragezeichen('whatsapp', 'WhatsApp-Nummer')}</div></div>
          </fieldset>
          <fieldset style={{ border: 0, padding: 0, margin: 0 }}>
            <legend style={{ fontWeight: 800, fontSize: '1.15rem', padding: 0, marginBottom: '0.75rem' }}>Hero-Video oder -Bild</legend>
            <div className="feld"><label htmlFor="h-datei">Datei hochladen</label><span className="hilfe">Das Video läuft ohne Ton. Ein Bild allein oder als Standbild zum Video geht auch.</span><input id="h-datei" type="file" accept="video/mp4,video/quicktime,image/jpeg,image/png,image/webp" /></div>
            <span className="luecke">Höchstgröße und -länge: später mit Nils</span>
          </fieldset>
          <fieldset style={{ border: 0, padding: 0, margin: 0 }}>
            <legend style={{ fontWeight: 800, fontSize: '1.15rem', padding: 0, marginBottom: '0.75rem' }}>Nachweise</legend>
            {Array.from({ length: nachweise }, (_, n) => (
              <div className="feld" key={n}>
                <label htmlFor={`n-${n}`}>Nachweis {n + 1} (PDF, JPG, PNG, SVG)</label>
                <input id={`n-${n}`} type="file" accept=".pdf,.jpg,.jpeg,.png,.svg" />
                <label htmlFor={`nb-${n}`} style={{ fontWeight: 700 }}>Gültig bis</label>
                <input id={`nb-${n}`} type="date" />
              </div>))}
            <button type="button" className="btn btn-linie btn-klein" onClick={() => setNachweise((x) => x + 1)} data-testid="plus-nachweis">+ weiterer Nachweis</button>
          </fieldset>
        </div>
      </section>

      <div>
        <button type="submit" className="btn btn-haupt" data-testid="form-eingaben-speichern">Speichern</button>
        <p role="status" className="erfolg" style={{ marginTop: '0.9rem' }} data-testid="eingaben-status">{gespeichert ? 'Vorschau: Es wurde nichts gespeichert oder gesendet.' : ''}</p>
        <p className="klein"><span className="luecke">Zugang und Route (G1), Ablage (G3): UNGEKLAERT</span></p>
      </div>
      <Overlay anl={anl} onClose={() => setAnl(null)} />
    </form>
  );
}
