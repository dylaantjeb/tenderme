Tijdlijn (Weken 1–26) – ASCII Gantt (FTE inzet: 6–10; methode: Agile-sprints 2 weken)

Legenda: █ taakduur | ░ buffer | ▲ mijlpaal | → afhankelijkheid

Wk 01 02 03 04 05 06 07 08 09 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25 26
Inceptie & Kick-off         ████▲
Governance & RACI           ████
Risico & Stakeholderanalyse ███
Architectuur & High-level   █████
Security & DPIA start       ████░
----------------------------------------------------------------------------------------------------------------
Functionele analyse                ██████
Datamapping & catalogus            ████████
Integratie-ontwerp                 ███████
Technisch ontwerp                  ███████
Toegankelijkheidskaders (WCAG)     ████
----------------------------------------------------------------------------------------------------------------
Configuratie kern (Zaaktypes)             ████████
Integraties bouwen (BRP/KCC/Digikopp.)    ███████████
SaaS Landing zone & Monitoring            ███████
Logging & SIEM use-cases                  ██████
eHerkenning/SAML                          █████
----------------------------------------------------------------------------------------------------------------
Migratie Mock-run                               █████
Defectfix & datacorrecties                           ███
SIT (systeemintegratietest)                           ██████
UAT voorbereiding                                     ███
UAT met key users                                         ███████
Toegankelijkheidsaudit                                      ███
PEN-test                                                    ███
Performance test                                             ███
----------------------------------------------------------------------------------------------------------------
Go/no-go voorbereiding                                           ███
Change freeze                                                    ██
Go-live (nacht)                                                     █▲
Hypercare (14 dagen)                                               ██████
Overdracht naar Beheer                                                 ███
----------------------------------------------------------------------------------------------------------------
Beheer (SLA/KPI rapportage)                                              █████████████████████
Kwartaalreview & PDCA                                                     ███       ███
Exit-oefening (jaarlijks)                                                 █
----------------------------------------------------------------------------------------------------------------

Afhankelijkheden en buffers
- Integraties bouwen start na Technisch ontwerp (→ Integraties na T.O.). Buffer: 1 week (░) tussen ontwerp en bouw.
- UAT start na succesvolle SIT en Mock-run reconciliatie ≥99,95% (→ UAT na SIT/Mock). Buffer: 3 dagen voor datacorrecties.
- Go-live vereist: PEN-test “acceptabel” (0 critical), WCAG ≥98% AA, performance OK, en CAB-goedgekeurde changes.
- Hypercare sluit af na behalen stabiele KPI’s (KPI1, KPI2, KPI14) gedurende 10 opeenvolgende werkdagen.
- Beheerfase start parallel met overdracht en documentatie-acceptatie (SoP’s, runbooks, RACI, contactmatrix).

Rollen per fase
- Initiatie: Technisch PL (lead), Security Officer, PMO, Architect.
- Ontwerp: Architect (lead), Integratie Lead, Privacy Officer, UX Lead.
- Realisatie: Config Lead, DevOps, Integratie Lead, CISO, QA.
- Test: Testmanager (lead), Key Users, Privacy Officer, UX Lead, SecTester.
- Go-live/Hypercare: Technisch PL, Servicedeskmanager, CAB.
- Beheer: Servicedeskmanager, PMO, QMS Lead, CISO.

Mijlpalen
- M1 Project Kick-off (einde week 1) ▲
- M2 Goedgekeurd Technisch Ontwerp (einde week 6) ▲
- M3 Mock-run ≥99,95% acc (week 12) ▲
- M4 UAT-acceptatie (week 16) ▲
- M5 Go-live (week 18) ▲
- M6 Einde Hypercare (week 20) ▲
- M7 Eerste kwartaalreview/PDCA (week 24) ▲

Controle op W-xx en KPI’s
- W-01/W-03: Beschikbaarheid & onderhoud geborgd via monitoring/Change-kalender (KPI1, KPI3).
- W-04: Migratiestappen (mock/dress/prod) met reconciliatie en go/no-go (KPI4).
- W-05: Integraties op kritieke paden, synthetische tests (KPI5).
- W-06/W-07: Security & privacy-by-design, DPIA, logging 7 jaar; audits gepland (KPI6, KPI7).
- W-08/W-10: Duurzaamheid en WCAG-audit geïntegreerd in testtraject (KPI8, KPI10).
- W-09: Trainingen gepland voor UAT/go-live (KPI9).
- W-11: Exit-oefening in beheerfase (KPI11).
- W-12: Maandrapportage vanaf eerste volledige maand na go-live (KPI12).
- W-13/W-15: CAB-cadans, PDCA-sluiting (KPI13, KPI15).
- W-14: Servicedesk-scripts/kennisbank voor CSAT (KPI14).

Deliverables per fase (selectie)
- Initiatie: PID, RACI, risicoregister v1, planning baseline.
- Ontwerp: Technisch Ontwerp, Integratie-ontwerp, DPIA-plan, WCAG plan.
- Realisatie: Geconfigureerde omgeving, integraties, SIEM use-cases, testdata.
- Test: SIT/UAT-scripts, auditrapporten (WCAG/PEN), performance-rapport.
- Go-live: Go/no-go-dossier, rollback-plan, communicatieplan.
- Beheer: SLA/KPI-dashboard, runbooks, exit-runbook, kwartaalreview.

Reserves en flexibiliteit
- 15% tijdsbuffer op kritieke paditems (UAT, integraties, PEN).
- Capaciteitsbuffer: extra DevOps en testcapaciteit oproepbaar binnen 5 werkdagen.
- Force majeure: erkende uitzonderingen op KPI1/KPI3 conform contract.

Communicatie & governance
- Dagelijkse stand-ups (realisatie/test), 2-wekelijkse sprintreviews, wekelijkse stuurgroep (implementatie), maandelijkse service review (beheer).
- CAB wekelijks; emergency CAB ad hoc.

Benodigde input:
- Beschikbaarheid key users per sprint (calendars).
- Toegang en contactpunten voor BRP/KCC/eHerkenning leveranciers.
- Voorkeursvenster voor go-live en freeze-periode. 
<<<END FILE:Planning_Gantt.md>>>