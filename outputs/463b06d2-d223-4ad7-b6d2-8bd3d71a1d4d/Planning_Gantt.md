Planning — raamovereenkomstimplementatie (PDCA, SMART, gates en mijlpalen)

ASCII-Gantt (fasen, start/eind, gate-reviews, mijlpalen)
Tijdas: | Dec'25 |        Jan'26        |       Feb'26       |         Mar'26          |        Apr'26        |   May'26  |  Jun'26  |
Weeks:  | W50 W51 W52 | W01 W02 W03 W04 | W05 W06 W07 W08 | W09 W10 W11 W12 W13 | W14 W15 W16 W17 W18 | W19 W20 | W21 W22 |

G0 Go/No-Go 09-12-2025
W-01 Voorb. & EMVI-dossier (PLAN)      [09-12-2025 — 17-01-2026]
         [====Dec====][========Jan (tot 17)========]
                                   ▲ G1 Indienen 20-01-2026

W-02 Beoordeling & Clarificaties     [21-01-2026 — 20-02-2026]
                                        [====Jan/Feb====]
                                                ▲ G2 Voorl. gunning 21-02-2026

W-03 Contractering & Mobilisatie (DO) [24-02-2026 — 07-03-2026]
                                                   [==Mar==]
                                                        ▲ G3 Contract getekend 07-03-2026

W-04 Discovery & High-Level Design (PLAN/DO) [10-03-2026 — 24-03-2026]
                                                           [==Mar==]

W-05 Monitoring, Security hardening, ITIL (DO) [25-03-2026 — 05-04-2026]
                                                                [=Mar/Apr=]
                                                                   ▲ G4 SRR 05-04-2026

W-06 Pilot & Hypercare (CHECK)        [06-04-2026 — 30-04-2026]
                                                                     [====Apr====]
                                                                            ▲ G5 Hypercare-exit 30-04-2026

W-07 Run & Continue Verbeteren (ACT)  [01-05-2026 — 30-06-2026]
                                                                                 [==May/Jun==]
                                                                                          ▲ G6 QBR1 30-06-2026

Belangrijkste mijlpalen:
- G0 Go/No-Go bid: 09-12-2025
- G1 Inschrijving EMVI ingediend: 20-01-2026 (deadline aanbesteding)
- G2 Voorlopige gunning: 21-02-2026
- G3 Contract getekend: 07-03-2026
- G4 Service Readiness Review (SRR) akkoord: 05-04-2026
- G5 Hypercare-exit: 30-04-2026
- G6 QBR1 (kwartaalreview) en PDCA-acties vastgesteld: 30-06-2026

W-xx werkpakketten (SMART, PDCA, KPI-koppeling, risico en bewijs)
- W-01 Voorbereiding & EMVI-dossier (PLAN)
  KPI: 100% compleet PvA, Risicodossier en KPI-overzicht ingediend vóór 20-01-2026; 0 KO-afwijkingen; interne kwaliteitsscore ≥90%.
  Risico: Onvolledige inschrijving → Mitigatie: 2-reviewcyclus, KO-checklist, ISO-verklaringen bijsluiten.
  Bewijs: Ingediend PvA/Risicodossier/KPI-overzicht; certificaten ISO 27001/9001; 24/7 bereikbaarheidsplan.
  Relevante eisen: KO ISO 27001/9001; 24/7 bereikbaarheid; musts (BCP, ITIL, EU-data, escalatieprocedure).
- W-02 Beoordeling & Clarificaties (PLAN/DO)
  KPI: Alle Nota van Inlichtingen-vragen beantwoord ≤ 2 k.d. na ontvangst; 100% traceability van antwoorden.
  Risico: Onzekerheden in scope → Mitigatie: RACI met opdrachtgever, gestructureerde vraaglog.
  Bewijs: Clarificatie-log, VvT-overzicht met doorlooptijden.
- W-03 Contractering & Mobilisatie (DO)
  KPI: Contract getekend ≤ 14 k.d. na gunning; Mobilisatieplan geaccordeerd ≤ 5 k.d. na tekenen.
  Risico: Vertraging besluitvorming → Mitigatie: Vooraf overeengekomen besluitkalender.
  Bewijs: Ondertekend contract; Mobilisatieplan; DAP/DPA (verwerkersovereenkomst).
- W-04 Discovery & High-Level Design (PLAN/DO)
  KPI: 100% assetinventaris; dataverwerking 100% binnen EU; gaplist security binnen 5 k.d. klaar.
  Risico: Onvolledige CMDB → Mitigatie: Workshops, geautomatiseerde scan, validatie met key-users.
  Bewijs: CMDB-export; HLD; EU-locatierapport; gaplist met prioriteiten.
- W-05 Monitoring, Patchmanagement, ITIL-processen (DO)
  KPI: ≥95% endpoints onder monitoring ≤ 10 k.d. na SRR; patchcompliance ≥95% binnen 14 dagen; 24/7 alerting actief.
  Risico: Agent-rollout faalt → Mitigatie: Stapsgewijze uitrol, rollback, change-kalender.
  Bewijs: Monitoring-dashboard; patchrapporten; runbooks; ITIL-procesbeschrijvingen.
- W-06 Pilot & Hypercare (CHECK)
  KPI: 0 P1 open bij SRR; CSAT ≥8/10; P1 TTO <30 min, TTR <4 uur; 99,8% beschikbaarheid per maand.
  Risico: Verstoringen bij transitie → Mitigatie: Pilotscope, extra bezetting, tijdelijke freeze.
  Bewijs: SRR-rapport; CSAT-enquêtes; SLA-rapportage; incidentreview (PIR).
- W-07 Run & Continue Verbeteren (ACT)
  KPI: Maandelijks SLA-rapport; QBR op tijd; ≥3 verbetervoorstellen per kwartaal; continuïteitstest 1x per jaar.
  Risico: KPI-erosie in run → Mitigatie: OKR-cyclus, trendanalyses, backlog met prioritering.
  Bewijs: QBR-decks; verbeterbacklog; BCP-testverslag.

KPI-overzicht gekoppeld aan eisen en SLA’s
- Beschikbaarheid kritieke systemen ≥99,8%/maand (SLA). W-06/W-07. Risico: single points of failure → Mitigatie: redundantie, monitoring. Bewijs: uptime-rapporten.
- Responstijd P1 <30 min (24/7) (SLA, must). W-05/W-06/W-07. Risico: onderbezetting → Mitigatie: roosters, escalaties. Bewijs: ticketlogs, rooster.
- Oplostijd P1 <4 uur (SLA). W-06/W-07. Risico: vendor-afhankelijkheid → Mitigatie: supportcontracten, swarming. Bewijs: ticket SLA-metrics.
- Patchcompliance ≥95% binnen 14 dagen (must “Monitoring & patchmanagement”). W-05/W-07. Risico: change-vensters → Mitigatie: change-kalender. Bewijs: patchrapporten.
- EU-dataverwerking 100% (must). W-04/W-07. Risico: derde partijen buiten EU → Mitigatie: DPA’s, datalokatie-audits. Bewijs: verwerkersregister, locatierapport.

Risicobeheersing (top-5, PDCA)
- R1 Scope-onduidelijkheid vóór SRR → Plan: discovery-workshops; Do: CMDB-scan; Check: scope-freeze review; Act: aanpassing HLD. KPI: 100% assetinventaris. Bewijs: workshopnotulen.
- R2 Capaciteit 24/7 bezetting → Plan: capaciteitsplan; Do: rooster 24/7; Check: weekly adherence; Act: bijsturen. KPI: TTO P1 <30m. Bewijs: rooster, adherence.
- R3 Patch-achterstanden → Plan: patch policy; Do: uitrol wave-based; Check: compliance-rapport; Act: exceptions/lessons learned. KPI: ≥95%/14d. Bewijs: rapporten.
- R4 Continuïteit (BCP) → Plan: BIA/BCP; Do: runbook DR; Check: testresultaten; Act: verbeteringen. KPI: RTO/RPO conform BCP. Bewijs: testverslag.
- R5 Leveranciersafhankelijkheid → Plan: contractmatrix; Do: support-SLA’s; Check: vendor performance; Act: alternatief/dual vendor. KPI: P1 TTR <4h. Bewijs: contracten.

PDCA-borging per fase
- Plan: W-01, W-04 (eisen, ontwerp, CMDB, HLD, BCP).
- Do: W-03, W-05 (mobilisatie, inrichting monitoring/ITIL).
- Check: W-06 (pilot, hypercare, CSAT, SLA-check).
- Act: W-07 (QBR/OKR, verbetermaatregelen, lessons learned).

Kwaliteit en compliance
- KO-eisen: ISO 27001/ISO 9001 gecertificeerd; 24/7 bereikbaarheidsdienst. Bewijs: certificaten (geldig), bereikbaarheidsrooster en escalatieprocedure.
- Must-haves geborgd: ITIL-processen, EU-dataverwerking, BCP, escalatieprocedure, M365-ondersteuning, proactieve monitoring (netwerk/endpoints), beschikbaarheid 99,8%.
- Bewijslast tijdens SRR: getekende runbooks, geactiveerde monitoring, rapportages en testlogs (P1 simulatie).

Mijlpalencriteria (exit/entry)
- G1 entry: Complete EMVI-set ingediend, interne GO. Exit: ontvangstbevestiging aanbestedende dienst.
- G3 entry: Gunning ontvangen; Exit: getekend contract, mobilisatieplan akkoord.
- G4 SRR entry: monitoring ≥95% dekking pilot-scope, ITIL-procedures actief; Exit: 0 open kritieke gaps.
- G5 exit: CSAT ≥8/10, geen open P1/P2, 4 weken stabiele SLA.
- G6 QBR1: alle SLA’s ≥ target, PDCA-acties voor Q2 vastgesteld.

Aannames en randvoorwaarden (conform dossier)
- Opdrachtgever levert tijdig toegangen/informatie; locaties toegankelijk; besluitvorming binnen termijnen.
- Internet/netwerk op locaties voldoet aan minimale eisen; Microsoft 365- en overige licenties zijn rechtmatig.
- Buiten scope: levering/beheer onsite hardware tenzij afgesproken; third-party SaaS-support; projectwerk buiten beheer; meerwerk apart; adoptie/training op verzoek.
- Prijs is vast (pricing_locked); garantie 12 maanden op projectdeliverables.

Benodigde input:
- Lijst en contactgegevens key-stakeholders (contract, security, operations).
- Overzicht locaties/scope (site-adressen, openingstijden, kritieke systemen, maintenance windows).
- Actuele CMDB/export en netwerk-topologie (incl. M365 tenant-ID en rechtenmodel).
- Security- en compliance-eisen specifiek van opdrachtgever (DPIA-status, verwerkersovereenkomst/AVG).
- Huidige ITIL-procedures en gewenste aanpassingen (incident, change, escalation).
- Overzicht third-party leveranciers en contract-SLA’s (vendor matrix).
- Wensplanning voor transitie en blackout/changes (freeze-periodes).
- Toegangen voor discovery: testaccounts, VPN/privileged access, contact voor on-site toegang.

Benodigde input: