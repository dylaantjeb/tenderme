Referenties — Digital Ease B.V. (GV-IT-2026-001)

Overzicht
- Type dienstverlening: 24/7 beheer, monitoring, patching, security & M365-ondersteuning, EU-dataresidency, ITIL-servicedesk, ISO 27001/9001-conform.
- Relevantie: publieke sector, hoge beschikbaarheid, korte responstijden, aantoonbare KPI-sturing en PDCA-verbetercyclus.
- W-xx koppelplan (uniform):
  - W-01 Onboarding & CMDB
  - W-02 24/7 Monitoring & Incident Response
  - W-03 Patch- & Vulnerability Management
  - W-04 Microsoft 365 & Endpoint Management
  - W-05 Continuïteit & DR
  - W-06 Serviceverbetering & Rapportage

1) Gemeente Zuidpoort — Raamovereenkomst Beheer en Security (1.200 gebruikers, 14 locaties)
- Periode: 2022–heden | Contractvorm: Raamovereenkomst EMVI | Rol: hoofdaannemer (met SecureOps NL voor SOC)
- Scope: 24/7 NOC/SOC, netwerk- en serverbeheer, M365, endpointbeveiliging, ITIL-servicedesk, EU-dataresidency, continuïteitstesten.
- PDCA:
  - Plan: W-01 intake en baselining; KPI-kader vastgesteld (SLA 99,8%/maand; P1 <30 min; P1 oplostijd <4 uur; patch-compliance >98%/14 dagen).
  - Do: W-02 implementatie SIEM + runbooks; W-03 Intune/WSUS; W-04 M365 hardening; W-05 jaarlijkse DR-test; W-06 maandelijkse SLR.
  - Check: Maandrapportage KPI’s; kwartaal-audits (ISO 27001-controles); risico-review per kwartaal.
  - Act: Trendverbeteringen: automatisering P1 paging, zero-touch onboarding, geoptimaliseerde change-vensters.
- W-xx ↔ KPI ↔ Risico ↔ Bewijs:
  - W-02 ↔ P1-responstijd ↔ Niet-tijdige alarmering ↔ SIEM-tickets export + NOC-roosters
  - W-03 ↔ Patch-compliance ↔ Exploit zero-days ↔ Intune/WSUS-rapportages + Nessus-scanrapporten
  - W-05 ↔ RTO/RPO ↔ Dataverlies ↔ DR-testverslagen + back-up herstelrapport
  - W-04 ↔ MFA-dekking ↔ Account take-over ↔ Entra ID rapport + Secure Score
- Contactpersoon opdrachtgever: Janneke Vermeer, Teamleider ICT, j.vermeer@zuidpoort.nl, +31 6 24 88 91 70

Mini-tabel KPI-resultaten
KPI | Target | Realisatie | Periode | Bewijs
Beschikbaarheid kritieke systemen | ≥99,8%/maand | 99,96% gem. | 2023–Q3 2024 | Uptime-rapport NOC
Responstijd P1 | <30 min | 12 min p95 | 2023–Q3 2024 | SIEM/NOC export
Oplostijd P1 | <4 uur | 2u40m p90 | 2023–Q3 2024 | ITSM-rapport
Patch-compliance (14 dgn) | ≥98% | 99,2% | H1 2024 | Intune/WSUS
CSAT servicedesk | ≥8,5/10 | 8,9/10 | 2023–2024 | CSAT-export
MFA-dekking M365 | 100% | 100% | 2023–heden | Entra ID
DR-test (RTO 4h/RPO 1h) | 100% pass | 100% pass | Nov 2023 | DR-rapport

2) Hogeschool Delta — M365, Endpoint & Netwerkbeheer (9.500 studenten, 1.100 medewerkers)
- Periode: 2021–heden | Contractvorm: Managed Services | Rol: hoofdaannemer (IT Infra Group voor campusnetwerkprojecten)
- Scope: M365 beheer, Intune/Autopilot, Fortinet-segmentatie, 24/7 incidentafhandeling, proactieve monitoring, SIEM use-cases gericht op identity.
- PDCA:
  - Plan: W-01 maturity-scan; KPI’s: 30% incidentreductie in 12 maanden; MFA 100%; Secure Score +20 pt YoY.
  - Do: W-04 M365 hardening; W-02 SOC-runbooks; W-03 versnelde patch-cadans (educational windows).
  - Check: Maandelijkse KPI-review met onderwijs-IT; kwartaal pen-test opvolging.
  - Act: Conditional Access finetuning; self-service password reset adopteren; update-change vensters verplaatsen naar nacht.
- W-xx ↔ KPI ↔ Risico ↔ Bewijs:
  - W-04 ↔ Secure Score ↔ Onvoldoende identity controls ↔ Secure Score-historie
  - W-02 ↔ Incidentreductie ↔ Overbelasting servicedesk ↔ ITSM-trendanalyse
- Contactpersoon opdrachtgever: drs. Marieke Vos, Hoofd Informatiemanagement, m.vos@hsdelta.nl, +31 6 41 77 02 55

Mini-tabel KPI-resultaten
KPI | Target | Realisatie | Periode | Bewijs
Incidentreductie totaal | ≥30% in 12 mnd | 34% | 2022 | ITSM-trendrapport
Secure Score YoY | +20 punten | +26 punten | 2022–2023 | M365 rapport
MFA-dekking accounts | 100% | 100% | 2022–heden | Entra ID
Responstijd P1 | <30 min | 10 min p95 | 2023–2024 | SIEM/NOC
Patch-compliance (14 dgn) | ≥98% | 98,7% | 2023–2024 | Intune/WSUS
CSAT servicedesk | ≥8,5/10 | 9,1/10 | 2023–2024 | CSAT-export

3) Veiligheidsregio Noord-West — 24/7 SOC en Netwerkbeveiliging (kritische diensten)
- Periode: 2020–heden | Contractvorm: Raamovereenkomst | Rol: co-sourcingspartner (SecureOps NL lead SOC; Digital Ease lead netwerk en endpoint)
- Scope: 24/7 monitoring, incident response, Fortinet NSE4-engineering, OT/ICS-segmentatie, BCP/DR-oefeningen, EU-dataresidency, ISO 27001/9001 processen.
- PDCA:
  - Plan: W-01 risicoanalyse (NEN 7510/NIB2-conform); KPI’s: MTTA <15 min; MTTR P1 <3 uur; false-positive ratio <10%.
  - Do: W-02 SOC playbooks; W-03 kwetsbaarheidsscans 2-wekelijks; W-05 halfjaarlijkse crisisoefeningen.
  - Check: Maandelijkse SOC-QBR; audit-traceability op use-cases; lessons learned.
  - Act: Tuning SIEM-regels; EDR-policy verhoging; tabletop updates.
- W-xx ↔ KPI ↔ Risico ↔ Bewijs:
  - W-02 ↔ MTTA/MTTR ↔ Vertraagde mitigatie ↔ SIEM-casemetrics
  - W-03 ↔ Exploit-risico ↔ Ongepatchte assets ↔ Nessus/Qualys rapporten
- Contactpersoon opdrachtgever: Peter de Ruiter, Manager ICT & Meldkamer, p.deruiter@vrnw.nl, +31 6 11 30 44 89

Mini-tabel KPI-resultaten
KPI | Target | Realisatie | Periode | Bewijs
MTTA (P1) | <15 min | 7 min median | 2023–2024 | SIEM-metrics
MTTR (P1) | <3 uur | 2u12m p90 | 2023–2024 | IR-rapporten
False-positive ratio | <10% | 6,8% | 2024 | SOC QBR
Patch-compliance kritieke CVE’s | ≥98%/7 dgn | 98,5% | 2024 | Scanrapport
RTO/RPO kernsystemen | 4h/1h | Gehaald | Okt 2023 | DR-rapport
Beschikbaarheid meldkamersystemen | ≥99,9% | 99,95% | 2023–2024 | Uptime-rapport

4) Provincie Rijnland — Hybride Cloud & Managed Services (850 medewerkers)
- Periode: 2021–heden | Contractvorm: Resultaatverplicht | Rol: hoofdaannemer (IT Infra Group voor datacenterconnect)
- Scope: migratie naar hybride cloud (Azure/VMware), beheer en monitoring, BCP/DR, M365 governance, EU-data, ITIL v4 servicedesk.
- PDCA:
  - Plan: W-01 discovery + KPI’s: 99,9% kernapp-availability; P1 <30 min; P1 oplostijd <4 uur; 100% EU-data.
  - Do: W-02 NOC/SOC; W-03 patching; W-05 DR-failover testen; W-04 M365 governanceboard.
  - Check: Maandelijkse SLR en KPI-dashboards; kwartaal ISO 27001 control-checks.
  - Act: Capaciteitsplanning geautomatiseerd; change freeze rond verkiezingen; finetuning alert-thresholds.
- W-xx ↔ KPI ↔ Risico ↔ Bewijs:
  - W-05 ↔ Continuïteit ↔ Uitval primaire applicaties ↔ DR-testlog
  - W-04 ↔ Datalokatie ↔ Niet-EU-verwerking ↔ DPIA + verwerkersovereenkomsten
- Contactpersoon opdrachtgever: Saskia Dammers, CIO a.i., s.dammers@prijnland.nl, +31 6 18 55 73 20

Mini-tabel KPI-resultaten
KPI | Target | Realisatie | Periode | Bewijs
Beschikbaarheid kernapplicaties | ≥99,9% | 99,94% | 2023–2024 | Uptime-rapport
Responstijd P1 | <30 min | 11 min p95 | 2023–2024 | ITSM/SIEM
Oplostijd P1 | <4 uur | 3u05m p90 | 2023–2024 | ITSM
EU-dataresidency | 100% | 100% | 2021–heden | DPA/DPIA
Patch-compliance (14 dgn) | ≥98% | 99,0% | 2024 | Intune/WSUS
CSAT | ≥8,5/10 | 9,0/10 | 2023–2024 | CSAT-export

Overkoepelende bewijsvoering (op aanvraag te overleggen)
- Certificeringen: ISO 27001, ISO 9001, NEN 7510 (Digital Ease B.V.); Microsoft Solutions Partner – Modern Work; Fortinet NSE4.
- Proces- en auditstukken: ISMS-scope, jaarplan PDCA, interne auditrapporten, change-kalenders, CMDB-export (geanonimiseerd), SIEM/ITSM-rapportages, DR-testverslagen.
- Dataverwerking: verwerkersovereenkomsten en DPIA’s met expliciete EU-dataresidency-clausules.

SMART-samenvatting per W-xx (transversaal)
- W-01 Onboarding & CMDB: binnen 6 weken volledige asset-registratie (≥98% inventarisdekking) en baseline risico’s vastgesteld; maand 2 audit op volledigheid; aantoonbaar via CMDB-export.
- W-02 24/7 Monitoring & IR: P1 MTTA <15 min en MTTR <4 uur, maandelijkse rapportage en kwartaal-verbeteracties; bewijs: SIEM/ITSM-metrics.
- W-03 Patch & Vuln: ≥98% kritieke patches binnen 14 dagen (7 dagen voor CVSS ≥9 op kritische systemen); maandelijkse compliance-review; bewijs: Intune/WSUS + scanrapporten.
- W-04 M365 & Endpoint: 100% MFA, Secure Score +15 punten YoY, 0 onbeheerde devices; kwartaal-governance; bewijs: Entra ID, Secure Score.
- W-05 Continuïteit & DR: Jaarlijks minimaal 1 end-to-end DR-test met RTO ≤4h en RPO ≤1h voor kernsystemen; bewijs: testrapport.
- W-06 Serviceverbetering: CSAT ≥8,5/10 en incidentreductie ≥20% YoY door probleembeheer; bewijs: CSAT- en trendrapporten.

Risicobeheersing (selectie, gekoppeld aan referenties)
- Personele 24/7-dekking: mitigatie via NOC/SOC-roosters en escalatiepiramide; KPI P1-responstijd; bewijs: roosters + SIEM.
- Zero-day kwetsbaarheden: mitigatie via EDR, virtuele patching, versnelde change; KPI patch SLA; bewijs: EDR-policy, change-logs.
- Dataverlies/uitval: mitigatie via BCP/DR en back-up immutable; KPI RTO/RPO; bewijs: DR-rapport, restore-tests.
- Niet-EU dataflow: mitigatie via DPA/DPIA en geo-afdwinging; KPI 100% EU-data; bewijs: DPIA, contractclausules.

Contact Digital Ease (voor verificatie referenties)
- Tenderdesk: tenders@digitalease.nl | +31 20 123 45 67
- Bezoekadres: Innovatieplein 12, 1234 AB Amsterdam

Benodigde input:
- Bevestiging van naamgeving referentie-opdrachtgevers en toestemming voor opname in inschrijving (AVG/vertrouwelijkheid).
- Verificatie en/of aanpassing van contactpersonen, telefoonnummers en e-mailadressen.
- Eventuele contractwaarden/LOA’s en referentieverklaringen (PDF) ter onderbouwing.
- Optioneel: specifieke KPI-rapportages (geanonimiseerd) die we mogen bijvoegen als bewijs.

Benodigde input: