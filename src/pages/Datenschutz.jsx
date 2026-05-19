import { motion } from 'framer-motion'

const tocItems = [
  ['m716', 'Präambel'],
  ['m3', 'Verantwortlicher'],
  ['mOverview', 'Übersicht der Verarbeitungen'],
  ['m2427', 'Maßgebliche Rechtsgrundlagen'],
  ['m27', 'Sicherheitsmaßnahmen'],
  ['m25', 'Übermittlung von personenbezogenen Daten'],
  ['m24', 'Internationale Datentransfers'],
  ['m12', 'Allgemeine Informationen zur Datenspeicherung und Löschung'],
  ['m10', 'Rechte der betroffenen Personen'],
  ['m317', 'Geschäftliche Leistungen'],
  ['m326', 'Zahlungsverfahren'],
  ['m225', 'Bereitstellung des Onlineangebots und Webhosting'],
  ['m134', 'Einsatz von Cookies'],
  ['m367', 'Registrierung, Anmeldung und Nutzerkonto'],
  ['m432', 'Community Funktionen'],
  ['m451', 'Single-Sign-On-Anmeldung'],
  ['m104', 'Blogs und Publikationsmedien'],
  ['m182', 'Kontakt- und Anfrageverwaltung'],
  ['m296', 'Audioinhalte'],
  ['m17', 'Newsletter und elektronische Benachrichtigungen'],
  ['m408', 'Umfragen und Befragungen'],
  ['m263', 'Webanalyse, Monitoring und Optimierung'],
  ['m264', 'Onlinemarketing'],
  ['m135', 'Affiliate-Programme und Affiliate-Links'],
  ['m299', 'Kundenrezensionen und Bewertungsverfahren'],
  ['m136', 'Präsenzen in sozialen Netzwerken (Social Media)'],
  ['m328', 'Plug-ins und eingebettete Funktionen sowie Inhalte'],
  ['m723', 'Management, Organisation und Hilfswerkzeuge'],
  ['m15', 'Änderung und Aktualisierung'],
  ['m42', 'Begriffsdefinitionen'],
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
          {/* Präambel */}
          <div id="m716">
            <h2 className="font-display text-xl font-bold text-navy mb-3">Präambel</h2>
            <p className="leading-relaxed text-muted">
              Mit der folgenden Datenschutzerklärung möchten wir Sie darüber aufklären, welche Arten Ihrer
              personenbezogenen Daten (nachfolgend auch kurz als „Daten" bezeichnet) wir zu welchen Zwecken und
              in welchem Umfang verarbeiten. Die Datenschutzerklärung gilt für alle von uns durchgeführten
              Verarbeitungen personenbezogener Daten, sowohl im Rahmen der Erbringung unserer Leistungen als auch
              insbesondere auf unseren Webseiten, in mobilen Applikationen sowie innerhalb externer
              Onlinepräsenzen, wie z.&nbsp;B. unserer Social-Media-Profile (nachfolgend zusammenfassend bezeichnet
              als „Onlineangebot").
            </p>
            <p className="leading-relaxed text-muted mt-3">Die verwendeten Begriffe sind nicht geschlechtsspezifisch.</p>
            <p className="text-sm text-muted mt-3">Stand: 12. Mai 2026</p>
          </div>

          {/* Inhaltsverzeichnis */}
          <div>
            <h2 className="font-display text-xl font-bold text-navy mb-4">Inhaltsverzeichnis</h2>
            <ol className="space-y-1 list-decimal list-inside">
              {tocItems.map(([id, label]) => (
                <li key={id}>
                  <a href={`#${id}`} className="text-ocean text-sm hover:underline">{label}</a>
                </li>
              ))}
            </ol>
          </div>

          {/* 1 – Verantwortlicher */}
          <div id="m3">
            <h2 className="font-display text-xl font-bold text-navy mb-3">Verantwortlicher</h2>
            <p className="leading-relaxed text-muted">
              Nils Tenkotte<br />
              Gertrudisstraße 7<br />
              50859 Köln
            </p>
            <p className="leading-relaxed text-muted mt-3">Vertretungsberechtigte Personen: Nils Tenkotte</p>
            <p className="leading-relaxed text-muted mt-1">
              E-Mail-Adresse:{' '}
              <a href="mailto:nils@flowstate.foundation" className="text-ocean hover:underline">
                nils@flowstate.foundation
              </a>
            </p>
            <p className="leading-relaxed text-muted mt-1">
              Impressum:{' '}
              <a href="https://www.flowstate.foundation/impressum" target="_blank" rel="noopener noreferrer" className="text-ocean hover:underline">
                www.flowstate.foundation/impressum
              </a>
            </p>
          </div>

          {/* 2 – Übersicht der Verarbeitungen */}
          <div id="mOverview">
            <h2 className="font-display text-xl font-bold text-navy mb-3">Übersicht der Verarbeitungen</h2>
            <p className="leading-relaxed text-muted">
              Die nachfolgende Übersicht fasst die Arten der verarbeiteten Daten und die Zwecke ihrer Verarbeitung
              zusammen und verweist auf die betroffenen Personen.
            </p>

            <h3 className="font-sans font-semibold text-navy mt-5 mb-2 text-base">Arten der verarbeiteten Daten</h3>
            <ul className="list-disc list-inside space-y-1 text-muted leading-relaxed">
              <li>Bestandsdaten.</li>
              <li>Zahlungsdaten.</li>
              <li>Standortdaten.</li>
              <li>Kontaktdaten.</li>
              <li>Inhaltsdaten.</li>
              <li>Vertragsdaten.</li>
              <li>Nutzungsdaten.</li>
              <li>Meta-, Kommunikations- und Verfahrensdaten.</li>
              <li>Protokolldaten.</li>
            </ul>

            <h3 className="font-sans font-semibold text-navy mt-5 mb-2 text-base">Kategorien betroffener Personen</h3>
            <ul className="list-disc list-inside space-y-1 text-muted leading-relaxed">
              <li>Leistungsempfänger und Auftraggeber.</li>
              <li>Interessenten.</li>
              <li>Kommunikationspartner.</li>
              <li>Nutzer.</li>
              <li>Geschäfts- und Vertragspartner.</li>
              <li>Teilnehmer.</li>
            </ul>

            <h3 className="font-sans font-semibold text-navy mt-5 mb-2 text-base">Zwecke der Verarbeitung</h3>
            <ul className="list-disc list-inside space-y-1 text-muted leading-relaxed">
              <li>Erbringung vertraglicher Leistungen und Erfüllung vertraglicher Pflichten.</li>
              <li>Kommunikation.</li>
              <li>Sicherheitsmaßnahmen.</li>
              <li>Direktmarketing.</li>
              <li>Reichweitenmessung.</li>
              <li>Tracking.</li>
              <li>Büro- und Organisationsverfahren.</li>
              <li>Konversionsmessung.</li>
              <li>Zielgruppenbildung.</li>
              <li>Affiliate-Nachverfolgung.</li>
              <li>Organisations- und Verwaltungsverfahren.</li>
              <li>Feedback.</li>
              <li>Umfragen und Fragebögen.</li>
              <li>Marketing.</li>
              <li>Profile mit nutzerbezogenen Informationen.</li>
              <li>Anmeldeverfahren.</li>
              <li>Bereitstellung unseres Onlineangebotes und Nutzerfreundlichkeit.</li>
              <li>Informationstechnische Infrastruktur.</li>
              <li>Öffentlichkeitsarbeit.</li>
              <li>Geschäftsprozesse und betriebswirtschaftliche Verfahren.</li>
            </ul>
          </div>

          {/* 3 – Maßgebliche Rechtsgrundlagen */}
          <div id="m2427">
            <h2 className="font-display text-xl font-bold text-navy mb-3">Maßgebliche Rechtsgrundlagen</h2>
            <p className="leading-relaxed text-muted">
              <strong className="text-navy">Maßgebliche Rechtsgrundlagen nach der DSGVO:</strong> Im Folgenden
              erhalten Sie eine Übersicht der Rechtsgrundlagen der DSGVO, auf deren Basis wir personenbezogene
              Daten verarbeiten. Bitte nehmen Sie zur Kenntnis, dass neben den Regelungen der DSGVO nationale
              Datenschutzvorgaben in Ihrem bzw. unserem Wohn- oder Sitzland gelten können. Sollten ferner im
              Einzelfall speziellere Rechtsgrundlagen maßgeblich sein, teilen wir Ihnen diese in der
              Datenschutzerklärung mit.
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted leading-relaxed mt-3">
              <li>
                <strong className="text-navy">Einwilligung (Art. 6 Abs. 1 S. 1 lit. a) DSGVO)</strong> — Die
                betroffene Person hat ihre Einwilligung in die Verarbeitung der sie betreffenden
                personenbezogenen Daten für einen spezifischen Zweck oder mehrere bestimmte Zwecke gegeben.
              </li>
              <li>
                <strong className="text-navy">Vertragserfüllung und vorvertragliche Anfragen (Art. 6 Abs. 1 S. 1 lit. b) DSGVO)</strong> — Die
                Verarbeitung ist für die Erfüllung eines Vertrags, dessen Vertragspartei die betroffene Person
                ist, oder zur Durchführung vorvertraglicher Maßnahmen erforderlich, die auf Anfrage der
                betroffenen Person erfolgen.
              </li>
              <li>
                <strong className="text-navy">Rechtliche Verpflichtung (Art. 6 Abs. 1 S. 1 lit. c) DSGVO)</strong> — Die
                Verarbeitung ist zur Erfüllung einer rechtlichen Verpflichtung erforderlich, der der
                Verantwortliche unterliegt.
              </li>
              <li>
                <strong className="text-navy">Berechtigte Interessen (Art. 6 Abs. 1 S. 1 lit. f) DSGVO)</strong> — Die
                Verarbeitung ist zur Wahrung der berechtigten Interessen des Verantwortlichen oder eines
                Dritten notwendig, vorausgesetzt, dass die Interessen, Grundrechte und Grundfreiheiten der
                betroffenen Person, die den Schutz personenbezogener Daten verlangen, nicht überwiegen.
              </li>
            </ul>
            <p className="leading-relaxed text-muted mt-3">
              <strong className="text-navy">Nationale Datenschutzregelungen in Deutschland:</strong> Zusätzlich zu
              den Datenschutzregelungen der DSGVO gelten nationale Regelungen zum Datenschutz in Deutschland.
              Hierzu gehört insbesondere das Gesetz zum Schutz vor Missbrauch personenbezogener Daten bei der
              Datenverarbeitung (Bundesdatenschutzgesetz – BDSG). Das BDSG enthält insbesondere
              Spezialregelungen zum Recht auf Auskunft, zum Recht auf Löschung, zum Widerspruchsrecht, zur
              Verarbeitung besonderer Kategorien personenbezogener Daten, zur Verarbeitung für andere Zwecke und
              zur Übermittlung sowie automatisierten Entscheidungsfindung im Einzelfall einschließlich
              Profiling. Ferner können Landesdatenschutzgesetze der einzelnen Bundesländer zur Anwendung
              gelangen.
            </p>
          </div>

          {/* 4 – Sicherheitsmaßnahmen */}
          <div id="m27">
            <h2 className="font-display text-xl font-bold text-navy mb-3">Sicherheitsmaßnahmen</h2>
            <p className="leading-relaxed text-muted">
              Wir treffen nach Maßgabe der gesetzlichen Vorgaben unter Berücksichtigung des Stands der Technik,
              der Implementierungskosten und der Art, des Umfangs, der Umstände und der Zwecke der Verarbeitung
              sowie der unterschiedlichen Eintrittswahrscheinlichkeiten und des Ausmaßes der Bedrohung der Rechte
              und Freiheiten natürlicher Personen geeignete technische und organisatorische Maßnahmen, um ein dem
              Risiko angemessenes Schutzniveau zu gewährleisten.
            </p>
            <p className="leading-relaxed text-muted mt-3">
              Zu den Maßnahmen gehören insbesondere die Sicherung der Vertraulichkeit, Integrität und
              Verfügbarkeit von Daten durch Kontrolle des physischen und elektronischen Zugangs zu den Daten als
              auch des sie betreffenden Zugriffs, der Eingabe, der Weitergabe, der Sicherung der Verfügbarkeit
              und ihrer Trennung. Des Weiteren haben wir Verfahren eingerichtet, die eine Wahrnehmung von
              Betroffenenrechten, die Löschung von Daten und Reaktionen auf die Gefährdung der Daten
              gewährleisten. Ferner berücksichtigen wir den Schutz personenbezogener Daten bereits bei der
              Entwicklung bzw. Auswahl von Hardware, Software sowie Verfahren entsprechend dem Prinzip des
              Datenschutzes, durch Technikgestaltung und durch datenschutzfreundliche Voreinstellungen.
            </p>
            <p className="leading-relaxed text-muted mt-3">
              <strong className="text-navy">Sicherung von Online-Verbindungen durch TLS-/SSL-Verschlüsselungstechnologie (HTTPS):</strong> Um
              die Daten der Nutzer, die über unsere Online-Dienste übertragen werden, vor unerlaubten Zugriffen
              zu schützen, setzen wir auf die TLS-/SSL-Verschlüsselungstechnologie. Secure Sockets Layer (SSL)
              und Transport Layer Security (TLS) sind die Eckpfeiler der sicheren Datenübertragung im Internet.
              Diese Technologien verschlüsseln die Informationen, die zwischen der Website oder App und dem
              Browser des Nutzers (oder zwischen zwei Servern) übertragen werden, wodurch die Daten vor
              unbefugtem Zugriff geschützt sind. TLS, als die weiterentwickelte und sicherere Version von SSL,
              gewährleistet, dass alle Datenübertragungen den höchsten Sicherheitsstandards entsprechen. Wenn
              eine Website durch ein SSL-/TLS-Zertifikat gesichert ist, wird dies durch die Anzeige von HTTPS in
              der URL signalisiert. Dies dient als ein Indikator für die Nutzer, dass ihre Daten sicher und
              verschlüsselt übertragen werden.
            </p>
          </div>

          {/* 5 – Übermittlung */}
          <div id="m25">
            <h2 className="font-display text-xl font-bold text-navy mb-3">Übermittlung von personenbezogenen Daten</h2>
            <p className="leading-relaxed text-muted">
              Im Rahmen unserer Verarbeitung von personenbezogenen Daten kommt es vor, dass diese an andere
              Stellen, Unternehmen, rechtlich selbstständige Organisationseinheiten oder Personen übermittelt
              beziehungsweise ihnen gegenüber offengelegt werden. Zu den Empfängern dieser Daten können z.&nbsp;B.
              mit IT-Aufgaben beauftragte Dienstleister gehören oder Anbieter von Diensten und Inhalten, die in
              eine Website eingebunden sind. In solchen Fällen beachten wir die gesetzlichen Vorgaben und
              schließen insbesondere entsprechende Verträge bzw. Vereinbarungen, die dem Schutz Ihrer Daten
              dienen, mit den Empfängern Ihrer Daten ab.
            </p>
          </div>

          {/* 6 – Internationale Datentransfers */}
          <div id="m24">
            <h2 className="font-display text-xl font-bold text-navy mb-3">Internationale Datentransfers</h2>
            <p className="leading-relaxed text-muted">
              <strong className="text-navy">Datenverarbeitung in Drittländern:</strong> Sofern wir Daten in ein
              Drittland (d.&nbsp;h. außerhalb der Europäischen Union (EU) oder des Europäischen Wirtschaftsraums
              (EWR)) übermitteln oder dies im Rahmen der Nutzung von Diensten Dritter oder der Offenlegung bzw.
              Übermittlung von Daten an andere Personen, Stellen oder Unternehmen geschieht, erfolgt dies stets
              im Einklang mit den gesetzlichen Vorgaben.
            </p>
            <p className="leading-relaxed text-muted mt-3">
              Für Datenübermittlungen in die USA stützen wir uns vorrangig auf das Data Privacy Framework (DPF),
              welches durch einen Angemessenheitsbeschluss der EU-Kommission vom 10.07.2023 als sicherer
              Rechtsrahmen anerkannt wurde. Zusätzlich haben wir mit den jeweiligen Anbietern
              Standardvertragsklauseln abgeschlossen, die den Vorgaben der EU-Kommission entsprechen und
              vertragliche Verpflichtungen zum Schutz Ihrer Daten festlegen.
            </p>
            <p className="leading-relaxed text-muted mt-3">
              Diese zweifache Absicherung gewährleistet einen umfassenden Schutz Ihrer Daten: Das DPF bildet die
              primäre Schutzebene, während die Standardvertragsklauseln als zusätzliche Sicherheit dienen.
              Sollten sich Änderungen im Rahmen des DPF ergeben, greifen die Standardvertragsklauseln als
              zuverlässige Rückfalloption ein. So stellen wir sicher, dass Ihre Daten auch bei etwaigen
              politischen oder rechtlichen Veränderungen stets angemessen geschützt bleiben.
            </p>
            <p className="leading-relaxed text-muted mt-3">
              Bei den einzelnen Diensteanbietern informieren wir Sie darüber, ob sie nach dem DPF zertifiziert
              sind und ob Standardvertragsklauseln vorliegen. Weitere Informationen zum DPF und eine Liste der
              zertifizierten Unternehmen finden Sie auf der Website des US-Handelsministeriums unter{' '}
              <a href="https://www.dataprivacyframework.gov/" target="_blank" rel="noopener noreferrer" className="text-ocean hover:underline">
                https://www.dataprivacyframework.gov/
              </a>{' '}
              (in englischer Sprache).
            </p>
            <p className="leading-relaxed text-muted mt-3">
              Für Datenübermittlungen in andere Drittländer gelten entsprechende Sicherheitsmaßnahmen,
              insbesondere Standardvertragsklauseln, ausdrückliche Einwilligungen oder gesetzlich erforderliche
              Übermittlungen. Informationen zu Drittlandtransfers und geltenden Angemessenheitsbeschlüssen
              können Sie dem Informationsangebot der EU-Kommission entnehmen:{' '}
              <a href="https://commission.europa.eu/law/law-topic/data-protection/international-dimension-data-protection_en?prefLang=de" target="_blank" rel="noopener noreferrer" className="text-ocean hover:underline">
                commission.europa.eu
              </a>.
            </p>
          </div>

          {/* 7 – Datenspeicherung und Löschung */}
          <div id="m12">
            <h2 className="font-display text-xl font-bold text-navy mb-3">Allgemeine Informationen zur Datenspeicherung und Löschung</h2>
            <p className="leading-relaxed text-muted">
              Wir löschen personenbezogene Daten, die wir verarbeiten, gemäß den gesetzlichen Bestimmungen,
              sobald die zugrundeliegenden Einwilligungen widerrufen werden oder keine weiteren rechtlichen
              Grundlagen für die Verarbeitung bestehen. Dies betrifft Fälle, in denen der ursprüngliche
              Verarbeitungszweck entfällt oder die Daten nicht mehr benötigt werden. Ausnahmen von dieser
              Regelung bestehen, wenn gesetzliche Pflichten oder besondere Interessen eine längere Aufbewahrung
              oder Archivierung der Daten erfordern.
            </p>
            <p className="leading-relaxed text-muted mt-3">
              Insbesondere müssen Daten, die aus handels- oder steuerrechtlichen Gründen aufbewahrt werden
              müssen oder deren Speicherung notwendig ist zur Rechtsverfolgung oder zum Schutz der Rechte anderer
              natürlicher oder juristischer Personen, entsprechend archiviert werden.
            </p>
            <p className="leading-relaxed text-muted mt-3">
              <strong className="text-navy">Aufbewahrung und Löschung von Daten:</strong> Die folgenden
              allgemeinen Fristen gelten für die Aufbewahrung und Archivierung nach deutschem Recht:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted leading-relaxed mt-3">
              <li>
                <strong className="text-navy">10 Jahre</strong> — Aufbewahrungsfrist für Bücher und
                Aufzeichnungen, Jahresabschlüsse, Inventare, Lageberichte, Eröffnungsbilanz sowie die zu ihrem
                Verständnis erforderlichen Arbeitsanweisungen und sonstigen Organisationsunterlagen
                (§ 147 Abs. 1 Nr. 1 i.V.m. Abs. 3 AO, § 14b Abs. 1 UStG, § 257 Abs. 1 Nr. 1 i.V.m. Abs. 4 HGB).
              </li>
              <li>
                <strong className="text-navy">8 Jahre</strong> — Buchungsbelege, wie z.&nbsp;B. Rechnungen und
                Kostenbelege (§ 147 Abs. 1 Nr. 4 und 4a i.V.m. Abs. 3 Satz 1 AO sowie § 257 Abs. 1 Nr. 4 i.V.m.
                Abs. 4 HGB).
              </li>
              <li>
                <strong className="text-navy">6 Jahre</strong> — Übrige Geschäftsunterlagen: empfangene Handels-
                oder Geschäftsbriefe, Wiedergaben der abgesandten Handels- oder Geschäftsbriefe, sonstige
                Unterlagen, soweit sie für die Besteuerung von Bedeutung sind (§ 147 Abs. 1 Nr. 2, 3, 5 i.V.m.
                Abs. 3 AO, § 257 Abs. 1 Nr. 2 u. 3 i.V.m. Abs. 4 HGB).
              </li>
              <li>
                <strong className="text-navy">3 Jahre</strong> — Daten, die erforderlich sind, um potenzielle
                Gewährleistungs- und Schadensersatzansprüche oder ähnliche vertragliche Ansprüche und Rechte zu
                berücksichtigen, basierend auf der regulären gesetzlichen Verjährungsfrist (§§ 195, 199 BGB).
              </li>
            </ul>
            <p className="leading-relaxed text-muted mt-3">
              <strong className="text-navy">Fristbeginn mit Ablauf des Jahres:</strong> Beginnt eine Frist nicht
              ausdrücklich zu einem bestimmten Datum und beträgt sie mindestens ein Jahr, so startet sie
              automatisch am Ende des Kalenderjahres, in dem das fristauslösende Ereignis eingetreten ist. Im
              Fall laufender Vertragsverhältnisse ist das fristauslösende Ereignis der Zeitpunkt des
              Wirksamwerdens der Kündigung oder sonstige Beendigung des Rechtsverhältnisses.
            </p>
          </div>

          {/* 8 – Rechte der betroffenen Personen */}
          <div id="m10">
            <h2 className="font-display text-xl font-bold text-navy mb-3">Rechte der betroffenen Personen</h2>
            <p className="leading-relaxed text-muted">
              <strong className="text-navy">Rechte der betroffenen Personen aus der DSGVO:</strong> Ihnen stehen
              als Betroffene nach der DSGVO verschiedene Rechte zu, die sich insbesondere aus Art. 15 bis 21
              DSGVO ergeben:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted leading-relaxed mt-3">
              <li>
                <strong className="text-navy">Widerspruchsrecht:</strong> Sie haben das Recht, aus Gründen, die
                sich aus Ihrer besonderen Situation ergeben, jederzeit gegen die Verarbeitung der Sie
                betreffenden personenbezogenen Daten, die aufgrund von Art. 6 Abs. 1 lit. e oder f DSGVO
                erfolgt, Widerspruch einzulegen; dies gilt auch für ein auf diese Bestimmungen gestütztes
                Profiling. Werden die Sie betreffenden personenbezogenen Daten verarbeitet, um Direktwerbung zu
                betreiben, haben Sie das Recht, jederzeit Widerspruch gegen die Verarbeitung zum Zwecke
                derartiger Werbung einzulegen.
              </li>
              <li>
                <strong className="text-navy">Widerrufsrecht bei Einwilligungen:</strong> Sie haben das Recht,
                erteilte Einwilligungen jederzeit zu widerrufen.
              </li>
              <li>
                <strong className="text-navy">Auskunftsrecht:</strong> Sie haben das Recht, eine Bestätigung
                darüber zu verlangen, ob betreffende Daten verarbeitet werden und auf Auskunft über diese Daten
                sowie auf weitere Informationen und Kopie der Daten entsprechend den gesetzlichen Vorgaben.
              </li>
              <li>
                <strong className="text-navy">Recht auf Berichtigung:</strong> Sie haben entsprechend den
                gesetzlichen Vorgaben das Recht, die Vervollständigung der Sie betreffenden Daten oder die
                Berichtigung der Sie betreffenden unrichtigen Daten zu verlangen.
              </li>
              <li>
                <strong className="text-navy">Recht auf Löschung und Einschränkung der Verarbeitung:</strong> Sie
                haben nach Maßgabe der gesetzlichen Vorgaben das Recht, zu verlangen, dass Sie betreffende Daten
                unverzüglich gelöscht werden, bzw. alternativ eine Einschränkung der Verarbeitung der Daten zu
                verlangen.
              </li>
              <li>
                <strong className="text-navy">Recht auf Datenübertragbarkeit:</strong> Sie haben das Recht, Sie
                betreffende Daten, die Sie uns bereitgestellt haben, nach Maßgabe der gesetzlichen Vorgaben in
                einem strukturierten, gängigen und maschinenlesbaren Format zu erhalten oder deren Übermittlung
                an einen anderen Verantwortlichen zu fordern.
              </li>
              <li>
                <strong className="text-navy">Beschwerde bei Aufsichtsbehörde:</strong> Sie haben unbeschadet
                eines anderweitigen verwaltungsrechtlichen oder gerichtlichen Rechtsbehelfs das Recht auf
                Beschwerde bei einer Aufsichtsbehörde, insbesondere in dem Mitgliedstaat ihres gewöhnlichen
                Aufenthaltsorts, ihres Arbeitsplatzes oder des Orts des mutmaßlichen Verstoßes, wenn Sie der
                Ansicht sind, dass die Verarbeitung der Sie betreffenden personenbezogenen Daten gegen die
                Vorgaben der DSGVO verstößt.
              </li>
            </ul>
          </div>

          {/* 9 – Geschäftliche Leistungen */}
          <div id="m317">
            <h2 className="font-display text-xl font-bold text-navy mb-3">Geschäftliche Leistungen</h2>
            <p className="leading-relaxed text-muted">
              Wir verarbeiten personenbezogene Daten unserer Vertrags- und Geschäftspartner, etwa Kunden,
              Auftraggeber, Interessenten, Lieferanten und sonstige Kooperationspartner (zusammenfassend
              „Vertragspartner"), zur Anbahnung, Durchführung und Abwicklung von Vertragsverhältnissen sowie
              vergleichbaren Rechtsverhältnissen.
            </p>
            <p className="leading-relaxed text-muted mt-3">
              Verarbeitet werden insbesondere Stammdaten wie Name, Anschrift und ggf. Firma, Kontaktdaten wie
              E-Mail-Adresse und Telefonnummer, Vertrags- und Leistungsdaten, Zahlungs- und Abrechnungsdaten
              sowie Kommunikationsinhalte und -historien.
            </p>
            <p className="leading-relaxed text-muted mt-3">
              <strong className="text-navy">Verarbeitete Datenarten:</strong> Bestandsdaten; Zahlungsdaten;
              Kontaktdaten; Vertragsdaten.{' '}
              <strong className="text-navy">Betroffene Personen:</strong> Leistungsempfänger und Auftraggeber;
              Interessenten; Geschäfts- und Vertragspartner.{' '}
              <strong className="text-navy">Rechtsgrundlagen:</strong> Vertragserfüllung und vorvertragliche
              Anfragen (Art. 6 Abs. 1 S. 1 lit. b) DSGVO); Rechtliche Verpflichtung (Art. 6 Abs. 1 S. 1 lit. c)
              DSGVO); Berechtigte Interessen (Art. 6 Abs. 1 S. 1 lit. f) DSGVO).
            </p>

            <h3 className="font-sans font-semibold text-navy mt-5 mb-2 text-base">Weitere Hinweise</h3>
            <ul className="list-disc list-inside space-y-2 text-muted leading-relaxed">
              <li>
                <strong className="text-navy">Agenturdienstleistungen:</strong> Wir verarbeiten die Daten unserer
                Kunden im Rahmen unserer vertraglichen Leistungen, zu denen z.&nbsp;B. konzeptionelle und
                strategische Beratung, Kampagnenplanung, Software- und Designentwicklung/-beratung oder -pflege,
                Umsetzung von Kampagnen und Prozessen, Handling, Serveradministration, Datenanalyse/
                Beratungsleistungen und Schulungsleistungen gehören können.{' '}
                <strong className="text-navy">Rechtsgrundlage:</strong> Vertragserfüllung und vorvertragliche
                Anfragen (Art. 6 Abs. 1 S. 1 lit. b) DSGVO).
              </li>
              <li>
                <strong className="text-navy">Projekt- und Entwicklungsleistungen:</strong> Wir verarbeiten die
                Daten unserer Kunden sowie Auftraggeber, um ihnen die Auswahl, den Erwerb bzw. die
                Beauftragung der gewählten Leistungen oder Werke sowie verbundener Tätigkeiten als auch deren
                Bezahlung und Zurverfügungstellung zu ermöglichen.{' '}
                <strong className="text-navy">Rechtsgrundlage:</strong> Vertragserfüllung und vorvertragliche
                Anfragen (Art. 6 Abs. 1 S. 1 lit. b) DSGVO).
              </li>
            </ul>
          </div>

          {/* 10 – Zahlungsverfahren */}
          <div id="m326">
            <h2 className="font-display text-xl font-bold text-navy mb-3">Zahlungsverfahren</h2>
            <p className="leading-relaxed text-muted">
              Im Rahmen von Vertrags- und sonstigen Rechtsbeziehungen bieten wir den betroffenen Personen
              effiziente und sichere Zahlungsmöglichkeiten an und setzen hierzu neben Banken und
              Kreditinstituten weitere Dienstleister ein (zusammenfassend „Zahlungsdienstleister"). Der
              Zahlungsverkehr erfolgt ausschließlich über verschlüsselte Verbindungen.
            </p>
            <p className="leading-relaxed text-muted mt-3">
              <strong className="text-navy">Rechtsgrundlagen:</strong> Vertragserfüllung und vorvertragliche
              Anfragen (Art. 6 Abs. 1 S. 1 lit. b) DSGVO); Berechtigte Interessen (Art. 6 Abs. 1 S. 1 lit. f)
              DSGVO).
            </p>

            <h3 className="font-sans font-semibold text-navy mt-5 mb-2 text-base">Eingesetzte Zahlungsdienstleister</h3>
            <ul className="list-disc list-inside space-y-2 text-muted leading-relaxed">
              <li>
                <strong className="text-navy">Google Pay</strong> — Google Ireland Limited, Gordon House, Barrow
                Street, Dublin 4, Irland.{' '}
                <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-ocean hover:underline">
                  Datenschutzerklärung
                </a>
              </li>
              <li>
                <strong className="text-navy">Mastercard</strong> — Mastercard Europe SA, Chaussée de Tervuren
                198A, B-1410 Waterloo, Belgien.{' '}
                <a href="https://www.mastercard.de/de-de/datenschutz.html" target="_blank" rel="noopener noreferrer" className="text-ocean hover:underline">
                  Datenschutzerklärung
                </a>
              </li>
              <li>
                <strong className="text-navy">PayPal</strong> — PayPal (Europe) S.à r.l. et Cie, S.C.A.,
                22-24 Boulevard Royal, L-2449 Luxemburg.{' '}
                <a href="https://www.paypal.com/de/legalhub/paypal/privacy-full" target="_blank" rel="noopener noreferrer" className="text-ocean hover:underline">
                  Datenschutzerklärung
                </a>
              </li>
              <li>
                <strong className="text-navy">Stripe</strong> — Stripe, Inc., 510 Townsend Street, San Francisco,
                CA 94103, USA. Grundlage Drittlandtransfers: Data Privacy Framework (DPF).{' '}
                <a href="https://stripe.com/de/privacy" target="_blank" rel="noopener noreferrer" className="text-ocean hover:underline">
                  Datenschutzerklärung
                </a>
              </li>
            </ul>
          </div>

          {/* 11 – Webhosting */}
          <div id="m225">
            <h2 className="font-display text-xl font-bold text-navy mb-3">Bereitstellung des Onlineangebots und Webhosting</h2>
            <p className="leading-relaxed text-muted">
              Wir verarbeiten die Daten der Nutzer, um ihnen unsere Online-Dienste zur Verfügung stellen zu
              können. Zu diesem Zweck verarbeiten wir die IP-Adresse des Nutzers, die notwendig ist, um die
              Inhalte und Funktionen unserer Online-Dienste an den Browser oder das Endgerät der Nutzer zu
              übermitteln.
            </p>
            <p className="leading-relaxed text-muted mt-3">
              <strong className="text-navy">Verarbeitete Datenarten:</strong> Nutzungsdaten; Meta-,
              Kommunikations- und Verfahrensdaten; Protokolldaten.{' '}
              <strong className="text-navy">Rechtsgrundlagen:</strong> Berechtigte Interessen (Art. 6 Abs. 1 S. 1
              lit. f) DSGVO).
            </p>

            <h3 className="font-sans font-semibold text-navy mt-5 mb-2 text-base">Weitere Hinweise</h3>
            <ul className="list-disc list-inside space-y-3 text-muted leading-relaxed">
              <li>
                <strong className="text-navy">Bereitstellung Onlineangebot auf gemietetem Speicherplatz:</strong>{' '}
                Für die Bereitstellung unseres Onlineangebotes nutzen wir Speicherplatz, Rechenkapazität und
                Software, die wir von einem entsprechenden Serveranbieter (auch „Webhoster" genannt) mieten oder
                anderweitig beziehen. Rechtsgrundlage: Art. 6 Abs. 1 S. 1 lit. f) DSGVO.
              </li>
              <li>
                <strong className="text-navy">Erhebung von Zugriffsdaten und Logfiles:</strong> Der Zugriff auf
                unser Onlineangebot wird in Form von sogenannten „Server-Logfiles" protokolliert. Zu den
                Serverlogfiles können die Adresse und der Name der abgerufenen Webseiten und Dateien, Datum und
                Uhrzeit des Abrufs, übertragene Datenmengen, Meldung über erfolgreichen Abruf, Browsertyp nebst
                Version, das Betriebssystem des Nutzers, Referrer URL sowie IP-Adressen gehören. Logfile-Informationen
                werden für die Dauer von maximal 30 Tagen gespeichert und danach gelöscht oder anonymisiert.
              </li>
              <li>
                <strong className="text-navy">Hetzner:</strong> Leistungen auf dem Gebiet der Bereitstellung von
                informationstechnischer Infrastruktur und verbundenen Dienstleistungen. Hetzner Online GmbH,
                Industriestr. 25, 91710 Gunzenhausen, Deutschland. Rechtsgrundlage: Art. 6 Abs. 1 S. 1 lit. f)
                DSGVO. Ausschließliche Datenverarbeitung in Deutschland/EU.{' '}
                <a href="https://www.hetzner.com/de/rechtliches/datenschutz" target="_blank" rel="noopener noreferrer" className="text-ocean hover:underline">
                  Datenschutzerklärung
                </a>
              </li>
            </ul>
          </div>

          {/* 12 – Cookies */}
          <div id="m134">
            <h2 className="font-display text-xl font-bold text-navy mb-3">Einsatz von Cookies</h2>
            <p className="leading-relaxed text-muted">
              Unter dem Begriff „Cookies" werden Funktionen, die Informationen auf Endgeräten der Nutzer
              speichern und aus ihnen auslesen, verstanden. Wir verwenden Cookies gemäß den gesetzlichen
              Vorschriften. Dazu holen wir, wenn erforderlich, vorab die Zustimmung der Nutzer ein. Ist eine
              Zustimmung nicht notwendig, setzen wir auf unsere berechtigten Interessen.
            </p>
            <p className="leading-relaxed text-muted mt-3">
              <strong className="text-navy">Speicherdauer:</strong> Im Hinblick auf die Speicherdauer werden
              folgende Arten von Cookies unterschieden:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted leading-relaxed mt-2">
              <li>
                <strong className="text-navy">Temporäre Cookies (Session-Cookies):</strong> Werden spätestens
                gelöscht, nachdem ein Nutzer ein Onlineangebot verlassen und sein Endgerät geschlossen hat.
              </li>
              <li>
                <strong className="text-navy">Permanente Cookies:</strong> Bleiben auch nach dem Schließen des
                Endgeräts gespeichert. So können beispielsweise der Log-in-Status gespeichert und bevorzugte
                Inhalte direkt angezeigt werden, wenn der Nutzer eine Website erneut besucht. Die Speicherdauer
                kann bis zu zwei Jahre betragen.
              </li>
            </ul>
            <p className="leading-relaxed text-muted mt-3">
              <strong className="text-navy">Allgemeine Hinweise zum Widerruf und Widerspruch (Opt-out):</strong>{' '}
              Nutzer können die von ihnen abgegebenen Einwilligungen jederzeit widerrufen und zudem einen
              Widerspruch gegen die Verarbeitung entsprechend den gesetzlichen Vorgaben, auch mittels der
              Privatsphäre-Einstellungen ihres Browsers, erklären.
            </p>
            <p className="leading-relaxed text-muted mt-3">
              <strong className="text-navy">Verarbeitete Datenarten:</strong> Meta-, Kommunikations- und
              Verfahrensdaten.{' '}
              <strong className="text-navy">Rechtsgrundlagen:</strong> Berechtigte Interessen (Art. 6 Abs. 1 S. 1
              lit. f) DSGVO); Einwilligung (Art. 6 Abs. 1 S. 1 lit. a) DSGVO).
            </p>
          </div>

          {/* 13 – Registrierung */}
          <div id="m367">
            <h2 className="font-display text-xl font-bold text-navy mb-3">Registrierung, Anmeldung und Nutzerkonto</h2>
            <p className="leading-relaxed text-muted">
              Nutzer können ein Nutzerkonto anlegen. Im Rahmen der Registrierung werden den Nutzern die
              erforderlichen Pflichtangaben mitgeteilt und zu Zwecken der Bereitstellung des Nutzerkontos auf
              Grundlage vertraglicher Pflichterfüllung verarbeitet. Zu den verarbeiteten Daten gehören
              insbesondere die Login-Informationen (Nutzername, Passwort sowie eine E-Mail-Adresse).
            </p>
            <p className="leading-relaxed text-muted mt-3">
              Im Rahmen der Inanspruchnahme unserer Registrierungs- und Anmeldefunktionen sowie der Nutzung des
              Nutzerkontos speichern wir die IP-Adresse und den Zeitpunkt der jeweiligen Nutzerhandlung.
            </p>
            <p className="leading-relaxed text-muted mt-3">
              <strong className="text-navy">Rechtsgrundlagen:</strong> Vertragserfüllung und vorvertragliche
              Anfragen (Art. 6 Abs. 1 S. 1 lit. b) DSGVO); Berechtigte Interessen (Art. 6 Abs. 1 S. 1 lit. f)
              DSGVO).
            </p>

            <h3 className="font-sans font-semibold text-navy mt-5 mb-2 text-base">Weitere Hinweise</h3>
            <ul className="list-disc list-inside space-y-2 text-muted leading-relaxed">
              <li>
                <strong className="text-navy">Registrierung mit Pseudonymen:</strong> Nutzer dürfen statt
                Klarnamen Pseudonyme als Nutzernamen verwenden.
              </li>
              <li>
                <strong className="text-navy">Profile der Nutzer sind öffentlich:</strong> Die Profile der Nutzer
                sind öffentlich sichtbar und zugänglich.
              </li>
              <li>
                <strong className="text-navy">Einstellung der Sichtbarkeit von Profilen:</strong> Die Nutzer
                können mittels Einstellungen bestimmen, in welchem Umfang ihre Profile für die Öffentlichkeit
                oder nur für bestimmte Personengruppen sichtbar bzw. zugänglich sind.
              </li>
              <li>
                <strong className="text-navy">Löschung von Daten nach Kündigung:</strong> Wenn Nutzer ihr
                Nutzerkonto gekündigt haben, werden deren Daten im Hinblick auf das Nutzerkonto, vorbehaltlich
                einer gesetzlichen Erlaubnis, Pflicht oder Einwilligung der Nutzer, gelöscht.
              </li>
              <li>
                <strong className="text-navy">Keine Aufbewahrungspflicht für Daten:</strong> Es obliegt den
                Nutzern, ihre Daten bei erfolgter Kündigung vor dem Vertragsende zu sichern. Wir sind
                berechtigt, sämtliche während der Vertragsdauer gespeicherte Daten des Nutzers unwiederbringlich
                zu löschen.
              </li>
            </ul>
          </div>

          {/* 14 – Community */}
          <div id="m432">
            <h2 className="font-display text-xl font-bold text-navy mb-3">Community Funktionen</h2>
            <p className="leading-relaxed text-muted">
              Die von uns bereitgestellten Community Funktionen erlauben es Nutzern miteinander in
              Konversationen oder sonst miteinander in einen Austausch zu treten. Hierbei bitten wir zu
              beachten, dass die Nutzung der Communityfunktionen nur unter Beachtung der geltenden Rechtslage,
              unserer Bedingungen und Richtlinien sowie der Rechte anderer Nutzer und Dritter gestattet ist.
            </p>
            <p className="leading-relaxed text-muted mt-3">
              <strong className="text-navy">Verarbeitete Datenarten:</strong> Bestandsdaten; Nutzungsdaten.{' '}
              <strong className="text-navy">Rechtsgrundlagen:</strong> Vertragserfüllung und vorvertragliche
              Anfragen (Art. 6 Abs. 1 S. 1 lit. b) DSGVO); Berechtigte Interessen (Art. 6 Abs. 1 S. 1 lit. f)
              DSGVO).
            </p>
            <h3 className="font-sans font-semibold text-navy mt-5 mb-2 text-base">Weitere Hinweise</h3>
            <ul className="list-disc list-inside space-y-2 text-muted leading-relaxed">
              <li>
                <strong className="text-navy">Einstellung der Sichtbarkeit von Beiträgen:</strong> Die Nutzer
                können mittels Einstellungen bestimmen, in welchem Umfang die von ihnen erstellten Beiträge und
                Inhalte für die Öffentlichkeit oder nur für bestimmte Personen oder Gruppen sichtbar sind.
              </li>
              <li>
                <strong className="text-navy">Recht zur Löschung von Inhalten:</strong> Die Löschung von
                Beiträgen, Inhalten oder Angaben der Nutzer ist nach einer sachgerechten Abwägung zulässig,
                soweit konkrete Anhaltspunkte dafür bestehen, dass sie einen Verstoß gegen gesetzliche Regeln,
                unsere Vorgaben oder Rechte Dritter darstellen.
              </li>
              <li>
                <strong className="text-navy">Schutz eigener Daten:</strong> Die Nutzer entscheiden selbst,
                welche Daten sie über sich innerhalb unseres Onlineangebotes preisgeben. Wir bitten die Nutzer
                ihre Daten zu schützen und persönliche Daten nur mit Bedacht und nur im erforderlichen Umfang zu
                veröffentlichen.
              </li>
            </ul>
          </div>

          {/* 15 – Single-Sign-On */}
          <div id="m451">
            <h2 className="font-display text-xl font-bold text-navy mb-3">Single-Sign-On-Anmeldung</h2>
            <p className="leading-relaxed text-muted">
              Als „Single-Sign-On" oder „Single-Sign-On-Anmeldung bzw. -Authentifizierung" werden Verfahren
              bezeichnet, die es Nutzern erlauben, sich mit Hilfe eines Nutzerkontos bei einem Anbieter von
              Single-Sign-On-Verfahren (z.&nbsp;B. einem sozialen Netzwerk), auch bei unserem Onlineangebot,
              anzumelden.
            </p>
            <p className="leading-relaxed text-muted mt-3">
              Die Authentifizierung erfolgt direkt bei dem jeweiligen Single-Sign-On-Anbieter. Im Rahmen einer
              solchen Authentifizierung erhalten wir eine Nutzer-ID sowie – abhängig von den gewählten
              Datenfreigaben – ggf. E-Mail-Adresse und Benutzername. Das Passwort ist für uns weder einsehbar
              noch wird es von uns gespeichert.
            </p>
            <p className="leading-relaxed text-muted mt-3">
              <strong className="text-navy">Rechtsgrundlagen:</strong> Vertragserfüllung und vorvertragliche
              Anfragen (Art. 6 Abs. 1 S. 1 lit. b) DSGVO); Berechtigte Interessen (Art. 6 Abs. 1 S. 1 lit. f)
              DSGVO).
            </p>

            <h3 className="font-sans font-semibold text-navy mt-5 mb-2 text-base">Eingesetzte Dienste</h3>
            <ul className="list-disc list-inside space-y-2 text-muted leading-relaxed">
              <li>
                <strong className="text-navy">Apple Single-Sign-On:</strong> Apple Inc., Infinite Loop,
                Cupertino, CA 95014, USA. Rechtsgrundlage: Art. 6 Abs. 1 S. 1 lit. f) DSGVO.{' '}
                <a href="https://www.apple.com/legal/privacy/de-ww/" target="_blank" rel="noopener noreferrer" className="text-ocean hover:underline">
                  Datenschutzerklärung
                </a>
              </li>
              <li>
                <strong className="text-navy">Google Single-Sign-On:</strong> Google Ireland Limited, Gordon
                House, Barrow Street, Dublin 4, Irland. Rechtsgrundlage: Art. 6 Abs. 1 S. 1 lit. f) DSGVO.
                Grundlage Drittlandtransfers: Data Privacy Framework (DPF).{' '}
                <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-ocean hover:underline">
                  Datenschutzerklärung
                </a>{' '}
                | Opt-Out:{' '}
                <a href="https://myadcenter.google.com/" target="_blank" rel="noopener noreferrer" className="text-ocean hover:underline">
                  myadcenter.google.com
                </a>
              </li>
            </ul>
          </div>

          {/* 16 – Blogs */}
          <div id="m104">
            <h2 className="font-display text-xl font-bold text-navy mb-3">Blogs und Publikationsmedien</h2>
            <p className="leading-relaxed text-muted">
              Wir nutzen Blogs oder vergleichbare Mittel der Onlinekommunikation und Publikation
              (nachfolgend „Publikationsmedium"). Die Daten der Leser werden für die Zwecke des
              Publikationsmediums nur insoweit verarbeitet, als es für dessen Darstellung und die Kommunikation
              zwischen Autoren und Lesern oder aus Gründen der Sicherheit erforderlich ist.
            </p>
            <p className="leading-relaxed text-muted mt-3">
              <strong className="text-navy">Rechtsgrundlagen:</strong> Berechtigte Interessen (Art. 6 Abs. 1 S. 1
              lit. f) DSGVO).
            </p>
            <h3 className="font-sans font-semibold text-navy mt-5 mb-2 text-base">Weitere Hinweise</h3>
            <ul className="list-disc list-inside space-y-2 text-muted leading-relaxed">
              <li>
                <strong className="text-navy">Kommentare und Beiträge:</strong> Wenn Nutzer Kommentare oder
                sonstige Beiträge hinterlassen, können ihre IP-Adressen auf Grundlage unserer berechtigten
                Interessen gespeichert werden. Das erfolgt zu unserer Sicherheit, falls jemand in Kommentaren
                und Beiträgen widerrechtliche Inhalte hinterlässt. Die mitgeteilten Informationen werden bis zum
                Widerspruch der Nutzer dauerhaft gespeichert.
              </li>
              <li>
                <strong className="text-navy">Medium:</strong> Hostingplattform für Blogs / Websites. A Medium
                Corporation, P.O. Box 602, San Francisco, CA 94104–0602, USA.{' '}
                <a href="https://medium.com/policy/medium-privacy-policy-f03bf92035c9" target="_blank" rel="noopener noreferrer" className="text-ocean hover:underline">
                  Datenschutzerklärung
                </a>
              </li>
            </ul>
          </div>

          {/* 17 – Kontakt */}
          <div id="m182">
            <h2 className="font-display text-xl font-bold text-navy mb-3">Kontakt- und Anfrageverwaltung</h2>
            <p className="leading-relaxed text-muted">
              Bei der Kontaktaufnahme mit uns (z.&nbsp;B. per Post, Kontaktformular, E-Mail, Telefon oder via
              soziale Medien) sowie im Rahmen bestehender Nutzer- und Geschäftsbeziehungen werden die Angaben
              der anfragenden Personen verarbeitet, soweit dies zur Beantwortung der Kontaktanfragen und
              etwaiger angefragter Maßnahmen erforderlich ist.
            </p>
            <p className="leading-relaxed text-muted mt-3">
              <strong className="text-navy">Verarbeitete Datenarten:</strong> Kontaktdaten; Inhaltsdaten; Meta-,
              Kommunikations- und Verfahrensdaten.{' '}
              <strong className="text-navy">Rechtsgrundlagen:</strong> Berechtigte Interessen (Art. 6 Abs. 1 S. 1
              lit. f) DSGVO); Vertragserfüllung und vorvertragliche Anfragen (Art. 6 Abs. 1 S. 1 lit. b) DSGVO).
            </p>
            <h3 className="font-sans font-semibold text-navy mt-5 mb-2 text-base">Weitere Hinweise</h3>
            <ul className="list-disc list-inside space-y-2 text-muted leading-relaxed">
              <li>
                <strong className="text-navy">Kontaktformular:</strong> Bei Kontaktaufnahme über unser
                Kontaktformular, per E-Mail oder anderen Kommunikationswegen, verarbeiten wir die uns
                übermittelten personenbezogenen Daten zur Beantwortung und Bearbeitung des jeweiligen Anliegens.
                Wir nutzen diese Daten ausschließlich für den angegebenen Zweck der Kontaktaufnahme und
                Kommunikation.
              </li>
            </ul>
          </div>

          {/* 18 – Audioinhalte */}
          <div id="m296">
            <h2 className="font-display text-xl font-bold text-navy mb-3">Audioinhalte</h2>
            <p className="leading-relaxed text-muted">
              Wir nutzen Hosting-Angebote von Dienstanbietern, um unsere Audio-Inhalte zum Anhören und zum
              Download anzubieten. Dabei setzen wir Plattformen ein, die das Hochladen, Speichern und Verbreiten
              von Audio-Material ermöglichen.
            </p>
            <p className="leading-relaxed text-muted mt-3">
              <strong className="text-navy">Verarbeitete Datenarten:</strong> Nutzungsdaten; Meta-,
              Kommunikations- und Verfahrensdaten; Protokolldaten.{' '}
              <strong className="text-navy">Rechtsgrundlagen:</strong> Berechtigte Interessen (Art. 6 Abs. 1 S. 1
              lit. f) DSGVO).
            </p>
            <h3 className="font-sans font-semibold text-navy mt-5 mb-2 text-base">Eingesetzte Dienste</h3>
            <ul className="list-disc list-inside space-y-2 text-muted leading-relaxed">
              <li>
                <strong className="text-navy">Soundcloud:</strong> SoundCloud Limited, Rheinsberger Str. 76/77,
                10115 Berlin, Deutschland.{' '}
                <a href="https://soundcloud.com/pages/privacy" target="_blank" rel="noopener noreferrer" className="text-ocean hover:underline">
                  Datenschutzerklärung
                </a>
              </li>
              <li>
                <strong className="text-navy">Spotify:</strong> Podcast-Hosting, Veröffentlichung und Verwaltung
                von Podcast-Inhalten. Spotify AB, Regeringsgatan 19, SE-111 53 Stockholm, Schweden.{' '}
                <a href="https://www.spotify.com/de/legal/privacy-policy/" target="_blank" rel="noopener noreferrer" className="text-ocean hover:underline">
                  Datenschutzerklärung
                </a>
              </li>
            </ul>
          </div>

          {/* 19 – Newsletter */}
          <div id="m17">
            <h2 className="font-display text-xl font-bold text-navy mb-3">Newsletter und elektronische Benachrichtigungen</h2>
            <p className="leading-relaxed text-muted">
              Wir versenden Newsletter, E-Mails und weitere elektronische Benachrichtigungen (nachfolgend
              „Newsletter") ausschließlich mit der Einwilligung der Empfänger oder aufgrund einer gesetzlichen
              Grundlage. Für die Anmeldung zu unserem Newsletter ist normalerweise die Angabe Ihrer
              E-Mail-Adresse ausreichend.
            </p>
            <p className="leading-relaxed text-muted mt-3">
              <strong className="text-navy">Inhalte:</strong> Informationen zu uns, unseren Leistungen, Aktionen
              und Angeboten.
            </p>
            <p className="leading-relaxed text-muted mt-3">
              <strong className="text-navy">Löschung und Einschränkung der Verarbeitung:</strong> Wir können die
              ausgetragenen E-Mail-Adressen bis zu drei Jahren auf Grundlage unserer berechtigten Interessen
              speichern, bevor wir sie löschen, um eine ehemals gegebene Einwilligung nachweisen zu können.
            </p>
            <p className="leading-relaxed text-muted mt-3">
              <strong className="text-navy">Verarbeitete Datenarten:</strong> Bestandsdaten; Kontaktdaten; Meta-,
              Kommunikations- und Verfahrensdaten.{' '}
              <strong className="text-navy">Rechtsgrundlagen:</strong> Einwilligung (Art. 6 Abs. 1 S. 1 lit. a)
              DSGVO).
            </p>
            <p className="leading-relaxed text-muted mt-3">
              <strong className="text-navy">Widerspruchsmöglichkeit (Opt-Out):</strong> Sie können den Empfang
              unseres Newsletters jederzeit kündigen, d.&nbsp;h. Ihre Einwilligungen widerrufen, bzw. dem
              weiteren Empfang widersprechen. Einen Link zur Kündigung des Newsletters finden Sie entweder am
              Ende eines jeden Newsletters oder können sonst eine der oben angegebenen Kontaktmöglichkeiten,
              vorzugsweise E-Mail, hierzu nutzen.
            </p>
          </div>

          {/* 20 – Umfragen */}
          <div id="m408">
            <h2 className="font-display text-xl font-bold text-navy mb-3">Umfragen und Befragungen</h2>
            <p className="leading-relaxed text-muted">
              Wir führen Umfragen und Befragungen durch, um Informationen für den jeweils kommunizierten
              Umfrage- bzw. Befragungszweck zu sammeln. Die von uns durchgeführten Umfragen werden anonym
              ausgewertet. Eine Verarbeitung personenbezogener Daten erfolgt nur insoweit, als dies zur
              Bereitstellung und technischen Durchführung der Umfragen erforderlich ist.
            </p>
            <p className="leading-relaxed text-muted mt-3">
              <strong className="text-navy">Verarbeitete Datenarten:</strong> Bestandsdaten; Kontaktdaten;
              Inhaltsdaten; Nutzungsdaten.{' '}
              <strong className="text-navy">Rechtsgrundlagen:</strong> Berechtigte Interessen (Art. 6 Abs. 1 S. 1
              lit. f) DSGVO).
            </p>
            <h3 className="font-sans font-semibold text-navy mt-5 mb-2 text-base">Eingesetzte Dienste</h3>
            <ul className="list-disc list-inside space-y-2 text-muted leading-relaxed">
              <li>
                <strong className="text-navy">Google-Formular:</strong> Erstellung und Auswertung von
                Onlineformularen, Umfragen, Feedbackbögen. Google Ireland Limited, Gordon House, Barrow Street,
                Dublin 4, Irland. Grundlage Drittlandtransfers: Data Privacy Framework (DPF),
                Standardvertragsklauseln.{' '}
                <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-ocean hover:underline">
                  Datenschutzerklärung
                </a>
              </li>
            </ul>
          </div>

          {/* 21 – Webanalyse */}
          <div id="m263">
            <h2 className="font-display text-xl font-bold text-navy mb-3">Webanalyse, Monitoring und Optimierung</h2>
            <p className="leading-relaxed text-muted">
              Die Webanalyse (auch als „Reichweitenmessung" bezeichnet) dient der Auswertung der Besucherströme
              unseres Onlineangebots und kann Verhalten, Interessen oder demografische Informationen zu den
              Besuchern als pseudonyme Werte umfassen. Mithilfe der Reichweitenanalyse können wir zum Beispiel
              erkennen, zu welcher Zeit unser Onlineangebot oder dessen Funktionen bzw. Inhalte am häufigsten
              genutzt werden, oder zur Wiederverwendung einladen.
            </p>
            <p className="leading-relaxed text-muted mt-3">
              Wir nutzen ein IP-Masking-Verfahren (Pseudonymisierung durch Kürzung der IP-Adresse) zum Schutz
              der Nutzer. Generell werden im Rahmen von Webanalyse keine Klardaten der Nutzer (wie z.&nbsp;B.
              E-Mail-Adressen oder Namen) gespeichert, sondern Pseudonyme.
            </p>
            <p className="leading-relaxed text-muted mt-3">
              <strong className="text-navy">Verarbeitete Datenarten:</strong> Nutzungsdaten; Meta-,
              Kommunikations- und Verfahrensdaten.{' '}
              <strong className="text-navy">Sicherheitsmaßnahmen:</strong> IP-Masking.{' '}
              <strong className="text-navy">Speicherdauer Cookies:</strong> bis zu 2 Jahre.{' '}
              <strong className="text-navy">Rechtsgrundlagen:</strong> Einwilligung (Art. 6 Abs. 1 S. 1 lit. a)
              DSGVO); Berechtigte Interessen (Art. 6 Abs. 1 S. 1 lit. f) DSGVO).
            </p>
          </div>

          {/* 22 – Onlinemarketing */}
          <div id="m264">
            <h2 className="font-display text-xl font-bold text-navy mb-3">Onlinemarketing</h2>
            <p className="leading-relaxed text-muted">
              Wir verarbeiten personenbezogene Daten zum Zweck des Onlinemarketings, worunter insbesondere die
              Vermarktung von Werbeflächen oder die Darstellung von werbenden und sonstigen Inhalten anhand
              potenzieller Interessen der Nutzer sowie die Messung ihrer Effektivität fallen können.
            </p>
            <p className="leading-relaxed text-muted mt-3">
              Wir erhalten grundsätzlich nur Zugang zu zusammengefassten Informationen über den Erfolg unserer
              Werbeanzeigen. Im Rahmen sogenannter Konversionsmessungen können wir prüfen, welche unserer
              Onlinemarketingverfahren zu einer sogenannten Konversion geführt haben.
            </p>
            <p className="leading-relaxed text-muted mt-3">
              <strong className="text-navy">Hinweise zum Widerruf und Widerspruch:</strong>
            </p>
            <ul className="list-disc list-inside space-y-1 text-muted leading-relaxed mt-1">
              <li>Europa: <a href="https://www.youronlinechoices.eu" target="_blank" rel="noopener noreferrer" className="text-ocean hover:underline">youronlinechoices.eu</a></li>
              <li>Kanada: <a href="https://youradchoices.ca/" target="_blank" rel="noopener noreferrer" className="text-ocean hover:underline">youradchoices.ca</a></li>
              <li>USA: <a href="https://optout.aboutads.info/" target="_blank" rel="noopener noreferrer" className="text-ocean hover:underline">optout.aboutads.info</a></li>
            </ul>
            <p className="leading-relaxed text-muted mt-3">
              <strong className="text-navy">Rechtsgrundlagen:</strong> Einwilligung (Art. 6 Abs. 1 S. 1 lit. a)
              DSGVO); Berechtigte Interessen (Art. 6 Abs. 1 S. 1 lit. f) DSGVO).
            </p>
            <h3 className="font-sans font-semibold text-navy mt-5 mb-2 text-base">Eingesetzte Dienste</h3>
            <ul className="list-disc list-inside space-y-2 text-muted leading-relaxed">
              <li>
                <strong className="text-navy">Google Ads und Konversionsmessung:</strong> Online-Marketing-Verfahren
                zum Zwecke der Platzierung von Inhalten und Anzeigen innerhalb des Werbenetzwerks des
                Diensteanbieters. Google Ireland Limited, Gordon House, Barrow Street, Dublin 4, Irland.
                Grundlage Drittlandtransfers: Data Privacy Framework (DPF).{' '}
                <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-ocean hover:underline">
                  Datenschutzerklärung
                </a>
              </li>
            </ul>
          </div>

          {/* 23 – Affiliate */}
          <div id="m135">
            <h2 className="font-display text-xl font-bold text-navy mb-3">Affiliate-Programme und Affiliate-Links</h2>
            <p className="leading-relaxed text-muted">
              In unser Onlineangebot binden wir sogenannte Affiliate-Links oder andere Verweise auf die Angebote
              und Leistungen von Drittanbietern ein. Wenn Nutzer den Affiliate-Links folgen, bzw. anschließend
              die Angebote wahrnehmen, können wir von diesen Drittanbietern eine Provision oder sonstige
              Vorteile erhalten.
            </p>
            <p className="leading-relaxed text-muted mt-3">
              Um nachverfolgen zu können, ob die Nutzer die Angebote eines von uns eingesetzten Affiliate-Links
              wahrgenommen haben, ist es notwendig, dass die jeweiligen Drittanbieter erfahren, dass die Nutzer
              einem innerhalb unseres Onlineangebotes eingesetzten Affiliate-Link gefolgt sind.
            </p>
            <p className="leading-relaxed text-muted mt-3">
              <strong className="text-navy">Rechtsgrundlagen:</strong> Einwilligung (Art. 6 Abs. 1 S. 1 lit. a)
              DSGVO); Berechtigte Interessen (Art. 6 Abs. 1 S. 1 lit. f) DSGVO).
            </p>
          </div>

          {/* 24 – Kundenrezensionen */}
          <div id="m299">
            <h2 className="font-display text-xl font-bold text-navy mb-3">Kundenrezensionen und Bewertungsverfahren</h2>
            <p className="leading-relaxed text-muted">
              Wir nehmen an Rezensions- und Bewertungsverfahren teil, um unsere Leistungen zu evaluieren, zu
              optimieren und zu bewerben. Wenn Nutzer uns über die beteiligten Bewertungsplattformen oder
              -verfahren bewerten oder anderweitig Feedback geben, gelten zusätzlich die Allgemeinen
              Geschäfts- oder Nutzungsbedingungen und die Datenschutzhinweise der Anbieter.
            </p>
            <p className="leading-relaxed text-muted mt-3">
              Um sicherzustellen, dass die bewertenden Personen tatsächlich unsere Leistungen in Anspruch
              genommen haben, übermitteln wir mit Einwilligung der Kunden die hierzu erforderlichen Daten
              (Name, E-Mail-Adresse, Bestellnummer) an die jeweilige Bewertungsplattform.
            </p>
            <p className="leading-relaxed text-muted mt-3">
              <strong className="text-navy">Rechtsgrundlagen:</strong> Berechtigte Interessen (Art. 6 Abs. 1 S. 1
              lit. f) DSGVO).
            </p>
            <h3 className="font-sans font-semibold text-navy mt-5 mb-2 text-base">Weitere Hinweise</h3>
            <ul className="list-disc list-inside space-y-2 text-muted leading-relaxed">
              <li>
                <strong className="text-navy">Bewertungs-Widget:</strong> Wir binden in unser Onlineangebot
                sogenannte „Bewertungs-Widgets" ein. Ein Widget ist ein in unser Onlineangebot eingebundenes
                Funktions- und Inhaltselement, das veränderliche Informationen anzeigt. Dabei wird der
                entsprechende Inhalt des Widgets zwar innerhalb unseres Onlineangebotes dargestellt, er wird
                aber in diesem Moment von den Servern des jeweiligen Widgets-Anbieters abgerufen.
              </li>
            </ul>
          </div>

          {/* 25 – Social Media */}
          <div id="m136">
            <h2 className="font-display text-xl font-bold text-navy mb-3">Präsenzen in sozialen Netzwerken (Social Media)</h2>
            <p className="leading-relaxed text-muted">
              Wir unterhalten Onlinepräsenzen innerhalb sozialer Netzwerke und verarbeiten in diesem Rahmen
              Nutzerdaten, um mit den dort aktiven Nutzern zu kommunizieren oder Informationen über uns
              anzubieten. Wir weisen darauf hin, dass dabei Nutzerdaten außerhalb des Raumes der Europäischen
              Union verarbeitet werden können.
            </p>
            <p className="leading-relaxed text-muted mt-3">
              <strong className="text-navy">Rechtsgrundlagen:</strong> Berechtigte Interessen (Art. 6 Abs. 1 S. 1
              lit. f) DSGVO).
            </p>

            <h3 className="font-sans font-semibold text-navy mt-5 mb-2 text-base">Eingesetzte Plattformen</h3>
            <ul className="list-disc list-inside space-y-3 text-muted leading-relaxed">
              <li>
                <strong className="text-navy">Instagram:</strong> Meta Platforms Ireland Limited, Merrion Road,
                Dublin 4, D04 X2K5, Irland. Grundlage Drittlandtransfers: Data Privacy Framework (DPF).{' '}
                <a href="https://privacycenter.instagram.com/policy/" target="_blank" rel="noopener noreferrer" className="text-ocean hover:underline">
                  Datenschutzerklärung
                </a>
              </li>
              <li>
                <strong className="text-navy">Facebook-Seiten:</strong> Der Verantwortliche ist gemeinsam mit
                Meta Platforms Ireland Limited für die Erhebung und Übermittlung von Daten der Besucher unserer
                Facebook-Seite verantwortlich. Meta Platforms Ireland Limited, Merrion Road, Dublin 4, D04 X2K5,
                Irland. Grundlage Drittlandtransfers: Data Privacy Framework (DPF), Standardvertragsklauseln.{' '}
                <a href="https://www.facebook.com/privacy/policy/" target="_blank" rel="noopener noreferrer" className="text-ocean hover:underline">
                  Datenschutzerklärung
                </a>
              </li>
              <li>
                <strong className="text-navy">LinkedIn:</strong> Wir sind gemeinsam mit LinkedIn Irland
                Unlimited Company für die Erhebung von Daten der Besucher verantwortlich, die zur Erstellung der
                „Page-Insights" (Statistiken) unserer LinkedIn-Profile genutzt werden. LinkedIn Ireland
                Unlimited Company, Wilton Plaza, Dublin 2, Irland. Grundlage Drittlandtransfers: Data Privacy
                Framework (DPF), Standardvertragsklauseln.{' '}
                <a href="https://www.linkedin.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-ocean hover:underline">
                  Datenschutzerklärung
                </a>{' '}
                | Opt-Out:{' '}
                <a href="https://www.linkedin.com/psettings/guest-controls/retargeting-opt-out" target="_blank" rel="noopener noreferrer" className="text-ocean hover:underline">
                  linkedin.com/psettings
                </a>
              </li>
              <li>
                <strong className="text-navy">YouTube:</strong> Google Ireland Limited, Gordon House, Barrow
                Street, Dublin 4, Irland. Grundlage Drittlandtransfers: Data Privacy Framework (DPF).{' '}
                <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-ocean hover:underline">
                  Datenschutzerklärung
                </a>{' '}
                | Opt-Out:{' '}
                <a href="https://myadcenter.google.com/personalizationoff" target="_blank" rel="noopener noreferrer" className="text-ocean hover:underline">
                  myadcenter.google.com
                </a>
              </li>
            </ul>
          </div>

          {/* 26 – Plug-ins */}
          <div id="m328">
            <h2 className="font-display text-xl font-bold text-navy mb-3">Plug-ins und eingebettete Funktionen sowie Inhalte</h2>
            <p className="leading-relaxed text-muted">
              Wir binden Funktions- und Inhaltselemente in unser Onlineangebot ein, die von den Servern ihrer
              jeweiligen Anbieter (nachfolgend als „Drittanbieter" bezeichnet) bezogen werden. Dabei kann es sich
              zum Beispiel um Grafiken, Videos oder Stadtpläne handeln (nachfolgend einheitlich als „Inhalte"
              bezeichnet).
            </p>
            <p className="leading-relaxed text-muted mt-3">
              Die Einbindung setzt immer voraus, dass die Drittanbieter dieser Inhalte die IP-Adresse der Nutzer
              verarbeiten, da sie ohne IP-Adresse die Inhalte nicht an deren Browser senden könnten.
            </p>
            <p className="leading-relaxed text-muted mt-3">
              <strong className="text-navy">Rechtsgrundlagen:</strong> Einwilligung (Art. 6 Abs. 1 S. 1 lit. a)
              DSGVO); Berechtigte Interessen (Art. 6 Abs. 1 S. 1 lit. f) DSGVO).
            </p>

            <h3 className="font-sans font-semibold text-navy mt-5 mb-2 text-base">Eingesetzte Dienste</h3>
            <ul className="list-disc list-inside space-y-3 text-muted leading-relaxed">
              <li>
                <strong className="text-navy">Einbindung von Drittsoftware, Skripten oder Frameworks
                (z.&nbsp;B. jQuery):</strong> Wir binden in unser Onlineangebot Software ein, die wir von
                Servern anderer Anbieter abrufen (z.&nbsp;B. Funktions-Bibliotheken, die wir zwecks Darstellung
                oder Nutzerfreundlichkeit unseres Onlineangebotes verwenden). Rechtsgrundlage: Art. 6 Abs. 1 S.
                1 lit. f) DSGVO.
              </li>
              <li>
                <strong className="text-navy">Google Fonts (Bereitstellung auf eigenem Server):</strong> Die
                Google Fonts werden auf unserem Server gehostet, es werden keine Daten an Google übermittelt.
                Rechtsgrundlage: Art. 6 Abs. 1 S. 1 lit. f) DSGVO.
              </li>
              <li>
                <strong className="text-navy">Google Maps:</strong> Wir binden die Landkarten des Dienstes
                „Google Maps" des Anbieters Google ein. Google Cloud EMEA Limited, 70 Sir John Rogerson's Quay,
                Dublin 2, Irland. Grundlage Drittlandtransfers: Data Privacy Framework (DPF). Rechtsgrundlage:
                Einwilligung (Art. 6 Abs. 1 S. 1 lit. a) DSGVO).{' '}
                <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-ocean hover:underline">
                  Datenschutzerklärung
                </a>
              </li>
              <li>
                <strong className="text-navy">Instagram-Plugins und -Inhalte:</strong> Instagram Plugins und
                -Inhalte — Hierzu können z.&nbsp;B. Inhalte wie Bilder, Videos oder Texte und Schaltflächen
                gehören, mit denen Nutzer Inhalte dieses Onlineangebotes innerhalb von Instagram teilen können.
                Wir sind gemeinsam mit Meta Platforms Ireland Limited für die Erhebung oder den Erhalt im Rahmen
                einer Übermittlung von „Event-Daten" gemeinsam verantwortlich. Meta Platforms Ireland Limited,
                Merrion Road, Dublin 4, D04 X2K5, Irland.{' '}
                <a href="https://privacycenter.instagram.com/policy/" target="_blank" rel="noopener noreferrer" className="text-ocean hover:underline">
                  Datenschutzerklärung
                </a>
              </li>
            </ul>
          </div>

          {/* 27 – Management & Organisation */}
          <div id="m723">
            <h2 className="font-display text-xl font-bold text-navy mb-3">Management, Organisation und Hilfswerkzeuge</h2>
            <p className="leading-relaxed text-muted">
              Wir setzen Dienstleistungen, Plattformen und Software anderer Anbieter (nachfolgend bezeichnet als
              „Drittanbieter") zu Zwecken der Organisation, Verwaltung, Planung sowie Erbringung unserer
              Leistungen ein. Bei der Auswahl der Drittanbieter und ihrer Leistungen beachten wir die
              gesetzlichen Vorgaben.
            </p>
            <p className="leading-relaxed text-muted mt-3">
              In diesem Rahmen können personenbezogene Daten verarbeitet und auf den Servern der Drittanbieter
              gespeichert werden. Hiervon können diverse Daten betroffen sein, die wir entsprechend dieser
              Datenschutzerklärung verarbeiten. Zu diesen Daten können insbesondere Stammdaten und Kontaktdaten
              der Nutzer, Daten zu Vorgängen, Verträgen, sonstigen Prozessen und deren Inhalte gehören.
            </p>
            <p className="leading-relaxed text-muted mt-3">
              <strong className="text-navy">Verarbeitete Datenarten:</strong> Inhaltsdaten; Nutzungsdaten; Meta-,
              Kommunikations- und Verfahrensdaten.{' '}
              <strong className="text-navy">Rechtsgrundlagen:</strong> Berechtigte Interessen (Art. 6 Abs. 1 S. 1
              lit. f) DSGVO).
            </p>
          </div>

          {/* 28 – Änderung und Aktualisierung */}
          <div id="m15">
            <h2 className="font-display text-xl font-bold text-navy mb-3">Änderung und Aktualisierung</h2>
            <p className="leading-relaxed text-muted">
              Wir bitten Sie, sich regelmäßig über den Inhalt unserer Datenschutzerklärung zu informieren. Wir
              passen die Datenschutzerklärung an, sobald die Änderungen der von uns durchgeführten
              Datenverarbeitungen dies erforderlich machen. Wir informieren Sie, sobald durch die Änderungen eine
              Mitwirkungshandlung Ihrerseits (z.&nbsp;B. Einwilligung) oder eine sonstige individuelle
              Benachrichtigung erforderlich wird.
            </p>
            <p className="leading-relaxed text-muted mt-3">
              Sofern wir in dieser Datenschutzerklärung Adressen und Kontaktinformationen von Unternehmen und
              Organisationen angeben, bitten wir zu beachten, dass die Adressen sich über die Zeit ändern können
              und bitten die Angaben vor Kontaktaufnahme zu prüfen.
            </p>
          </div>

          {/* 29 – Begriffsdefinitionen */}
          <div id="m42">
            <h2 className="font-display text-xl font-bold text-navy mb-3">Begriffsdefinitionen</h2>
            <p className="leading-relaxed text-muted mb-4">
              In diesem Abschnitt erhalten Sie eine Übersicht über die in dieser Datenschutzerklärung verwendeten
              Begrifflichkeiten. Soweit die Begrifflichkeiten gesetzlich definiert sind, gelten deren gesetzliche
              Definitionen.
            </p>
            <ul className="space-y-3 text-muted leading-relaxed">
              <li>
                <strong className="text-navy">Affiliate-Nachverfolgung:</strong> Im Rahmen der
                Affiliate-Nachverfolgung werden Links, mit deren Hilfe die verlinkenden Webseiten Nutzer zu
                Webseiten mit Produkt- oder sonstigen Angeboten verweisen, protokolliert. Die Betreiber der
                jeweils verlinkenden Webseiten können eine Provision erhalten, wenn Nutzer diesen sogenannten
                Affiliate-Links folgen und anschließend die Angebote wahrnehmen.
              </li>
              <li>
                <strong className="text-navy">Bestandsdaten:</strong> Bestandsdaten umfassen wesentliche
                Informationen, die für die Identifikation und Verwaltung von Vertragspartnern,
                Benutzerkonten, Profilen und ähnlichen Zuordnungen notwendig sind. Diese Daten können u.a.
                persönliche und demografische Angaben wie Namen, Kontaktinformationen, Geburtsdaten und
                spezifische Identifikatoren beinhalten.
              </li>
              <li>
                <strong className="text-navy">Inhaltsdaten:</strong> Inhaltsdaten umfassen Informationen, die im
                Zuge der Erstellung, Bearbeitung und Veröffentlichung von Inhalten aller Art generiert werden.
                Diese Kategorie kann Texte, Bilder, Videos, Audiodateien und andere multimediale Inhalte
                einschließen.
              </li>
              <li>
                <strong className="text-navy">Kontaktdaten:</strong> Kontaktdaten sind essentielle
                Informationen, die die Kommunikation mit Personen oder Organisationen ermöglichen. Sie umfassen
                u.a. Telefonnummern, postalische Adressen, E-Mail-Adressen sowie Kommunikationsmittel wie
                soziale Medien-Handles.
              </li>
              <li>
                <strong className="text-navy">Konversionsmessung:</strong> Die Konversionsmessung ist ein
                Verfahren, mit dem die Wirksamkeit von Marketingmaßnahmen festgestellt werden kann. Dazu wird im
                Regelfall ein Cookie auf den Geräten der Nutzer innerhalb der Webseiten gespeichert, auf denen
                die Marketingmaßnahmen erfolgen, und dann erneut auf der Zielwebseite abgerufen.
              </li>
              <li>
                <strong className="text-navy">Meta-, Kommunikations- und Verfahrensdaten:</strong> Meta-Daten
                umfassen Informationen, die den Kontext, die Herkunft und die Struktur anderer Daten
                beschreiben. Kommunikationsdaten erfassen den Austausch von Informationen zwischen Nutzern über
                verschiedene Kanäle. Verfahrensdaten beschreiben die Prozesse und Abläufe innerhalb von Systemen
                oder Organisationen.
              </li>
              <li>
                <strong className="text-navy">Nutzungsdaten:</strong> Nutzungsdaten beziehen sich auf
                Informationen, die erfassen, wie Nutzer mit digitalen Produkten, Dienstleistungen oder
                Plattformen interagieren. Diese Daten umfassen besuchte Websites, Verweildauer, Klickpfade,
                Geräteinformationen und Standortdaten.
              </li>
              <li>
                <strong className="text-navy">Personenbezogene Daten:</strong> „Personenbezogene Daten" sind
                alle Informationen, die sich auf eine identifizierte oder identifizierbare natürliche Person
                beziehen; als identifizierbar wird eine natürliche Person angesehen, die direkt oder indirekt
                identifiziert werden kann (Art. 4 Nr. 1 DSGVO).
              </li>
              <li>
                <strong className="text-navy">Profile mit nutzerbezogenen Informationen:</strong> Die
                Verarbeitung von „Profilen" umfasst jede Art der automatisierten Verarbeitung
                personenbezogener Daten, die darin besteht, dass diese Daten verwendet werden, um bestimmte
                persönliche Aspekte einer natürlichen Person zu analysieren, zu bewerten oder vorherzusagen.
              </li>
              <li>
                <strong className="text-navy">Protokolldaten:</strong> Protokolldaten sind Informationen über
                Ereignisse oder Aktivitäten, die in einem System oder Netzwerk protokolliert wurden. Diese Daten
                enthalten typischerweise Zeitstempel, IP-Adressen, Benutzeraktionen und Fehlermeldungen.
              </li>
              <li>
                <strong className="text-navy">Reichweitenmessung:</strong> Die Reichweitenmessung (auch als Web
                Analytics bezeichnet) dient der Auswertung der Besucherströme eines Onlineangebotes und kann
                das Verhalten oder Interessen der Besucher an bestimmten Informationen umfassen.
              </li>
              <li>
                <strong className="text-navy">Standortdaten:</strong> Standortdaten entstehen, wenn sich ein
                mobiles Gerät mit einer Funkzelle, einem WLAN oder ähnlichen technischen Mitteln der
                Standortbestimmung verbindet.
              </li>
              <li>
                <strong className="text-navy">Tracking:</strong> Vom „Tracking" spricht man, wenn das Verhalten
                von Nutzern über mehrere Onlineangebote hinweg nachvollzogen werden kann. Im Regelfall werden im
                Hinblick auf die genutzten Onlineangebote Verhaltens- und Interessensinformationen in Cookies
                oder auf Servern der Anbieter der Trackingtechnologien gespeichert (sogenanntes Profiling).
              </li>
              <li>
                <strong className="text-navy">Verantwortlicher:</strong> Als „Verantwortlicher" wird die
                natürliche oder juristische Person, Behörde, Einrichtung oder andere Stelle bezeichnet, die
                allein oder gemeinsam mit anderen über die Zwecke und Mittel der Verarbeitung von
                personenbezogenen Daten entscheidet.
              </li>
              <li>
                <strong className="text-navy">Verarbeitung:</strong> „Verarbeitung" ist jeder mit oder ohne
                Hilfe automatisierter Verfahren ausgeführte Vorgang oder jede solche Vorgangsreihe im
                Zusammenhang mit personenbezogenen Daten. Der Begriff reicht weit und umfasst praktisch jeden
                Umgang mit Daten.
              </li>
              <li>
                <strong className="text-navy">Vertragsdaten:</strong> Vertragsdaten sind spezifische
                Informationen, die sich auf die Formalisierung einer Vereinbarung zwischen zwei oder mehr
                Parteien beziehen. Sie dokumentieren die Bedingungen, unter denen Dienstleistungen oder Produkte
                bereitgestellt, getauscht oder verkauft werden.
              </li>
              <li>
                <strong className="text-navy">Zahlungsdaten:</strong> Zahlungsdaten umfassen sämtliche
                Informationen, die zur Abwicklung von Zahlungstransaktionen zwischen Käufern und Verkäufern
                benötigt werden. Dazu zählen Kreditkartennummern, Bankverbindungen, Zahlungsbeträge und
                Transaktionsdaten.
              </li>
              <li>
                <strong className="text-navy">Zielgruppenbildung:</strong> Von Zielgruppenbildung (englisch
                „Custom Audiences") spricht man, wenn Zielgruppen für Werbezwecke, z.&nbsp;B. Einblendung von
                Werbeanzeigen, bestimmt werden. Von „Lookalike Audiences" spricht man, wenn die als geeignet
                eingeschätzten Inhalte Nutzern angezeigt werden, deren Profile bzw. Interessen mutmaßlich den
                Nutzern entsprechen, zu denen die Profile gebildet wurden.
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
