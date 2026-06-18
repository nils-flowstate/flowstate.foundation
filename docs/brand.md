# 🎨 Brand & Design — Flowstate Foundation

> **Wann lesen?** Wenn du Texte schreibst, Farben/Fonts wählst, eine Section gestaltest oder Voice/Wording prüfst.
> **Quelle der Wahrheit** für alles Gefühlte. Code-Tokens liegen in [tailwind.config.ts](../tailwind.config.ts).
> Verwandt: [architecture.md](architecture.md) (wo die Komponenten leben).

---

## 🧭 Mission & Seele

**Flowstate Foundation** – *The foundation for your digital flow*
Gründer: **Nils Tenkotte**, Köln · flowstate.foundation

**Die Essenz – das trägt alles:**
Es geht einzig um den individuellen Ausdruck einer Seele – oder einer Seelengemeinschaft (Brand). Alles entspringt dem Gefühl. Das Fühlen und Spüren steht vor allem anderen. Keine Strategie zuerst. Kein Markt zuerst. Erst das Fühlen. Erst der echte Ausdruck. Daraus entsteht alles andere.

**Kernziel:** Räume des Spürens schaffen – digital. Menschen und Unternehmen, die das Bewusstsein der breiten Masse erhöhen wollen, bekommen eine digitale **Bühne**, die ihren Ausdruck trägt. Nicht anpasst. Nicht glättet. Nicht optimiert um des Optimierens willen.

**Zielgruppe:** Purpose-driven Solopreneure, Kreative, Künstler, spirituelle Communitys, NGOs und **Herzensunternehmen** – alle mit echter Vision, die sie digital spürbar machen wollen. Kein Corporate. Kein Bullshit.

**Nils' Mission:** Menschen, die ihre Vision mit Leidenschaft und Feuer angehen, den Weg frei machen, ihren einzigartigen Ausdruck mit anderen zu teilen.

**Das Kernversprechen – Herzenspassion in künstlerische Form:** Nils versteht die Herzenspassion seiner Kunden bis in den Kern und gießt sie in eine künstlerische Form, die ihre Seele *spiegelt* – nicht interpretiert, nicht vereinfacht. In höchster Qualität. **Qualität ist das wichtigste Gut.** Aus höchster Umsetzungsqualität erwächst die Souveränität des Kunden: Er muss nichts verstehen, kontrollieren, fürchten. Er ist frei – weil das Fundament trägt.

**Der Vibe – lebendig, tanzend, malerisch:** Alles ist bildhaft. Der Ton hüpft, singt, atmet – lebendig wie ein Kind, das aus Freude tanzt, und ebenso tief wie eines, das echten Schmerz kennt. Gegensätze sind Energie, kein Widerspruch. Dynamik trifft Stille. Klarheit trifft Mysterium. Poetisch fließend, mit Raum für das Verborgene.

> **Leitfrage für jeden Text & jedes Design:**
> Spürt man es? Landet es im Körper? Löst es etwas aus?
> Das ist der Maßstab – nicht ob es „professionell" klingt.

---

## 🎨 Color System

| Token     | HEX       | Semantische Bedeutung                    |
| --------- | --------- | ---------------------------------------- |
| `navy`    | `#1A3C6E` | Tiefe · Headlines · Backgrounds          |
| `ocean`   | `#2E6FBF` | Fluss · Sekundär-Akzente                 |
| `orange`  | `#F07020` | **Energie · Primary CTA · Highlight**    |
| `fire`    | `#E03515` | Passion · sehr sparsam einsetzen         |
| `green`   | `#3DAA45` | **Wachstum · Erfolg · WhatsApp · Trust** |
| `hero-bg` | `#0B1E38` | Nacht · Hero- & Vision-Sektion           |
| `text`    | `#111827` | Fließtext · UI                           |
| `muted`   | `#6B7280` | Sekundär · Labels                        |
| `surface` | `#F7F8FA` | Heller Hintergrund (z. B. AboutSection)  |

**Signature Gradient:** Navy → Ocean → Orange → Fire → Green (die Wiedererkennungsspur)

**Faustregel:**
- **Orange** = Handlungsaufforderung, Energie, Feuer
- **Green** = Vertrauen, Wachstum, WhatsApp-Buttons
- **Navy / hero-bg** = Dark Sections (tiefe, emotionale Momente)
- **White (`bg-white`)** = helle, klare Sections (z. B. AboutPreview)

---

## ✍️ Typografie – Three Voices

| Klasse                   | Font                         | Verwendung                                                  |
| ------------------------ | ---------------------------- | ----------------------------------------------------------- |
| `font-display`           | **Playfair Display** (Serif) | Titles, Hero-Headlines, Section-Marker, emotionale Texte    |
| `font-sans`              | **DM Sans** (Sans-Serif)     | Fließtext, Buttons, Navigation, UI, Labels                  |
| `font-accent` *(selten)* | **Caveat** (Handschrift)     | Nur für Zitate, Signaturen, emotionale Anker – sehr sparsam |

**Hierarchie:**
- Hero / Section-Titles: `font-display text-3xl sm:text-4xl md:text-5xl font-bold`
- Section-Body: `font-display text-xl sm:text-2xl md:text-3xl leading-relaxed`
- UI-Text: `font-sans text-base sm:text-lg`
- Labels / Overlines: `font-sans text-xs tracking-[0.2em] uppercase text-green`

**Playfair für Emotion, DM Sans für Funktion – nie ohne Grund vermischen.**

---

## 🗣️ Brand Voice

### Fünf Adjektive
- **Poetisch** – Bilder & Metaphern aus Natur, Bewegung, Elementen. Nie kitschig, immer verankert.
- **Direkt** – Wir sagen, was gemeint ist. Kein Buzzword-Bingo.
- **Somatisch** – Worte, die im Körper landen, nicht nur im Kopf.
- **Bilingual** – Deutsch als Heimat, englische Anker (*Flow*, *Foundation*) fett gesetzt.
- **Einladend** – Immer Du. Persönlich, auf Augenhöhe. Nie hierarchisch.

### Signature Wordings (immer verwenden)
| Wort                   | Bedeutung                                                    |
| ---------------------- | ------------------------------------------------------------ |
| **Flow**               | Bewegung, Leichtigkeit, Prozess – immer fett, nie übersetzen |
| **Foundation**         | Grundlage, Fundament, Stabilität – Gegengewicht zu Flow      |
| **Herzensunternehmen** | Statt „Unternehmen", „Business", „Firma"                     |
| **Bühne**              | Für digitale Präsenz – nie „Plattform" oder „Auftritt"       |
| **Seelenspiegel**      | Was die Website sein soll – sparsam, gezielt                 |
| **Durchblick**         | Was bei Workflows geliefert wird                             |

### ✅ Do's
- Du-Form – immer, ohne Ausnahme
- Ich-Botschaften: „Ich begleite dich …", „Lass uns gemeinsam …"
- Kurze Sätze mit Atemräumen. Drei kurze Zeilen > ein langer Absatz.
- Natur-Metaphern: Welle, Feuer, Wachstum, Spiegel
- Erst Frage, dann Antwort – Leser abholen, bevor Lösungen kommen

### ❌ Don'ts
- Kein „Sie" – nirgends
- Kein Corporate-Speak: Synergien, Skalierung, Effizienzsteigerung
- Keine Coaching-Buzzwords: Mindset-Shift, Quantensprung, Manifestation
- Keine Floskeln als Selbstlob: „individuelle Lösungen", „passgenau"
- Keine reinen Englisch-Sätze ohne deutschen Kontext

---

## 📐 Design-Prinzipien

1. **Mobile First** – Spacing & Schriftgrößen klein beginnen, dann `sm:` / `md:` ergänzen. Kein übertriebenes Padding auf Mobile.
2. **Emotionaler Flow** – Jede Section hat eine emotionale Aussage. Dark Sections (navy / hero-bg) für tiefe Momente, Light Sections (white) für Klarheit und Nähe.
3. **Konsistente Section-Struktur** – `py-16 px-4` für Dark Sections, `py-20 px-4` für Haupt-Sections. `max-w-3xl mx-auto text-center` für text-fokussierte Sections.
4. **Playfair für Emotion, DM Sans für Funktion.**
5. **Orange für primäre CTAs, Green für WhatsApp** – konsequent durchhalten.

---

## 🖼️ Copy-Brief: Vision-Section (Nils' Warum)

> Direkt nach der Hero-Section soll das **Warum** stehen – das moralische & gesellschaftliche Ziel, möglichst clean inszeniert.

**Nils' Vision (Kern):** Räume schaffen, in denen sich jeder wohl und wertgeschätzt fühlt und frei sein darf, wie er ist. Menschen näher zusammenbringen – mehr Vertrauen, aufrichtiges Interesse am anderen und an dessen eigener Vision.

**Wording-Bausteine (i18n):**
- „Meine Vision"
- „Alles dafür zu geben, **gemeinschaftlichen Zusammenhalt** zu **stärken**"
- „und somit Wege für **Räume** wertschätzenden **Erlebens** frei zu machen"

**Eye-Catcher:** *gemeinschaftlichen Zusammenhalt*, *stärken*, *Räume*, *Erleben* fett/akzentuiert setzen – darum geht es in der Mission.

**Umsetzungs-Ideen:**
- **Scroll-Bridge** am Section-Ende: animierter Text „Das setze ich so um ↓" → klarer nächster Schritt, narrative Spannung statt abruptem Schnitt.
- **One-Liner-Variante**: „Alles dafür geben, gemeinschaftlichen Zusammenhalt zu stärken – durch Räume, die echtes Erleben ermöglichen." (Zitat-artig durchgejagt, Switch nach ~2 s.)

Implementiert in [VisionSection.tsx](../src/components/sections/VisionSection.tsx).

---

*Brand Guideline (PDF): `/Users/nilstenkotte/Documents/-00_Brand-Flowstate-Foundation/Flowstate_Foundation_Brand_Guideline-05-2026-v1.pdf`*
