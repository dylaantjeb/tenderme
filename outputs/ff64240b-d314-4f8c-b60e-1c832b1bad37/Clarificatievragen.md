Clarificatievragen – NvI (Project 1380 – Raamovereenkomst Catering- en Horecadiensten vs. ICT-beheer)

1) Scope en opdrachtgeverschap (mismatch titel vs. scope)
- Vraag (SMART): Kunt u in de Nota van Inlichtingen expliciet bevestigen dat de scope ICT-beheer-, onderhoud- en beveiligingsdiensten betreft voor gemeentelijke/overheidsomgevingen (en niet catering/horeca), en dat NVAO de formele aanbestedende dienst en verwerkingsverantwoordelijke is?
- Prioriteit: Hoog
- Impact: Scopecorrectheid bepaalt geschiktheid inschrijving en EMVI-inhoud; voorkomt ongeldige bieding.
- Afhankelijkheden: Formele NvI; aanbestedingsleidraad/corrigendum.
- PDCA: Plan: scope en rollen vastleggen; Do: plan en EMVI op ICT-diensten; Check: conformiteit met leidraad; Act: corrigendum verwerken.
- Kruisverwijzing: W-01 | KPI: “Compliance op scope” (=0 afwijkingen) | Risico: Ongeldige inschrijving/uitsluiting | Bewijs: NvI-bevestiging en/of corrigendum.

2) Omvang en complexiteit omgeving (capaciteit en prijs)
- Vraag (SMART): Graag een objectieve volumebasis: aantal locaties, gebruikers, endpoints (werkstations/mobiel), servers (on-prem/cloud), netwerkcomponenten, M365 tenants, kritieke applicaties en 12 maanden historie (maandelijkse P1/P2/P3-incidenten, changes, releases) als CSV of tabel.
- Prioriteit: Hoog
- Impact: Dimensionering 24/7 support, staffing, monitoring en prijsbepaling; direct effect op SLA‑haalbaarheid 99,8% en P1-respons <30 min.
- Afhankelijkheden: CMDB/assetlijsten; privacy/NDA voor geanonimiseerde data.
- PDCA: Plan: capaciteit op volumes; Do: staffing/roosters; Check: maandelijkse workload vs. forecast; Act: schalen op drempelwaarden.
- Kruisverwijzing: W-02 | KPI: Responstijd P1, Oplostijd P1, First Contact Resolution, Change Succesrate | Risico: Understaffing → SLA-breuk | Bewijs: CMDB‑export, incidentrapportages.

3) 24/7 dekking en onsite verwachtingen
- Vraag (SMART): Bevestigt u 24/7 dekking enkel voor P1-incidenten? Graag specificeren: supportvensters per prioriteit, vereiste onsite-responstijden, maximale hersteltermijnen per prioriteit en escalatieroutes (incl. bestuurlijke escalatie).
- Prioriteit: Hoog
- Impact: Roosterinrichting, bereikbaarheidsdienst, standby-budget en contractuele aansprakelijkheid.
- Afhankelijkheden: SLA-bijlage; security- en toegangsprocedures voor buiten kantoortijden.
- PDCA: Plan: escalatie- & roosterplan; Do: 24/7-piket; Check: maandelijkse SLA-review; Act: bijsturen op overschrijding.
- Kruisverwijzing: W-03 | KPI: Responstijd/Oplostijd per prioriteit | Risico: Boetes/creditclaims bij overschrijding | Bewijs: SLA-matrix, escalatieschema.

4) SLA-definitie beschikbaarheid 99,8%
- Vraag (SMART): Definieer “kritieke systemen” en de meetmethode voor 99,8% per maand: meetpunt (end‑to‑end vs. component), meetinterval, kloktijdzone, geplande onderhoudsvensters (exclusies en aankondigingstermijn), force majeure en service credits/boetes.
- Prioriteit: Hoog
- Impact: Monitoringarchitectuur, planning onderhoud, contractueel risico en toolingkeuze.
- Afhankelijkheden: Lijst kritieke diensten; juridische SLA-bijlage.
- PDCA: Plan: meetdefinities en onderhoudskalender; Do: monitoring implementatie; Check: maandrapportage inclusief downtime-categorisatie; Act: root cause en preventie.
- Kruisverwijzing: W-04 | KPI: Beschikbaarheid 99,8% | Risico: Onterechte downtime‑tellingen | Bewijs: SLA-definitiedocument, maandrapport.

5) Dataminimalisatie, EU‑datagrens en subverwerkers
- Vraag (SMART): Bevestigt u dat de EU‑data-eis de Microsoft EU Data Boundary accepteert en geef aan: toegestane hyperscalers (Azure, AWS eu‑regions), lijst/acceptatieproces subverwerkers, data‑classificatiebeleid en uitzonderingen (bijv. telemetry).
- Prioriteit: Hoog
- Impact: Cloud‑architectuur, toolselectie, contract met subverwerkers en compliance.
- Afhankelijkheden: Verwerkersovereenkomst, DPIA, security policies opdrachtgever.
- PDCA: Plan: datalokalisatie en subprocessor‑register; Do: technische afdwinging (region pins); Check: kwartaalreview subverwerkers; Act: mutatieprocedure.
- Kruisverwijzing: W-05 | KPI: 100% data in EU-regio’s; 0 ongeautoriseerde datastromen | Risico: AVG‑overtreding | Bewijs: DPA, subprocessor‑lijst, architectuurdiagrammen.

6) Security- en compliance-eisen (ISO, VOG, logging)
- Vraag (SMART): Graag specificeren: scope VOG (welke functies, geldigheidstermijn), gewenste bewijsstukken ISO 27001/9001 (certificaat + SoA), logging/SIEM-retentie en toegang (90/180/365 dagen?), vulnerability SLA’s (bijv. kritisch <7 dagen), en pentestfrequentie/rapportagevorm.
- Prioriteit: Hoog
- Impact: Screening, auditlast, tooling en patch‑/hardeningbeleid.
- Afhankelijkheden: Securitybeleid gemeente/NVAO; auditkalender.
- PDCA: Plan: ISMS-controleset; Do: logging/patchproces; Check: audits en KPI’s; Act: CAPA op bevindingen.
- Kruisverwijzing: W-06 | KPI: Patch compliance >95% binnen 14 dagen kritisch; Auditbevindingen = 0 major | Risico: Beveiligingsincident/afkeur audit | Bewijs: ISO-certificaten, SoA, VOG-verklaringen, SIEM-rapporten.

7) Continuïteit en uitwijk (BCP/DR/Exit)
- Vraag (SMART): Wilt u RTO/RPO‑doelen per dienst vastleggen, failover‑testfrequentie (bijv. 2x/jaar), vereiste uitwijklocatie (EU/NL) en exit‑vereisten (data‑exportformaten, kennisoverdracht, licentie‑escrow)?
- Prioriteit: Middel-hoog
- Impact: Ontwerp DR‑architectuur, testlast, contractuele verplichtingen, kosten.
- Afhankelijkheden: Huidige oplossing en kritieke ketens; licentievoorwaarden.
- PDCA: Plan: BCP/DR‑strategie; Do: implementatie en oefeningen; Check: testverslagen; Act: verbeteracties en her-test.
- Kruisverwijzing: W-07 | KPI: Succesvolle DR‑test 100%; RTO/RPO gehaald | Risico: Langdurige uitval | Bewijs: BCP/DR‑plan, testlogs, testrapporten.

8) EMVI‑uitwerking en prijsformule
- Vraag (SMART): Graag detail van gunningssystematiek: subcriteria en beoordelingsaspecten binnen Kwaliteit/Duurzaamheid/Risicobeheersing (met wegingen), minimaal te behalen scores, prijsformule (lineair/relatief/omgekeerd), plafondbudget en eventuele interviews/POC’s die meetellen.
- Prioriteit: Middel-hoog
- Impact: Inschrijvingsstrategie, focus in Plan van Aanpak, prijspuntenoptimalisatie.
- Afhankelijkheden: Gunningsleidraad; beoordelingsmatrix.
- PDCA: Plan: EMVI‑strategie; Do: gericht schrijven op subcriteria; Check: interne reviews; Act: bijsturen waar onderwogen.
- Kruisverwijzing: W-08 | KPI: EMVI‑score ≥90% van maximum | Risico: Suboptimale puntenscore | Bewijs: Leidraad/matrix, NvI‑verduidelijking.

9) Transitie en ingangsdatum
- Vraag (SMART): Wat is de beoogde startdatum, transitieperiode (in weken), beschikbaarheid van documentatie (HLD/LLD, netwerktekeningen), toegang tot CMDB en betrokkenheid huidige leverancier (overlap/kennisoverdracht)? Graag ook Go‑Live acceptatiecriteria en rollback‑voorwaarden.
- Prioriteit: Middel
- Impact: Planning, resource‑allocatie, risico op verstoringen bij overgang.
- Afhankelijkheden: Beschikbaarheid incumbent en technische documentatie.
- PDCA: Plan: transitie‑plan en risico‑dossier; Do: gefaseerde migratie; Check: Go‑Live tests; Act: lessons learned en stabilisatie.
- Kruisverwijzing: W-09 | KPI: Transitie op tijd en zonder P1’s | Risico: Vertraagde of risicovolle uitrol | Bewijs: Go‑Live checklist, acceptatieverslagen.

10) Tooling, monitoring en patchmanagement
- Vraag (SMART): Bevestig toegestane monitoring- en EDR‑agents, change windows per locatie, onderhoudsvensters (dag/tijd), CAB‑proces (wekelijkse frequentie?), remote access‑methode (bastion/PAM) en gewenste patchrings (pilot/breedte) inclusief rapportage-indeling.
- Prioriteit: Middel
- Impact: Toolkeuze, agent‑footprint, change‑kalender en rapportages.
- Afhankelijkheden: Security/IT‑beleid, netwerktoegang, firewallregels.
- PDCA: Plan: toolset en change‑kalender; Do: implementatie agents/patchrings; Check: patchcompliance‑rapport; Act: versnellen bij achterstand.
- Kruisverwijzing: W-10 | KPI: Patchcompliance en Change Succesrate >98% | Risico: Storing na patch of non‑compliance | Bewijs: Tooling‑whitelist, CAB‑notulen, compliance‑rapporten.

Benodigde input:
- Formele bevestiging scope (ICT i.p.v. catering) en aanbestedende dienst/verwerkingsverantwoordelijke.
- Volumetrics/CMDB: locaties, users, endpoints, servers (on‑prem/cloud), netwerkcomponenten, kritieke applicaties, 12 maanden incident/change‑historie.
- SLA‑details: prioritering, onsite‑eisen, definities en meetwijze 99,8%, onderhoudsvensters, service credits.
- Data/EU: acceptatie Microsoft EU Data Boundary, toegestane hyperscalers en subverwerkers, DPA/DPIA en data‑classificatiebeleid.
- Security/compliance: VOG‑scope/termijn, ISO 27001/9001 certificaten + SoA, logging/SIEM‑retentie, vulnerability SLA’s, pentestbeleid.
- Continuïteit: RTO/RPO per dienst, DR‑locatie-eisen, testfrequentie, exit‑ & escrow‑voorwaarden.
- EMVI: subcriteria met wegingen, prijsformule, plafondbudget, interviews/POC‑opzet.
- Transitie: startdatum, transitieperiode, toegang tot documentatie/CMDB, rol incumbent, Go‑Live/rollback‑criteria.
- Tooling/change: toegestane agents, change windows per locatie, CAB‑cadans, remote access‑methode, patchrings en rapportage-indeling.

Benodigde input: