# Flowstate Foundation – Projektkontext für Claude

> **Zweck:** Dieser Router gibt jeder Session in Sekunden den Einstieg. Das Detailwissen liegt themenweise in [`docs/`](docs/) — diese Datei verweist nur darauf und legt fest, **wie die Doku aktuell gehalten wird**.

---

## 🧭 Die Seele (immer präsent)

**Flowstate Foundation** – *The foundation for your digital flow* · Gründer: **Nils Tenkotte**, Köln.

Hier geht es einzig um den **individuellen Ausdruck einer Seele** – einer Person oder einer Brand. Alles entspringt dem Gefühl. Erst das Fühlen, dann der echte Ausdruck, daraus alles andere – nie Strategie oder Markt zuerst. Wir bauen digitale **Bühnen** für **Herzensunternehmen**, die ihren Ausdruck *tragen*, nicht glätten.

> **Leitfrage für jeden Text & jedes Design:** Spürt man es? Landet es im Körper? Löst es etwas aus?
> Das ist der Maßstab – nicht ob es „professionell" klingt.

Voller Brand-Kontext (Mission, Voice, Farben, Typografie): **[docs/brand.md](docs/brand.md)**.

---

## 🗂️ Doku-Index — wo finde ich was?

| Thema | Datei |
| --- | --- |
| Mission, Brand Voice, Farben, Typografie, Design-Prinzipien | [docs/brand.md](docs/brand.md) |
| Tech-Stack, `src/`-Struktur, Routing, Build/Deploy, Env-Vars | [docs/architecture.md](docs/architecture.md) |
| Supabase-Schema, Migrationen, RLS, DSGVO, Deploy | [docs/data-hub.md](docs/data-hub.md) |
| Tracking, Klaro/Consent Mode, `track()`, Gating | [docs/analytics-consent.md](docs/analytics-consent.md) |
| Edge Functions, n8n-Automation, GA4/GTM, Resend/Cal.com | [docs/integrations.md](docs/integrations.md) |
| Einstieg für Menschen / Überblick | [docs/README.md](docs/README.md) |

---

## 🔄 Wartungsregeln — Doku automatisch aktuell halten

**Verbindlich, ohne Rückfrage:** Wenn eine Codeänderung eine der folgenden Wahrheiten verschiebt, aktualisiere im **selben Schritt** die zugehörige Doc — auch wenn Nils es nicht explizit erwähnt. Die Doku darf nie hinter dem Code zurückbleiben.

| Wenn du das änderst … | … aktualisiere |
| --- | --- |
| Farben, Fonts, Brand Voice, Wording, Design-Prinzipien | [docs/brand.md](docs/brand.md) |
| `src/`-Struktur, Routen ([App.tsx](src/App.tsx)), Dependencies, Build, Env-Vars | [docs/architecture.md](docs/architecture.md) |
| `supabase/migrations/*`, Schema, RLS, neue `event_type`-Werte | [docs/data-hub.md](docs/data-hub.md) |
| `src/lib/{analytics,consent,klaro,consentLog,session}.ts`, Consent-Logik | [docs/analytics-consent.md](docs/analytics-consent.md) |
| Edge Functions, n8n, GA4/GTM, externe Dienste | [docs/integrations.md](docs/integrations.md) |
| Doku-Struktur selbst (neue/umbenannte `docs/`-Datei) | Index + diese Tabelle oben **und** [docs/README.md](docs/README.md) |

**Prinzipien dabei:**
- **Eine Wahrheit, ein Ort.** Fakten gehören in genau eine `docs/`-Datei. Keine Kopien anlegen — stattdessen verlinken (`[…](…)`).
- **Knapp halten.** Docs beschreiben *was & warum*, nicht jede Zeile. Bei Code-Details auf die Datei verlinken statt sie abzuschreiben.
- **Querbezüge prüfen:** Ein neuer `event_type` z. B. muss gleichzeitig in [analytics.ts](src/lib/analytics.ts) (`ALLOWED_EVENT_TYPES`) **und** der `events`-CHECK-Constraint stehen — beide Docs erwähnen das.

---

## 📋 Changelog-Regel (bestehend, bleibt)

Nach **jeder Codeänderung** wird eine `changelog.json` im **selben Ordner** wie die geänderte Datei erstellt/aktualisiert.

```json
[
  { "date": "YYYY-MM-DD", "file": "PainSection.tsx", "description": "Kurz: was & warum, auf Deutsch" }
]
```
- Neue Einträge **vorne** (neueste zuerst) · `date` = ISO-Tag · `file` = nur Dateiname · `description` = kurz & präzise auf Deutsch.

---

## 🔒 Nicht ohne Rückfrage anfassen

- Auskommentierter Code (`{/* TODO Phase 2: … */}`) – bewusst deaktiviert.
- `CTASection`, `GrowTogether`, `ThankYou` – Phase 2, noch nicht aktiv.
- `Datenschutz-v1.tsx` – Backup, nicht aktiv.
- [archive/old-code/](archive/old-code/) – historischer Code (z. B. alter `CookieBanner`), bewusst außerhalb `src/`.

---

*Stand: Juni 2026 · Doku-Struktur v2.0 (themenbasiert)*
