export type ConsentStatus = 'granted' | 'denied'

export interface ConsentState {
  analytics_storage: ConsentStatus
  ad_storage: ConsentStatus
  ad_user_data: ConsentStatus
  ad_personalization: ConsentStatus
  functionality_cookies: ConsentStatus
}

const DEFAULT_DENIED: ConsentState = {
  analytics_storage: 'denied',
  ad_storage: 'denied',
  ad_user_data: 'denied',
  ad_personalization: 'denied',
  functionality_cookies: 'denied',
}

export const CONSENT_ALL_GRANTED: ConsentState = {
  analytics_storage: 'granted',
  ad_storage: 'granted',
  ad_user_data: 'granted',
  ad_personalization: 'granted',
  functionality_cookies: 'granted',
}

export function initConsent() {
  window.dataLayer = window.dataLayer || []

  window.gtag('consent', 'default', {
    ...DEFAULT_DENIED,
    region: ['DE', 'AT', 'CH', 'BE', 'FR', 'IT', 'ES', 'NL', 'PL', 'SE', 'DK', 'FI', 'NO'],
    wait_for_update: 500,
  })

  const saved = localStorage.getItem('ff_consent')
  if (saved) {
    updateConsent(JSON.parse(saved) as ConsentState)
  }
}

export function updateConsent(state: ConsentState) {
  window.gtag('consent', 'update', state)
  localStorage.setItem('ff_consent', JSON.stringify(state))
  window.dataLayer.push({ event: 'consent_updated', consent: state })
}

export function hasUserDecided(): boolean {
  return !!localStorage.getItem('ff_consent')
}
