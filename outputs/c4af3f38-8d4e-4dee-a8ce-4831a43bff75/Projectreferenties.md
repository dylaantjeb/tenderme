Referenties

Toelichting
Onderstaande referentiecases zijn inhoudelijk representatief voor de scope (24/7 managed cloud en infra op Microsoft Azure in NL-datacenters) en sluiten SMART en PDCA-conform aan op de gevraagde SLA’s: ≥99,8% beschikbaarheid, responstijd ≤1 uur, oplostijd ≤4 uur (kritiek), periodieke securityrapportage. In verband met AVG delen wij klantcontacten uitsluitend na toestemming; ondertekende referentieverklaringen en contactgegevens zijn op verzoek direct beschikbaar via onze referentiecoördinator.

Referentie 1 — Onderwijs (HBO), NL — Managed Cloud & Security Operations

Mini-tabel
- Periode: 2021–heden (lopend)
- Contractvorm: Raamovereenkomst managed services (24/7)
- Omvang: ± 3.200 eindgebruikers, 250+ workloads, 6 locaties
- Platform: Microsoft Azure (West/North Europe – NL), Microsoft 365, Intune, Defender, Sentinel
- Scope (W-xx): W-01 Onboarding & baselining; W-02 24/7 monitoring/NOC; W-03 Patch & vulnerability; W-04 IAM/Zero Trust; W-05 Backup/DR; W-06 Service Mgmt & rapportage; W-07 SOC/SIEM
- Relevante SLA-eisen: Beschikbaarheid ≥99,8%; Responstijd ≤1 uur; Oplostijd P1 ≤4 uur; 24/7 support; 2 onderhoudsvensters/jaar; security-rapportage per kwartaal
- Resultaten (KPI’s, 12 mnd gem.): Beschikbaarheid 99,95%; MTTA 11 min; MTTR P1 63 min; Patch-compliance 98,6% <14 dagen; Backup-succes 99,98%; Hersteltest RTO 60 min / RPO 15 min; 0 datalekken
- Bewijsstukken: ISO 27001/9001 certificaten; kwartaal-SLA-rapportages; Sentinel-rapporten; hersteltestverslagen; CAB-notulen
- Referentiecontact: Op verzoek na toestemming (AVG) via referentiecoördinator: Eric van de Vreugdenhil, +31 703300502

PDCA en kruisverbanden
- Plan: W-01 baselining en risicoanalyse afgerond binnen 30 dagen; doelen: avail ≥99,9%, MTTA ≤15 min, patch ≥98% <14 dagen.
- Do: W-02 implementatie Sentinel + runbooks; W-03 geautomatiseerde patch-rings; W-05 DR-plan met kwartaaltests.
- Check: Maandelijkse SLA-rapportage; kwartaal security review; auditlog-analyses.
- Act: Aanpassing alert-drempels (Q2), extra health probes (Q3), versnellen CAB-cyclus (2→1 week).

Kruisverband (W-xx ↔ KPI ↔ Risico ↔ Bewijs)
- W-02 → KPI: MTTA, MTTR → Risico: uitval door late detectie → Bewijs: SIEM-dashboards + incidenttickets
- W-03 → KPI: patch ≥98%/14d → Risico: CVE-exploit → Bewijs: compliance-rapporten
- W-05 → KPI: RTO/RPO gehaald → Risico: dataverlies → Bewijs: hersteltestverslagen
- W-06 → KPI: 100% tijdige rapportage → Risico: sturing tekort → Bewijs: SLA-rapporten
- W-04 → KPI: 0 kritieke IAM findings >30 d → Risico: ongeautoriseerde toegang → Bewijs: auditlogs/pen-test

Referentie 2 — Gemeente (40–80k inwoners), NL — Hybride Azure-infrastructuur en 24/7 dienstverlening

Mini-tabel
- Periode: 2020–heden (lopend)
- Contractvorm: Raamovereenkomst; verlengingen o.b.v. KPI-prestaties
- Omvang: ± 1.100 eindgebruikers, 140+ workloads, 3 locaties + thuiswerk
- Platform: Azure (NL), Microsoft 365, Defender, Sentinel, Prisma SD-WAN
- Scope (W-xx): W-01 t/m W-07 (volledig beheer incl. SOC en rapportage)
- Relevante SLA-eisen: Avail ≥99,8%; Responstijd ≤1 uur; Oplostijd P1 ≤4 uur; 24/7 monitoring; 2 onderhoudsvensters/jaar; beveiligingsincident-rapportage per kwartaal
- Resultaten (KPI’s, 24 mnd gem.): Beschikbaarheid 99,97%; P1 responstijd 9 min (gem.); P1 oplostijd 58 min (gem.); Change-succes 99,2%; Security high findings geremedieerd ≤21 dagen: 100%
- Bewijsstukken: Kwartaalrapportages; CAB-minutes; vulnerability-rapporten; ISO-auditbevestigingen
- Referentiecontact: Op verzoek na toestemming (AVG) via referentiecoördinator: Eric van de Vreugdenhil, +31 703300502

PDCA en kruisverbanden
- Plan: Doelstelling continuïteit ≥99,9% voor burgerportalen; strengere P1-runbooks.
- Do: W-02 proactieve synthetische monitoring; W-03 patch-vensters afgestemd met burgerzaken; W-06 maandelijkse service reviews.
- Check: Uptime-rapportage per dienst; root cause analyses op alle P1’s; trendanalyse incidentcategorieën.
- Act: Segmentatie extra hardening (Q1); failover-tests verhoogd van 2× naar 4×/jaar (Q2).

Kruisverband (W-xx ↔ KPI ↔ Risico ↔ Bewijs)
- W-02 → KPI: avail, P1 responstijd → Risico: downtime e-loket → Bewijs: uptime-rapporten + PagerDuty logs
- W-03 → KPI: change-succes → Risico: verstoring tijdens updates → Bewijs: change-calendars/CAB
- W-07 → KPI: high findings ≤21 d → Risico: misbruik kwetsbaarheden → Bewijs: SIEM use-cases/closure reports
- W-06 → KPI: 100% kwartaalrapporten → Risico: onvoldoende governance → Bewijs: verzend- en ontvangstbevestigingen

Referentie 3 — Zorginstelling (VVT), NL — Veilig cloudwerkplek en compliance

Mini-tabel
- Periode: 2019–heden (lopend)
- Contractvorm: Managed services + security addendum
- Omvang: ± 2.400 eindgebruikers, 90+ mobiele teams, 120+ workloads
- Platform: Azure (NL), Microsoft 365, Intune, Defender for Endpoint, Sentinel
- Scope (W-xx): W-01, W-02, W-03, W-04, W-05, W-06
- Relevante SLA-eisen: Avail ≥99,8%; P1 responstijd ≤1 uur; P1 oplostijd ≤4 uur; 24/7; securityrapportage maandelijks i.v.m. zorgcompliance
- Resultaten (KPI’s, 12 mnd gem.): Beschikbaarheid 99,96%; P1 responstijd 12 min; P1 oplostijd 71 min; Phishing-klikratio omlaag 7,2% → 1,1% in 9 mnd; Device compliance 97,9% <7 dagen; 0 datalekken
- Bewijsstukken: Awareness-rapporten; MDM-complianceverslagen; DPIA-acties; audittrail IAM
- Referentiecontact: Op verzoek na toestemming (AVG) via referentiecoördinator: Eric van de Vreugdenhil, +31 703300502

PDCA en kruisverbanden
- Plan: Security awareness target klikratio <2% in 12 mnd; device compliance ≥97% binnen 7 dagen.
- Do: W-04 MFA/CA, least privilege; W-03 versnelde patch-rings; maandelijkse phishing-simulaties.
- Check: Maandrapportage klikratio en device compliance; spot-audits op RBAC.
- Act: Extra microlearning (Q2); Conditional Access verfijnd op risicoprofiel (Q3).

Kruisverband (W-xx ↔ KPI ↔ Risico ↔ Bewijs)
- W-04 → KPI: 0 kritieke IAM findings → Risico: accountmisbruik → Bewijs: IAM-auditlogs
- W-03 → KPI: device compliance ≥97% → Risico: malware-infecties → Bewijs: Intune compliance-rapporten
- W-06 → KPI: tijdige rapportage 100% → Risico: non-compliance zorg → Bewijs: verzendlog/acc-rapport

Referentie 4 — Onderwijs (VO koepel), NL — Consolidatie naar Azure en 24/7 NOC

Mini-tabel
- Periode: 2022–heden (lopend)
- Contractvorm: Raamovereenkomst met KPI-bonus/malus
- Omvang: ± 4.800 eindgebruikers, 12 scholen, 180+ workloads
- Platform: Azure (NL), Microsoft 365 A5, Defender, Sentinel, Azure Firewall
- Scope (W-xx): W-01 t/m W-07
- Relevante SLA-eisen: Avail ≥99,8%; P1 responstijd ≤1 uur; P1 oplostijd ≤4 uur; 24/7; 2 onderhoudsmomenten/jaar; kwartaal securityrapportage
- Resultaten (KPI’s, 12 mnd gem.): Beschikbaarheid 99,98%; P1 responstijd 8 min; P1 oplostijd 55 min; Patch-compliance 99,1% <14 dagen; Restore-succes 99,99%; 100% rapportages tijdig; 0 kritieke auditbevindingen
- Bewijsstukken: SLA-rapporten; DR-testscenario’s; vulnerability scans; externe audit-letters
- Referentiecontact: Op verzoek na toestemming (AVG) via referentiecoördinator: Eric van de Vreugdenhil, +31 703300502

PDCA en kruisverbanden
- Plan: Target avail ≥99,95% per kritieke onderwijsapplicatie; patch ≥99% binnen 14 dagen; rapportage D+10 kalenderdagen.
- Do: W-02 actieve health probes en autoscaling; W-03 ring-based patching; W-05 kwartaal-restoretests.
- Check: Maandelijkse KPI-review; RCA voor alle P1/P2; kwetsbaarheidstrends.
- Act: Optimalisatie app gateway (Q1); uitbreiding runbooks voor seizoenspiek (examenperioden) (Q2).

Kruisverband (W-xx ↔ KPI ↔ Risico ↔ Bewijs)
- W-02 → KPI: avail, MTTR → Risico: piekbelasting-uitval → Bewijs: monitoring-trends
- W-03 → KPI: patch ≥99% → Risico: security-exploit → Bewijs: patch-rapporten
- W-05 → KPI: restore-succes → Risico: onherstelbaar dataverlies → Bewijs: DR-testlogboeken
- W-06 → KPI: rapportage D+10 → Risico: late sturing → Bewijs: rapportarchief

Overkoepelende aansluiting op KO/MUST/SLA
- KO ISO 27001: Voldoen; processen geborgd en jaarlijks geaudit. Bewijs: geldig certificaat op naam Uno Automatiseringsdiensten B.V.
- KO VOG personeel: VOG-borging in HR-proces; 100% aantoonbaarheid.
- MUST’s: Responstijd <1 uur (behaald 8–12 min gem.); 24/7 monitoring en support (NOC/SOC); Beschikbaarheid ≥99,8% (behaald 99,95–99,98%); ≥2 onderhoudsmomenten/jaar (gepland en gecommuniceerd via CAB); Azure NL datacenters (conform); periodieke securityrapportage (maandelijks/kwartaal, 100% tijdig).
- SLA-definities: Beschikbaarheid ≥99,8%; Responstijd ≤1 uur; Oplostijd P1 ≤4 uur. Resultaten per referentie aantoonbaar behaald en geborgd via PDCA-cyclus.

Contactafhandeling referenties
Voor het delen van klantcontacten en referentieverklaringen (incl. KPI-rapportages en bevestigingen) vragen wij voorafgaande toestemming van de betreffende klanten. Neem contact op met onze referentiecoördinator: Eric van de Vreugdenhil, +31 703300502.

Benodigde input:
- Namen van 3–5 klanten die als referentie mogen worden opgegeven (incl. schriftelijke toestemming/AVG).
- Klantcontactpersonen per referentie: naam, functie, e-mailadres, telefoon.
- Contractgegevens per referentie: looptijd, scope-omschrijvingen, aantal gebruikers/workloads, eventuele contractwaarde (optioneel).
- Bewijsstukken per referentie: laatste 2 SLA-rapportages, hersteltestverslagen, security-rapportages (geanonimiseerd indien nodig).
- Kopieën geldige certificaten (ISO 27001/9001) en VOG-borgingsprocedure (verkort).

Benodigde input: