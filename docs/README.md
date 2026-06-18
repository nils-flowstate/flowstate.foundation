# 📚 Dokumentation — Flowstate Foundation

Willkommen. Diese `docs/`-Bibliothek ist die **Quelle der Wahrheit** für Brand, Technik und Daten — für Nils, für Claude und für zukünftige Mitarbeitende. Jede Datei deckt **ein** Thema ab und wird bei Änderungen am Code mitgepflegt (siehe Wartungsregeln in [`/CLAUDE.md`](../CLAUDE.md)).

## Was lese ich wofür?

| Datei | Inhalt | Wann lesen |
| --- | --- | --- |
| [brand.md](brand.md) | Mission & Seele, Brand Voice, Farben, Typografie, Design-Prinzipien | Texte schreiben, Sections gestalten, Farben/Fonts wählen |
| [architecture.md](architecture.md) | Tech-Stack, `src/`-Struktur, Routing, Build/Deploy, Env-Vars | Komponenten/Routen bauen, Build & Env verstehen |
| [data-hub.md](data-hub.md) | Supabase-Schema, Migrationen, RLS, DSGVO + Production-Deploy | DB-/Schema-Arbeit, Edge-Function-Deploy |
| [analytics-consent.md](analytics-consent.md) | Klaro, Google Consent Mode, `track()`, Gating, localStorage-Keys | Tracking, Einwilligung, neue Events |
| [integrations.md](integrations.md) | Edge Functions, n8n-Automation, GA4/GTM, Resend/Cal.com | Automationen & externe Dienste |

## Einstieg für neue Mitarbeitende

1. **[brand.md](brand.md)** zuerst — ohne das Gefühl ergibt der Rest keinen Sinn.
2. **[architecture.md](architecture.md)** — wie das Frontend aufgebaut ist.
3. Je nach Aufgabe das passende Spezial-Doc.

## Konventionen

- **Sprache:** Deutsch (Primärsprache des Projekts).
- **Changelog:** Nach jeder Codeänderung wird die `changelog.json` im **selben Ordner** wie die geänderte Datei aktualisiert (neueste Einträge vorne). Details in [`/CLAUDE.md`](../CLAUDE.md).
- **Historisches:** Abgelöster Code & alte Prompt-Backups liegen in [`/archive/old-code/`](../archive/old-code/) — bewusst außerhalb von `src/`.
