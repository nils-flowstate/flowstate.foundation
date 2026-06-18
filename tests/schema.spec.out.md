# schema.spec — Ausführungs-Output

**Projekt:** flowstate-data-hub (`nlyhexxyophudymgrrrc`, eu-central-1)
**Datum:** 2026-06-12
**Methode:** Asserts via Supabase MCP `execute_sql` (PL/pgSQL DO-Block in Transaktion,
am Ende per Exception zurückgerollt). Lokales `psql -f` war nicht verfügbar, da kein
lokaler Stack/Connection-String konfiguriert ist — die Logik aus `schema.spec.sql`
wurde 1:1 als DO-Block gegen die Remote-Instanz gefahren.

## Ergebnis: ✅ ALLE ASSERTS GRÜN

| # | Assert | Erwartung | Ergebnis |
|---|--------|-----------|----------|
| 1 | Identity-Insert ohne PII | id not null | ✅ id erzeugt |
| 2 | SCD2 — neuer Trait beendet alten | current_traits = 1 | ✅ 1 |
| 3 | Event landet in Monats-Partition | insert ok | ✅ in `events_2026_06` |
| 4 | Audit-Trigger bei Trait-Insert | rows > 0 | ✅ > 0 |
| 5 | RLS: anon liest keine leads | 0 / permission denied | ✅ siehe Hinweis |

Nach dem Lauf: alle Tabellen wieder leer (`identities=0, traits=0, sessions=0,
events=0, audit_log=0`) — Rollback bestätigt.

## Abweichung von Spec §9 (dokumentiert)

Spec-Test #3 fügt ein Event mit einer **zufälligen** `session_id` ein. Die reale
Tabelle `events` hat aber `session_id uuid references sessions(id)` — ein Insert mit
nicht existierender Session verletzt den Foreign Key. Der Spec-Test ist an dieser
Stelle fehlerhaft. Für den tatsächlichen Lauf wurde **zuerst eine Session angelegt**
(genau wie der `track-event`-Flow es per Upsert tut) und das Event darauf referenziert.
Die Datei `schema.spec.sql` bildet §9 unverändert ab; diese Notiz hält die nötige
Korrektur für die Ausführung fest.

## RLS-Hinweis (#5)

`anon` besitzt auf `leads` nur eine `authenticated`-SELECT-Policy → kein Lesezugriff.
Da RLS aktiv ist und keine `anon`-SELECT-Policy existiert, liefert ein Select als
`anon` 0 Zeilen (kein Fehler, da Supabase RLS-Verstöße als leere Menge zurückgibt).
Erwartung „0 oder Permission denied" ist damit erfüllt.
