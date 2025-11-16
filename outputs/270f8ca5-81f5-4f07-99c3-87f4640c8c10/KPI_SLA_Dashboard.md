KPI/SLA Dashboard en borgingsaanpak

Dit document beschrijft ons KPI/SLA-dashboard, de wijze van meting, verantwoordelijkheden en escalaties. Het doel is om prestaties transparant te maken, tijdig bij te sturen en aantoonbaar te voldoen aan de gunnings- en contracteisen. We verbinden onze KPI’s expliciet aan de relevante criteria W-01 t/m W-08, zodat traceerbaarheid en contractuele borging gewaarborgd zijn.

Toelichting op opzet en governance
- Eigenaarschap: iedere KPI heeft een enkele verantwoordelijke (rol) die prestaties bewaakt, verbetert en rapporteert.
- Meetketen: uitsluitend brondata uit operationele systemen (ticketsysteem, CRM, HR, materieelplanning, VGM- en GIS-registraties). Extracts zijn read-only en versiebeheer is geborgd.
- Valideren: Data Lead en KAM voeren maandelijkse steekproef- en kwaliteitstoetsen uit. Bij afwijkingen volgt root-cause analyse en corrigerende maatregelen.
- Escalaties: per KPI is een eenduidige escalatieladder gedefinieerd. Bij overschrijding volgt direct de beschreven actie; structurele overschrijdingen leiden tot verbeterplannen met eigenaar, planning en effectmeting.
- Rapportage: dagelijkse/wekelijkse operationele dashboards voor actieteams; maandelijkse managementreview; kwartaalrapportage voor opdrachtgever.
- Continu verbeteren: PDCA-cyclus per KPI, met retrospectieve sessies en benchmarken over teams en periodes.

Definities en rekenregels
- Responstijd storingen: tijd tussen ticketregistratie en eerste gekwalificeerde reactie door onze servicedesk of uitvoerder (W-01).
- Veiligheid (W-06): LTI is iedere gevalideerde verzuimongevallenregistratie met werkverzuim; toolboxdeelname is aanwezigheid versus de uitgezette toolboxen in de meetperiode.
- Winterdienst paraatheid (W-05): beschikbaarheidspercentage van mensen, voertuigen en middelen conform rota en vastgelegd logboek per week.
- CO₂-intensiteit/uur (W-02): totaalemissie (tank-to-wheel, emissiefactoren conform meest recente CO₂-Prestatieladder) gedeeld door productieve machine- of ploeguren; reductiedoel afgezet tegen de 12-maands voortschrijdende baseline.
- Emissiearm inzet (W-02): aandeel uren met emissiearm of elektrische middelen van het totale productieve urenpakket.
- Datacompleetheid en -kwaliteit (W-03): volledigheid van verplichte attributen in GIS en foutpercentage op validatieregels (syntaxis, domeinen, topologie).
- Klacht-afhandeling (W-04): doorlooptijd tussen registratie en inhoudelijke terugkoppeling plus genomen maatregel.
- Leverbetrouwbaarheid: leveringen ontvangen conform afspraak (volledig en op tijd) gedeeld door totaal aantal bestellingen.
- Social return (W-07): percentage van totaal bestede projecturen dat aantoonbaar is ingevuld door kandidaten conform SR-definitie van de opdrachtgever.
- Wijzigingsdoorlooptijd (W-08): tijd van ingediende change tot livegang inclusief documentatie.

Sturing en transparantie
- Alle KPI’s zijn zichtbaar op één dashboard met filters voor periode, regio, team en werksoort. Elke KPI toont trend, targetband en signaalindicator.
- Alerts: near real-time signalen bij overschrijding van drempels zorgen voor snelle opvolging.
- Audittrail: iedere aanpassing aan data of KPI-instelling wordt gelogd. Exports zijn herleidbaar door middel van datumstempel en hash.

Risicobeheersing en mitigatie
- Datakwaliteit: we hanteren dubbele bronvalidatie (systeemcontroles plus steekproef).
- Seizoensinvloed: voor winterdienst en leverbetrouwbaarheid analyseren we seizoenspatronen en reserveren capaciteit en bufferopslag.
- Leveranciersperformance: second sourcing en prestatiecontracten met KPI’s op tijdigheid en kwaliteit.
- Personele inzet: cross-training om paraatheid en toolboxdeelname te borgen; vervanging en reservecapaciteit in piekmaanden.

Verbetermechanismen
- Root-cause library: standaardoorzaken en bewezen maatregelen voor hergebruik in verbeteracties.
- Lessons learned: per overschrijding een korte nabelef met maatregelen en eigenaar.
- Benchmarking: periodieke vergelijking tussen ploegen en regio’s om best practices te schalen.

KPI-/SLA-overzichtstabel

| Nr | KPI/SLA | Target | Meetmethode | Frequentie | Escalatie | Verantwoordelijke | Link W-xx/criterium |
|---|---|---|---|---|---|---|---|
| 1 | Responstijd storingen | ≤ 2 uur | Ticketsysteem export | Dagelijks | >2u ⇒ Incidentcall | OM | W-01 |
| 2 | Veiligheidsincidenten (LTI) | 0 | VGM-registratie | Maandelijks | 1 LTI ⇒ directie-review | KAM | W-06 |
| 3 | Toolboxdeelnames | ≥ 95% | Presentielijsten | Maandelijks | <95% ⇒ herhaling | KAM | W-06 |
| 4 | Winterdienst paraatheid | ≥ 98% | Rota + logboek | Wekelijks | <98% ⇒ capaciteitsplan | Planner | W-05 |
| 5 | CO₂-intensiteit/uur | −5%/jaar | Brandstofrapport | Maandelijks | stijgend ⇒ analyse | KAM | W-02 |
| 6 | Emissiearm inzet | ≥ 90% uren | Materieelplanning | Maandelijks | <90% ⇒ vervanging | KAM | W-02 |
| 7 | Datacompleetheid GIS | ≥ 99% | Steekproefaudit | Maandelijks | <99% ⇒ herstelactie | Data Lead | W-03 |
| 8 | Datakwaliteit (fouten) | ≤ 1% | Validatierapport | Maandelijks | >1% ⇒ root-cause | Data Lead | W-03 |
| 9 | Klacht-afhandeling | ≤ 48u | CRM | Maandelijks | >48u ⇒ escalatie OM | OM | W-04 |
|10 | Leverbetrouwbaarheid | ≥ 97% | Inkooplog | Maandelijks | <97% ⇒ 2e leverancier | Inkoop | — |
|11 | Social return uren | ≥ 5% | HR-rapport | Maandelijks | <5% ⇒ extra inzet | HR | W-07 |
|12 | Wijzigingsdoorlooptijd | ≤ 5 dgn | Change-log | Maandelijks | >5 ⇒ procesreview | PL | W-08 |

Operationele afspraken
- Rapportagekalender: dagelijks storingsrapport; wekelijks winterdienstcheck; maandelijkse integrale KPI-review met het opdrachtgeversteam.
- Escalatiekanalen: Incidentcall (24/7) voor acute storingen; maandelijks directieoverleg bij veiligheidsincidenten; Data Quality Board voor W-03.
- Documentatie: per KPI is een meetprotocol beschikbaar met brondefinitie, SQL/rapportdefinitie, validatiecriteria en wijzigingenhistorie.
- Wijzigingenbeheer: alle wijzigingen in scope of eisen lopen via het changeproces (W-08), inclusief impactanalyse en testcriteria.
- Transparantie: opdrachtgever krijgt toegang tot het live dashboard en tot de bronrapportages (read-only), inclusief de auditlogs van extracties.

Borging van contractuele eisen W-01 t/m W-08
- W-01: snelle en traceerbare storingsafhandeling en klachtenmanagement met duidelijke escalaties.
- W-02: aantoonbare reductie van emissies en hoog aandeel emissiearme inzet.
- W-03: volledige, actuele en kwalitatief hoogwaardige data voor GIS en assetmanagement.
- W-04: proactieve omgevingscommunicatie en snelle klachtopvolging.
- W-05: aantoonbare paraatheid voor winterse omstandigheden met wekelijkse verificatie.
- W-06: veiligheidscultuur met nul LTI’s en hoge toolboxtrouw.
- W-07: sociale waardecreatie via structurele inzet van social return uren.
- W-08: beheerst wijzigingsproces met korte doorlooptijd en volledige documentatie.

Met deze inrichting zijn prestaties voorspelbaar, auditbaar en continu verbeterbaar. Het dashboard maakt tijdig bijsturen mogelijk en verbindt operationele acties met contractuele verplichtingen en strategische doelen.

Benodigde input: