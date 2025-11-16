| KPI ID | Omschrijving | Norm/Target | Meting | Rapportage | Escalatie | Link W-xx/criterium |
| KPI-01 | 24/7 servicedesk responstijden P1/P2/P3 | P1 ≤15 min, P2 ≤60 min, P3 ≤8 uur (90% gehaald/maand) | ITSM-tool, tijdstempels | Maandelijks + QBR | 1 maand ondernorm → SLM overleg; 2 maanden → verbeterplan; 3 maanden → malus | W-01 24/7 servicedesk met responstijden en meertaligheid NL/EN. |
| KPI-02 | Onboardingduur en datavalidatie | Go-live ≤6 weken; datamigratie ≥99,9% juist | Projectplan, validatiereports | Wekelijks tijdens onboarding | Bij afwijking >10% → stuurgroep; rollback-besluit | W-02 Onboarding binnen 6 weken inclusief migratieplan en datamigratie-validatie 99,9% juistheid. |
| KPI-03 | Beschikbaarheid dienst | ≥99,95% per maand | Uptime-monitor/APM | Maandelijks | 1 maand <norm → RCA + herstel; 2 maanden → malus | W-03 Continuïteit en beschikbaarheid: 99,95% maandelijkse dienstbeschikbaarheid. |
| KPI-04 | Security incident response | P1 security containment ≤4 uur; kritieke vuln patch ≤14 dagen | SIEM/SOC en ticketing | Maandelijks | Overschrijding → CISO review; recidive → malus | W-04 Security en privacy conform ISO 27001 en BIO, met DPIA en PIA-ondersteuning. |
| KPI-05 | Change/release kwaliteit | Regressietestdekking ≥90%; change failure rate ≤10% | CI/CD rapporten | Per sprint/maand | >10% failures → CAB-gate verhogen | W-05 Change- en releasebeheer bi-weekly met CAB en regressietests >90% dekking. |
| KPI-06 | Rapportage & PDCA-discipline | 100% dashboards op tijd; 100% acties met eigenaar en deadline | Rapportkalender, actielijsten | Maand/QBR | Missen rapport → waarschuwing; 2x missen → malus | W-06 Rapportage en transparantie: maandelijkse dashboards en kwartaalreviews met PDCA. |
| KPI-07 | CO2-reductie | -25% CO2 in 36 maanden t.o.v. baseline | CO2-tool, mobiliteitsdata | Kwartaal | Achterstand >5% → verbeterprogramma | W-07 Duurzaamheid: CO2-reductie 25% in 3 jaar, groene hosting en e-waste beleid. |
| KPI-08 | Kennisborging | Beheerhandboek gereed ≤30 dagen; updates ≤5 werkdagen na wijziging | Confluence audit | Maandelijks | Achterstand → PL actie; herhaling → escalatie stuurgroep | W-08 Kennisborging en overdraagbaarheid: up-to-date beheerhandboek binnen 30 dagen. |
| KPI-09 | RCA doorlooptijd | RCA binnen 10 werkdagen voor P1/P2 | Problem management log | Maandelijks | Overschrijding → problem board | W-09 Incident- en problemmanagement met root cause analyses binnen 10 werkdagen. |
| KPI-10 | Prestatie p95 kerntransacties | p95 <300ms (kantooruren); <400ms (piek) | APM, synthetics | Wekelijks + maand | >10% overschrijding → perf-tuning plan | W-10 Prestatie en schaalbaarheid: responstijden <300ms p95 voor kerntransacties. |
| KPI-11 | Adoptie en training | ≥80% gebruikers slaagt binnen 60 dagen | LMS-rapport | Maandelijks | <80% → extra sessies; management update | W-11 Gebruikersondersteuning en training: e-learning en adoptie >80% geslaagd binnen 60 dagen. |
| KPI-12 | SLM/contractnalezingsgraad | 100% SLM-sessies; disputen binnen 10 dgn opgelost | SLM-logs | Kwartaal | Escalatie naar stuurgroep bij overschrijding | W-12 Contractmanagement: SLA boetemechanisme en bonus-malussysteem transparant. |
| KPI-13 | API-conformiteit | 100% endpoints met OpenAPI 3.0; OAuth2/OIDC conform | API-tests, linting | Maandelijks | Non-conform >5% → change gepland | W-13 Interoperabiliteit en API’s: REST/JSON, OAuth2/OIDC, OpenAPI 3.0. |
| KPI-14 | Kaizen-resultaat | ≥4 verbeteringen/jr; elk ≥5% effect op gemeten KPI of waste | CI-rapport | Kwartaal | Niet gehaald → CI-coach inzet | W-14 Continu verbeteren: 4 Kaizen-initiatieven per jaar met meetbare resultaten. |
| KPI-15 | Datakwaliteit & logging | 100% kritieke datavelden gecontroleerd 1x/maand; 100% events in SIEM | DQ-rapport, SIEM | Maand | Missen controles → correctief plan | W-15 Datakwaliteit en logging: centrale logging, SIEM, datakwaliteitscontroles maandelijk. |
| KPI-16 | Exit-gereedheid | Exit-runbook ≤30 dagen gereed; export ≤5 dgn | Exit-checklist, test | Halfjaar | Tekort → remediatie en bestuur rapportage | W-16 Exit-strategie: vendor lock-in voorkomen, overdracht binnen 30 dagen zonder meerprijs. |

Benodigde input:
- Volumes (tickets/maand, transacties/min) en piekuren.
- Exacte P1/P2/P3-definities opdrachtgever.
- Gewenste bonus/malus-percentages per KPI. 
>>>