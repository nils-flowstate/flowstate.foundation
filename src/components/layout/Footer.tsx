import { Link } from 'react-router-dom'
import { ShieldCheck } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'

export function Footer() {
  const { t } = useTranslation()

  return (
    <footer className="bg-navy text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <div className="flex flex-col items-center gap-8">
          {/* Logo – circular, top */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2, ease: 'easeOut' }}
          className="mb-8"
          style={{ filter: 'drop-shadow(0 0 32px rgba(61,170,69,0.5))' }}
        >
          <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full overflow-hidden ring-2 ring-white/10">
            <img
              src="/assets/logo.webp"
              alt="Flowstate Foundation"
              className="w-full h-full object-cover"
            />
          </div>
        </motion.div>


          <nav className="flex flex-wrap justify-center gap-6">
            <Link to="/" className="font-sans text-sm text-white/70 hover:text-white transition-colors">
              {t('nav.home')}
            </Link>
            <Link to="/about-us" className="font-sans text-sm text-white/70 hover:text-white transition-colors">
              {t('nav.about')}
            </Link>
            <Link to="/services" className="font-sans text-sm text-white/70 hover:text-white transition-colors">
              {t('nav.services')}
            </Link>
          </nav>

          <div className="flex items-center gap-2 text-white/50 text-sm font-sans text-center max-w-xs">
            <ShieldCheck className="w-4 h-4 shrink-0 text-green" />
            <span>{t('footer.tagline')}</span>
          </div>

          <div className="border-t border-white/10 w-full pt-6 flex flex-col items-center gap-2">
            <nav className="flex gap-6">
              <Link to="/impressum" className="font-sans text-xs text-white/40 hover:text-white/70 transition-colors">
                {t('footer.impressum')}
              </Link>
              <Link to="/datenschutz" className="font-sans text-xs text-white/40 hover:text-white/70 transition-colors">
                {t('footer.datenschutz')}
              </Link>
            </nav>
            <p className="font-sans text-xs text-white/40">{t('footer.copyright')}</p>
            <p className="font-sans text-xs text-white/30">{t('footer.madeWith')}</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
