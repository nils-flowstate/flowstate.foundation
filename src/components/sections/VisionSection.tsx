import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { ChevronDown } from 'lucide-react'
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
  const [manifestOpen, setManifestOpen] = useState(false)

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

        <motion.div variants={fadeUp} className="mt-10 border-t border-white/10 pt-8">
          <button
            onClick={() => setManifestOpen(prev => !prev)}
            className="relative w-full group rounded-xl px-4 py-4 overflow-hidden transition-all duration-300"
            aria-expanded={manifestOpen}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-orange/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl" />
            <div className="relative text-center">
              <p className="font-accent text-xl sm:text-2xl text-white/85 leading-relaxed">
                Mein <span className="text-green">Herzenswunsch</span> ist es, die Natur jeder einzelnen unserer <span className="text-green">Seelen</span> zum Strahlen zu bringen.
              </p>
              <ChevronDown
                className={`mt-3 mx-auto w-5 h-5 text-white/40 transition-transform duration-300 ${manifestOpen ? 'rotate-180' : ''}`}
              />
            </div>
          </button>

          <AnimatePresence>
            {manifestOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
                className="overflow-hidden"
              >
                <div className="pt-5 space-y-4 font-accent text-xl sm:text-2xl text-white/75 leading-relaxed text-center">
                  <p>
                    Die Natur fließt durch unseren <span className="text-green">einzigartigen Ausdruck</span> –<br />
                    durch jeden unserer Mitmenschen und <span className="text-green">allen Wesen</span>.
                  </p>
                  <p>
                    Lass andere Menschen den künstlerisch schönen Ausdruck<br />
                    deines Herzens <span className="text-green">spüren</span>.<br />
                    Um diesen wunderschönen Planeten<br />
                    nicht nur zu schätzen, sondern zu <span className="text-green">bewahren</span>.
                  </p>
                  <p>
                    Lass uns gemeinsam <span className="text-green">gefrorene Herzen</span><br />
                    mit dem Mitgefühl unserer Seele verzaubern –<br />
                    und unseren Mitmenschen mit <span className="text-green">liebevoller Offenheit</span> begegnen.
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        <motion.div variants={fadeUp} className="mt-8">
          <WhatsAppButton
            label="Wie möchtest du das erreichen?"
            message="Ich fühle deine Mission, aber wie möchtest du das erreichen?"
          />
        </motion.div>
      </motion.div>
    </section>
  )
}
