// Klaro! Consent-Manager — zentrale Einwilligungsquelle (Entscheidung: "Klaro steuert gtag").
// Purposes: analytics, lead_capture, marketing.
// Bei jeder Speicherung:
//   1. lokales Flag pro Purpose setzen (gelesen von analytics.ts / PhoneInput.tsx),
//   2. Google Consent Mode aktualisieren (updateConsent),
//   3. Änderung ins consent_log schreiben (logConsent → Edge Function),
//      granted → 'granted', Rücknahme einer zuvor erteilten Zustimmung → 'withdrawn'.

import * as Klaro from 'klaro'
import 'klaro/dist/klaro.css'
import {
  updateConsent,
  CONSENT_ALL_GRANTED,
  type ConsentState as GtagConsentState,
} from './consent'
import {
  setLocalConsent,
  logConsent,
  type ConsentPurpose,
} from './consentLog'

const PURPOSES: ConsentPurpose[] = ['analytics', 'lead_capture', 'marketing']

export const klaroConfig = {
  version: 1,
  elementID: 'klaro',
  storageMethod: 'localStorage',
  storageName: 'ff_klaro',
  cookieExpiresAfterDays: 180,
  default: false,
  mustConsent: false,
  acceptAll: true,
  hideDeclineAll: false,
  lang: 'de',
  styling: { theme: ['light', 'bottom', 'wide'] },
  privacyPolicy: '/datenschutz',
  translations: {
    de: {
      consentModal: {
        title: 'Deine Wahl – dein Flow',
        description:
          'Ich nutze ein paar Dienste, um zu spüren, wie du diese Bühne erlebst – und sie für alle lebendiger zu machen. Du entscheidest, was an bleibt.',
      },
      consentNotice: {
        description:
          'Ich begleite dich gern – mit deiner Einwilligung verstehe ich besser, was hier ankommt. {purposes}',
        learnMore: 'Selbst wählen',
      },
      acceptAll: 'Alles annehmen',
      acceptSelected: 'Auswahl speichern',
      decline: 'Nur das Nötigste',
      purposes: {
        analytics: 'Verstehen & Verbessern',
        lead_capture: 'Kontaktaufnahme',
        marketing: 'Reichweite',
      },
      service: {
        purpose: 'Zweck',
        purposes: 'Zwecke',
      },
    },
  },
  services: [
    {
      name: 'analytics',
      title: 'Analytics (eigene Bühne)',
      purposes: ['analytics'],
      cookies: ['ff_session_id', 'ff_analytics_queue'],
    },
    {
      name: 'lead_capture',
      title: 'Kontaktaufnahme',
      purposes: ['lead_capture'],
      required: false,
    },
    {
      name: 'marketing',
      title: 'Marketing / Reichweite',
      purposes: ['marketing'],
    },
  ],
}

function toGtagState(consents: Record<string, boolean>): GtagConsentState {
  const analytics = !!consents.analytics
  const marketing = !!consents.marketing
  return {
    analytics_storage: analytics ? 'granted' : 'denied',
    ad_storage: marketing ? 'granted' : 'denied',
    ad_user_data: marketing ? 'granted' : 'denied',
    ad_personalization: marketing ? 'granted' : 'denied',
    functionality_cookies: CONSENT_ALL_GRANTED.functionality_cookies,
  }
}

export function initKlaro() {
  const manager = Klaro.getManager(klaroConfig)

  manager.watch({
    update(mgr: { consents: Record<string, boolean> }, eventType: string) {
      if (eventType !== 'saveConsents') return
      const consents = mgr.consents

      // 2. Google Consent Mode aktualisieren (Klaro steuert gtag)
      updateConsent(toGtagState(consents))

      // 1. + 3. lokale Flags + consent_log pro Purpose
      PURPOSES.forEach(purpose => {
        const granted = !!consents[purpose]
        const prev = localStorage.getItem(`ff_consent_${purpose}`)
        setLocalConsent(purpose, granted)

        const changed = (prev === 'granted') !== granted || prev === null
        if (!changed) return

        const state = granted
          ? 'granted'
          : prev === 'granted'
            ? 'withdrawn'
            : 'denied'
        void logConsent(purpose, state, { klaro_version: Klaro.version, config_version: klaroConfig.version })
      })
    },
  })

  Klaro.setup(klaroConfig)
}

/** Öffnet das Consent-Modal erneut (z.B. „Cookie-Einstellungen"-Link). */
export function openConsentManager() {
  Klaro.show(klaroConfig)
}
