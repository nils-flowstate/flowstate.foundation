import { useEffect, useState } from 'react';

const mailOk = (m: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(m.trim());

export default function Anfrage() {
  const [paket, setPaket] = useState('');
  const [fehler, setFehler] = useState<Record<string, string>>({});
  useEffect(() => {
    if (window.__paket) setPaket(window.__paket);
    const h = (e: Event) => setPaket(String((e as CustomEvent).detail));
    window.addEventListener('ff-paket', h);
    return () => window.removeEventListener('ff-paket', h);
  }, []);

  function absenden(e: React.SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const err: Record<string, string> = {};
    if (!String(f.get('name') || '').trim()) err.name = 'Wie dürfen wir dich nennen?';
    const k = String(f.get('kontakt') || '').trim();
    if (!k) err.kontakt = 'Trag eine Mail-Adresse oder eine Telefonnummer ein.';
    else if (k.includes('@') ? !mailOk(k) : k.replace(/\D/g, '').length < 6) err.kontakt = 'Das sieht nicht nach einer Mail-Adresse oder Telefonnummer aus.';
    setFehler(err);
    if (Object.keys(err).length) { (document.getElementById(`anfrage-${Object.keys(err)[0]}`) as HTMLElement | null)?.focus(); return; }
    window.location.href = '/danke'; // Vorschau: nichts wird gesendet
  }
  const d = (n: string) => fehler[n] ? `anfrage-${n}-f` : undefined;
  const F = ({ n }: { n: string }) => fehler[n] ? <span className="fehler" id={`anfrage-${n}-f`} role="alert"><span aria-hidden="true">✕ </span>{fehler[n]}</span> : null;

  return (
    <form noValidate onSubmit={absenden} className="formkarte" data-testid="form-anfrage" aria-label="Anfrage">
      <div className="feld"><label htmlFor="anfrage-name">Name</label>
        <input id="anfrage-name" name="name" type="text" autoComplete="name" required aria-required="true" aria-invalid={!!fehler.name} aria-describedby={d('name')} /><F n="name" /></div>
      <div className="feld"><label htmlFor="anfrage-kontakt">Mail oder Telefonnummer</label>
        <span className="hilfe">Eins von beiden reicht.</span>
        <input id="anfrage-kontakt" name="kontakt" type="text" autoComplete="email" required aria-required="true" aria-invalid={!!fehler.kontakt} aria-describedby={d('kontakt')} /><F n="kontakt" /></div>
      <div className="feld"><label htmlFor="anfrage-paket">Paket</label>
        <select id="anfrage-paket" name="paket" value={paket} onChange={(e) => setPaket(e.target.value)} data-testid="anfrage-paket">
          <option value="">weiß ich noch nicht</option>
          <option value="1">Stufe 1</option>
          <option value="2">Stufe 2</option>
          <option value="3">Stufe 3</option>
        </select></div>
      <div className="feld"><label htmlFor="anfrage-nachricht">Nachricht (optional)</label><textarea id="anfrage-nachricht" name="nachricht" /></div>
      <button type="submit" className="btn btn-haupt" data-testid="form-anfrage-absenden">Anfrage senden</button>
      <p className="muted klein" style={{ marginTop: '0.9rem' }}>Wir nutzen deine Angaben nur, um dich zurückzurufen.</p>
      <p className="klein"><span className="luecke">Formular-Empfang (V11), Auftragsverarbeitung: UNGEKLAERT</span> Vorschau: nichts wird gesendet.</p>
    </form>
  );
}
