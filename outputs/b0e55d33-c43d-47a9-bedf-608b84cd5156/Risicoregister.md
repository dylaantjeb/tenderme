| Risico | Kans (L/M/H) | Impact (L/M/H) | Score (1-9) | Maatregel | Eigenaar | Status | Link KPI/W-xx |
| Onvolledige data bij migratie leidt tot fouten >0,1% | M | H | 6 | 2 proefmigraties, 4-ogen validatie, rollback-scripts | Data Lead | Actief | KPI-02; W-02 |
| Onvoldoende responstijd servicedesk buiten kantooruren | M | M | 4 | 24/7 rooster, real-time monitoring, back-up agent | Service Manager | Actief | KPI-01; W-01 |
| SLA-beschikbaarheid <99,95% door single-point-of-failure | L | H | 6 | Active-active, autoscaling, DR-test 2x/jaar | Architect | Actief | KPI-03; W-03 |
| Security-incident door misconfiguratie | M | H | 6 | IaC met policy-as-code, 4-ogen, change freeze | Security Officer | Actief | KPI-04; W-04 |
| Change veroorzaakt verstoring door lage testdekking | M | M | 4 | Testautomatisering, quality gates, CAB | Testlead | Actief | KPI-05; W-05 |
| Rapportages niet tijdig of onvolledig | M | M | 4 | Geautomatiseerde ETL, reviewkalender, QBR-ritme | Delivery Manager | Actief | KPI-06; W-06 |
| Doel CO2-reductie niet gehaald door reisgedrag | M | M | 4 | Reiskader, CO2-dashboards, OV-voorrangsbeleid | Duurzaamheidscoördinator | Actief | KPI-07; W-07 |
| Kennis afhankelijk van key-person | M | H | 6 | Beheerhandboek, shadowing, rotatie | Technisch PL | Actief | KPI-08; W-08 |
| Herhaalde P1-incidenten zonder root cause | M | M | 4 | RCA binnen 10 werkdagen, problem board | Problem Manager | Actief | KPI-09; W-09 |
| Performance p95 >300ms onder piekbelasting | M | H | 6 | Loadtests, autoscaling, caching, CDN | Architect Performance | Actief | KPI-10; W-10 |
| Lage adoptie gebruikers <80% | M | M | 4 | E-learning, champions, clinics | Opleidingscoördinator | Actief | KPI-11; W-11 |
| Onenigheid over bonus-malus interpretatie | L | M | 3 | SLM-matrix, kwartaalafspraken, open boek | Service Manager | Actief | KPI-12; W-12 |
| API-integraties falen door afwijkende standaarden | M | M | 4 | Contract tests, API gateway policies | Integratie Architect | Actief | KPI-13; W-13 |
| CI-initiatieven leveren geen meetbaar effect | M | L | 3 | A3-kaarten, meetdoelen, retro-acties | Delivery Manager | Actief | KPI-14; W-14 |
| Onvoldoende datakwaliteit en logging | M | M | 4 | DQ-regels, SIEM use-cases, data steward | Data Steward | Actief | KPI-15; W-15 |
| Moeizame exit/overdracht | L | H | 6 | Exit-runbook, export scripts, escrow | Technisch PL | Actief | KPI-16; W-16 |

Benodigde input:
- Specifieke risicobereidheid (impact-kaders) van opdrachtgever.
- Voorkeursfrequentie DR-tests en pentests.
- Gewenste escalatiecontacts en RACI-bevestiging. 
>>>