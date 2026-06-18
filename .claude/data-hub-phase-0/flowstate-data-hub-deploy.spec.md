# Flowstate Data Hub — Phase 0.5 Production Deploy Specification

> **Adressat:** Claude Code (im Foundation-Repo, auf Branch `feature/data-hub-phase-0`)
> **Voraussetzung:** Phase 0 ist umgesetzt (Commit `518c863`), API-Smoke grün.
> **Ziel:** Foundation-Website mit aktivem Data-Hub auf Production (Hetzner/Coolify).
> **Risikoklasse:** mittel — touched live traffic. Strikt sequentiell ausführen.

---

## 0. Vorbedingungen (vor Start prüfen)

- [ ] `IP_HASH_SALT` ist in **Supabase Secrets** gesetzt (Dashboard → Edge Functions → Secrets) und gespiegelt in **Infisical** als `FLOWSTATE_IP_HASH_SALT`.
- [ ] Supabase-Projekt `flowstate-data-hub` (Ref `nlyhexxyophudymgrrrc`) ist erreichbar.
- [ ] Branch `feature/data-hub-phase-0` ist gepusht.
- [ ] Coolify-Zugang funktioniert; Foundation-App ist dort konfiguriert.
- [ ] DNS für `flowstate.foundation` und `www.flowstate.foundation` zeigt korrekt auf VPS.

---

## 1. Lokaler Smoke-Test (Pflicht, nicht überspringen)

**Ziel:** Mensch klickt durch und sieht Daten in Studio ankommen — letzte Sicherheitsschleife vor Live.

### 1.1 `.env.local` anlegen

Datei `.env.local` im Foundation-Repo-Root (gleiche Ebene wie `package.json`):

```env
VITE_SUPABASE_FN_URL=https://nlyhexxyophudymgrrrc.supabase.co/functions/v1
VITE_SUPABASE_ANON_KEY=<aus Supabase Dashboard → Project Settings → API → anon public>
VITE_FLOWSTATE_APP=foundation
```

`.env.local` ist via `.gitignore` ausgeschlossen (verifizieren).

### 1.2 Dev-Server starten

```bash
npm install   # falls Klaro neu hinzugekommen ist
npm run dev
```

### 1.3 Browser-Check

1. Lokal-URL öffnen (`http://localhost:5173` o.ä.)
2. **Klaro-Banner** muss erscheinen → „Alles annehmen"
3. **Pageview** wird automatisch ausgelöst
4. **CTA klicken** (WhatsApp-Button oder Hero-CTA)
5. **Phone-Form** ausfüllen + absenden

### 1.4 Studio-Gegenprüfung

Im Supabase Studio (Table Editor) verifizieren — pro Tabelle mindestens eine neue Zeile:

| Tabelle           | Erwarteter Inhalt                                                           |
| ----------------- | --------------------------------------------------------------------------- |
| `sessions`        | 1 Zeile, `ip_hash` ist Hex-String (kein Klartext)                           |
| `events`          | mind. 4 Zeilen: `pageview`, `cta_click`, `form_submit`, `lead_captured`     |
| `consent_log`     | `granted`-Einträge für `analytics` + `lead_capture`                         |
| `identities`      | 1 Zeile, `first_seen_app='foundation'`                                      |
| `identity_traits` | 1 Zeile, `phone` gefüllt, `valid_to=NULL`                                   |
| `leads`           | 1 Zeile, `status='new'`, `source_app='foundation'`                          |
| `audit_log`       | Trigger-Einträge für die Inserts in `identity_traits`/`consent_log`/`leads` |

**Bei Fehler:** Stoppen, Logs lesen (`supabase functions logs track-event --project-ref nlyhexxyophudymgrrrc`), an Nils melden.

### 1.5 Aufräumen

Testdaten in Studio löschen (oder via SQL: `truncate sessions, events, consent_log, identities, identity_traits, leads, audit_log restart identity cascade;` — RLS umgehen via Service Role).

---

## 2. CORS in Edge Functions auf Production-Domains einschränken

**Ziel:** Nur erlaubte Origins dürfen die Functions aufrufen. Schließt CSRF/Missbrauch durch andere Domains aus.

### 2.1 Snippet (analog in allen drei Functions)

In `supabase/functions/track-event/index.ts`, `capture-lead/index.ts`, `log-consent/index.ts` — den CORS-Header-Block ersetzen durch:

```ts
const ALLOWED_ORIGINS = [
  "https://flowstate.foundation",
  "https://www.flowstate.foundation",
  "http://localhost:5173",      // lokaler dev, behalten
  "http://localhost:4321",      // Astro-Default, falls verwendet
];

function corsHeaders(origin: string | null) {
  const allow = origin && ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0];
  return {
    "Access-Control-Allow-Origin": allow,
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "content-type, x-flowstate-app",
    "Vary": "Origin",
  };
}
```

Im `serve`-Handler den `origin` aus dem Request lesen und `corsHeaders(origin)` verwenden statt der statischen Konstanten.

### 2.2 Deploy

```bash
supabase functions deploy track-event capture-lead log-consent --project-ref nlyhexxyophudymgrrrc
```

### 2.3 Verifikation

```bash
# Erlaubter Origin → 200
curl -i -X OPTIONS https://nlyhexxyophudymgrrrc.supabase.co/functions/v1/track-event \
  -H "Origin: https://flowstate.foundation"

# Nicht erlaubter Origin → kriegt Header mit erstem ALLOWED zurück, Browser blockt
curl -i -X OPTIONS https://nlyhexxyophudymgrrrc.supabase.co/functions/v1/track-event \
  -H "Origin: https://boese.example.com"
```

---

## 3. Production-Environment-Variablen in Coolify

**Ziel:** Build-Pipeline auf VPS kennt die gleichen Variablen wie lokal — sonst läuft Frontend mit `undefined`.

In **Coolify → Application „Foundation" → Environment Variables** drei Einträge:

| Key                      | Value                                                   | Build-Time? |
| ------------------------ | ------------------------------------------------------- | ----------- |
| `VITE_SUPABASE_FN_URL`   | `https://nlyhexxyophudymgrrrc.supabase.co/functions/v1` | ja          |
| `VITE_SUPABASE_ANON_KEY` | Anon-Key aus Supabase                                   | ja          |
| `VITE_FLOWSTATE_APP`     | `foundation`                                            | ja          |

`VITE_*` werden zur Build-Zeit ins Bundle kompiliert. Falls Coolify zwischen Build-Args und Runtime-Env unterscheidet → Build-Args verwenden.

**Niemals** `IP_HASH_SALT` hier eintragen — das ist server-side in Supabase, hat im Frontend nichts zu suchen.

---

## 4. Pull Request mergen

```bash
git push origin feature/data-hub-phase-0
```

Auf GitHub/GitLab:

1. PR öffnen `feature/data-hub-phase-0 → main`
2. Titel: `feat(data-hub): Phase 0 — core schema + analytics migration`
3. Beschreibung: kurz, mit Verweis auf `docs/data-hub-setup.spec.md` und ADR-004
4. Self-Review der Diff
5. Merge (squash empfohlen, sauberer History)

---

## 5. Server-Deploy via Coolify

### 5.1 Auto- oder Manual-Deploy

Wenn Coolify auf `main` automatisch deployed: Merge triggert Build + Deploy.

Sonst manuell in Coolify: **Foundation-App → Deploy**.

### 5.2 Deploy beobachten

- Build-Logs in Coolify ansehen — `npm run build` darf nicht fehlschlagen
- Nach Container-Swap: Health-Check der App muss grün
- Nginx Proxy Manager: Cert ist gültig, kein 502/504

### 5.3 Im Fehlerfall: Rollback

In Coolify: **vorigen Deploy** auswählen → Redeploy. Frontend wird auf alten Stand zurückgezogen. Supabase-Schema bleibt — das ist additive (neue Tabellen, alte unberührt), also kein DB-Rollback nötig.

---

## 6. Live-Smoke-Test

Auf `https://flowstate.foundation`:

1. **Klaro-Banner** erscheint → „Alles annehmen"
2. Pageview, CTA, Phone-Form auslösen (wie 1.3)
3. **Supabase Studio gegenprüfen** (wie 1.4) — Zeilen mit `source_app='foundation'` und Production-Origin (kein localhost)
4. **Browser-Devtools → Network:** Edge-Function-Calls antworten 200, `Access-Control-Allow-Origin` matched die echte Domain
5. **Klaro-Banner zurücksetzen** (Cookie löschen) → erneut, diesmal „Ablehnen" → es darf **kein** Event in `events` landen, aber ein `consent_log`-Eintrag mit `state='denied'`

Wenn alle 5 Punkte grün: **Phase 0 ist live**.

---

## 7. Aufräumen

- [ ] Testdaten aus Production-DB entfernen (gleich wie 1.5, aber selektiv per `where source='smoke_test'` falls markiert)
- [ ] Branch `feature/data-hub-phase-0` lokal und remote löschen
- [ ] Im Vault: `30-wissen/entscheidungen/data-hub/adr-004-data-hub-phase-0.md` Status auf `aktiv` ändern (war `in-implementierung`)
- [ ] Nils kurz informieren: „Phase 0 live, hier sind die ersten echten Zeilen"

---

## 8. Acceptance Criteria (Phase 0.5 abgeschlossen)

- [ ] Foundation-Website unter `https://flowstate.foundation` läuft mit aktivem Klaro-Banner
- [ ] Behavior-Events landen in Supabase mit korrekter `source_app`
- [ ] Lead-Capture funktioniert end-to-end inkl. `consent_log`-Eintrag
- [ ] CORS blockiert fremde Origins (kein `*` mehr)
- [ ] Keine Secrets im Frontend-Bundle (`grep -i salt dist/` muss leer sein)
- [ ] AVV-Status Supabase + Resend dokumentiert (Häkchen im Account)
- [ ] DSGVO-Erklärung als HTML auf der Live-Seite verlinkt (Footer + Klaro-Banner-Link)

**Letzter Punkt ist nicht-blockierend für Deploy, aber rechtlich vor Tracking-Aktivierung in Produktion erforderlich. Wenn DS-Erklärung noch nicht live ist: Klaro-Banner deaktiviert lassen oder auf „nur essentielle" voreingestellt, bis verlinkt.**

---

## 9. Was bewusst NICHT in Phase 0.5 enthalten ist

- Sentry / Logflare als externes Monitoring (Phase 1)
- Nächtlicher `pg_dump` auf NAS (Phase 1)
- Performance-Optimierung der Edge Functions
- Multi-Property-Rollout (Express/How/Stoic) — kommt mit eigener Spec
- Rate-Limiting auf Edge Functions

---

**Ende der Spezifikation.** Bei Rückfragen oder Abweichungen: an Nils melden, nicht eigenmächtig korrigieren.