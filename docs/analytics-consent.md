# 🔐 Analytics & Consent — Flowstate Foundation

> **Wann lesen?** Wenn du am Tracking, an der Einwilligung (Klaro/Consent Mode) oder am DSGVO-Gating arbeitest, oder ein neues Event/eine neue Daten-erfassende Funktion einbaust.
> Datenbank-Seite (Schema, Edge Functions): [data-hub.md](data-hub.md). GTM/GA4-Verdrahtung: [integrations.md](integrations.md).

---

## Grundregel (TTDSG §25 / DSGVO)

**Ohne Einwilligung kein Tracking** – weder Netz noch Speicher. Klaro ist die **einzige** Einwilligungsquelle; sie steuert sowohl Google Consent Mode (`gtag`) als auch unser eigenes Tracking und das `consent_log`. Tracking-Code darf die UX nie blockieren – alle Pfade scheitern still.

---

## Die vier Schichten

```
Klaro (Cookie-Banner)
   │  saveConsents
   ├─► consent.ts        →  gtag('consent','update', …)   + dataLayer push   (Google Consent Mode)
   ├─► consentLog.ts     →  setLocalConsent()  (lokale Flags fürs Gating)
   │                     →  logConsent()       →  Edge Function /log-consent  →  consent_log (DSGVO Art. 7)
   └─► analytics.ts      liest isGranted('analytics')  →  track()  →  Edge Function /track-event  →  events
```

### 1. Google Consent Mode — [src/lib/consent.ts](../src/lib/consent.ts)
- `initConsent()` läuft als Allererstes in [main.tsx](../src/main.tsx): setzt `gtag('consent','default', …)` auf **alles `denied`** für EU-Regionen (`DE, AT, CH, BE, FR, IT, ES, NL, PL, SE, DK, FI, NO`), `wait_for_update: 500`.
- `updateConsent(state)` schreibt `localStorage: ff_consent` und pusht `dataLayer` `consent_updated`.
- Consent-Keys: `analytics_storage`, `ad_storage`, `ad_user_data`, `ad_personalization`, `functionality_cookies`.

### 2. Klaro Consent-Manager — [src/lib/klaro.ts](../src/lib/klaro.ts)
- **Drei Purposes:** `analytics` (Verstehen & Verbessern), `lead_capture` (Kontaktaufnahme), `marketing` (Reichweite).
- Storage `localStorage: ff_klaro`, 180 Tage, `lang: de`, Theme `light/bottom/wide`, PrivacyPolicy `/datenschutz`. Texte sind brand-konform getextet („Deine Wahl – dein Flow").
- `initKlaro()` registriert einen `watch`: bei `saveConsents` → ① lokale Flags pro Purpose, ② `updateConsent` (gtag), ③ `logConsent` pro **geänderten** Purpose. `marketing` → `ad_*`-Consent; `analytics` → `analytics_storage`.
- `openConsentManager()` öffnet das Modal erneut (z. B. „Cookie-Einstellungen"-Link im Footer).

### 3. Consent-Logging & Gating — [src/lib/consentLog.ts](../src/lib/consentLog.ts)
- `isGranted(purpose)` liest das lokale Flag `ff_consent_<purpose>` – **das** ist der Gate-Check in `analytics.ts` und `PhoneInput.tsx`.
- `logConsent(purpose, state, evidence)` POSTet an `/log-consent`. `state` ∈ `granted | denied | withdrawn`. `consent_text_id = 'privacy-policy-v2026-05'` (versionierte DS-Erklärung).

### 4. Analytics-Tracking — [src/lib/analytics.ts](../src/lib/analytics.ts)
- `track(event_type, data)`: bricht bei `!isGranted('analytics')` sofort ab. Sonst Payload (session_id, device_type, referrer, language, UTM) → POST `/track-event` mit Header `x-flowstate-app` + Anon-Key, `keepalive: true`.
- **Offline-Queue:** Bei Netzfehler landet das Event in `localStorage: ff_analytics_queue` (max. 500). `flushOfflineQueue()` sendet bei nächstem `track()` nach.
- **Event-Typ-Normalisierung:** Nur die erlaubten Typen (s. u.) gehen durch; Unbekanntes → `custom` mit `properties.subtype`. Alias: `'404' → 'error_404'`.
- `initScrollTracking()` / [useScrollDepth.ts](../src/hooks/useScrollDepth.ts) feuern `scroll_depth` bei 25/50/75/100 %.
- Session-ID & Device kommen aus [src/lib/session.ts](../src/lib/session.ts) (`ff_session_id` in sessionStorage; `<768` mobile, `<1024` tablet, sonst desktop).

**Erlaubte `event_type`-Werte** (müssen mit der `events`-CHECK-Constraint übereinstimmen):
`pageview`, `scroll_depth`, `cta_click`, `form_submit`, `form_abandon`, `error_404`, `lead_captured`, `opt_in`, `sequence_advance`, `conversion`, `churn_trigger`, `custom`.

> ⚠️ **Neuer Event-Typ?** Immer an **zwei** Stellen ergänzen: `ALLOWED_EVENT_TYPES` in [analytics.ts](../src/lib/analytics.ts) **und** die CHECK-Constraint in der Migration ([data-hub.md](data-hub.md)). Sonst lehnt die DB das Event ab.

---

## localStorage- / sessionStorage-Keys (Überblick)

| Key                    | Speicher        | Inhalt                                  |
| ---------------------- | --------------- | --------------------------------------- |
| `ff_consent`           | localStorage    | Google-Consent-Mode-State (gtag)        |
| `ff_klaro`             | localStorage    | Klaro-Einwilligungsstatus               |
| `ff_consent_<purpose>` | localStorage    | Gate-Flag je Purpose (`granted`/`denied`) |
| `ff_analytics_queue`   | localStorage    | Offline-Event-Queue (max. 500)          |
| `ff_lang`              | localStorage    | Aktive Sprache                          |
| `ff_session_id`        | sessionStorage  | Session-UUID (= `sessions.id`)          |

---

## Hinweis: alte Implementierung

Der ursprüngliche **eigene `CookieBanner.tsx`** wurde durch **Klaro** ersetzt (Commit `518c863`); die alte Komponente liegt in [archive/old-code/](../archive/old-code/). Frühere Tracking-Drafts schrieben nur in `localStorage` ohne Backend – das ist überholt, der primäre Schreibpfad ist heute die Edge Function `/track-event`.
