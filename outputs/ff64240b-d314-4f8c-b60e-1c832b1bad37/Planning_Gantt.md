Planning — Raamovereenkomst Catering- en Horecadiensten voor Gemeente Middenstad (Project 1380)
Opdrachtnemer: Uno Automatiseringsdiensten B.V. — Contractant: NVAO — Methode: EMVI

ASCII-Gantt (2026, basisplanning; exploitatie loopt tot 2030-04-30)
Legenda: ==== fase | ^^ mijlpaal | [GRx] gate review | R kwartaalreview/QBR

2026            | Jan        | Feb        | Mar        | Apr        | May        | Jun        | Jul        | Aug        | Sep        | Oct        | Nov        | Dec
---------------------------------------------------------------------------------------------------------------------------------------------------------------
M0 Contract     |      ^^15  |            |            |            |            |            |            |            |            |            |            |
F1 Initiatie &  |     =======|==          |            |            |            |            |            |            |            |            |            |
Mobilisatie     | 15→05-Feb  |            |            |            |            |            |            |            |            |            |            |
GR1 PvA akkoord |            |  [GR1]05   |            |            |            |            |            |            |            |            |            |
F2 Transitie &  |            |   =========|============|==          |            |            |            |            |            |            |            |
Overname        |            | 06-Feb→31-Mar           |            |            |            |            |            |            |            |            |
M1 Service Ready|            |            |           ^^31          |            |            |            |            |            |            |            |
GR2 Go-Live     |            |            |            | [GR2]01    |            |            |            |            |            |            |            |
F3 Stabilisatie |            |            |            |  ========= |            |            |            |            |            |            |            |
                |            |            |            | 01→30-Apr  |            |            |            |            |            |            |            |
M2 1e KPI-rapport|           |            |            |          ^^30           |            |            |            |            |            |            |
F4 Exploitatie &|            |            |            |            |  =======================|============|============|============|============|============|
PDCA (24/7)     |            |            |            |            | 01-May→31-Dec, doorlopend tot 30-Apr-2030                                         |
QBR/Reviews     |            |            |            |            |        R30 |            |       R30  |            |       R30  |            |
M3 KPI groen 2m |            |            |            |            |            |          ^^30           |            |            |            |            |
M4 ISO 27001    |            |            |            |            |            |            |            |            |         ^^15|            |            |
surveillance    |            |            |            |            |            |            |            |            | 15-Sep     |            |            |
F5 Exit-readiness
- Plan (versie 1.0)         |            |            |            |            |    ====    |            |            |            |            |            |
                           |            |            |            |            | 15→31-May  |            |            |            |            |            |
- Test (tabletop)           |            |            |            |            |            |            |            |            |    ========|            |
                           |            |            |            |            |            |            |            |            | 01→31-Oct  |            |
GR3 Einde stabilisatie      |            |            |            |     [GR3]30|            |            |            |            |            |            |
GR4 Jaarreview (J1)         | (aankondiging: 30-Apr-2027; buiten deze jaargrafiek, wel vastgelegd in planning)
---------------------------------------------------------------------------------------------------------------------------------------------------------------

Kernfasen, doelen, deliverables en PDCA
- F1 Initiatie & Mobilisatie (15-01-2026 t/m 05-02-2026)
  Doel: projectinrichting, governance, detailinventarisatie en PvA-acceptatie.
  Deliverables: Plan van Aanpak v1.0 (incl. escalatieprocedure), RACI, communicatie- en securityplan (EU-dataverwerking geborgd).
  Gate: GR1 = goedgekeurd PvA, ISO- en VOG-bewijs gecontroleerd, 24/7 bereikbaarheidsdienst operationeel.
- F2 Transitie & Overname (06-02-2026 t/m 31-03-2026)
  Doel: gecontroleerde overdracht van beheer, implementatie monitoring, patchmanagement, ITIL-servicedesk en BCP-activatie.
  Deliverables: CMDB-import, monitoring dashboards live, patchpolicy actief, runbooks P1–P3, BCP/DR test (tabletop), EU-data check.
  Mijlpaal: M1 Service Ready; alle must-eisen actief (responstijd P1 < 30 min bewezen via testcall).
- F3 Stabilisatie (01-04-2026 t/m 30-04-2026)
  Doel: prestaties stabiliseren, kinderziektes verhelpen, eerste SLA-rapportage.
  Deliverables: KPI-rapport maand 1, risicodossier v1.1, probleembeheer analyses.
  Gate: GR3 = alle SLA’s ≥ target in laatste 2 weken; geen open P1/P2 ouder dan 7 dagen.
- F4 Exploitatie & Continu Verbeteren (01-05-2026 t/m 30-04-2030)
  Doel: duurzame, beveiligde 24/7 dienstverlening met maandelijkse PDCA-loop en kwartaalreviews (QBR).
  Deliverables: maandelijkse SLA/KPI-rapporten, kwartaal-verbeterbacklog, jaarreview en roadmap.
  Mijlpalen: M3 KPI groen 2 maanden op rij (30-06-2026), M4 ISO 27001 surveillance (15-09-2026) zonder bevindingen categorie Major.
- F5 Exit-readiness
  Doel: borging continuïteit en overdraagbaarheid. Exitplan v1.0 (mei 2026), tabletop-test (oktober 2026), jaarlijkse herijking.

PDCA-cyclus (maandelijks, start mei 2026)
- Plan: verbeterhypotheses op basis van trendanalyse incidenten/changes/patchcompliance en security-events.
- Do: implementatie verbeteringen via CAB-goedgekeurde changes binnen vastgesteld onderhoudsvenster.
- Check: maandelijkse SLA-rapportage met variatieanalyse en root cause; QBR per kwartaal.
- Act: herprioriteren backlog, aanpassen runbooks en KPI-targets indien overeengekomen; lessons learned vastleggen.

KPI’s en SLA’s (SMART)
- KPI-1 Beschikbaarheid kritieke systemen: ≥ 99,8% per kalendermaand (exclusief vooraf geaccordeerde onderhoudsvensters). Meetmethode: monitoring en uptime-rapporten; tolerantie: 0,2%. Escalatie bij <99,8% binnen 4 uur naar senior management en opdrachtgever.
- KPI-2 Responstijd P1 incidenten: ≤ 30 minuten (24/7). Meetmethode: ticketsysteem-stempels en geautomatiseerde alert-acknowledgement. Escalatie: automatische paging na 10 min; management alert na 20 min.
- KPI-3 Oplostijd P1 incidenten: ≤ 4 uur (TTF). Meetmethode: ticketdata; rekenregels vastgelegd in SLA. Workaround acceptabel indien schriftelijk akkoord opdrachtgever.
- Aanvullend kwaliteitsdoel (Duurzaamheid): reductie energieverbruik hostingcomponenten -5% in jaar 1 t.o.v. baseline (mei 2026), via optimalisatie workloads en patching; rapportage per QBR.

Risicobeheersing (selectie, gekoppeld aan W-xxx)
- R-01 Vertraagde toegang en informatie kan transitie vertragen. Maatregel: W-02 en W-03 strak plannen met harde acceptatiecriteria in GR1.
- R-02 Onvoldoende monitoring/patching leidt tot SLA-schending. Maatregel: W-05 W-06 implementeren vóór M1, maandelijkse audits.
- R-03 Dataverwerking buiten EU door derde partijen. Maatregel: W-04 EU-data check en verwerkersovereenkomsten afronden vóór GR2.
- R-04 24/7 bezetting niet aantoonbaar. Maatregel: W-07 paging-test en roostercontrole in F2.
- R-05 Kennisoverdracht incompleet. Maatregel: W-09 runbooks, schaduwdiensten en toetsing in F3.

W-xx werkpakketten met koppeling KPI ↔ Risico ↔ Bewijs
- W-01 Projectstart en governance inrichten (15-01 t/m 19-01-2026)
  KPI: KPI-2, KPI-3 | Risico: R-04 | Bewijs: E-02 SOC-paging-config, E-06 Escalatietestlog.
- W-02 Inventarisatie systemen/CMDB (15-01 t/m 05-02-2026)
  KPI: KPI-1 | Risico: R-01, R-05 | Bewijs: E-08 CMDB-export, E-09 Config-reviewrapport.
- W-03 Plan van Aanpak en Securityplan (15-01 t/m 05-02-2026)
  KPI: KPI-1 | Risico: R-02, R-03 | Bewijs: E-01 ISO 27001/9001 certificaten, E-05 DPA/EU-dataverwerking.
- W-04 EU-dataverwerking valideren (06-02 t/m 16-02-2026)
  KPI: KPI-1 | Risico: R-03 | Bewijs: E-05 DPA’s en verwerkersregister.
- W-05 Monitoring implementeren (06-02 t/m 29-02-2026)
  KPI: KPI-1, KPI-2 | Risico: R-02 | Bewijs: E-02 Monitoringdashboards, uptime-rapporten.
- W-06 Patchmanagement activeren (10-02 t/m 15-03-2026)
  KPI: KPI-1 | Risico: R-02 | Bewijs: E-10 Patchcompliancerapporten, CAB-logs.
- W-07 24/7 bereikbaarheidsdienst (06-02 t/m 31-03-2026)
  KPI: KPI-2, KPI-3 | Risico: R-04 | Bewijs: E-06 Roosters, testcalls, MTTR-statistiek.
- W-08 ITIL-servicedesk processen (06-02 t/m 20-03-2026)
  KPI: KPI-2, KPI-3 | Risico: R-02 | Bewijs: E-11 Processdocumenten, toolconfig, KPI-exports.
- W-09 Runbooks en BCP/DR tabletop (01-03 t/m 29-03-2026)
  KPI: KPI-1 | Risico: R-05 | Bewijs: E-03 BCP, E-12 Tabletop-rapport en actiepunten.
- W-10 Go-Live en stabilisatie (01-04 t/m 30-04-2026)
  KPI: KPI-1-3 | Risico: R-01-05 | Bewijs: E-13 Go-Live verslag, E-14 SLA-rapport maand 1.
- W-11 PDCA-loop operationeel (01-05-2026 start, maandelijks)
  KPI: KPI-1-3 | Risico: trendbreuken | Bewijs: E-15 Maandrapporten, QBR-slides.
- W-12 Duurzaamheidsoptimalisaties (mei–dec 2026)
  KPI: Duurzaamheidsdoel (-5% energie) | Risico: besparingen blijven uit | Bewijs: E-16 Baseline- en QBR-meting.

Bewijsbronnen (selectie)
- E-01 ISO 27001/9001 certificaten (geldig, scope beheer & security).
- E-02 Monitoring/SOC-export (uptime, alerting, response).
- E-03 BCP/DR-documentatie en testverslagen.
- E-05 EU DPA’s en verwerkersregister.
- E-06 Escalatie- en on-call testlogs.
- E-10 Patchcompliance-rapporten uit tooling.
- E-14 SLA/KPI-rapportages (maandelijks).
- E-16 Duurzaamheidsmeting (baseline vs. actuele consumptie).

Gate-criteria
- GR1 (05-02-2026): PvA goedgekeurd, risico- en stakeholderregister gereed, ISO-bewijs en VOG-proces gecontroleerd.
- GR2 (01-04-2026): Monitoring 100% van kritieke assets, patchpolicy actief, 24/7-escalatie getest, EU-data geborgd, Service Ready verklaard.
- GR3 (30-04-2026): KPI-1 ≥ 99,8% (laatste 2 weken), KPI-2 en KPI-3 100% gehaald, geen open P1/P2 ouder dan 7 dagen, runbooks afgerond.
- GR4 (30-04-2027): Jaarreview incl. PDCA-resultaten, verbeterdoelen jaar 2 vastgesteld, herbevestiging continuïteits- en exitplan.

Kwaliteit, duurzaamheid, risicobeheersing en prijs (EMVI)
- Kwaliteit (40%): aantoonbare SLA-sturing, ITIL-processen, ISO-geborgd; PDCA met QBR; schaduwdiensten in F3.
- Duurzaamheid (20%): -5% energie jaar 1 door workloadoptimalisatie, patching en lifecycle-management; rapportage in QBR.
- Risicobeheersing (20%): vroegtijdige EU-data validatie (W-04), paging-tests (W-07), BCP/DR tabletop (W-09), exit-readiness (F5).
- Prijs (20%): vaste maandfee voor beheer; meerwerk per offerte; garanties: 12 maanden op projectdeliverables.

SLA-conformiteit en compliancy
- KO: ISO 27001/9001 gecertificeerd — E-01 bijgevoegd.
- KO: 24/7 bereikbaarheidsdienst — W-07 geïmplementeerd en getest.
- Musts: Responstijd P1 ≤ 30 min; Beschikbaarheid ≥ 99,8%; Proactieve monitoring & patchmanagement; ITIL-servicedesk; EU-dataverwerking; Escalatieprocedure; BCP beschikbaar; VOG-proces; Proactieve netwerk/endpoint monitoring; M365-support — allen opgenomen in W-01 t/m W-11 en getoetst bij GR2/GR3.

Benodigde input:
- Definitieve gunningsdatum en gewenste ingangsdatum dienstverlening (voor bevestiging planning).
- Aantallen en locaties (locatielijst, openingstijden, contactpersonen, toegangsregels).
- Overzicht kritieke systemen/diensten en huidige leveranciers, inclusief contractuele exit-voorwaarden.
- Toegang tot huidige CMDB, netwerkdiagrammen, securitypolicies en onderhoudsvensters.
- Verwerkersovereenkomsten/DPAs van derde partijen; expliciete eisen rondom EU-dataverwerking.
- P1/P2/P3-definities opdrachtgever en gewenste escalatieroutes.
- VOG-eisen per rol en screeningskaders.
- Baseline energieverbruik relevante IT-componenten (voor duurzaamheids-KPI).

Benodigde input: