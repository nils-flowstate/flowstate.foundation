# Flowstate Data Hub — Initial Setup Specification

> **Adressat:** Claude Code (Implementierung im Repo)
> **Autor:** Schema-Entwurf abgestimmt mit Nils (Founder)
> **Stand:** Mai 2026, Phase 0 (Fundament)
> **Reichweite:** Multi-Property (`foundation`, `express`, `how`, `stoic`) auf einer Supabase-Instanz
> **Compliance-Ziel:** DSGVO Art. 5/7/17/30, TTDSG, GoBD-Nachweispflicht

---

## 0. Lesehinweis für Claude Code

Diese Datei ist **deklarativ und didaktisch zugleich**. Nils möchte jeden Schritt nachvollziehen können — entsprechend gibt es zu jeder Entscheidung ein **„Warum"**. Bitte:

1. Lies das ganze Dokument vor der ersten Code-Änderung.
2. Arbeite die Phasen **strikt in Reihenfolge** ab (0 → 1 → 2). Phase 2 ist optional/später.
3. Bei Mehrdeutigkeit: frage zurück, statt zu raten. Das Schema ist die einzige Stelle, an der „später migrieren" teuer wird.
4. Schreibe **keine** Tabellenstruktur außerhalb dieser Spec, ohne dass sie hier dokumentiert ist. Erweiterungen werden in `supabase/migrations/*` versioniert.

---

## 1. Vision & Scope

### 1.1 Properties (Multi-Property von Tag 1)

| `source_app` | Domain | Rolle |
|---|---|---|
| `foundation` | flowstate.foundation | Schnittstelle, Menschen zusammenbringen |
| `express` | flowstate.express | Community-Künstlerplattform |
| `how` | flowstate.how | Funnel für breiteres Publikum |
| `stoic` | stoic-flowstate-athlete | Podcast |
| `systeme_io` | (extern) | Lead-/Sequence-Quelle, kein eigenes Frontend |

Alle Daten landen in **einer** Supabase-Instanz. Trennung erfolgt über die `source_app`-Spalte, nicht über getrennte DBs.

> **Warum eine DB statt vier?** Cross-Property-Identität ist Kerngeschäft: Wer vom Podcast (`stoic`) zum Funnel (`how`) und dann zur Foundation kam, soll als **eine Person** auswertbar sein. Vier DBs hätten Identity-Stitching unbezahlbar gemacht.

### 1.2 Architektur-Niveau

**Hybrid mit Vault-DNA:** Ein Schema `core` mit Hub-/Satellite-/Event-Konvention. Physisch flach (kein separates `raw`/`public`-Schema). Spätere Aufteilung ist via `ALTER SCHEMA RENAME` ohne Datenmigration möglich, weil die Business Keys (UUIDs) stabil sind.

> **Warum nicht voll Data Vault sofort?** Drei separate Schemas + Hub/Link/Satellite-Strenge wären Lehrbuch-sauber, aber initial 3–5× Aufwand. Wir tragen die Konzepte (stabile UUIDs, append-only Events, Trennung PII/Business-Key), ohne die Schwere.

> **Warum nicht flach wie im alten Markdown-Plan?** Der Plan hatte keine Identity-Resolution, kein Consent-Log, keine Multi-Property-Felder. Bei der ersten Cross-Property-Auswertung wäre eine Datenmigration nötig gewesen.

---

## 2. Erfolgskriterien (Acceptance Criteria)

Phase 0 ist erfolgreich abgeschlossen, wenn:

- [ ] Migration `001_init_core.sql` läuft fehlerfrei in einer leeren Supabase-Instanz (`supabase db reset && supabase db push`).
- [ ] Alle in §4 aufgeführten Tabellen, Constraints, Indizes, RLS-Policies existieren.
- [ ] `tests/schema.spec.sql` (siehe §9) läuft grün — alle Pflicht-Asserts erfüllt.
- [ ] `analytics.ts` ist refaktoriert (siehe §6): localStorage bleibt als Fallback, primärer Schreibpfad ist Edge Function `/track-event`.
- [ ] DSGVO-Pflichten aus §8 sind als SQL-Kommentare an den jeweiligen Tabellen dokumentiert (`COMMENT ON TABLE ... IS '...'`).
- [ ] `.env`-Template aktualisiert (`SUPABASE_URL`, `SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`, `IP_HASH_SALT`).

Phase 1 (n8n + systeme.io) ist explizit **nicht Teil von Phase 0**. Schema enthält die Aufnahmefähigkeit, aber kein n8n-Workflow wird hier gebaut.

---

## 3. Naming Conventions

| Regel | Beispiel |
|---|---|
| Tabellennamen `snake_case`, Singular für Hubs, Plural für Mengen | `identity` ❌ → `identities` ✅ |
| Primärschlüssel immer `id uuid` (außer Audit-Log mit `bigserial`) | — |
| Zeitstempel: `created_at`, `updated_at`, `occurred_at`, `valid_from`, `valid_to` (alle `timestamptz`) | — |
| Soft-Delete via `deleted_at timestamptz`, nicht via `is_deleted` | — |
| ENUM-Werte: lowercase, snake_case (`pageview`, `cta_click`) | — |
| FK-Spalten: `<table_singular>_id` | `identity_id`, `session_id` |
| Index-Namen: `idx_<table>_<spalten>` | `idx_events_identity_id_occurred_at` |
| Policies: `<role>_<verb>_<table>` | `anon_insert_events` |

---

## 4. Schema (`core`) — Tabellenkatalog

> **Hinweis:** Wir nutzen weiterhin das `public`-Schema, weil Supabase-CLI/PostgREST darauf defaultet. Logisch denken wir aber in „core"-Konvention. Wenn später Trennung gewünscht ist, wird `public.*` zu `core.*` umbenannt.

### 4.1 `identities` — der Identity-Hub (Business Key)

Eine Zeile = eine eindeutige Person über alle Properties hinweg. **Niemals PII in dieser Tabelle.**

```
id              uuid PK
created_at      timestamptz default now()
first_seen_app  text (one of: foundation|express|how|stoic|systeme_io)
external_ids    jsonb default '{}'   -- {"systeme_io_contact":"abc","meta_user":"xyz"}
status          text default 'active'  -- active|merged|erased
merged_into     uuid NULL references identities(id)  -- für Identity-Merges
```

**Warum so:** Das ist der Anker. Bei DSGVO-Löschung (Art. 17) wird der Hub *nicht* gelöscht — wir setzen `status='erased'` und nullen alle Satellites. So bleibt die historische Event-Aggregation („wie viele Conversions kamen aus Funnel X?") erhalten, ohne dass die Person re-identifizierbar ist.

### 4.2 `identity_traits` — PII-Satellite (append-only, versioniert)

Hier liegt alles Personenbezogene. Versioniert mit `valid_from`/`valid_to` (Slowly Changing Dimension Type 2).

```
id            uuid PK
identity_id   uuid FK → identities(id)
phone         text NULL
email         text NULL
language      text NULL  -- 'de'|'en'|...
country       text NULL  -- ISO 3166-1 alpha-2
valid_from    timestamptz default now()
valid_to      timestamptz NULL   -- NULL = aktueller Wert
source        text       -- 'lead_form'|'systeme_io_webhook'|'manual'|...
```

**Warum SCD2 statt In-Place-Update?** Nachweispflicht: bei jeder Wertänderung musst du belegen können, was wann galt. Update überschreibt die Historie — das ist GoBD-feindlich.

**View für aktuellen Stand:** `v_identity_current` (siehe SQL unten).

### 4.3 `sessions` — Session-Hub (anonym oder identifiziert)

```
id              uuid PK   -- entspricht clientseitiger session_id
identity_id     uuid NULL FK → identities(id)   -- NULL bis identifiziert
source_app      text not null
started_at      timestamptz default now()
last_seen_at    timestamptz default now()
user_agent_hash text   -- SHA256(user_agent), kein Klartext
ip_hash         text   -- HMAC mit täglich rotierendem Salt
referrer        text
utm_source      text
utm_medium      text
utm_campaign    text
language        text
device_type     text   -- 'mobile'|'tablet'|'desktop'
```

**Warum `identity_id NULL`?** Die meisten Sessions sind anonym. Wenn der gleiche Browser später ein Lead-Formular absendet, schreiben wir die `identity_id` per Stitching-Job nach (Phase 1).

**Warum kein IP im Klartext?** TTDSG/DSGVO — IP ist personenbezogen. HMAC mit rotierendem Salt (`IP_HASH_SALT`, täglich getauscht) erlaubt Same-Day-Deduplizierung, verhindert aber langfristige Re-Identifizierung.

### 4.4 `events` — Behavioral-Event-Fabrik (append-only, partitioniert)

Das ist das Arbeitspferd. Hier landen pageview, cta_click, scroll_depth, form_submit — und später systeme.io-Funnel-Events.

```
id            uuid PK
occurred_at   timestamptz default now() NOT NULL
identity_id   uuid NULL FK → identities(id)
session_id    uuid FK → sessions(id)
source_app    text not null
event_type    text not null
                -- erlaubt (CHECK constraint):
                -- pageview, scroll_depth, cta_click, form_submit, form_abandon, error_404,
                -- lead_captured, opt_in, sequence_advance, conversion, churn_trigger,
                -- custom (für Edge-Cases mit properties.subtype)
properties    jsonb default '{}'    -- alles Variable: page, element, scroll_percent, ...
ingested_at   timestamptz default now()  -- für Replay-Auswertung
```

**Partitionierung:** `PARTITION BY RANGE (occurred_at)`, monatlich. Für die ersten 12 Monate werden Partitionen vorab erzeugt; danach übernimmt `pg_partman` (Phase 2).

**Warum Partitionierung sofort?** Sobald du 1M+ Events/Monat erreichst, wird ein nicht-partitioniertes Table mühsam. Nachträgliches Partitionieren in Postgres ist möglich, aber teuer. Jetzt einmal richtig.

**Warum CHECK statt ENUM?** ENUM-Werte hinzufügen geht in Postgres, ist aber nicht transactional safe und Sprach-bindings hassen es. CHECK + text ist flexibler.

### 4.5 `consent_log` — Einwilligungs-Nachweis (DSGVO Art. 7)

```
id                uuid PK
identity_id       uuid NULL FK → identities(id)
session_id        uuid NULL FK → sessions(id)
consent_purpose   text not null   -- 'analytics'|'marketing'|'lead_capture'|'newsletter'
consent_state     text not null   -- 'granted'|'denied'|'withdrawn'
consent_text_id   text not null   -- Verweis auf Versionierung der Datenschutzerklärung
recorded_at       timestamptz default now()
source            text            -- 'cookie_banner'|'lead_form'|'systeme_io'|...
evidence          jsonb           -- Hash der Banner-Konfiguration, UI-Version, etc.
```

**Warum eigene Tabelle, nicht Spalte in `leads`?** Consent muss versioniert sein (welche Datenschutzerklärung war aktiv?). Bei Behördenanfrage musst du *die exakte Erklärung* vorzeigen können, die der User gesehen hat. Eine boolean-Spalte „consent: true" hat 0% Beweiskraft.

### 4.6 `leads` — Geschäftsobjekt (View + ergänzende Spalten)

Leads sind kein Hub, sondern eine **Sicht** auf identifizierte Identities mit ergänzendem Workflow-State.

```
identity_id   uuid PK FK → identities(id)   -- 1:1 mit Identity
captured_at   timestamptz default now()
source_app    text not null
source_detail text                          -- 'hero_form'|'about_form'|'systeme_io_funnel_X'
owner         text NULL                     -- Vertrieb-Owner
status        text default 'new'            -- new|contacted|qualified|converted|lost
last_touch_at timestamptz
notes         text
```

Das ist die einzige Tabelle, in die das Sales-Team via Supabase-Studio direkt schreibt.

### 4.7 `audit_log` — Änderungs-Audit (DSGVO Art. 5 Abs. 2)

```
id            bigserial PK
occurred_at   timestamptz default now()
actor         text          -- 'anon'|'service_role'|'<user_id>'|'system'
table_name    text not null
operation     text not null -- 'insert'|'update'|'delete'
record_id     uuid
diff          jsonb         -- alte vs. neue Werte
```

Befüllt via Trigger auf PII-tragenden Tabellen (`identity_traits`, `consent_log`, `leads`).

### 4.8 Übersichts-Views (lese-optimiert)

- `v_identity_current` — aktueller Trait-Stand pro Identity
- `v_session_with_identity` — Session + (falls vorhanden) Identity-Stamm
- `v_lead_funnel` — Lead-Trichter über `source_app` × `status`

---

## 5. SQL-Migration (`supabase/migrations/20260523_001_init_core.sql`)

> Bitte **exakt** so übernehmen. Bei manuellen Anpassungen wird die Spec aktualisiert, nicht das SQL einzeln. Reihenfolge bleibt: Extensions → Tabellen → Indizes → Constraints → Trigger → Views → Policies.

```sql
-- =========================================================================
-- Flowstate Data Hub — Initial Schema (Hybrid Vault, Phase 0)
-- Versioning: 20260523_001
-- =========================================================================

-- 0. Extensions ----------------------------------------------------------
create extension if not exists "pgcrypto";   -- gen_random_uuid()
create extension if not exists "pg_trgm";    -- für Text-Index-Performance

-- 1. Identities Hub -------------------------------------------------------
create table identities (
  id              uuid primary key default gen_random_uuid(),
  created_at      timestamptz not null default now(),
  first_seen_app  text not null
                  check (first_seen_app in
                    ('foundation','express','how','stoic','systeme_io')),
  external_ids    jsonb not null default '{}'::jsonb,
  status          text not null default 'active'
                  check (status in ('active','merged','erased')),
  merged_into     uuid references identities(id)
);
comment on table identities is
  'Identity-Hub (Business Key). Keine PII hier. Bei DSGVO-Löschung: status=erased, Satellites nullen.';
create index idx_identities_external_ids on identities using gin (external_ids);

-- 2. Identity Traits (PII Satellite, SCD2) -------------------------------
create table identity_traits (
  id           uuid primary key default gen_random_uuid(),
  identity_id  uuid not null references identities(id) on delete cascade,
  phone        text,
  email        text,
  language     text,
  country      text,
  valid_from   timestamptz not null default now(),
  valid_to     timestamptz,
  source       text
);
comment on table identity_traits is
  'PII-Satellite, append-only versioniert. Bei Art-17-Löschung: alle Spalten nullen, Audit-Log behalten.';
create index idx_identity_traits_identity_current
  on identity_traits (identity_id) where valid_to is null;
create index idx_identity_traits_email_lower
  on identity_traits (lower(email)) where email is not null and valid_to is null;
create index idx_identity_traits_phone
  on identity_traits (phone) where phone is not null and valid_to is null;

-- 3. Sessions -------------------------------------------------------------
create table sessions (
  id              uuid primary key default gen_random_uuid(),
  identity_id     uuid references identities(id),
  source_app      text not null
                  check (source_app in
                    ('foundation','express','how','stoic','systeme_io')),
  started_at      timestamptz not null default now(),
  last_seen_at    timestamptz not null default now(),
  user_agent_hash text,
  ip_hash         text,
  referrer        text,
  utm_source      text,
  utm_medium      text,
  utm_campaign    text,
  language        text,
  device_type     text check (device_type in ('mobile','tablet','desktop'))
);
create index idx_sessions_identity on sessions(identity_id);
create index idx_sessions_started_at on sessions(started_at desc);

-- 4. Events (partitioniert nach Monat) -----------------------------------
create table events (
  id            uuid not null default gen_random_uuid(),
  occurred_at   timestamptz not null default now(),
  identity_id   uuid references identities(id),
  session_id    uuid references sessions(id),
  source_app    text not null
                check (source_app in
                  ('foundation','express','how','stoic','systeme_io')),
  event_type    text not null
                check (event_type in (
                  'pageview','scroll_depth','cta_click','form_submit',
                  'form_abandon','error_404','lead_captured','opt_in',
                  'sequence_advance','conversion','churn_trigger','custom'
                )),
  properties    jsonb not null default '{}'::jsonb,
  ingested_at   timestamptz not null default now(),
  primary key (id, occurred_at)
) partition by range (occurred_at);
comment on table events is
  'Append-only Event-Store. Keine UPDATE/DELETE durch Apps; nur Retention-Job räumt nach.';

-- Default-Partition (Auffangbecken) + erste 13 monatliche Partitionen
create table events_default partition of events default;
do $$
declare
  m date := date_trunc('month', now())::date;
  i int;
begin
  for i in 0..12 loop
    execute format(
      'create table if not exists events_%s partition of events
       for values from (%L) to (%L)',
       to_char(m + (i || ' month')::interval, 'YYYY_MM'),
       (m + (i || ' month')::interval)::date,
       (m + ((i+1) || ' month')::interval)::date
    );
  end loop;
end$$;

create index idx_events_identity_occurred on events (identity_id, occurred_at desc);
create index idx_events_session_occurred  on events (session_id, occurred_at desc);
create index idx_events_type_occurred     on events (event_type, occurred_at desc);
create index idx_events_app_occurred      on events (source_app, occurred_at desc);
create index idx_events_properties        on events using gin (properties);

-- 5. Consent Log ----------------------------------------------------------
create table consent_log (
  id              uuid primary key default gen_random_uuid(),
  identity_id     uuid references identities(id),
  session_id      uuid references sessions(id),
  consent_purpose text not null
                  check (consent_purpose in
                    ('analytics','marketing','lead_capture','newsletter')),
  consent_state   text not null
                  check (consent_state in ('granted','denied','withdrawn')),
  consent_text_id text not null,
  recorded_at     timestamptz not null default now(),
  source          text,
  evidence        jsonb not null default '{}'::jsonb
);
comment on table consent_log is
  'DSGVO Art. 7 Einwilligungsnachweis. consent_text_id muss auf versionierte DS-Erklärung verweisen.';
create index idx_consent_identity on consent_log(identity_id, recorded_at desc);
create index idx_consent_session  on consent_log(session_id, recorded_at desc);

-- 6. Leads (Geschäftsobjekt) ---------------------------------------------
create table leads (
  identity_id   uuid primary key references identities(id) on delete cascade,
  captured_at   timestamptz not null default now(),
  source_app    text not null
                check (source_app in
                  ('foundation','express','how','stoic','systeme_io')),
  source_detail text,
  owner         text,
  status        text not null default 'new'
                check (status in ('new','contacted','qualified','converted','lost')),
  last_touch_at timestamptz,
  notes         text
);
create index idx_leads_status on leads(status);
create index idx_leads_source on leads(source_app, source_detail);

-- 7. Audit Log (für PII-Tabellen) ----------------------------------------
create table audit_log (
  id          bigserial primary key,
  occurred_at timestamptz not null default now(),
  actor       text,
  table_name  text not null,
  operation   text not null check (operation in ('insert','update','delete')),
  record_id   uuid,
  diff        jsonb
);
create index idx_audit_table_record on audit_log(table_name, record_id);

create or replace function fn_audit_trigger()
returns trigger language plpgsql as $$
declare
  v_actor text := coalesce(
    current_setting('request.jwt.claims', true)::jsonb->>'sub',
    current_user
  );
  v_record_id uuid := coalesce(
    (case when tg_op = 'DELETE' then (to_jsonb(old)->>'id')
          else (to_jsonb(new)->>'id') end)::uuid,
    null
  );
begin
  insert into audit_log (actor, table_name, operation, record_id, diff)
  values (
    v_actor,
    tg_table_name,
    lower(tg_op),
    v_record_id,
    case
      when tg_op = 'INSERT' then jsonb_build_object('new', to_jsonb(new))
      when tg_op = 'UPDATE' then jsonb_build_object('old', to_jsonb(old), 'new', to_jsonb(new))
      when tg_op = 'DELETE' then jsonb_build_object('old', to_jsonb(old))
    end
  );
  return coalesce(new, old);
end$$;

create trigger trg_audit_identity_traits
  after insert or update or delete on identity_traits
  for each row execute function fn_audit_trigger();
create trigger trg_audit_consent_log
  after insert or update or delete on consent_log
  for each row execute function fn_audit_trigger();
create trigger trg_audit_leads
  after insert or update or delete on leads
  for each row execute function fn_audit_trigger();

-- 8. Views ---------------------------------------------------------------
create or replace view v_identity_current as
select
  i.id as identity_id,
  i.first_seen_app,
  i.external_ids,
  i.status,
  t.phone, t.email, t.language, t.country,
  t.source as last_trait_source,
  t.valid_from as traits_since
from identities i
left join identity_traits t
  on t.identity_id = i.id and t.valid_to is null
where i.status <> 'erased';

create or replace view v_session_with_identity as
select s.*,
       case when s.identity_id is null then 'anonymous'
            else 'identified' end as identity_state,
       c.phone, c.email
from sessions s
left join v_identity_current c on c.identity_id = s.identity_id;

create or replace view v_lead_funnel as
select source_app,
       source_detail,
       status,
       count(*) as lead_count,
       min(captured_at) as first_captured,
       max(captured_at) as last_captured
from leads
group by source_app, source_detail, status;

-- 9. Row Level Security --------------------------------------------------
alter table identities       enable row level security;
alter table identity_traits  enable row level security;
alter table sessions         enable row level security;
alter table events           enable row level security;
alter table consent_log      enable row level security;
alter table leads            enable row level security;
alter table audit_log        enable row level security;

-- Service-Role-Default: nichts erlaubt (außer für service_role)
-- service_role bypasst RLS automatisch in Supabase.

-- anon (Browser) darf:
--   * events einfügen (Tracking)
--   * sessions einfügen / sich selbst UPDATE auf last_seen_at
--   * consent_log einfügen
-- Browser darf NICHTS lesen aus diesen Tabellen.

create policy "anon_insert_events"
  on events for insert to anon with check (true);

create policy "anon_insert_sessions"
  on sessions for insert to anon with check (true);

create policy "anon_update_session_lastseen"
  on sessions for update to anon
  using (true)
  with check (true);   -- in Edge Function nur bestimmtes Feld setzen

create policy "anon_insert_consent"
  on consent_log for insert to anon with check (true);

-- Authenticated (eingeloggte Supabase-User, z.B. Admin):
--   * Vollzugriff auf leads + traits, aber via UI/Policy gefiltert
create policy "authenticated_full_read"
  on leads for select to authenticated using (true);
create policy "authenticated_full_write_leads"
  on leads for all to authenticated using (true) with check (true);

create policy "authenticated_read_traits"
  on identity_traits for select to authenticated using (true);
create policy "authenticated_read_identities"
  on identities for select to authenticated using (true);
create policy "authenticated_read_events"
  on events for select to authenticated using (true);
create policy "authenticated_read_consent"
  on consent_log for select to authenticated using (true);
create policy "authenticated_read_audit"
  on audit_log for select to authenticated using (true);

-- 10. Hilfsfunktion: IP-HMAC (täglich rotierender Salt) ------------------
create or replace function fn_hash_ip(p_ip text)
returns text language sql immutable as $$
  -- Salt wird via Edge Function injiziert; hier nur fallback
  select encode(
    hmac(
      p_ip,
      coalesce(current_setting('app.ip_hash_salt', true),
               to_char(current_date, 'YYYY-MM-DD')),
      'sha256'
    ),
    'hex'
  );
$$;

-- 11. Retention-Jobs (als Funktion, Scheduling via pg_cron in Phase 2) ---
create or replace function fn_retention_events(p_days int default 730)
returns int language plpgsql as $$
declare v_count int;
begin
  delete from events where occurred_at < now() - (p_days || ' days')::interval;
  get diagnostics v_count = row_count;
  insert into audit_log(actor, table_name, operation, record_id, diff)
  values ('system','events','delete', null,
          jsonb_build_object('reason','retention','days',p_days,'rows',v_count));
  return v_count;
end$$;

-- =========================================================================
-- Ende Migration 20260523_001
-- =========================================================================
```

---

## 6. Client-Migration: `analytics.ts` → Supabase

Bestehender Code (laut Repo-Stand) schreibt nur in `localStorage`. Wir bauen den Schreibpfad um, **ohne** das Tracking-Verhalten oder die bestehenden Event-Type-Strings zu brechen.

### 6.1 Mapping bestehender Calls → Schema

| `analytics.ts` Call | `events.event_type` | `properties` (JSONB) |
|---|---|---|
| `track('pageview', {path})` | `pageview` | `{ "page": "/path" }` |
| `useScrollDepth` | `scroll_depth` | `{ "page": "/", "scroll_percent": 50 }` |
| WhatsApp-Button | `cta_click` | `{ "element": "wa_hero_button", "destination": "wa.me/..." }` |
| Phone form submit | `form_submit` | `{ "form": "phone_input", "section": "hero" }` |
| Hero CTA | `cta_click` | `{ "element": "hero_grow_together" }` |
| 404 | `error_404` | `{ "page": "/falsche-url" }` |

### 6.2 Edge Function `supabase/functions/track-event/index.ts`

```ts
import { serve } from "https://deno.land/std@0.224.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const cors = {
  "Access-Control-Allow-Origin": "*",          // in Prod auf Domain einschränken
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "content-type, x-flowstate-app",
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: cors });
  if (req.method !== "POST")    return new Response("only POST", { status: 405, headers: cors });

  const supa = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!   // server-side; bypasst RLS
  );

  const body = await req.json();
  const sourceApp = req.headers.get("x-flowstate-app") ?? body.source_app ?? "foundation";

  // 1. Session sicherstellen (Upsert via session_id vom Client)
  const sessionId = body.session_id as string;
  if (!sessionId) return new Response("missing session_id", { status: 400, headers: cors });

  // IP hashen mit täglich rotierendem Salt (aus env)
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "";
  const ipHash = await hmacSha256(ip, Deno.env.get("IP_HASH_SALT")!);
  const uaHash = await sha256(req.headers.get("user-agent") ?? "");

  await supa.from("sessions").upsert({
    id: sessionId,
    source_app: sourceApp,
    last_seen_at: new Date().toISOString(),
    user_agent_hash: uaHash,
    ip_hash: ipHash,
    referrer: body.referrer ?? null,
    utm_source: body.utm_source ?? null,
    utm_medium: body.utm_medium ?? null,
    utm_campaign: body.utm_campaign ?? null,
    language: body.language ?? null,
    device_type: body.device_type ?? null,
  }, { onConflict: "id" });

  // 2. Event einfügen
  const { error } = await supa.from("events").insert({
    session_id: sessionId,
    source_app: sourceApp,
    event_type: body.event_type,
    properties: body.properties ?? {},
    occurred_at: body.occurred_at ?? new Date().toISOString(),
  });

  if (error) return new Response(error.message, { status: 500, headers: cors });
  return new Response("ok", { headers: cors });
});

async function sha256(s: string) {
  const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(s));
  return [...new Uint8Array(buf)].map(b => b.toString(16).padStart(2,"0")).join("");
}
async function hmacSha256(msg: string, secret: string) {
  const key = await crypto.subtle.importKey(
    "raw", new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  const sig = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(msg));
  return [...new Uint8Array(sig)].map(b => b.toString(16).padStart(2,"0")).join("");
}
```

### 6.3 Edge Function `supabase/functions/capture-lead/index.ts`

Wird vom Phone-Input-Formular gerufen. Legt Identity + Traits + Lead + Consent atomar an.

```ts
import { serve } from "https://deno.land/std@0.224.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

serve(async (req) => {
  if (req.method !== "POST") return new Response("only POST", { status: 405 });
  const supa = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
  );
  const b = await req.json();
  // Pflichtfelder: phone, source_app, source_detail, session_id, consent_text_id
  if (!b.phone || !b.source_app || !b.session_id || !b.consent_text_id) {
    return new Response("missing fields", { status: 400 });
  }

  // 1. Identity anlegen
  const { data: id, error: e1 } = await supa
    .from("identities")
    .insert({ first_seen_app: b.source_app })
    .select("id").single();
  if (e1) return new Response(e1.message, { status: 500 });

  // 2. Trait (PII)
  await supa.from("identity_traits").insert({
    identity_id: id.id,
    phone: b.phone,
    email: b.email ?? null,
    language: b.language ?? null,
    source: b.source_detail ?? "lead_form",
  });

  // 3. Session stitchen
  await supa.from("sessions").update({ identity_id: id.id })
    .eq("id", b.session_id);

  // 4. Consent dokumentieren
  await supa.from("consent_log").insert({
    identity_id: id.id,
    session_id: b.session_id,
    consent_purpose: "lead_capture",
    consent_state: "granted",
    consent_text_id: b.consent_text_id,
    source: "lead_form",
    evidence: { form: b.source_detail, ua: req.headers.get("user-agent") },
  });

  // 5. Lead anlegen
  await supa.from("leads").insert({
    identity_id: id.id,
    source_app: b.source_app,
    source_detail: b.source_detail ?? "unknown",
  });

  // 6. Event protokollieren
  await supa.from("events").insert({
    identity_id: id.id,
    session_id: b.session_id,
    source_app: b.source_app,
    event_type: "lead_captured",
    properties: { source_detail: b.source_detail },
  });

  return new Response(JSON.stringify({ identity_id: id.id }), {
    headers: { "content-type": "application/json" },
  });
});
```

### 6.4 Refactor von `src/lib/analytics.ts`

Beibehalten: `track(eventType, properties)`-Signatur. Geändert: Schreibpfad.

```ts
// src/lib/analytics.ts (Auszug, Pseudocode)
const SUPABASE_FN = import.meta.env.VITE_SUPABASE_FN_URL; // .../functions/v1
const SOURCE_APP  = import.meta.env.VITE_FLOWSTATE_APP ?? "foundation";

export async function track(eventType: string, properties: Record<string,unknown> = {}) {
  const sessionId = ensureSessionId();
  const payload = {
    session_id: sessionId,
    event_type: eventType,
    properties,
    referrer: document.referrer || null,
    language: document.documentElement.lang || null,
    device_type: detectDeviceType(),
    occurred_at: new Date().toISOString(),
  };
  // Fire-and-forget; bei Offline → localStorage-Queue
  try {
    await fetch(`${SUPABASE_FN}/track-event`, {
      method: "POST",
      headers: { "content-type": "application/json", "x-flowstate-app": SOURCE_APP },
      body: JSON.stringify(payload),
      keepalive: true,
    });
  } catch {
    queueOffline(payload);
  }
}
```

`VITE_FLOWSTATE_APP` wird pro Repo gesetzt: `foundation` / `express` / `how` / `stoic`.

---

## 7. Phase 1 (Vorschau, NICHT in dieser Migration umzusetzen)

### 7.1 n8n + systeme.io

- **Webhook in systeme.io**: bei jedem Funnel-Event (subscribed, sequence_advance, conversion).
- **n8n-Workflow `systeme-io-ingest`**: empfängt Webhook, ruft `capture-lead` ODER `/track-event` mit `source_app: 'systeme_io'`.
- **Identity-Stitching**: n8n-Cron, der `events` mit `identity_id IS NULL` + `properties.email` mit `identity_traits.email` (Lower-Case) verknüpft und nachträglich `identity_id` setzt.

### 7.2 Aufteilung in physische Schemas

Wenn der Bedarf besteht (z.B. Daten-Science-Team bekommt nur Lesezugriff auf `core`, nie auf `raw`):

```sql
create schema raw;
create schema core;
create schema marts;
alter table public.events           set schema core;
alter table public.identities       set schema core;
-- ...
```

Apps müssen `search_path` anpassen oder Vollqualifizierung (`core.events`) nutzen.

### 7.3 Marts & Segments

`marts.v_active_leads_30d`, `marts.v_funnel_attribution` als Materialized Views mit `pg_cron`-Refresh. „Segments"-Tabelle aus dem icepanel-Diagramm wird hier umgesetzt.

---

## 8. DSGVO / TTDSG / GoBD — Compliance-Mapping

| Anforderung | Umsetzung im Schema |
|---|---|
| Art. 5 Rechenschaftspflicht | `audit_log` mit Trigger auf PII-Tabellen |
| Art. 6 Rechtsgrundlage | `consent_log.consent_purpose` differenziert nach Verarbeitungszweck |
| Art. 7 Nachweis Einwilligung | `consent_log.consent_text_id` + `evidence` (Banner-Hash, UI-Version) |
| Art. 13/14 Informationspflicht | `consent_text_id` referenziert versionierte Datenschutzerklärung (Repo: `legal/privacy-policy/v<n>.md`) |
| Art. 15 Auskunftsrecht | `v_identity_current` + Export-Funktion `fn_export_identity(identity_id)` (Phase 1) |
| Art. 17 Recht auf Löschung | `identities.status='erased'` + alle Traits genullt; Audit bleibt |
| Art. 20 Datenportabilität | gleiche Export-View wie Art. 15, als JSON-Bundle |
| Art. 30 VVT | aus `source_app`-Werten + `consent_purpose` ableitbar (Phase 1: VVT-Generator) |
| TTDSG § 25 Endgeräte-Cookies | Tracking nur nach `consent_log` mit `consent_purpose='analytics'` und `consent_state='granted'` |
| GoBD Unveränderbarkeit | `events`/`consent_log`/`audit_log` append-only (kein UPDATE-Recht für anon/authenticated, nur service_role) |
| GoBD Aufbewahrung | Retention-Funktion `fn_retention_events(730)` = 2 Jahre default; geschäftsrelevante Daten (`leads`) länger |

**Operativer Hinweis für Claude Code:** Bei jeder neuen Tabelle, die irgendwann PII trägt, ist zu prüfen: `consent_purpose` definiert? Audit-Trigger gesetzt? Retention-Policy dokumentiert?

---

## 9. Test-Suite (`tests/schema.spec.sql`)

```sql
-- Lauft mit `psql -f tests/schema.spec.sql` gegen lokale Supabase
begin;

-- 1. Identity-Insert ohne PII funktioniert
insert into identities (first_seen_app) values ('foundation') returning id \gset
\if :{?id}
  \echo OK: identity created
\else
  \echo FAIL: identity insert
\endif

-- 2. SCD2 — neuer Trait beendet alten
insert into identity_traits (identity_id, phone) values (:'id', '+491111111');
update identity_traits set valid_to = now() where identity_id = :'id' and valid_to is null;
insert into identity_traits (identity_id, phone) values (:'id', '+492222222');
select count(*) as current_traits from identity_traits
  where identity_id = :'id' and valid_to is null;
-- Erwartung: 1

-- 3. Event-Partition: Insert für aktuellen Monat
insert into events (session_id, source_app, event_type, properties)
  values (gen_random_uuid(), 'foundation', 'pageview', '{"page":"/test"}'::jsonb);

-- 4. Audit-Log greift bei Trait-Insert
select count(*) from audit_log where table_name = 'identity_traits';
-- Erwartung: > 0

-- 5. RLS: anon darf nicht lesen
set role anon;
select count(*) from leads;
-- Erwartung: 0 oder Fehler (Permission denied)

rollback;
```

---

## 10. Implementierungs-Reihenfolge (Claude-Code-To-do)

1. ☐ Neues File `supabase/migrations/20260523_001_init_core.sql` mit Inhalt aus §5 anlegen.
2. ☐ `supabase db reset` + `supabase db push` lokal — Fehler? Stopp, melde zurück.
3. ☐ `tests/schema.spec.sql` anlegen (Inhalt §9), `psql` durchlaufen lassen, Output anhängen.
4. ☐ Edge Functions `track-event` und `capture-lead` (§6.2/6.3) anlegen, `supabase functions deploy`.
5. ☐ `.env.local` / `.env.example` erweitern: `VITE_SUPABASE_FN_URL`, `VITE_FLOWSTATE_APP=foundation`, `IP_HASH_SALT`.
6. ☐ `src/lib/analytics.ts` gemäß §6.4 refaktorieren. Bestehende Aufrufe in `App.tsx`, `useScrollDepth.ts`, `WhatsAppButton.tsx`, `PhoneInput.tsx`, `HeroSection.tsx`, `NotFound.tsx` **nicht ändern** (Signatur bleibt).
7. ☐ Phone-Form (`PhoneInput.tsx`) ergänzen: vor Absenden Consent-Banner-Status prüfen, dann `capture-lead` rufen mit `consent_text_id` aus Banner.
8. ☐ Smoke-Test im Browser: pageview, cta_click, form_submit → in Supabase Studio sichtbar.
9. ☐ Commit-Message: `feat(data-hub): Phase 0 — core schema + analytics migration`.

---

## 11. Was bewusst NICHT in Phase 0 enthalten ist

- n8n-Workflows (Phase 1)
- systeme.io-Webhook-Endpoints (Phase 1)
- pg_cron-Scheduling der Retention/Partitions-Wartung (Phase 2)
- Materialized Views / Segments-Layer (Phase 2)
- Schema-Aufteilung `raw`/`core`/`marts` (Phase 2)
- Cookie-Consent-Banner-UI (eigenes Ticket, vorher mit Datenschutzbeauftragtem abstimmen)
- DSGVO-Export-Funktion (`fn_export_identity`) — Phase 1

Diese Punkte sind im Diagramm vorgesehen, gehören aber nicht in den ersten Schnitt. Phase 0 ist absichtlich klein gehalten — damit du dem Schema vertrauen kannst, bevor wir Komplexität draufpacken.

---

## 12. Offene Fragen, die Nils beantworten muss

1. **Aufbewahrungsfrist für `events`**: 2 Jahre Default — passt das, oder soll Foundation/How länger speichern (z.B. 3 Jahre für Funnel-Analyse)?
2. **`consent_text_id`-Schema**: Wie versionieren wir Datenschutzerklärungen? Vorschlag: `legal/privacy-policy/v2026-05.md` als Repo-File, ID = Pfad.
3. **Sales-Owner-Format in `leads.owner`**: E-Mail-Adresse oder Initialen?
4. **Cross-Property-Identity-Stitching-Regel**: Reicht „gleiche E-Mail (case-insensitive)" für Auto-Merge oder soll das immer manuell bestätigt werden?

---

**Ende der Spezifikation.** Bei Rückfragen während der Implementierung: Frage Nils, ändere nichts ohne Update dieser Datei.
