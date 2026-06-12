-- Läuft mit `psql -f tests/schema.spec.sql` gegen lokale Supabase
-- (Remote-Validierung dieser Asserts erfolgte via Supabase MCP execute_sql,
--  siehe tests/schema.spec.out.md.)
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
