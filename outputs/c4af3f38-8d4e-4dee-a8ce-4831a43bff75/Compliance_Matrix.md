Context en aanpak
- Werkpakketten (W-xx): W-01 Servicedesk & 24/7 Monitoring; W-02 Incident- & Problemmanagement; W-03 Change & Maintenance; W-04 Security & Compliance (incl. VOG); W-05 Azure Platform NL & Continuïteit; W-06 Rapportage, KPI & Governance; W-07 Onboarding & Documentatie.
- KPI’s: K-01 Beschikbaarheid ≥99,8%; K-02 Responstijd ≤1 uur; K-03 Oplostijd P1 ≤4 uur; K-04 Security-incidenten: melding binnen 24 uur bij P1 en maandrapportage; K-05 Onderhoudsvensters ≥2 per jaar; K-06 24/7 coverage 100%; K-07 Rapportagetijdigheid 100% binnen 5 werkdagen na maandafsluiting.
- Toprisico’s: R-01 Monitoring-gap; R-02 SLA-overschrijding; R-03 Datalocatie/region-wijziging; R-04 Onvoldoende personele screening; R-05 Change-gerelateerde verstoring; R-06 Onvolledige security-rapportage.

Compliance-matrix
| Eis | Type (KO/REQ) | Voldoening | Toelichting/Bewijs | Bijlage |
| --- | --- | --- | --- | --- |
| UEA: Uitsluitingsgronden niet van toepassing | REQ | Ja | Plan: UEA door directie ondertekend. Do: indiening met inschrijving. Check: juridische check door inkoop. Act: actualiseren bij wijzigingen. Bewijs: ingevuld en ondertekend UEA. | A1 UEA |
| UEA: Betalingsverplichtingen (Belastingdienst/SVB) nagekomen | REQ | Ja | Plan: periodieke controle fiscaliteit. Do: actuele verklaring betalingsgedrag. Check: jaarcontrole finance. Act: corrigerende acties bij afwijking. Bewijs: verklaring Belastingdienst. | A3 Belastingverklaring |
| UEA: Inschrijving beroepsregister (KvK) | REQ | Ja | Plan: KvK-registratie actueel. Do: uittreksel aanleveren. Check: jaarlijkse hercontrole. Act: direct bijwerken bij organisatie-wijziging. Bewijs: KvK 27172538 Uno Automatiseringsdiensten B.V. | A2 KvK-uittreksel |
| UEA: BTW-registratie | REQ | Ja | Plan: correcte BTW-administratie. Do: opgave BTW-nummer. Check: audit finance. Act: bijsturen bij auditbevindingen. Bewijs: NL8070.79.266.B01. | A4 BTW-registratie |
| UEA: Financiële draagkracht | REQ | Ja | Plan: solvabiliteit bewaken. Do: aanleveren jaarrekening 2023/2024. Check: ratio-analyse. Act: maatregelen bij risico’s. Bewijs: gecontroleerde jaarrekening. | A5 Jaarrekening |
| UEA: Verzekeringen (AVB/BAV/Cyber) | REQ | Ja | Plan: polissen en dekkingen borgen. Do: polisbladen aanleveren. Check: jaarlijkse hernieuwing. Act: dekkingsgap sluiten. Bewijs: geldige polissen. | A6 Verzekeringen |
| UEA: Bevoegdheid ondertekening | REQ | Ja | Plan: volmachten register. Do: ondertekend door bevoegd bestuurder. Check: verificatie met KvK. Act: volmacht updaten. Bewijs: volmacht/board resolution. | A7 Bevoegdheid |
| ISO 27001 (geldig certificaat) | KO | Ja | Plan: ISMS scope cloud/infrastructuur. Do: uitvoering controls A.5–A.18. Check: jaarlijkse audit en surveillances. Act: CAPA op auditbevindingen. W-04; KPI: K-04; Risico: R-06. Bewijs: certificaat door geaccrediteerde certificerende instelling. | B1 ISO 27001 |
| Personeel beschikt over VOG | KO | Ja | Plan: HR-screeningsbeleid. Do: VOG vereist vóór toegang. Check: jaarlijkse steekproef/expiries. Act: toegang intrekken en her-screenen. W-04; Risico: R-04. Bewijs: VOG-overzicht en kopieën op dossier. | B3 VOG-overzicht |
| SLA-responstijd ≤ 1 uur bij storingen | REQ | Ja | Plan: SLA & escalatiematrix. Do: 24/7 triage via NOC/servicedesk. Check: maandelijks rapport K-02. Act: problemmanagement en verbeteracties. W-01/W-02; KPI: K-02; Risico: R-02. Bewijs: SLA/runbook en KPI-rapport. | B4 SLA; B9 KPI-rapport |
| 24/7 monitoring en support beschikbaar | REQ | Ja | Plan: 24/7 rooster en dekking. Do: monitoring SIEM/NOC tooling; on-call. Check: dekking en MTTR K-06/K-03. Act: capaciteitsplanning en training. W-01; KPI: K-06; Risico: R-01. Bewijs: monitoring-architectuur en rooster. | B5 Monitoring; B4 SLA |
| Beschikbaarheid ≥ 99,8% | REQ | Ja | Plan: HA-architectuur (AZ), SLO’s. Do: redundantie en auto-heal. Check: uptime-rapport K-01. Act: verbeterplan bij <99,8%. W-05; KPI: K-01; Risico: R-02/R-05. Bewijs: maandrapport uptime. | B9 KPI-rapport |
| Minimaal 2 onderhoudsmomenten per jaar | REQ | Ja | Plan: jaarplan changes/CAB. Do: uitvoeren binnen vensters met rollback. Check: change-registraties en evaluaties. Act: lessons learned. W-03; KPI: K-05; Risico: R-05. Bewijs: jaarplan onderhoud en CAB-notulen. | B7 Jaarplan; B9 Rapport |
| Gebruik van Microsoft Azure (NL datacenters) | REQ | Ja | Plan: policy ‘location = West Europe (NL)’. Do: deploy in Azure West Europe met AZ’s. Check: Azure Policy compliance-rapport. Act: remediatie bij drift. W-05; Risico: R-03. Bewijs: datalocatieverklaring en compliance-scan. | B6 Azure-locatie |
| Periodieke rapportage over beveiligingsincidenten | REQ | Ja | Plan: maandcadans + P1 binnen 24u. Do: SOC-registratie en rapportage. Check: K-04/K-07 op tijdigheid en volledigheid. Act: verbetermaatregelen. W-04/W-06; Risico: R-06. Bewijs: template + voorbeeldrapport. | B8 Sec-rapport; B9 KPI |
| Oplostijd ≤ 4 uur voor kritische incidenten (P1) | REQ | Ja | Plan: prioritering en runbooks. Do: SWAT-escalatie en vendor engagement. Check: K-03 MTTR. Act: RCA en blijvende fixes. W-02; KPI: K-03; Risico: R-02. Bewijs: SLA/runbook + rapportage. | B4 SLA; B9 KPI |
| Plan van Aanpak (PvA) | REQ | Ja | Plan: scope, planning, governance, PDCA. Do: uitvoering conform PvA. Check: voortgangsrapportage. Act: bijsturen via stuurgroep. W-06/W-07. Bewijs: PvA document. | D1 PvA |
| Risicodossier | REQ | Ja | Plan: register R-01…R-06 met eigenaars. Do: mitigaties uitvoeren. Check: maandelijkse risk review. Act: herprioriteren/mitigeren. W-06. Bewijs: actueel risicoregister. | D2 Risicodossier |
| KPI-overzicht | REQ | Ja | Plan: definities K-01…K-07, meetmethodiek. Do: data verzamelen en publiceren. Check: validatie en trendanalyse. Act: CSI-roadmap. W-06. Bewijs: KPI-catalogus. | D3 KPI-overzicht |
| 12 maanden garantie op dienstverlening | REQ | Ja | Plan: garantievoorwaarden opnemen. Do: herstel zonder meerkosten binnen garantie. Check: klanttevredenheid en herhaalincidenten. Act: structurele verbeteringen. Bewijs: paragraaf garantie in SLA/overeenkomst. | B4 SLA |

SMART-borging en PDCA-samenvatting
- Beschikbaarheid: K-01 ≥99,8% per kalendermaand gemeten via onafhankelijke monitoring; maandrapport vóór de 5e werkdag (K-07); bij <99,8% een RCA binnen 5 werkdagen en verbeteractie binnen 30 dagen (PDCA).
- Responstijd: K-02 ≤60 minuten voor alle P1/P2 meldingen, 24/7 gedekt; steekproefsgewijs gecontroleerd per maand; bij overschrijding training en capaciteitsaanpassing (PDCA).
- Oplostijd P1: K-03 ≤4 uur; bij overschrijding CAB-review en runbook-update binnen 10 werkdagen.
- Security-rapportage: K-04 P1-melding binnen 24 uur; maandelijkse overzichtsrapportage inclusief trends; verbeteracties bijgehouden in risicodossier (R-06).
- Onderhoud: K-05 ≥2 geplande vensters per jaar; communicatie ≥10 werkdagen vooraf; post-change evaluatie binnen 5 werkdagen.
- 24/7 dekking: K-06 100% bezetting; fallback-rooster en management-alerting.

Bijlagenregister
- A1 UEA; A2 KvK-uittreksel (KvK 27172538); A3 Verklaring betalingsgedrag Belastingdienst; A4 BTW-registratie; A5 Jaarrekening 2023/2024; A6 Verzekeringspolissen (AVB/BAV/Cyber); A7 Bevoegdheidsverklaring.
- B1 ISO 27001-certificaat; B2 ISO 9001-certificaat; B3 VOG-overzicht personeel; B4 SLA & Runbook; B5 Monitoring-architectuur en 24/7 rooster; B6 Azure datalocatieverklaring (West Europe NL) en Policy-rapport; B7 Jaarplan onderhoud & CAB; B8 Security-incident rapportagetemplate + voorbeeld; B9 KPI-rapportageformat + voorbeeld.
- D1 Plan van Aanpak; D2 Risicodossier; D3 KPI-overzicht.

Benodigde input:
- Ondertekend UEA (A1) en bevoegdenverklaring/volmacht (A7).
- Actueel KvK-uittreksel (A2) en BTW-registratiebewijs (A4).
- Verklaring betalingsgedrag Belastingdienst (A3).
- Jaarrekening 2023/2024 (A5).
- Polisbladen AVB/BAV/Cyber (A6).
- ISO 27001- en ISO 9001-certificaten (B1, B2).
- VOG-overzicht en VOG-kopieën per betrokken medewerker (B3).
- SLA & Runbook incl. escalatiematrix en P1/P2-definities (B4).
- Monitoring-architectuur en 24/7 dienstrooster (B5).
- Azure datalocatieverklaring en Azure Policy compliance-rapport (B6).
- Jaarplan onderhoud en CAB-proces (B7).
- Security-incident rapportagetemplate + geanonimiseerd voorbeeld (B8).
- KPI-rapportageformat + geanonimiseerd maandrapport (B9).
- Plan van Aanpak, Risicodossier en KPI-overzicht (D1–D3).

Benodigde input: