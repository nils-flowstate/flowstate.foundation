# Archiv – Alt-Code

Dieser Ordner liegt bewusst **außerhalb von `src/`** und wird daher von Vite/TypeScript
nicht mehr mitkompiliert (`tsconfig.app.json` → `"include": ["src"]`). Der Code bleibt
voll lesbar und versioniert, landet aber garantiert nicht im Production-Bundle.

## Inhalt

### `CookieBanner.tsx`
- **Status:** ersetzt durch **Klaro!** als zentrale Consent-Quelle (`src/lib/klaro.ts`).
- **Entfernt aus dem Repo:** Commit `518c863` (Phase 0 – core schema + analytics migration).
- **Hier archiviert am:** 2026-06-18 (aus `518c863~1` wiederhergestellt).
- **Warum aufgehoben:** als Referenz für das frühere, selbstgebaute Banner-Pattern
  (eigenes Markup + `src/lib/consent.ts` / Google Consent Mode). `consent.ts` selbst
  bleibt aktiv im Einsatz – Klaro nutzt dessen `updateConsent`.

> Nicht importieren. Reines Archiv. Bei Bedarf als Vorlage kopieren, nicht reaktivieren.
