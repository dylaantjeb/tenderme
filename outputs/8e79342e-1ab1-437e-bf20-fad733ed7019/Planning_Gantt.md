Legenda: |====| taakduur in weken; T0 = start project (week 1). Mijlpalen met [M#].

Week:      1  2  3  4  5  6  7  8  9  10 11 12 13 14 15 16
Initiatie: |====|====|
Governance opzet (Stuurgroep, RAID):        |====|
Inventarisatie integraties/autorisaties:    |====|====|
Security baseline + DPIA kick-off:          |====|
Solution Design (HLD):             |====|====|
Datamigratieplan + mapping:            |====|====|
Teststrategie (FAT/SIT/UAT/DR):           |====|
Inkoop/contractfinalisatie (GIBIT/ARVODI): |====|
Inrichting ontwikkel- en testomgevingen:        |====|====|
Monitoring & SIEM onboarding:                    |====|====|
Sprints 1–2 (configuratie kern):                     |====|====|====|====|
Integraties Digikoppeling (BRP/RGBZ):                    |====|====|====|
Performance & load testing:                                     |====|====|
Security hardening + pen-test:                                       |====|====|
UAT voorbereiding:                                                      |====|
UAT uitvoering:                                                            |====|
Cutover dress rehearsal:                                                     |====|
Go-live [M1]:                                                                      |==|
Hypercare (30 dagen):                                                                 |====|====|
Kennisoverdracht key-users:                                      |====|====|
SLA-rapportageproces inregelen:                        |====|
DR-test en RTO/RPO validatie:                                    |====|
Roadmap Q-innovaties opstellen:                                         |====|
MVP acceptatie [M0]:                                           |==|
Projectevaluatie en Lessons Learned:                                                 |====|

Afhankelijkheden
- UAT start na afronding Sprints kernfunctionaliteit, security hardening en geslaagde FAT/SIT.
- Go-live (M1) afhankelijk van geslaagde dress rehearsal, UAT-acceptatie en pen-test hertest.
- Hypercare start direct na M1.
- Kennisoverdracht overlapt late realisatie voor optimale adoptie.
- DR-test kan parallel na stabilisatie testomgeving.

Kritieke pad
Initiatie -> HLD -> Inrichting omgevingen -> Sprints 1–2 -> Integraties -> Security hardening + pen-test -> UAT -> Dress Rehearsal -> Go-live (M1). Buffers zijn ingebouwd (0,5–1 week) door parallelle activiteiten waar mogelijk.

Rollen en inzet (indicatief, FTE)
- Projectmanager 0,6 FTE doorlopend.
- Technisch PL 0,8 FTE in ontwerp/realisatie, 0,4 FTE in beheer.
- Solution Architect 0,6 FTE tijdens ontwerp/sprints.
- Data Lead 0,5 FTE in migratie en DR-test.
- Testmanager 0,5 FTE in testfases.
- CISO 0,2 FTE doorlopend; piek rondom DPIA en pen-test.
- Service Manager 0,4 FTE voor SLA-procesinrichting.
- Opleidingscoördinator 0,3 FTE tijdens adoptie en hypercare.

Aansluiting op W-xx
- W-08 — Levertermijn: MVP live binnen 12 weken: M0 in week 12.
- W-03 — Migratie zonder downtime > 15 min: dress rehearsal + cutover-plan.
- W-01 — 99,95% beschikbaarheid productieomgeving: monitoring/SIEM inregelen vóór M1.
- W-02 — Maximale hersteltijd P1-incidenten ≤ 60 min: runbooks gereed vóór M1.
- W-09 — Continuïteit: escrow en uitwijk < 2 uur RTO: DR-test vóór of kort na M1.
- W-07 — Kennisoverdracht: 100% key-user getraind binnen 30 dagen: tijdens hypercare afgerond.

Rapportagemomenten
- Tweewekelijks sprintreview en voortgangsrapport.
- Maandelijkse SLA-rapportage (vanaf maand 2).
- Kwartaal Business Review voor innovatie/duurzaamheid.

Benodigde input:
- Beschikbaarheid key-users en acceptanten per week.
- Change freeze-vensters en onderhoudsrestricties van opdrachtgever.
- Ketenpartnervensters (koppelingen) voor integratietesten.
>>>