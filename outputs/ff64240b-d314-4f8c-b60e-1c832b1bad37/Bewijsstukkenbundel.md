Bewijsstukken — Raamovereenkomst Catering- en Horecadiensten voor Gemeente Middenstad (Project 1380)

1. Doel en scope
- Doel: aantonen dat Uno Automatiseringdiensten B.V. voldoet aan de KO- en REQ-eisen en de SLA-definities, met SMART KPI’s en PDCA-borging.
- Scope: 24/7 beheer, monitoring, beveiliging en ondersteuning van cloud- en infrastructuuroplossingen, incl. Microsoft 365, binnen EU-dataranden, conform ISO 27001 en ISO 9001.
- Opdrachtgever: NVAO (NL). EMVI-criteria: kwaliteit, duurzaamheid, risicobeheersing, prijs.

2. KO-eisen en bewijs (Plan/Do)
- KO-01 ISO 27001 gecertificeerd
  Bewijs: A01 ISO 27001 certificaat + uittreksel Statement of Applicability (SoA); A12 ISMS-risicobeoordeling excerpt.
  W-10 ISMS & security borging.
- KO-02 ISO 9001 gecertificeerd
  Bewijs: A02 ISO 9001 certificaat.
  W-09 Kwaliteitsmanagement en continue verbetering.
- KO-03 24/7 bereikbaarheidsdienst
  Bewijs: A03 NOC-rooster en bereikbaarheidsprocedure; hotline: +31 703300502; A18 geanonimiseerd P1-on-call log.
  W-01 24/7 NOC.

3. Must-eisen en bewijs (Plan/Do)
- REQ-01 Max. responstijd P1: 30 min
  Bewijs: A06 Escalatieprocedure; A15 KPI-meetplan; A18 P1 log.
  W-01, W-02. SLA-02.
- REQ-02 Beschikbaarheid: 99,8% per maand
  Bewijs: A04 Monitoringarchitectuur; A16 Maandrapportagesjabloon.
  W-03. SLA-01.
- REQ-03 Monitoring & patchmanagement geborgd
  Bewijs: A04 Monitoringarchitectuur; A05 Patchbeleid en kalender.
  W-03, W-04.
- REQ-04 ITIL-gebaseerde servicedeskprocessen
  Bewijs: A07 ITIL-procesbeschrijvingen; A06 Escalatieprocedure.
  W-02.
- REQ-05 Alle data binnen EU
  Bewijs: A09 EU-dataresidency verklaring + model verwerkersovereenkomst; A17 DPIA-template.
  W-06.
- REQ-06 Escalatieprocedure incidenten & changes
  Bewijs: A06 Escalatieprocedure; A13 Wijzigingsbeheerbeleid en CAB-kalender.
  W-02, W-11.
- REQ-07 Continuïteitsplan (BCP) beschikbaar
  Bewijs: A08 BCP-samenvatting + laatste testrapport; A20 OTO-plan.
  W-05.
- REQ-08 Personeel VOG indien vereist
  Bewijs: A11 VOG-beleid + geanonimiseerde verklaringen.
  W-08.
- REQ-09 Proactieve monitoring netwerk & endpoints
  Bewijs: A04 Monitoringarchitectuur; A15 KPI-meetplan.
  W-03.
- REQ-10 Ondersteuning Microsoft 365 omgeving
  Bewijs: A10 M365-ondersteuningsscope en rolbeschrijvingen; A16 rapportageformat met M365 KPI-blok.
  W-07.

4. SLA en SMART KPI’s (Check)
- SLA-01 Beschikbaarheid kritieke systemen
  KPI-01 Uptime ≥ 99,8% per maand, excl. vooraf goedgekeurd onderhoud (min. 48 uur vooraf aangekondigd). Meting: synthetische checks en endpoint health, bron A04/A16. Drempel: waarschuwing < 99,9%, escalatie < 99,8%.
- SLA-02 Responstijd P1
  KPI-02 95% van P1 meldingen door mens bevestigd binnen 30 minuten, 100% binnen 45 minuten. Meetpunt: vanaf ticketcreatie tot eerste human response. Bron A18/A16.
- SLA-03 Oplostijd P1
  KPI-03 95% opgelost binnen 4 uur; 100% binnen 8 uur tenzij vendor/klant-dependency vastgelegd in ticket. Bron A16.
- KPI-04 Patch compliance
  95% kritieke patches binnen 14 dagen; 99% binnen 30 dagen. Bron A05/A16.
- KPI-05 Change success rate
  ≥ 98% changes zonder P1-impact. Bron A13/A16.
- KPI-06 CSAT servicedesk
  Gemiddeld ≥ 8,2/10 per maand; responsratio ≥ 25%. Bron A16.
- KPI-07 EU-dataverwerking
  0 incidenten data buiten EU; 100% verwerkersovereenkomsten getekend. Bron A09/A16.
- KPI-08 BCP/DR test
  Jaarlijks ≥ 1 test; RTO ≤ 4 uur; RPO ≤ 1 uur voor kritieke componenten. Bron A08/A20.

5. W-xx maatregelpakket en PDCA-verbinding
- W-01 24/7 NOC en wachtdienst
  Plan: dekking 24/7; Do: rooster, runbooks; Check: KPI-02; Act: root cause na elke overschrijding (A18).
- W-02 ITIL Incident/Major Incident/Problem
  Plan: policy A07; Do: toolflow; Check: KPI-02/03/06; Act: Known Error DB-update.
- W-03 Proactieve monitoring en alerting
  Plan: meetplan A15; Do: onboarding checks; Check: KPI-01; Act: drempels tunen.
- W-04 Patch- en vulnerability management
  Plan: kalender A05; Do: maandelijkse cycles; Check: KPI-04; Act: versnellen bij 0-day.
- W-05 Continuïteit en DR
  Plan: BIA/BCP A08; Do: back-up/replica; Check: KPI-08; Act: scenario’s bijstellen.
- W-06 EU data governance
  Plan: A09/A17; Do: regio-locking; Check: KPI-07 audits; Act: contractueel borgen.
- W-07 Microsoft 365 support
  Plan: R&R A10; Do: operationele runbooks; Check: M365 KPI’s in A16; Act: backlogverbetering.
- W-08 VOG en persoonsbeveiliging
  Plan: A11; Do: preboarding check; Check: 100% VOG op functies; Act: toegangsbeheer intrekken bij afwijking.
- W-09 Kwaliteitsmanagement (ISO 9001)
  Plan: jaarplan; Do: procesuitvoering; Check: interne audit; Act: management review-acties.
- W-10 ISMS (ISO 27001)
  Plan: SoA A01/A12; Do: controls; Check: ISMS-meting; Act: risicobehandeling.
- W-11 Wijzigingsbeheer en CAB
  Plan: A13; Do: CAB; Check: KPI-05; Act: change templates aanscherpen.
- W-12 Licentie- en leveranciermanagement
  Plan: A14; Do: reviewcontracten; Check: 100% compliance; Act: heronderhandelen.

6. Risicodossier (Risico → KPI → W-xx → Maatregel) (Check/Act)
- R-01 Uptime < 99,8%
  KPI-01; W-03; Maatregel: redundantie en health checks; Rest-risico: laag.
- R-02 P1-responstijd > 30 min
  KPI-02; W-01/W-02; Maatregel: dubbele alarmering (telefoon/SMS); Rest: laag.
- R-03 Oplostijd P1 > 4 uur
  KPI-03; W-02/W-11; Maatregel: vendor-escrow en warme lijnen; Rest: middel.
- R-04 Patches te laat
  KPI-04; W-04; Maatregel: CAB-fast-track voor kritieke CVE’s; Rest: laag.
- R-05 Escalaties niet gevolgd
  KPI-02/03; W-02; Maatregel: MIM-oefeningen A20; Rest: laag.
- R-06 Data buiten EU
  KPI-07; W-06; Maatregel: regio policies/datatags; Rest: zeer laag.
- R-07 BCP faalt bij calamiteit
  KPI-08; W-05; Maatregel: jaarlijkse DR-test; Rest: middel.
- R-08 Onvoldoende privacy borging
  KPI-07; W-06; Maatregel: DPIA’s A17; Rest: laag.
- R-09 Capaciteit servicedesk
  KPI-06; W-01/W-02; Maatregel: flexibele schillen; Rest: laag.
- R-10 M365 major incident
  KPI-01/03; W-07; Maatregel: runbooks, Microsoft advisories; Rest: middel.
- R-11 Change veroorzaakt storing
  KPI-05; W-11; Maatregel: peer review, back-out; Rest: laag.
- R-12 Licentie non-compliance
  KPI-… compliance; W-12; Maatregel: kwartaalcontrole A14; Rest: laag.

7. PDCA-borging en rapportage
- Plan: SLA/KPI-meetplan (A15), BCP (A08), ISMS/SoA (A01/A12).
- Do: operationele uitvoering via W-01 t/m W-12.
- Check: maandrapportage (A16), KPI-dashboards (A15), interne audits (ISO 9001/27001).
- Act: verbeterplan binnen 10 werkdagen bij KPI-overschrijding; wijzigingsvoorstel via CAB (A13); lessons learned na elk major incident (A06).

8. Kruisverwijzing W-xx ↔ KPI ↔ Risico ↔ Bewijs
Bijlage | Beschrijving | Relatie (W-xx/KO/REQ) | Status | Verwijzing (pag./sectie)
- W-01 ↔ KPI-02/03 ↔ R-02/R-03 ↔ A03/A18 | 24/7 NOC | W-01, KO-03, REQ-01 | Bijgevoegd | Sectie 3, 5
- W-02 ↔ KPI-02/03/06 ↔ R-03/R-05 ↔ A06/A07 | ITIL Incident/MIM | W-02, REQ-04/06 | Bijgevoegd | Sectie 3, 5
- W-03 ↔ KPI-01 ↔ R-01 ↔ A04/A15 | Monitoring | W-03, REQ-02/03/09 | Bijgevoegd | Sectie 3, 5
- W-04 ↔ KPI-04 ↔ R-04 ↔ A05 | Patch mgmt | W-04, REQ-03 | Bijgevoegd | Sectie 3, 5
- W-05 ↔ KPI-08 ↔ R-07 ↔ A08/A20 | BCP/DR | W-05, REQ-07 | Bijgevoegd | Sectie 3, 5
- W-06 ↔ KPI-07 ↔ R-06/R-08 ↔ A09/A17 | EU data | W-06, REQ-05 | Bijgevoegd | Sectie 3, 5
- W-07 ↔ KPI-01/03 ↔ R-10 ↔ A10/A16 | M365 support | W-07, REQ-10 | Bijgevoegd | Sectie 3, 5
- W-08 ↔ KPI VOG 100% ↔ R-… HR | A11 | VOG beleid | W-08, REQ-08 | Bijgevoegd | Sectie 3, 5
- W-09 ↔ KPI-06 ↔ R-09 ↔ A02 | ISO 9001 | W-09, KO-02 | Bijgevoegd | Sectie 2, 5
- W-10 ↔ KPI-… ISMS ↔ R-… sec | A01/A12 | ISO 27001 | W-10, KO-01 | Bijgevoegd | Sectie 2, 5
- W-11 ↔ KPI-05 ↔ R-11 ↔ A13 | Change mgmt | W-11, REQ-06 | Bijgevoegd | Sectie 3, 5
- W-12 ↔ KPI licentie ↔ R-12 ↔ A14 | Licentiemgmt | W-12 | Bijgevoegd | Sectie 5, 6

9. Overzicht bijlagen
Bijlage | Beschrijving | Relatie (W-xx/KO/REQ) | Status | Verwijzing (pag./sectie)
- A01 | ISO 27001 certificaat + SoA-uittreksel | KO-01, W-10 | Bijgevoegd | Sectie 2.1
- A02 | ISO 9001 certificaat | KO-02, W-09 | Bijgevoegd | Sectie 2.2
- A03 | 24/7 bereikbaarheidsdienst: proces, rooster, hotline +31 703300502 | KO-03, REQ-01, W-01 | Bijgevoegd | Sectie 2.3, 3.1
- A04 | Monitoringarchitectuur en meetpunten | REQ-02/03/09, W-03 | Bijgevoegd | Sectie 3.2, 4
- A05 | Patchbeleid en maandkalender | REQ-03, W-04 | Bijgevoegd | Sectie 3.3
- A06 | Escalatieprocedure Incident/Major Incident/Change | REQ-06, W-02 | Bijgevoegd | Sectie 3.4
- A07 | ITIL-procesbeschrijvingen (Incident/Change/Problem/Request) | REQ-04, W-02 | Bijgevoegd | Sectie 3.4
- A08 | Business Continuity Plan + testrapport | REQ-07, W-05 | Bijgevoegd | Sectie 3.5
- A09 | EU-Dataresidency verklaring + model verwerkersovereenkomst | REQ-05, W-06 | Bijgevoegd | Sectie 3.6
- A10 | Microsoft 365 supportscope en rolbeschrijvingen | REQ-10, W-07 | Bijgevoegd | Sectie 3.7
- A11 | VOG-beleid + geanonimiseerde VOG-verklaringen | REQ-08, W-08 | Bijgevoegd | Sectie 3.8
- A12 | ISMS-risicobeoordeling (projectrelevante excerpt) | KO-01, W-10 | Bijgevoegd | Sectie 2.1, 6
- A13 | Wijzigingsbeheerbeleid en CAB-kalender | REQ-06, W-11 | Bijgevoegd | Sectie 3.4
- A14 | Licentie- en configuratiebeheerprocedure | W-12 | Bijgevoegd | Sectie 5
- A15 | KPI-meetplan en dashboarddefinities | SLA/KPI, W-03/W-04 | Bijgevoegd | Sectie 4
- A16 | Maandrapportageformat incl. SLA/KPI-secties | SLA/KPI | Bijgevoegd | Sectie 4, 7
- A17 | DPIA-template en privacy-by-design checklist | REQ-05, W-06 | Bijgevoegd | Sectie 3.6
- A18 | Geanonimiseerd P1 on-call/responstijd log | REQ-01, W-01 | Bijgevoegd | Sectie 3.1, 4
- A19 | Security Incident Response Procedure | W-10 | Bijgevoegd | Sectie 5
- A20 | OTO-plan (oefenen major incident/DR) | REQ-07, W-05 | Bijgevoegd | Sectie 3.5, 7
- A21 | Plan van Aanpak (Project 1380) | Deliverable | Bijgevoegd | Sectie 1
- A22 | Risicodossier (Project 1380) | Deliverable | Bijgevoegd | Sectie 6
- A23 | KPI-overzicht en SLA-matrix (Project 1380) | Deliverable | Bijgevoegd | Sectie 4

Benodigde input: