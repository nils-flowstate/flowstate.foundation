import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { WhatsAppButton } from '../components/ui/WhatsAppButton'

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
}

const stagger = { visible: { transition: { staggerChildren: 0.12 } } }

export function GrowTogether() {
  const { t } = useTranslation()

  return (
    <>
      {/* Hero */}
      <section className="bg-navy pt-28 pb-16 px-4 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-display text-3xl sm:text-4xl font-bold text-white mb-4"
        >
          {t('growTogether.title')}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="font-sans text-white/70 text-lg max-w-xl mx-auto"
        >
          {t('growTogether.intro')}
        </motion.p>
      </section>

      <section className="bg-surface py-16 px-4">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="max-w-3xl mx-auto space-y-8"
        >
          {/* Cal.com iframe */}
          <motion.div variants={fadeUp} className="bg-white rounded-2xl overflow-hidden shadow-sm">
            <iframe
              src={import.meta.env.VITE_CAL_URL}
              width="100%"
              style={{ minHeight: '700px', border: 'none' }}
              title={t('growTogether.calTitle')}
              loading="lazy"
            />
          </motion.div>

          {/* WA alternative */}
          <motion.div variants={fadeUp} className="text-center space-y-4">
            <div className="flex items-center gap-4">
              <div className="flex-1 h-px bg-gray-200" />
              <span className="font-sans text-sm text-muted">{t('growTogether.waLabel')}</span>
              <div className="flex-1 h-px bg-gray-200" />
            </div>
            <WhatsAppButton className="mx-auto" />
          </motion.div>
        </motion.div>
      </section>
    </>
  )
}
