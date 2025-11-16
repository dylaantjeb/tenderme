KPI/SLA Dashboard

| KPI-ID | Omschrijving | Doelwaarde | Meting | Frequentie | Rapportage | Eigenaar | Incentive/Prikkel | Link W-xx/criterium |
|---|---|---|---|---|---|---|---|---|
| KPI-01 | Doorlooptijd implementatie tot productie | ≤ 16 weken | Start- tot go-live datum | Eenmalig/Project | Go-live rapport | Projectmanager | Bonus 1% op tijd; malus 1% per week vertraging | W-01; Plan van aanpak |
| KPI-02 | Migratiefoutpercentage (documenten) | ≤ 0,01% | # fouten / # gemigreerd | Per migratiebatch | Migratierapport | Migratielead | Malus herwerk op kosten leverancier | W-02; Plan van aanpak |
| KPI-03 | Hersteltest (restore) geslaagd binnen 4 uur | 100% | RTO test rapport | Kwartaal | DR-rapport | SRE Lead | Bonus 0,5% bij ≥4/jaar | W-05, W-02; Continuïteit |
| KPI-04 | Beschikbaarheid SaaS | ≥ 99,9% per maand | Uptime monitor | Maandelijks | SLA-rapport | Service Delivery Manager | Malus service credits per 0,1% tekort | W-05; Continuïteit & SLA |
| KPI-05 | Major security-incidenten | 0 | ISMS/IR-logs | Maandelijks | Securityrapport | CISO/IBF | Malus vrijval service credits | W-04; Kwaliteit & Beveiliging |
| KPI-06 | AVG-verzoeken (inzage/wissen) afgehandeld | ≤ 5 werkdagen | Ticketdoorlooptijd | Maandelijks | Privacy-rapport | DPO Liaison | Malus herwerk op kosten leverancier | W-04, W-08; Kwaliteit & Beveiliging |
| KPI-07 | Integratiesucces (transacties OK) | ≥ 98% | % succesvolle calls | Maandelijks | Ketenrapport | Integratiearchitect | Malus bij < target, verbeterplan verplicht | W-03, W-11; Integraties |
| KPI-08 | Incident first response tijd P1 | ≤ 30 min | Ticketingsysteem | Maandelijks | SLA-rapport | Servicedeskmanager | Malus service credits | W-09; Continuïteit & SLA |
| KPI-09 | Adoptie: training coverage | ≥ 95% | % getrainde gebruikers | Implementatie + 3 mnd | Adoptiemeting | Adoptiecoach | Bonus 0,5% bij ≥ 98% | W-06; Adoptie |
| KPI-10 | Wijzigingen: doorlooptijd standaardchange | ≤ 10 werkdagen | Doorlooptijd CAB tot oplevering | Maandelijks | Veranderrapport | Change Manager | Bonus 0,5% bij mediaan ≤ 7 w.d. | W-10, W-11; Doorontwikkeling |
| KPI-11 | Duurzaamheid: datacenter PUE | ≤ 1,2 | DC-rapportage | Kwartaal | ESG-rapport | ESG Manager | Bonus 0,5% bij PUE ≤ 1,15 | W-07; Duurzaamheid |
| KPI-12 | Rapportages op tijd en accuraat | 100% tijdig; ≥ 99% data-accuratesse | Inlevermoment; steekproef | Maandelijks | Managementdashboard | Service Delivery Manager | Malus bij te late rapportage | W-08; Rapportage |
| KPI-13 | Open standaarden compliance | 100% | Checklist/scan | Halfjaar | Architectuurreview | Enterprise Architect | Verbeterplan verplicht bij afwijking | W-11; Integraties & Open standaarden |
| KPI-14 | Auditbevindingen (major NC’s) | 0 major | Auditrapporten | Jaar | Auditverslag | KAM Manager | Malus hersteltijd + kosten | W-12; Kwaliteit & Beveiliging |

Benodigde input:
- Definitie van “kritieke” integraties voor KPI-07 segmentatie.
- Urenvensters voor rapportagelevering en onderhoud.