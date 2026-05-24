import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { WhatsAppButton } from '../ui/WhatsAppButton'
import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
// import { PhoneInput } from '../ui/PhoneInput'

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
}

const stagger = {
  visible: { transition: { staggerChildren: 0.1 } },
}

export function MottoSection() {
  const { t } = useTranslation()

  return (
    <section className="bg-navy py-20 px-4">
      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="max-w-3xl mx-auto text-center"
      >
        <motion.p variants={fadeUp} className="font-display text-xl sm:text-2xl md:text-3xl text-white leading-relaxed mb-6">
          {t('motto.body1')}{' '}
          <span className="text-orange font-bold">{t('motto.body2')}</span>{' '}
          {t('motto.body3')}{' '}
          <span className="text-orange font-bold">{t('motto.body4')}</span>{' '}
          {t('motto.body5')}{' '}
          <span className="text-orange font-bold">{t('motto.body6')}</span>{' '}
          {t('motto.body7')}
        </motion.p>

        <motion.p variants={fadeUp} className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-orange mb-8">
          {t('motto.cta')}
        </motion.p>

        <motion.p variants={fadeUp} className="font-sans text-base sm:text-lg text-white/60 italic mb-12">
          {t('motto.sub')}
        </motion.p>

        <motion.div variants={fadeUp}>
          <WhatsAppButton
            label="Lass uns gemeinsam durchstarten!"
            message="Ich habe Bock loszulegen. Wie fang ich direkt an?"
            className="text-base sm:text-lg px-8 py-4"
          />
        </motion.div>

        <motion.div variants={fadeUp}>
          <Link
            to="/about-us"
            className="inline-flex items-center gap-2 font-sans font-semibold text-white/60 hover:text-white transition-colors group"
          >
            Erfahre mehr über meine Passion
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
        {/* Phone CTA */}
        {/* <motion.div variants={fadeUp} className="max-w-md mx-auto space-y-3">
          <p className="font-sans font-semibold text-white text-lg">{t('about.interest')}</p>
          <PhoneInput source="cta" darkMode />
        </motion.div> */}
      </motion.div>
    </section>
  )
}
