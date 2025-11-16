Clarificatievragen – Raamovereenkomst (EMVI) ICT-diensten

1) W-01 Scope en aanbestedingsdocumenten inconsistentie (titel vs. inhoud)
- Vraag (SMART): Bevestig binnen 5 werkdagen de juiste scope en opdrachtgever: betreft dit een ICT-raamovereenkomst voor cloud/infrastructuurbeheer (NVAO, sector ICT) of catering/horeca (Gemeente Middenstad)? Lever tegelijk de juiste referentie/aanbestedingsnummer en de actuele set aanbestedingsdocumenten.
- Prioriteit: Hoog
- Impact: Onjuiste inschrijving, ongeldige EMVI-inzet en mismatch in plan van aanpak.
- Afhankelijkheden: Alle overige vragen; planning, prijsmodel en SLA-kaders.
- KPI-koppeling: KPI-0 Governance (100% documentconsistentie vóór indiening).
- Risico: R-0 Scope-creep en diskwalificatie.
- Bewijs: Overzicht “documentenregister” met versiedata en bevestigde scope.
- PDCA: P: verifiëren scope; D: aligneren PvA en KPI’s; C: interne review; A: wijzigingslog bij updates.

2) W-02 Contractvorm raamovereenkomst, looptijd en afname
- Vraag (SMART): Bevestig binnen 5 werkdagen: (a) looptijd (bijv. 2+2 jaar), (b) maximale contractwaarde/plafond, (c) afnameverplichting of inspanningsverplichting, (d) lotindeling of enkelvoudig perceel, (e) minicompetities ja/nee en beoordelingswijze.
- Prioriteit: Hoog
- Impact: Prijsstrategie, resource-allocatie, continuïteit en compliance.
- Afhankelijkheden: EMVI-prijsweging en indexatie (W-08).
- KPI-koppeling: KPI-F Financiële voorspelbaarheid (≤5% budgetafwijking).
- Risico: R-F Onrendabele inzet of overschrijding plafond.
- Bewijs: Contractmatrix met vastgelegde termijnen en plafonds.
- PDCA: P: scenario’s doorrekenen; D: resource baseline; C: budgettracking; A: bijsturen bezetting.

3) W-03 SLA-definities en meetmethodiek (responstijd/oplostijd/beschikbaarheid)
- Vraag (SMART): Bevestig binnen 5 werkdagen de exacte definities en meetpunten: (a) starttimer responstijd (melding of triage?), (b) oplostijd-criterium (workaround toegestaan?), (c) beschikbaarheidsvenster (24x7 of kantoortijden), (d) meetmethode (tooling, kloktijden, maintenance-exclusies), (e) boete-/bonusregeling per KPI.
- Prioriteit: Hoog
- Impact: SLA-naleving, boeterisico en operationele bezetting.
- Afhankelijkheden: Monitoringtooling (W-05), onderhoudsvensters (W-06).
- KPI-koppeling: KPI-A Beschikbaarheid ≥99,8%; KPI-R Response ≤1u; KPI-O Oplostijd ≤4u.
- Risico: R-SLA Onterechte SLA-breaches door onduidelijke startsignalen.
- Bewijs: SLA-matrix met drempels, uitzonderingen en rapportagesjabloon.
- PDCA: P: service design; D: runbooks en roosters; C: maandelijkse SLA-rapportage; A: root cause en verbeteracties.

4) W-04 Azure NL-vereiste, dataresidentie en toegestane services
- Vraag (SMART): Bevestig binnen 5 werkdagen: (a) verplichte landingzone in Azure Netherlands Region(s), (b) toegestane PaaS/SaaS-diensten met mogelijk EU/US dataflows (bijv. Copilot, Defender), (c) vereiste soevereiniteit/maatregelen (bijv. EU Data Boundary), (d) netwerkconnectiviteit (ExpressRoute/VPN) en on-prem peering.
- Prioriteit: Hoog
- Impact: Architectuurkeuzes, compliance (AVG), kosten en performance.
- Afhankelijkheden: Security en DPIA (W-07).
- KPI-koppeling: KPI-C Compliance (0 datalocatie-afwijkingen).
- Risico: R-DP Data-export buiten EU.
- Bewijs: Architectuurdiagrammen + datastromenregister.
- PDCA: P: ontwerp en DPIA; D: implementatie landingzone; C: datalocatie-audit; A: service toggles/geo-restricties.

5) W-05 24/7 monitoring en support – bereikbaarheid, talen, escalatie
- Vraag (SMART): Bevestig binnen 5 werkdagen: (a) talen (NL/EN) verplicht, (b) kanaalvereisten (telefoon, portaal, e-mail), (c) prioriteringsschema P1–P4 met voorbeeldcases, (d) verplichte on-site responstijd ja/nee en waar, (e) geëiste SIEM/NOC-tooling en integraties.
- Prioriteit: Hoog
- Impact: Staffing, toolinglicenties en SLA-performance.
- Afhankelijkheden: SLA-definities (W-03).
- KPI-koppeling: KPI-CSAT ≥8,0; KPI-MTTD ≤15 min; KPI-MTTR conform P1–P4.
- Risico: R-OPS Onderbezetting nachtdienst.
- Bewijs: Roosterplan, escalation map en toolinglijst met integraties.
- PDCA: P: capaciteitsplan; D: on-call rotas; C: OLA/SLA reviews; A: bijschalen/automatiseren.

6) W-06 Onderhoudsvensters en change management
- Vraag (SMART): Bevestig binnen 5 werkdagen: (a) onderhoudsvensters (frequentie, tijden, aankondigingstermijn), (b) exemptions van beschikbaarheids-KPI tijdens approved windows, (c) CAB/ECAB-proces en autorisaties, (d) minimaal 2 onderhoudsmomenten per jaar – gewenste spreiding/kalender.
- Prioriteit: Middel-hoog
- Impact: Beschikbaarheid en change doorlooptijden.
- Afhankelijkheden: SLA-meting (W-03).
- KPI-koppeling: KPI-CHG Succesratio changes ≥98%; KPI-AVA ≥99,8%.
- Risico: R-CHG Productiestoring door onvoldoende venster.
- Bewijs: Change policy + jaaronderhoudskalender.
- PDCA: P: releasekalender; D: uitvoeren met back-out; C: PIR’s; A: optimalisatie release-cadans.

7) W-07 Beveiligingsincidenten, rapportage en AVG-compliance
- Vraag (SMART): Bevestig binnen 5 werkdagen: (a) rapportagefrequentie security-incidenten (maandelijks/kwartaal) en inhoud (KRI’s, MITRE-tactieken), (b) 72-uurs meldverplichting datalekken en rollen (FG/CISO), (c) verplichte audits/pen-tests en frequentie, (d) eisen t.a.v. VOG voor onsite/remote medewerkers (reikwijdte en actualiteit).
- Prioriteit: Hoog
- Impact: Juridische compliance, reputatie en auditlast.
- Afhankelijkheden: Azure services (W-04), supportprocessen (W-05).
- KPI-koppeling: KPI-SI Tijdige melding 100%; KPI-V VOG-dekking 100%.
- Risico: R-AVG Boetes AVG/Autoriteit Persoonsgegevens.
- Bewijs: ISO 27001-certificaat, ISMS-scope, incident runbooks, VOG-registerproces.
- PDCA: P: ISMS-controls; D: SOC-monitoring; C: audit/ISMS review; A: control updates.

8) W-08 Prijsvorming, indexatie en EMVI-waardering prijs
- Vraag (SMART): Bevestig binnen 5 werkdagen: (a) prijsvorm (uurtarieven, unit rates, service bundles), (b) indexatieformule en peildata (bijv. CBS DPI), (c) plafondprijzen en meerwerkregeling, (d) waarderingsmethodiek prijs (lineair/relatief), (e) eventuele lumpsum voor transitie-in/out.
- Prioriteit: Hoog
- Impact: EMVI-strategie en contractrendement.
- Afhankelijkheden: Contractplafond (W-02).
- KPI-koppeling: KPI-TCO ≤ afgesproken plafond; KPI-PO Afwijking ≤5%.
- Risico: R-PRC Onbalans prijs-kwaliteit.
- Bewijs: Prijsbijlage met tarievenmatrix en indexatieclausule.
- PDCA: P: kostencalculatie; D: budgetbewaking; C: variance analysis; A: optimalisatie service mix.

9) W-09 EMVI-kwaliteitscriteria en maximale omvang inzending
- Vraag (SMART): Bevestig binnen 5 werkdagen: (a) subcriteria en onderliggende weging binnen Kwaliteit, Duurzaamheid, Risicobeheersing, (b) “what good looks like” per criterium, (c) maximale pagina’s (gegeven 6 p. EMVI) per deel of totaal, (d) toegestane bijlagen (diagrammen, KPI-tabellen), (e) referentie-eisen.
- Prioriteit: Middel-hoog
- Impact: Focus in PvA en bewijslast.
- Afhankelijkheden: Alle inhoudelijke werkpakketten.
- KPI-koppeling: KPI-EMVI Score ≥ top-3; KPI-ALN 100% naleving indieningseisen.
- Risico: R-EMVI Puntenverlies door vormfouten.
- Bewijs: Inhoudsopgave en conformiteitstabel vóór indiening.
- PDCA: P: outline; D: schrijven; C: red team review; A: finaliseren.

10) W-10 Planning: indieningsdeadline, vragenronde, startdatum en transitie
- Vraag (SMART): Bevestig binnen 5 werkdagen: (a) uiterste indieningsdatum/tijd en NvI-rondes, (b) beoogde startdatum en transitie-in/out periode (duur, condities, exit-artefacten), (c) acceptatiecriteria go-live, (d) sleutelcontacten opdrachtgever voor acceptaties.
- Prioriteit: Hoog
- Impact: Resourceplanning, risicobeheersing en continuïteit.
- Afhankelijkheden: Alle operationele werkpakketten.
- KPI-koppeling: KPI-TRN Tijdige transitie 100%; KPI-ACPT Eerste keer goed ≥95%.
- Risico: R-TRN Verlengde parallel-run en dubbele kosten.
- Bewijs: Transitieplan met mijlpalen en RACI.
- PDCA: P: detailplanning (Gantt); D: wekelijkse stand-ups; C: mijlpaalreviews; A: lessons learned en overdracht BAU.

Benodigde input:
- Antwoord op W-01: bevestiging juiste scope, opdrachtgever, referentienummer en volledige set actuele aanbestedingsdocumenten.
- Antwoord op W-02: contractduur, plafondwaarde, afnameverplichting, perceelindeling en minicompetities.
- Antwoord op W-03: formele definities/meetmethode van responstijd, oplostijd, beschikbaarheid en bijbehorende boete-/bonusregeling.
- Antwoord op W-04: Azure NL-vereisten, toegestane services t.b.v. dataresidentie/soevereiniteit en netwerkconnectiviteit.
- Antwoord op W-05: 24/7 supportkaders (talen, kanalen, prioriteiten), on-site vereisten en verplichte monitoring/SIEM-tooling.
- Antwoord op W-06: onderhoudsvensters, uitzonderingen op KPI’s, CAB/ECAB-proces en jaaronderhoudskalender.
- Antwoord op W-07: security-rapportagefrequentie en inhoud, AVG-meldproces (72 uur), audit-/pen-testvereisten en VOG-reikwijdte.
- Antwoord op W-08: prijsvorm, indexatie, plafond/meerwerk, waardering prijs en lumpsum voor transitie.
- Antwoord op W-09: EMVI-subcriteria/weging, “what good looks like”, pagina- en bijlagenrestricties, referentie-eisen.
- Antwoord op W-10: indieningsdeadline, NvI-kalender, start- en transitiedata, acceptatiecriteria en contactrollen.

Benodigde input: