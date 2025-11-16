Planning

ASCII-Gantt — Transitie, Go-Live en Exploitatie (inclusief gate-reviews en mijlpalen)
Tijd-as: weken (transitie) en kwartalen (exploitatie)

Transitie & Go-Live (detail, 2025-12-02 t/m 2026-03-01)
Weken:      49  50  51  52 | 01  02  03  04  05  06  07  08
Datums:     12/2           | jan 2026                             feb 2026
Gates:      G0     G1           G2                    G3                G4
             |      |            |                     |                 |
P0 Inkoopoverdracht & Kick-off
            [====]
P1 Due Diligence & Discovery
            [===========]
P2 HLD + Security SoA (ontwerp & akkoord)
                 [======]
P3 LLD & Build Azure (NL-regio’s)
                        [=========]
P4 Migratie & Acceptatie (OTAP/UAT)
                                  [=======]
P5 Go-Live & Hypercare
                                            [=========]

Legenda (transitie):
- G0: 2025-12-02 Kick-off (contractoverdracht, governance, communicatieplan)
- G1: 2025-12-23 HLD & Security SoA akkoord (architectuur, RTO/RPO, policies)
- G2: 2026-01-12 Readiness (monitoring 24/7 actief, runbooks P1–P3 gereed, VOG’s gecontroleerd)
- G3: 2026-02-01 Go-Live (productiediensten actief in Azure NL, SLA’s ingeschakeld)
- G4: 2026-03-01 Hypercare exit (alle P1/P2-storingen 0 open, acceptatie door NVAO)

Exploitatie & Continue Verbetering (2026-02-01 t/m 2030-01-31)
Kwartalen:   2026 Q1 Q2 Q3 Q4 | 2027 Q1 Q2 Q3 Q4 | 2028 Q1 Q2 Q3 Q4 | 2029 Q1 Q2 Q3 Q4 | 2030 Q1
P6 Exploitatie (24/7 monitoring, beheer, support)
             [===============================================================>
Vaste mijlpalen per jaar:
- Mar/Sept: Gepland Onderhoudsvenster (patch/changes, 2x per jaar)       ^    ^   ^    ^   ^    ^   ^    ^
- Okt:      Jaarlijkse Disaster Recovery Test (tabletop + failover waar passend)        ^         ^         ^
- Ieder kwartaal (einde Q): QBR + SLA-rapport + security-rapportage                    ^  ^  ^  ^  ^  ^  ^  ^

SMART planning en PDCA-gestuurd uitvoeren
Plan (G0–G2)
- Doel: per 2026-01-12 100% zicht op assets, risico’s en ontwerp; akkoord op HLD/SoA.
- Activiteiten: inventarisatie alle diensten en koppelingen; HLD (netwerk, identity, back-up, logging, RTO/RPO); Security Statement of Applicability conform ISO 27001; risicoanalyse; meetplan KPI’s; acceptatiecriteria.
- Output (bewijs): HLD v1.0 (12/23), SoA v1.0 (12/23), Risicodossier v1.0 (12/23), Assetlijst v1.0 (12/20).

Do (G2–G3)
- Doel: per 2026-02-01 productie gereed in Azure NL met 24/7 monitoring, runbooks en servicedesk.
- Activiteiten: LLD en build landing zone (Azure Policy: alleen West/North Europe NL); inrichten Azure Monitor/Sentinel; ITSM-koppelingen; uitvoeren migratiewaves; UAT en performance/meting baseline.
- Output (bewijs): LLD v1.0 (01/05), Monitoring dashboards live (01/10), UAT-protocol met 100% geslaagde testcases (01/31), Go-Live checklist getekend (02/01).

Check (G3–G4 en doorlopend)
- Doel: aantoonbaar voldoen aan SLA’s en securityrapportage zonder afwijkingen.
- Activiteiten: 24/7 bewaking; maandrapportage beschikbaarheid/responstijden; maandelijks security-incidentenoverzicht; QBR per kwartaal; interne audits ISO 27001-controles.
- Output (bewijs): SLA-rapporten (maandelijks), Security-rapport (maandelijks), QBR-notulen (kwartaal), auditbevindingen en verbeteracties.

Act (doorlopend)
- Doel: structurele verbetering en risicoverlaging.
- Activiteiten: CAB/CIAB tweemaandelijks; lessons learned; wijzigingsvoorstellen; tuning monitoring/dashboards; duurzaamheid-optimalisaties (CPU/RAM right‑sizing, reserved instances).
- Output (bewijs): CSIP backlog (levend document), CAB-besluiten, gerealiseerde verbeteringen, CO2‑/energie‑rapportage.

Kruisverband W-xx ↔ KPI ↔ Risico ↔ Bewijs
- W-01 Kick-off & governance (12/02–12/06)
  KPI: KPI-06 24/7 monitoring actief per 2026-01-12
  Risico: R-06 Onheldere escalaties
  Bewijs: RACI, communicatieplan, Major Incident Procedure (12/06)
- W-02 Discovery & asset-baseline (12/02–12/20)
  KPI: KPI-01 Beschikbaarheid ≥99,8%
  Risico: R-07 Onvolledige scope → uitval
  Bewijs: Volledige CMDB/assetlijst met 100% match op steekproef (12/20)
- W-03 HLD & SoA akkoord (12/09–12/23)
  KPI: KPI-04 Securityrapportage maandelijks
  Risico: R-08 Ontwerpfout → kwetsbaarheid
  Bewijs: HLD v1.0, SoA v1.0 getekend (12/23)
- W-04 Azure landing zone NL (12/23–01/12)
  KPI: KPI-01 Beschikbaarheid; compliance datalocatie
  Risico: R-01 Datarezidentie-afwijking
  Bewijs: Azure Policy: allowedLocations=NL, compliance report (01/12)
- W-05 Security hardening & IAM (12/23–01/12)
  KPI: KPI-04 Security-incidenten geregistreerd
  Risico: R-04 Onvoldoende detectie
  Bewijs: Sentinel use-cases, baselines, Just‑In‑Time toegang logs (01/12)
- W-06 Monitoring + runbooks + ITSM (01/02–01/12)
  KPI: KPI-02 Responstijd ≤1 uur; KPI-03 Oplostijd P1 ≤4 uur
  Risico: R-02 Onvoldoende bezetting
  Bewijs: 24/7 rooster, runbooks P1–P3, ITSM-metrics (01/12)
- W-07 Migratie & UAT (01/13–01/31)
  KPI: KPI-01 Beschikbaarheid (geen niet-geplande downtime)
  Risico: R-09 Migratie-uitloop
  Bewijs: UAT-rapport 100% geslaagd, Change-records (01/31)
- W-08 Go-Live & Hypercare (02/01–03/01)
  KPI: KPI-02/03 gehaald bij alle P1/P2
  Risico: R-10 Kinderziektes
  Bewijs: Hypercare-log, dagrapportage, nulmeting SLA (03/01)
- W-09 Rapportage & QBR (doorlopend, maandelijks/kwartaal)
  KPI: KPI-01..04 beschikbaar t/m vorige maand binnen 5 k.d.
  Risico: R-11 Besluitvorming vertraging
  Bewijs: SLA- en security-rapporten, QBR-notulen
- W-10 Geplande onderhoudsvensters + DR-test
  KPI: KPI-05 2 onderhoudsmomenten/jaar (Mar/Sep)
  Risico: R-05 Change-falen
  Bewijs: CAB-minuten, changelog, DR-testverslag (jaarlijks oktober)

SLA, KO- en MUST-conformiteit geborgd in planning
- KO: ISO 27001 — geborgd via SoA, interne audits en security-controls vanaf HLD (G1) en readiness (G2).
- KO: VOG — gecontroleerd vóór G2; alleen personeel met geldige VOG op dienst.
- MUST: 24/7 monitoring & support — actief vóór G2 en doorlopend in P6.
- MUST: Beschikbaarheid ≥99,8% — ontwerp (redundantie), onderhoudsvensters (Mar/Sep), monitoring en rapportage.
- MUST: Responstijd <1 uur / Oplostijd ≤4 uur (kritiek) — ITSM, roosters, runbooks en escalatiepaden.
- MUST: Azure NL datacenters — enforced met Azure Policy en deployment restricties.
- MUST: Periodieke security-rapportage — maandelijks opgenomen in rapportagekalender.
- MUST: Min. 2 onderhoudsmomenten/jaar — vastgelegd Mar/Sep met communicatie T-10 werkdagen.

Mijlpalen en deliverables (selectie, met datum)
- 2025-12-23: HLD v1.0 + SoA v1.0 akkoord (G1)
- 2026-01-12: Readiness-rapport (G2)
- 2026-01-31: UAT-rapport en Go-Live checklist gereed
- 2026-02-01: Go-Live (G3)
- 2026-03-01: Hypercare Exit & acceptatie (G4)
- Maandelijks: SLA- en security-rapport
- Kwartaal: QBR, PDCA-verbeterlijst
- Jaarlijks: DR-test (oktober) en jaarreview

KPI-overzicht (meting en rapportage)
- KPI-01 Beschikbaarheid ≥99,8% per kalendermaand, bron: Azure Monitor, ITSM.
- KPI-02 Responstijd ≤1 uur bij storingen, 95e percentiel per maand, bron: ITSM.
- KPI-03 Oplostijd P1 ≤4 uur, 90e percentiel per maand, bron: ITSM.
- KPI-04 Security-incidenten: 100% geregistreerd en gerapporteerd per maand, bron: Sentinel/Defender.
- KPI-05 Onderhoudsvensters: 2/jaar uitgevoerd en gecommuniceerd ≥10 werkdagen vooraf, bron: CAB/changerecords.
- KPI-06 24/7 monitoring: 100% actief, heartbeat <60s, bron: monitoring health.

Benodigde input: