Beoordelingsmethodiek — EMVI/BPKV voor Raamovereenkomst Catering- en Horecadiensten (ICT-ondersteunende diensten, NVAO)

Doel
Deze beoordelingsmethodiek werkt de EMVI/BPKV-criteria uit conform de uitvraag (Kwaliteit 40%, Duurzaamheid 20%, Risicobeheersing 20%, Prijs 20%). We scoren op een uniforme 0–10 schaal per criterium en borgen Plan-Do-Check-Act (PDCA), met directe kruisverbanden tussen maatregelen (W-xx), KPI’s, risico’s en bewijs. Knock-outs (ISO 27001, VOG) en minimumeisen (SLA, 24/7, 99,8%, onderhoud, Azure NL, incidentrapportage) zijn integraal geborgd.

Scoringsschaal (uniform toegepast)
- 0 = Niet aangeboden of niet conform eis.
- 4 = Minimaal conform eis, beperkt uitgewerkt, geen aantoonbare meerwaarde.
- 6 = Conform eis, redelijke uitwerking, beperkte meerwaarde.
- 8 = Boven eis, goed uitgewerkt met aantoonbare meerwaarde en meetbare KPI’s.
- 10 = Verre boven eis, excellent en aantoonbaar onderscheidend met harde resultaten, onafhankelijke bewijsvoering en aantoonbaar continu verbeteren.

Beoordelingstabel (structuur, SMART, PDCA-conform)

| Criterium | Weging | Schaal | Wat goed eruitziet | Onze invulling (SMART) | KPI’s (SMART) | Belangrijkste risico’s | Bewijs | Gerelateerde W-xx |
|---|---:|---|---|---|---|---|---|---|
| Kwaliteit van dienstverlening (IT-beheer, cloud/infrastructuur) | 40% | 0–10 | Proactieve, aantoonbaar betrouwbare 24/7 dienstverlening die SLA’s overtreft; zero-trust security; minimale verstoringen; heldere rapportage; aantoonbare verbetercyclus. | - Beschikbaarheid core diensten ≥ 99,95% (boven eis 99,8%). - P1 responstijd ≤ 15 min (eis ≤ 60 min); P1 oplostijd ≤ 2 uur (eis ≤ 4 uur). - Detectietijd incidenten ≤ 5 min via 24/7 monitoring. - Minimaal 4 geplande onderhoudsvensters/jaar met ≤ 15 min klantimpact en zero-downtime waar mogelijk. - Azure NL (region West/North Europe) met zone-redundantie. | - KPI-1 Beschikbaarheid ≥ 99,95% maandgemiddelde. - KPI-2 P1 responstijd mediane ≤ 10 min; 95p ≤ 15 min. - KPI-3 P1 oplostijd mediane ≤ 90 min; 95p ≤ 120 min. - KPI-4 Mean Time to Detect ≤ 5 min. - KPI-5 CSAT ≥ 8,2 per kwartaal. | RS-01 Regiostoring cloud; RS-02 Capaciteitstekort; RS-03 Vertraagde respons; RS-04 Wijzigingsimpact op productie. | - SLA-rapportages (maandelijks). - Monitoring/synthetic checks export. - Change- en patchkalender. - Architectuurschema’s ZR (zone redundant). | W-02 24/7 monitoring; W-03 Incident Mgmt (ITIL4); W-04 SLM/rapportage; W-05 Azure NL landing zone; W-06 HA/DR; W-07 Patch/Change; W-09 Service Desk |
| Duurzaamheid | 20% | 0–10 | Meetbare CO2- en kWh-reductie, cloud-rightsizing, groene regio’s, circulaire lifecycle, transparante rapportage. | - 20% kWh-reductie per workload binnen 6 maanden via rightsizing/auto-scaling. - 25% CO2-eq reductie per workload binnen 12 maanden door optimalisatie en groene inkoop (Azure met hoge PUE-efficiëntie). - 30% van hardwarevervanging circulair (refurbished) binnen raamovereenkomst. - Maandelijkse sustainability-rapportage (kWh, CO2, kosten). | - KPI-6 kWh/VM daling ≥ 20% t.o.v. nulmeting M0→M6. - KPI-7 CO2-eq/workload daling ≥ 25% M0→M12. - KPI-8 ≥ 30% circulaire vervangingen/jaar. - KPI-9 100% rapportages op tijd, accuraatheid > 98%. | RS-05 Onvoldoende meetdata; RS-06 Leveringsketen niet duurzaam; RS-07 Lock-in niet-duurzame resources. | - Baseline- en trendrapportages. - Right-sizing assessments. - Leveranciersverklaringen circulair. | W-05 Azure optimalisatie; W-11 Duurzaamheidsprogramma; W-12 Prijs/TCO-transparantie |
| Risicobeheersing en security | 20% | 0–10 | ISO 27001-geborgd ISMS, zero-trust, SOC/SIEM, aantoonbare risicoreductie, BCM/DR getest, duidelijke escalatie en incidentrapportages. | - ISMS conform ISO 27001 actief; jaarlijkse interne audits en directiebeoordeling. - SOC/SIEM met 24/7 alerting en playbooks. - RTO ≤ 4 uur, RPO ≤ 15 min voor kritische diensten; DR-test 2×/jaar. - Security-incidentrapportage maandelijks; P1 security-incidenten binnen 24 uur geëvalueerd en lessons learned gepubliceerd. - VOG op alle operationele medewerkers. | - KPI-10 Aantal P1 security-incidenten zonder containment binnen 60 min: 0. - KPI-11 DR-test slagingspercentage ≥ 95% per test. - KPI-12 Tijd tot incidentrapportage ≤ 5 werkdagen na einde maand; P1 post-mortem ≤ 5 werkdagen. - KPI-13 Auditbevindingen major: 0 per jaar. | RS-02 Datalek; RS-08 Onvoldoende herstelvermogen; RS-09 Non-compliance AVG; RS-10 Personele betrouwbaarheid. | - ISO 27001-certificaat + scope. - DR-testverslagen. - Incident-post-mortems. - VOG-verklaringen gecontroleerd (HR-register). | W-01 ISMS/ISO27001; W-02 SOC/SIEM; W-06 DR/RTO-RPO; W-10 Security-rapportage & DPIA |
| Prijs | 20% | 0–10 | Laagste TCO met transparant prijsmodel, reële indexatie, aantoonbare besparingshefbomen, geen lock-in. | - Vast managed service tarief per maand per scope-item (locked 12 maanden). - Uurtarieven per rol vastgelegd (locked 12 maanden). - Indexatie: max CBS CPI All Items, cap 3%/jaar na jaar 1. - Besparingsdoel: 12% TCO-reductie in 24 maanden via rightsizing, reserved instances en automatisering; benefit tracking per kwartaal. - Exit-plan zonder beëindigingsfee. | - KPI-14 TCO-reductie ≥ 12% in 24 maanden. - KPI-15 Variabele kosten voorspelbaarheid: afwijking forecast ≤ ±5% p/kwartaal. - KPI-16 100% transparantie op kostenregels. | RS-11 Onvoorziene meerkosten; RS-12 Overconsumptie cloud; RS-13 Contractuele lock-in. | - Prijsmatrix en ratecard. - TCO-baseline en kwartalige benefit tracking. - Contractclausules indexatie/exit. | W-12 Prijs/TCO-model; W-05 Azure optimalisatie; W-04 SLM met cost reporting |

Toelichting PDCA per criterium

1) Kwaliteit — PDCA
- Plan: Service Design op basis van eisen; architectuur met zone-redundantie; SLA/KPI-definitie; change- en patchkalender; onboardingrunbook. (W-04, W-05, W-07, W-09)
- Do: 24/7 monitoring, incident- en major incident-proces (ITIL4), uitvoering changes in vensters, preventief onderhoud. (W-02, W-03, W-07)
- Check: Maandelijkse SLA-rapportage op KPI-1..4 en 5, kwartaal-CSAT, post-mortems. (W-04)
- Act: Problem management, trendanalyses, automatiseren waar mogelijk (IaC), bijstellen runbooks en capaciteit. (W-03, W-05)

2) Duurzaamheid — PDCA
- Plan: Nulmeting kWh/CO2 per workload; optimalisatieplan en lifecycle-kalender; leveranciersselectie circulair. (W-11)
- Do: Rightsizing, auto-scaling, reserved/savings, workload consolidatie; circulaire vervanging. (W-05, W-11)
- Check: Maandelijkse rapportage KPI-6..9; validatie meetdata. (W-11)
- Act: Bijsturen op afwijkingen, nieuwe optimalisaties (spot, serverless waar passend), herprioritering vervangingen. (W-11)

3) Risicobeheersing — PDCA
- Plan: ISMS-risicobeoordeling, SoA, BCM/DR-strategie, DPIA-ondersteuning. (W-01, W-06, W-10)
- Do: SOC/SIEM use-cases, hardening, back-up/restore tests, awareness, VOG-controle. (W-02, W-10)
- Check: Interne audits, DR-testen 2×/jaar, KPI-10..13, directiebeoordeling. (W-01, W-06)
- Act: Corrigerende maatregelen, update risicoregister, aanpassing controls/playbooks. (W-01, W-02)

4) Prijs — PDCA
- Plan: TCO-baseline en besparingsroadmap; prijs- en indexatieclausules; forecastmodel. (W-12)
- Do: Rightsizing en contractoptimalisatie; maandelijkse kostenbewaking. (W-05, W-12)
- Check: Kwartaalreview KPI-14..16; afwijkingen en drivers. (W-04, W-12)
- Act: Inregelen nieuwe besparingsmaatregelen; bijsturen consumptie en reserveringen. (W-05, W-12)

Scoringsmethodiek per criterium
- Kwaliteit, Duurzaamheid, Risicobeheersing: kwalitatieve beoordeling op 0–10 volgens schaal, door beoordelingscommissie, met nadruk op mate van overschrijding van minimumeisen, SMART KPI’s, bewezen uitvoerbaarheid en PDCA-borging. Score per criterium vermenigvuldigd met wegingspercentage.
- Prijs: lineair genormaliseerd model: Score Prijs = (Pmin / Poffer) × 10. Weging 20%. P omvat: vast managed service maandfee, uurtarieven, verwachte verbruikskosten (op basis van afgesproken baseline), en optionele posten conform Annex IX voor hardwareleveringen (indien van toepassing). Indexatie conform cap (3%) na jaar 1. Exit-kosten: 0.

Borging KO- en minimumeisen (conform uitvraag)
- KO ISO 27001: Geborgd via W-01 (ISMS) met geldig certificaat; processen voor beheer, onderhoud en security vallen binnen scope.
- KO VOG: HR-proces geborgd; VOG vereist en gecontroleerd voor operationele medewerkers (W-10).
- SLA-responstijd < 1 uur bij storingen: Overperform via KPI-2 (≤ 15 min); proces W-03 en W-09.
- 24/7 monitoring en support: W-02 (SIEM/NOC) en W-09 (servicedesk).
- Minimaal 99,8% beschikbaarheid: Overperform via KPI-1 (≥ 99,95%) en architectuur W-05/W-06.
- Minimaal 2 onderhoudsmomenten/jaar: Geborgd via W-07; we plannen 4 per jaar met minimale impact.
- Gebruik Microsoft Azure (NL datacenters): W-05; workloads in West/North Europe, data residency NL/EU bevestigd.
- Periodieke rapportage beveiligingsincidenten: W-10; maandelijks rapport, P1 post-mortems binnen 5 werkdagen.

Maatregelen (W-xx) overzicht
- W-01 ISMS/ISO 27001-borging en jaarlijkse audits.
- W-02 24/7 Monitoring en SOC/SIEM met playbooks en alerting ≤ 5 min.
- W-03 Incident- en Major Incident Management (ITIL4), inclusief problem management.
- W-04 Service Level Management en maand-/kwartaalrapportages.
- W-05 Azure NL landing zone, rightsizing, auto-scaling en zone-redundantie.
- W-06 High Availability en Disaster Recovery (RTO ≤ 4u, RPO ≤ 15m), DR-test 2×/jaar.
- W-07 Patch- en Change Management, 4 onderhoudsvensters/jaar.
- W-08 Onboarding en kennisoverdracht (10 key users getraind binnen 90 dagen; KPI-17 ≥ 90% geslaagd).
- W-09 24/7 Servicedesk NL/EN, P1 pick-up ≤ 60s.
- W-10 Security-rapportage, DPIA-ondersteuning en VOG-borging.
- W-11 Duurzaamheidsprogramma (kWh/CO2, circulair, rapportage).
- W-12 Prijs- en TCO-transparantie, indexatiecap, benefit tracking.

KPI ↔ Risico ↔ Bewijs (kruisverbanden)
- KPI-1..5 mitigeren RS-01/RS-03/RS-04; bewijs: SLA-rapporten, monitoringexports, changekalender.
- KPI-6..9 mitigeren RS-05/RS-06/RS-07; bewijs: nulmeting en trendrapportages, leveranciersverklaringen.
- KPI-10..13 mitigeren RS-02/RS-08/RS-09/RS-10; bewijs: ISO-certificaat, DR-testverslagen, post-mortems, HR/VOG-logs.
- KPI-14..16 mitigeren RS-11/RS-12/RS-13; bewijs: prijsmatrix, TCO-tracking, contractclausules.

Rapportage- en overlegstructuur
- Maandelijks: SLA/KPI-rapportage (Kwaliteit, Risico, Duurzaamheid, Kosten).
- Kwartaal: Service Review met roadmap, benefit tracking TCO, audit- en risicoupdate.
- Halfjaarlijks: Strategische evaluatie en PDCA-verbeterplan; herijking KPI’s indien overeengekomen.
- Ad hoc: P1/P2 post-mortem binnen 5 werkdagen.

Continuïteit en exit
- Actieve failover en back-ups conform W-06, getest 2×/jaar.
- Exit zonder beëindigingskosten, overdracht van documentatie/runbooks en rechten op IaC-artefacten; overdracht binnen 30 dagen na opzeg.

Assumpties en uitsluitingen
- Assumpties: Toegang tot alle huidige IT-systemen vanaf start; NVAO levert acceptatie-contactpersoon; up-to-date documentatie beschikbaar bij start.
- Uitsluitingen: Applicatieontwikkeling buiten scope; hardwareleveringen uitsluitend conform Annex IX.

Samenvatting onderscheidend vermogen
- Bovenwettelijke servicelevels (≥ 99,95%, P1 ≤ 15 min, P1-oplossing ≤ 120 min).
- Verifieerbare duurzaamheid (20% kWh en 25% CO2 reductie).
- Sterke risicobeheersing (ISO 27001, SOC/SIEM, DR 2×/jaar, RTO/RPO hard).
- Transparant en voorspelbaar prijsmodel met aantoonbare TCO-daling (≥ 12% in 24 maanden).

Benodigde input: