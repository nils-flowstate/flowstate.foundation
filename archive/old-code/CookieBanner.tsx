import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { hasUserDecided, updateConsent, CONSENT_ALL_GRANTED, ConsentState } from '../lib/consent'

const CONSENT_ALL_DENIED: ConsentState = {
  analytics_storage: 'denied',
  ad_storage: 'denied',
  ad_user_data: 'denied',
  ad_personalization: 'denied',
  functionality_cookies: 'denied',
}

const NO_BANNER_ROUTES = ['/welcome']

export function CookieBanner() {
  const [visible, setVisible] = useState(false)
  const { pathname } = useLocation()

  useEffect(() => {
    if (NO_BANNER_ROUTES.includes(pathname)) return
    if (!hasUserDecided()) {
      const t = setTimeout(() => setVisible(true), 400)
      return () => clearTimeout(t)
    }
  }, [pathname])

  if (NO_BANNER_ROUTES.includes(pathname)) return null

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
          className="fixed bottom-0 left-0 right-0 z-50 bg-navy border-t border-white/10 px-4 py-4"
        >
          <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <p className="font-sans text-sm text-white/80 flex-1 leading-relaxed">
              Ich verwende Cookies, um zu verstehen wie du diese Seite erlebst – und sie damit für alle zu verbessern.{' '}
              <a href="/datenschutz" className="underline underline-offset-2 text-white/60 hover:text-white transition-colors">
                Datenschutz
              </a>
            </p>
            <div className="flex gap-2 shrink-0">
              <button
                onClick={() => { updateConsent(CONSENT_ALL_DENIED); setVisible(false) }}
                className="font-sans text-sm px-4 py-2 rounded-lg border border-white/30 text-white/70 hover:border-white/60 hover:text-white transition-colors"
              >
                Ablehnen
              </button>
              <button
                onClick={() => { updateConsent(CONSENT_ALL_GRANTED); setVisible(false) }}
                className="font-sans text-sm px-4 py-2 rounded-lg bg-orange text-white hover:opacity-90 transition-opacity"
              >
                Akzeptieren
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
