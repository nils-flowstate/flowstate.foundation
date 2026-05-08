import { motion } from 'framer-motion'
import { Globe, Workflow, Video } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { Button } from '../ui/Button'

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
}

const stagger = {
  visible: { transition: { staggerChildren: 0.1 } },
}

export function ServicesPreviewSection() {
  const { t } = useTranslation()

  const cards = [
    {
      id: 'website',
      icon: <Globe className="w-10 h-10 text-green" />,
      title: t('services.card1Title'),
      subs: [t('services.card1Sub1'), t('services.card1Sub2'), t('services.card1Sub3')],
      tagline: t('services.card1Tagline'),
      desc: t('services.card1Desc'),
      border: 'hover:border-green',
    },
    {
      id: 'workflow',
      icon: <Workflow className="w-10 h-10 text-navy" />,
      title: t('services.card2Title'),
      subs: [t('services.card2Sub1'), t('services.card2Sub2'), t('services.card2Sub3')],
      tagline: t('services.card2Tagline'),
      desc: t('services.card2Desc'),
      border: 'hover:border-navy',
    },
    {
      id: 'social-media',
      icon: <Video className="w-10 h-10 text-fire" />,
      title: t('services.card3Title'),
      subs: [t('services.card3Sub1'), t('services.card3Sub2'), t('services.card3Sub3')],
      tagline: t('services.card3Tagline'),
      desc: t('services.card3Desc'),
      border: 'hover:border-fire',
    },
  ]

  return (
    <section className="bg-surface py-20 px-4">
      <div className="max-w-5xl mx-auto">
        <motion.h2
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="font-display text-2xl sm:text-3xl font-bold text-navy text-center mb-12"
        >
          {t('services.previewTitle')}
        </motion.h2>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid sm:grid-cols-3 gap-6"
        >
          {cards.map(card => (
            <motion.div
              key={card.id}
              variants={fadeUp}
              whileHover={{ scale: 1.01 }}
              className={`bg-white rounded-2xl p-6 border-2 border-transparent transition-colors duration-200 ${card.border} flex flex-col`}
            >
              <div className="mb-4">{card.icon}</div>
              <h3 className="font-sans font-bold text-lg text-text mb-3">{card.title}</h3>
              <ul className="space-y-1 mb-3">
                {card.subs.map(sub => (
                  <li key={sub} className="flex items-center gap-2 font-sans text-sm text-muted">
                    <span className="w-1.5 h-1.5 rounded-full bg-muted/40 shrink-0" />
                    {sub}
                  </li>
                ))}
              </ul>
              <p className="font-sans font-semibold text-sm text-navy mb-2">{card.tagline}</p>
              <p className="font-sans text-sm text-muted leading-relaxed mb-5 flex-1">{card.desc}</p>
              <Link to={`/services#${card.id}`}>
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full border border-gray-200 text-navy hover:bg-surface"
                >
                  {t('services.learnMore')}
                </Button>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
