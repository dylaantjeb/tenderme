NvI – Gerichte clarificatievragen (prioriteit, impact, afhankelijkheden) met W–KPI–Risico–Bewijs kruisverbanden

W-01 Scope- en opdrachtgever-inconsistentie (titel vs. inhoud)
- Vraag (SMART, PDCA): Bevestig uiterlijk vóór publicatie NvI-2 of de opdracht ICT-beheer betreft (zoals scope, KO’s en SLA’s aangeven) óf catering/horeca (zoals de titel suggereert), en bevestig de juiste aanbestedende dienst (Gemeente Middenstad vs. NVAO). Plan: eenduidige scope; Do: corrigendum; Check: gewijzigde stukken; Act: Q&A bijsturen.
- Prioriteit: Hoog
- Impact: Onjuiste offerte-inhoud, risico op ongeldig bod.
- Afhankelijkheden: Beschrijvend document, concept-overeenkomst.
- KPI-koppeling: Niet van toepassing direct; randvoorwaarde voor alle KPI’s.
- Risico (R-01): Scope mismatch → niet-conform inschrijving.
- Bewijs: Gecorrigeerde titel, referentie- en scopeparagraaf, vastgestelde aanbestedende dienst.

W-02 Omvang en perimeter (locaties, gebruikers, assets, M365)
- Vraag (SMART, PDCA): Lever een asset- en service-inventaris (aantal locaties, gebruikers, endpoints, servers, netwerkdevices, kritieke systemen; M365-tenant(s) en modules zoals Exchange, Teams, SharePoint, Intune/Entra) vóór NvI-2. Plan: dimensionering; Do: staffing/monitoring inrichten; Check: onboarding-acceptatie; Act: bijsturen CMDB.
- Prioriteit: Hoog
- Impact: Dimensionering van 24/7 support, licenties, tooling en KPI-haalbaarheid.
- Afhankelijkheden: Huidige CMDB, netwerkdiagrammen, licentieoverzicht.
- KPI-koppeling: Beschikbaarheid 99,8%; Responstijd P1; Oplostijd P1.
- Risico (R-02): Onderdimensionering → SLA-overschrijding.
- Bewijs: Export CMDB, netwerkschema’s, M365 licentie- en modulelijst, kritieke-systeemlijst.

W-03 Definiëring P1/P2, meldkanalen en meetmoment responstijd
- Vraag (SMART, PDCA): Bevestig de P-classificaties, meldkanalen (telefoon, portal, e-mail), meetpunt responstijd <30 min (melding geregistreerd vs. detectie), servicevenster (24/7), taal en timezone vóór gunning. Plan: SLA-definitie; Do: serviceproces; Check: maandrapport; Act: tuning drempels.
- Prioriteit: Hoog
- Impact: Directe SLA-naleving en bemensing.
- Afhankelijkheden: ITIL-processen, meldprocedures.
- KPI-koppeling: Responstijd P1 <30 min; Oplostijd P1 <4 uur.
- Risico (R-03): Ambiguïteit → dispuut over SLA.
- Bewijs: SLA-definitiedocument, meld- en escalatieprocedure, rapportagesjabloon.

W-04 Beschikbaarheid 99,8% – definitie, scope en uitzonderingen
- Vraag (SMART, PDCA): Leg vast (per kritieke dienst) de servicevensters, wat de noemer is (minuten per maand), uitsluitingen (geplande maintenance, overmacht, klantchanges), single-point-of-failure, en samengestelde meting (per dienst of gewogen) vóór gunning. Plan: SLO’s; Do: redundantie/maintenance; Check: uptime-rapport; Act: verbeterplan.
- Prioriteit: Hoog
- Impact: Architectuurkeuzes, onderhoudsvensters, rapportage.
- Afhankelijkheden: Lijst kritieke systemen, onderhoudskalender.
- KPI-koppeling: Beschikbaarheid 99,8% per maand.
- Risico (R-04): Onterechte downtime-registratie → malus/claim.
- Bewijs: SLO-matrix, maintenance policy, uptime-dashboarddefinitie.

W-05 Dataverwerking uitsluitend EU, verwerkers en VOG-eisen
- Vraag (SMART, PDCA): Bevestig of US/Global services (bijv. M365 telemetry/logging, support) zijn toegestaan; leg subverwerkerlijst en DPA/AVG-kaders (DPIA, verwerkingslocaties) vast, inclusief VOG-verplichting per rol en doorlooptijden. Plan: compliance; Do: contractering; Check: audit; Act: substitutie waar nodig.
- Prioriteit: Hoog
- Impact: Toolingkeuze, supportmodellen, tijdlijnen onboarding personeel.
- Afhankelijkheden: Juridische voorwaarden, DPA, security policy.
- KPI-koppeling: Security compliance (indirect aan beschikbaarheid).
- Risico (R-05): AVG-non-compliance → sancties, datarisico.
- Bewijs: DPA, subverwerkersregister, DPIA, VOG-proces en voorbeeldverklaringen.

W-06 Monitoring & patchmanagement – scope, vensters en deadlines
- Vraag (SMART, PDCA): Bevestig scope (OS, netwerk, hypervisors, endpoints, 3rd-party apps), kritieke patchdeadlines (bijv. P1 ≤ 7 dagen, P2 ≤ 30 dagen), reboot/maintenancevensters en change-governance. Plan: patchpolicy; Do: uitrol; Check: compliance-rapport; Act: non-compliance handling.
- Prioriteit: Hoog
- Impact: Vensterplanning, toolselectie, resourceplanning.
- Afhankelijkheden: Lijst systemen/applicaties, maintenancepolicy.
- KPI-koppeling: Beschikbaarheid; Patching compliance (toevoegen).
- Risico (R-06): Ongepatcht → security-incident/uitval.
- Bewijs: Patchpolicy, CAB-proces, maandelijkse compliance-rapporten.

W-07 Continuïteit (BCP/DR): RTO/RPO, testfrequentie en verantwoordelijkheden
- Vraag (SMART, PDCA): Stel per kritieke dienst RTO/RPO vast, eigenaarschap (wie levert DR-site/data), testfrequentie (min. 1x/jaar) en acceptatiecriteria vóór gunning. Plan: BCP/DR; Do: failover-oefeningen; Check: testverslag; Act: remediatieplan.
- Prioriteit: Hoog
- Impact: Architectuur, kosten, testplanning.
- Afhankelijkheden: Dataclassificatie, huidige back-up/DR-middelen.
- KPI-koppeling: Beschikbaarheid; Hersteltijd in lijn met RTO.
- Risico (R-07): Onvoldoende herstel → langdurige downtime.
- Bewijs: BCP/DR-plan, testrapporten, herstelrunbooks.

W-08 Escalatie & governance: rolverdeling, CAB en evaluaties
- Vraag (SMART, PDCA): Bevestig SPOC’s, escalatieladders, CAB-samenstelling, frequentie van operationele/strategische overleggen (bijv. maandelijks/kwartaal) en doorlooptijden voor change-approval. Plan: governance; Do: overlegcyclus; Check: KPI-review; Act: verbeteractiesregister.
- Prioriteit: Middel
- Impact: Besluitvormingstempo, doorlooptijd changes.
- Afhankelijkheden: Organogram, changebeleid.
- KPI-koppeling: Oplostijd P1; doorlooptijd changes (toevoegen).
- Risico (R-08): Besluitvertraging → SLA-risico.
- Bewijs: RACI, vergaderkalender en notulenformat, escalatieschema.

W-09 Contractuele kaders raamovereenkomst: looptijd, modaliteiten en volume
- Vraag (SMART, PDCA): Bevestig looptijd (bijv. 2+2 jaar), single- of multi-vendor, min/max afname of volume-indicatie (aantal seats/locaties), afroepmechanisme en exit/transition-in/out verplichtingen met termijnen. Plan: resourcing; Do: transitieplan; Check: exit-criteria; Act: overdrachtsdraaiboek.
- Prioriteit: Hoog
- Impact: Prijsstelling, capaciteit, risicoreservering.
- Afhankelijkheden: Concept-raamovereenkomst, DVO’s.
- KPI-koppeling: Transitie-KPI’s (toevoegen); continuïteit.
- Risico (R-09): Onvoldoende volumezekerheid → prijs-/capaciteitsrisico.
- Bewijs: Concept-contract, exitplan, transitie-Gantt.

W-10 EMVI-uitwerking: subcriteria, scorematrix en duurzaamheidseisen
- Vraag (SMART, PDCA): Publiceer scorematrix met subcriteria en wegingsfactoren per thema (Kwaliteit 40, Duurzaamheid 20, Risicobeheersing 20, Prijs 20), max. pagina’s (bijv. 6 EMVI), prijsmodel (indexatie, malus/bonus op SLA), en concrete duurzaamheidsdoelen (bijv. CO2-reductie, energieverbruik datacenter, circulariteit hardware) vóór NvI-2. Plan: aanbodstrategie; Do: invulling; Check: self-assessment; Act: optimalisatie.
- Prioriteit: Middel
- Impact: Inhoud en focus van inschrijving, investeringen in duurzaamheid.
- Afhankelijkheden: Gunningleidraad, prijsformulieren.
- KPI-koppeling: SLA-KPI’s + duurzaamheids-KPI’s (toevoegen).
- Risico (R-10): Mismatch met beoordelingsverwachting → lagere score.
- Bewijs: Scorematrix, EMVI-richtsnoeren, prijs- en malus/bonusbijlage.

Benodigde input:
- W-01: Bevestiging definitieve scope (ICT-beheer) en correcte aanbestedende dienst.
- W-02: Asset- en service-inventaris (locaties, gebruikers, endpoints/servers/netwerk, kritieke systemen, M365-modules).
- W-03: P-classificatie, meldkanalen, servicevensters en meetdefinitie responstijd.
- W-04: SLO-definitie voor 99,8% beschikbaarheid incl. uitsluitingen en meetmethode.
- W-05: EU-dataverwerkingkaders, subverwerkerslijst, DPA/DPIA en VOG-eisen per rol.
- W-06: Scope patching/monitoring, patchdeadlines, maintenancevensters en CAB-regels.
- W-07: RTO/RPO per kritieke dienst, testfrequentie en verantwoordelijkheden DR.
- W-08: Governance- en escalatiestructuur, CAB-samenstelling en overlegfrequentie.
- W-09: Raamovereenkomstduur, single/multi-vendor, volume-indicatie, afroep en exit/transition.
- W-10: EMVI-scorematrix met subcriteria, pagina- en prijsmodelkaders en duurzaamheidseisen.

Benodigde input: