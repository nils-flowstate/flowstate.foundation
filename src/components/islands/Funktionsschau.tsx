import { useState } from 'react';
import { kacheln, zwecke } from '../../data/funktionen';

export default function Funktionsschau() {
  const [aktiv, setAktiv] = useState<string>('Alle');
  const sichtbar = kacheln.filter((k) => aktiv === 'Alle' || k.zweck === aktiv);
  return (
    <div>
      <div className="filter" role="group" aria-label="Nach Zweck filtern">
        {zwecke.map((z) => (
          <button key={z} type="button" className="chip" aria-pressed={aktiv === z} data-testid="filter-zweck" onClick={() => setAktiv(z)}>{z}</button>
        ))}
      </div>
      <p className="sr-only" aria-live="polite">{sichtbar.length} Funktionen angezeigt</p>
      <ul className="kacheln" data-testid="kacheln">
        {sichtbar.map((k) => (
          <li key={k.id} id={k.id} className="kachel" data-testid="kachel">
            <span className="zweck">{k.zweck}</span>
            <strong>{k.name}</strong>
            <span className="ab"><span>{k.ab}</span><span>{k.baustein}</span></span>
          </li>
        ))}
      </ul>
      <p className="muted klein" style={{ marginTop: '1rem' }}>Zählung der Funktionen je Paket: <span className="luecke">UNGEKLAERT (P1, P2)</span></p>
    </div>
  );
}
