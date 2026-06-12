-- =========================================================================
-- Flowstate Data Hub — Rollen-Grants (Phase 0)
-- Versioning: 20260523_002
--
-- Warum nötig: Werden die Tabellen außerhalb des normalen Supabase-CLI-Flows
-- angelegt (z.B. via Management-API/MCP), fehlen die Standard-GRANTs an
-- anon/authenticated/service_role. Ohne sie scheitert jeder Insert mit
-- "permission denied for table ..." — RLS greift erst NACH den GRANTs.
-- service_role bypasst RLS (BYPASSRLS); anon/authenticated bleiben durch die
-- in 001 definierten Policies eingeschränkt.
-- =========================================================================

grant usage on schema public to anon, authenticated, service_role;

grant all on all tables    in schema public to anon, authenticated, service_role;
grant all on all sequences in schema public to anon, authenticated, service_role;
grant all on all routines  in schema public to anon, authenticated, service_role;

-- Für künftig in public angelegte Objekte (z.B. neue Event-Partitionen)
alter default privileges in schema public
  grant all on tables to anon, authenticated, service_role;
alter default privileges in schema public
  grant all on sequences to anon, authenticated, service_role;
