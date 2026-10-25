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

1. Ins Feld **Name / Firma** tippen: Die App sucht in allen gespeicherten Kunden nach Name, Ort, Straße oder UID
   (z. B. „huber“ oder „linz“). Treffer antippen (oder **Enter**) füllt die ganze Adresse aus.
   Beim Antippen des leeren Felds siehst du die zuletzt verwendeten Kunden. Neue Kunden merkt sich die App automatisch
   beim **Fertig & speichern**. Mit dem **×** rechts in der Liste löschst du einen gespeicherten Kunden.
2. Ins Suchfeld Artikelnummer oder Teil des Namens tippen → Treffer antippen (oder **Enter** für den ersten).
   Nochmal denselben Artikel wählen erhöht die Menge. Nichts gefunden? **Enter** legt eine freie Position an.
3. Nach dem Auswählen springt der Cursor gleich ins **Mengenfeld** – Zahl eintippen, **Enter**, und weiter mit dem nächsten Artikel.
   Preis, Rabatt (%) und Steuersatz sind in jeder Zeile änderbar. Unter der Summe gibt es **Rabatt auf alles**,
   **Skonto %** und die **Skonto-Frist**. Oben rechts umschaltbar: Preise brutto oder netto.
4. **Fertig & speichern** → PDF wird erzeugt und abgelegt (OneDrive, Teilen-Menü oder Download).
   **Vorschau** öffnet das PDF zum Ansehen und Drucken, **PDF** teilt oder lädt es herunter.

Der Zahlungs-QR-Code (EPC/GiroCode) enthält IBAN, Empfänger, **genauen Betrag** und „Rechnung Nr.“ als Verwendungszweck.
Er wird direkt im Gerät erzeugt – kein Anbieter, keine Kosten. Antippen in der App zeigt ihn groß zum Vorzeigen.

## 6. Direkt in OneDrive speichern

Der Microsoft-Zugang ist eingerichtet (Azure-App-Registrierung „Rechnungs_Vorlage_PREISFLIEGER“,
Client-ID `3efe35a6-1e8c-4e5a-9afb-fd7e09a3fca7`, Umleitungs-URI `https://preisflieger.github.io/Rechnungs_Vorlage_PREISFLIEGER/`).
Die Client-ID ist in der App schon hinterlegt.

Auf jedem Gerät einmal: **Einstellungen (Zahnrad) → OneDrive → Mit OneDrive verbinden** → mit
Markus.und.Martina@outlook.com anmelden → Zugriff auf deine Dateien erlauben.

Ordner: Die App legt PDFs in deinem Ordner **Rechnungen** im Unterordner **Preisflieger 2026** ab.
Für Rechnungen mit Datum 2027 wird **Preisflieger 2027** automatisch angelegt.

Danach:
- PDFs heißen `RE_26_31 Kundenname.pdf` (änderbar unter Einstellungen → PDF-Dateiname, gleiche Nummer → wird ersetzt).
- Rechnungsnummern, Kunden und Verlauf werden über die Datei `_rechnungsapp-daten.json` im selben Ordner zwischen
  PC und Handy abgeglichen – die Nummer läuft also auf beiden Geräten richtig weiter.
- Microsoft verlangt gelegentlich eine neue Anmeldung (v. a. am iPhone); die App meldet sich dann mit „Anmelden“.

Ohne OneDrive-Einrichtung: Am Handy öffnet sich beim Speichern das Teilen-Menü → **OneDrive** wählen → Ordner.
Am PC landet das PDF im Download-Ordner (oder direkt im OneDrive-Ordner, wenn du den im Browser als Speicherort wählst).
Kunden und Verlauf überträgst du dann über **Einstellungen → Sicherung herunterladen / einspielen**.

## 6b. Gutschrift

Oben neben dem Titel zwischen **Rechnung** und **Gutschrift** umschalten, oder bequemer:
**Verlauf → bei der Rechnung auf „Gutschrift“** – dann werden Kunde und Positionen übernommen
und „zu Rechnung Nr.“ ist schon ausgefüllt. Positionen, die nicht zurückkommen, entfernen bzw. Menge anpassen.
Gutschriften laufen in derselben fortlaufenden Nummernreihe wie Rechnungen (z. B. RE_26_32), sind aber als
„Gutschrift“ gekennzeichnet: Überschrift im PDF, Dateiname `RE_26_32 Gutschrift Kunde.pdf`, Kennzeichen im Verlauf.
Kein Skonto und kein Zahlungs-QR.
Beim Speichern werden die Mengen in der Excel in der Spalte **Verkauf** wieder abgezogen
(aus `=0+1+1+2` wird `=0+1+1+2-1`). Die Spalte **Zukauf** wird nie verändert.

## 7. Lager: Verkäufe automatisch austragen

Bei **Fertig & speichern** schreibt die App die verkauften Artikel in die Datei `_lagerbuchungen.csv`
im Ordner der Produktliste (OneDrive › PREISFLIEGER › Produktlisten › Produktliste).
Beim nächsten **Öffnen der Excel** zählt das Makro die Mengen in der Spalte **Verkauf** dazu
(aus `=0+1+1` wird `=0+1+1+2`) und zeigt eine Liste mit dem neuen Lagerstand. Lagerbestand und Status
rechnen sich über die vorhandenen Formeln. Wird eine Rechnung geändert, bucht die Excel nur den Unterschied.
Rechnungen mit der Nummer „TEST…“ werden nicht gebucht.
In der App steht der Lagerbestand in der Artikelsuche, und sie warnt, wenn mehr verkauft wird als lagernd ist.

## 7. App-Sperre (PIN)

**Einstellungen → Sperre → PIN festlegen** (4–12 Ziffern). Danach fragt die App beim Öffnen nach der PIN,
und wieder, wenn sie länger im Hintergrund war (einstellbar: sofort, 1, 5, 15 Minuten oder nur beim Neustart).
Zusätzlich lässt sich **Face ID / Fingerabdruck / Windows Hello** einrichten.
Die PIN gilt pro Gerät; gespeichert wird nur ein verschlüsselter Prüfwert. Nach 5 falschen Versuchen wartet die App.
PIN vergessen → die App wird auf diesem Gerät zurückgesetzt; nach dem Verbinden mit OneDrive kommen Kunden,
Nummern und Verlauf zurück, PDFs in OneDrive bleiben ohnehin erhalten.

## Hinweise

- **Leistungsdatum** ist in Österreich Pflichtangabe auf Rechnungen (§ 11 UStG) und deshalb neu dazugekommen;
  es wird automatisch auf das Rechnungsdatum gesetzt.
- Bei Rechnungen über € 10.000 brutto an Unternehmen muss die UID des Kunden draufstehen (Feld beim Kunden).
- Kleinunternehmer-Modus in den Einstellungen blendet die Umsatzsteuer aus und druckt den Hinweis.

Verwendete Bibliotheken (im Ordner `vendor`, Open Source): jsPDF, qrcode-generator, Papa Parse, SheetJS.
