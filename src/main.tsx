import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import './i18n/i18n'
import { App } from './App'
import { initConsent } from './lib/consent'
import { initKlaro } from './lib/klaro'

// gtag-Defaults (denied) setzen, dann Klaro als zentrale Consent-Quelle starten.
initConsent()
initKlaro()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
)
