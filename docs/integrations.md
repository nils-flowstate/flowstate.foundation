# 🔌 Integrationen — Flowstate Foundation

> **Wann lesen?** Wenn du an Supabase Edge Functions, n8n-Automation oder der GA4/GTM-Verdrahtung arbeitest.
> Schema & Deploy der Datenbank: [data-hub.md](data-hub.md). Client-seitiges Consent/Tracking: [analytics-consent.md](analytics-consent.md).

---

## ⚡ Supabase Edge Functions

Client-Schreibpfad ins Data-Hub. Liegen in [supabase/functions/](../supabase/functions/), laufen auf Deno, nutzen den **Service-Role-Key** (bypassed RLS). CORS ist auf Production-Domains + localhost beschränkt.

| Function       | Pfad                          | Aufruf von                | Zweck                                                   |
| -------------- | ----------------------------- | ------------------------- | ------------------------------------------------------- |
| `track-event`  | `POST /functions/v1/track-event` | `analytics.ts` → `track()` | Upsert `sessions`, Insert `events` (inkl. IP-Hashing)   |
| `log-consent`  | `POST /functions/v1/log-consent` | `consentLog.ts` → `logConsent()` | Einwilligungs-Nachweis in `consent_log` (DSGVO Art. 7) |
| `capture-lead` | `POST /functions/v1/capture-lead` | `PhoneInput.tsx`          | Mehrstufig: `identities` → `identity_traits` → `leads`  |

**Header-Konvention:** `content-type: application/json`, `x-flowstate-app: <source_app>`, `apikey` + `authorization: Bearer <anon>`. Requests laufen mit `keepalive: true` (überleben Seitennavigation).

**IP-Hashing:** `track-event` hasht die IP mit täglich rotierendem Salt (`IP_HASH_SALT` in **Supabase Secrets**, niemals im Frontend). DB-Fallback: `fn_hash_ip()`.

**Deploy:**
```bash
supabase functions deploy track-event capture-lead log-consent --project-ref nlyhexxyophudymgrrrc
```

> Volle CORS-Snippets, Smoke-Tests und Prod-Checkliste: Abschnitt „Deployment (Phase 0.5)" in [data-hub.md](data-hub.md).

---

## 🤖 n8n Automation

> **Status (Stand 2026-05-17):** geplant, noch nicht implementiert. Self-hosted auf VPS. Env: `VITE_N8N_API`, `VITE_N8N_URL`, `VITE_N8N_MCP`. In Claude Code direkt baubar über die `mcp__claude_ai_n8n__*`-Tools.

### Teilprojekt 1 — Event Automation
Google Kalender ist die **einzige Wahrheitsquelle** für Events. n8n liest aus, kategorisiert, schreibt nach Supabase, das Frontend ([EventsList.tsx](../src/components/ui/EventsList.tsx)) zeigt sie.

- **Kalender-ID:** `c_9256cc9d844c64adbac84cc3f48f8516ec10f29aff83afd82350c69eee8eead5@group.calendar.google.com`
- **Beschreibungsformat (Parsing-Standard):** `[Typ] - [Kategorien] - [Ticket-URL] - [Rabattcode] - [Öffentliche Beschreibung]` (Trennzeichen ` - `, Kategorien kommagetrennt). Die Rohbeschreibung wird **nie** angezeigt – n8n parst sie auf.
- **Hauptkategorien (Slugs):** `musik`, `kunst`, `worte`, `fotografie`, `video`, `ernaehrung`, `sport`, `it`, `business`. Unterkategorien z. B. `dj`, `ecstatic-dance`, `yoga`, `konzert` …
- **Event-Typ:** `eigenes-event` (Nils tritt auf) | `fremdes-event` (Teilnahme/Bewerbung).
- **Workflow:** Calendar-Trigger → Parse (Regex auf ` - `) → Slugs normalisieren → Upsert `events` (über Google Event ID) → Fehler ⇒ Telegram (`VITE_TELEGRAM_CHAT_ID`).
- **Noch offen / Migration nötig:** `google_event_id` (unique, Upsert), `description`, `event_type`, `ics_url` an die `events`-Tabelle; `EventsList.tsx` aufs neue Kategorie-System migrieren (Breaking Change).

### Teilprojekt 2 — DJ-Booking Automation
Bei `category` enthält `dj` **und** `event_type = eigenes-event`: automatisch DJ-Unterseite `/YYYY-MM-DD-dj` (Song-Swiper im Tinder-Stil via framer-motion) + Google Sheet für Song-Ratings. Songs werden manuell gepflegt, Bewertungen via n8n-Webhook ins Sheet geloggt.

### Offene Punkte (vor nächster n8n-Session)
- Supabase Service Role Key an n8n übergeben · n8n-Instanz-URL + API-Key dokumentieren · Telegram Bot Token anlegen (Chat-ID `8248691846` bekannt) · DB-Migration (s. o.) · DJ-Template-Route in React Router.

---

## 📊 GA4 & GTM (Consent Mode v2)

Parallel zum eigenen Tracking läuft Google Analytics 4 über GTM – streng consent-gated.

- **GTM-Container-ID:** `GTM-P3MBJ9XQ` (Snippet im `<head>` der `index.html`, gtag-Init **vor** GTM-Script).
- **Consent-Verdrahtung:** [consent.ts](../src/lib/consent.ts) setzt Default `denied` für EU; Klaro pusht bei Zustimmung `dataLayer` `consent_updated`. GA4-Tags feuern nur bei `analytics_storage: granted` (Einwilligungsanforderung „Erforderlich" am GA4-Event-Tag).
- **GTM-Aufbau:** GA4-Konfig-Tag auf Trigger *Consent Initialization*; GA4-`page_view`-Tag auf *All Pages* + Custom-Event-Trigger `consent_updated` (Bedingung: `{{consent}}` enthält `analytics_storage`).
- **Test:** GTM Preview (Consent Initialization feuert zuerst, GA4 erst nach Zustimmung) · DevTools → Network Filter `collect` (vor Zustimmung keine Requests) · GA4 Echtzeit · GA4 → Datenströme → Diagnose → grünes Häkchen „Consent Mode".

| Häufiger Fehler                  | Lösung                                                        |
| -------------------------------- | ------------------------------------------------------------ |
| GA4 sendet ohne Zustimmung       | `wait_for_update` erhöhen / Trigger-Reihenfolge prüfen       |
| Banner erscheint immer wieder    | `localStorage` `ff_klaro` / `ff_consent` prüfen              |
| GA4 feuert nie                   | Measurement-ID + GTM-Container-ID in `index.html` prüfen     |
| `gtag is not defined`            | gtag-Init muss **vor** dem GTM-Script stehen                 |

---

## 🔗 Weitere Dienste

- **Resend** (`VITE_RESEND_API`): transaktionale Mail bei neuem Lead (Edge Function geplant).
- **Cal.com** (`VITE_CAL_URL`): Buchungslink.
- **MCP in Claude Code aktiv:** Google Calendar, Google Drive, Spotify, Gmail, n8n, Notion, Supabase – nutzbar für Automations-Aufbau.
