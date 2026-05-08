import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { useTranslation } from 'react-i18next'

export function Header() {
  const { t, i18n } = useTranslation()
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()

  const isHomePage = location.pathname === '/'

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
  }, [location.pathname])

  const toggleLanguage = () => {
    const next = i18n.language === 'de' ? 'en' : 'de'
    i18n.changeLanguage(next)
    localStorage.setItem('ff_lang', next)
  }

  const navLinks = [
    { to: '/services', label: t('nav.services') },
    { to: '/about-us', label: t('nav.about') },
  ]

  const darkBg = isHomePage && !scrolled

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'backdrop-blur-md bg-white/90 shadow-sm'
          : isHomePage
          ? 'bg-transparent'
          : 'bg-white shadow-sm'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center">
          <img
            src="/assets/Logo_Flowstate_Foundation-removedbg.png"
            alt="Flowstate Foundation"
            className="h-9 w-auto"
          />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map(link => (
            <Link
              key={link.to}
              to={link.to}
              className={`font-sans font-medium text-sm transition-colors hover:opacity-80 ${
                darkBg ? 'text-white' : 'text-text'
              } ${location.pathname === link.to ? 'opacity-100 font-semibold' : 'opacity-70'}`}
            >
              {link.label}
            </Link>
          ))}

          <button
            onClick={toggleLanguage}
            className={`font-sans text-sm font-medium px-3 py-1.5 rounded-lg border transition-colors ${
              darkBg
                ? 'border-white/30 text-white hover:bg-white/10'
                : 'border-gray-200 text-text hover:bg-surface'
            }`}
            aria-label="Toggle language"
          >
            {i18n.language === 'de' ? '🇩🇪 DE' : '🇬🇧 EN'}
          </button>
        </nav>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMobileOpen(v => !v)}
          className={`md:hidden p-2 rounded-lg ${darkBg ? 'text-white' : 'text-text'}`}
          aria-label="Menu"
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="md:hidden bg-white border-t border-gray-100 shadow-lg"
          >
            <nav className="max-w-6xl mx-auto px-4 py-4 flex flex-col gap-1">
              {navLinks.map(link => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`font-sans font-medium py-3 px-2 rounded-xl text-text hover:bg-surface transition-colors ${
                    location.pathname === link.to ? 'text-navy font-semibold bg-surface' : ''
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <button
                onClick={toggleLanguage}
                className="mt-2 text-left font-sans text-sm font-medium py-3 px-2 text-muted hover:bg-surface rounded-xl transition-colors"
              >
                {i18n.language === 'de' ? '🇩🇪 Deutsch' : '🇬🇧 English'}
              </button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
