Planning en Gantt-overzicht

Legenda:
- S==E: uitvoerperiode per werkpakket (S=start, E=einde, = doorlooptijd)
- *: mijlpaal
- Gate: formele besluitreview gekoppeld aan mijlpalen

Tijdsschaal (weken) vanaf 06-01-2026:
01 02 03 04 05 06 07 08 09 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25 26 27 28 29 30 31 32
Maanden:       Jan (01–04)  |  Feb (05–08)  |  Mrt (09–13)  |  Apr (14–17)  |  Mei (18–22)  |  Jun (23–26)  |  Jul (27–31)  |  Aug (32)

Mijlpalen:
M0 Kick-off (06-01-2026)      *                                                               
M1 Scope vastgesteld (24-01-2026)        *                                                    
M2 Ontwerp-go (24-02-2026)                               *                                    
M3 Realisatie-go (10-03-2026)                                      *                          
M4 Integratie-gereed (06-05-2026)                                                     *        
M5 Acceptatie start (09-06-2026)                                                              * 
M6 Oplevering/Go-Live (07-07-2026)                                                                   * 
M7 Eindreview en afsluiting (01-08-2026)                                                                        * 

Werkpakketten (W-01..W-08):
W-01 Initiatie & mobilisatie (06-01 t/m 24-01)   S=E                                                            
W-02 Analyse & requirements (27-01 t/m 21-02)         S==E                                                      
W-03 Architectuur & ontwerp (10-02 t/m 07-03)             S==E                                                  
W-04 Inrichting platform/infra (24-02 t/m 21-03)                S==E                                            
W-05 Ontwikkeling & configuratie (10-03 t/m 23-05)                    S=========E                                
W-06 Integratie & systeemtest (06-05 t/m 13-06)                                        S====E                    
W-07 Acceptatie & training (09-06 t/m 04-07)                                                   S==E              
W-08 Oplevering & nazorg (07-07 t/m 01-08)                                                            S==E       

Toelichting (gate-reviews, afhankelijkheden, aanpak)

Overzicht en fasering
De planning beslaat de periode 06-01-2026 tot en met 01-08-2026 en is opgezet in acht hoofdwerkpakketten (W-01 t/m W-08) met duidelijke mijlpalen en gate-reviews. De fasering kent gecontroleerde overlap waar dit risicoarm versnelt (bijv. W-02/W-03) en strikte volgordelijkheid waar nodig (bijv. W-05 → W-06 → W-07 → W-08).

Gate-reviews en beslismomenten
- Gate M0 Kick-off (06-01-2026): Startbesluit op basis van projectcharter, governance, teammobilisatie en geaccordeerde plan-van-aanpak. Producten uit W-01 worden gepland en kwaliteitscriteria afgestemd.
- Gate M1 Scope vastgesteld (24-01-2026): Einde W-01. Ingangscriteria: geaccordeerd Project Initiation Document, rollen & RACI, geprioriteerde backlog en planning. Uitgangscriterium: formele scope-freeze voor analyse.
- Gate M2 Ontwerp-go (24-02-2026): Na kernresultaten W-02 en eerste opleveringen W-03. Criteria: gevalideerde requirements (functioneel/niet-functioneel), risico-analyse, architectuurprincipes en keuzeplaatjes.
- Gate M3 Realisatie-go (10-03-2026): Start W-05. Criteria: ontwerp-baseline (HLD/LLD), ingerichte ontwikkelstraat (CI/CD), infra- en beveiligingskaders uit W-04 gereed, Definition of Ready voor backlog-items.
- Gate M4 Integratie-gereed (06-05-2026): Overgang naar W-06. Criteria: minimaal één end-to-end keten gerealiseerd, interface-contracten beschikbaar, technische debt onder afgesproken drempel, testomgevingen stabiel.
- Gate M5 Acceptatie start (09-06-2026): Start W-07. Criteria: succesvolle systeemtestrapportage, gedekte regressie, testdata en acceptatiecriteria gevalideerd, trainingsmateriaal draft gereed.
- Gate M6 Oplevering/Go-Live (07-07-2026): Start W-08. Criteria: getekende acceptatie, runbooks, monitoring en roll-back plan, CAB-goedkeuring en communicatieset voor stakeholders.
- Gate M7 Eindreview (01-08-2026): Projectafronding. Criteria: overdracht naar beheer (OTAP → P), lessons learned, benefits-tracking en contractuele opleverdossiers.

Afhankelijkheden en kritieke pad
- Kritieke pad: W-02 → W-03 → W-05 → W-06 → W-07 → W-08 met bijbehorende gates M2–M6. Vertraging in ontwerp of integratie werkt direct door op go-live.
- Overlap en parallelisatie:
  - W-02 en W-03 overlappen gericht: terwijl de functionele analyse (W-02) vordert, worden stabiele concepten al in het architectuurontwerp verwerkt (W-03). Dit versnelt zonder de kwaliteit te compromitteren door strikte versiebeheer en besluitlog.
  - W-04 start nadat ontwerpkeuzes voldoende vastliggen (M2) en loopt deels parallel aan het finetunen van het ontwerp; infra-as-code maakt iteratieve provisioning mogelijk.
- Externe afhankelijkheden:
  - Beschikbaarheid van koppelvlakken en testcertificaten bij ketenpartners (impact op W-06).
  - Lever- en doorlooptijden voor licenties en cloud-resources (impact op W-04).
  - CAB-vensters en change-freeze periodes rond go-live (impact op W-08).
- Beheersmaatregelen:
  - Buffer is impliciet opgenomen aan het einde van W-06 en begin W-08 (focus op stabilisatie, hardening en cut-over rehearsals).
  - Strikte Definition of Done/Ready, quality gates in CI/CD, en wekelijkse voortgangs- en risicosessies.
  - Scopebeheer via backlog-governance; wijzigingen alleen na impactanalyse en akkoord in stuurgroep.

Deliverables per werkpakket
- W-01: PID, governance- en communicatieplan, detailplanning.
- W-02: Gevalideerde requirements/backlog, use cases, NFR-set.
- W-03: Architectuur (HLD/LLD), beveiligings- en datamodellen, integratiecontracten.
- W-04: Ingerichte omgevingen (IaC), CI/CD pipelines, toegangs- en monitoringkaders.
- W-05: Werkende increments/configuratie, codebase en documentatie.
- W-06: Integratie- en systeemtestrapporten, performance- en securitytestresultaten.
- W-07: Gebruikerstrainingen, handleidingen, geaccordeerde UAT.
- W-08: Go-live, overdracht naar beheer (runbooks), evaluatie en afsluitdossier.

Rapportage en escalatie
- Dagelijkse stand-ups per team; wekelijkse voortgangsrapportage; tweewekelijkse stuurgroep met focus op scope, planning, risico’s en beslispunten.
- Besluiten en afwijkingen worden gelogd; herplanning vindt plaats bij overschrijding van vooraf vastgestelde drempels.

Benodigde input: