import { useState, useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

export function Header() {
  const { t, i18n } = useTranslation()
  const [hidden, setHidden] = useState(false)
  const lastScrollY = useRef(0)
  const location = useLocation()

  useEffect(() => {
    const handler = () => {
      const currentY = window.scrollY
      setHidden(currentY > lastScrollY.current && currentY > 80)
      lastScrollY.current = currentY
    }
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

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 bg-white shadow-sm transition-transform duration-300 ${
        hidden ? '-translate-y-full' : 'translate-y-0'
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

        <nav className="flex items-center gap-4">
          {navLinks.map(link => (
            <Link
              key={link.to}
              to={link.to}
              className={`font-sans font-medium text-sm text-text transition-opacity hover:opacity-100 ${
                location.pathname === link.to ? 'opacity-100 font-semibold' : 'opacity-60'
              }`}
            >
              {link.label}
            </Link>
          ))}

          <button
            onClick={toggleLanguage}
            className="font-sans text-sm font-medium px-2.5 py-1 rounded-lg border border-gray-200 text-text hover:bg-surface transition-colors"
            aria-label="Toggle language"
          >
            {i18n.language === 'de' ? '🇩🇪 DE' : '🇬🇧 EN'}
          </button>
        </nav>
      </div>
    </header>
  )
}
