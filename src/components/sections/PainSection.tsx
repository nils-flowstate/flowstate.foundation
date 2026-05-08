import { motion } from 'framer-motion'
import { Globe, Workflow, Video } from 'lucide-react'
import { useTranslation } from 'react-i18next'

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
}

const stagger = {
  visible: { transition: { staggerChildren: 0.1 } },
}

export function PainSection() {
  const { t } = useTranslation()

  const cards = [
    {
      icon: <Globe className="w-8 h-8" />,
      title: t('pain.card1Title'),
      desc: t('pain.card1Desc'),
      color: 'text-navy border-navy/20 hover:border-navy',
    },
    {
      icon: <Workflow className="w-8 h-8" />,
      title: t('pain.card2Title'),
      desc: t('pain.card2Desc'),
      color: 'text-orange border-orange/20 hover:border-orange',
    },
    {
      icon: <Video className="w-8 h-8" />,
      title: t('pain.card3Title'),
      desc: t('pain.card3Desc'),
      color: 'text-ocean border-ocean/20 hover:border-ocean',
    },
  ]

  return (
    <section className="bg-surface py-20 px-4">
      <div className="max-w-5xl mx-auto">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <motion.h2 variants={fadeUp} className="font-display text-2xl sm:text-3xl font-bold text-navy mb-4">
            {t('pain.headline')}
          </motion.h2>
          <motion.p variants={fadeUp} className="font-sans text-lg text-muted">
            {t('pain.body')}
          </motion.p>
        </motion.div>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid sm:grid-cols-3 gap-6 mb-14"
        >
          {cards.map(card => (
            <motion.div
              key={card.title}
              variants={fadeUp}
              whileHover={{ scale: 1.01 }}
              className={`bg-white rounded-2xl p-6 border-2 transition-colors duration-200 ${card.color}`}
            >
              <div className="mb-4">{card.icon}</div>
              <h3 className="font-sans font-semibold text-lg text-text mb-2">{card.title}</h3>
              <p className="font-sans text-muted text-sm leading-relaxed">{card.desc}</p>
            </motion.div>
          ))}
        </motion.div>

        <motion.blockquote
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center italic font-display text-navy text-lg sm:text-xl max-w-2xl mx-auto"
        >
          "{t('pain.quote')}"
        </motion.blockquote>
      </div>
    </section>
  )
}
