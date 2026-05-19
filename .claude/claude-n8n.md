# flowstate.foundation — n8n Automation Dokumentation

> Letzter Stand: 2026-05-17
> Weiterführen: Genau hier ansetzen. Beide Teilprojekte sind geplant, aber noch nicht implementiert.

---

## Kontext

Nils betreibt die flowstate.foundation Website (React/Vite, Supabase, selbst gehostet auf VPS).
Ziel: Google Kalender als einzige Wahrheitsquelle für Events nutzen. n8n übernimmt die Automatisierung zwischen Kalender und Frontend (Supabase). Zwei Teilprojekte.

---

## Teilprojekt 1 — Event Automation

### Ziel
Google Kalender Event erstellen → n8n liest aus, kategorisiert, schreibt in Supabase → Frontend zeigt Event an.

### Google Kalender
- Kalender-URL: `https://calendar.google.com/calendar/u/0?cid=Y185MjU2Y2M5ZDg0NGM2NGFkYmFjODRjYzNmNDhmODUxNmVjMTBmMjlhZmY4M2FmZDgyMzUwYzY5ZWVlOGVlYWQ1QGdyb3VwLmNhbGVuZGFyLmdvb2dsZS5jb20`
- Calendar ID (base64-decoded): `c_9256cc9d844c64adbac84cc3f48f8516ec10f29aff83afd82350c69eee8eead5@group.calendar.google.com`
- Alle Events mit Google Maps Location hinterlegen → wird als `location` in Supabase gespeichert
- Alle Events als .ics exportierbar (Google Kalender bietet das nativ; zusätzlich .ics-Download im Frontend via `ics.js` Bibliothek)

### Beschreibungsformat im Kalender (Parsing-Standard)
```
[Typ] - [Kategorien] - [Ticket-URL] - [Rabattcode] - [Öffentliche Beschreibung]
```
Beispiel:
```
Event - Musik, DJ, Ecstatic Dance - https://abc.de/tickets - SAVE10 - Hip-Hop Open Air im Stadtgarten
```
- Trennzeichen: ` - ` (Leerzeichen-Bindestrich-Leerzeichen)
- Kategorien: kommagetrennt, aus der Hauptkategorie-Liste
- Ticket-URL: optional, wird in `ticket_url` gespeichert
- Rabattcode: optional, wird in `referral_url` gespeichert
- Öffentliche Beschreibung: alles danach, wird als `description` in DB gespeichert (Feld noch nicht im Frontend, aber vorbereiten)
- Die Rohbeschreibung wird NICHT auf der Website angezeigt — n8n parst und trennt sie auf

### Kategorie-System (neu, ersetzt altes System)

**Hauptkategorien (Slugs für DB):**
| Slug         | Label                      | Emoji/Thema |
| ------------ | -------------------------- | ----------- |
| `musik`      | Musik \| Klang             |             |
| `kunst`      | Kunst \| Visuell           |             |
| `worte`      | Dichten & Sprache \| Worte |             |
| `fotografie` | Fotografie \| Visuell      |             |
| `video`      | Video \| Visuell & Klang   |             |
| `ernaehrung` | Ernährung \| Natur         |             |
| `sport`      | Sport & Tanz \| Körper     |             |
| `it`         | IT \| Konstrukt            |             |
| `business`   | Business & Networking      |             |

**Unterkategorien (Beispiele, erweiterbar):**
- Musik: `mantra`, `konzert`, `band`, `orchester`, `ecstatic-dance`, `dj`, `club`
- Sport: `ecstatic-dance`, `yoga`, `kung-fu`, `hyrox`, `triathlon`, `marathon`

**Event-Typ:**
- `eigenes-event` — Nils tritt selbst auf (z.B. als DJ)
- `fremdes-event` — Nils nimmt teil oder bewirbt es

**DB-Feld:** `category` — kommagetrennte Slugs, z.B. `"musik,dj,ecstatic-dance"`
**Default-Filter:** Alle

### n8n Workflow Schritte
1. **Trigger:** Google Calendar — Event erstellt oder geändert
2. **Parse:** Beschreibung zerlegen (Regex auf ` - ` Trennzeichen)
3. **Kategorisieren:** Slugs normalisieren und validieren
4. **Upsert Supabase:** In `events` Tabelle schreiben (upsert via Google Event ID als externe Referenz)
5. **Error-Handling:** Bei Fehler → Telegram Benachrichtigung

### Supabase `events` Tabelle (aktuell)
```sql
create table events (
  id             uuid default gen_random_uuid() primary key,
  title          text not null,
  category       text,          -- wird zu kommagetrennt: "musik,dj"
  location       text,
  event_date     date not null,
  event_end_date date,
  ticket_url     text,
  referral_url   text,          -- Rabattcode oder Ref-Link
  is_past        boolean default false,
  is_active      boolean default true,
  created_at     timestamptz default now()
);
```

**Noch hinzuzufügen (Migration nötig):**
- `google_event_id text unique` — für Upsert-Logik
- `description text` — öffentliche Event-Beschreibung
- `event_type text` — `eigenes-event` | `fremdes-event`
- `ics_url text` — direkter .ics Download-Link

### Relevante Frontend-Dateien
- [EventsList.tsx](../src/components/ui/EventsList.tsx) — Fetch-Logik, Filter, Kategorie-Farben → **muss an neues Kategorie-System angepasst werden**
- [AboutUs.tsx](../src/pages/AboutUs.tsx) — Haupt-Events-Seite
- [AboutPreviewSection.tsx](../src/components/sections/AboutPreviewSection.tsx) — Vorschau auf Startseite
- [001_initial.sql](../supabase/migrations/001_initial.sql) — DB-Schema

### Fehler-Handling
- Telegram Chat ID: `8248691846`
- **Noch offen:** Telegram Bot Token (Format: `123456789:AABBcc...`) — muss noch angelegt/übergeben werden
- n8n sendet bei Parse-Fehler oder Supabase-Fehler eine Telegram-Nachricht mit Event-Titel und Fehlerdetail

---

## Teilprojekt 2 — DJ Booking Automation

### Ziel
Wenn ein Event die Kategorie `dj` hat und `event_type = eigenes-event`, wird automatisch:
1. Eine Unterseite auf flowstate.foundation erstellt (`/YYYY-MM-DD-dj`)
2. Ein Google Sheet für Song-Ratings angelegt

### DJ-Unterseite (`/YYYY-MM-DD-dj`)
**Routing:** Dynamische Route in React Router (bereits im Projekt vorhanden)

**Aufbau:**
- Header: Brand-konform, Bild `nils.webp` eingebunden
- Titel: `"Lass uns gemeinsam die Party gestalten"`
- Subtext: `"Musik lebt von Dynamik. Stell dir vor du bist auf dem Ecstatic Dance und hörst diesen Song. Wichtig: bleibe offen."`
- **Song-Swiper:** Tinder-Swipe-Stil (framer-motion bereits im Projekt → nutzen!)
  - Swipe rechts = "Mag ich"
  - Swipe links = "Mag ich nicht"
  - Optional: Textfeld "Warum?" nach dem Swipe
- Songs kommen aus dem verknüpften Google Sheet (manuell gepflegt)

**Google Sheet Struktur (`YYYY-MM-DD-dj`):**
| Spalte        | Inhalt                    |
| ------------- | ------------------------- |
| Song          | Titel                     |
| Künstler      | Name                      |
| Mag ich       | Anzahl Stimmen            |
| Mag ich nicht | Anzahl Stimmen            |
| Begründungen  | Kommagetrennte Kommentare |
| Letzte Stimme | Timestamp                 |

**Idee:** Das Sheet könnte auch als Setlist-Grundlage genutzt werden — Songs mit hohem "Mag ich"-Anteil oben.

### n8n Workflow Schritte (DJ)
1. **Trigger:** Supabase Insert mit `category` enthält `dj` und `event_type = eigenes-event`
2. **Sheet erstellen:** Google Drive → neues Sheet `YYYY-MM-DD-dj` mit Spaltenstruktur
3. **Route aktivieren:** Frontend-Route `/YYYY-MM-DD-dj` ist ein generisches Template das via URL-Parameter (Datum) das passende Sheet lädt
4. **Logging:** Jede Bewertung wird via n8n Webhook in das Sheet geschrieben

---

## n8n Setup

- **Instanz:** Self-hosted auf VPS (URL noch dokumentieren)
- **Authentifizierung:** API Key für n8n Webhooks (noch einrichten)
- **Supabase Zugang:** Service Role Key benötigt (noch übergeben)

### n8n MCP Server (für Claude Code)
- Repo: `https://github.com/czlonkowski/n8n-mcp`
- Ermöglicht Claude Code direkt n8n Workflows zu erstellen/bearbeiten über MCP
- MCP ist in dieser Session bereits konfiguriert: `mcp__claude_ai_n8n__*` Tools verfügbar

### n8n Skills (für Claude Code)
- Repo: `https://github.com/czlonkowski/n8n-skills`
- Vorgefertigte Workflow-Templates und Patterns für gängige Integrationen

### supabase Skills (für Claude Code)
- npx skills add supabase/agent-skills (should be setup already)

---

## MCP Connections (in Claude Code aktiv)

| Service         | Prefix                             | Genutzt für                         |
| --------------- | ---------------------------------- | ----------------------------------- |
| Google Calendar | `mcp__claude_ai_Google_Calendar__` | Kalender auslesen, Events erstellen |
| Google Drive    | `mcp__claude_ai_Google_Drive__`    | Sheets erstellen, Dateien ablegen   |
| Spotify         | `mcp__claude_ai_Spotify__`         | (optional) Song-Daten               |
| Gmail           | `mcp__claude_ai_Gmail__`           | Benachrichtigungen                  |
| n8n             | `mcp__claude_ai_n8n__`             | Workflows direkt bauen              |
| Notion          | `mcp__claude_ai_Notion__`          | (optional) Content-Management       |

---

## Tracking & Logging

- Alle n8n Workflow-Ausführungen in Google Sheets loggen
- Spalten: Timestamp | Event-Titel | Kategorien | Status | Fehler
- Sheet-Name: `n8n_event_log`

---

## Offene Punkte vor nächster Session

- [ ] Supabase Service Role Key → an n8n übergeben
- [ ] n8n Instanz URL + API Key dokumentieren
- [ ] Telegram Bot Token anlegen (Chat ID bekannt: `8248691846`)
- [ ] DB Migration schreiben: `google_event_id`, `description`, `event_type`, `ics_url`
- [ ] EventsList.tsx Kategorie-System auf neue Slugs migrieren (Breaking Change besprechen)
- [ ] DJ-Page: Template-Route in React Router anlegen (`/[date]-dj`)
- [ ] Klären: Wie wird die Website deployed? (Wichtig für DJ-Page Route)
- [ ] Manuelle Song-Pflege definieren: Wer fügt Songs ins Sheet ein? Wann?

---

## Eigene Ideen / Vorschläge

1. **Kategorie-Badge Farben:** Das bestehende `categoryColors` System in EventsList.tsx auf alle 9 Kategorien erweitern — konsistentes Farbsystem aus der bestehenden Brand-Palette
2. **.ics Download im Frontend:** `ics.js` npm Paket → Button "Zum Kalender hinzufügen" direkt auf der Event-Card
3. **DJ Page Access:** Einfacher URL-basierter Zugang (kein Login) — Link wird nach Event-Erstellung automatisch per E-Mail oder Telegram geteilt
4. **Setlist Export:** Nach dem Event können die Sheet-Daten als Setlist exportiert werden (PDF oder öffentliche Seite)
5. **is_past Automatisierung:** Täglicher n8n Cron-Job der `is_past` in Supabase aktualisiert — statt manuell
6. **Referral-Code Tracking:** Wenn SAVE10 in der Beschreibung → in `referral_url` speichern, im Frontend als "Code: SAVE10" anzeigen
