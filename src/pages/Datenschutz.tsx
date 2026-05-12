import { motion } from 'framer-motion'

const tocItems = [
  ['verantwortlicher', '1. Verantwortliche Stelle'],
  ['uebersicht', '2. Übersicht der Verarbeitungen'],
  ['rechtsgrundlagen', '3. Maßgebliche Rechtsgrundlagen'],
  ['sicherheit', '4. Sicherheitsmaßnahmen'],
  ['uebermittlung', '5. Übermittlung personenbezogener Daten'],
  ['transfers', '6. Internationale Datentransfers'],
  ['loeschung', '7. Datenspeicherung und Löschung'],
  ['rechte', '8. Rechte der betroffenen Personen'],
  ['leistungen', '9. Geschäftliche Leistungen'],
  ['hosting', '10. Webhosting und Infrastruktur'],
  ['cookies', '11. Cookies und lokale Speicherung'],
  ['kontakt', '12. Kontaktaufnahme und Anfrageverwaltung'],
  ['whatsapp', '13. WhatsApp Business'],
  ['calcom', '14. Terminbuchung (Cal.com)'],
  ['systemeio', '15. Marketing, CRM und Newsletter (systeme.io)'],
  ['speicherung', '16. Datenspeicherung und Backups'],
  ['supabase', '17. Datenbank und Anwendungsdienste (Supabase)'],
  ['interne-tools', '18. Interne Betriebswerkzeuge'],
  ['analytics', '19. Website-Analyse (eigene Implementierung)'],
  ['social', '20. Präsenzen in sozialen Netzwerken'],
  ['aenderungen', '21. Änderungen dieser Datenschutzerklärung'],
  ['begriffe', '22. Begriffsdefinitionen'],
]

export function Datenschutz() {
  return (
    <>
      <section className="bg-navy pt-28 pb-12 px-4 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-display text-3xl font-bold text-white"
        >
          Datenschutzerklärung
        </motion.h1>
      </section>

      <section className="bg-white py-16 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="max-w-3xl mx-auto font-sans text-text space-y-10"
        >
          <p className="text-sm text-muted">Stand: 12. Mai 2026</p>

          {/* Inhaltsverzeichnis */}
          <div>
            <h2 className="font-display text-xl font-bold text-navy mb-4">Inhaltsverzeichnis</h2>
            <ol className="space-y-1">
              {tocItems.map(([id, label]) => (
                <li key={id}>
                  <a href={`#${id}`} className="text-ocean text-sm hover:underline">{label}</a>
                </li>
              ))}
            </ol>
          </div>

          {/* 1 */}
          <div id="verantwortlicher">
            <h2 className="font-display text-xl font-bold text-navy mb-3">1. Verantwortliche Stelle</h2>
            <p className="leading-relaxed text-muted">
              Verantwortlich für die Verarbeitung personenbezogener Daten auf dieser Website ist:
            </p>
            <p className="leading-relaxed text-muted mt-3">
              Nils Tenkotte<br />
              Gertrudisstraße 7<br />
              50859 Köln<br />
              E-Mail:{' '}
              <a href="mailto:nils@flowstate.foundation" className="text-ocean hover:underline">
                nils@flowstate.foundation
              </a>
            </p>
          </div>

          {/* 2 */}
          <div id="uebersicht">
            <h2 className="font-display text-xl font-bold text-navy mb-3">2. Übersicht der Verarbeitungen</h2>
            <p className="leading-relaxed text-muted">
              Diese Datenschutzerklärung beschreibt, welche personenbezogenen Daten wir im Rahmen des Betriebs dieser Website sowie unserer Geschäftstätigkeit verarbeiten, zu welchen Zwecken, auf welcher Rechtsgrundlage und wie lange diese gespeichert werden.
            </p>
            <p className="leading-relaxed text-muted mt-3">
              Zu den verarbeiteten Datenkategorien zählen: Bestandsdaten (z. B. Name, Anschrift), Kontaktdaten (z. B. E-Mail, Telefon), Inhaltsdaten (z. B. Nachrichten), Nutzungsdaten (z. B. besuchte Seiten, Gerätedaten) sowie Meta- und Kommunikationsdaten (z. B. IP-Adressen, Zeitstempel).
            </p>
          </div>

          {/* 3 */}
          <div id="rechtsgrundlagen">
            <h2 className="font-display text-xl font-bold text-navy mb-3">3. Maßgebliche Rechtsgrundlagen</h2>
            <p className="leading-relaxed text-muted mb-3">
              Die Verarbeitung personenbezogener Daten erfolgt auf Basis folgender Rechtsgrundlagen der DSGVO:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted leading-relaxed">
              <li><strong className="text-navy">Art. 6 Abs. 1 lit. a DSGVO (Einwilligung)</strong> — für Marketing-Cookies und Newsletter (z. B. systeme.io)</li>
              <li><strong className="text-navy">Art. 6 Abs. 1 lit. b DSGVO (Vertragserfüllung)</strong> — für die Abwicklung von Anfragen und Dienstleistungsverträgen</li>
              <li><strong className="text-navy">Art. 6 Abs. 1 lit. c DSGVO (rechtliche Verpflichtung)</strong> — z. B. steuerrechtliche Aufbewahrungspflichten</li>
              <li><strong className="text-navy">Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse)</strong> — für den Betrieb der technischen Infrastruktur, Sicherheit und interne Analytics</li>
            </ul>
            <p className="leading-relaxed text-muted mt-3">
              Soweit Cookies oder ähnliche Technologien eingesetzt werden, gilt zusätzlich § 25 TTDSG (Telekommunikation-Telemedien-Datenschutz-Gesetz).
            </p>
          </div>

          {/* 4 */}
          <div id="sicherheit">
            <h2 className="font-display text-xl font-bold text-navy mb-3">4. Sicherheitsmaßnahmen</h2>
            <p className="leading-relaxed text-muted">
              Wir treffen dem aktuellen Stand der Technik entsprechende Sicherheitsmaßnahmen, um den Schutz personenbezogener Daten zu gewährleisten. Dazu zählen die Verschlüsselung der Datenübertragung via TLS/HTTPS, der Einsatz von Firewalls (UFW), eine restriktive Zugangskontrolle zu unseren Serversystemen sowie regelmäßige Sicherheitsupdates. Zugriffe auf Server erfolgen ausschließlich über verschlüsselte VPN-Verbindungen (Tailscale).
            </p>
          </div>

          {/* 5 */}
          <div id="uebermittlung">
            <h2 className="font-display text-xl font-bold text-navy mb-3">5. Übermittlung personenbezogener Daten</h2>
            <p className="leading-relaxed text-muted">
              Personenbezogene Daten werden nur dann an Dritte übermittelt, wenn dies zur Vertragserfüllung erforderlich ist, eine gesetzliche Verpflichtung besteht oder die betroffene Person eingewilligt hat. Die eingesetzten Dienstleister sind als Auftragsverarbeiter oder eigenverantwortliche Verantwortliche in den jeweiligen Abschnitten dieser Erklärung benannt.
            </p>
          </div>

          {/* 6 */}
          <div id="transfers">
            <h2 className="font-display text-xl font-bold text-navy mb-3">6. Internationale Datentransfers</h2>
            <p className="leading-relaxed text-muted">
              Wir weisen ausdrücklich darauf hin, dass Daten im Rahmen unserer Geschäftstätigkeit <strong className="text-navy">nicht ausschließlich auf Servern innerhalb der EU gespeichert werden</strong>. Folgende von uns eingesetzte Dienste verarbeiten Daten in Drittländern (insbesondere den USA):
            </p>
            <ul className="list-disc list-inside space-y-1 text-muted leading-relaxed mt-3">
              <li>Google Workspace (Drive, Gmail, Calendar) — USA</li>
              <li>Google Fonts — USA</li>
              <li>Google Forms — USA</li>
              <li>Notion — USA</li>
              <li>Supabase — USA</li>
              <li>Cal.com — USA</li>
              <li>Microsoft 365 (Teams, OneDrive, Outlook) — USA</li>
              <li>Hostinger — internationale Serverstandorte</li>
            </ul>
            <p className="leading-relaxed text-muted mt-3">
              Für Datenübermittlungen in die USA stützen wir uns auf den EU-US Data Privacy Framework (DPF), der seit Juli 2023 als Angemessenheitsbeschluss der EU-Kommission anerkannt ist, sowie ergänzend auf EU-Standardvertragsklauseln (SCCs) gemäß Art. 46 DSGVO. Die jeweiligen Rechtsgrundlagen und Transfermechanismen sind in den Abschnitten der betreffenden Dienste aufgeführt.
            </p>
          </div>

          {/* 7 */}
          <div id="loeschung">
            <h2 className="font-display text-xl font-bold text-navy mb-3">7. Datenspeicherung und Löschung</h2>
            <p className="leading-relaxed text-muted">
              Personenbezogene Daten werden gelöscht oder gesperrt, sobald der Zweck der Speicherung entfällt und keine gesetzlichen Aufbewahrungspflichten (z. B. steuerrechtlich 10 Jahre nach HGB/AO) entgegenstehen. Soweit keine konkreten Fristen angegeben sind, werden Daten nach Erfüllung des Zwecks umgehend gelöscht.
            </p>
          </div>

          {/* 8 */}
          <div id="rechte">
            <h2 className="font-display text-xl font-bold text-navy mb-3">8. Rechte der betroffenen Personen</h2>
            <p className="leading-relaxed text-muted mb-3">
              Sie haben nach DSGVO folgende Rechte gegenüber uns als Verantwortlichem:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted leading-relaxed">
              <li><strong className="text-navy">Auskunft</strong> (Art. 15) — über die zu Ihrer Person gespeicherten Daten</li>
              <li><strong className="text-navy">Berichtigung</strong> (Art. 16) — unrichtiger oder unvollständiger Daten</li>
              <li><strong className="text-navy">Löschung</strong> (Art. 17) — sofern keine Aufbewahrungspflicht entgegensteht</li>
              <li><strong className="text-navy">Einschränkung</strong> (Art. 18) — der Verarbeitung</li>
              <li><strong className="text-navy">Datenübertragbarkeit</strong> (Art. 20) — in einem gängigen maschinenlesbaren Format</li>
              <li><strong className="text-navy">Widerspruch</strong> (Art. 21) — gegen Verarbeitungen auf Basis berechtigter Interessen</li>
              <li><strong className="text-navy">Widerruf</strong> einer erteilten Einwilligung, jederzeit mit Wirkung für die Zukunft</li>
            </ul>
            <p className="leading-relaxed text-muted mt-3">
              Zur Ausübung dieser Rechte wenden Sie sich an:{' '}
              <a href="mailto:nils@flowstate.foundation" className="text-ocean hover:underline">
                nils@flowstate.foundation
              </a>
            </p>
            <p className="leading-relaxed text-muted mt-3">
              Sie haben außerdem das Recht, sich bei einer Datenschutz-Aufsichtsbehörde zu beschweren, insbesondere in dem Mitgliedstaat Ihres Aufenthaltsorts. Zuständig für uns ist: Landesbeauftragte für Datenschutz und Informationsfreiheit Nordrhein-Westfalen (LDI NRW), <a href="https://www.ldi.nrw.de" target="_blank" rel="noopener noreferrer" className="text-ocean hover:underline">www.ldi.nrw.de</a>.
            </p>
          </div>

          {/* 9 */}
          <div id="leistungen">
            <h2 className="font-display text-xl font-bold text-navy mb-3">9. Geschäftliche Leistungen</h2>
            <p className="leading-relaxed text-muted">
              Wir verarbeiten Daten unserer Kunden und Interessenten (Auftraggeber) im Rahmen der Erbringung von Agenturdienstleistungen (Webentwicklung, Workflow-Automatisierung, Social-Media-Produktion). Verarbeitete Kategorien sind Kontaktdaten, Vertragsdaten, Zahlungsdaten sowie Kommunikationsinhalte.
            </p>
            <p className="leading-relaxed text-muted mt-3">
              Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO (Vertragserfüllung). Daten werden für die Dauer der Geschäftsbeziehung sowie darüber hinaus für die gesetzlichen Aufbewahrungsfristen (HGB, AO: bis zu 10 Jahre) gespeichert.
            </p>
          </div>

          {/* 10 */}
          <div id="hosting">
            <h2 className="font-display text-xl font-bold text-navy mb-3">10. Webhosting und Infrastruktur</h2>

            <h3 className="font-sans font-semibold text-navy mb-2 text-base mt-4">Hetzner Online GmbH</h3>
            <p className="leading-relaxed text-muted">
              Unsere Website wird auf Servern der Hetzner Online GmbH, Industriestr. 25, 91710 Gunzenhausen, Deutschland betrieben. Beim Aufruf der Website werden automatisch Server-Logfiles erfasst (IP-Adresse, Browsertyp, Betriebssystem, Zeitstempel, aufgerufene URL). Diese Daten werden zur Gewährleistung des Betriebs und der Sicherheit verarbeitet und nach 14 Tagen gelöscht. Rechtsgrundlage: Art. 6 Abs. 1 lit. f DSGVO. Hetzner verarbeitet diese Daten ausschließlich in Deutschland/EU.
            </p>
            <p className="leading-relaxed text-muted mt-2">
              Zusätzlich nutzen wir den Hetzner Object Storage (S3-kompatibel) zur Speicherung von Website-Assets und Mediendateien. Dabei werden keine personenbezogenen Daten gespeichert. Speicherort: Deutschland/EU.
            </p>

            <h3 className="font-sans font-semibold text-navy mb-2 text-base mt-4">INWX GmbH & Co. KG</h3>
            <p className="leading-relaxed text-muted">
              Die DNS-Verwaltung der Domain flowstate.foundation erfolgt über INWX GmbH & Co. KG, Joachimsthaler Str. 12, 10719 Berlin, Deutschland. Bei DNS-Anfragen werden technische Verbindungsdaten (IP-Adresse) verarbeitet. Rechtsgrundlage: Art. 6 Abs. 1 lit. f DSGVO.
            </p>

            <h3 className="font-sans font-semibold text-navy mb-2 text-base mt-4">Google Fonts</h3>
            <p className="leading-relaxed text-muted">
              Für die einheitliche Darstellung von Schriftarten nutzen wir Google Fonts. Anbieter ist Google Ireland Limited, Gordon House, Barrow Street, Dublin 4, Irland. Beim Aufruf der Website werden Schriftarten von <code className="text-sm bg-surface px-1 rounded">fonts.googleapis.com</code> geladen, wobei die IP-Adresse des Nutzers an Google übertragen wird. Wir haben keinen Einfluss auf diese Datenverarbeitung. Rechtsgrundlage: Art. 6 Abs. 1 lit. f DSGVO. Grundlage für Drittlandtransfers in die USA: Data Privacy Framework (DPF). Weitere Informationen:{' '}
              <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-ocean hover:underline">policies.google.com/privacy</a>.
            </p>

            <h3 className="font-sans font-semibold text-navy mb-2 text-base mt-4">Hostinger</h3>
            <p className="leading-relaxed text-muted">
              Für weitere Hosting-Leistungen nutzen wir Hostinger. Anbieter ist Hostinger International Ltd., 61 Lordou Vironos Street, 6023 Larnaca, Zypern. Hostinger betreibt Server an internationalen Standorten, auch außerhalb der EU. Beim Abruf gehosteter Inhalte werden technische Verbindungsdaten (IP-Adresse, Zeitstempel, Browsertyp) verarbeitet. Rechtsgrundlage: Art. 6 Abs. 1 lit. f DSGVO. Grundlage für etwaige Drittlandtransfers: Standardvertragsklauseln gemäß Art. 46 DSGVO. Weitere Informationen:{' '}
              <a href="https://www.hostinger.de/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-ocean hover:underline">hostinger.de/privacy-policy</a>.
            </p>
          </div>

          {/* 11 */}
          <div id="cookies">
            <h2 className="font-display text-xl font-bold text-navy mb-3">11. Cookies und lokale Speicherung</h2>
            <p className="leading-relaxed text-muted mb-3">
              Wir setzen auf dieser Website folgende Technologien zur lokalen Datenspeicherung ein:
            </p>

            <h3 className="font-sans font-semibold text-navy mb-2 text-base">Technisch notwendige Speicherung</h3>
            <p className="leading-relaxed text-muted">
              Im Browser-localStorage wird die Sprachpräferenz des Nutzers gespeichert (<code className="text-sm bg-surface px-1 rounded">ff_lang</code>). Dies ist technisch notwendig für die korrekte Darstellung der Website und erfordert keine Einwilligung (§ 25 Abs. 2 Nr. 2 TTDSG).
            </p>

            <h3 className="font-sans font-semibold text-navy mb-2 text-base mt-4">Eigene Website-Analyse</h3>
            <p className="leading-relaxed text-muted">
              Wir erfassen anonymisierte Nutzungsdaten (besuchte Seiten, Scrolltiefe, Gerättyp, UTM-Parameter) ausschließlich im localStorage des Browsers (<code className="text-sm bg-surface px-1 rounded">ff_session_id</code>, <code className="text-sm bg-surface px-1 rounded">ff_analytics_log</code>). Diese Daten verlassen das Gerät nicht und werden nicht an Drittanbieter übertragen. Rechtsgrundlage: Art. 6 Abs. 1 lit. f DSGVO.
            </p>

            <h3 className="font-sans font-semibold text-navy mb-2 text-base mt-4">Marketing-Cookies (systeme.io)</h3>
            <p className="leading-relaxed text-muted">
              Durch die Einbindung von systeme.io-Skripten werden Drittanbieter-Cookies gesetzt (RudderStack: <code className="text-sm bg-surface px-1 rounded">rl_anonymous_id</code>, <code className="text-sm bg-surface px-1 rounded">rl_session</code>, <code className="text-sm bg-surface px-1 rounded">rl_user_id</code>; PostHog: <code className="text-sm bg-surface px-1 rounded">ph_phc_*</code>). Diese Cookies dienen dem Tracking des Nutzerverhaltens für Marketing-Zwecke. Rechtsgrundlage: Art. 6 Abs. 1 lit. a DSGVO i. V. m. § 25 Abs. 1 TTDSG (Einwilligung). Weitere Informationen finden Sie in Abschnitt 15.
            </p>
          </div>

          {/* 12 */}
          <div id="kontakt">
            <h2 className="font-display text-xl font-bold text-navy mb-3">12. Kontaktaufnahme und Anfrageverwaltung</h2>
            <p className="leading-relaxed text-muted">
              Wenn Sie uns per E-Mail oder über ein Kontaktformular kontaktieren, werden Ihre Angaben (Name, E-Mail-Adresse, Nachrichteninhalt) zur Bearbeitung Ihrer Anfrage und für eventuelle Rückfragen gespeichert. Rechtsgrundlage: Art. 6 Abs. 1 lit. b DSGVO (Vertragsanbahnung) bzw. Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse). Daten werden gelöscht, sobald die Anfrage abschließend bearbeitet ist, sofern keine gesetzlichen Aufbewahrungspflichten bestehen.
            </p>

            <h3 className="font-sans font-semibold text-navy mb-2 text-base mt-4">Google Forms</h3>
            <p className="leading-relaxed text-muted">
              Für Kontaktanfragen und Interessentenerfassung setzen wir Google Forms ein. Anbieter ist Google Ireland Limited, Gordon House, Barrow Street, Dublin 4, Irland. Die im Formular eingegebenen Daten (z. B. Name, E-Mail-Adresse, Nachricht) werden auf Servern von Google verarbeitet und gespeichert. Rechtsgrundlage: Art. 6 Abs. 1 lit. b DSGVO (Vertragsanbahnung) sowie Art. 6 Abs. 1 lit. f DSGVO. Grundlage für Drittlandtransfers in die USA: Data Privacy Framework (DPF) sowie Standardvertragsklauseln gemäß Art. 46 DSGVO. Weitere Informationen:{' '}
              <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-ocean hover:underline">policies.google.com/privacy</a>.
            </p>
          </div>

          {/* 13 */}
          <div id="whatsapp">
            <h2 className="font-display text-xl font-bold text-navy mb-3">13. WhatsApp Business</h2>
            <p className="leading-relaxed text-muted">
              Wir bieten die Möglichkeit an, uns über WhatsApp Business zu kontaktieren. Anbieter ist Meta Platforms Ireland Limited, 4 Grand Canal Square, Grand Canal Harbour, Dublin 2, Irland. Wenn Sie uns über WhatsApp kontaktieren, werden Ihre Mobilfunknummer, Ihr Nutzerprofil sowie der Nachrichteninhalt an Meta übertragen. Für die Verarbeitung durch Meta gelten deren Datenschutzbestimmungen (<a href="https://www.whatsapp.com/legal/privacy-policy-eea" target="_blank" rel="noopener noreferrer" className="text-ocean hover:underline">whatsapp.com/legal/privacy-policy-eea</a>). Wir empfehlen, keine sensiblen personenbezogenen Daten über WhatsApp zu übermitteln. Rechtsgrundlage: Art. 6 Abs. 1 lit. b DSGVO.
            </p>
          </div>

          {/* 14 */}
          <div id="calcom">
            <h2 className="font-display text-xl font-bold text-navy mb-3">14. Terminbuchung (Cal.com)</h2>
            <p className="leading-relaxed text-muted">
              Für die Online-Terminbuchung nutzen wir Cal.com. Anbieter ist Cal.com, Inc., 2261 Market Street, Suite 5731, San Francisco, CA 94114, USA. Bei einer Buchung werden Name, E-Mail-Adresse, Terminwunsch sowie ggf. weitere von Ihnen eingegebene Informationen an Cal.com übertragen und dort verarbeitet.
            </p>
            <p className="leading-relaxed text-muted mt-2">
              Da Cal.com seinen Sitz in den USA hat, erfolgt eine Datenübertragung in die USA. Cal.com ist unter dem EU-US Data Privacy Framework (DPF) zertifiziert, das als Angemessenheitsbeschluss der EU-Kommission anerkannt ist. Weitere Informationen: <a href="https://cal.com/privacy" target="_blank" rel="noopener noreferrer" className="text-ocean hover:underline">cal.com/privacy</a>. Rechtsgrundlage: Art. 6 Abs. 1 lit. b DSGVO.
            </p>
          </div>

          {/* 15 */}
          <div id="systemeio">
            <h2 className="font-display text-xl font-bold text-navy mb-3">15. Marketing, CRM und Newsletter (systeme.io)</h2>
            <p className="leading-relaxed text-muted">
              Für E-Mail-Marketing, CRM, Newsletter-Funnel und Online-Kurse nutzen wir systeme.io. Anbieter ist systeme.io SAS, 11 rue de Mogador, 75009 Paris, Frankreich. Wenn Sie sich für unseren Newsletter anmelden oder ein Formular auf dieser Website ausfüllen, werden Ihre Daten (Name, E-Mail-Adresse) an systeme.io übertragen und dort gespeichert.
            </p>
            <p className="leading-relaxed text-muted mt-2">
              Systeme.io bindet Tracking-Skripte ein, die Drittanbieter-Cookies auf Ihrem Gerät setzen: RudderStack-Cookies (<code className="text-sm bg-surface px-1 rounded">rl_anonymous_id</code>, <code className="text-sm bg-surface px-1 rounded">rl_session</code>, <code className="text-sm bg-surface px-1 rounded">rl_user_id</code>) sowie PostHog-Cookies (<code className="text-sm bg-surface px-1 rounded">ph_phc_*</code>). Diese Cookies werden nur nach Ihrer Einwilligung gesetzt. Sie können Ihre Einwilligung jederzeit widerrufen.
            </p>
            <p className="leading-relaxed text-muted mt-2">
              Rechtsgrundlage für das E-Mail-Marketing: Art. 6 Abs. 1 lit. a DSGVO (Einwilligung). Rechtsgrundlage für Marketing-Cookies: Art. 6 Abs. 1 lit. a DSGVO i. V. m. § 25 Abs. 1 TTDSG. Weitere Informationen: <a href="https://systeme.io/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-ocean hover:underline">systeme.io/privacy-policy</a>.
            </p>
          </div>

          {/* 16 */}
          <div id="speicherung">
            <h2 className="font-display text-xl font-bold text-navy mb-3">16. Datenspeicherung und Backups</h2>

            <h3 className="font-sans font-semibold text-navy mb-2 text-base">Synology NAS (lokaler Backup-Speicher)</h3>
            <p className="leading-relaxed text-muted">
              Zur lokalen Datensicherung betreiben wir ein Synology NAS-System auf eigener Hardware mit Standort in Deutschland. Dieses System wird ausschließlich für Backup-Zwecke genutzt; es erfolgt kein Zugriff durch Drittanbieter. Rechtsgrundlage: Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an der Datensicherheit).
            </p>

            <h3 className="font-sans font-semibold text-navy mb-2 text-base mt-4">Nextcloud (selbst gehostet)</h3>
            <p className="leading-relaxed text-muted">
              Wir betreiben eine selbst gehostete Nextcloud-Instanz auf unserem Hetzner-Server (Deutschland/EU) für die Speicherung und ggf. den Austausch von Projektdateien mit Kunden. Die Daten verlassen die EU nicht. Rechtsgrundlage: Art. 6 Abs. 1 lit. b DSGVO (Vertragserfüllung).
            </p>

            <h3 className="font-sans font-semibold text-navy mb-2 text-base mt-4">Google Workspace (Drive, Gmail, Calendar)</h3>
            <p className="leading-relaxed text-muted">
              Für geschäftliche Kommunikation und Dokumentenverwaltung nutzen wir Google Workspace. Anbieter ist Google Ireland Limited, Gordon House, Barrow Street, Dublin 4, Irland. Im Rahmen der Geschäftskorrespondenz und Projektarbeit können Kontaktdaten von Kunden in Google Workspace verarbeitet werden (E-Mails, Dokumente, Kalendereinträge). Daten werden auf Servern von Google gespeichert, die sich auch außerhalb der EU befinden können.
            </p>
            <p className="leading-relaxed text-muted mt-2">
              Google Ireland Limited agiert als Auftragsverarbeiter gemäß einem mit uns abgeschlossenen Auftragsverarbeitungsvertrag. Datenübertragungen in die USA erfolgen auf Basis des EU-US Data Privacy Framework (DPF). Rechtsgrundlage: Art. 6 Abs. 1 lit. b DSGVO sowie Art. 6 Abs. 1 lit. f DSGVO. Weitere Informationen:{' '}
              <a href="https://workspace.google.com/intl/de/terms/privacy_terms.html" target="_blank" rel="noopener noreferrer" className="text-ocean hover:underline">Google Workspace Datenschutz</a>.
            </p>

            <h3 className="font-sans font-semibold text-navy mb-2 text-base mt-4">Microsoft 365 (Teams, OneDrive, Outlook)</h3>
            <p className="leading-relaxed text-muted">
              Für interne Kommunikation, Dateiablage und Collaboration nutzen wir Microsoft 365. Anbieter ist Microsoft Ireland Operations Ltd., One Microsoft Place, South County Business Park, Leopardstown, Dublin 18, Irland. Im Rahmen der Geschäftstätigkeit können Kontaktdaten und Kommunikationsinhalte von Kunden in Microsoft 365 verarbeitet werden (z. B. in Outlook, Teams oder OneDrive). Daten werden auf Servern von Microsoft gespeichert, die sich auch außerhalb der EU befinden können.
            </p>
            <p className="leading-relaxed text-muted mt-2">
              Microsoft Ireland Operations Ltd. agiert als Auftragsverarbeiter gemäß dem Microsoft-Datenschutzzusatz. Datenübertragungen in die USA erfolgen auf Basis des EU-US Data Privacy Framework (DPF) sowie Standardvertragsklauseln. Rechtsgrundlage: Art. 6 Abs. 1 lit. b DSGVO sowie Art. 6 Abs. 1 lit. f DSGVO. Weitere Informationen:{' '}
              <a href="https://privacy.microsoft.com/de-de/privacystatement" target="_blank" rel="noopener noreferrer" className="text-ocean hover:underline">privacy.microsoft.com</a>.
            </p>
          </div>

          {/* 17 */}
          <div id="supabase">
            <h2 className="font-display text-xl font-bold text-navy mb-3">17. Datenbank und Anwendungsdienste (Supabase)</h2>
            <p className="leading-relaxed text-muted">
              Als Datenbankdienst nutzen wir Supabase. Anbieter ist Supabase Inc., 970 Trestle Glen Rd, Oakland, CA 94610, USA. Supabase wird derzeit für interne Anwendungsdaten genutzt; personenbezogene Kundendaten werden dort aktuell nicht gespeichert. Datenübertragungen in die USA erfolgen auf Basis des EU-US Data Privacy Framework (DPF) sowie EU-Standardvertragsklauseln. Rechtsgrundlage: Art. 6 Abs. 1 lit. f DSGVO. Weitere Informationen: <a href="https://supabase.com/privacy" target="_blank" rel="noopener noreferrer" className="text-ocean hover:underline">supabase.com/privacy</a>.
            </p>
          </div>

          {/* 18 */}
          <div id="interne-tools">
            <h2 className="font-display text-xl font-bold text-navy mb-3">18. Interne Betriebswerkzeuge</h2>

            <h3 className="font-sans font-semibold text-navy mb-2 text-base">n8n (Workflow-Automation, selbst gehostet)</h3>
            <p className="leading-relaxed text-muted">
              Für die interne Prozessautomatisierung betreiben wir eine selbst gehostete n8n-Instanz auf unserem Hetzner-Server (Deutschland/EU). n8n wird ausschließlich für interne Workflows genutzt; es findet kein eigenständiger Kundendatenzugriff durch Dritte statt.
            </p>

            <h3 className="font-sans font-semibold text-navy mb-2 text-base mt-4">Notion (Projektmanagement)</h3>
            <p className="leading-relaxed text-muted">
              Für internes Projektmanagement nutzen wir Notion. Anbieter ist Notion Labs, Inc., 2300 Harrison Street, San Francisco, CA 94110, USA. Im Rahmen der Projektdokumentation können Kontaktdaten von Kunden intern verarbeitet werden. Datenübertragungen in die USA erfolgen auf Basis des EU-US Data Privacy Framework (DPF). Rechtsgrundlage: Art. 6 Abs. 1 lit. f DSGVO. Weitere Informationen: <a href="https://www.notion.so/privacy" target="_blank" rel="noopener noreferrer" className="text-ocean hover:underline">notion.so/privacy</a>.
            </p>
          </div>

          {/* 19 */}
          <div id="analytics">
            <h2 className="font-display text-xl font-bold text-navy mb-3">19. Website-Analyse (eigene Implementierung)</h2>
            <p className="leading-relaxed text-muted">
              Wir nutzen eine selbst entwickelte, datenschutzfreundliche Analysefunktion ohne Drittanbieter. Dabei werden anonymisierte Nutzungsdaten (aufgerufene Seiten, Scrolltiefe, Gerättyp, Referrer-URL, UTM-Parameter) ausschließlich im localStorage Ihres Browsers gespeichert. Die Daten verlassen Ihr Gerät nicht und werden nicht an externe Dienste übertragen. Es werden keine personenbezogenen Daten, keine IP-Adressen und keine geräteübergreifenden Identifikatoren erfasst. Rechtsgrundlage: Art. 6 Abs. 1 lit. f DSGVO.
            </p>
          </div>

          {/* 20 */}
          <div id="social">
            <h2 className="font-display text-xl font-bold text-navy mb-3">20. Präsenzen in sozialen Netzwerken</h2>
            <p className="leading-relaxed text-muted">
              Wir unterhalten Präsenzen in sozialen Netzwerken. Wenn Sie unsere Profile besuchen, können Nutzungsdaten (z. B. besuchte Inhalte, Interaktionen) sowie Gerätedaten (z. B. IP-Adresse, Browsertyp) durch die jeweiligen Plattformbetreiber erfasst werden. Wir haben als Profilbetreiber keinen Einfluss auf diese Datenverarbeitungen. Rechtsgrundlage für den Betrieb der Profile: Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an Öffentlichkeitsarbeit und Kundenkommunikation).
            </p>

            <h3 className="font-sans font-semibold text-navy mb-2 text-base mt-4">Instagram</h3>
            <p className="leading-relaxed text-muted">
              <strong className="text-navy">Dienstanbieter:</strong> Meta Platforms Ireland Limited, Merrion Road, Dublin 4, D04 X2K5, Irland. Verarbeitete Daten: Kontaktdaten, Inhaltsdaten, Nutzungsdaten, Meta- und Kommunikationsdaten. Rechtsgrundlage: Art. 6 Abs. 1 lit. f DSGVO. Grundlage für Drittlandtransfers in die USA: Data Privacy Framework (DPF). Datenschutzerklärung:{' '}
              <a href="https://privacycenter.instagram.com/policy/" target="_blank" rel="noopener noreferrer" className="text-ocean hover:underline">privacycenter.instagram.com/policy</a>.
            </p>

            <h3 className="font-sans font-semibold text-navy mb-2 text-base mt-4">LinkedIn</h3>
            <p className="leading-relaxed text-muted">
              <strong className="text-navy">Dienstanbieter:</strong> LinkedIn Ireland Unlimited Company, Wilton Plaza, Dublin 2, Irland. Verarbeitete Daten: Kontaktdaten, Inhaltsdaten, Nutzungsdaten, Profildaten (Berufsfunktion, Branche, Unternehmensgröße). Rechtsgrundlage: Art. 6 Abs. 1 lit. f DSGVO. Grundlage für Drittlandtransfers in die USA: Data Privacy Framework (DPF) sowie Standardvertragsklauseln. Datenschutzerklärung:{' '}
              <a href="https://www.linkedin.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-ocean hover:underline">linkedin.com/legal/privacy-policy</a>. Widerspruch (Opt-Out):{' '}
              <a href="https://www.linkedin.com/psettings/guest-controls/retargeting-opt-out" target="_blank" rel="noopener noreferrer" className="text-ocean hover:underline">linkedin.com/psettings</a>.
            </p>

            <h3 className="font-sans font-semibold text-navy mb-2 text-base mt-4">YouTube</h3>
            <p className="leading-relaxed text-muted">
              <strong className="text-navy">Dienstanbieter:</strong> Google Ireland Limited, Gordon House, Barrow Street, Dublin 4, Irland. Verarbeitete Daten: Nutzungsdaten, Meta- und Kommunikationsdaten. Rechtsgrundlage: Art. 6 Abs. 1 lit. f DSGVO. Grundlage für Drittlandtransfers in die USA: Data Privacy Framework (DPF). Datenschutzerklärung:{' '}
              <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-ocean hover:underline">policies.google.com/privacy</a>. Widerspruch (Opt-Out):{' '}
              <a href="https://myadcenter.google.com/personalizationoff" target="_blank" rel="noopener noreferrer" className="text-ocean hover:underline">myadcenter.google.com</a>.
            </p>
          </div>

          {/* 21 */}
          <div id="aenderungen">
            <h2 className="font-display text-xl font-bold text-navy mb-3">21. Änderungen dieser Datenschutzerklärung</h2>
            <p className="leading-relaxed text-muted">
              Wir behalten uns vor, diese Datenschutzerklärung bei Änderungen unserer Dienstleistungen, der eingesetzten Technologien oder der gesetzlichen Anforderungen anzupassen. Die jeweils aktuelle Fassung ist auf dieser Seite abrufbar. Bei wesentlichen Änderungen werden wir Sie gesondert informieren.
            </p>
          </div>

          {/* 22 */}
          <div id="begriffe">
            <h2 className="font-display text-xl font-bold text-navy mb-3">22. Begriffsdefinitionen</h2>
            <ul className="space-y-3 text-muted leading-relaxed">
              <li>
                <strong className="text-navy">Personenbezogene Daten:</strong> Alle Informationen, die sich auf eine identifizierte oder identifizierbare natürliche Person beziehen (Art. 4 Nr. 1 DSGVO).
              </li>
              <li>
                <strong className="text-navy">Verarbeitung:</strong> Jeder Vorgang im Zusammenhang mit personenbezogenen Daten (Art. 4 Nr. 2 DSGVO).
              </li>
              <li>
                <strong className="text-navy">Auftragsverarbeiter:</strong> Natürliche oder juristische Person, die personenbezogene Daten im Auftrag des Verantwortlichen verarbeitet (Art. 4 Nr. 8 DSGVO).
              </li>
              <li>
                <strong className="text-navy">Einwilligung:</strong> Jede freiwillig für den bestimmten Fall, in informierter Weise und unmissverständlich abgegebene Willensbekundung (Art. 4 Nr. 11 DSGVO).
              </li>
              <li>
                <strong className="text-navy">DPF (Data Privacy Framework):</strong> EU-US Data Privacy Framework — Angemessenheitsbeschluss der EU-Kommission vom Juli 2023, der Datentransfers in die USA unter bestimmten Voraussetzungen erlaubt.
              </li>
            </ul>
          </div>

          <div className="border-t border-gray-100 pt-6">
            <p className="text-sm text-muted">
              Bei Fragen zum Datenschutz:{' '}
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
