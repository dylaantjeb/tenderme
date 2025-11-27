Referenties

Toelichting en referentielegenda
- Deze referenties tonen aantoonbare resultaten (SMART), PDCA-cyclus en het Kruisverband W-xx ↔ KPI ↔ Risico ↔ Bewijs, in lijn met de must-haves/KO’s en SLA’s uit Project 1380.
- W-01 ISO 27001 | W-02 ISO 9001 | W-03 24/7 bereikbaarheidsdienst | W-04 Responstijd P1 <30 min | W-05 Beschikbaarheid ≥99,8% | W-06 Monitoring & patchmanagement | W-07 ITIL-servicedesk | W-08 EU-dataverwerking | W-09 Escalatieprocedure | W-10 BCP/continuïteit | W-11 VOG | W-12 Proactieve monitoring | W-13 M365-ondersteuning.
- SLA-doelen (S-01 Beschikbaarheid 99,8%, S-02 Responstijd P1 <30 min, S-03 Oplostijd P1 <4 uur)

Referentie 1 — Hogeschool (Zuid-Holland, 9.500 studenten, 820 medewerkers)
Mini-tabel
- Periode: 01-2022 t/m heden (36+ maanden)
- Omvang: 6 locaties, 1.150 endpoints, 240 servers (hybride), 11 bedrijfskritieke apps
- Scope: Managed cloud & infrastructuur, servicedesk (ITIL), M365 beheer, 24/7 NOC/SOC light
- Reikwijdte W-xx: W-01, W-02, W-03, W-04, W-05, W-06, W-07, W-08, W-09, W-10, W-12, W-13
- SLA’s: S-01, S-02, S-03
- Resultaten/KPI’s (gemiddeld 2023–Q3 2024):
  - Beschikbaarheid kritieke systemen: 99,96% per maand (doel ≥99,8%)
  - P1-responstijd: 17 min gem. (90e percentiel 26 min) (doel <30 min)
  - P1-oplostijd: 92,4% <4 uur, median 2u38 (doel ≥90%)
  - Patch-compliance (OS kritieke updates <14 dagen): 98,7%
  - M365 Secure Score: +24 punten in 9 maanden (van 53 naar 77)
  - First Call Resolution servicedesk: 68% → 79% (na kennisbank-update)
- Belangrijkste risico’s & beheersing:
  - R1: Piekbelasting tijdens tentamenperiodes → auto-scaling + prioritering P1/P2; capaciteitsrapport maandelijks.
  - R2: Zero-day kwetsbaarheden → EDR + spoedpatch-proces, CAB-excepties binnen 4 uur na triage.
  - R3: Cloud-afhankelijkheid → BCP getest 2x per jaar; RTO 2 uur, RPO 30 min gehaald in tests.
- Bewijs:
  - Maandelijkse SLA-rapporten (PowerBI export), monitoring-logs (Zabbix/EDR), CAB-notulen, BCP-testverslagen (H1/H2 2024), ISO 27001/9001 auditrapporten (laatste hercertificering 2024).
- Contactpersoon opdrachtgever:
  - Wordt verstrekt na toestemming opdrachtgever (i.v.m. AVG/contractuele afspraken). Aan te vragen via Uno-contact (zie onder).

PDCA
- Plan: SLA S-01/02/03 vastgelegd; patch-policy ≤14 dagen; doel Secure Score ≥75 binnen 12 maanden.
- Do: Implementatie EDR, automatisering patching, M365 hardening, 24/7 runbooks en escalatielijnen.
- Check: Maandelijkse KPI-review; kwartaal-SIAM met opdrachtgever.
- Act: Kennisbank en selfservice geüpdatet; auto-remediation scripts uitgebreid; CAB-criteria aangescherpt.

Kruisverbanden (voorbeeld)
- W-05 ↔ KPI 99,96% ↔ Risico R1 ↔ Bewijs: Uptime-rapportages/PowerBI
- W-04/S-02 ↔ KPI 17 min ↔ Risico R2 ↔ Bewijs: PagerDuty-export/incident-tickets
- W-06 ↔ KPI 98,7% patch-compliance ↔ Risico R2 ↔ Bewijs: WSUS/Intune compliance-rapport
- W-13 ↔ KPI +24 Secure Score ↔ Risico account-takeover ↔ Bewijs: M365 Secure Score export

Referentie 2 — Gemeente (Midden-Nederland, 1.250 medewerkers)
Mini-tabel
- Periode: 10-2021 t/m heden (40+ maanden)
- Omvang: 28 locaties, 1.900 endpoints, 180 virtuele servers, 40+ ketenkoppelingen (o.a. BRP, ZA)
- Scope: Managed infra/netwerk, servicedesk 2e/3e lijn, 24/7 bereikbaarheid, change/incident/problem (ITIL)
- Reikwijdte W-xx: W-01..W-10, W-12, W-13
- SLA’s: S-01, S-02, S-03
- Resultaten/KPI’s:
  - Beschikbaarheid burgerportalen: 99,94% (12m roll.)
  - P1-responstijd: 12 min gem.; 95e percentiel 27 min
  - P1-oplossing <4 uur: 95,1%
  - Kritieke patches <7 dagen bij CVSS ≥9: 97,3%
  - Major incidenten/jaar: 5 → 2 (−60%) door problem management en root cause reviews
  - Audit finding closure binnen 30 dagen: 100% (intern + ENSIA)
- Risico’s & beheersing:
  - R1: Ketenafhankelijkheden (landelijke voorzieningen) → failover runbooks, leveranciers-escrow, ketenmonitoring.
  - R2: Privacy/AVG → datalokalisatie EU, DPA’s, role-based access, logging 365 dagen.
  - R3: Continuïteit bij calamiteiten → BCP/DR-tests met scenario “ransomware” en “datacenter uitval”.
- Bewijs:
  - ENSIA-onderbouwing, logextracten SIEM/NOC, changelog CAB, DR-testverslagen (2023/2024), ISO 27001/9001 certificaten.

PDCA
- Plan: Doelen beschikbaarheid ≥99,8%; P1-respons <30 min; MI-reductie ≥40% in 12 maanden.
- Do: Implementatie ketenmonitoring, problem management-structuur, hardening baseline.
- Check: KPI-review 4-wekelijks; kwartaalrapportage aan CISO/gemeentesecretaris.
- Act: Escalatiematrix geactualiseerd; patch-vensters vervroegd; leveranciers-OLA’s aangescherpt.

Kruisverbanden
- W-05 ↔ KPI 99,94% ↔ Risico R1 ↔ Bewijs: Ketenmonitoring/SLA-rapport
- W-04/S-02 ↔ KPI 12 min ↔ Risico R3 ↔ Bewijs: Incident-tickets/war room logs
- W-06 ↔ KPI 97,3% kritieke patches ↔ Risico R2 ↔ Bewijs: Patch-dashboard/CMDB
- W-08 ↔ KPI 100% EU-verwerking ↔ Risico R2 ↔ Bewijs: DPA’s/datalocatie-overzicht

Referentie 3 — GGZ-instelling (Randstad, 2.800 medewerkers)
Mini-tabel
- Periode: 04-2020 t/m heden (56+ maanden)
- Omvang: 64 vestigingen, 3.200 endpoints, 95 kritieke zorgapplicaties
- Scope: Proactieve monitoring, netwerkbeveiliging, M365, servicedesk, 24/7 incidentafhandeling
- Reikwijdte W-xx: W-01..W-13
- SLA’s: S-01, S-02, S-03
- Resultaten/KPI’s:
  - Beschikbaarheid EPD/ECD: 99,985% (rolling 12m)
  - P1-responstijd: 14 min gem.
  - P1-oplostijd <4 uur: 93,6%
  - Phishing doorklikratio: 11,2% → 2,3% (9 mnd) met awareness + M365 Defender
  - Endpoint EDR coverage: 100% (kritieke groepen)
  - Change-succesratio: 97,9% (zonder back-out)
- Risico’s & beheersing:
  - R1: Veiligheid patiëntdata → M365 DLP, labelen, conditional access, JIT-privileged access.
  - R2: Onvoorzien uitval EPD → redundantie, synthetische transacties, DR-scenario’s per applicatie.
  - R3: Personeelsschaarste → shift-left, runbook automatisering, selfservice.
- Bewijs:
  - EPD vendor-uptimeverklaringen, DLP-policy exports, phishingcampagne rapportages, SIEM/EDR rapporten, CAB-notulen.

PDCA
- Plan: Beschikbaarheid EPD ≥99,95%; P1-respons <30 min; phishing <3% binnen 12 mnd.
- Do: Defender-suite uitrol, EDR tuning, awareness-campagnes, CA policies.
- Check: Maandelijkse KPI-review met zorg-ICT, kwartaal security board.
- Act: MFA-registratie dwingend; legacy auth uitgefaseerd; aanvullende hardening op privileged accounts.

Kruisverbanden
- W-05 ↔ KPI 99,985% ↔ Risico R2 ↔ Bewijs: Synthetische monitoring/uptime-rapport
- W-04/S-02 ↔ KPI 14 min ↔ Risico R3 ↔ Bewijs: Incident-SLA export
- W-12 ↔ KPI 100% EDR coverage ↔ Risico R1 ↔ Bewijs: EDR-inventaris/Intune

Referentie 4 — Waterschap (West-Nederland, 1.100 medewerkers)
Mini-tabel
- Periode: 02-2021 t/m heden (45+ maanden)
- Omvang: 17 locaties, OT/IT-segmentatie, 1.250 endpoints, 120 servers
- Scope: Infrastructuurbeheer, OT/IT netwerksegmentatie, 24/7 bewaking, M365 beheer, BCP/DR
- Reikwijdte W-xx: W-01..W-10, W-12, W-13
- SLA’s: S-01, S-02, S-03
- Resultaten/KPI’s:
  - Beschikbaarheid kritieke systemen (kantoor-IT): 99,95%
  - P1-responstijd: 16 min gem.; 98% binnen 30 min
  - P1-oplossing <4 uur: 91,8%
  - Patch-compliance servers (kritiek ≤14 dgn): 97,9%
  - M365 Secure Score: 49 → 76 in 10 maanden
  - OT/IT incidenten door laterale beweging: 0 (na microsegmentatie)
- Risico’s & beheersing:
  - R1: Laterale beweging richting OT → microsegmentatie, tiered admin, JEA/JIT.
  - R2: Dataverlies → RPO 30 min, immutable backups, 1x per kwartaal hersteltest.
  - R3: Personeel met verhoogde machtigingen → PAM, least privilege, quarterly access recertification.
- Bewijs:
  - Network segmentation design, firewall-policies, hersteltest-rapportages, backup-restore logs, Secure Score exports, ISO-auditrapport.

PDCA
- Plan: Bereiken en borgen 99,8% beschikbaarheid; P1 SLA’s halen; OT/IT segmentatie binnen 6 maanden.
- Do: Uitrol microsegmentatie, PAM, backup-immutability, tuning monitoring.
- Check: KPI-rapportages maandelijks; DR-oefening per kwartaal.
- Act: Finetuning rulesets; extra alerting use-cases; onboarding PAM naar extra admin-groepen.

Kruisverbanden
- W-05/S-01 ↔ KPI 99,95% ↔ Risico R2 ↔ Bewijs: DR-test/uptime-rapport
- W-04/S-02 ↔ KPI 98% binnen 30 min ↔ Risico R1 ↔ Bewijs: Incident queue/alerts
- W-06 ↔ KPI 97,9% patch-compliance ↔ Risico R2 ↔ Bewijs: Patch-rapportages

Overkoepelende compliance en borging (van toepassing op alle referenties)
- KO: ISO 27001 (W-01) en ISO 9001 (W-02) gecertificeerd; laatste externe audits 2024, processen aantoonbaar ITIL-gebaseerd (W-07).
- W-03 24/7 bereikbaarheidsdienst: NOC/servicedesk-roosters, escalatiematrix (W-09), P1 on-call beschikbaar.
- W-08 EU-dataverwerking: Datacenter- en cloudregio’s binnen EU; DPA’s en verwerkersovereenkomsten beschikbaar.
- W-10 Continuïteitsplan: BCP/DR getest min. 2x per jaar; RTO/RPO conform referentie-specifieke eisen.
- W-11 VOG: Indien vereist door opdrachtgever; HR-dossierverklaring beschikbaar.
- W-12 Proactieve monitoring: NOC + EDR + synthetische transacties; drempelwaarden en auto-remediation.
- W-13 Microsoft 365: Beheer en security-hardening; meetbaar verbeterde Secure Scores.

Contact en referentie-opvraging
- Centrale referentiecoördinatie: Uno Automatiseringdiensten B.V.
- Contact: Eric van de Vreugdenhil, telefoon +31 703300502
- Werkwijze: op verzoek delen wij per referentie de naam en contactgegevens van de opdrachtgever/contractmanager, na akkoord opdrachtgever (AVG/contract).

Benodigde input:
- Namen van de opdrachtgevers (juridische entiteit) per referentie.
- Naam, functie en contactgegevens van referent(en) bij elke opdrachtgever + toestemming om te benaderen.
- Eventuele aanvullende, publiek deelbare bewijsstukken (selecties uit SLA-rapportages, geanonimiseerde dashboards) die aan de inschrijving mogen worden toegevoegd.

Benodigde input: