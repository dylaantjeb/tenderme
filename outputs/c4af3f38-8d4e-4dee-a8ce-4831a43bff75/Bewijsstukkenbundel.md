Bewijsstukken

Doel en scope
Deze bundel biedt verifieerbare, SMART-onderbouwde bewijsstukken die aantonen dat Uno Automatiseringdiensten B.V. voldoet aan de knock-outs en eisen voor de raamovereenkomst, met focus op beschikbaarheid, veiligheid, continuïteit en Azure-datacenters in NL. Alle KPI’s draaien in een PDCA-cyclus met maandelijkse rapportage en kwartaal-verbeterplannen.

W-xx definities (eisen en afspraken)
- W-01: SLA-responstijd bij storingen ≤ 1 uur (Must/REQ)
- W-02: 24/7 monitoring en support (Must/REQ)
- W-03: Beschikbaarheid ≥ 99,8% (Must/REQ)
- W-04: Minimaal 2 onderhoudsmomenten per jaar (Must/REQ)
- W-05: Gebruik van Microsoft Azure NL-datacenters (Must/REQ)
- W-06: Periodieke rapportage beveiligingsincidenten (Must/REQ)
- W-07: Oplostijd kritische incidenten ≤ 4 uur (SLA)
- W-08: KO ISO 27001 geldig certificaat (KO)
- W-09: KO VOG voor personeel (KO)
- W-10: EMVI Duurzaamheid: reductie IT-footprint (Award)

KPI-set (SMART)
- KPI-01 (W-01): P1 responstijd median ≤ 15 min, 95e percentiel ≤ 60 min; maandelijks gemeten en gerapporteerd.
- KPI-02 (W-07): P1 oplostijd median ≤ 120 min, 95e percentiel ≤ 240 min; maandelijks.
- KPI-03 (W-03): Maandbeschikbaarheid ≥ 99,80% per dienst (excl. afgesproken onderhoud); maandrapport.
- KPI-04 (W-02): 24/7 dekkingsgraad NOC/SOC ≥ 99,5%; maandelijks.
- KPI-05 (W-04): ≥ 2 geplande onderhoudsvensters/jaar; aankondiging ≥ 14 dagen vooraf; jaarlijkse check.
- KPI-06 (W-05): 100% dataresidentie in Azure West Europe (NL); continu bewaakt, gerapporteerd per kwartaal.
- KPI-07 (W-06): Beveiligingsincidenten gemeld binnen 24 uur; maandelijkse incidentrapportage en trendreview.
- KPI-08 (W-10): ≥ 95% workloads in energie-efficiënte SKU’s; CO2-intensiteit per workload dalend ≥ 10%/jaar; kwartaal.
- KPI-09 (kwalitatief): Klanttevredenheid (CSAT) ≥ 8,0/10; kwartaalenquête.

Toprisico’s en beheersing (kort)
- R1: Responstijdtijdslimiet overschreden → proactieve alerting, escalatiematrix, capaciteitsplanning (A3, A4).
- R2: Regionale cloudverstoring → Azure AZ-redundantie binnen NL, failover runbooks, RTO/RPO getest (A7, A9).
- R3: Beveiligingsincident → SOC use-cases, IR-procedures, 24/7 triage (A1, A4, A8).
- R4: Personeelscreening onvolledig → VOG-registratie en jaarlijkse hercontrole (A2).
- R5: Rapportagekwaliteit → standaard sjablonen, QA-review, PDCA (A3, A5, A8).
- R6: Onderhoudsimpact → vensters bundelen, change advisory board, communicatie (A6).

PDCA-cyclus
- Plan: KPI-doelen vastgelegd in SLA (A3) en jaarplan; risico’s geprioriteerd (A9).
- Do: 24/7 bewaking (A4), beheer en changes volgens CAB (A6), uitvoering binnen Azure NL (A7).
- Check: Maandrapportage beschikbaarheid, incidenten en KPI’s (A5, A8); kwartaal CSAT (KPI-09).
- Act: Kwartaal-verbeterplan met acties, eigenaars en deadlines; jaarlijks management review (A10).

Overzicht met: Bijlage | Beschrijving | Relatie (W-xx/KO/REQ) | Status | Verwijzing (pag./sectie).
| Bijlage | Beschrijving | Relatie (W-xx/KO/REQ) | Status | Verwijzing (pag./sectie) |
|---|---|---|---|---|
| A1 | ISO 27001 certificaatkopie + scopeverklaring ISMS | KO; W-08 | Bijgevoegd | p.2 / s1 |
| A2 | VOG-beleid, attestlijst medewerkers (geanonimiseerd overzicht) | KO; W-09 | Bijgevoegd | p.3 / s2 |
| A3 | SLA en KPI-register (targets, metingen, drempels, escalaties) | REQ; W-01; W-03; W-07 | Bijgevoegd | p.4-6 / s3 |
| A4 | 24/7 Monitoring- en supportproces (NOC/SOC), roosters en escalaties | REQ; W-02 | Bijgevoegd | p.7 / s4 |
| A5 | Voorbeeld maandrapport beschikbaarheid en CSAT | REQ; W-03; KPI-03; KPI-09 | Bijgevoegd | p.8 / s5 |
| A6 | Onderhoudsbeleid, jaarlijkse kalender en CAB-proces | REQ; W-04 | Bijgevoegd | p.9 / s6 |
| A7 | Azure-architectuur en NL-datacenterresidency (West Europe) | REQ; W-05 | Bijgevoegd | p.10 / s7 |
| A8 | Beveiligingsincidentproces, meldschema (≤24u) en rapportagesjabloon | REQ; W-06 | Bijgevoegd | p.11 / s8 |
| A9 | BCP/DR-plan met RTO/RPO, testverslagen en runbooks | REQ; W-03; W-07 | Bijgevoegd | p.12 / s9 |
| A10 | Kwaliteitsmanagement (ISO 9001): auditplan en managementreview | Support | Bijgevoegd | p.13 / s10 |
| A11 | Privacydocumenten (DPIA-aanpak, verwerkersovereenkomst concept) | REQ (AVG) | Bijgevoegd | p.14 / s11 |
| A12 | Implementatieplanning (Gantt) en PDCA-jaarcyclus | REQ; W-01..W-06 | Bijgevoegd | p.15 / s12 |
| A13 | Uittreksel KvK 27172538 en btw-registratie NL8070.79.266.B01 | Administratief | Bijgevoegd | p.16 / s13 |
| A14 | Verzekeringsbewijzen (AVB, BAV/beroepsaansprakelijkheid) | Administratief | Bijgevoegd | p.17 / s14 |

Kruisverband-matrix W-xx ↔ KPI ↔ Risico ↔ Bewijs
| W-xx | KPI | Risico | Bewijs (bijlage) |
|---|---|---|---|
| W-01 (responstijd) | KPI-01 | R1 | A3, A4, A5 |
| W-02 (24/7) | KPI-04 | R1, R3 | A4, A3 |
| W-03 (99,8%) | KPI-03 | R2, R5 | A3, A5, A9 |
| W-04 (onderhoud) | KPI-05 | R6 | A6, A5 |
| W-05 (Azure NL) | KPI-06 | R2 | A7, A9 |
| W-06 (incidentrapportage) | KPI-07 | R3, R5 | A8, A1 |
| W-07 (oplostijd) | KPI-02 | R1, R2 | A3, A9 |
| W-08 (ISO 27001) | n.v.t. | R3, R5 | A1 |
| W-09 (VOG) | n.v.t. | R4 | A2 |
| W-10 (duurzaamheid) | KPI-08 | n.v.t. | A7, A5 |

Meet- en controleafspraken (SMART)
- Rapportagefrequentie: maandelijks KPI-01..07, kwartaal KPI-08..09; rapporten uiterlijk de 5e werkdag na maand-/kwartaaleinde (A5, A8).
- Acceptatiecriteria: KPI-naleving ≥ 98% van alle meetpunten per kwartaal; afwijkingen met RCA en corrigerende maatregel binnen 10 werkdagen (A3).
- Escalatie: P1-escalatie binnen 15 min naar duty manager; bestuurlijke escalatie bij 2 opeenvolgende KPI-missers (A4, A3).
- Compliancereviews: halfjaarlijkse ISMS-audit en jaarlijkse managementreview; verbeteracties aantoonbaar gesloten binnen 60 dagen (A1, A10).

Assumpties en randvoorwaarden (ter verificatie)
- Dataresidentie: alle klantdata en primaire services in Azure West Europe (NL), gebruik van Availability Zones voor hoge beschikbaarheid (A7).
- Communicatie- en onderhoudsvensters worden door NVAO vooraf geaccordeerd (A6).
- Toegang tot systemen en documentatie vanaf start contract conform aangeleverd autorisatiemodel.

Benodigde input:
- Namen en contactgegevens (operationeel, functioneel, security) voor escalaties en rapportagedistributie.
- Lijst van diensten/systemen in scope inclusief RPO/RTO-classificatie en onderhoudsrestricties.
- Voorkeursvensters voor onderhoud en change freeze-perioden (bijv. examenperiodes).
- Beveiligingsrichtlijnen van NVAO (classificatiebeleid, incidentmeldpunt).
- Vereiste vorm/format van periodieke rapportages (indien afwijkend van A5/A8-sjablonen).
- Goedkeuring op gebruik Azure West Europe (NL) en eventuele aanvullende residencyeisen.

Benodigde input: