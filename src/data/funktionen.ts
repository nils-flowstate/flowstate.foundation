// Kacheln der Funktionsschau (Seitendatei 01-start.md). Zuordnung zu Paketen: UNGEKLAERT (P1, P2).
export type Kachel = { id: string; name: string; zweck: 'Vertrauen' | 'Kontakt' | 'Verkauf' | 'Bewegung' | 'Sichtbarkeit'; baustein: string; ab: string };
export const kacheln: Kachel[] = [
  { id: 'f-a14', name: 'Google-Rezensionen', zweck: 'Vertrauen', baustein: 'F-A14', ab: 'in jedem Paket frei' },
  { id: 'f-a16', name: 'Nachweise, Zertifikate', zweck: 'Vertrauen', baustein: 'F-A16', ab: 'in jedem Paket frei' },
  { id: 'f-a15', name: 'Hero-Video oder -Bild', zweck: 'Bewegung', baustein: 'F-A15', ab: 'in jedem Paket frei' },
  { id: 'f-d01', name: 'WhatsApp-Button', zweck: 'Kontakt', baustein: 'F-D01', ab: 'in jedem Paket frei' },
  { id: 'e-form', name: 'Mail-Formular', zweck: 'Kontakt', baustein: 'eigen', ab: 'ab Stufe 1' },
  { id: 'e-llm', name: 'llms.txt für KI-Suche', zweck: 'Sichtbarkeit', baustein: 'eigen', ab: 'ab Stufe 2' },
  { id: 'f-a02', name: 'Swipe Card für deine Kunden', zweck: 'Kontakt', baustein: 'F-A02', ab: 'Funktion aus Stufe 2/3' },
  { id: 'f-a12', name: 'Fortschritt in mehrstufigen Formularen', zweck: 'Kontakt', baustein: 'F-A12', ab: 'Funktion aus Stufe 2/3' },
  { id: 'f-b03', name: 'Online-Zahlung', zweck: 'Verkauf', baustein: 'F-B03', ab: 'Funktion aus Stufe 2/3' },
  { id: 'f-a09', name: 'Bewegung beim Scrollen', zweck: 'Bewegung', baustein: 'F-A09', ab: 'Funktion aus Stufe 2/3' },
  { id: 'f-a13', name: 'Ereignis-Zeitstrahl', zweck: 'Vertrauen', baustein: 'F-A13', ab: 'Funktion aus Stufe 2/3' },
  { id: 'f-d04', name: 'Karte mit Standort', zweck: 'Kontakt', baustein: 'F-D04', ab: 'Funktion aus Stufe 2/3' },
];
export const zwecke = ['Alle', 'Vertrauen', 'Kontakt', 'Verkauf', 'Bewegung', 'Sichtbarkeit'] as const;
