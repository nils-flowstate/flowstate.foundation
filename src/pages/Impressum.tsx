import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'

export function Impressum() {
  const { t } = useTranslation()

  return (
    <>
      <section className="bg-navy pt-28 pb-12 px-4 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-display text-3xl font-bold text-white"
        >
          {t('impressum.title')}
        </motion.h1>
      </section>

      <section className="bg-white py-16 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="max-w-2xl mx-auto space-y-8 font-sans text-text"
        >
          <div>
            <h2 className="font-semibold text-navy mb-2">{t('impressum.angaben')}</h2>
            <p>Nils Tenkotte<br />Gertrudisstraße 7<br />50859 Köln</p>
          </div>

          <div>
            <h2 className="font-semibold text-navy mb-2">{t('impressum.kontakt')}</h2>
            <p>
              E-Mail:{' '}
              <a href="mailto:nils@flowstate.foundation" className="text-ocean hover:underline">
                nils@flowstate.foundation
              </a>
            </p>
            <p>
              WhatsApp:{' '}
              <a
                href={import.meta.env.VITE_WA_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-ocean hover:underline"
              >
                WhatsApp Business
              </a>
            </p>
          </div>

          <div>
            <h2 className="font-semibold text-navy mb-2">{t('impressum.steuer')}</h2>
            <p>{t('impressum.steuerText')}</p>
            <p>{t('impressum.steuerNr')}</p>
          </div>

          <div>
            <h2 className="font-semibold text-navy mb-2">{t('impressum.verantwortlich')}</h2>
            <p>Nils Tenkotte<br />Gertrudisstraße 7, 50859 Köln</p>
          </div>

          <div>
            <h2 className="font-semibold text-navy mb-2">{t('impressum.streit')}</h2>
            <p className="whitespace-pre-line text-sm text-muted leading-relaxed">
              {t('impressum.streitText')}
            </p>
          </div>

          <div>
            <h2 className="font-semibold text-navy mb-2">{t('impressum.haftung')}</h2>
            <p className="text-sm text-muted leading-relaxed">{t('impressum.haftungText')}</p>
          </div>
        </motion.div>
      </section>
    </>
  )
}
