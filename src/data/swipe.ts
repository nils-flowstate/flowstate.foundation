// Fragen K1 bis K8: Entwurf aus den Achsen (Seitendatei 01-start.md), Stand vorschlag, Katalog von Nils UNGEKLAERT (S2).
export type Karte = { id: string; achse: string; check: 'schnellcheck' | 'brandtest'; frage: string };
export const karten: Karte[] = [
  { id: 'K1', achse: 'SEO', check: 'schnellcheck', frage: 'Findet man dich bei Google, wenn jemand nach deiner Leistung in deiner Stadt sucht?' },
  { id: 'K2', achse: 'GEO', check: 'schnellcheck', frage: 'Findet man dich in der Antwort von ChatGPT?' },
  { id: 'K3', achse: 'Ladezeit', check: 'schnellcheck', frage: 'Lädt deine Website am Handy, ohne dass du wartest?' },
  { id: 'K4', achse: 'Datenschutz', check: 'schnellcheck', frage: 'Fragt deine Website nach Einwilligung, bevor fremde Dienste laden?' },
  { id: 'K5', achse: 'Brand', check: 'brandtest', frage: 'Sind Farben, Schrift und Logo deiner Marke schriftlich festgelegt?' },
  { id: 'K6', achse: 'Positionierung', check: 'brandtest', frage: 'Kannst du in einem Satz sagen, für wen du arbeitest und was danach anders ist?' },
  { id: 'K7', achse: 'Leitsätze', check: 'brandtest', frage: 'Gibt es Sätze, die du überall gleich sagst – Website, LinkedIn, Gespräch?' },
  { id: 'K8', achse: 'Touchpoints', check: 'brandtest', frage: 'Sehen Website, Visitenkarte und Profile aus wie von einem Absender?' },
];

export function empfehlung(antworten: boolean[]) {
  const luecken = antworten.map((a) => !a);
  const a = luecken.slice(0, 4).filter(Boolean).length;
  const b = luecken.slice(4, 8).filter(Boolean).length;
  const n = a + b;
  if (n === 0) return { weg: 'schnellcheck' as const, n, weil: 'Stark. Der Schnellcheck zeigt, ob deine Konkurrenz trotzdem etwas besser macht.' };
  if (b > a) return { weg: 'brandtest' as const, n, weil: 'Die meisten Lücken liegen bei deiner Marke. Der Brand-Test zeigt dir, wo sie unscharf ist.' };
  return { weg: 'schnellcheck' as const, n, weil: 'Die meisten Lücken liegen bei deiner Website. Der Schnellcheck zeigt dir, was die Konkurrenz schon hat.' };
}
