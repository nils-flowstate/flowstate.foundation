import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import '@fontsource/playfair-display/400.css'
import '@fontsource/playfair-display/700.css'
import '@fontsource/dm-sans/400.css'
import '@fontsource/dm-sans/500.css'
import '@fontsource/dm-sans/600.css'
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
