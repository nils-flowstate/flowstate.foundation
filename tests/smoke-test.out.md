# Smoke-Test — Data Hub Phase 0

**Projekt:** flowstate-data-hub (`nlyhexxyophudymgrrrc`)
**Datum:** 2026-06-12
**Methode:** Direkte POSTs gegen die deployten Edge Functions (verify_jwt=false,
anon apikey), danach Zeilen-Verifikation in der DB. Entspricht dem Browser-Flow
pageview → cta_click → consent → form_submit (lead).

## Ergebnis: ✅ END-TO-END GRÜN

| Schritt | Function | HTTP | Effekt in DB |
|---|---|---|---|
| pageview | `track-event` | 200 `ok` | sessions +1, events +1 |
| cta_click | `track-event` | 200 `ok` | events +1 |
| consent (analytics granted) | `log-consent` | 200 `{ok:true}` | consent_log +1 |
| form_submit / lead | `capture-lead` | 200 `{identity_id}` | identities/traits/leads +1, consent_log +1, events +1 (lead_captured), session gestitcht |

**Verifikation (eine Test-Session):** sessions=1, events=3, consent_log=2,
identities=1, identity_traits=1, leads=1, audit_log=6 (Trigger auf traits/consent/leads).

Nach dem Test wurden alle Tabellen wieder geleert (`truncate ... restart identity cascade`).

## Gefundene & behobene Probleme während des Tests

1. **Fehlende GRANTs:** Über MCP/Management-API angelegte Tabellen erhielten
   nicht die Supabase-Standard-Grants → „permission denied for table". Behoben
   mit Migration `20260523_002_grants.sql`.
2. **track-event Crash ohne IP_HASH_SALT:** leerer HMAC-Key ließ `importKey`
   werfen. Behoben: Salt fällt auf das aktuelle Datum zurück (vgl. `fn_hash_ip`).
3. **consent_log FK:** Einwilligung kann vor dem ersten pageview erfolgen →
   `log-consent` legt die Session jetzt vorab per Upsert an.

## Noch offen (Aktion durch Nils)

- **Browser-Click-Through:** `npm run dev`, Klaro-Banner „Alles annehmen",
  pageview/cta/Telefon-Formular auslösen, in Studio gegenprüfen.
- **`IP_HASH_SALT` als Secret setzen** (sonst Tages-Fallback-Salt):
  `supabase secrets set IP_HASH_SALT=<64-hex>` (Wert liegt in /tmp/ip_hash_salt.txt).
- **`.env.local`** mit `VITE_SUPABASE_FN_URL` + `VITE_SUPABASE_ANON_KEY` füllen.
