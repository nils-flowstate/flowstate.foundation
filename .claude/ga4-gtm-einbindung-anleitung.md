# GTM Information

<!-- Google Tag Manager -->
<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-P3MBJ9XQ');</script>
<!-- End Google Tag Manager -->

<!-- Google Tag Manager (noscript) -->
<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-P3MBJ9XQ"
height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
<!-- End Google Tag Manager (noscript) -->


GTM-P3MBJ9XQ

# Google Analytics 4 mit GTM Consent Mode verbinden – Schritt für Schritt

## Voraussetzungen

- GTM-Container ist eingerichtet (Container-ID: GTM-XXXXXXX)
- Consent Mode ist im Code implementiert (siehe `gtm-consent-mode-claude-prompt.md`)
- Google Analytics 4 Property existiert (oder wird neu angelegt)

---

## Schritt 1 – GA4 Property anlegen (falls noch nicht vorhanden)

1. [analytics.google.com](https://analytics.google.com) öffnen
2. Zahnrad (⚙) unten links → **Property erstellen**
3. Property-Name: `flowstate.foundation`
4. Zeitzone: `Deutschland (UTC+1)`
5. Währung: `Euro`
6. Plattform: **Web**
7. Website-URL: `https://flowstate.foundation`
8. Stream-Name: `flowstate.foundation`
9. **Measurement ID notieren** – sieht aus wie `G-XXXXXXXXXX`

---

## Schritt 2 – GTM öffnen und Consent-Einstellungen prüfen

1. [tagmanager.google.com](https://tagmanager.google.com) öffnen
2. Deinen Container für `flowstate.foundation` auswählen
3. Links: **Verwaltung** → **Container-Einstellungen**
4. Sicherstellen dass **Consent Overview** aktiviert ist ✓

---

## Schritt 3 – GA4 Konfigurations-Tag erstellen

1. Links: **Tags** → **Neu**
2. Tag-Name: `GA4 – Konfiguration`
3. Tag-Typ: **Google Tag** (oder „Google Analytics: GA4-Konfiguration")
4. Tag-ID: `G-XXXXXXXXXX` (deine Measurement ID aus Schritt 1)
5. **Erweiterte Einstellungen** aufklappen:
   - Einwilligungsanforderungen: **Entsprechend der Einwilligungseinstellungen`**
6. Trigger: **Consent Initialization – All Pages**
   - Falls nicht vorhanden: Trigger → Neu → Typ: **Einwilligungsinitialisierung**
7. **Speichern**

---

## Schritt 4 – GA4 Event-Tag für Seitenaufrufe erstellen

1. Tags → Neu
2. Tag-Name: `GA4 – Seitenaufrufe`
3. Tag-Typ: **Google Analytics: GA4-Ereignis**
4. Konfigurationstag: `GA4 – Konfiguration` (aus Schritt 3)
5. Ereignisname: `page_view`
6. **Einwilligungsanforderungen:**
   - `analytics_storage` → **Erforderlich**
7. Trigger: **All Pages** (Seitenaufruf)
8. **Speichern**

---

## Schritt 5 – Trigger für Consent-Update anlegen

Damit GA4 auch nachträglich feuert, wenn jemand zustimmt:

1. Trigger → Neu
2. Name: `Consent Updated – Analytics granted`
3. Typ: **Benutzerdefiniertes Ereignis**
4. Ereignisname: `consent_updated`
5. Bedingung hinzufügen:
   - Variable: **{{consent}}** (Custom Data Layer Variable)
   - Operator: **enthält**
   - Wert: `analytics_storage`

> **Hinweis:** Das `consent_updated`-Event wird von deiner `updateConsent()`-Funktion gepusht (siehe Claude-Prompt).

---

## Schritt 6 – Consent Overview in GTM konfigurieren

1. Tags → **Consent Overview** öffnen (Schild-Symbol oben rechts)
2. Beim GA4-Tag prüfen:
   - `analytics_storage` → **Erforderlich** ✓
3. Beim GA4-Konfigurationstag prüfen:
   - Keine harten Anforderungen (darf immer initialisieren) ✓

---

## Schritt 7 – Container veröffentlichen

1. Oben rechts: **Senden**
2. Versionsname: `Consent Mode v2 + GA4`
3. Beschreibung: `DSGVO-konformer Consent Mode mit eigenem Cookie-Banner`
4. **Veröffentlichen**

---

## Schritt 8 – Testen

### GTM Preview-Modus

1. GTM → **Vorschau** (oben rechts)
2. URL: `https://flowstate.foundation`
3. In der Debug-Konsole prüfen:
   - `Consent Initialization` feuert zuerst ✓
   - GA4-Konfigurationstag feuert ✓
   - GA4-Seitenaufruf-Tag feuert **erst nach Zustimmung** ✓

### Chrome DevTools

1. DevTools öffnen → **Network**-Tab
2. Filter: `google-analytics` oder `collect`
3. Vor Zustimmung: **keine Requests** an GA4
4. Nach "Akzeptieren": Requests erscheinen ✓

### GA4 Echtzeit-Bericht

1. Google Analytics → **Berichte** → **Echtzeit**
2. Eigene Website besuchen und zustimmen
3. Eigener Besuch erscheint innerhalb von ~30 Sekunden ✓

---

## Schritt 9 – Google Consent Mode in GA4 verifizieren

1. GA4 → **Verwaltung** → **Datenströme** → dein Stream
2. **Diagnose anzeigen**
3. Grünes Häkchen bei **Consent Mode** = korrekt eingerichtet ✓

---

## Häufige Fehler

| Problem                              | Lösung                                                          |
| ------------------------------------ | --------------------------------------------------------------- |
| GA4 sendet Daten ohne Zustimmung     | `wait_for_update` erhöhen oder Trigger-Reihenfolge prüfen       |
| Banner erscheint immer wieder        | `localStorage.getItem('ff_consent')` im Browser prüfen          |
| GA4 feuert nie                       | Measurement ID prüfen, GTM-Container-ID in index.html           |
| Consent Initialization Trigger fehlt | GTM → Trigger → Neu → Einwilligungsinitialisierung              |
| `gtag is not defined`                | Sicherstellen dass gtag-Init vor GTM-Script in index.html steht |

---

## Ergebnis

Nach diesen Schritten gilt:
- Nutzer aus DE/AT/CH sehen das Banner
- Vor Zustimmung: GA4 sendet **keine** personenbezogenen Daten
- Nach Zustimmung: GA4 trackt normal
- Nutzer ohne Zustimmung: GA4 sendet nur anonymisierte Ping-Daten (Consent Mode v2)
- Einwilligung wird im localStorage gespeichert und beim nächsten Besuch wiederhergestellt
