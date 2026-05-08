import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

export function Header() {
  const { t, i18n } = useTranslation()
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()

  const isHomePage = location.pathname === '/'

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

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

        <nav className="flex items-center gap-6">
          {navLinks.map(link => (
            <Link
              key={link.to}
              to={link.to}
              className={`font-sans font-medium text-sm transition-colors hover:opacity-100 ${
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
      </div>
    </header>
  )
}
