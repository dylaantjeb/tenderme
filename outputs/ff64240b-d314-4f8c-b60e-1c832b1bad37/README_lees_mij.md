README

Doel
- Deze README geeft snel overzicht en context van de inzending voor: Raamovereenkomst Catering- en Horecadiensten voor Gemeente Middenstad (Project 1380), aanbestedende dienst: NVAO, land: NL.
- Gericht op snelle verificatie van KO-eisen, navigatie door de documenten en PDCA-sturing op KPI’s, risico’s en bewijs.

Inhoud van de bundel
- README (dit document)
- Plan van Aanpak (PvA): aanpak, W-werkpakketten, planning, governance, escalatie, EU-dataverwerking, ITIL-processen, continuïteit (BCP), 24/7 bereikbaarheidsdienst, M365-ondersteuning, monitoring/patching, duurzaamheid, bijlagen: Assumpties & Uitsluitingen, Bewijsregister.
- Risicodossier: risico’s, oorzaken, impact, beheersmaatregelen, triggers, restkans/restimpact, eigenaar, PDCA-verbeteracties.
- KPI-overzicht: definities, targets, meetmethode, rapportagefrequentie, SLA’s (Beschikbaarheid 99,8% p/maand; Responstijd P1 < 30 min; Oplostijd P1 < 4 uur), drempel- en escalatieregels.

Structuur en PDCA
- Plan: PvA met scope, eisenmatrix, W-werkpakketten, planning, rolverdeling, BCP en securitykaders (ISO 27001/9001).
- Do: uitvoering via W-werkpakketten (W-01 t/m W-06) met runbooks en change-/incidentflows (ITIL).
- Check: KPI-overzicht en maandelijkse SLA-rapportage; trendanalyse, oorzakenanalyse, audit-trails.
- Act: verbeteracties in Risicodossier en PvA-verbeterplan; herijking KPI-drempels en maatregelen.

Hoe te lezen/gebruiken
- Stap 1: Controleer KO-eisen in PvA §Eisenmatrix en Bewijsregister.
- Stap 2: Beoordeel EMVI-bijdrage per criterium: PvA (Kwaliteit, Duurzaamheid, Risicobeheersing) en KPI-overzicht (Kwaliteit/SLA), Prijs in prijslijst (pricing locked).
- Stap 3: Volg W-werkpakketten voor scope-dekking en planning.
- Stap 4: Bekijk KPI-overzicht voor targets, meetmethode en rapportage.
- Stap 5: Raadpleeg Risicodossier voor restexposure en Act-acties.
- Stap 6: Gebruik escalatiematrix (PvA §Governance) voor incidenten/changes.

Eisen en KO-check (SMART)
- KO: ISO 27001 gecertificeerd → Bewijs: actuele ISO 27001-certificaatkopie (Bewijsregister).
- KO: ISO 9001 gecertificeerd → Bewijs: actuele ISO 9001-certificaatkopie (Bewijsregister).
- KO: 24/7 bereikbaarheidsdienst → PvA §Supportmodel; KPI: P1 responstijd < 30 min; Bewijs: roosters, oproepprocedures.
- Musts worden per W-werkpakket geborgd (zie onder).

W-werkpakketten ↔ KPI ↔ Risico ↔ Bewijs
- W-01 Servicedesk & ITIL-processen
  - KPI: First Response P1 < 30 min; First Time Fix > X% (vastgelegd in KPI-overzicht).
  - Risico: vertraagde triage → escalatieregels en capaciteitsbuffer.
  - Bewijs: ITSM-rapporten, procesbeschrijvingen.
- W-02 24/7 P1 Incidentrespons
  - KPI: P1 oplostijd < 4 uur.
  - Risico: onderbezetting buiten kantooruren → bereikbaarheidsrooster, runbooks.
  - Bewijs: dienstroosters, P1-postmortems.
- W-03 Monitoring & Patchmanagement
  - KPI: Patch compliance > 95% binnen 14 dagen kritieke patches; Monitoring coverage 100% kritieke assets.
  - Risico: kwetsbaarheden → geautomatiseerde patching, CAB-goedkeuring.
  - Bewijs: monitoring dashboards, patch-rapporten.
- W-04 Beschikbaarheid & Continuïteit (BCP)
  - KPI: Beschikbaarheid kritieke systemen 99,8%/maand.
  - Risico: single points of failure → redundantie, failover-tests.
  - Bewijs: BCP, testverslagen, uptime-logs.
- W-05 Security & EU-dataverwerking
  - KPI: 100% dataresidentie binnen EU; 0 kritieke onopgeloste auditbevindingen > 30 dagen.
  - Risico: non-compliance → DPA, toegangsbeleid, logging.
  - Bewijs: verwerkersovereenkomst, auditrapporten.
- W-06 M365 Ondersteuning
  - KPI: Change lead time < X werkdagen; incident backlog = 0 > 30 dagen.
  - Risico: configuratiefouten → change templates, staged roll-outs.
  - Bewijs: change-logs, configuratiobaselines.

EMVI-koppeling
- Kwaliteit (40%): PvA, KPI-overzicht, SLA-borging, ISO-processen.
- Duurzaamheid (20%): PvA §Duurzaamheid (digitaal-first, minimale reisbewegingen, groene stroom datacenters, e-waste).
- Risicobeheersing (20%): Risicodossier + PDCA-verbeterplan.
- Prijs (20%): prijslijst (pricing locked), aannames/uitsluitingen in PvA-bijlage.

Assumpties, uitsluitingen, condities
- Assumpties: tijdige toegang/informatie, kantoortoegankelijkheid, tijdige besluitvorming, minimale netwerkeisen, legitieme licenties (PvA bijlage).
- Uitsluitingen: onsite hardwarebeheer (tenzij overeengekomen), third-party SaaS-support, projectmatig meerwerk, adoptietrainingen op verzoek.
- Garantie: 12 maanden op opgeleverde projectdeliverables; beheer conform SLA.

Contact
- Uno Automatiseringdiensten B.V., Einsteinlaan 14, 2719 ER Zoetermeer, KVK 27172538, BTW NL8070.79.266.B01.
- Contact: Eric van de Vreugdenhil, +31 703300502.

Benodigde input:
- Definitieve indieningstermijn en wijze van inzenden.
- Startdatum, looptijd en uitvoeringsvenster van de raamovereenkomst.
- Bevestiging opdrachtgever/locaties (NVAO vs. Gemeente Middenstad) en primaire contactpersonen.
- Gewenst KPI-rapportageformat en frequentie (standaard: maandelijks).
- Escalatiecontacten aan opdrachtgeverzijde (operationeel, tactisch, strategisch).
- Bevestiging VOG-eisen en doelgroep.
- Eventuele aanvullende security- en privacyvoorwaarden (DPA/BI, classificaties).
- Correct e-mailadres contactpersoon opdrachtgever en leverancier (verificatie).

Benodigde input: