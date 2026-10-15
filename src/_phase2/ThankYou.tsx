import { motion } from 'framer-motion'
import { CheckCircle } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { WhatsAppButton } from '../components/ui/WhatsAppButton'
import { EventsList } from '../components/ui/EventsList'

export function ThankYou() {
  const { t } = useTranslation()

  return (
    <>
      <section className="bg-navy pt-28 pb-16 px-4">
        <div className="max-w-lg mx-auto text-center space-y-6">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 200, damping: 15 }}
          >
            <CheckCircle className="w-20 h-20 text-green mx-auto" />
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="font-display text-3xl sm:text-4xl font-bold text-white"
          >
            {t('thankYou.title')}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="font-sans text-white/70 text-lg"
          >
            {t('thankYou.noWait')}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <WhatsAppButton label={t('thankYou.waLabel')} className="mx-auto" />
          </motion.div>
        </div>
      </section>

      <section className="bg-surface py-16 px-4">
        <div className="max-w-3xl mx-auto space-y-8">
          <div className="flex items-center gap-4">
            <div className="flex-1 h-px bg-gray-200" />
            <span className="font-sans text-sm text-muted">{t('thankYou.calDivider')}</span>
            <div className="flex-1 h-px bg-gray-200" />
          </div>

          <div className="bg-white rounded-2xl overflow-hidden shadow-sm">
            <iframe
              src={import.meta.env.VITE_CAL_URL}
              width="100%"
              style={{ minHeight: '700px', border: 'none' }}
              title="Termin buchen"
              loading="lazy"
            />
          </div>

          <div className="space-y-6">
            <h2 className="font-display text-xl font-bold text-navy text-center">
              {t('thankYou.eventsTitle')}
            </h2>
            <EventsList compact />
          </div>
        </div>
      </section>
    </>
  )
}
