import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'

export function Datenschutz() {
  const { t } = useTranslation()

  return (
    <>
      <section className="bg-navy pt-28 pb-12 px-4 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-display text-3xl font-bold text-white"
        >
          {t('datenschutz.title')}
        </motion.h1>
      </section>

      <section className="bg-white py-16 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="max-w-2xl mx-auto font-sans text-text space-y-8"
        >
          <p className="text-sm text-muted">{t('datenschutz.lastUpdated')}</p>

          <div>
            <h2 className="font-display text-xl font-bold text-navy mb-3">1. Verantwortliche Stelle</h2>
            <p className="leading-relaxed">
              Verantwortlich für die Verarbeitung personenbezogener Daten auf dieser Website ist:<br /><br />
              Nils Tenkotte<br />
              Gertrudisstraße 7<br />
              50859 Köln<br />
              E-Mail: <a href="mailto:nils@flowstate.foundation" className="text-ocean hover:underline">nils@flowstate.foundation</a>
            </p>
          </div>

          <div>
            <h2 className="font-display text-xl font-bold text-navy mb-3">2. Erhebung und Speicherung personenbezogener Daten</h2>
            <p className="leading-relaxed text-muted">
              Beim Besuch dieser Website werden automatisch Informationen allgemeiner Natur erfasst. Diese Informationen (Server-Logfiles) beinhalten etwa die Art des Webbrowsers, das verwendete Betriebssystem, den Domainnamen Ihres Internet-Service-Providers und Ähnliches.
            </p>
            <p className="leading-relaxed text-muted mt-3">
              Diese Daten sind nicht bestimmten Personen zuordenbar. Sie werden nur zur statistischen Auswertung genutzt und nach Erfüllung des Zwecks gelöscht.
            </p>
          </div>

          <div>
            <h2 className="font-display text-xl font-bold text-navy mb-3">3. Kontaktformular / Telefonnummer</h2>
            <p className="leading-relaxed text-muted">
              Wenn Sie uns über das Kontaktformular oder per Angabe Ihrer Telefonnummer kontaktieren, werden die von Ihnen gemachten Angaben zwecks Bearbeitung der Anfrage und für den Fall von Anschlussfragen bei uns gespeichert. Diese Daten geben wir nicht ohne Ihre Einwilligung weiter.
            </p>
            <p className="leading-relaxed text-muted mt-3">
              Die Verarbeitung der in das Kontaktformular eingegebenen Daten erfolgt auf der Grundlage von Art. 6 Abs. 1 lit. b DSGVO (Vertragsanbahnung) bzw. Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse).
            </p>
          </div>

          <div>
            <h2 className="font-display text-xl font-bold text-navy mb-3">4. Datenspeicherung</h2>
            <p className="leading-relaxed text-muted">
              Alle erhobenen Daten werden ausschließlich auf privaten EU-Servern gespeichert und nicht an US-Dienste weitergegeben. Es erfolgt keine Übermittlung in Drittländer außerhalb der EU/EWR.
            </p>
          </div>

          <div>
            <h2 className="font-display text-xl font-bold text-navy mb-3">5. Cookies und lokale Speicherung</h2>
            <p className="leading-relaxed text-muted">
              Diese Website verwendet technisch notwendige Cookies sowie den lokalen Browserspeicher (localStorage) zur Speicherung von Sprachpräferenzen und zur Verhinderung doppelter Formulareingaben. Es werden keine Tracking-Cookies von Drittanbietern verwendet.
            </p>
          </div>

          <div>
            <h2 className="font-display text-xl font-bold text-navy mb-3">6. Ihre Rechte</h2>
            <p className="leading-relaxed text-muted">
              Sie haben das Recht auf Auskunft über die bei uns gespeicherten Daten, auf Berichtigung, Löschung, Einschränkung der Verarbeitung, Datenübertragbarkeit sowie das Recht auf Widerspruch. Wenden Sie sich dazu an:{' '}
              <a href="mailto:nils@flowstate.foundation" className="text-ocean hover:underline">
                nils@flowstate.foundation
              </a>
            </p>
            <p className="leading-relaxed text-muted mt-3">
              Sie haben außerdem das Recht, sich bei einer Datenschutz-Aufsichtsbehörde zu beschweren, insbesondere in dem Mitgliedstaat Ihres Aufenthaltsorts, Ihres Arbeitsplatzes oder des Orts des mutmaßlichen Verstoßes.
            </p>
          </div>

          <div>
            <h2 className="font-display text-xl font-bold text-navy mb-3">7. WhatsApp Business</h2>
            <p className="leading-relaxed text-muted">
              Für die Kommunikation über WhatsApp Business gelten die Datenschutzbestimmungen von Meta Platforms Ireland Limited. Wir empfehlen, keine sensiblen Daten über WhatsApp zu übermitteln.
            </p>
          </div>

          <div>
            <h2 className="font-display text-xl font-bold text-navy mb-3">8. Cal.com</h2>
            <p className="leading-relaxed text-muted">
              Für die Terminbuchung nutzen wir Cal.com. Dabei werden Ihre Daten an Cal.com Inc. übertragen. Weitere Informationen finden Sie in der Datenschutzerklärung von Cal.com unter{' '}
              <a href="https://cal.com/privacy" target="_blank" rel="noopener noreferrer" className="text-ocean hover:underline">
                cal.com/privacy
              </a>.
            </p>
          </div>

          <div className="border-t border-gray-100 pt-6">
            <p className="text-sm text-muted">
              Bei Fragen zum Datenschutz wenden Sie sich bitte an:{' '}
              <a href="mailto:nils@flowstate.foundation" className="text-ocean hover:underline">
                nils@flowstate.foundation
              </a>
            </p>
          </div>
        </motion.div>
      </section>
    </>
  )
}
