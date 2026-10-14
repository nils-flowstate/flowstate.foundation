import { useEffect, useRef, useState } from 'react';
import { karten, empfehlung } from '../../data/swipe';

declare global { interface Window { __weg?: string; __paket?: string } }

export default function SwipeCard() {
  const [i, setI] = useState(0);
  const [antworten, setAntworten] = useState<boolean[]>([]);
  const [dx, setDx] = useState(0);
  const [zieht, setZieht] = useState(false);
  const [hinweis, setHinweis] = useState(false);
  const start = useRef<number | null>(null);
  const endRef = useRef<HTMLDivElement>(null);
  const fertig = i >= karten.length;
  const lücken = antworten.filter((a) => !a).length;

  useEffect(() => {
    const reduziert = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    try {
      if (!reduziert && !sessionStorage.getItem('ff_swipe_hinweis')) {
        sessionStorage.setItem('ff_swipe_hinweis', '1');
        setHinweis(true);
        const t = setTimeout(() => setHinweis(false), 1400);
        return () => clearTimeout(t);
      }
    } catch { /* ohne Speicher: kein Hinweis */ }
  }, []);

  useEffect(() => { if (i >= karten.length) endRef.current?.focus(); }, [i]);

  function werten(ja: boolean) {
    if (fertig) return;
    setAntworten((a) => [...a, ja]);
    setI((n) => n + 1);
    setDx(0);
  }
  function onKey(e: React.KeyboardEvent) {
    if (fertig) return;
    if (e.key === 'ArrowRight') { e.preventDefault(); werten(true); }
    if (e.key === 'ArrowLeft') { e.preventDefault(); werten(false); }
  }
  function neu() { setI(0); setAntworten([]); setDx(0); }
  function weiter() {
    const e = empfehlung(antworten);
    window.__weg = e.weg;
    window.dispatchEvent(new CustomEvent('ff-weg', { detail: e.weg }));
    const ziel = document.getElementById('check');
    const reduziert = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    ziel?.scrollIntoView({ behavior: reduziert ? 'auto' : 'smooth' });
    history.replaceState(null, '', '#check');
  }

  const k = karten[Math.min(i, karten.length - 1)];
  const empf = fertig ? empfehlung(antworten) : null;

  return (
    <div onKeyDown={onKey} data-testid="swipecard">
      <div className="swipe-kopfzeile">
        <span data-testid="swipe-zaehler">{fertig ? '8 von 8' : `${i + 1} von 8`}</span>
        <span>{lücken} {lücken === 1 ? 'Lücke' : 'Lücken'}</span>
      </div>
      <div className="fortschritt" role="progressbar" aria-label="Fortschritt" aria-valuemin={0} aria-valuemax={8} aria-valuenow={Math.min(i, 8)}>
        <div style={{ width: `${(Math.min(i, 8) / 8) * 100}%` }} />
      </div>
      <p aria-live="polite" className="sr-only">{fertig ? 'Alle 8 Fragen beantwortet.' : `Frage ${i + 1} von 8: ${k.frage}`}</p>
      {!fertig ? (
        <>
          <div className="deck">
            <div
              className={`swipe-karte${zieht ? ' zieht' : ''}${hinweis ? ' hinweis' : ''}`}
              data-testid="swipe-karte"
              style={{ transform: `translateX(${dx}px) rotate(${dx / 40}deg)`, transition: zieht ? 'none' : 'transform 0.25s ease' }}
              onPointerDown={(e) => { start.current = e.clientX; setZieht(true); (e.target as Element).setPointerCapture?.(e.pointerId); }}
              onPointerMove={(e) => { if (start.current !== null) setDx(e.clientX - start.current); }}
              onPointerUp={() => { const d = dx; start.current = null; setZieht(false); if (d > 80) werten(true); else if (d < -80) werten(false); else setDx(0); }}
              onPointerCancel={() => { start.current = null; setZieht(false); setDx(0); }}
            >
              <span className="achse">{k.achse}</span>
              <h3 className="frage" style={{ fontSize: '1.5rem' }}>{k.frage}</h3>
              <span className="kennung">{k.id}</span>
            </div>
          </div>
          <div className="swipe-aktionen">
            <button type="button" className="btn btn-nein" data-testid="swipe-nein" onClick={() => werten(false)}><span aria-hidden="true">✕</span> Nein</button>
            <button type="button" className="btn btn-ja" data-testid="swipe-ja" onClick={() => werten(true)}><span aria-hidden="true">✓</span> Ja</button>
          </div>
          <p className="muted klein" style={{ textAlign: 'center', marginTop: '0.75rem' }}>Pfeiltasten ← → gehen auch.</p>
        </>
      ) : (
        <div className="karte endkarte" data-testid="swipe-endkarte" ref={endRef} tabIndex={-1}>
          <h3>Bei {empf!.n} von 8 Fragen gibt es eine Lücke.</h3>
          <p>{empf!.weil}</p>
          <p className="muted klein" style={{ marginTop: '0.5rem' }}>
            Empfohlen: {empf!.weg === 'schnellcheck' ? 'Website-Schnellcheck' : 'Brand-Test'}
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center', marginTop: '1.25rem' }}>
            <button type="button" className="btn btn-ink" data-testid="cta-swipe-check" onClick={weiter}>Weiter zum Web &amp; Brand Check</button>
            <button type="button" className="btn btn-linie" data-testid="swipe-neu" onClick={neu}>Noch mal</button>
          </div>
        </div>
      )}
    </div>
  );
}
