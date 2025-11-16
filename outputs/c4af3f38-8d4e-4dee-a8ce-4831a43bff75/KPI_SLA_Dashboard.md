Titel: KPI/SLA Dashboard – Raamovereenkomst Catering- en Horecadiensten voor Gemeente Middenstad (ICT-infrastructuur en cloudbeheer door Uno Automatiseringsdiensten B.V.)

Normenkader W-xx (referenties in tabel)
- W-01: KO – ISO 27001 (geldig certificaat)
- W-02: KO – Personeel beschikt over VOG
- W-03: Must – SLA-responstijd < 1 uur bij storingen
- W-04: Must – 24/7 monitoring en support
- W-05: Must – Minimaal 99,8% beschikbaarheid van diensten
- W-06: Must – Minimaal 2 onderhoudsmomenten per jaar
- W-07: Must – Gebruik Microsoft Azure (NL datacenters)
- W-08: Must – Periodieke rapportage beveiligingsincidenten
- W-09: Deliverable – Plan van Aanpak
- W-10: Deliverable – Risicodossier
- W-11: Deliverable – KPI-overzicht
- W-12: SLA – Oplostijd ≤ 4 uur voor kritische incidenten
- W-14: EMVI-criterium – Duurzaamheid
- W-15: Continuïteit – Back-up & herstel/BCP-test
- W-16: EMVI-criterium – Prijs & factuurtransparantie

KPI/SLA Tabel
| KPI/SLA | Target | Meetmethode | Frequentie | Escalatie | Verantwoordelijke | Link W-xx/criterium | Meetbron |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 1. Beschikbaarheid productie-diensten | ≥ 99,80% per kalendermaand (excl. goedgekeurd onderhoud) | Uptime via Azure Monitor/Service Health; formule: (beschikbare tijd – impact P1/P2)/totale tijd | Dagelijks (dashboard) en maandelijks (rapport) | <99,8%: binnen 2 werkdagen RCA en herstelplan; bij 2 opeenvolgende maanden: verbeterplan en MT-escalatie binnen 3 werkdagen | Service Delivery Manager (SDM) | W-05; EMVI-Kwaliteit | CMMS / Audit / Sensor |
| 2. Responstijd P1-storing | ≤ 60 minuten 24/7 (acknowledge + inzet engineer) | Ticket-tijdstempels (aanmelding→acknowledge→toewijzing) | Realtime; maandelijks analyse | Waarschuwing ≥45 min; >60 min: Incident Manager-escalatie direct; rapportage aan opdrachtgever binnen 1 werkdag | Incident Manager 24/7 | W-03, W-04 | CMMS / Audit / Sensor |
| 3. Oplostijd P1-storing | ≤ 4 uur MTTR per incident | Ticketdata; MTTR per P1 | Realtime; maandelijks | >3 uur: escalatie naar Operations Lead; >4 uur: SDM en Vendor Mgmt; RCA binnen 2 werkdagen | Operations Lead | W-12; EMVI-Risico | CMMS / Audit / Sensor |
| 4. 24/7 monitoring-dekking | ≥ 99,9% agent/heartbeat en alerting-actief | NOC tooling heartbeats, alert-onderdrukking logs | Dagelijks | <99,9% gedurende 24 uur: NOC Lead-escalatie; binnen 1 werkdag herstelmaatregel | NOC Lead | W-04; EMVI-Kwaliteit | CMMS / Audit / Sensor |
| 5. Change succesrate | ≥ 98% changes zonder verstoring of rollback | CAB-registraties; % changes met geen P1/P2 impact | Maandelijks | <98%: Change freeze op risicovolle categorie; CAPA binnen 5 werkdagen | Change Manager | W-06; EMVI-Risico | CMMS / Audit / Sensor |
| 6. Kritieke patching (CVE critical) | 100% gepatcht ≤ 7 kalenderdagen | Defender for Cloud/Vuln. scans | Wekelijks | <100% dag 8: Security Officer-escalatie; compenserende maatregel binnen 48 uur | Security Officer | W-01, W-08; EMVI-Risico | CMMS / Audit / Sensor |
| 7. High/Medium kwetsbaarheden | High: ≤14 dagen; Medium: ≤30 dagen 95% gesloten | Vulnerability management rapporten | Wekelijks; maandelijks rapport | Drempel niet gehaald: risicowaardering herzien en prioriteringsworkshop binnen 5 werkdagen | Security Officer | W-01, W-08 | CMMS / Audit / Sensor |
| 8. Back-up succesratio | ≥ 99,5% van geplande jobs succesvol | Azure Backup job status | Dagelijks | <99,5%: herstelactie binnen 24 uur; bij herhaling 3×/maand: DR review | Backup & Recovery Lead | W-15; EMVI-Risico | CMMS / Audit / Sensor |
| 9. Hersteltests (RTO/RPO) | Jaarlijkse DR-test: RTO ≤ 4 uur (tier-1), RPO ≤ 15 min (tier-1) | Geplande testverslagen, meetklokken | Jaarlijks; kwartaal readiness check | Falen test: binnen 10 werkdagen verbeterplan en hertest binnen 30 dagen | Cloud Architect | W-15; EMVI-Kwaliteit | CMMS / Audit / Sensor |
| 10. Herhaalincidenten | ≤ 5% herhaal-P2/P3 binnen 30 dagen | Problem management, KEDB | Maandelijks | >5%: problem review en permanente maatregel binnen 10 werkdagen | Problem Manager | W-09, W-10; EMVI-Kwaliteit | CMMS / Audit / Sensor |
| 11. Security incidentrapportage | Volledig rapport binnen 5 werkdagen na maandultimo; P1 direct | SIEM/IR-rapporten; DLP/AV-statistiek | Maandelijks; P1 realtime | Te laat/onvolledig: SDM-escalatie en corrigerende actie binnen 2 werkdagen | Security Officer | W-08, W-11; EMVI-Risico | CMMS / Audit / Sensor |
| 12. Gepland onderhoud | ≥ 2 onderhoudsmomenten/jaar; notificatie ≥ 10 werkdagen vooraf; impact ≤ 4 uur/venster | CAB kalenders; notificatielogs | Per event; kwartaal rapportage | Te late melding/overschrijding: CAB-escalatie en compensatieplan | Change Manager | W-06; EMVI-Kwaliteit | CMMS / Audit / Sensor |
| 13. Datacenterlocatie NL | 100% productie-workloads in Azure NL-regio’s (Policy compliant) | Azure Policy compliance; resource locatie audit | Wekelijks; maandelijks | Drift >0%: direct lock-down en remediatie binnen 24 uur | Cloud Architect | W-07; EMVI-Risico | CMMS / Audit / Sensor |
| 14. CSAT support | Gemiddelde ≥ 8,0/10; respons ≥ 30% | Post-ticket survey; NPS light | Maandelijks; per kwartaal in SRM | <8,0: klantreissessie en verbeteracties binnen 20 werkdagen | SDM | EMVI-Kwaliteit | CMMS / Audit / Sensor |
| 15. Duurzaamheid – energie/emissie | -5% YoY kWh/werkload of CO2e/werkload (scope 2) t.o.v. baseline; 100% rapportage | Leveranciersrapporten, Azure sustainability dashboards | Per kwartaal | Geen daling 2 kwartalen: optimalisatieproject (right-sizing/auto-scaling) binnen 30 dagen | Sustainability Lead | W-14; EMVI-Duurzaamheid | CMMS / Audit / Sensor |
| 16. Service requests afhandeling | 80% standaard SR’s afgehandeld ≤ 8 werkuren; 95% ≤ 3 werkdagen | ITSM-rapportages (categorie SR) | Wekelijks; maandelijks | <80%: capaciteitsherijking en procesaanpassing binnen 10 werkdagen | SDM | EMVI-Kwaliteit/Prijs | CMMS / Audit / Sensor |
| 17. Factuurtransparantie | 100% facturen 1:1 herleidbaar naar prijscatalogus; 0 niet-geaccordeerde posten | 3-way match: contract/cataloog/factuur | Maandelijks | Afwijking: correctiefactuur binnen 5 werkdagen; bij 2×/kwartaal: Finance escalation | Finance Controller | W-16; EMVI-Prijs | CMMS / Audit / Sensor |
| 18. AVG & toegangsbeheersing | 100% MFA voor beheerders; 0 delende admin-accounts; toegang beëindigd ≤ 4 uur na uitdienst | Azure AD logs; IAM-audits | Maandelijks | Overtreding: direct blokkeren; DPIA-review binnen 5 werkdagen | Security Officer/DPO | W-01 (ISMS), EMVI-Risico | CMMS / Audit / Sensor |
| 19. Capaciteitsmanagement | ≤ 70% gemiddelde CPU/memory per kritieke workload; pieken ≤ 85% | Azure Monitor; trendanalyse | Wekelijks | Overschrijding 2 weken: schaalmaatregel of tuning binnen 5 werkdagen | Cloud Architect | EMVI-Kwaliteit/Prijs | CMMS / Audit / Sensor |
| 20. Documentatie-actualiteit | 100% kritieke runbooks en CMDB up-to-date (update ≤ 5 werkdagen na wijziging) | CMDB audits; documentcontrole | Maandelijks | <100%: change hold op betroffen componenten tot herstel | SDM/Change Manager | W-09, W-11; EMVI-Risico | CMMS / Audit / Sensor |

PDCA-borging
- Plan: Voor contractstart wordt Plan van Aanpak (W-09), Risicodossier (W-10) en KPI-overzicht (W-11) vastgesteld met baselines (beschikbaarheid, volumes, workloads). Per KPI zijn definities, databronnen en drempels vastgelegd. Jaarplan serviceverbetering wordt overeengekomen.
- Do: 24/7 operatie conform W-04 met geautoriseerde changes (CAB), geautomatiseerde monitoring en incidentrespons. Azure NL-regio’s enforced via Azure Policy (W-07). Patching- en back-upprocessen draaien volgens vaste kalenders.
- Check: Dagelijkse dashboards, wekelijkse operationele checks, maandelijkse service reviews (alle KPI’s), kwartaal-rapportage duurzaamheid (W-14) en halfjaarlijkse interne audit ISO 27001 (W-01). Afwijkingen leiden tot RCA’s binnen 2 werkdagen waar van toepassing.
- Act: Corrigerende en Preventieve Acties (CAPA) worden binnen 5 werkdagen na RCA gepland en binnen 30 dagen geïmplementeerd. Bij herhaling of structurele trend: verbeterproject met eigenaar, mijlpalen en meetbare doelstellingen.

Escalatie-ladder (aanvullend kader)
- Operationeel: Engineer/NOC → Incident Manager (direct bij drempeloverschrijding).
- Tactisch: Service Delivery Manager binnen 1 werkdag met CAPA.
- Strategisch: MT/Contractmanager binnen 3 werkdagen bij herhaaldelijke KPI-breuk of impact op beschikbaarheid/veiligheid.
- Externe leveranciers (bijv. Microsoft): Vendor Management schakelt binnen 1 uur bij P1-impact.

Kruisverbanden W-xx ↔ Risico ↔ Bewijs
- W-01 ISO 27001: Risico databeveiliging; Bewijs: geldig certificaat, auditrapporten, ISMS-controles, risico- en behandelplannen.
- W-02 VOG: Risico insider threat; Bewijs: geanonimiseerde VOG-verklaringen per medewerker, HR-controlelijsten.
- W-03 Responstijd < 1 uur: Risico langere impact; Bewijs: ITSM-tijdstempels, P1 wachttijd-rapporten.
- W-04 24/7 monitoring: Risico onopgemerkte storingen; Bewijs: NOC-roosters, heartbeat-overzichten, alertlogboeken.
- W-05 Beschikbaarheid 99,8%: Risico dienstonderbreking; Bewijs: Uptime-rapporten Azure, event logs, SLA-berekeningen.
- W-06 Onderhoud: Risico ongecontroleerde wijzigingen; Bewijs: CAB-minuten, notificaties, change kalender.
- W-07 Azure NL: Risico datalokatie/compliance; Bewijs: Azure Policy compliance, resource tags, export rapporten.
- W-08 Beveiligingsrapportage: Risico late detectie; Bewijs: SIEM-exports, IR-rapporten, vuln-scans.
- W-09 Plan van Aanpak: Risico onduidelijke uitvoering; Bewijs: vastgesteld PvA met planning en RACI.
- W-10 Risicodossier: Risico onvoldoende mitigatie; Bewijs: register met eigenaars, scores, maatregelen.
- W-11 KPI-overzicht: Risico onmeetbaarheid; Bewijs: KPI-dictionary, dashboards, meetprotocollen.
- W-12 Oplostijd P1 ≤ 4 uur: Risico langdurige onderbreking; Bewijs: MTTR-rapporten, RCA’s.
- W-14 Duurzaamheid: Risico hogere milieu-impact/kosten; Bewijs: energierapporten leverancier, Azure sustainability data, optimalisatieverslagen.
- W-15 Continuïteit: Risico dataverlies; Bewijs: back-up rapporten, DR-testverslagen, RTO/RPO-metingen.
- W-16 Prijstransparantie: Risico factuurdisputen; Bewijs: prijscatalogus, 3-way match logs, goedkeuringsstroom.

Toelichting meet- en rapportageproces
- Databronnen: Azure Monitor/Policy/Backup, ITSM, SIEM/Defender for Cloud, financiële systemen.
- Validatie: SDM valideert maandrapportage; Security Officer valideert security/KPI’s; opdrachtgever ontvangt rapportage binnen 5 werkdagen na maandultimo.
- Continuous improvement: trends worden geanalyseerd; acties en effecten worden in de daaropvolgende review gemeten en bijgestuurd.

Benodigde input: