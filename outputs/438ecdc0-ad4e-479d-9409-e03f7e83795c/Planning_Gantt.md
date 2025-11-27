Planning — Raamovereenkomst Beheer, Onderhoud en Security Cloud & Infrastructuur (Opdrachtgever: Gemeente Middenstad/NVAO) — Uno Automatiseringsdiensten B.V. (Project 1380)

ASCII-Gantt (fasen, start/eind, gate-reviews en mijlpalen)
Tijdsschaal (maanden):
2026 | Jan | Feb | Mar | Apr | May | Jun | Jul | Aug | Sep | Oct | Nov | Dec | 2027 | 2028 | 2029
Legenda: [====] fase, Gx=Gate Review, Mx=Mijlpaal

01 Initiatie & Mobilisatie          05-01-2026 → 23-01-2026      |[====]|
   M1 Kick-off (05-01) • G1 Mobilisatie Gate (23-01)

02 Due Diligence & Discovery        12-01-2026 → 07-02-2026        | [=====] |
   M2 Inventarisatie compleet (07-02)

03 Ontwerp & Configuratie           26-01-2026 → 21-02-2026          |  [=====] |
   G2 Design Gate/Sign-off (21-02) • M3 Config goedgekeurd (21-02)

04 Migratie & Overname Beheer       24-02-2026 → 28-03-2026             |   [=======]  |
   G3 Go/No-Go (24-03) • M4 Day-1 beheer (24-03)

05 Stabilisatie & Hypercare         29-03-2026 → 26-04-2026                    |     [====] |
   G4 Acceptatie/Hypercare-exit (26-04)

06 Operationeel Beheer (Run)        27-04-2026 → 04-01-2029                         |      [==============================================]
   M5 SLA 1e maand behaald (31-05-2026) • Jaarlijkse MSR/Gate (31-03-2027, 31-03-2028)

07 PDCA-Verbeter-sprints (Kwartaals)01-05-2026 → 04-01-2029                           |       [==][==][==][==]...[==]
   M7 Midterm evaluatie (15-12-2027)

08 BCP/DR-test & Exit-readiness     15-06-2026 → 19-06-2026 (1e test)                     |        [==] |
   M6 BCP/DR test geslaagd (19-06-2026); herhaling jaarlijks Q2 • Exit-oefening Q4-2028

Gate Reviews (Gx) en Mijlpalen (Mx) op de tijdlijn:
- M1 05-01-2026 Kick-off
- G1 23-01-2026 Mobilisatie Gate (PIB/Project Charter goedgekeurd)
- M2 07-02-2026 Inventarisatie compleet
- M3 + G2 21-02-2026 Ontwerp & Config sign-off
- G3 24-03-2026 Go/No-Go migratie en Day-1 beheer
- M4 24-03-2026 Overname beheer
- G4 26-04-2026 Acceptatie en exit hypercare
- M5 31-05-2026 Eerste volledige SLA-maand gehaald
- M6 19-06-2026 BCP/DR test geslaagd (jaarlijks Q2)
- Jaarlijkse Gate: 31-03-2027 en 31-03-2028 (EMVI-prestatie review)
- M7 15-12-2027 Midterm evaluatie
- Exit-oefening Q4-2028; contracteinde 04-01-2029

Toelichting (SMART, PDCA, EMVI, risico-koppeling)
Doel (SMART)
- Doelstelling: Binnen 12 weken na start (uiterlijk 26-04-2026) een volledig geborgde beheeromgeving voor kritieke systemen live, met maandelijkse beschikbaarheid ≥ 99,8%, P1-responstijd < 30 min en P1-oplostijd < 4 uur.
- Omvang: Monitoring, patchmanagement, ITIL-servicedesk, M365-ondersteuning, EU-dataverwerking, 24/7 bereikbaarheidsdienst, BCP/DR.
- Meetbaar: KPI’s per SLA, maandelijks gerapporteerd in MSR; dashboards near real-time.
- Acceptatiecriteria per Gate:
  - G1: Project Initiation Baseline (PIB), RASCI, communicatieplan en risicolog (top 10) vastgesteld.
  - G2: High/Low Level Design, security- en datalocatiebeleid (EU-only), testplan en rollbackplan goedgekeurd door CAB.
  - G3: Go/No-Go op basis van geslaagde pilots, back-out bevestigd, capaciteitscheck afgerond.
  - G4: 30 dagen stabiele operaties, SLA’s gehaald, overdrachtsdossiers en runbooks afgerond.

PDCA
- Plan: Fasen 01–03; inventarisatie, ontwerp, security- en continuïteitseisen vastleggen; KPI-baseline (MTTA/MTTR/uptime/patch).
- Do: Fase 04–05; migratie, activatie 24/7, hypercare met versnelde probleemresolutie.
- Check: Vanaf fase 06; wekelijkse kwaliteitscheck, maandelijkse Service Review, kwartaal CSI-audit, jaarlijkse BCP/DR-test.
- Act: Fase 07; kwartaal-verbetersprints met CAB-besluitvorming; lessons learned vertaald naar standaard changes; roadmap geactualiseerd.

Kruisverbinding W-xx ↔ KPI ↔ Risico ↔ Bewijs
- KO-01 ISO 27001: KPI 0 majeure non-conformities; Risico uitsluiting/boete; Bewijs: geldig ISO 27001-certificaat op naam Uno Automatiseringsdiensten B.V.
- KO-02 ISO 9001: KPI ≥ 95% voldane proceschecks; Risico kwaliteitsafwijkingen; Bewijs: geldig ISO 9001-certificaat.
- KO-03 24/7 bereikbaar: KPI MTTA P1 ≤ 30 min; Risico escalatie-uitval; Bewijs: rooster & bereikbaarheidslogs.
- W-01 Beschikbaarheid 99,8%: KPI Uptime ≥ 99,8%/maand; Risico single points of failure; Bewijs: monitoringrapporten en maandelijkse SLA-rapportage.
- W-02 P1-responstijd < 30 min: KPI MTTA ≤ 30 min; Risico onderbezetting; Bewijs: SIEM/pager logs, ticket-tijdstempels.
- W-03 P1-oplostijd < 4 uur: KPI MTTR ≤ 4 uur; Risico leveranciersafhankelijkheid; Bewijs: incidentdossiers, vendor SR’s.
- W-04 EU-datalocatie: KPI 100% EU-tenant/region; Risico datalek/compliance; Bewijs: M365/Azure region-instellingen en DPA.
- W-05 ITIL-servicedesk: KPI > 95% juiste classificatie, FTF ≥ 70%; Risico procesvariatie; Bewijs: procesbeschrijvingen, auditresultaten.
- W-06 Monitoring & patch: KPI ≥ 95% compliant <14 dagen; Risico kwetsbaarheden; Bewijs: Intune/WSUS compliance-rapporten.
- W-07 Escalatieprocedure: KPI 100% P1-escalaties ≤ 5 min; Risico vertraging; Bewijs: procedure en war-room logs.
- W-08 BCP/DR: KPI jaarlijkse test geslaagd, RTO ≤ 4u/RPO ≤ 1u; Risico uitval; Bewijs: testverslag en CAB-acceptatie.
- W-09 VOG: KPI 100% VOG vóór toegang; Risico insider threat; Bewijs: HR-screeningsregister.
- W-10 Proactieve monitoring: KPI MTTD ≤ 5 min, false positive rate ≤ 10%; Risico alert fatigue; Bewijs: SIEM tuning-rapport.
- W-11 M365-ondersteuning: KPI oplosgraad M365 P2 ≥ 90% binnen 8 uur; Risico productiviteitsverlies; Bewijs: tenant health & ticketstatistiek.

Risicobeheersing (selectie, top-5)
- R1 Onvolledige inventarisatie → mitigatie: dubbele bronvalidatie, discovery tools; Gate G2 check.
- R2 Capaciteit bij migratiepiek → mitigatie: freeze-window en extra engineers; G3 readiness-check.
- R3 Vendor-afhankelijkheid → mitigatie: prioritaire support-contracten en alternatieve workaround; evidence: contractnummers op verzoek.
- R4 Change-impact op productie → mitigatie: CAB, staged rollout, back-out; evidence: change records.
- R5 Security-incident → mitigatie: 24/7 SOC-triage, playbooks; evidence: incident runbooks en oefenrapport.

Opleveringen (deliverables) en bewijslast
- Plan van Aanpak (na G1), Risicodossier (levend document), KPI-overzicht en maandelijkse SLA-rapportage (vanaf M5).
- Runbooks, BCP/DR-testverslagen, jaarplan CSI, jaarlijkse MSR-verslagen en Gate-notulen (G1–G4, Jaarlijkse Gate).

Benodigde input:
- Locatielijst, contactpersonen en escalatiematrix opdrachtgever
- Aantal gebruikers/endpoints, kritieke systemen en onderhoudsvensters
- Toegang tot huidige tenants/omgeving (M365/Azure), network diagrams en security policies
- Overzicht third-party leveranciers en supportcontracten
- Gegevens datalocaties/eisen (verwerkersovereenkomst, DPIA waar relevant)
- Verplichte compliance-eisen gemeente/NVAO-specifiek (logging, bewaartermijnen)
- Autorisatiematrix (rollen/rechten) en change-approval proces
- Beschikbare onderhoudsmomenten voor migraties en tests

Benodigde input: