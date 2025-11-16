Planning — Raamovereenkomst Catering- en Horecadiensten voor Gemeente Middenstad (EMVI)

ASCII-Gantt (schaal A: weken 0–26, transitie/pilot/uitrol; schaal B: kwartalen tot 48 maanden, exploitatie/exit)

Schaal A (Weken, T0 = gunningsdatum)
Legend: = werk, [Gx]=Gate review, (Mx)=Mijlpaal, ^ review

Wk:    00 02 04 06 08 10 12 14 16 18 20 22 24 26
------------------------------------------------------------
W-01 Initiatie & contractering
       |====| [G1]
W-02 Transitieplan & mobilisatie
            |==========| (M1 Arch&Sec T0+4w) (M2 Test T0+6w)
W-03 Security & privacy-inrichting (ISO27001, DPIA, IAM)
                |========| (M3 IAM live T0+8w)
W-04 Test & Acceptatie (FAT/SAT/UAT)
                     |====| [G2 Go/No-Go Pilot]
W-05 Pilot 2 locaties
                           |====| (M4 Pilot evaluatie T0+14w) [G3]
W-06 Gefaseerde uitrol alle locaties
                               |==============| (M5 50% T0+20w) (M6 100% T0+26w) [G4]
W-07 Training & adoptie (key-users, e-learning)
                         |==============|
W-08 Service desk & monitoring steady state
                                         |-----> start BAU
Kwartaalreviews (PDCA)
               ^Q1          ^Q2          ^Q3          ^Q4

Schaal B (Kwartalen, T0 = gunningsdatum; duur raamovereenkomst 48 maanden)
Legend: ==== exploitatie, * KPI-rapportage, ^ QBR, [Gx] gate

Qtr:   Q1  Q2  Q3  Q4 | Y2-Q1 Y2-Q2 Y2-Q3 Y2-Q4 | Y3-Q1 Y3-Q2 Y3-Q3 Y3-Q4 | Y4-Q1 Y4-Q2 Y4-Q3 Y4-Q4
---------------------------------------------------------------------------------------------------
W-08 Exploitatie & continue verbetering (SIP)
       ====*^====*^====*^====*^====*^====*^====*^====*^====*^====*^====*^====*^====*^====*^====*^====*^
W-09 Audits & evaluaties (ISO 9001/27001, pen-test, jaarrapport)
          ==     ==     ==     [G5 Jaarreview]   ==     ==     ==     [G5]         ==     ==     == [G5]
W-10 Duurzaamheid (paperless facturatie, energie/KPI)
       ==  ==  ==  ==      ==  ==  ==  ==        ==  ==  ==  ==        ==  ==  ==  ==
W-11 Exit & kennisoverdracht (voorbereiding vanaf maand 45)
                                                                                           === [G6 Exit Go/No-Go] (M7 Exit-acceptatie m48)

Gate reviews en mijlpalen (SMART, acceptatiecriteria)
- G1 Kick-off & contractbevestiging (T0+2w): Plan van Aanpak (versie 1.0) en RASCI vastgesteld; 100% contractdocumenten ondertekend.
- M1 Architectuur- & Securityplan (T0+4w): goedgekeurd door opdrachtgever; alle interfaces, IAM-rollen en logging gedefinieerd.
- M2 Testomgeving opgeleverd (T0+6w): 100% functionele keten beschikbaar; monitoring actief; back-up getest (1 succesvolle hersteltest < 30 min RTO).
- M3 IAM live (T0+8w): 100% key-users aangemaakt; 2FA verplicht; DPIA afgerond zonder hoog-risico resterend.
- G2 Go/No-Go Pilot (T0+10w): 0 kritieke en ≤3 hoge open issues met workaround; UAT-dekking ≥95%.
- M4 Pilot evaluatie (T0+14w): SLA-halen over 2 weken: beschikbaarheid ≥99,8% in openingsuren; CSAT pilot ≥8,0; adoptie ≥90% key-users.
- G3 Vrijgave landelijke uitrol (T0+14w): pilotcriteria behaald; rollback-plan getest.
- M5 50% locaties live (T0+20w): opleverchecklist per locatie 100%; veiligheid & toegangsrechten gecontroleerd.
- M6 100% locaties live (T0+26w): alle locaties productierijp; 0 kritieke open punten; overdracht naar BAU afgerond.
- G4 Steady-State (T0+26w): SLA-rapportage maand 1 aangeleverd; processen incident/change/problem actief.
- G5 Jaarlijkse contractreview (jaarlijks, Q4): KPI’s ≥95% gehaald; verbeterplan met 3 bewezen PDCA-verbeteringen; keten-pen-test uitgevoerd en bevindingen opgevolgd.
- G6 Exit Go/No-Go (maand 47): exit-runbook compleet; datamigratie-proef succesvol; kennisoverdracht ≥95% gedekt.
- M7 Exit-acceptatie (maand 48): exitcriteria gehaald; alle assets en documentatie overgedragen en bevestigd.

PDCA-borging (procesniveau)
- Plan: W-02 Transitieplan, risicoregister en KPI-baseline; W-03 Securityplan en DPIA.
- Do: W-05 Pilot, W-06 Uitrol, W-07 Training, W-08 Exploitatie.
- Check: Maandelijkse KPI- en SLA-rapportages; ^QBR per kwartaal met trendanalyses en klanttevredenheid.
- Act: Service Improvement Plan (SIP) met prioritering op top-3 knelpunten per kwartaal; herconfiguratie/automation binnen 4 weken na QBR-besluit.

KPI’s (met meetwijze en norm)
- K-01 Tijdige oplevering: 100% locaties live ≤ T0+26 weken (bron: rollout-register).
- K-02 Beschikbaarheid keten in openingsuren: ≥99,8% per maand, 06:30–20:00 (bron: monitoring).
- K-03 Incidentrespons P1: start <15 min, herstel <4 uur; P2 herstel <8 uur (bron: ITSM-tool).
- K-04 First-Time-Right transacties: ≥98% (bron: kassalog/telemetrie).
- K-05 CSAT eindgebruikers: ≥8,0/10, n≥50 per kwartaal (bron: survey).
- K-06 Change-succesratio: ≥95% zonder incident-impact binnen 7 dagen (bron: CAB/ITSM).
- K-07 Duurzaamheid: 100% digitale bon/factuur; <0,8 kWh/1000 transacties (bron: platforminstelling/energiemeting).
- K-08 Compliance: 0 Major non-conformities in ISO-audit en pen-test high findings opgelost <30 dagen (bron: auditrapporten).

Toprisico’s en beheersing (SMART)
- R-01 Leververtraging hardware/voorzieningen: dual-sourcing, buffer 10% stock; mitigatie: vervangbare devices; trigger: levertijd >10 dagen; restkans laag.
- R-02 Locatietoegang en vensterbeperkingen: nacht/weekend-vensters contractueel vastleggen; escalatieladder; OKR: 100% locaties met toegangspas en vensters in W-06 week 1.
- R-03 Beveiligingsincident: Zero-trust configuratie, 2FA, least privilege; oefening herstel 2x/jaar; MTTD <5 min, MTTR <4 uur.
- R-04 Adoptie/acceptatie: key-user programma, e-learning; target: ≥90% adoptie binnen 2 weken per locatie.
- R-05 Capaciteitspieken (evenementen): auto-scaling; capaciteitstest >150% piek; target: geen prestatie-incidenten categorie P1/P2 tijdens events.
- R-06 Contractuele KPI mismatch: KPI-workshop T0+1w; baseline en meetdefinities vastleggen vóór G1.

Kruisverwijzing W-xx ↔ KPI ↔ Risico ↔ Bewijs
- W-01 Initiatie & contractering ↔ K-01,K-06,K-08 ↔ R-06 ↔ B-01 ISO-certificaten, B-07 Verwerkersovereenkomst, B-08 RASCI/contractdossier.
- W-02 Transitieplan & mobilisatie ↔ K-01 ↔ R-01,R-02 ↔ B-02 Goedgekeurd Transitieplan, B-08 Projectplanning en CAB-logs.
- W-03 Security & privacy ↔ K-08 ↔ R-03 ↔ B-01 ISO 27001-certificaat, B-05 Pen-testrapport, B-03 DPIA-rapport.
- W-04 Test & Acceptatie ↔ K-04,K-06 ↔ R-01,R-03 ↔ B-04 Testrapporten (FAT/SAT/UAT), B-02 Go/No-Go-verslag G2.
- W-05 Pilot ↔ K-02,K-05 ↔ R-04 ↔ B-06 Pilot-SLA-rapport, B-03 Opleidingslog/key-user feedback.
- W-06 Uitrol ↔ K-01,K-02 ↔ R-01,R-02,R-05 ↔ B-02 Opleverchecklists per locatie, B-04 Monitoring-screenshots.
- W-07 Training & adoptie ↔ K-05 ↔ R-04 ↔ B-03 Opleidingscertificaten, E-learning completion ≥90%.
- W-08 Exploitatie & monitoring ↔ K-02,K-03,K-06 ↔ R-03,R-05 ↔ B-06 Maand-SLA’s, B-04 Monitoring/alerting exports.
- W-09 QBR/PDCA ↔ K-01..K-08 ↔ R-06 ↔ B-06 QBR-decks, SIP backlog met owners en deadlines.
- W-10 Duurzaamheid ↔ K-07 ↔ R-01,R-05 ↔ B-06 Duurzaamheidsrapport per kwartaal, energiemetingen.
- W-11 Exit & kennisoverdracht ↔ K-08 ↔ R-01,R-06 ↔ B-02 Exit-runbook, B-02 Acceptatieformulier exit, overdrachtsinventaris.

Bewijslast (overzicht)
- B-01 Certificaten: ISO 9001, ISO 27001 (geldig en scope passend).
- B-02 Formele documenten: PvA, Transitieplan, Gate-verslagen, Exit-runbook.
- B-03 Privacy & opleiding: DPIA, verwerkersovereenkomst, opleidingslogs.
- B-04 Kwaliteit & techniek: testplannen/rapporten, back-up/hersteltests.
- B-05 Security: pen-test, hardening checklists, IAM-exports.
- B-06 Rapportages: maandelijkse SLA/KPI, kwartaal QBR, duurzaamheidsrapport.
- B-08 Sturing: CAB-logs, change-records, RASCI, risicoregister.

Toelichting (1 pagina)
Deze planning is ingericht om EMVI-waarde te maximaliseren via risicogestuurde transitie, een korte pilot met harde Go/No-Go-criteria en versneld schaalbare uitrol. We verankeren PDCA op maand- en kwartaalniveau en integreren duurzaamheid als vaste KPI-stroom (paperless en energie-intensiteit per transactie). De fasering maakt expliciet onderscheid tussen mobilisatie (W-01..W-04), validatie (W-05), schaal (W-06) en steady-state (W-08..W-10), met duidelijke gates G1–G6 die beslissingsmomenten en acceptatiecriteria borgen. SMART-criteria zorgen voor helderheid: elke mijlpaal heeft datum (relatief aan T0), meetbare norm (bijv. beschikbaarheid 99,8%), bron (monitoring/ITSM) en tolerantie (bijv. 0 kritieke issues). Risico’s zijn preventief ingedamd via dual-sourcing, strakke toegangsplanning, zero-trust en adoptieprogramma’s. Voor continuïteit leggen we nadruk op automatische monitoring, responstijden en change-succesratio. Kwartaalreviews evalueren prestaties, compliance en verbeteringen; beslissingen worden binnen 4 weken uitgevoerd om doorlooptijd van verbetermaatregelen kort te houden. De exitfase start tijdig (maand 45) om overdracht zonder verstoring te garanderen. Bewijslast is vanaf dag 1 geborgd: elke KPI koppelt aan objectieve bronnen (monitoring, ITSM, audits), terwijl ISO 9001/27001, pen-tests en DPIA de kwaliteit, veiligheid en compliance aantonen. Deze opzet vermindert implementatierisico, versnelt waardecreatie en maakt prestaties aantoonbaar, wat aansluit op de gunningscriteria Kwaliteit, Duurzaamheid en Risicobeheersing, met een transparante basis voor Prijs-prestatie.

Benodigde input: