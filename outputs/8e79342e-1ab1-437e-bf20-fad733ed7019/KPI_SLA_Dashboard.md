Overzicht en definities
De onderstaande KPI’s zijn SMART geformuleerd met meetmethode, norm, drempels, escalatie en rapportagefrequentie. Alle KPI’s hebben een directe link naar W-xx of beoordelingscriterium.

1) KPI-01 Beschikbaarheid productie
- Definitie: Uptime-percentage per kalendermaand, excl. vooraf afgestemde onderhoudsvensters (max 4 uur/maand 22:00–06:00).
- Norm: ≥ 99,95%.
- Meting: APM + synthetics; onafhankelijke verifier mogelijk.
- Drempels: Waarschuwing < 99,97%; Overtreding < 99,95%.
- Escalatie: P1-incident bij structureel < 99,9% (2 maanden).
- Rapportage: maandelijks binnen 5 werkdagen.
- Link W-xx/criterium: W-01 — 99,95% beschikbaarheid productieomgeving

2) KPI-02 MTTR P1-incidenten
- Definitie: Gemiddelde hersteltijd voor P1-incidenten (24x7).
- Norm: ≤ 60 min.
- Meting: ITSM-tool, tijdstempels; steekproefcontrole.
- Drempels: Waarschuwing > 45 min; Overtreding > 60 min.
- Escalatie: War room + probleemrecord.
- Rapportage: maandelijks.
- Link W-xx/criterium: W-02 — Maximale hersteltijd P1-incidenten ≤ 60 min

3) KPI-03 Downtime tijdens migratie
- Definitie: Onbeschikbaarheidsduur tijdens cutover.
- Norm: ≤ 15 min.
- Meting: change window-logs, synthetics.
- Drempels: Waarschuwing > 10 min; Overtreding > 15 min.
- Escalatie: rollback binnen 30 min.
- Rapportage: per cutover.
- Link W-xx/criterium: W-03 — Migratie zonder downtime > 15 min

4) KPI-04 Informatiebeveiliging en logging
- Definitie: Dekking van beveiligingslogging en DPIA-status.
- Norm: 100% logging (inlog, mutatie, export, rolwijziging); DPIA afgerond vóór productie.
- Meting: SIEM-rapporten, compliance-checklist.
- Drempels: Waarschuwing bij ontbrekende events; Overtreding bij DPIA niet compleet.
- Escalatie: CISO-raad + CAB.
- Rapportage: maandelijks.
- Link W-xx/criterium: W-04 — Dataprotectie: ISO 27001 + DPIA + logging 100%

5) KPI-05 Duurzame hosting
- Definitie: Aandeel groene stroom en PUE-waarde.
- Norm: 100% groene stroom; PUE ≤ 1,2.
- Meting: Datacenter-attestaties, PUE-rapport.
- Drempels: Waarschuwing PUE > 1,25; Overtreding PUE > 1,3.
- Escalatie: Datacenter review/verplaatsing.
- Rapportage: halfjaarlijks; uitzonderingen direct.
- Link W-xx/criterium: W-05 — Duurzame hosting: 100% groene stroom + PUE ≤ 1,2

6) KPI-06 Gebruikerstevredenheid
- Definitie: SUS/NPS-score 3 maanden na live.
- Norm: ≥ 85% tevredenheid.
- Meting: Enquête met min. 40% respons.
- Drempels: Waarschuwing 80–85%; Overtreding < 80%.
- Escalatie: UX-verbetersprint.
- Rapportage: per meting (3m en 6m).
- Link W-xx/criterium: W-06 — Gebruiksvriendelijkheid: >85% tevredenheid na 3 maanden

7) KPI-07 Kennisoverdracht
- Definitie: Percentage key-users gecertificeerd binnen 30 dagen na live.
- Norm: 100%.
- Meting: LMS-rapportage en toetsresultaten.
- Drempels: Waarschuwing 95–99%; Overtreding < 95%.
- Escalatie: Hertraining binnen 10 dagen.
- Rapportage: wekelijks tijdens hypercare.
- Link W-xx/criterium: W-07 — Kennisoverdracht: 100% key-user getraind binnen 30 dagen

8) KPI-08 Doorlooptijd implementatie
- Definitie: Aantal weken tussen kick-off en MVP live.
- Norm: ≤ 12 weken.
- Meting: Projectlog; milestone-acceptatie.
- Drempels: Waarschuwing 11–12; Overtreding > 12.
- Escalatie: Herplannen met stuurgroep.
- Rapportage: tweewekelijks.
- Link W-xx/criterium: W-08 — Levertermijn: MVP live binnen 12 weken

9) KPI-09 Continuïteit en herstel
- Definitie: Gemeten RTO/RPO in DR-test.
- Norm: RTO < 2 uur; RPO ≤ 15 min.
- Meting: DR-oefenrapport, replicatiemetrics.
- Drempels: Waarschuwing bij RTO 2–3u / RPO 15–30min.
- Escalatie: DR-plan-update en hertest binnen 10 dagen.
- Rapportage: na elke test.
- Link W-xx/criterium: W-09 — Continuïteit: escrow en uitwijk < 2 uur RTO

10) KPI-10 SLA-rapportage tijdigheid
- Definitie: Tijdsduur tot oplevering maandrapport.
- Norm: ≤ 5 werkdagen.
- Meting: Ticketing/rapport workflow.
- Drempels: Waarschuwing 5–6; Overtreding > 6.
- Escalatie: Correctieve maatregel en 4-ogen check.
- Rapportage: maandelijks.
- Link W-xx/criterium: W-10 — Rapportage: maandelijkse SLA-rapportage binnen 5 werkdagen

11) KPI-11 Innovaties per kwartaal
- Definitie: Aantal opgeleverde verbeterinitiatieven met aantoonbare waarde.
- Norm: ≥ 2 per kwartaal.
- Meting: Roadmap en release notes; value tracking.
- Drempels: Waarschuwing 1; Overtreding 0.
- Escalatie: Stuurgroepprioritering.
- Rapportage: per kwartaal.
- Link W-xx/criterium: W-11 — Innovatie: 2 verbeterinitiatieven per kwartaal

12) KPI-12 Dataportabiliteit
- Definitie: Doorlooptijd volledige export in open formaat inclusief documentatie.
- Norm: ≤ 5 werkdagen.
- Meting: Change/ticket doorlooptijd.
- Drempels: Waarschuwing 4–5; Overtreding > 5.
- Escalatie: Data team inzet prioriteit 1.
- Rapportage: per verzoek.
- Link W-xx/criterium: W-12 — Dataportabiliteit: export binnen 5 werkdagen, open standaard

SLA-bepalingen (generiek)
- Meetperiode: kalendermaand (tenzij anders vermeld).
- Uitsluitingen: vooraf afgestemd onderhoudsvenster; force majeure conform GIBIT/ARVODI.
- Boeteregeling: naar rato van afwijking, met herstelplan (Act-fase PDCA).
- Rapportage: dashboard + PDF met RCA’s en trendgrafieken.

Governance KPI-beheer
- Maandelijkse Service Review met opdrachtgever (KPI’s 1–4 prioriteit).
- Kwartaal Business Review (KPI’s 5–12 en innovatie/duurzaamheid).
- CAB bewaakt wijzigingen met impact op KPI’s; wijziging KPI definities alleen in overleg.

Benodigde input:
- Drempel- en boeteparametrisering van de opdrachtgever (indien anders gewenst).
- Toegang voor opdrachtgever tot realtime dashboards (rollen/accounts).
- Specifieke KPI’s van ketenpartners voor OLA-afstemming.
>>>