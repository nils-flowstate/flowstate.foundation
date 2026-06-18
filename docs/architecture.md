# 🏗️ Architektur & Technik — Flowstate Foundation

> **Wann lesen?** Wenn du Komponenten/Routen anlegst, am Build/Deploy oder an Env-Vars arbeitest, oder verstehen willst, wie das Frontend aufgebaut ist.
> Spezial-Themen: [analytics-consent.md](analytics-consent.md) · [data-hub.md](data-hub.md) · [integrations.md](integrations.md). Look & Feel: [brand.md](brand.md).

---

## 🛠️ Tech-Stack

| Tool                  | Version  | Verwendung                       |
| --------------------- | -------- | -------------------------------- |
| React + TypeScript    | 18.3 / 5.5 | Frontend                       |
| Vite                  | 5.3      | Build-Tool & Dev-Server          |
| Tailwind CSS          | 3.4      | Styling (Utility-First)          |
| Framer Motion         | 11.3     | Animationen                      |
| react-i18next         | 15 / i18next 23 | Übersetzungen (de/en)     |
| react-router-dom      | 6.24     | Routing                          |
| @supabase/supabase-js | 2.105    | Backend (Leads, Analytics, Consent) |
| Klaro                 | 0.7      | Consent-Manager (Cookie-Banner)  |
| react-hook-form       | 7.52     | Formular-State (PhoneInput)      |
| Lucide React          | 0.400    | Icons                            |

---

## 📂 src/-Struktur

```
src/
├── main.tsx                  # Entry-Point: initConsent() → initKlaro() → BrowserRouter → App
├── App.tsx                   # Router, ScrollToTop, PageTracker, Header/Footer-Steuerung
├── index.css                 # Global Styles
├── components/
│   ├── layout/               # Header.tsx · Footer.tsx
│   ├── sections/             # Home-Sections (siehe Website-Struktur unten)
│   └── ui/                   # Button · WhatsAppButton · PhoneInput · ServiceDrawer · EventsList
├── pages/                    # Eine Datei je Route (siehe Route-Tabelle)
├── hooks/
│   └── useScrollDepth.ts     # Scroll-Tiefe 25/50/75/100 % → track('scroll_depth')
├── lib/                      # Kern-Utilities & Integrationen
│   ├── supabase.ts           # Supabase-Client
│   ├── analytics.ts          # track() → Edge Function /track-event (+ Offline-Queue)
│   ├── consent.ts            # Google Consent Mode (gtag defaults)
│   ├── klaro.ts              # Klaro-Config + initKlaro() (steuert gtag + consent_log)
│   ├── consentLog.ts         # DSGVO-Art.-7-Logging + isGranted()-Gating
│   ├── session.ts            # Session-ID (sessionStorage) + Device-Detection
│   └── rateLimit.ts          # Rate-Limit für Phone-Submissions
├── i18n/
│   ├── i18n.ts               # i18next-Config (default de, fallback de)
│   ├── de.json · en.json     # Übersetzungen (de = Primärsprache)
│   └── backup/               # Alte i18n-Stände (nicht aktiv)
└── types/                    # gtag.d.ts · klaro.d.ts (Window-Erweiterungen)
```

> Die **Consent-/Analytics-Schicht** (`lib/{analytics,consent,klaro,consentLog,session}.ts`) ist in [analytics-consent.md](analytics-consent.md) im Detail beschrieben.

---

## 🧭 Routing

Definiert in [src/App.tsx](../src/App.tsx) (React Router v6).

| Route          | Komponente   | Header | Footer | Zweck                          |
| -------------- | ------------ | :----: | :----: | ------------------------------ |
| `/`            | Home         |   ✓    |   ✓    | Landing (Sections, s. u.)      |
| `/about-us`    | AboutUs      |   ✓    |   ✓    | Nils & Events                  |
| `/services`    | Services     |   ✓    |   ✓    | Website / Workflow / Social    |
| `/impressum`   | Impressum    |   ✓    |   ✓    | Legal                          |
| `/datenschutz` | Datenschutz  |   ✓    |   ✓    | DSGVO-Erklärung                |
| `/welcome`     | Welcome      |   ✗    |   ✗    | Onboarding (ohne Header/Footer)|
| `*`            | NotFound     |   ✓    |   ✓    | 404 (trackt `error_404`)       |

**Mechanik:** `ScrollToTop` setzt bei Routenwechsel den Viewport zurück. `PageTracker` feuert `track('pageview')` + `dataLayer.push({event:'page_view'})`. Header/Footer-Sichtbarkeit über `NO_HEADER_ROUTES` / `NO_FOOTER_ROUTES` + 404-Check.

**Phase 2 (auskommentiert, nicht anfassen ohne Rückfrage):** `/grow-together`, `/grow-together/thank-you` (`GrowTogether.tsx`, `ThankYou.tsx`). `Datenschutz-v1.tsx` ist ein inaktives Backup.

---

## 🏠 Website-Struktur (Home-Page)

```
HeroSection            → Erster Eindruck, Headline + CTA
VisionSection          → Nils' Warum (dark: hero-bg) + WhatsApp-Button
PainSection            → Problem der Zielgruppe + Services-Überblick
AboutPreviewSection    → Nils persönlich (light: white)
ServicesPreviewSection → Website / Workflow / Social (Cards)
MottoSection           → Emotionaler Abschluss (dark: navy) + CTA + About-Link
Footer                 → Logo + Nav + Legal
```

---

## 🧩 Wiederkehrende Patterns

### `WhatsAppButton` ([src/components/ui/WhatsAppButton.tsx](../src/components/ui/WhatsAppButton.tsx))
```tsx
<WhatsAppButton
  label="Button-Text"            // optional, fallback: t('whatsapp.defaultLabel')
  message="Vordefinierte Nachricht"  // optional, öffnet wa.me mit encodiertem Text
  variant="primary"              // 'primary' (bg-green) | 'outline' | 'ghost'
  className=""
/>
```
Trackt `track('cta_click', { element: 'whatsapp_button' })`. Phone via `VITE_WA_PHONE`, Fallback-URL via `VITE_WA_URL`.

**Aktuelle WhatsApp-Messages:**
| Sektion             | Message                                                        |
| ------------------- | -------------------------------------------------------------- |
| VisionSection       | „Ich fühle deine Mission, aber wie möchtest du das erreichen?" |
| AboutPreviewSection | „Liebe in den Äther <3"                                        |
| MottoSection        | „Ich habe Bock loszulegen. Wie fang ich direkt an?"            |
| Services            | aus i18n (`whatsapp.websiteMessage` / `workflowMessage` / `socialMessage`) |

### Framer-Motion-Standard
```tsx
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
}
const stagger = { visible: { transition: { staggerChildren: 0.1 } } }
// Wrapper: variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }}
// Kinder:  variants={fadeUp}
```

---

## 🌍 i18n

- Primärsprache **Deutsch** ([de.json](../src/i18n/de.json)), `en.json` sekundär. Default & Fallback = `de`, gespeichert in `localStorage: ff_lang`.
- Zugriff: `const { t } = useTranslation()` → `t('key.subkey')`.
- **Hardcoded erlaubt:** sehr spezifische, emotionale Button-Labels & WhatsApp-Messages (ändern sich häufig).
- Neue längere Texte gehören nach `de.json`.

---

## ⚙️ Build, Deploy & Env

### Scripts ([package.json](../package.json))
```
dev      → vite                # Dev-Server
build    → tsc && vite build   # Typecheck + Production-Build nach dist/
preview  → vite preview        # Build lokal testen
og       → node scripts/generate-og.mjs   # OG-Images generieren
```

### Vite ([vite.config.ts](../vite.config.ts))
Manuelle Chunks: `vendor` (react/router), `motion` (framer-motion), `i18n`, `supabase`.

### Deployment ([Dockerfile](../Dockerfile))
Multi-Stage: `node:20-alpine` baut → `nginx:alpine` served `dist/` über [nginx.conf](../nginx.conf).
Gehostet auf **Hetzner VPS via Coolify** (Auto-Deploy auf `main`). Build-Args im Dockerfile: `VITE_CAL_URL`, `VITE_WA_URL`, `VITE_WA_PHONE`.

> ⚠️ `VITE_*`-Variablen werden **zur Build-Zeit** ins Bundle kompiliert. Neue `VITE_`-Vars müssen sowohl in Coolify (Build-Args/Env) als auch ggf. im Dockerfile ergänzt werden, sonst sind sie im Frontend `undefined`.

### Env-Vars (`.env`, ohne Werte)
| Variable                         | Verwendung                                       |
| -------------------------------- | ------------------------------------------------ |
| `VITE_SUPABASE_URL`              | Supabase Projekt-URL                             |
| `VITE_SUPABASE_ANON_KEY`         | Supabase Anon Key (Edge-Function-Auth)           |
| `VITE_SUPABASE_SERVICE_ROLE_KEY` | Service Role (nur lokal/Tools, **nie** im Bundle)|
| `VITE_SUPABASE_FN_URL`           | Edge-Function-Base-URL (`…/functions/v1`)        |
| `VITE_FLOWSTATE_APP`             | `source_app`-Kennung (default `foundation`)      |
| `VITE_CAL_URL`                   | Cal.com-Buchungslink                             |
| `VITE_WA_PHONE` / `VITE_WA_URL`  | WhatsApp-Nummer / Fallback-URL                   |
| `VITE_GOOGLE_ANALYTICS_ID`       | GA4 / GTM                                         |
| `VITE_N8N_API` / `_URL` / `_MCP` | n8n-Automation (siehe [integrations.md](integrations.md)) |
| `VITE_TELEGRAM_BOT_TOKEN` / `_CHAT_ID` | n8n-Fehler-Benachrichtigungen              |
| `VITE_RESEND_API`                | Transaktionale Mails (Lead-Benachrichtigung)     |
| `FORMS_WEBSITE_GOOGLE`           | Google-Forms-Anbindung                           |

> Datenbank-/Edge-Function-Details: [data-hub.md](data-hub.md). Server-seitige Secrets (z. B. `IP_HASH_SALT`) leben in **Supabase Secrets**, nicht im Frontend.
