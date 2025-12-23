NvI – Clarificatievragen (GV-IT-2026-001)

1) Bevestiging scope en opdrachtgever
- Vraag (SMART): Bevestig uiterlijk 2026-01-06 of de opdracht daadwerkelijk een ICT-raamovereenkomst voor beheer/monitoring/security betreft (i.p.v. “Catering- en Horecadiensten”) en of de opdrachtgever “Gemeente Voorbeeldstad” is (titel noemt “Gemeente Middenstad”). Bevestig tevens of er percelen zijn.
- Prioriteit: Hoog
- Impact: Onduidelijke scope leidt tot niet-passende EMVI-inzet, risico op uitsluiting of irrelevante bewijsvoering.
- Afhankelijkheden: Geldige aanbestedingsdocumenten en NvI.
- W-KPI-Risico-Bewijs: W-08 Contractering; KPI: alle; Risico R-01 Scopemismatch/ongeldige inschrijving; Bewijs: gerectificeerde aankondiging of NvI met juiste scope/naam.

2) SLA-definities voor Beschikbaarheid en P1 (respons/oplostijd)
- Vraag (SMART): Leg uiterlijk 2026-01-06 vast: a) meetmethode 99,8%/maand (meetvenster, onderhouds- en overmacht-exclusies, servicegrenzen), b) definitie “kritieke systemen” (systeemlijst), c) P1-responstijd <30 min en P1-oplostijd <4 uur: 24x7 of kantoortijden? start/stop-tijd (klokstil bij derden?), geaccepteerde communicatiekanalen (telefoon, portal, e-mail), en acceptatie van tijdelijke workaround.
- Prioriteit: Hoog
- Impact: Direct op haalbaarheid KPI’s en boeterisico’s; beïnvloedt bezetting en roostering 24x7.
- Afhankelijkheden: Systeemregister en huidige onderhoudsvensters opdrachtgever.
- W-KPI-Risico-Bewijs: W-06 SLA & Rapportage; KPI: Beschikbaarheid 99,8%, P1 respons <30m, P1 oplos <4u; Risico R-02 Onvoldoende SLA-definitie/meetdiscussies; Bewijs: SLA-metrics in maandrapport, monitoring-exports, MI-rapporten, openingstijden/rooster 24x7.

3) Monitoring, patchmanagement en Microsoft 365 scope en volumes
- Vraag (SMART): Geef uiterlijk 2026-01-06 aan: a) aantallen en typen assets (servers, endpoints, netwerkdevices, locaties, OS-mix, M365-licenties), b) gewenste tooling (eigen tooling toegestaan? agent deployment-rechten?), c) patchvensters en reboot-autoriteit, d) scope M365 (Exchange, SharePoint, Teams, OneDrive, Intune/Entra, Defender), e) proactieve drempelwaarden (bijv. CPU/ram/disk, endpoint-EDR alerts).
- Prioriteit: Hoog
- Impact: Dimensionering tooling, capaciteit, change-vensters en KPI-borging.
- Afhankelijkheden: CMDB/assetlijst, change-policy en M365-tenantspecificaties.
- W-KPI-Risico-Bewijs: W-02 Monitoring & Patch; W-03 M365 Beheer; KPI: Beschikbaarheid 99,8%; Risico R-03 Onvoldoende zicht op volumes/vensters → patchachterstand; Bewijs: CMDB-extract, agent-deploymentplan, patch-compliance rapportages, Intune compliance reports.

4) Dataresidency, BIO/ENSIA en verwerkersafspraken
- Vraag (SMART): Bevestig uiterlijk 2026-01-06: a) vereiste normen (BIO 2024 van toepassing naast ISO 27001/NEN 7510?), b) verplichte ENSIA-rapportage, c) EU-only scope incl. log/SIEM-gegevens en back-ups (Azure/M365 EU Data Boundary acceptabel?), d) eisen aan subverwerkers en standaard DPA/ verwerkersovereenkomst van gemeente.
- Prioriteit: Hoog
- Impact: Beperkt cloudregio’s, SIEM-keuze, logging-architectuur en contractketen.
- Afhankelijkheden: Juridische kaders gemeente, huidige DPA/AVG-bepalingen.
- W-KPI-Risico-Bewijs: W-05 Security & Dataresidency; KPI: Beschikbaarheid 99,8% (architectuurkeuzes), P1 KPI’s (logging); Risico R-04 Niet-conforme datalokatie/AVG; Bewijs: verwerkersovereenkomst, subverwerkerslijst, architectuurdiagrammen met regio’s, BIO-conformiteitsmatrix.

5) Continuïteit (BCP/DR), RTO/RPO en testfrequentie
- Vraag (SMART): Leg uiterlijk 2026-01-06 vast: a) doel-RTO/RPO per kritisch systeem, b) gewenste DR-strategie (actief/actief of actief/passief), c) testfrequentie (bijv. 1×/jaar volledige DR-test), d) acceptatiecriteria en rolverdeling tijdens oefeningen en echte uitwijk.
- Prioriteit: Hoog
- Impact: Architectuurkeuze, kosten, testplanning en KPI-herstelmogelijkheden.
- Afhankelijkheden: Kritieke processen en systeemclassificatie opdrachtgever.
- W-KPI-Risico-Bewijs: W-04 Continuïteit & BCP; KPI: Beschikbaarheid 99,8%, P1 oplos <4u; Risico R-05 Onvoldoende herstelcapaciteit; Bewijs: BCP/DR-plan, testrapporten, oefenlogs en verbeteracties (PDCA).

6) 24/7 bereikbaarheidsdienst en on-site verwachtingen
- Vraag (SMART): Bevestig uiterlijk 2026-01-06: a) definitie 24/7 bereikbaar (alleen aannemen vs. actief handelen), b) on-site responstijd-eisen (indien van toepassing) en locaties, c) voertaal NL/EN, d) maximum escalatietijd naar L2/L3 in de nacht/weekenden.
- Prioriteit: Hoog
- Impact: Bezettingsplanning, stand-by regeling, reistijd en kosten.
- Afhankelijkheden: Locatielijst, toegang/veiligheid, contactprotocollen.
- W-KPI-Risico-Bewijs: W-01 Servicedesk & 24/7; KPI: P1 respons/oplostijd; Risico R-06 Onvoldoende 24/7 dekking; Bewijs: roosters, piketregeling, on-call SLA, bereikbaarheidsrapportages.

7) Escalatie, CAB en governance (PDCA)
- Vraag (SMART): Stel uiterlijk 2026-01-06 vast: a) escalatiematrix met responstijden per niveau, b) CAB-cadans (wekelijks/2-wekelijks), c) maandelijkse SLA-rapportage-indeling, d) Major Incident Review-proces en termijnen voor verbetermaatregelen (bijv. <10 werkdagen).
- Prioriteit: Middel
- Impact: Snellere besluitvorming, minder herhaalfouten, voorspelbare changes.
- Afhankelijkheden: Beschikbaarheid stakeholders en governancekader.
- W-KPI-Risico-Bewijs: W-09 Escalatie & Governance; KPI: alle; Risico R-07 Trage besluitvorming → KPI-missers; Bewijs: RACI, CAB-notulen, MIR-rapporten met actie-tracking.

8) Raamovereenkomstmodaliteiten: duur, waarde, call-offs en indexatie
- Vraag (SMART): Bevestig uiterlijk 2026-01-06: a) looptijd (bijv. 2+2 jaar) en maximale raamwaarde, b) afroepmechanisme (Nadere Overeenkomsten, min. afname?), c) indexatiemethodiek (CPI/NEA/ICT-index) en frequentie, d) exit/overdrachteisen en notice-termijnen, e) beoogde startdatum (execution window ontbreekt).
- Prioriteit: Hoog
- Impact: Capaciteitsreservering, prijsstelling, exit-risico.
- Afhankelijkheden: Inkoopbeleid gemeente en planning.
- W-KPI-Risico-Bewijs: W-08 Contractering; KPI: continuïteit van dienstverlening; Risico R-08 Onduidelijke afroep/waarde → leverings- of budgetrisico; Bewijs: definitieve raamovereenkomst, indexatieclausule, exit-checklist.

9) EMVI-verwachtingen en bewijsvoering per criterium
- Vraag (SMART): Licht uiterlijk 2026-01-06 toe: a) nadere uitwerking subcriteria voor Kwaliteit (40%), Duurzaamheid (20%), Risicobeheersing (20%) en Prijs (20%), b) pagina- of woordlimieten per plan (PoA/Risico/KPI-overzicht; max. 6 pagina’s totaal of per onderdeel?), c) gewenste bewijsstukken (use cases, dashboards, referenties) en duurzaamheidskaders (bijv. CO2-Prestatieladder, SBTi toepasbaar op ICT).
- Prioriteit: Middel
- Impact: Gericht schrijven en optimale scoremaximalisatie.
- Afhankelijkheden: EMVI-beoordelingsrichtsnoeren.
- W-KPI-Risico-Bewijs: W-06 SLA & Rapportage; KPI: n.v.t. (beoordeling); Risico R-09 Suboptimale EMVI-invulling; Bewijs: gevraagde annexen (cases, KPI-dashboards, certificaten).

10) VOG en screeningseisen voor personeel en partners
- Vraag (SMART): Specificeer uiterlijk 2026-01-06: a) voor welke functies VOG verplicht is (L1/L2/L3/field engineers/consultants), b) acceptabele VOG-termijn (bijv. niet ouder dan 3 maanden), c) toepassing op onderaannemers/nearshore, d) aanvullende screenings (bijv. PEP/sancties), e) toegangsprocedures gemeentelijke locaties en datacenters.
- Prioriteit: Middel
- Impact: Resourceplanning, lead times en inzetbaarheid 24/7.
- Afhankelijkheden: HR- en securitybeleid gemeente.
- W-KPI-Risico-Bewijs: W-10 Compliance & Screening; KPI: P1-respons/oplostijd (personeelsbeschikbaarheid); Risico R-10 Niet inzetbaar personeel wegens vertraging VOG; Bewijs: screeningsbeleid, VOG-procesbeschrijving en registers (geanonimiseerd).

PDCA-borging (samenvattend)
- Plan: SLA-definities, scope, contractmodaliteiten en governance vooraf vastleggen (vragen 1–2, 7–9).
- Do: 24/7 operatie, monitoring/patching, M365-beheer, continuïteit uitvoeren (vragen 3, 5–6, 10).
- Check: Maandelijkse SLA-rapportages, MIR’s, compliance-audits BIO/ENSIA (vragen 2, 4, 7).
- Act: CAB/MIR-verbeteracties met termijnen en tracking tot closure (vraag 7).

Benodigde input:
- Definitieve scope/rectificatie titel en naam opdrachtgever; percelen ja/nee.
- Uitgewerkte SLA-definities (availability meetmethode, P1-respons/oplostijd, 24x7, klok-stopregels, kanalen).
- CMDB/asset- en volumelijst; gewenste toolingbeleid; patch/reboot-vensters; M365-scope.
- Dataresidency/AVG-kaders (BIO/ENSIA van toepassing, DPA, subverwerkersbeleid, EU Data Boundary).
- BCP/DR-eisen (RTO/RPO per systeem, DR-strategie, testfrequentie en -acceptatie).
- 24/7 bereikbaarheids- en on-site eisen (locaties, taal, L2/L3-escalaties).
- Governancekader (escalatiematrix, CAB-cadans, MIR-termijnen, rapportageformat).
- Raamovereenkomstdetails (looptijd, maximale waarde, afroepmechanisme, indexatie, exit, startdatum).
- EMVI-subcriteria, limieten per document, gevraagde bewijsvormen en duurzaamheidskaders.
- VOG/screeningseisen voor medewerkers en onderaannemers, toegangsprocedures.

Benodigde input: