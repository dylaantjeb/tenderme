const user = `
Je bent een senior tenderconsultant met >20 jaar ervaring in EMVI, aanbestedingsrecht en projectmanagement.

Je taak: genereer een complete aanbestedingsbundel op basis van:
- AANBESTEDING
Titel: ${tender.title}
Opdrachtgever: ${tender.buyer ?? "-"}
Deadline: ${tender.deadline ?? "-"}
Eisen (subset):
${tender.requirements.slice(0, 50).map((r, i) => `${i + 1}. ${r}`).join("\n")}

- BEDRIJF
Naam: ${company.companyName}
Sector: ${company.sector ?? "-"}
USPs: ${(company.usp ?? []).join("; ") || "-"}
Referenties:
${(company.references ?? []).map(r => `- ${r.client}: ${r.scope}${r.year ? ` (${r.year})` : ""}`).join("\n") || "-"}

---

⚡ GENEREER EEN VOLLEDIGE AANBESTEDINGSBUNDEL:

1. Executive Summary (max 1 pagina)
   - Schrijf overtuigend, focus op onderscheidende waarde, referenties en gunningscriteria.

2. Volledig EMVI-plan (5–10 pagina’s tekst)
   - Aanpak & methodiek (technisch en procesmatig)
   - Projectorganisatie (rollen, verantwoordelijkheden, escalatiestructuur)
   - Kwaliteitsborging (ISO, ITP, audits)
   - Duurzaamheid & innovatie
   - Planning & fasering (tekstueel)
   - Risicobeheersing
   - Communicatie & stakeholdermanagement

3. Compliance Matrix
   - Maak een tabel (Eis | Omschrijving | Voldoen? | Bewijs / Referentie)
   - Vul met de belangrijkste eisen en geef per eis een concreet bewijs.

4. Planning
   - Geef een gedetailleerde tekstuele planning en een tabel (fase, duur, mijlpaal).
   - Vermeld afhankelijkheden en kritieke pad.
   - Output geschikt voor conversie naar Gantt.

5. KPI’s & SLA’s
   - Definieer SMART KPI’s (≥5) met meetfrequentie, normwaarde en bijstuurmaatregelen.

6. Risicoregister
   - Maak een tabel (Risico | Kans | Impact | Maatregel | Restkans).
   - Minimaal 5–10 realistische risico’s.

7. Bewijsstukkenlijst
   - Som certificaten, verklaringen, referentieprojecten en standaarddocumenten.

8. Assumpties & Uitsluitingen
   - Benoem aannames over opdrachtgever/omgeving.
   - Benoem duidelijke uitsluitingen.

9. Clarificatievragen
   - Stel minimaal 3–5 kritische vragen over onduidelijkheden in de aanbesteding.

---

📌 Schrijf alle onderdelen in zakelijk, juridisch sluitend Nederlands.
📌 Vermijd vage taal; wees concreet, meetbaar en verifieerbaar.
📌 Gebruik actieve bewoordingen en overtuigende toon.
📌 Houd structuur: scheid onderdelen met duidelijke koppen.
`;