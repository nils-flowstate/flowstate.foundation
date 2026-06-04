# GTM Consent Mode – Implementierung für flowstate.foundation

## Kontext

Projekt: flowstate.foundation (React + Vite + Tailwind, deployed via Docker/Nginx auf Hetzner VPS)
Ziel: DSGVO-konformer Consent Mode v2 mit eigenem Cookie-Banner, Google Analytics 4 und GTM

## Was zu implementieren ist

### 1. Consent-State-Initialisierung (vor allem anderen)

Erstelle eine Datei `src/lib/consent.ts`:

```typescript
// Consent-Typen
export type ConsentStatus = 'granted' | 'denied';

export interface ConsentState {
  analytics_storage: ConsentStatus;
  ad_storage: ConsentStatus;
  ad_user_data: ConsentStatus;
  ad_personalization: ConsentStatus;
  functionality_cookies: ConsentStatus;
}

const DEFAULT_DENIED: ConsentState = {
  analytics_storage: 'denied',
  ad_storage: 'denied',
  ad_user_data: 'denied',
  ad_personalization: 'denied',
  functionality_cookies: 'denied',
};

// GTM dataLayer initialisieren + Default Consent setzen
export function initConsent() {
  window.dataLayer = window.dataLayer || [];
  
  // Consent Default – nur für DE/AT/CH/EU (nicht weltweit!)
  window.gtag('consent', 'default', {
    ...DEFAULT_DENIED,
    region: ['DE', 'AT', 'CH', 'BE', 'FR', 'IT', 'ES', 'NL', 'PL', 'SE', 'DK', 'FI', 'NO'],
    wait_for_update: 500, // ms – warte auf Nutzerentscheidung
  });

  // Gespeicherten Consent laden (falls Nutzer schon entschieden hat)
  const saved = localStorage.getItem('ff_consent');
  if (saved) {
    const parsed: ConsentState = JSON.parse(saved);
    updateConsent(parsed);
  }
}

// Consent aktualisieren (nach Nutzer-Interaktion)
export function updateConsent(state: ConsentState) {
  window.gtag('consent', 'update', state);
  localStorage.setItem('ff_consent', JSON.stringify(state));
  // Custom Event für GTM-Trigger
  window.dataLayer.push({ event: 'consent_updated', consent: state });
}

// Aktuellen Consent lesen
export function getConsent(): ConsentState | null {
  const saved = localStorage.getItem('ff_consent');
  return saved ? JSON.parse(saved) : null;
}

export function hasUserDecided(): boolean {
  return !!localStorage.getItem('ff_consent');
}
```

### 2. GTM + gtag-Snippet in index.html

Füge in `index.html` im `<head>` (ganz oben, vor allem anderen) ein:

```html
<!-- GTM Consent Init – muss VOR GTM-Script stehen -->
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  
  // Consent Default (denied für EU-Regionen)
  gtag('consent', 'default', {
    analytics_storage: 'denied',
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
    region: ['DE', 'AT', 'CH'],
    wait_for_update: 500
  });
</script>

<!-- Google Tag Manager -->
<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-XXXXXXX');</script>
<!-- End Google Tag Manager -->
```

Direkt nach `<body>`:
```html
<!-- Google Tag Manager (noscript) -->
<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-XXXXXXX"
height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
```

`GTM-XXXXXXX` ersetzen durch echte GTM-Container-ID.

### 3. Cookie-Banner-Komponente

Erstelle `src/components/CookieBanner.tsx`:

```tsx
import { useState, useEffect } from 'react';
import { hasUserDecided, updateConsent, ConsentState } from '@/lib/consent';

export function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!hasUserDecided()) {
      // Kurze Verzögerung – erst nach Paint anzeigen
      setTimeout(() => setVisible(true), 300);
    }
  }, []);

  const acceptAll = () => {
    const granted: ConsentState = {
      analytics_storage: 'granted',
      ad_storage: 'granted',
      ad_user_data: 'granted',
      ad_personalization: 'granted',
      functionality_cookies: 'granted',
    };
    updateConsent(granted);
    setVisible(false);
  };

  const denyAll = () => {
    const denied: ConsentState = {
      analytics_storage: 'denied',
      ad_storage: 'denied',
      ad_user_data: 'denied',
      ad_personalization: 'denied',
      functionality_cookies: 'denied',
    };
    updateConsent(denied);
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-white shadow-lg border-t border-gray-200">
      <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <p className="text-sm text-gray-600 flex-1">
          Wir verwenden Cookies, um unsere Website zu verbessern und den Traffic zu analysieren. 
          <a href="/datenschutz" className="underline ml-1">Datenschutzerklärung</a>
        </p>
        <div className="flex gap-2 shrink-0">
          <button
            onClick={denyAll}
            className="px-4 py-2 text-sm border border-gray-300 rounded hover:bg-gray-50"
          >
            Ablehnen
          </button>
          <button
            onClick={acceptAll}
            className="px-4 py-2 text-sm bg-[#1B4D6E] text-white rounded hover:opacity-90"
          >
            Alle akzeptieren
          </button>
        </div>
      </div>
    </div>
  );
}
```

### 4. Consent in main.tsx initialisieren

In `src/main.tsx` ganz oben:

```typescript
import { initConsent } from '@/lib/consent';

// Muss als allererstes laufen
initConsent();

// ... rest of app
```

Und `<CookieBanner />` in `App.tsx` einbinden:

```tsx
import { CookieBanner } from '@/components/CookieBanner';

export default function App() {
  return (
    <>
      {/* ... rest of app */}
      <CookieBanner />
    </>
  );
}
```

### 5. TypeScript-Types für dataLayer/gtag

Erstelle `src/types/gtag.d.ts`:

```typescript
interface Window {
  dataLayer: Record<string, unknown>[];
  gtag: (...args: unknown[]) => void;
}
```

## Checkliste nach Implementierung

- [ ] GTM Container-ID in index.html eingetragen
- [ ] `initConsent()` wird vor allem anderen aufgerufen
- [ ] Banner erscheint beim ersten Besuch
- [ ] "Ablehnen" speichert `denied` in localStorage
- [ ] "Akzeptieren" speichert `granted` und Banner verschwindet
- [ ] Bei erneutem Besuch kein Banner (Consent bereits gespeichert)
- [ ] In GTM: GA4-Tag nur bei `consent_updated`-Event mit `analytics_storage: granted` auslösen
- [ ] Keine Datenschutz-relevanten Daten fließen vor Zustimmung an Google

## Hinweise

- `wait_for_update: 500` gibt dem Banner Zeit, den Consent zu setzen bevor GTM-Tags feuern
- `region`-Array auf nötige Länder beschränken – spart Messverluste außerhalb EU
- Banner-Styling an Flowstate Brandguide anpassen (Navy #1B4D6E, DM Sans)
- Für erweiterte Einstellungen (nur Analytics, nur Funktional etc.) Banner um Detail-Modal erweitern
