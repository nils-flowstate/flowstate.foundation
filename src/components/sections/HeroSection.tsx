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

      {/* Green radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[60%] w-96 h-96 rounded-full bg-green/20 blur-3xl animate-pulse-slow pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center text-center px-4 max-w-3xl mx-auto pt-20">

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

        {/* Main Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight mb-6"
        >
          {renderBold(t('hero.headline1'))}
          {renderBold(t('hero.headline2'))}
        </motion.h1>

        {/* Subtitle – headlineAccent */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.55 }}
          className="font-sans text-lg sm:text-xl text-white/80 mb-6"
        >
          {t('hero.headlineAccent')}
        </motion.p>

        {/* CTA buttons – smaller */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="flex flex-row gap-2 mb-6"
        >
          <Link to="/services#website" onClick={() => track('cta_click', { element: 'hero_website' })}>
            <Button variant="primary" size="sm">
              {t('hero.cta1')}
            </Button>
          </Link>
          <Link to="/services#workflow" onClick={() => track('cta_click', { element: 'hero_workflow' })}>
            <Button variant="outline" size="sm">
              {t('hero.cta2')}
            </Button>
          </Link>
        </motion.div>

        {/* Tagline – flowing display font */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.85 }}
          className="font-display italic text-lg sm:text-xl text-white/70 mb-4"
        >
          {t('hero.tagline')}
        </motion.p>

        {/* Sub – two lines */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.95 }}
          className="font-sans text-sm sm:text-base text-white/50 whitespace-pre-line leading-relaxed mb-5"
        >
          {t('hero.sub')}
        </motion.p>

        {/* Setup · Tools · Services */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.05 }}
          className="font-sans text-xs text-white/30 tracking-widest uppercase mb-1"
        >
          {t('hero.service-sub')}
        </motion.p>
      </div>

      {/* Scroll indicator – outside content div, pinned to bottom */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.3 }}
        className="absolute bottom-3 left-1/2 -translate-x-1/2 text-white/30 animate-bounce"
      >
        <ChevronDown className="w-6 h-6" />
      </motion.div>
    </section>
  )
}
