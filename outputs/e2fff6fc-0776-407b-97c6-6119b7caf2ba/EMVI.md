Titel: EMVI Plan van Aanpak — Managed Werkplek, Servicedesk en Security Monitoring voor Gemeente

1. Samenvatting
Wij leveren een end-to-end dienst voor werkplekbeheer, 24/7 servicedesk en proactieve security monitoring (SIEM/SOC), specifiek afgestemd op gemeentelijke eisen (BIO, AVG, GIBIT, ARVODI). Kernbelofte: binnen 8 weken stabiele overdracht (W-01), 24/7 incidentafhandeling met strikte responstijden (W-02, W-14), aantoonbare beveiligingsborging (W-03, W-05, W-17), datagedreven sturing met rapportage en dashboards (W-09), en meetbare duurzaamheid (W-04, W-18). De aanpak is gebaseerd op ITIL4, ISO 20000-gericht procesontwerp, en ISO 27001/9001/14001 managementsystemen. Met SMART KPI’s en PDCA-borging verbinden we kwaliteit direct aan continue verbetering.

2. Begrip van de opdracht en uitgangspunten
- Omvang: 1.200 werkplekken (thin clients en laptops), 2.500 gebruikersaccounts, ±120 line-of-business applicaties, 35 kritieke diensten (o.a. zaaksysteem, BRP-koppelingen).
- Kritische eisen: BIO-baseline, AVG-conformiteit incl. DPIA-ondersteuning (W-06), RPO ≤ 15 min / RTO ≤ 2 uur (W-07), toegankelijkheid WCAG 2.1 AA voor selfserviceportaal (W-11).
- Governance: maandelijkse tactische overleggen en kwartaal-kwaliteitsreviews (W-13). Proactieve roadmap voor doorontwikkeling (W-10).
- Duurzaamheid: CO2-reductie en circulariteit in hardware lifecycle, 100% groene stroom in datacenters (W-04, W-18).

3. Aanpak per fase
3.1 Initiatie en overdracht (week 1–2)
- Kick-off met projectorganisatie, gezamenlijke definitie van succescriteria en transitie-architectuur.
- As-is analyse: CMDB-import, netwerk- en identity-assessment, security quickscan (BIO/AVG).
- Risk-based transitieplan met freeze-vensters en detailplanning (Planning_Gantt.md).

3.2 Transitie en onboarding (week 3–8)
- Werkplekimage-harmonisatie, Intune/Autopilot inrichten, MDM/MAM-profielen, packaging top-25 applicaties.
- Servicedesk-kennisbank migrate, IVR/workflow configuratie, 24/7 rooster gereed (W-02).
- SIEM/SOC-koppeling (logs AD, firewalls, endpoints), initiale use-cases (phishing, brute-force) live (W-03).
- Herstelvoorzieningen valideren: back-up, replicatie, failover-tests richting RPO/RTO (W-07).
- DPIA-sjablonen en dataverwerkersovereenkomst afstemmen (W-06).

3.3 Exploitatie (vanaf week 9)
- ITIL4-processen operationeel: incident, request, problem (W-14), change/release (W-15), config/asset (W-16).
- Maandrapportage KPI’s, beschikbaarheid, doorlooptijden, beveiligingsincidenten (W-09).
- Kwartaalreleases met bundeling van wijzigingen, CAB met opdrachtgever (W-15).
- Continue awareness en training voor key-users (W-08).

3.4 Doorontwikkeling en optimalisatie
- Backlogbeheer en prioritering met Value vs. Effort, 2-maandelijkse innovatiesessies (W-10).
- Accessibility-verbeteringen op selfserviceportaal en dashboards (W-11).
- Jaarlijkse service continuity test met scenario’s (ransomware, datacenteruitval) en lessons learned (W-17).
- Duurzame lifecycle-verbeteringen: repair-first, parts harvesting, e-waste rapportage (W-04, W-18).

4. Kwaliteitsborging (PDCA)
- Plan: per KPI heldere targets, meetmethoden en dashboards (KPI_SLA_Dashboard.md).
- Do: procesuitvoering volgens ITIL4 en ISO-geborgde werkinstructies; change-beheersing via CAB.
- Check: maandelijkse KPI-review, interne audits (27001/9001/14001), steekproeven tickets en changes.
- Act: verbetermaatregelen, root-cause-analyses, update risico’s, bijsturen resourcing en tooling.

5. Duurzaamheid, toegankelijkheid en maatschappelijke waarde
- CO2-reductie: 25% minder uitstoot in drie jaar door energiezuinige hardware, virtualisatie en groen datacenter (W-04).
- Circulariteit: 85% hergebruik/remarketing van afgeschreven hardware, e-waste ≤ 2% (W-18).
- WCAG 2.1 AA: toetsen bij elke release van het selfserviceportaal, quarterly audit (W-11).
- SROI: 2% van contractwaarde aan lokale sociale projecten, inclusief leerwerkplekken (W-12).

6. Risico- en securityaanpak
- BIO/ISO27001-controls vertaald naar concrete use-cases in SIEM/SOC: privileged access misbruik, malware, DLP events (W-03, W-05).
- Jaarlijkse continuïteitstest, halfjaarlijkse failover (W-17), pentests jaarlijks met onafhankelijke partij.
- AVG: DPIA-proces, dataminimalisatie, verwerkersovereenkomst, audittrail changes (W-06).
- Continu risicobeheer via risicoregister met scoring en trend, gekoppeld aan KPI’s en W-xx.

7. Organisatie en team
- Technisch projectleider (T-PL) met mandaat; Servicemanager als single point of contact; Security Officer; Change Manager; Architect werkplek/security.
- 24/7 Servicedesk (N1/N2) + bereikbaarheidsdienst N3; SOC-analisten (tiered).
- Escalatie: operationeel < Servicemanager; tactisch < Stuurgroep; strategisch < directie.
- Vervanging en continuïteit geborgd via back-uprollen en capaciteitsplanning.

8. Programma van Wensen (W-xx TABEL)
- W-01: Onboarding binnen 8 weken met nul-verstoringsdoelstelling (<0,5% incidentpiek).
- W-02: 24/7 servicedesk met Nederlandstalige first-line en meertalige fallback.
- W-03: Proactieve SIEM/SOC-monitoring met realtime use-cases en 15-min triage.
- W-04: Meetbare CO2-reductie in exploitatie en gebruikersgedrag.
- W-05: Informatiebeveiliging conform ISO 27001 en BIO, inclusief awareness.
- W-06: AVG-conforme verwerking en DPIA-ondersteuning.
- W-07: Continuïteit RPO ≤ 15 min / RTO ≤ 2 uur met aantoonbare tests.
- W-08: Kennisoverdracht en trainingen voor key-users en beheer.
- W-09: Transparante rapportages en realtime dashboards.
- W-10: Roadmap en innovatie-backlog met 2-maandelijkse sessies.
- W-11: Toegankelijk selfserviceportaal WCAG 2.1 AA.
- W-12: SROI 2% en lokale betrokkenheid.
- W-13: Governance en contractmanagement met duidelijke overlegstructuur.
- W-14: Incident- en probleembeheer ITIL4.
- W-15: Change- en releasemanagement met CAB.
- W-16: CMDB en asset lifecyclebeheer met audittrail.
- W-17: Service continuity tests en verbeterprogramma.
- W-18: Duurzame inkoop en circulariteit in hardwareketen.

9. KPI/SLA (overzicht)
- Responstijd P1: ≤ 5 min (24/7), oplostijd P1 ≤ 2 uur (W-02, W-14).
- Beschikbaarheid kritieke diensten: ≥ 99,95% per maand (W-07).
- Detectie-tijd security events: MTTD ≤ 10 min; MTTR ≤ 60 min (W-03, W-05).
- CO2-intensiteit per werkplek: -25% in 36 maanden (W-04, W-18).
- DPIA doorlooptijd ≤ 20 werkdagen (W-06).
- Backlog-velocity: ≥ 80 story points per 2 mnd sprint (W-10).
- WCAG-issues: 0 blokkerende, ≤ 5 niet-blokkerende per kwartaal (W-11).
- Rapportage op T+3 werkdagen (W-09).
- Trainingsdekking: ≥ 90% key-users / jaar (W-08).
- Audit-compliance ≥ 98% (W-05, W-16).

10. Conclusie
Met deze aanpak maximaliseren we kwaliteit en continuïteit, reduceren we risico’s en leveren we aantoonbare waarde tegen voorspelbare kosten. De combinatie van snelle onboarding, 24/7 dekking, BIO/ISO-geborgde security en duurzame lifecycle maakt de uitvoering robuust. KPI’s en PDCA zorgen voor transparante sturing. Alle wensen zijn gekruist met KPI’s, risico’s, governance en planning.

Benodigde input:
- Definitieve aantallen (werkplekken, gebruikers, applicaties) en kritieke dienstenlijst.
- Beoogde vensters voor migratie en freeze.
- Preferenties voor tooling (ITSM, EDR, SIEM) en integraties.
- Bestaande security policies, DVO en verwerkersovereenkomst.
- Gewenste overlegkalender en escalatielijnen. 
>>>