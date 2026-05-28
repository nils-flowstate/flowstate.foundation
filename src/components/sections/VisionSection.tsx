import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { WhatsAppButton } from '../ui/WhatsAppButton'

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: 'easeOut' } },
}

const stagger = {
  visible: { transition: { staggerChildren: 0.14 } },
}

export function VisionSection() {
  const { t } = useTranslation()

  return (
    <section className="bg-hero-bg border-t border-white/[0.04] py-20 px-4">
      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-60px' }}
        className="max-w-3xl mx-auto text-center"
      >
        <motion.p
          variants={fadeUp}
          className="font-sans text-xs tracking-[0.2em] uppercase text-green mb-7"
        >
          {t('vision.label')}
        </motion.p>

        <motion.p
          variants={fadeUp}
          className="font-display text-xl sm:text-2xl md:text-3xl text-white leading-relaxed"
        >
          {t('vision.s1a')}{' '}
          <span className="text-orange font-bold">{t('vision.s1bold1')}</span>{' '}
          {t('vision.s1b')}{' '}
          <span className="text-orange font-bold">{t('vision.s1bold2')}</span>
        </motion.p>

        <motion.p
          variants={fadeUp}
          className="font-display italic text-white/60 text-base my-6"
        >
          {t('vision.connector')}
        </motion.p>

        <motion.p
          variants={fadeUp}
          className="font-display text-xl sm:text-2xl md:text-3xl text-white leading-relaxed"
        >
          {t('vision.s2a')}{' '}
          <span className="text-green font-bold">{t('vision.s2bold1')}</span>{' '}
          {t('vision.s2b')}{' '}
          <span className="text-green font-bold">{t('vision.s2bold2')}</span>
          {t('vision.s2c') && <>{' '}{t('vision.s2c')}</>}
        </motion.p>

        <motion.div variants={fadeUp} className="mt-10">
          <WhatsAppButton
            label="Wie möchtest du das erreichen?"
            message="Ich fühle deine Mission, aber wie möchtest du das erreichen?"
          />
        </motion.div>
      </motion.div>
    </section>
  )
}
