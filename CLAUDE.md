# Flowstate Foundation – Projektkontext für Claude

> **Zweck dieser Datei:** Gibt Claude in jeder neuen Session sofort den nötigen Kontext über Brand, Code-Patterns und Anforderungen – ohne dass Dateien einzeln gelesen werden müssen.

---

## 🧭 Mission & Ziel

**Flowstate Foundation** – *The foundation for your digital flow*
Gründer: **Nils Tenkotte**, Köln | flowstate.foundation

**Kernziel:** Positive Impact & Mutual Appreciation. Menschen und Unternehmen, die das Bewusstsein der breiten Masse erhöhen wollen, sollen sich hier zuhause fühlen. Kunst, Ausdruck, menschliches und gemeinschaftliches Erleben stehen im Mittelpunkt.

**Zielgruppe:** Purpose-driven Solopreneure, Kreative, Künstler, spirituelle Communitys, NGOs und Herzensunternehmen – alle, die eine echte Vision haben und sie digital sichtbar machen wollen. Kein Corporate. Kein Bullshit.

**Nils' persönliche Mission:** Menschen, die ihre Vision mit ebenso viel Leidenschaft und Feuer angehen, den Weg frei zu machen, ihre einzigartige Vision mit anderen zu teilen.

---

## 🎨 Color System

| Token | HEX | Semantische Bedeutung |
|-------|-----|-----------------------|
| `navy` | `#1A3C6E` | Tiefe · Headlines · Backgrounds |
| `ocean` | `#2E6FBF` | Fluss · Sekundär-Akzente |
| `orange` | `#F07020` | **Energie · Primary CTA · Highlight** |
| `fire` | `#E03515` | Passion · sehr sparsam einsetzen |
| `green` | `#3DAA45` | **Wachstum · Erfolg · WhatsApp · Trust** |
| `hero-bg` | `#0B1E38` | Nacht · Hero- & Vision-Sektion |
| `text` | `#111827` | Fließtext · UI |
| `muted` | `#6B7280` | Sekundär · Labels |
| `surface` | `#F7F8FA` | Heller Hintergrund (z.B. AboutSection) |

**Signature Gradient:** Navy → Ocean → Orange → Fire → Green (die Wiedererkennungsspur)

**Faustregel:**
- Orange = Handlungsaufforderung, Energie, Feuer
- Green = Vertrauen, Wachstum, WhatsApp-Buttons
- Navy/Hero-BG = Dark Sections (tiefe, emotionale Momente)
- White (`bg-white`) = Helle, klare Sections (AboutPreview)

---

## ✍️ Typografie – Three Voices

| Klasse | Font | Verwendung |
|--------|------|-----------|
| `font-display` | **Playfair Display** (Serif) | Titles, Hero-Headlines, Section-Marker, emotionale Texte |
| `font-sans` | **DM Sans** (Sans-Serif) | Fließtext, Buttons, Navigation, UI-Elemente, Labels |
| `font-accent` *(selten)* | **Caveat** (Handschrift) | Nur für Zitate, Signaturen, emotionale Anker – sehr sparsam |

**Typografie-Hierarchie:**
- Hero/Section-Titles: `font-display text-3xl sm:text-4xl md:text-5xl font-bold`
- Section-Body: `font-display text-xl sm:text-2xl md:text-3xl leading-relaxed`
- UI-Text: `font-sans text-base sm:text-lg`
- Labels/Overlines: `font-sans text-xs tracking-[0.2em] uppercase text-green`

---

## 🗣️ Brand Voice – So spricht Flowstate Foundation

### Fünf Adjektive
- **Poetisch** – Bilder & Metaphern aus Natur, Bewegung, Elementen. Nie kitschig, immer verankert.
- **Direkt** – Wir sagen, was gemeint ist. Kein Buzzword-Bingo.
- **Somatisch** – Worte, die im Körper landen, nicht nur im Kopf.
- **Bilingual** – Deutsch als Heimat, englische Anker (*Flow*, *Foundation*) fett gesetzt.
- **Einladend** – Immer Du. Persönlich, auf Augenhöhe. Nie hierarchisch.

### Signature Wordings (immer verwenden)
| Wort | Bedeutung |
|------|-----------|
| **Flow** | Bewegung, Leichtigkeit, Prozess – immer fett, nie übersetzen |
| **Foundation** | Grundlage, Fundament, Stabilität – Gegengewicht zu Flow |
| **Herzensunternehmen** | Statt „Unternehmen", „Business", „Firma" |
| **Bühne** | Für digitale Präsenz – nie „Plattform" oder „Auftritt" |
| **Seelenspiegel** | Was die Website sein soll – sparsam, gezielt |
| **Durchblick** | Was bei Workflows geliefert wird |

### ✅ Do's
- Du-Form – immer, ohne Ausnahme
- Ich-Botschaften: „Ich begleite dich …", „Lass uns gemeinsam …"
- Kurze Sätze mit Atemräumen. Drei kurze Zeilen > ein langer Absatz.
- Natur-Metaphern: Welle, Feuer, Wachstum, Spiegel
- Erst Frage, dann Antwort – Leser abholen, bevor Lösungen angeboten werden

### ❌ Don'ts
- Kein „Sie" – nirgends
- Kein Corporate-Speak: Synergien, Skalierung, Effizienzsteigerung
- Keine Coaching-Buzzwords: Mindset-Shift, Quantensprung, Manifestation
- Keine Floskeln als Selbstlob: „individuelle Lösungen", „passgenau"
- Keine reinen Englisch-Sätze ohne deutschen Kontext

---

## 🏗️ Website-Struktur (Home-Page)

```
HeroSection       → Erster Eindruck, Headline + CTA
VisionSection     → Nils' Vision (dark: hero-bg), jetzt mit WhatsApp-Button
PainSection       → Problem der Zielgruppe + Services-Überblick
AboutPreviewSection → Nils persönlich vorstellen (light: white)
ServicesPreviewSection → Website / Workflow / Social Media (Cards)
MottoSection      → Emotionaler Abschluss (dark: navy) + CTA + About-Link
Footer            → Logo + Nav + Legal
```

**Routing:**
- `/` → Home
- `/about-us` → AboutUs
- `/services` → Services
- `/impressum` → Impressum
- `/datenschutz` → Datenschutz

---

## 🧩 Wichtige Komponenten

### `WhatsAppButton` (`src/components/ui/WhatsAppButton.tsx`)
```tsx
<WhatsAppButton
  label="Button-Text"           // optional, fallback: t('whatsapp.defaultLabel')
  message="Vordefinierte Nachricht"  // optional, öffnet wa.me mit encodiertem Text
  variant="primary"             // 'primary' | 'outline' | 'ghost'
  className=""                  // zusätzliche Tailwind-Klassen
/>
```
- **Primary** = grüner Hintergrund (`bg-green`)
- **Outline** = grüner Rand, transparenter Hintergrund
- **Ghost** = nur Text, kein Hintergrund
- Trackt Analytics via `track('cta_click', { element: 'whatsapp_button' })`
- Phone via `VITE_WA_PHONE`, Fallback-URL via `VITE_WA_URL`

### Aktuelle WhatsApp-Messages (wichtige Stellen)
| Sektion | Message |
|---------|---------|
| VisionSection | „Ich fühle deine Mission, aber wie möchtest du das erreichen?" |
| AboutPreviewSection | „Liebe in den Äther <3" |
| MottoSection | „Ich habe Bock loszulegen. Wie fang ich direkt an?" |
| Services → Website | aus `whatsapp.websiteMessage` (i18n) |
| Services → Workflow | aus `whatsapp.workflowMessage` (i18n) |
| Services → Social | aus `whatsapp.socialMessage` (i18n) |

### Animations-Pattern (Framer Motion)
```tsx
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
}
const stagger = {
  visible: { transition: { staggerChildren: 0.1 } },
}
// Wrapper: variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }}
// Kinder:  variants={fadeUp}
```

---

## 🌍 i18n-Strategie

- Alle UI-Texte in `src/i18n/de.json` (Primärsprache: Deutsch)
- `src/i18n/en.json` vorhanden (aber sekundär)
- Zugriff via `const { t } = useTranslation()` → `t('key.subkey')`
- **Hardcoded** werden darf: Button-Labels und WhatsApp-Messages, die sehr spezifisch und emotional sind – diese ändern sich häufiger und müssen nicht übersetzt werden
- Neue längere Texte besser in `de.json` eintragen

---

## 🛠️ Tech Stack

| Tool | Verwendung |
|------|-----------|
| React + TypeScript | Frontend |
| Vite | Build-Tool |
| Tailwind CSS | Styling (Utility-First) |
| Framer Motion | Animationen |
| react-i18next | Übersetzungen |
| react-router-dom | Routing |
| Supabase | Backend (Phone-Leads, Analytics) |
| Lucide React | Icons |

---

## ⚙️ Env Vars (ohne Werte)

| Variable | Verwendung |
|----------|-----------|
| `VITE_WA_PHONE` | WhatsApp-Nummer für wa.me Links |
| `VITE_WA_URL` | Fallback-URL wenn keine Message übergeben |
| `VITE_SUPABASE_URL` | Supabase Projekt-URL |
| `VITE_SUPABASE_ANON_KEY` | Supabase Anon Key |

---

## 📐 Design-Prinzipien

1. **Mobile First** – Spacing und Schriftgrößen immer klein beginnen, dann `sm:` / `md:` ergänzen. Kein übertriebenes Padding auf Mobile.
2. **Emotionaler Flow** – Jede Section hat eine emotionale Aussage. Dark Sections (navy/hero-bg) für tiefe Momente, Light Sections (white) für Klarheit und Nähe.
3. **Konsistente Section-Struktur** – `py-16 px-4` Standard für dark sections, `py-20 px-4` für Haupt-Sections. `max-w-3xl mx-auto text-center` für Text-fokussierte Sections.
4. **Playfair für Emotion, DM Sans für Funktion** – nie vermischen ohne Grund.
5. **Orange für primäre CTAs, Green für WhatsApp** – konsequent durchhalten.

---

## 🔒 Was nicht angefasst werden soll (ohne Rückfrage)

- Kommentierter Code (`{/* TODO Phase 2: ... */}`) – bewusst deaktiviert
- `CTASection`, `GrowTogether`, `ThankYou` – Phase 2, noch nicht aktiv
- `Datenschutz-v1.tsx` – Backup, nicht aktiv

---

*Brand Guideline: `/Users/nilstenkotte/Documents/-00_Brand-Flowstate-Foundation/Flowstate_Foundation_Brand_Guideline-05-2026-v1.pdf`*
*Stand: Mai 2026 · v1.0*
