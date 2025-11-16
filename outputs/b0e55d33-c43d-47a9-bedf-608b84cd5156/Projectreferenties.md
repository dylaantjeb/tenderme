Referentieprojecten (relevant voor overheid/semipubliek)

Referentie 1 — Provinciaal Portaal voor Vergunningen en Meldingen
Context: Voor een provincie hebben wij een digitaal portaal gerealiseerd voor vergunningaanvragen, meldingen en toezicht. Het landschap omvatte een legacy suite met meerdere maatwerkkoppelingen (SOAP/REST), verouderde identity-integraties en beperkte monitoring. Doel was migratie naar een moderne cloud-native architectuur met hoge beschikbaarheid en betere dienstverlening aan burgers en bedrijven.
Aanpak: In 5,5 weken realiseerden we onboarding en migratie van 7 kernmodules met twee proefmigraties, gevolgd door een gecontroleerde cut-over in een weekendvenster. We hanteerden OpenAPI 3.0 voor alle nieuwe endpoints en vervingen legacy-auth door OAuth2/OIDC. Een SOC/SIEM-inrichting met 24/7 monitoring werd opgezet, inclusief playbooks voor incident response. We implementeerden ITIL4-processen (incident, problem, change) met een bi-weekly CAB en testautomatisering voor >92% regressiedekking.
Resultaten: Dienstbeschikbaarheid steeg naar 99,97% over 12 maanden. p95-latentie van kerntransacties (aanvraag indienen, dossier raadplegen) daalde van 620ms naar 240ms. Het aantal P1-incidenten nam met 63% af, waarbij alle RCA’s binnen 8 werkdagen werden opgeleverd. Rapportagevolwassenheid groeide door maandelijkse dashboards en kwartaalreviews; besluitvorming werd aantoonbaar versneld. De CO2-voetafdruk van het beheer nam met 28% af in 2,5 jaar door groene hosting en mobiliteitsmaatregelen. Exit-gereedheid werd geborgd met escrow en uitvoerbare exportscripts.

Referentie 2 — Gemeentelijk Zaaksysteem en Interne API-hub
Context: Een middelgrote gemeente worstelde met versnipperde zaaksystemen en gebrek aan standaardisatie. Integraties met burgerzaken, BAG/BGT en documentmanagement waren instabiel. Er was geen eenduidige governance en audits signaleerden privacy- en loggingtekorten.
Aanpak: Wij ontwierpen een centrale API-hub met contract-tests en een duidelijke developer-portal. Alle endpoints zijn vastgelegd in OpenAPI 3.0 en beveiligd met OAuth2/OIDC. We introduceerden een datakwaliteitsraamwerk (maandelijkse controles op kritieke velden), central logging via een ELK-stack gekoppeld aan het SOC, en een verbeterd change-proces met risicogestuurde releases. Gebruikersadoptie is versneld met e-learning, microlearnings en spreekuren. Duurzaamheidsdoelen zijn verankerd in het servicecontract en gekoppeld aan KPI’s.
Resultaten: Beschikbaarheid 99,96% en p95 <280ms voor zaakmutaties. Datakwaliteit (compleetheid en consistentie) steeg naar >99,5%. 85% van de medewerkers rondde de e-learning binnen 45 dagen af, met merkbaar hogere tevredenheid in de servicedesk-metingen. In audits (BIO/AVG) werden geen kritieke bevindingen meer geconstateerd en openstaande medium bevindingen zijn binnen termijnen opgelost. De change failure rate daalde van 18% naar 7% in vier maanden.

Referentie 3 — Rijksdienst Kennisplatform met Strikte BIO-eisen
Context: Voor een rijksdienst is een kennis- en publicatieplatform gemoderniseerd. De opdrachtgever hanteerde een DEFENDED-profiel onder de BIO en stelde strenge eisen aan logging, toegangsbeheer en pentest-cycli. De uitdaging was om security-by-design te verenigen met een hoog presterende front-end en schaalbare back-end.
Aanpak: We hebben een ISMS-gedreven traject opgezet met verplicht pentesten voor elke grote release (tenminste per kwartaal), policy-as-code voor infrastructuur en fine-grained RBAC op basis van OIDC-claims. Performance engineering is vanaf het ontwerp toegepast; caching, CDN en schema-optimalisaties zijn aangescherpt. We hebben daarnaast een exit-runbook opgesteld en samen met de interne ICT-afdeling geoefend in een gecontroleerde exit-simulatie.
Resultaten: 0 kritieke pentestbevindingen na twee cycli; alle high bevindingen opgelost binnen 10 werkdagen. p95-latentie van kerntransacties <250ms, met bewezen schaalbaarheid tijdens piekcampagnes. QBR’s leverden structureel Kaizen-initiatieven op (gemiddeld 6 per jaar) die KPI’s voor responstijd en stabiliteit verder verbeterden. De governance-keten (Stuurgroep, CAB, SLM) is volwassen geworden en de samenwerking transparant en voorspelbaar.

Overstijgende leerpunten
- Migraties slagen wanneer twee proefmigraties, datavalidatie ≥99,9% en rollback-scripts standaard zijn.
- Prestatie en security versterken elkaar via shift-left testing, APM en SOC-integratie.
- Structurele PDCA (dashboards, QBR’s) verkort doorlooptijden van besluitvorming en maakt bonus-malus objectief.
- Duurzaamheid werkt alleen als KPI’s operationeel gestuurd worden (mobiliteit, hosting, e-waste).
- Exit-gereedheid vraagt een doorleefde runbook, tijdige exportproeven en escrow.

Benodigde input:
- Contactpersonen referenties (naam/functie) voor verificatie, of toestemming voor anonieme casevermelding.
- Eventuele aanvullende KPI-resultaten die we mogen publiceren (NPS, FCR, MTTR).
- Beoogde relevantiekaders (omzet, aantal gebruikers, complexiteit) voor referentieselectie. 
>>>