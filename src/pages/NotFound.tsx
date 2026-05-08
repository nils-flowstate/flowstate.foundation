import { motion } from 'framer-motion'
import { Link, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useEffect } from 'react'
import { track } from '../lib/analytics'
import { Button } from '../components/ui/Button'

export function NotFound() {
  const { t } = useTranslation()
  const location = useLocation()

  useEffect(() => {
    track('404', { page: location.pathname })
  }, [location.pathname])

  return (
    <div className="min-h-screen bg-hero-bg flex flex-col items-center justify-center px-4 relative overflow-hidden">
      {/* Animated wave at bottom */}
      <div className="absolute bottom-0 left-0 right-0 overflow-hidden">
        <svg
          viewBox="0 0 1440 120"
          className="w-full"
          preserveAspectRatio="none"
          style={{ height: '80px' }}
        >
          <path
            d="M0,60 C240,100 480,20 720,60 C960,100 1200,20 1440,60 L1440,120 L0,120 Z"
            className="animate-wave"
            fill="rgba(46,111,191,0.3)"
          />
          <path
            d="M0,80 C360,40 720,100 1080,60 C1260,40 1380,80 1440,70 L1440,120 L0,120 Z"
            className="animate-wave-slow"
            fill="rgba(240,112,32,0.2)"
          />
          <path
            d="M0,90 C480,60 960,110 1440,80 L1440,120 L0,120 Z"
            fill="rgba(61,170,69,0.15)"
          />
        </svg>
      </div>

      <div className="relative z-10 text-center space-y-6 max-w-lg">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <img
            src="/assets/logo.webp"
            alt="Flowstate Foundation"
            className="h-16 w-auto mx-auto mb-8 brightness-0 invert"
          />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="font-display text-8xl font-bold text-orange"
        >
          404
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="font-sans text-lg text-white/70"
        >
          {t('404.title')}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Link to="/">
            <Button variant="primary" size="lg">
              {t('404.backHome')}
            </Button>
          </Link>
        </motion.div>
      </div>
    </div>
  )
}
