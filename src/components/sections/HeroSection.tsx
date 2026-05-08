import { motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { Button } from '../ui/Button'
import { track } from '../../lib/analytics'

function renderBold(text: string) {
  return text.split('\n').map((line, lineIdx) => (
    <span key={lineIdx} className="block">
      {line.split(/\*\*(.+?)\*\*/g).map((part, i) =>
        i % 2 === 1
          ? <strong key={i} className="text-orange font-bold">{part}</strong>
          : part
      )}
    </span>
  ))
}

export function HeroSection() {
  const { t } = useTranslation()

  return (
    <section className="relative min-h-screen bg-hero-bg flex flex-col items-center justify-center overflow-hidden">
      {/* Noise texture overlay */}
      <div className="absolute inset-0 opacity-[0.03] bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJub2lzZSI+PGZlVHVyYnVsZW5jZSB0eXBlPSJmcmFjdGFsTm9pc2UiIGJhc2VGcmVxdWVuY3k9IjAuNjUiIG51bU9jdGF2ZXM9IjMiIHN0aXRjaFRpbGVzPSJzdGl0Y2giLz48L2ZpbHRlcj48cmVjdCB3aWR0aD0iMzAwIiBoZWlnaHQ9IjMwMCIgZmlsdGVyPSJ1cmwoI25vaXNlKSIgb3BhY2l0eT0iMSIvPjwvc3ZnPg==')]" />

      {/* Green radial glow behind logo */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[60%] w-96 h-96 rounded-full bg-green/20 blur-3xl animate-pulse-slow pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center text-center px-4 max-w-3xl mx-auto">
        {/* Logo – original, centered */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="mb-10"
          style={{ filter: 'drop-shadow(0 0 40px rgba(61,170,69,0.4))' }}
        >
          <img
            src="/assets/logo.webp"
            alt="Flowstate Foundation"
            className="h-28 sm:h-36 w-auto"
          />
        </motion.div>

        {/* Main Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight mb-3"
        >
          {renderBold(t('hero.headline1'))}
          {renderBold(t('hero.headline2'))}
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="font-sans text-base sm:text-lg text-white/60 italic mb-2"
        >
          {t('hero.headlineAccent')}
        </motion.p>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.45 }}
          className="font-sans text-lg sm:text-xl text-orange font-semibold mb-10"
        >
          {t('hero.headlineEnd')}
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto"
        >
          <Link to="/services#website" onClick={() => track('cta_click', { element: 'hero_website' })}>
            <Button variant="primary" size="lg" className="w-full sm:w-auto">
              {t('hero.cta1')}
            </Button>
          </Link>
          <Link to="/services#workflow" onClick={() => track('cta_click', { element: 'hero_workflow' })}>
            <Button variant="outline" size="lg" className="w-full sm:w-auto">
              {t('hero.cta2')}
            </Button>
          </Link>
        </motion.div>

        {/* Sub text */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.75 }}
          className="mt-6 font-sans text-sm text-white/50 whitespace-pre-line"
        >
          {t('hero.sub')}
        </motion.p>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="mt-3 font-sans text-xs text-white/30 italic"
        >
          {t('hero.tagline')}
        </motion.p>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/30 animate-bounce"
      >
        <ChevronDown className="w-6 h-6" />
      </motion.div>
    </section>
  )
}
