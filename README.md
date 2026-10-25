# Preisflieger Rechnung

Rechnungs-App für PC und Handy: Artikel per Nummer oder Name suchen, Rechnung als PDF erzeugen,
Zahlungs-QR-Code mit dem richtigen Betrag, Ablage direkt in OneDrive. Läuft kostenlos über GitHub Pages.

---

## 1. Adresse der App

Die App liegt im GitHub-Projekt **PREISFLIEGER/Rechnungs_Vorlage_PREISFLIEGER** und läuft über GitHub Pages unter:

`https://preisflieger.github.io/Rechnungs_Vorlage_PREISFLIEGER/`

Einmalig einschalten: GitHub-Projekt → **Settings → Pages** → bei *Branch* `main` und `/ (root)` wählen → **Save**.
Nach 1–2 Minuten ist die App erreichbar.

Öffentlich sind nur App und Artikelliste (dieselben Daten wie auf Shöpping) – Kunden, Rechnungen und Verlauf liegen **nie** auf GitHub,
sondern nur auf deinem Gerät bzw. in deinem OneDrive.

## 2. Aufs Handy holen

- **iPhone (Safari):** Adresse öffnen → Teilen-Symbol → **Zum Home-Bildschirm**.
- **Android (Chrome):** Adresse öffnen → Menü ⋮ → **App installieren**.

Die App startet dann wie eine normale App und funktioniert auch ohne Internet (Artikelliste wird gespeichert).

## 3. Erste Einstellungen (Zahnrad oben rechts)

- **Rechnungsnummer:** Format `RE_26_31`, ist schon eingestellt (letzte Nummer RE_26_30). Die nächste Rechnung
  bekommt automatisch die folgende Nummer, ab 2027 geht es mit `RE_27_1` los. Im Feld *Rechnungsnummer* kannst du jede Nummer
  jederzeit überschreiben; **+1** springt zur nächsten freien Nummer.
- Absender, Bank, Logo und Fußtext sind schon mit deinen Daten aus der Word-Vorlage befüllt.
- **Preise im Feed sind:** brutto oder netto – je nachdem, was dein Feed enthält.
  (Steht in der Spaltenüberschrift „netto“ oder „brutto“, erkennt die App das selbst.)

## 4. Artikel-Feed aktualisieren

### A) Automatisch aus der Produktliste (so ist es eingerichtet)
Die Datei `artikel.csv` in diesem Projekt ist die **Shöpping-CSV** aus deiner Produktliste
(Blatt „Produktliste PREISFLIEGER_Shöpp“). Das Excel-Makro in `Produktliste PREISFLIEGER_Shöpping 02_12_2025.xlsm`
macht bei jedem **Strg + S**:
1. Sicherungskopie (vorletzte Speicherung) in den Ordner „Sicherungskopie“,
2. die Shöpping-CSV neu (Name bleibt gleich),
3. Upload dieser CSV als `artikel.csv` hierher.

Die App liest daraus Artikelnummer (eigene, sonst Hersteller-Nr.), EAN, Produktname, **VK inkl. MwSt. (brutto)**,
MwSt. und Status. Netto rechnet die App selbst (brutto ÷ 1,2). Für den Upload braucht das Makro einmalig einen
GitHub-Token in `C:\Users\<Name>\github_token.txt` (Anleitung im Chat).

Von Hand geht es auch: **Einstellungen → Artikel-Feed → Produktliste (Excel) importieren …** oder die CSV auf GitHub
über **Add file → Upload files** als `artikel.csv` ersetzen.

Erkannte Formate:
- CSV mit `;` oder `,` (z. B. aus Excel gespeichert – Umlaute werden auch bei „ANSI“ richtig gelesen)
- **Shopify-Produktexport** (Shopify-Admin → Produkte → Exportieren → CSV). Varianten werden einzeln aufgelistet.
- Excel `.xlsx`, Google-Shopping-XML, JSON (auch Shopify `products.json`)

Spaltennamen sind frei, die App sucht nach üblichen Bezeichnungen wie
*Artikelnummer / Art.-Nr. / SKU*, *Bezeichnung / Name / Titel*, *Preis / VK / Price*, *Einheit*, *USt / MwSt*.


### B) Automatisch aus Shopify (später)
Wenn du von Shopify (oder einer Feed-App) einen Feed-Link bekommst:
1. GitHub-Projekt → **Settings → Secrets and variables → Actions → Variables → New repository variable**
   - Name `FEED_URL`, Wert: dein Feed-Link
   - nur bei XML-Feeds zusätzlich: Name `FEED_FILE`, Wert `artikel.xml` (und in der App die Feed-Adresse auf `artikel.xml` stellen)
2. GitHub holt den Feed jetzt **jeden Morgen** automatisch. Sofort aktualisieren:
   **Actions → Artikel-Feed aktualisieren → Run workflow**.

## 5. Rechnung schreiben

1. Kunde eintippen – bekannte Kunden werden vorgeschlagen und die Adresse ausgefüllt.
2. Ins Suchfeld Artikelnummer oder Teil des Namens tippen → Treffer antippen (oder **Enter** für den ersten).
   Nochmal denselben Artikel wählen erhöht die Menge. Nichts gefunden? **Enter** legt eine freie Position an.
3. Nach dem Auswählen springt der Cursor gleich ins **Mengenfeld** – Zahl eintippen, **Enter**, und weiter mit dem nächsten Artikel.
   Preis, Rabatt (%) und Steuersatz sind in jeder Zeile änderbar. Unter der Summe gibt es **Rabatt auf alles**,
   **Skonto %** und die **Skonto-Frist**. Oben rechts umschaltbar: Preise brutto oder netto.
4. **Fertig & speichern** → PDF wird erzeugt und abgelegt (OneDrive, Teilen-Menü oder Download).
   **Vorschau** öffnet das PDF zum Ansehen und Drucken, **PDF** teilt oder lädt es herunter.

Der Zahlungs-QR-Code (EPC/GiroCode) enthält IBAN, Empfänger, **genauen Betrag** und „Rechnung Nr.“ als Verwendungszweck.
Er wird direkt im Gerät erzeugt – kein Anbieter, keine Kosten. Antippen in der App zeigt ihn groß zum Vorzeigen.

## 6. Optional: Direkt in OneDrive speichern

Damit „Fertig & speichern“ das PDF ohne Umweg in deinen Rechnungsordner legt, braucht die App einmalig
eine eigene Zugangsnummer von Microsoft (kostenlos):

Ordner: Die App legt PDFs in deinem Ordner **Rechnungen** (Link ist schon hinterlegt) im Unterordner
**Preisflieger 2026** ab. Für Rechnungen mit Datum 2027 wird **Preisflieger 2027** automatisch angelegt –
du musst nichts tun.

1. https://entra.microsoft.com mit deinem Microsoft-Konto öffnen
   → **Anwendungen → App-Registrierungen → Neue Registrierung**.
2. Name: `Rechnung`.
   Unterstützte Kontotypen: **Konten in einem beliebigen Organisationsverzeichnis und persönliche Microsoft-Konten**.
3. Umleitungs-URI: Plattform **Single-Page-Anwendung (SPA)**, Adresse genau wie deine App:
   `https://preisflieger.github.io/Rechnungs_Vorlage_PREISFLIEGER/` → **Registrieren**.
4. Die **Anwendungs-ID (Client-ID)** kopieren → in der App unter **Einstellungen → OneDrive** einfügen
   → **Mit OneDrive verbinden** → bei Microsoft den Zugriff auf deine Dateien erlauben.

Danach:
- PDFs heißen `RE_26_31 Kundenname.pdf` (änderbar unter Einstellungen → PDF-Dateiname, gleiche Nummer → wird ersetzt).
- Rechnungsnummern, Kunden und Verlauf werden über die Datei `_rechnungsapp-daten.json` im selben Ordner zwischen
  PC und Handy abgeglichen – die Nummer läuft also auf beiden Geräten richtig weiter.
- Microsoft verlangt gelegentlich eine neue Anmeldung (v. a. am iPhone); die App meldet sich dann mit „Anmelden“.

Ohne OneDrive-Einrichtung: Am Handy öffnet sich beim Speichern das Teilen-Menü → **OneDrive** wählen → Ordner.
Am PC landet das PDF im Download-Ordner (oder direkt im OneDrive-Ordner, wenn du den im Browser als Speicherort wählst).
Kunden und Verlauf überträgst du dann über **Einstellungen → Sicherung herunterladen / einspielen**.

## Hinweise

- **Leistungsdatum** ist in Österreich Pflichtangabe auf Rechnungen (§ 11 UStG) und deshalb neu dazugekommen;
  es wird automatisch auf das Rechnungsdatum gesetzt.
- Bei Rechnungen über € 10.000 brutto an Unternehmen muss die UID des Kunden draufstehen (Feld beim Kunden).
- Kleinunternehmer-Modus in den Einstellungen blendet die Umsatzsteuer aus und druckt den Hinweis.

Verwendete Bibliotheken (im Ordner `vendor`, Open Source): jsPDF, qrcode-generator, Papa Parse, SheetJS.
