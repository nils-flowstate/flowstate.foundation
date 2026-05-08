import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Instagram } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { PhoneInput } from '../components/ui/PhoneInput'
import { WhatsAppButton } from '../components/ui/WhatsAppButton'
import { EventsList } from '../components/ui/EventsList'

const quotes = [
  { textKey: 'quotes.q1text', authorKey: 'quotes.q1author' },
  { textKey: 'quotes.q2text', authorKey: 'quotes.q2author' },
  { textKey: 'quotes.q3text', authorKey: 'quotes.q3author' },
  { textKey: 'quotes.q4text', authorKey: 'quotes.q4author' },
]

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
}

const stagger = { visible: { transition: { staggerChildren: 0.1 } } }

const igProfiles = [
  { handle: 'nils.back.to.nature', url: 'https://instagram.com/nils.back.to.nature' },
  { handle: 'Nils | Light.Child', url: 'https://instagram.com' },
  { handle: 'flowstate.foundation', url: 'https://instagram.com/flowstate.foundation' },
  { handle: 'flowstate.express', url: 'https://instagram.com/flowstate.express' },
]

export function AboutUs() {
  const { t } = useTranslation()
  const [quoteIndex, setQuoteIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setQuoteIndex(i => (i + 1) % quotes.length)
    }, 6000)
    return () => clearInterval(interval)
  }, [])

  return (
    <>
      {/* Hero */}
      <section className="bg-navy pt-28 pb-16 px-4 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-display text-3xl sm:text-4xl font-bold text-white"
        >
          {t('about.whoAmI')}
        </motion.h1>
      </section>

      {/* Bio section */}
      <section className="bg-white py-20 px-4">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 items-start"
        >
          <motion.div variants={fadeUp}>
            <img
              src="/assets/nils.webp"
              alt="Nils Tenkotte"
              className="w-full max-w-sm mx-auto rounded-2xl shadow-lg object-cover aspect-[3/4]"
              loading="lazy"
            />
          </motion.div>
          <motion.div variants={stagger} className="space-y-4 pt-4">
            <motion.h2 variants={fadeUp} className="font-display text-2xl font-bold text-navy">
              {t('about.greeting')}
            </motion.h2>
            {['fullBio1', 'fullBio2', 'fullBio3', 'fullBio4'].map(key => (
              <motion.p key={key} variants={fadeUp} className="font-sans text-text leading-relaxed">
                {t(`about.${key}`)}
              </motion.p>
            ))}
            <motion.div variants={fadeUp} className="pt-4 space-y-3">
              <p className="font-sans font-semibold text-navy">{t('about.interest')}</p>
              <PhoneInput source="about" />
              <WhatsAppButton className="w-full sm:w-auto" />
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* Rotating quotes */}
      <section className="bg-surface py-16 px-4">
        <div className="max-w-2xl mx-auto text-center min-h-[120px] flex flex-col justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={quoteIndex}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4 }}
            >
              <blockquote className="font-display text-xl sm:text-2xl text-navy italic mb-3">
                "{t(quotes[quoteIndex].textKey)}"
              </blockquote>
              <cite className="font-sans text-sm text-muted not-italic">
                — {t(quotes[quoteIndex].authorKey)}
              </cite>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      
      {/* Herzensprojekte */}
      <section className="bg-surface py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <motion.h2
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="font-display text-2xl sm:text-3xl font-bold text-navy text-center mb-12"
          >
            {t('herzensprojekte.title')}
          </motion.h2>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Spotify */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="bg-white rounded-2xl p-6 shadow-sm"
            >
              <h3 className="font-sans font-semibold text-navy mb-3">{t('herzensprojekte.musicTitle')}</h3>
              <p className="font-sans text-sm text-muted mb-4">{t('herzensprojekte.musicDesc')}</p>
              {/* TODO Phase 2: Spotify embed – Nils to provide Spotify URI */}
              <div className="bg-surface rounded-xl p-6 text-center">
                <p className="font-sans text-sm text-muted italic">{t('herzensprojekte.spotifyPlaceholder')}</p>
              </div>
            </motion.div>

            {/* Events */}
      <section className="bg-white py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <motion.h2
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="font-display text-2xl sm:text-3xl font-bold text-navy text-center mb-10"
          >
            {t('events.title')}
          </motion.h2>
          <EventsList />
        </div>
      </section>


            {/* Instagram */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="bg-white rounded-2xl p-6 shadow-sm"
            >
              <h3 className="font-sans font-semibold text-navy mb-3">{t('herzensprojekte.socialTitle')}</h3>
              <div className="space-y-3">
                {igProfiles.map(profile => (
                  <a
                    key={profile.handle}
                    href={profile.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 font-sans text-sm text-ocean hover:text-navy transition-colors"
                  >
                    <Instagram className="w-4 h-4 shrink-0" />
                    @{profile.handle}
                  </a>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  )
}
