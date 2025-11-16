Risicoregister

| Risico | Kans | Impact | Score | Maatregel | Eigenaar | Status | Link KPI/W-xx |
|---|---:|---:|---:|---|---|---|---|
| Onvolledige/onnauwkeurige brondata leidt tot migratiefouten | Middel | Hoog | 12 | Proefmigratie 10%, dataprofilering, hash-checks, DQ-lijst en correcties | Migratielead | Actief | KPI-02, W-02 |
| API rate limits/unstabiele ketenpartners | Middel | Hoog | 12 | Caching, backoff-retry, contractuele limieten, performance tests | Integratiearchitect | Actief | KPI-07, W-03, W-11 |
| Weerstand bij gebruikers/adoptie blijft achter | Middel | Middel | 9 | Ambassadeurs, training op rollen, NPS-metingen en gerichte coaching | Adoptiecoach | Actief | KPI-09, W-06 |
| Onvoorziene legacy maatwerkafhankelijkheden | Middel | Middel | 9 | Brown-paper sessies, fit-gap, feature-toggles, phased decommission | Technisch PL | Actief | KPI-10, W-03, W-10 |
| Beveiligingsincident of datalek | Laag | Zeer hoog | 15 | 2FA, hardening, SIEM, vuln scanning, pentest en IR-oefeningen | CISO/IBF | Actief | KPI-05, KPI-04, W-04, W-05 |
| Onvoldoende key-user capaciteit voor UAT | Middel | Middel | 9 | UAT-kalender, back-up testers, goedkeuring door proceseigenaren | Testcoördinator | Actief | KPI-01, W-01 |
| Wet- en normwijzigingen (BIO/AVG) | Laag | Hoog | 8 | Compliance watch, kwartaalreviews, wijzigingsverzoeken via CAB | Compliance Officer | Actief | KPI-13, W-04, W-11 |
| Datacenterstoring/regionale outage | Laag | Zeer hoog | 16 | Actief-actief, failover-tests, multi-AZ, RTO/RPO monitoring | SRE Lead | Actief | KPI-04, KPI-03, W-05 |
| Overschrijding implementatieplanning | Middel | Middel | 9 | Kritieke pad-bewaking, buffer, wekelijkse voortgang, escalatieladder | Projectmanager | Actief | KPI-01, W-01 |
| Inconsistente rapportagedata | Laag | Middel | 6 | Definitiecatalogus, datavalidatie, reconciliatie met bron | Data Lead | Actief | KPI-12, W-08, W-02 |
| Duurzaamheidsdoelen niet gehaald | Laag | Middel | 6 | Kwartaal-CO2 review, optimalisatie opslag/archiefbewaring, DC-rapportages | ESG Manager | Actief | KPI-11, W-07 |
| Vendor lock-in risico bij API’s | Laag | Middel | 5 | Open standaarden, export in open formaten, exit-script testen | Enterprise Architect | Actief | KPI-10, KPI-13, W-11 |

Benodigde input:
- Beschikbaarheid ketenpartners voor integratietesten en contractuele rate limits.
- Lijst proceseigenaren en vervanging voor UAT.
| Niet-halen eisen W-09 | Middel | Hoog | 12 | Extra reviews + interne audit op W-09 | Projectleider | Mitigerend | KPI W-09 |
| Niet-halen eisen W-12 | Middel | Hoog | 12 | Extra reviews + interne audit op W-12 | Projectleider | Mitigerend | KPI W-12 |
