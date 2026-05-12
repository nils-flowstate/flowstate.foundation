import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
// import { PhoneInput } from '../ui/PhoneInput'
import { WhatsAppButton } from '../ui/WhatsAppButton'

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
}

const stagger = {
  visible: { transition: { staggerChildren: 0.1 } },
}

export function CTASection() {
  const { t } = useTranslation()

  return (
    <section className="bg-gradient-to-b from-navy to-hero-bg py-20 px-4">
      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="max-w-lg mx-auto text-center"
      >
        <motion.h2 variants={fadeUp} className="font-display text-2xl sm:text-3xl font-bold text-white mb-4">
          {t('cta.headline')}
        </motion.h2>
        <motion.p variants={fadeUp} className="font-sans text-white/70 mb-8">
          {t('cta.body')}
        </motion.p>
        {/* <motion.div variants={fadeUp} className="mb-6">
          <PhoneInput source="cta" darkMode />
        </motion.div> */}
        <motion.div variants={fadeUp} className="flex items-center gap-4 mb-6">
          <div className="flex-1 h-px bg-white/10" />
          <span className="font-sans text-sm text-white/40">{t('about.orDivider')}</span>
          <div className="flex-1 h-px bg-white/10" />
        </motion.div>
        <motion.div variants={fadeUp}>
          <WhatsAppButton variant="outline" className="w-full" />
        </motion.div>
        {/* TODO Phase 2: Newsletter */}
      </motion.div>
    </section>
  )
}
