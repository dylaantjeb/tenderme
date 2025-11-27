KPI/SLA — Raamovereenkomst Catering- en Horecadiensten voor Gemeente Middenstad (ICT-beheer) — Project 1380

Doel en scope
- Doel: aantoonbaar sturen op beschikbaarheid, veiligheid en continuïteit van cloud- en infrastructuuroplossingen voor de Gemeente Middenstad via SMART KPI/SLA’s, conform ISO 9001 en ISO 27001.
- Servicevenster: 24/7 voor P1; standaard servicedesk ma–vr 08:00–18:00 uur CET (excl. NL-feestdagen).
- Definities: P1 = uitval/ernstige verstoring kritieke dienst of data-integriteit; P2 = significante degradatie; P3 = normale storing/verzoek; P4 = informatie/verzoek lage prioriteit.
- Uitsluitingen meting beschikbaarheid: vooraf aangekondigd onderhoud (max. 4 uur/maand, ≥2 werkdagen vooraf gecommuniceerd) en externe verbindingen buiten invloed Uno.

W-register (koppelingen naar must/KO/EMVI-criteria)
- W-01 KO: ISO 27001 gecertificeerd
- W-02 KO: ISO 9001 gecertificeerd
- W-03 KO: 24/7 bereikbaarheidsdienst
- W-04 Must: Maximale responstijd P1-incidenten: 30 minuten
- W-05 Must: Beschikbaarheid: 99,8% per maand
- W-06 Must: Monitoring & patchmanagement geborgd
- W-07 Must: ITIL-gebaseerde servicedeskprocessen
- W-08 Must: Alle data binnen de EU
- W-09 Must: Escalatieprocedure incidenten & changes
- W-10 Must: BCP beschikbaar
- W-11 Must: VOG indien vereist
- W-12 Must: Proactieve monitoring netwerk & endpoints
- W-13 Must: Ondersteuning Microsoft 365
- W-14 Deliverable: Plan van Aanpak
- W-15 Deliverable: Risicodossier
- W-16 Deliverable: KPI-overzicht
- W-17 EMVI: Kwaliteit (40%)
- W-18 EMVI: Duurzaamheid (20%)
- W-19 EMVI: Risicobeheersing (20%)
- W-20 EMVI: Prijs (20%)

KPI/SLA-overzicht (SMART, meetmethoden, frequente review, escalatie)

| KPI/SLA | Target | Meetmethode | Frequentie | Escalatie | Verantwoordelijke | Link W-xx/criterium | Meetbron |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Beschikbaarheid kritieke systemen | ≥ 99,80%/kalendermaand (excl. gepland onderhoud) | Uptime monitor (synthetic + heartbeat), logcorrelatie SIEM; formule: (beschikbare tijd – gepland onderhoud)/totale tijd | Maandelijks | <99,8%: binnen 1 uur IM; binnen 4 uur SDM; binnen 24 uur directie + klantreview | Service Delivery Manager (SDM) | W-05, W-17, W-19 | CMMS / Audit / Sensor |
| Responstijd P1 incidenten | ≤ 30 min (24/7), gemeten van melding tot acceptatie | ITSM-timestamp intake/ack; telefonische testcall | Per incident + maandelijks rapport | Overschrijding: direct IM; 30–60 min SDM; >60 min MT + opdrachtgever | Incident Manager (IM) | W-04, W-03, W-09, W-17 | CMMS / Audit / Sensor |
| Oplostijd P1 incidenten | ≤ 4 uur (SLA op hersteldienst) | ITSM “resolved”-tijd; waar nodig tijdelijke workaround | Per incident + maandelijks | >4 uur: escalatie L3/vendor; na 6 uur SDM; na 8 uur MT + klant | IM | W-04, W-09, W-17, W-19 | CMMS / Audit / Sensor |
| First Contact Resolution (FCR) | ≥ 70% binnen servicevenster | ITSM categorisatie “resolved at L1” | Maandelijks | <70%: L1-training binnen 10 werkdagen; SDM-review | Servicedesk Lead | W-07, W-17 | CMMS / Audit / Sensor |
| Klanttevredenheid (CSAT) | ≥ 8,2/10 gemiddelde | Post-ticket survey (min. 20% response) | Maandelijks | <7,8: corrigerende acties; kwartaalactieplan | SDM | W-17 | CMMS / Audit / Sensor |
| Patchcompliance (kritiek) | ≥ 98% binnen 72 uur na release | Endpoint/Server patchrapport; config compliance | Wekelijks + maandelijks | <98%: SecOff binnen 24u; Change Manager voor versnelde CAB | Security Officer (SecOff) | W-06, W-12, W-19 | CMMS / Audit / Sensor |
| Patchcompliance (overig) | ≥ 95% binnen 14 dagen | Idem | Wekelijks + maandelijks | <95%: backlog burn-down; escalatie SDM | Change Manager | W-06, W-12, W-19 | CMMS / Audit / Sensor |
| Monitoring coverage | 100% van gedefinieerde assets in monitoring | CMDB vs monitoring-inventory reconciliatie | Maandelijks | Gaps >0: binnen 2 werkdagen sluiting; SDM als >5 assets | Monitoring Lead | W-06, W-12, W-17 | CMMS / Audit / Sensor |
| Back-up succesratio | ≥ 99% dagelijkse jobs succesvol | Backup-console rapport; failed jobs hersteld <24u | Dagelijks + maandelijks | <99%: IM + SecOff; >2 dagen trend: MT | Backup Administrator | W-10, W-19 | CMMS / Audit / Sensor |
| Restore test en RTO | 100% kwartaaltests geslaagd; RTO ≤ 4 uur | Kwartaal DR-oefening, herstelrapport | Per kwartaal | Faal: direct problem record; binnen 10 werkdagen verbeterplan | BC/DR Manager | W-10, W-17, W-19 | CMMS / Audit / Sensor |
| Change succesratio | ≥ 98% zonder ongepland incident | ITSM change post-implementation review | Maandelijks | <98%: CAB maatregel; freeze indien <95% | Change Manager | W-07, W-09, W-17 | CMMS / Audit / Sensor |
| Doorlooptijd standaard changes | ≥ 90% binnen 2 werkdagen afgerond | ITSM doorlooptijdmeting | Maandelijks | <90%: resource-herallocatie; SDM | Change Manager | W-07, W-17 | CMMS / Audit / Sensor |
| Security-incident detectie en melding | Detectie ≤ 15 min; melding P1 ≤ 30 min | SIEM use-cases; SOC-alerts; war-room log | Per incident + maandelijks | Overschrijding: SecOff; 2e-lijn SOC; MT bij herhaling | SecOff | W-06, W-01, W-19 | CMMS / Audit / Sensor |
| EU data residency compliance | 100% data-opslag en -verwerking binnen EU | DPA/locatieverklaringen, cloud-tenant checks, datastromen register | Maandelijks + bij wijzigingen | Inbreuk: stop-actie; DPO melding; migratieplan <30 dagen | DPO / SecOff | W-08, W-01, W-19 | CMMS / Audit / Sensor |
| VOG-compliance | 100% medewerkers met VOG waar vereist | HR-dossiercontrole; onboarding-checklist | Maandelijks | Non-compliant: toegang per direct geblokkeerd; HR-escalatie | HR Lead | W-11, W-17 | CMMS / Audit / Sensor |
| 24/7 bereikbaarheid on-call | 100% shifts ingevuld; bereiktest ≥ 99% | On-call rooster; testcalls per maand | Maandelijks | Gemist: vervanging + root cause; SDM bij 2x | IM | W-03, W-09 | CMMS / Audit / Sensor |
| Microsoft 365 wijzigingsverzoeken | ≥ 95% licentie/rol-wijzigingen binnen 1 werkdag | M365 admin auditlog vs ticket | Maandelijks | <95%: capaciteitsaanpassing; SDM | M365 Lead | W-13, W-17 | CMMS / Audit / Sensor |
| Problem management (RCA P1) | 100% RCA binnen 3 werkdagen na herstel | RCA-rapport (Ishikawa/5x Why), CAB-validatie | Maandelijks | Overschrijding: SDM; MT bij trend | Problem Manager | W-07, W-19 | CMMS / Audit / Sensor |
| Duurzaamheid hosting | 100% groene stroom + PUE ≤ 1,40 voor gebruikte DC’s | Leveranciersverklaringen, ISO 14001/verklaringen, PUE-rapport | Halfjaarlijks | Non-compliance: vendor-remediatie of exit binnen 6 mnd | SDM / Inkoop | W-18 | CMMS / Audit / Sensor |

Escalatiepad (algemeen)
- Niveau 1: Servicedesk L1 (0–15 min)
- Niveau 2: Incident Manager / L2 (15–30 min)
- Niveau 3: Service Delivery Manager / L3 / leveranciers (30–60 min)
- Niveau 4: Managementteam Uno + opdrachtgever-contact (≥ 60 min)
Communicatiekanalen: ITSM-portaal, telefoon (24/7 hotline), war-room (Teams) bij P1.

PDCA-sturing
- Plan: Jaarplan met KPI-targets en risicoregister (W-14, W-15), change-kalender, BCP/DR-testkalender.
- Do: ITIL-processen (incident, problem, change, request), 24/7 monitoring, patching, back-up & restore.
- Check: Dagelijkse operationele checks; wekelijkse service review; maandelijkse KPI-rapportage aan opdrachtgever; kwartaal-audit (ISO 9001/27001 controles); kwartaal DR-test rapport.
- Act: Corrigerende/preventieve maatregelen (CAPA) binnen 10 werkdagen na afwijking; update risicodossier; aanpassing werkafspraken/CAB; lessons learned-sessies na elke P1.

Kruisverband W-xx ↔ KPI ↔ Risico ↔ Bewijs (selectie)
- R-01 Uitval kritieke systemen → KPI: Beschikbaarheid, RTO/DR-test, Back-up succesratio → Bewijs: monitoring-rapporten, DR-testverslagen, back-up logs → W-05, W-10, W-19.
- R-02 Trage incidentafhandeling → KPI: Responstijd P1, Oplostijd P1, FCR, Problem RCA → Bewijs: ITSM-extracten, call-records, RCA-rapporten → W-04, W-07, W-09, W-17.
- R-03 Ongepatchte systemen/exploit → KPI: Patchcompliance (kritiek/overig), Monitoring coverage → Bewijs: patchrapporten, CMDB-reconciliatie → W-06, W-12, W-19.
- R-04 Dataverwerking buiten EU → KPI: EU data residency → Bewijs: DPA’s, tenant-locatie, leveranciersverklaring → W-08, W-01.
- R-05 Onbereikbaarheid 24/7 → KPI: 24/7 bereikbaarheid on-call → Bewijs: rooster, testcall-logs → W-03, W-09.
- R-06 Onbeheerste changes → KPI: Change succesratio, Doorlooptijd changes → Bewijs: PIR’s, CAB-notulen → W-07, W-09.
- R-07 Security-incidenten onopgemerkt → KPI: Detectie/meldingstijd, Monitoring coverage → Bewijs: SIEM-alerts, use-case catalogus → W-06, W-01.
- R-08 Niet-duurzame hosting → KPI: Duurzaamheid hosting → Bewijs: leveranciersverklaringen groene stroom, PUE-rapportages → W-18.
- R-09 Ongeautoriseerd personeel → KPI: VOG-compliance → Bewijs: HR-screeningsbewijs → W-11.

Compliance & bewijsbronnen
- Certificeringen: ISO 27001 en ISO 9001 (certificaatkopieën en Scope Statements beschikbaar).
- Procesbeschrijvingen: ITIL-proceshandboeken (incident/problem/change/request, major incident).
- Monitoring: Uptime-rapportages, SIEM/SOC alerts, endpoint management exporten.
- Patching: Patch- en compliance-overzichten servers/endpoints.
- Back-up/DR: Back-up job logs, herstelproeven, DR-testplannen en testrapporten.
- Data/EU: DPA’s en locatieverklaringen (cloudproviders), tenantconfiguraties.
- HR/VOG: Gescreende medewerkerslijst, toegangsautorisatiematrix.
- Duurzaamheid: Verklaringen groene stroom, PUE-rapporten, ISO 14001/leveranciersverklaringen.

Rapportage en governance
- Rapportagekalender: wekelijks operationeel rapport; maandelijks KPI/SLA-rapport en managementsamenvatting; kwartaal-SROR (Service Review en Opportunities & Risks); halfjaarlijkse duurzaamheidsevaluatie.
- Overleggen: Wekelijkse service review (SDM + opdrachtgever), maandelijkse Steering Committee, kwartaal-CAB met trendanalyse.

Boete-/remediatie-afspraken (indien overeengekomen in contract)
- 2 opeenvolgende maanden onder target op Beschikbaarheid of P1 Oplostijd: kosteloos verbeterplan + versnelde maatregelen; derde maand: service credit conform raamcontract.
- Structurele non-compliance op EU data residency of Security detectie/melding: directe CAPA, escalatie MT en rapportage aan opdrachtgever; mogelijke tijdelijke change freeze.

Benodigde input:
- Lijst en classificatie van kritieke systemen/diensten + RTO/RPO-eisen.
- Overzicht locaties en netwerksegmenten; actueel assetregister/CMDB-export.
- Contact- en escalatieboom opdrachtgever (incl. 24/7 bereikpunten).
- Onderhoudsvensters en change freeze-periodes.
- Beveiligingsbeleid en dataclassificaties; DPA’s/contracten bestaande leveranciers.
- Back-upretentie- en compliance-eisen (archief/retentie per dataset).
- Microsoft 365 tenant-ID’s, domeinen en autorisatiescope.
- Specifieke duurzaamheidseisen/voorkeursdatacenters in de EU.

Benodigde input: