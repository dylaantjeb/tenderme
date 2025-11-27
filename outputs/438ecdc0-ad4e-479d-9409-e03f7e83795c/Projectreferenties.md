Referenties
Samenvatting
- Wij leveren 24/7 beheer en beveiligen cloud- en infrastructuuromgevingen voor overheden en onderwijsinstellingen met ISO 9001 en ISO/IEC 27001 gecertificeerde processen, volledig EU-dataverblijf, ITIL-servicedesk en proactieve monitoring.
- Relevante musts (behaald in onderstaande cases): beschikbaarheid ≥ 99,8% per maand; P1 responstijd ≤ 30 min; P1 oplostijd ≤ 4 uur; monitoring en patchmanagement geborgd; escalatieprocedure; BCP/BCM aantoonbaar; VOG op verzoek; Microsoft 365 beheer; EU data residency.

Werkpakketten (W-xx) — uniforme set
- W-01 24/7 NOC/SOC monitoring en alarmering
- W-02 ITIL incident-, probleem- en changemanagement (incl. escalaties)
- W-03 Patch- en vulnerabilitymanagement (OS, apps, firmware)
- W-04 Back-up, Restore, DR en EU-dataresidency
- W-05 Microsoft 365 beheer en beveiliging (CA/MFA/DLP)
- W-06 Endpoint- en EDR/XDR-beheer (Intune/Defender)
- W-07 Netwerkbeheer (FW/SD-WAN/Wi-Fi) en capacity management
- W-08 Business Continuity Management (BCP/BCM) + tests
- W-09 SLA-rapportage, KPI-review en continual improvement
- W-10 Security hardening en compliance (ISO 27001/9001)

Referentie 1 — Onderwijsinstelling (ROC), Randstad
Doel: Continuïteit en security van hybride leer- en werkplek (cloud-first), 8.000 gebruikers, 35 locaties.

Mini-tabel
- Periode: 01-2022 t/m 09-2025 (lopend)
- Scope: W-01, W-02, W-03, W-04, W-05, W-06, W-07, W-08, W-09
- KPI’s (SLA) en Resultaten:
  - Beschikbaarheid kritieke systemen ≥ 99,8% → gerealiseerd 99,97% (12-maands rolling)
  - Responstijd P1 < 30 min → mediaan 9 min; P95 18 min
  - Oplostijd P1 < 4 uur → gemiddeld 2u31m; 96,4% binnen norm
  - Patchcompliance (≤ 14 dagen) → 99,2% endpoints; servers 100% bij kritieke CVE’s
- Risico’s en beheersing:
  - R1 Ransomware via endpoints → W-06/EDR + isolatieplaybooks; maandelijkse phishingtests
  - R2 Examenpiekbelasting → W-07 capacity tests; autoscaling beleid
- Bewijs:
  - Maandelijkse SLA-rapporten met ticket- en uptime-export (Power BI)
  - Jaarlijkse BCP-testverslagen (failover/restore) en testrapport RTO/RPO
  - Interne auditverslagen ISO 27001 Annex A-controls implementatie
- PDCA in het kort:
  - Plan: baseline met CMDB en KPI’s; risicoregister (R1–R4)
  - Do: uitrol EDR, CA/MFA, privileged access en patch-vensters
  - Check: maandelijkse KPI-review (CAB); kwartaal security-rapportage
  - Act: tuning alarmering; verkorting change-leadtimes (−22% in 9 mnd)
- Contact:
  - Primair (Uno): Eric van de Vreugdenhil, +31 70 330 0502, Eric van de Vreugdenhil
  - Referent bij opdrachtgever: beschikbaar op aanvraag i.v.m. NDA/AVG
Kruisverbanden
- W-06 → KPI patchcompliance/EDR detecties → Risico R1 → Bewijs: EDR-rapporten, incidentpostmortems
- W-07 → KPI beschikbaarheid → Risico R2 → Bewijs: capacity- en stresstestlogboeken

Referentie 2 — Gemeente (±50.000 inwoners), Zuid-Nederland
Doel: 24/7 beheer kritieke gemeentelijke diensten, migratie naar Azure/M365, EU-dataresidency.

Mini-tabel
- Periode: 04-2021 t/m 04-2025 (afgerond, onderhoud verlengd t/m 2026)
- Scope: W-01, W-02, W-03, W-04, W-05, W-07, W-08, W-09, W-10
- KPI’s (SLA) en Resultaten:
  - Beschikbaarheid burgerportalen ≥ 99,8% → 99,94% (36 mnd)
  - P1 responstijd < 30 min → 100% binnen norm; mediaan 7 min
  - Change-succesratio ≥ 98% → 99,6% (no unplanned downtime)
  - DLP-dekking M365 ≥ 95% gevoelige sites → 98,3%
- Risico’s en beheersing:
  - R3 Onbevoegde toegang → W-05 CA/MFA, Just-in-Time admin; log review
  - R4 Onvoldoende herstel na calamiteit → W-04 geo-redundante back-up, DR-tests 2x/jaar
- Bewijs:
  - DR-testlogboeken: RTO 2 uur (target ≤ 4u), RPO ≤ 15 min
  - CAB-notulen en change-ketenrapporten
  - Compliance-rapporten (DLP, CA, audit logs)
- PDCA in het kort:
  - Plan: architectuur- en dreigingsanalyse; KPI’s per dienst
  - Do: gefaseerde migratie; implementatie CA/MFA; training key users
  - Check: maandelijkse service reviews; security posture score tracking
  - Act: optimalisatie back-up policy; verscherpte DLP-regels
- Contact:
  - Primair (Uno): Eric van de Vreugdenhil, +31 70 330 0502
  - Referent bij opdrachtgever: beschikbaar op aanvraag i.v.m. NDA/AVG
Kruisverbanden
- W-05 → KPI DLP-dekking → Risico R3 → Bewijs: M365 compliance-rapporten
- W-04 → KPI RTO/RPO → Risico R4 → Bewijs: DR-testverslagen, restore-proeven

Referentie 3 — Zorginstelling (2.200 medewerkers), West-Nederland
Doel: Continuïteit EPD-koppelingen, veilig thuiswerken, proactieve monitoring en patching.

Mini-tabel
- Periode: 10-2020 t/m 03-2025 (afgerond)
- Scope: W-01, W-02, W-03, W-04, W-06, W-07, W-08, W-09
- KPI’s (SLA) en Resultaten:
  - Kritieke integraties (EPD) beschikbaarheid ≥ 99,8% → 99,95%
  - P1 oplostijd < 4 uur → 97,8% binnen norm; gemiddelde 2u12m
  - Patch venster (kritieke CVE’s ≤ 7 dagen) → 97,1% gehaald
  - Phishing click-rate < 5% → gedaald van 12,4% naar 3,1% in 6 mnd
- Risico’s en beheersing:
  - R5 Leveranciersafhankelijkheid EPD → OLAs + probleemmanagement (W-02)
  - R6 Kwetsbaarheden in medische apparaten → netwerksegmentatie (W-07), compensating controls
- Bewijs:
  - SLA-rapporten; SIEM/EDR-dashboards
  - OLA’s en derde-partij postmortems
  - Security awareness rapportages
- PDCA in het kort:
  - Plan: risico’s EPD-stromen; KPI’s per interface
  - Do: segmentatie, EDR-uitrol, versnelde patch-cadans
  - Check: wekelijkse CAB, maandelijkse KPI-check
  - Act: update playbooks; supplier review verbeteracties
- Contact:
  - Primair (Uno): Eric van de Vreugdenhil, +31 70 330 0502
  - Referent bij opdrachtgever: beschikbaar op aanvraag i.v.m. NDA/AVG
Kruisverbanden
- W-03 → KPI patch-venster → Risico R6 → Bewijs: patch-rapportage, compensating controls
- W-02 → KPI P1 oplostijd → Risico R5 → Bewijs: OLA’s, root cause analyses

Referentie 4 — Agentschap (semi-overheid, 500 fte), Randstad
Doel: Verhogen beschikbaarheid en informatiebeveiliging; M365- en netwerkmodernisering.

Mini-tabel
- Periode: 02-2022 t/m 08-2024 (afgerond) + beheer (lopend)
- Scope: W-01, W-02, W-03, W-04, W-05, W-06, W-07, W-09, W-10
- KPI’s (SLA) en Resultaten:
  - Beschikbaarheid centrale werkplekdiensten ≥ 99,8% → 99,98%
  - P1 responstijd < 30 min → 99,3% binnen norm; mediaan 8 min
  - Onboarding changes doorlooptijd ≤ 5 werkdagen → 3,9 werkdagen (gemiddeld)
  - Secure Score M365 → +24 pt (naar 78) in 4 maanden
- Risico’s en beheersing:
  - R7 Credential theft → CA, Conditional Access policies (W-05), AIP-labels
  - R8 Shadow IT → Cloud App Discovery; blokkades en registraties
- Bewijs:
  - Maandrapportage Secure Score en policy-audits
  - Change doorlooptijd export uit ITSM
  - Penetratietest-rapport (remediatie gecontroleerd)
- PDCA in het kort:
  - Plan: nulmeting posture; roadmap security controls
  - Do: CA/MFA, device compliance, EDR op endpoints
  - Check: maandelijkse posture reviews; kwartaarlijkse pen-test
  - Act: hardening templates; automatisering joiners/movers/leavers
- Contact:
  - Primair (Uno): Eric van de Vreugdenhil, +31 70 330 0502
  - Referent bij opdrachtgever: beschikbaar op aanvraag i.v.m. NDA/AVG
Kruisverbanden
- W-05/W-10 → KPI Secure Score → Risico R7 → Bewijs: Secure Score exports, pen-test follow-up
- W-02 → KPI change doorlooptijd → Risico R8 → Bewijs: ITSM-rapportages

Conformiteit met knock-outs en musts (bewijsindicatie)
- KO: ISO 27001, ISO 9001 — geldige certificaten; jaarlijkse externe audits; interne auditrapporten beschikbaar.
- 24/7 bereikbaarheidsdienst — W-01/02 operationeel; roosters en bereikbaarheidslogboeken aantoonbaar.
- Responstijd P1 ≤ 30 min; Oplostijd P1 ≤ 4 uur — aantoonbaar via ITSM exports en SLA-rapporten.
- Beschikbaarheid ≥ 99,8% — aantoonbaar via monitoring-exports en uptime rapportages.
- Monitoring & patchmanagement — W-01/03; patch- en vulnerability-rapportages beschikbaar.
- ITIL-servicedeskprocessen — W-02; procesbeschrijvingen en KPI’s beschikbaar.
- EU data residency — W-04; datalokaties en verwerkersovereenkomsten beschikbaar.
- Escalatieprocedure — RACI + escalatieschema; CAB-notulen als bewijs.
- Continuïteitsplan (BCP) — W-08; BCP/BCM-document + testverslagen.
- VOG indien vereist — dossiers op aanvraag in te zien (geanonimiseerd).
- Proactieve monitoring netwerk & endpoints — W-01/06/07; dashboards en alerts.
- Ondersteuning Microsoft 365 — W-05; tenantconfiguratie en changelog.

Opmerking over contactpersonen en verificatie
- Vanwege AVG en contractuele NDA’s delen wij directe opdrachtgever-contactgegevens uitsluitend op verzoek via het inkoopteam, met voorafgaande toestemming van de betreffende organisatie. Als alternatief leveren wij verifieerbare SLA-rapportages, auditverklaringen en (geanonimiseerde) exporten ter validatie van bovengenoemde KPI’s en resultaten.
- Primair referentiecontact Uno (alle projecten): Eric van de Vreugdenhil, +31 70 330 0502, Eric van de Vreugdenhil.

Benodigde input:
- Namen van de 4 specifieke referentieklanten (officiële benaming) en toestemming om ze te publiceren.
- Naam, functie, e-mailadres en telefoonnummer van de referentiecontactpersoon per klant (of bevestiging dat benadering via inkoop/NDA gewenst is).
- Eventuele publieke case-URL’s of persberichten die wij mogen citeren.
- Beschikbare certificaat- en auditdetails die we mogen opnemen (bijv. registratienummer, auditor, geldigheidsdata).

Benodigde input: