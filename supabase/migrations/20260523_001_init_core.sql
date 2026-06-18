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
