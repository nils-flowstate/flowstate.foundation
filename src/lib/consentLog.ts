// Data-Hub-Consent (DSGVO Art. 7). Schreibt Einwilligungen ins consent_log
// über die Edge Function /log-consent und hält pro Purpose ein lokales Flag,
// das analytics.ts und PhoneInput.tsx für das TTDSG-Gating lesen.

import { getSessionId } from './session'

// ID der versionierten Datenschutzerklärung
// (flowstate-brain/30-wissen/legal/privacy-policy-v2026-05.md). Spec §4.5 / §8.
export const CONSENT_TEXT_ID = 'privacy-policy-v2026-05'

export type ConsentPurpose = 'analytics' | 'lead_capture' | 'marketing'
export type ConsentState = 'granted' | 'denied' | 'withdrawn'

const FN = import.meta.env.VITE_SUPABASE_FN_URL
const ANON = import.meta.env.VITE_SUPABASE_ANON_KEY

const flagKey = (p: ConsentPurpose) => `ff_consent_${p}`

export function isGranted(purpose: ConsentPurpose): boolean {
  return localStorage.getItem(flagKey(purpose)) === 'granted'
}

export function setLocalConsent(purpose: ConsentPurpose, granted: boolean) {
  localStorage.setItem(flagKey(purpose), granted ? 'granted' : 'denied')
}

/** Schreibt einen Einwilligungs-Nachweis ins consent_log (Edge Function). */
export async function logConsent(
  purpose: ConsentPurpose,
  state: ConsentState,
  evidence: Record<string, unknown> = {},
) {
  if (!FN) return
  try {
    await fetch(`${FN}/log-consent`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        ...(ANON ? { apikey: ANON, authorization: `Bearer ${ANON}` } : {}),
      },
      body: JSON.stringify({
        session_id: getSessionId(),
        consent_purpose: purpose,
        consent_state: state,
        consent_text_id: CONSENT_TEXT_ID,
        source: 'cookie_banner',
        evidence: { ua: navigator.userAgent, ...evidence },
      }),
      keepalive: true,
    })
  } catch {
    // Consent-Logging darf die UX nie blockieren.
  }
}
