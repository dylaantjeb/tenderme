Criteriumgestuurde beoordeling en onze invulling

Onderstaande tabel geeft de objectieve beoordelingsmethodiek weer die we hanteren voor de interne toetsing en om de aansluiting op de gunningscriteria van de aanbestedende dienst te maximaliseren. We borgen dat alle W-xx uit EMVI.md letterlijk terugkomen in de kolom “Gerelateerde W-xx” en dat elke W-xx wordt afgedekt door concrete acties, KPI’s en risico’s.

TABEL
Criterium | Weging | Beoordelingsschaal | Wat goed is | Onze invulling | Gerelateerde W-xx
- Plan van aanpak onboarding | 20% | 1–10 (matig tot excellent) | Duidelijk transitiepad, nul-verstoringsdoel, realistische capaciteit | 8-weekschema met parallelle sporen (werkplek, servicedesk, SIEM), freeze-vensters, fallback-plan | W-01, W-07, W-14, W-15, W-16
- Servicedesk en bereikbaarheid | 15% | 1–10 | 24/7, meertalige fallback, harde responstijden | 24/7 N1, escalatieladder N2/N3, P1 ≤ 5 min, omnichannel (telefoon, portal, chat) | W-02, W-14, W-09
- Security monitoring en BIO/ISO | 15% | 1–10 | Realtime detectie, aantoonbare controls, audits | SIEM/SOC met MTTD ≤ 10 min, MTTR ≤ 60 min, use-cases BIO, kwartaal-audits | W-03, W-05, W-17
- Continuïteit en herstel | 10% | 1–10 | RPO/RTO aantoonbaar getest | Replicatie, back-up, halfjaarlijkse failover, jaarlijkse continuïteitstest | W-07, W-17
- Rapportage en governance | 10% | 1–10 | Transparantie, voorspelbare cyclus, stuurinformatie | T+3 rapportage, maandelijkse tactiek, kwartaal-kwaliteit, realtime dashboards | W-09, W-13, W-16
- Doorontwikkeling en innovatie | 10% | 1–10 | Roadmap, ritme, waardecreatie | 2-maandelijkse innovatiesessies, backlog-velocity ≥ 80 sp | W-10, W-11
- Duurzaamheid en SROI | 10% | 1–10 | Meetbare CO2- en circulariteitsdoelen, sociale impact | 25% CO2-reductie/36m, 85% hergebruik, SROI 2% | W-04, W-12, W-18
- Opleiding en adoptie | 5% | 1–10 | Hoge dekkingsgraad, meetbaar effect | 90% key-user training/jaar, awareness-campagnes | W-08, W-05
- Contractmanagement | 5% | 1–10 | Heldere afspraken, PDCA, escalatie | RACI, overlegkalender, contractreview per kwartaal, wijzigingen via CAB | W-13, W-15
- Prijs en total cost of ownership | 0–15% | 1–10 | Transparant, voorspelbaar, lifecycle-kosten | All-in seat price, volumestaffels, circulariteitsvoordeel | W-04, W-18

Toelichting per criterium
- Onboarding: Wij werken met een detailplan dat resources, afhankelijkheden en freeze-vensters synchroniseert. Succes wordt gemeten op incidentpiek (<0,5%) en tijdigheid (100% mijlpalen op tijd) en is gekoppeld aan W-01 en W-07. 
- Servicedesk: Omnichannel met kennisbank en shift-left strategie. KPI’s P1-respons ≤ 5 min; P2 ≤ 30 min; first contact resolution ≥ 70%. W-02 en W-14 zijn direct gekoppeld met rapportage via W-09.
- Security: SOC met use-cases voor brute force, phishing, privilege escalation; maandelijkse tuning. ISO 27001/BIO-controls geaudit (W-05). Continuïteit getoetst (W-17). 
- Continuïteit: Failover-oefeningen en back-upvalidaties leveren aantoonbare RPO/RTO. W-07 en W-17 vormen de toetsstenen.
- Rapportage: T+3 werkdagen voor maandrapport, kwartaal deep-dive met verbetermaatregelen. Realtime dashboards (W-09) gevoed door ITSM, SIEM en CMDB (W-16).
- Doorontwikkeling: Roadmap met EOL/EOS-lifecycle, accessibility-upgrades (W-11), innovatie-sprints (W-10).
- Duurzaamheid: CO2-footprint gemeten per werkplek en datacenter; circulariteit >=85% hergebruik; SROI 2% lokaal (W-04, W-12, W-18).
- Opleiding: Jaarplan trainingen (key-users, beheerders), awareness 27001 (W-05), adoptie KPI’s (W-08).
- Contractmanagement: Governance met RACI, CAB voor changes (W-15), stuurgroep (W-13).
- Prijs/TCO: Transparante seat-prijs incl. support, software, afschrijving en duurzame restwaarde (W-04, W-18).

Beoordelingsschaal (indicatief)
- 9–10: Uitstekend, overtreft eisen, aantoonbare meerwaarde en lage risico’s.
- 7–8: Goed, voldoet volledig met overtuigende borging.
- 5–6: Voldoende, voldoet maar met beperkte meerwaarde.
- 3–4: Onvoldoende, lacunes of onduidelijkheden.
- 1–2: Slecht, voldoet niet of grote risico’s.

Onderlinge consistentie
- Alle W-xx referenties: W-01, W-02, W-03, W-04, W-05, W-06, W-07, W-08, W-09, W-10, W-11, W-12, W-13, W-14, W-15, W-16, W-17, W-18 komen terug in deze beoordelingsmethodiek. 
- KPI’s in KPI_SLA_Dashboard.md sluiten per criterium aan (Link W-xx/criterium) en worden gebruikt als meetlat voor de beoordelingsscore.
- Risico’s in Risicoregister.md zijn toegewezen aan W-xx en bijbehorende KPI’s, zodat rest-risico’s expliciet zichtbaar zijn.

Tips voor beoordelaars (transparantie)
- Controleer of alle KPI’s SMART zijn en of targets ambitieus maar haalbaar zijn; let op meetmethode en escalatie.
- Beoordeel de realiteit van de planning: onboarding in 8 weken met gecontroleerde freeze en fallback.
- Kijk naar aantoonbaarheid: bewijsstukken (certificaten, procesbeschrijvingen, auditverslagen) zijn als bijlagen opgenomen en gelabeld.
- Verifieer of de governance-cyclus ruimte geeft aan PDCA (plan-do-check-act) en of verbetermaatregelen zijn ingepland.
- Let op samenhang duurzaamheid — CO2 en circulariteit zijn direct verbonden met TCO.

Benodigde input:
- Definite weging per criterium en eventuele subcriteria.
- Specifieke gunningsleidraad (tekst) voor exacte beoordelingsschaal.
- Budgetkaders/TCO-verwachtingen en eventuele prijsscenario’s.
- Confirmatie of prijs meetelt in kwaliteitsscore en met welke weging. 
>>>