KPI/SLA Dashboard — Raamovereenkomst Catering- en Horecadiensten voor Gemeente Middenstad (ICT-beheer)

Context en scope
- Opdrachtnemer: Digital Ease B.V. (ISO 27001, ISO 9001, NEN 7510). 24/7 NOC en servicedesk, EU-only datalocatie. Tools: TOPdesk Cloud (EU, NL), Zabbix + Grafana (monitoring, NL), Veeam (back-up, NL), Wazuh SIEM (NL), Microsoft Defender for Endpoint (EU Data Boundary), Intune/WSUS (patching), Greenbone/OpenVAS (vuln. scanning, NL).
- Kritieke diensten (indicatief): Identity (Microsoft Entra ID), Microsoft 365, firewall/VPN, internetkoppelingen, virtualisatiecluster, fileservices, core-switching. P1 = zware verstoring/uitval kritieke dienst of beveiligingsincident; P2 = aanzienlijke verstoring met werkbare work-around; P3 = standaard incident/verzoek. Geplande onderhoudsvensters vallen buiten beschikbaarheid indien ≥ 2 werkdagen vooraf aangekondigd.
- Referentiekaders: W-01 t/m W-13 (afgeleid van must/KO), plus tender-SLA’s; EMVI-criteria C-01 Kwaliteit, C-02 Duurzaamheid, C-03 Risicobeheersing, C-04 Prijs.

W- en C-codes
- W-01 ISO 27001; W-02 ISO 9001; W-03 24/7 bereikbaarheidsdienst; W-04 Responstijd P1 ≤ 30 min; W-05 Beschikbaarheid ≥ 99,8%/maand; W-06 Monitoring & patchmanagement; W-07 ITIL servicedeskprocessen; W-08 EU dataverwerking; W-09 Escalatieprocedure; W-10 BCP; W-11 VOG-personeel; W-12 Proactieve monitoring netwerk & endpoints; W-13 Ondersteuning Microsoft 365; W-14 Oplostijd P1 < 4 uur (tender-SLA).
- C-01 Kwaliteit; C-02 Duurzaamheid; C-03 Risicobeheersing; C-04 Prijs.

KPI/SLA-overzicht
| KPI/SLA | Target | Meetmethode | Frequentie | Escalatie | Verantwoordelijke | Link W-xx/criterium | Meetbron |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 1. Beschikbaarheid kritieke systemen | ≥ 99,8% per kalendermaand per dienst (excl. aangekondigd onderhoud) | Zabbix uptime checks (1-min interval), correlatie met change- en storingslog | Realtime; maandrapport | Dreiging <99,9% maand: Duty Manager (DM) binnen 15 min; <99,8% bereikt: Operations Manager (OM) + opdrachtgever binnen 30 min; 2 maanden op rij: MT-review | NOC Lead | W-05, W-12; C-01, C-03 | CMMS / Audit / Sensor |
| 2. Responstijd P1 | 100% binnen 30 min (24/7) | TOPdesk tijdstempels (aanname- en eerste-actie), telefoonlogs | Realtime; week/maandrapport | 15 min nadert: DM direct; bij overschrijding: OM + escalatieketen klant; herhaling >2x/maand: root cause review | Service Manager | W-03, W-04, W-07, W-09; C-01, C-03 | CMMS / Audit / Sensor |
| 3. Oplostijd P1 | ≥ 95% opgelost binnen 4 uur | TOPdesk doorlooptijd P1, changelog, vendor-tickets | Realtime; maandrapport | 3 uur open: OM + Vendor Manager; 4 uur overschrijding: MT + opdrachtgever; >3 cases/maand: verbeterplan | Operations Manager | W-14, W-07, W-09; C-01, C-03 | CMMS / Audit / Sensor |
| 4. Responstijd P2 | ≥ 95% binnen 1 uur (kantooruren) en ≥ 90% binnen 2 uur (buiten kantooruren) | TOPdesk tijdstempels | Dagelijks; maandrapport | Dreiging overschrijding: Teamlead; structureel < target: capaciteitsplan bij QBR | Servicedesk Teamlead | W-07; C-01 | CMMS / Audit / Sensor |
| 5. Oplostijd P2 | ≥ 90% binnen 8 uur werktijd | TOPdesk doorlooptijd P2 | Dagelijks; maandrapport | 6 uur nadert: Teamlead; overschrijding: Service Manager; trendbreuk: problem management | Service Manager | W-07; C-01 | CMMS / Audit / Sensor |
| 6. Patch compliance endpoints/servers | Kritieke patches: ≥ 95% binnen 7 dagen; maandcumulatief: ≥ 98% binnen 21 dagen | Intune/WSUS, Linux repo-rapporten, compliance dashboards | Dagelijks; week/maandrapport | Daling >2% onder target: Security Officer + Change Manager; 2 weken onder target: CAB-interventie | Change Manager | W-06, W-01; C-03 | CMMS / Audit / Sensor |
| 7. Proactieve monitoring dekking | ≥ 98,5% van assets rapporteert in laatste 24 uur; 100% van Tier-1 in laatste 15 min | Zabbix agent/agentless, asset-inventaris | Realtime; weekrapport | Dekking <98,5%: NOC actie <4 uur; Tier-1 gap: direct DM | NOC Lead | W-12, W-06; C-01, C-03 | CMMS / Audit / Sensor |
| 8. Security incident time-to-contain (P1-security) | ≥ 90% containment ≤ 60 min na detectie | Wazuh SIEM detecties + incidenttijdlijnen, Defender for Endpoint | Realtime; maandrapport | 45 min nadert: Security Officer; overschrijding: OM + CISO-overleg klant; post-incident review verplicht | Security Officer | W-01, W-06, W-09; C-03 | CMMS / Audit / Sensor |
| 9. Back-up succesratio | ≥ 99% dagelijkse jobs succesvol; mislukte jobs 100% binnen 24 uur hersteld | Veeam joblogs, hersteltests | Dagelijks; week/maandrapport | Succesratio <99%: Backup Admin <2 uur; 2 dagen trend: OM + BCP-test | Backup Administrator | W-10; C-03 | CMMS / Audit / Sensor |
| 10. RTO-test Tier-1 workloads | 100% van kwartaaltests haalt RTO ≤ 4 uur | Geplande BCP-oefeningen, herstelrapporten | Per kwartaal | Dreiging RTO >3 uur: OM + leverancier(s); bij overschrijding: directielijn + verbeterplan | Operations Manager | W-10; C-03 | CMMS / Audit / Sensor |
| 11. Change succesratio | ≥ 95% changes zonder rollback; emergency changes ≤ 5%/maand | ITIL CAB-rapportages, TOPdesk changes | Maandelijks; QBR | Bij daling <95%: CAB-actie; emergency >5%: freeze op non-urgent changes | Change Manager | W-07; C-01, C-03 | CMMS / Audit / Sensor |
| 12. EU data residency compliance | 0 datalocatie-incidenten; 100% logs/back-ups in EU | DPIA’s, verwerkersovereenkomsten, platformregionen | Maandelijks; QBR | Incident: direct Security Officer + FG/Privacy Officer klant; melding conform DPA | Security Officer | W-08, W-01; C-03 | CMMS / Audit / Sensor |
| 13. First Contact Resolution (FCR) | ≥ 72% van eindgebruikersincidenten bij 1e contact opgelost | TOPdesk categorisatie, QA-steekproef | Wekelijks; maandrapport | <72% twee weken op rij: extra kenniskaarten en coaching; QBR-acties | Servicedesk Teamlead | W-07; C-01 | CMMS / Audit / Sensor |
| 14. Klanttevredenheid (CSAT) | Gemiddeld ≥ 8,2/10 per maand; n≥30 responses per kwartaal | Post-ticket surveys, kwartaalenquête | Maandelijks; per kwartaal | <8,2: Service Improvement Plan binnen 10 werkdagen; directielijn bij twee kwartalen | Service Manager | C-01 | CMMS / Audit / Sensor |
| 15. Kwetsbaarheden (High) remediatie | ≥ 95% High CVEs opgelost binnen 14 dagen; >99% in 30 dagen | Greenbone/OpenVAS scans, change tickets | Wekelijks; maandrapport | Trend <95%: prioritering in CAB; 2 maanden <95%: extra resources/patchwindow | Security Officer | W-06, W-01; C-03 | CMMS / Audit / Sensor |
| 16. Microsoft 365 support (P3) | ≥ 90% M365 P3-tickets opgelost binnen 2 werkdagen | TOPdesk, Microsoft admin portals | Dagelijks; maandrapport | <90% weekgemiddelde: M365 specialist bijschakelen; maand <90%: capaciteitsaanpassing | M365 Lead | W-13, W-07; C-01 | CMMS / Audit / Sensor |

PDCA-borging
- Plan: Jaarlijkse SLA- en risicobaseline (ISO 27001/9001), scopekritieke diensten en RTO/RPO per dienst; onderhoudskalender; DPIA/EU-datalocatiecontrole. KPI-definities en rapportagesjablonen vastgesteld met opdrachtgever.
- Do: 24/7 operatie via NOC/servicedesk; geautomatiseerde monitoring, patching en back-ups; ITIL-procesuitvoering (incident, problem, change); beveiligingsdetectie en containment.
- Check: Maandelijkse SLA-rapportage met trendanalyse en root cause analyses; kwartaal QBR met auditbevindingen, penetratietestresultaten en risicodossier; interne audits (ISO 27001/9001).
- Act: Continual Service Improvement (CSI) register met acties, eigenaar, deadline en verwachte impact; CAB-besluitvorming; lessons learned na incidenten/changes; herijking KPI-targets 2x per jaar in overleg.

Escalatiematrix (aanvullend op tabel)
- Niveau 1: Servicedesk/NOC 24/7 (telefonisch en TOPdesk).
- Niveau 2: Duty Manager (direct), Teamlead functioneel.
- Niveau 3: Operations Manager/Change Manager/Security Officer (afhankelijk van issue).
- Niveau 4: Directielijn Digital Ease + opdrachtgever (bij herhaalde overschrijdingen of materialiteit).
- Communicatie: binnen 30 min bij P1 updates; status iedere 60 min totdat opgelost; post-incident rapport binnen 5 werkdagen.

Risico- en bewijsmatrix (kruisverbanden)
- R-01 Onbeschikbaarheid kritieke systemen → KPI 1; Bewijs: E-02 Uptime-rapporten, E-12 SLA-rapporten.
- R-02 Trage P1-respons → KPI 2; Bewijs: E-03 TOPdesk-export, E-13 telefonielogs.
- R-03 Te lange P1-oplossing → KPI 3; Bewijs: E-03, E-14 RCA’s.
- R-04 Capaciteits- en wachtrijopbouw P2 → KPI 4–5; Bewijs: E-03 wachtrijstatistieken.
- R-05 Exploits door ontbrekende patches → KPI 6, 15; Bewijs: E-05 patchcompliance-rapporten, E-06 vuln-scanrapporten.
- R-06 Onvoldoende monitoringdekking → KPI 7; Bewijs: E-02 monitoringinventaris.
- R-07 Securitybreach escalatie → KPI 8; Bewijs: E-07 SIEM-incidentdossiers, E-14 post-incident.
- R-08 Dataverlies door back-up falen → KPI 9–10; Bewijs: E-08 back-up/herstelrapporten, E-15 BCP-testverslagen.
- R-09 EU data residency schending → KPI 12; Bewijs: E-09 DPIA’s, E-10 verwerkersovereenkomsten, E-11 regio-config screenshots.
- R-10 Procesdiscipline ITIL → KPI 11; Bewijs: E-16 CAB-notulen, change metrics.
- R-11 Service-ervaring eindgebruiker → KPI 13–14; Bewijs: E-17 CSAT-export, QA-steekproeven.
- R-12 M365 continuïteit → KPI 16; Bewijs: E-03 ticketdata, E-18 Microsoft admin audit logs.

Evidence (E) bronnen en audittrail
- E-02 Zabbix/Grafana uptime- en dekkingsrapporten (NL-hosted).
- E-03 TOPdesk Cloud exports (incident, change, SLA).
- E-05 Intune/WSUS compliance rapporten; Linux repo logs.
- E-06 Greenbone/OpenVAS maandrapporten.
- E-07 Wazuh SIEM incidentdossiers en tijdlijnen.
- E-08 Veeam back-up en herstelrapportage.
- E-09 DPIA’s en dataflow-diagrammen.
- E-10 Verwerkersovereenkomsten en datalocatie-addenda.
- E-11 Platformregio-instellingen (EU) en audit-screenshots.
- E-12 Maandelijkse SLA-rapporten (PDF) met ondertekening Service Manager.
- E-14 Root Cause Analyses (RCA) conform ISO 9001.
- E-15 BCP/DR-testverslagen en actiepunten.
- E-16 CAB-notulen en change kalenders.
- E-17 CSAT-surveys en response overzichten.
- E-18 Microsoft 365 audit logs en Admin Center rapportages.

Rapportage en governance
- Realtime dashboards (Grafana, TOPdesk SLA) voor opdrachtgever.
- Maandelijkse SLA-meeting (60 min): KPI’s, incidenten, verbeteracties.
- Kwartaal QBR (120 min): trends, risico’s, roadmap, auditresultaten, duurzaamheid (energieverbruik datacenter en remote-first werkmethodiek).
- Contractuele boete-/servicekredietregeling optioneel te koppelen aan KPI 1–3, 6, 8, 9, 12 (af te stemmen met opdrachtgever).

Conformiteit met must/KO
- KO: ISO 27001 (W-01) en ISO 9001 (W-02) geborgd; 24/7 bereikbaarheidsdienst (W-03) via NOC.
- Musts: P1-responstijd (W-04), beschikbaarheid (W-05), monitoring/patching (W-06), ITIL servicedesk (W-07), EU data (W-08), escalatieprocedure (W-09), BCP (W-10), VOG (W-11), proactieve monitoring (W-12), M365 support (W-13). Tender-SLA oplostijd P1 (W-14).

Verbetercyclus (SMART + PDCA)
- Elk KPI-doel is specifiek, meetbaar (tools/logs), acceptabel (afgestemd in QBR), realistisch (marktconform), tijdgebonden (dag/week/maand/kwartaal). Afwijkingen leiden tot een RCA en een CSI-actie met eigenaar, deadline en hercontrole binnen 30 dagen (Check/Act).

Benodigde input:
- Lijst en prioritering van kritieke systemen/diensten (Tier-1/Tier-2) met onderhoudsvensters.
- Contact- en escalatielijst opdrachtgever (operationeel, management, privacy/security).
- Overzicht in-scope assets (servers, endpoints, netwerk), inclusief beheergrenzen en leverancierscontracten.
- Toegang tot bestaande ticket- en monitoringdata (indien migratie) en gewenste KPI-rapportageformaten.
- Bevestiging dat EU-only datalocatie vereist blijft en relevante DPA’s/regionale instellingen (Microsoft 365 EU Data Boundary).
- Beschikbare change freeze perioden (bijv. verkiezingen/examens) en compliance-eisen gemeente (AVG, BIO).
- Afspraken over servicekredieten/boetes bij KPI-overschrijding en acceptatie van onderhoudsvensters.

Benodigde input: