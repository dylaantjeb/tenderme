Aannames & Uitsluitingen – Raamovereenkomst Catering- en Horecadiensten voor Gemeente Middenstad (aanbestedende dienst: NVAO)

Doel en context
- Doel: Vastleggen van eenduidige aannames, juridische uitsluitingen en financiële consequenties voor de ICT-ondersteuning van catering- en horecadiensten door Uno Automatiseringdiensten B.V. (hierna: Uno) binnen een EMVI-raamovereenkomst.
- Relevantie: De primaire dienstverlening van Uno betreft ICT-beheer, cloud, infrastructuur en security. Operationele cateringactiviteiten (food & beverage) vallen buiten onze scope.
- Kaders: ISO 9001 en ISO 27001 gecertificeerd; AVG-conform; PDCA-gestuurd.

Reikwijdte en kern­aannames (W-xx; SMART, PDCA-conform)
- W-01 Kassasystemen/IoT-connectiviteit
  - Aanname: Aanbestedende dienst levert gecertificeerde POS/keukenapparatuur; Uno levert netwerk, secure connectiviteit en monitoring.
  - KPI: 99,8% netwerkbeschikbaarheid/locatie per maand; incident-responsetijd P1 ≤ 60 min.
  - PDCA: Plan netwerkdesign; Do implementatie; Check uptime-rapportage maandelijks; Act verbeterplan bij <99,8%.
- W-02 Cloud- en platformbeheer
  - Aanname: Hosting in EU-datacenters; identity via SAML/OIDC vanuit klant-IdP.
  - KPI: 99,9% service-uptime maand; changes volgens CAB ≤ 5 werkdagen doorlooptijd.
  - PDCA-cyclus per release; security-patch venster maandelijks.
- W-03 Service & Support
  - Aanname: Servicetijden 08:00–18:00 CET ma–vr; 24/7 optioneel op separate opdracht.
  - KPI: First response P2 ≤ 4 uur; Oplostijd P3 ≤ 3 werkdagen.
  - PDCA: KTO per kwartaal; trendanalyse tickets; verbeteracties met eigenaar en deadline.
- W-04 Datakoppelingen/rapportages
  - Aanname: Toegang tot APIs van leverancier (POS/financieel); datakwaliteit door bronverantwoordelijke.
  - KPI: 98% succesvolle ETL-jobs; dataverversing ≤ 24 uur.
  - PDCA: Datakwaliteitsoverleg per maand; issue backlog en cleanup.
- W-05 Onboarding/migratie
  - Aanname: Toegang tot locaties en change-windows; cutovers buiten lunch/diner-piek.
  - KPI: Onboarding per locatie ≤ 10 werkdagen na akkoord ontwerp.
  - PDCA: Go/no-go checklist; evaluatie binnen 5 werkdagen na livegang.
- W-06 Continuïteit/BCDR
  - Aanname: Back-up retentie 30 dagen; restore-tests per kwartaal.
  - KPI: RTO ≤ 4 uur; RPO ≤ 1 uur voor kritieke componenten.
  - PDCA: Testverslag en verbetermaatregelen elk kwartaal.
- W-07 Duurzaamheid
  - Aanname: Gebruik energie-efficiënte infrastructuur; rapportage CO2e over ICT-onderdeel.
  - KPI: -5% kWh/locatie/jaar ICT-stroomverbruik versus nulmeting.
  - PDCA: Jaarplan reductie, halfjaarlijkse review en bijsturing.
- W-08 Contract & SLA
  - Aanname: ICT-voorwaarden conform GIBIT 2020 of gelijkwaardig; afwijkingen schriftelijk.
  - KPI: 100% compliant change-/incident-registratie; auditbevindingen = 0 major.
  - PDCA: Contractreview halfjaarlijks; CAPA bij afwijkingen.

Kruisverband W-xx ↔ KPI ↔ Risico ↔ Bewijs
- W-01: KPI uptime 99,8% ↔ Risico: falende connectiviteit ↔ Bewijs: monitoring-dashboards, uptime-rapporten.
- W-02: 99,9% service-uptime ↔ Risico: platformstoring ↔ Bewijs: cloud SLA-logs, change-logs.
- W-03: Responstijden ↔ Risico: servicevertraging ↔ Bewijs: ticketing-extracten (ITSM).
- W-04: 98% ETL-succes ↔ Risico: foutieve rapportage ↔ Bewijs: ETL-runbooks, controlelogs.
- W-05: 10 wd onboarding ↔ Risico: openingsvertraging ↔ Bewijs: go-live checklists, sign-offs.
- W-06: RTO/RPO ↔ Risico: omzetverlies bij uitval ↔ Bewijs: restore-testrapporten.
- W-07: -5% kWh ↔ Risico: hogere energiekosten/CO2 ↔ Bewijs: energierapporten, configuratie-overzichten.
- W-08: 100% registraties ↔ Risico: non-compliance ↔ Bewijs: auditverslagen, ISO-certificaten.

Uitsluitingen (juridisch/operationeel)
- Cateringoperatie: inkoop/bereiding/uitgifte van food & beverages, personeel, roosters, HACCP, allergenenbeheer, kassabeheerprocessen en kasgeld vallen buiten scope.
- Hardwarelevering: levering/onderhoud van keukenapparatuur en POS-hardware uitgesloten, tenzij apart besteld; Uno levert uitsluitend ICT-configuratie en netwerkcomponenten op aanvraag.
- Facilities: schoonmaak, vergunningen, brandveiligheid en bouwkundige aanpassingen uitgesloten.
- Content/licenties: toepassingslicenties van derde leveranciers (POS/ERP) niet inbegrepen; aanschaf/licenties door klant of via separate opdracht.
- Telecommunicatie: WAN/Mobile datacontracten door klant of separate opdracht; Uno configureert maar levert geen mobiele abonnementen.

Privacy & Security
- Rollen: Aanbestedende dienst is verwerkingsverantwoordelijke; Uno is verwerker. Verwerkersovereenkomst (AVG, art. 28) vereist.
- Dataminimalisatie en EU-gegevensopslag; DPIA door verantwoordelijke indien noodzakelijk.
- Toegangsbeheer via MFA; logging bewaard 12 maanden; penetratietest jaarlijks op scope ICT.
- Incidentmelding datalekken binnen 24 uur na ontdekking met root cause binnen 5 werkdagen.

SLA en onderhoudsvensters
- Standaard onderhoudsvenster: di/doo 22:00–06:00 CET, aangekondigd ≥ 5 werkdagen vooraf.
- Piekuren catering (11:00–14:00, 17:00–20:00) zijn change-free, tenzij P1-incident.

Financiële consequenties bij afwijkingen/wijzigingen
- Prijzen: pricing locked voor de beschreven ICT-scope; wijzigingen uitsluitend via schriftelijk wijzigingsverzoek en meerwerk op uurtarief per rol.
- Buiten-scope verzoeken (24/7 support, extra locaties, versneld cutover, on-site standby) worden apart geoffreerd.
- Vertraging door geen/late toegang, ontbrekende informatie of niet-gereed netwerk/elektra leidt tot herplanning; extra inzet wordt nacalculatief gefactureerd.
- Licentie- en clouddienstkosten van derden worden één-op-één doorbelast conform leveranciersvoorwaarden.

Garantie
- 12 maanden garantie op door Uno geleverde configuraties en implementatiediensten; herstel van door Uno veroorzaakte defecten kosteloos binnen redelijke termijn.
- Uitsluitingen: misbruik, ongeautoriseerde wijzigingen, third-party defects buiten Uno’s invloed.

Aansprakelijkheid en recht
- Aansprakelijkheid beperkt tot directe schade en tot maximaal het jaarbedrag over de betreffende prestatie, behoudens opzet/grove schuld en AVG-specifieke verplichtingen conform DPA.
- Toepasselijk recht: Nederlands recht; bevoegde rechter Den Haag, tenzij aanbestedingsdocumenten anders bepalen.
- Voorrang: aanbestedingsstukken en gesloten raamovereenkomst gaan voor op deze aannames waar strijdig.

Operationele aannames en randvoorwaarden
- Locatietoegang minimaal 5 werkdagen vooraf bevestigd; bevoegd aanspreekpunt per locatie.
- Minimale netwerkinfrastructuur aanwezig (gescheiden VLAN voor POS, PoE waar nodig).
- Besluitvormingstermijnen: CAB-besluiten binnen 3 werkdagen; inhoudelijke acceptatie testresultaten binnen 5 werkdagen.
- Onboarding-start binnen 10 werkdagen na gunning en beschikbaarheid benodigde informatie.

Duurzaamheid en rapportage
- Gebruik van datacenters op hernieuwbare energie waar mogelijk; inzicht in energieverbruik ICT-onderdeel per kwartaal.
- E-waste afvoer via WEEE-conforme partij op separate opdracht.

Risico’s bij afwijkingen (selectie)
- Onvoldoende WiFi-dekking → omzetverlies; mitigerend site-survey vooraf; meerkosten voor extra access points via wijziging.
- Onvolledige API-toegang → incomplete rapportages; mitigerend: datacontracten en fallback-export; meerwerk voor connectors.

Bewijs en audits
- Beschikbaar: ISO 27001/9001 certificaten, SOC/pen-test samenvattingen, ITSM-rapportages, BCDR-testverslagen, verwerkersovereenkomst op template-basis.

Benodigde input:
- Overzicht locaties (adressen, openingstijden, piekuren), Go-Live prioritering.
- Aantal en type POS/keukenapparatuur per locatie en leveranciers/versies.
- Netwerk- en bekabelingsdiagrammen per locatie; beschikbare internet/WAN-capaciteit.
- Bevoegde contactpersonen per locatie en CAB-procesafspraken.
- Gekozen toepassingsstack (POS/ERP), licentiemodel en API-toegang.
- Gewenste SLA-classificaties en eventuele 24/7-dekking.
- Gegevensclassificatie en DPIA-uitkomst (indien van toepassing).
- Specifieke duurzaamheidseisen en rapportageformat (CO2, kWh).

Benodigde input: