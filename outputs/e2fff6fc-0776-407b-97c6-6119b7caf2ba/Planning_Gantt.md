Planning (ASCII-Gantt, 12 maanden; M1 = maand 1)

Legenda: █ = uitvoering, ░ = voorbereiding, ▼ = mijlpaal/audit

Werkstroom 1 — Initiatie en overdracht
M1:  Kick-off en as-is analyse         ░░██████████▼
M1–M2: Security quickscan BIO/AVG      ░░███████▼
M1–M2: Transitie-architectuur          ░░████████

Werkstroom 2 — Onboarding (8 weken)
M2: Freeze-vensters afstemmen          ░░███▼
M2–M3: Werkplek image en packaging     ░░████████████
M2–M3: Servicedesk inrichting 24/7     ░░████████████
M2–M3: SIEM/SOC koppeling               ░░███████████▼
M3: Go-live servicedesk/SIEM           ░░██▼
M3–M4: Gefaseerde uitrol werkplekken   ░░██████████

Werkstroom 3 — Exploitatie
M4–M12: 24/7 Operatie servicedesk      ██████████████████████
M4–M12: Security monitoring SOC        ██████████████████████
M4–M12: Rapportage en dashboards       ███▼███▼███▼███▼███▼██

Werkstroom 4 — Continuïteit en herstel
M3–M4: Back-up/replicatie validatie    ░░██████▼
M6: Halfjaarlijkse failover test       ░░██▼
M12: Jaarlijkse continuïteitstest      ░░██▼

Werkstroom 5 — Doorontwikkeling/Innovatie
M4–M12: Innovatiesprints (2-mnd)       ███▼███▼███▼███▼
M5–M11: Accessibility iteraties        ████░░████░░████░░██

Werkstroom 6 — Training en adoptie
M3–M4: Key-user trainingen initieel    ░░██████▼
M7–M12: Herhaling/awareness            ████░░████░░██

Werkstroom 7 — Governance en audits
Elke maand: Tactisch overleg           ▼  ▼  ▼  ▼  ▼  ▼  ▼  ▼  ▼
Kwartaal: Kwaliteitsreview             ▼———▼———▼———▼
Kwartaal: Interne ISO/BIO audits       ▼———▼———▼———▼
CAB (2-wekelijks)                      ▼ ▼ ▼ ▼ ▼ ▼ ▼ ▼ ▼ ▼ ▼ ▼

Dependencies
- SIEM/SOC live (M3) → Security monitoring intensivering.
- Werkplek image klaar (M3) → Gefaseerde uitrol (M3–M4).
- Back-up validatie (M4) → Continuïteitstesten (M6/M12).
- Servicedesk in productie (M3) → KPI’s FCR/MTTR meten vanaf M4.

Mijlpalen
- M2: Freeze akkoord.
- M3: Go-live servicedesk en SOC.
- M4: Onboarding afgerond (W-01).
- M6: Halfjaarlijkse failover succesvol (W-07/W-17).
- M12: Jaarlijkse continuïteitstest (W-17) en jaarreview duurzaamheid (W-04/W-18).

Audit- en rapportagemomenten
- Maandelijks: KPI-rapport (W-09) T+3 werkdagen.
- Kwartaal: Accessibility audit (W-11), ISO/BIO interne audit (W-05), governance review (W-13).
- Jaarlijks: Externe certificeringsaudit (ISO 27001/9001/14001), continuïteitstest (W-17).

Benodigde input:
- Beschikbare vensters voor freeze en migratie.
- Beschikbaarheid key-stakeholders (CAB, stuurgroep).
- Black-out data (bijv. verkiezingen, burgerpeaks). 
>>>