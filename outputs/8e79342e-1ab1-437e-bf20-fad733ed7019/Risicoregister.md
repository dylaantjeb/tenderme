Risico | Kans | Impact | Score | Maatregel | Eigenaar | Status | Link KPI/W-xx
1. Onvoorziene migratie-uitval tijdens cutover | Midden | Hoog | Hoog | Dress rehearsal, transaction freeze van 30 min, rollback-scripts getest; cutover buiten kantoortijden | Technisch PL | Actief | KPI-03; W-03 — Migratie zonder downtime > 15 min
2. Beschikbaarheid onder 99,95% door ketenfouten | Laag | Hoog | Midden/Hoog | Synthetics + end-to-end monitoring, contractuele OLAs met ketenpartners | Service Manager | Actief | KPI-01; W-01 — 99,95% beschikbaarheid productieomgeving
3. P1-responstijd/hersteltijd overschrijding | Midden | Hoog | Hoog | 24x7 on-call, war room, runbooks, blameless postmortems | Incident Commander | Actief | KPI-02; W-02 — Maximale hersteltijd P1-incidenten ≤ 60 min
4. Onvolledige DPIA of privacy-risico | Laag | Hoog | Midden | DPIA-facilitering, DPO-review, dataminimalisatie, privacy-by-default | CISO | Actief | KPI-04; W-04 — Dataprotectie: ISO 27001 + DPIA + logging 100%
5. PUE- of groene stroom-eis niet aantoonbaar | Laag | Midden | Laag/Midden | Contract met datacenter, halfjaarlijkse attestatie, alternatieve locatie fallback | Sustainability Lead | Actief | KPI-05; W-05 — Duurzame hosting: 100% groene stroom + PUE ≤ 1,2
6. Lage gebruikersacceptatie <85% | Midden | Midden | Midden | UX-coaching, e-learning, verbetersprint, champion network | Adoptielead | Actief | KPI-06; W-06 — Gebruiksvriendelijkheid: >85% tevredenheid na 3 maanden
7. Onvoldoende training key-users binnen 30 dagen | Laag | Midden | Laag/Midden | Weekplanning trainingen, reminders, herkansingstoets, management buy-in | Opleidingscoördinator | Actief | KPI-07; W-07 — Kennisoverdracht: 100% key-user getraind binnen 30 dagen
8. Overschrijding levertermijn 12 weken | Laag | Hoog | Midden | Kritieke pad bewaken, resource back-up, timeboxing, escalatie naar stuurgroep | Projectmanager | Actief | KPI-08; W-08 — Levertermijn: MVP live binnen 12 weken
9. Uitwijk faalt of RTO > 2 uur | Laag | Hoog | Midden/Hoog | DR-oefening 2x per jaar, geautomatiseerde failover, replicatiecontroles | Continuïteitsmanager | Actief | KPI-09; W-09 — Continuïteit: escrow en uitwijk < 2 uur RTO
10. SLA-rapportage niet tijdig of incompleet | Laag | Laag/Midden | Laag/Midden | Dashboard automation, 4-ogen check, kalenderreserves | Service Reporting Lead | Actief | KPI-10; W-10 — Rapportage: maandelijkse SLA-rapportage binnen 5 werkdagen
11. Innovatiedruk leidt tot instabiliteit | Laag | Midden | Laag/Midden | Feature toggles, canary releases, change freeze voor kritieke perioden | Change Manager | Actief | KPI-11; W-11 — Innovatie: 2 verbeterinitiatieven per kwartaal
12. Dataportabiliteit vertraagd > 5 werkdagen | Laag | Midden | Laag/Midden | Standaard export-scripts, parallel validatie, checksum-verificatie | Data Lead | Actief | KPI-12; W-12 — Dataportabiliteit: export binnen 5 werkdagen, open standaard
13. Ketenaansluiting Digikoppeling instabiel | Midden | Midden/Hoog | Midden/Hoog | Retry-patterns, circuit breaker, OLAs met bronregistraties | Integratie Lead | Actief | KPI-01/KPI-02; W-01 — 99,95% beschikbaarheid productieomgeving
14. Security-incident (phishing/compromised account) | Midden | Hoog | Hoog | MFA, risk-based authentication, SIEM use-cases, awarenesscampagne | CISO | Actief | KPI-04; W-04 — Dataprotectie: ISO 27001 + DPIA + logging 100%

Toelichting scoring
- Kans: Laag/Midden/Hoog op basis van historische data en context.
- Impact: Service-impact op beschikbaarheid, vertrouwelijkheid, integriteit, tijdslijnen.
- Score: Niet-lineaire weging (Impact zwaarder dan Kans). 
- PDCA: elk risico kent preventieve en correctieve maatregelen, kwartaalreview, en herijking na incidenten of majeure changes.

Escalatie- en communicatieregels
- P1-risico’s escaleren direct naar de stuurgroep en CIO-lijn binnen 60 minuten. 
- Updates elke 30 minuten tot mitigatie effectief is aangetoond. 
- Post-incident review binnen 5 werkdagen met RCA (5x Why, Fishbone) en verbeteracties.

Benodigde input:
- Risicobereidheid van de opdrachtgever (risk appetite) en acceptatiecriteria.
- Beschikbaarheid ketenpartners voor OLA’s en DR-oefeningen.
- Prioritering van top-5 risico’s door opdrachtgever voor extra aandacht in sprints.
>>>