import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Globe, Workflow, Video, ArrowLeft } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { WhatsAppButton } from '../components/ui/WhatsAppButton'
import { Button } from '../components/ui/Button'

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
}

const stagger = { visible: { transition: { staggerChildren: 0.1 } } }

const sections = ['website', 'workflow', 'social-media'] as const

export function Services() {
  const { t } = useTranslation()
  const [activeSection, setActiveSection] = useState<string>('website')
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({})

  useEffect(() => {
    const hash = window.location.hash.replace('#', '')
    if (hash && sectionRefs.current[hash]) {
      setTimeout(() => {
        sectionRefs.current[hash]?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }, 100)
    }
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(e => { if (e.isIntersecting) setActiveSection(e.target.id) })
      },
      { threshold: 0.4 }
    )
    sections.forEach(id => {
      const el = sectionRefs.current[id]
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  const scrollTo = (id: string) => {
    sectionRefs.current[id]?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const navItems = [
    { id: 'website', label: t('services.websitePageTitle'), icon: <Globe className="w-4 h-4" /> },
    { id: 'workflow', label: t('services.workflowPageTitle'), icon: <Workflow className="w-4 h-4" /> },
    { id: 'social-media', label: t('services.socialPageTitle'), icon: <Video className="w-4 h-4" /> },
  ]

  return (
    <>
      {/* Hero */}
      <section className="bg-navy pt-28 pb-16 px-4 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-display text-3xl sm:text-4xl font-bold text-white mb-4"
        >
          {t('services.pageIntro')}
        </motion.h1>
      </section>

      {/* Sticky subnav */}
      <div className="sticky top-0 z-30 bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-5xl mx-auto px-4 flex items-center gap-1 py-2">
          <Link
            to="/"
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl font-sans text-sm text-muted hover:bg-surface hover:text-text transition-colors mr-1"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">{t('nav.home')}</span>
          </Link>
          <div className="w-px h-5 bg-gray-200 mr-1" />
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl font-sans text-sm font-medium transition-colors ${
                activeSection === item.id
                  ? 'bg-navy text-white'
                  : 'text-muted hover:bg-surface hover:text-text'
              }`}
            >
              {item.icon}
              <span className="hidden sm:inline">{item.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Website */}
      <section
        id="website"
        ref={el => { sectionRefs.current['website'] = el }}
        className="py-20 px-4 bg-white scroll-mt-32"
      >
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="max-w-3xl mx-auto"
        >
          <motion.div variants={fadeUp} className="flex items-center gap-3 mb-6">
            <Globe className="w-10 h-10 text-green" />
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-navy">
              {t('services.websitePageTitle')}
            </h2>
          </motion.div>
          <motion.p variants={fadeUp} className="font-sans font-semibold text-navy text-lg mb-2">
            {t('services.card1Tagline')}
          </motion.p>
          <motion.p variants={fadeUp} className="font-sans text-text leading-relaxed mb-6">
            {t('services.websiteDrawer.body')}
          </motion.p>
          <motion.div variants={fadeUp} className="bg-surface rounded-2xl p-6 mb-6">
            <p className="font-sans font-semibold text-navy text-sm uppercase tracking-wide mb-3">
              {t('services.websiteDrawer.process')}
            </p>
            <ul className="space-y-2">
              {['step1', 'step2', 'step3'].map(step => (
                <li key={step} className="flex items-start gap-2 font-sans text-text">
                  <span className="text-orange mt-1 shrink-0">→</span>
                  {t(`services.websiteDrawer.${step}`)}
                </li>
              ))}
            </ul>
          </motion.div>
          <motion.p variants={fadeUp} className="font-sans text-muted italic mb-8">
            {t('services.websiteDrawer.pricing')}
          </motion.p>
          <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-3">
            <WhatsAppButton label={t('services.websiteDrawer.ctaLabel')} />
            <Button
              variant="ghost"
              href="mailto:nils@flowstate.foundation"
              className="border border-gray-200 text-navy hover:bg-surface"
            >
              {t('services.mailLabel')}
            </Button>
          </motion.div>
        </motion.div>
      </section>

      {/* Workflow */}
      <section
        id="workflow"
        ref={el => { sectionRefs.current['workflow'] = el }}
        className="py-20 px-4 bg-surface scroll-mt-32"
      >
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="max-w-3xl mx-auto"
        >
          <motion.div variants={fadeUp} className="flex items-center gap-3 mb-6">
            <Workflow className="w-10 h-10 text-navy" />
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-navy">
              {t('services.workflowPageTitle')}
            </h2>
          </motion.div>
          <motion.p variants={fadeUp} className="font-sans font-semibold text-navy text-lg mb-2">
            {t('services.card2Tagline')}
          </motion.p>
          <motion.p variants={fadeUp} className="font-sans text-text leading-relaxed mb-4">
            {t('services.workflowDrawer.body')}
          </motion.p>
          <motion.p variants={fadeUp} className="font-sans text-text leading-relaxed mb-6">
            {t('services.card2Desc')}
          </motion.p>
          <motion.div variants={fadeUp} className="mb-8">
            <span className="inline-block bg-orange/10 text-orange font-sans font-semibold px-4 py-1.5 rounded-full text-sm">
              {t('services.workflowDrawer.comingSoon')}
            </span>
          </motion.div>
          <motion.div variants={fadeUp}>
            <WhatsAppButton label={t('services.workflowDrawer.ctaLabel')} />
          </motion.div>
        </motion.div>
      </section>

      {/* Social Media */}
      <section
        id="social-media"
        ref={el => { sectionRefs.current['social-media'] = el }}
        className="py-20 px-4 bg-white scroll-mt-32"
      >
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="max-w-3xl mx-auto"
        >
          <motion.div variants={fadeUp} className="flex items-center gap-3 mb-6">
            <Video className="w-10 h-10 text-fire" />
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-navy">
              {t('services.socialPageTitle')}
            </h2>
          </motion.div>
          <motion.p variants={fadeUp} className="font-sans font-semibold text-navy text-lg mb-2">
            {t('services.card3Tagline')}
          </motion.p>
          <motion.p variants={fadeUp} className="font-sans text-text leading-relaxed mb-6">
            {t('services.card3Desc')}
          </motion.p>
          <motion.div variants={fadeUp} className="grid sm:grid-cols-2 gap-4 mb-6">
            <div className="bg-surface rounded-2xl p-5">
              <p className="font-sans font-semibold text-navy text-sm uppercase tracking-wide mb-3">
                {t('services.socialDrawer.cutOnly')}
              </p>
              <p className="font-sans text-text">{t('services.socialDrawer.cut5')}</p>
              <p className="font-sans text-text">{t('services.socialDrawer.cut10')}</p>
            </div>
            <div className="bg-surface rounded-2xl p-5">
              <p className="font-sans font-semibold text-navy text-sm uppercase tracking-wide mb-3">
                {t('services.socialDrawer.full')}
              </p>
              <p className="font-sans text-text">{t('services.socialDrawer.full5')}</p>
              <p className="font-sans text-text">{t('services.socialDrawer.full10')}</p>
            </div>
          </motion.div>
          <motion.p variants={fadeUp} className="font-sans text-ocean font-semibold mb-1">
            {t('services.socialDrawer.promise')}
          </motion.p>
          <motion.p variants={fadeUp} className="font-sans text-muted text-sm mb-8">
            {t('services.socialDrawer.free')}
          </motion.p>
          <motion.div variants={fadeUp}>
            <WhatsAppButton label={t('services.socialDrawer.ctaLabel')} />
          </motion.div>
        </motion.div>
      </section>
    </>
  )
}
