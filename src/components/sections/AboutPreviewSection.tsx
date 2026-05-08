import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { PhoneInput } from '../ui/PhoneInput'
import { WhatsAppButton } from '../ui/WhatsAppButton'
import { Button } from '../ui/Button'

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
}

const stagger = {
  visible: { transition: { staggerChildren: 0.1 } },
}

export function AboutPreviewSection() {
  const { t } = useTranslation()

  return (
    <section className="bg-white py-20 px-4">
      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 items-center"
      >
        {/* Photo */}
        <motion.div variants={fadeUp} className="order-first">
          <img
            src="/assets/nils.webp"
            alt="Nils Tenkotte – Flowstate Foundation"
            className="w-full max-w-sm mx-auto rounded-2xl shadow-lg object-cover aspect-[3/4]"
            loading="lazy"
          />
        </motion.div>

        {/* Text */}
        <motion.div variants={stagger} className="space-y-5">
          <motion.h2 variants={fadeUp} className="font-display text-2xl sm:text-3xl font-bold text-navy">
            {t('about.greeting')}
          </motion.h2>

          <motion.div variants={fadeUp} className="space-y-1">
            <p className="font-sans font-semibold text-navy">{t('about.subhead1')}</p>
            <p className="font-sans text-text leading-relaxed">{t('about.line1')}</p>
          </motion.div>

          <motion.div variants={fadeUp} className="space-y-1">
            <p className="font-sans font-semibold text-navy">{t('about.subhead2')}</p>
            <p className="font-sans text-text leading-relaxed">{t('about.line2')}</p>
          </motion.div>

          <motion.div variants={fadeUp} className="space-y-1">
            <p className="font-sans font-semibold text-navy">{t('about.subhead3')}</p>
            <p className="font-sans text-text leading-relaxed">{t('about.line3')}</p>
          </motion.div>

          <motion.div variants={fadeUp} className="border-t border-gray-100 pt-6 space-y-4">
            <p className="font-sans font-semibold text-navy">{t('about.interest')}</p>
            <PhoneInput source="about" />

            <div className="flex items-center gap-4">
              <div className="flex-1 h-px bg-gray-100" />
              <span className="font-sans text-sm text-muted">{t('about.orDivider')}</span>
              <div className="flex-1 h-px bg-gray-100" />
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <WhatsAppButton label={t('about.waButton')} />
              <Link to="/about-us">
                <Button variant="ghost" className="text-navy border border-gray-200 hover:bg-surface">
                  {t('about.moreLink')}
                </Button>
              </Link>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  )
}
