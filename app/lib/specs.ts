// lib/specs.ts
export type Depth = "A" | "B" | "C";

export type DocSpec = {
  filename: string;
  title: string;
  targetDepth: Depth;
  minWords?: number;
  minTables?: number;
  superPrompt: string;
};

const LEN = {
  PAGE_WORDS: 420, // ~1 A4 bij normale markdown
};
export { LEN };

export const SPECS: DocSpec[] = [
  {
    filename: "README_lees_mij.md",
    title: "README",
    targetDepth: "A",
    minWords: Math.round(0.8 * LEN.PAGE_WORDS),
    superPrompt: `
Schrijf een beknopte README (doel, inhoud, structuur, hoe te lezen).
- Taal: NL, to the point, geen marketing.
- Gebruik bullets + korte alinea's.
- Verwijs naar alle meegeleverde documenten.
- Sluit af met "Benodigde input:" (leeg indien compleet).
`.trim(),
  },
  {
    filename: "EMVI.md",
    title: "EMVI / Plan van Aanpak",
    targetDepth: "B",
    minWords: 5 * LEN.PAGE_WORDS,
    minTables: 2,
    superPrompt: `
Volledige EMVI volgens structuur (samenvatting, begrip, aanpak, borging, duurzaamheid, risico’s,
organisatie, Programma van Wensen met W-xx tabel, KPI/SLA samenvatting, conclusie).
- Stijl: SMART, PDCA, getallen en frequenties.
- Kruiskoppelingen: W-xx ↔ KPI ↔ Risico's consequent.
- Geen placeholders.
- Sluit af met "Benodigde input:" (leeg indien compleet).
`.trim(),
  },
  {
    filename: "Beoordelingsmethodiek_EMVI.md",
    title: "Beoordelingsmethodiek",
    targetDepth: "B",
    minWords: 2 * LEN.PAGE_WORDS,
    minTables: 1,
    superPrompt: `
Werk BPKV/EMVI-criteria uit met weging, schaal, "wat goed eruitziet", onze invulling en Gerelateerde W-xx.
- Voeg 1 tabel toe met de beoordelingsstructuur.
- Sluit af met "Benodigde input:" (leeg indien compleet).
`.trim(),
  },
  {
    filename: "Compliance_Matrix.md",
    title: "Compliance",
    targetDepth: "C",
    minWords: Math.round(1.5 * LEN.PAGE_WORDS),
    minTables: 1,
    superPrompt: `
Maak een compliance-matrix (UEA, KO/REQ, bewijs, bijlage). KO-eisen waar mogelijk "Ja".
- 1 tabel verplicht: "Eis | Type (KO/REQ) | Voldoening | Toelichting/Bewijs | Bijlage".
- Sluit af met "Benodigde input:" (leeg indien compleet).
`.trim(),
  },
  {
    filename: "Risicoregister.md",
    title: "Risico’s",
    targetDepth: "C",
    minWords: Math.round(1.5 * LEN.PAGE_WORDS),
    minTables: 1,
    superPrompt: `
Minimaal 10 risico’s met: Risico | Kans | Impact | Score | Beheersmaatregel | Eigenaar | Status | Link KPI/W-xx.
- SMART, PDCA in maatregelen.
- Sluit af met "Benodigde input:" (leeg indien compleet).
`.trim(),
  },
  {
    filename: "KPI_SLA_Dashboard.md",
    title: "KPI/SLA",
    targetDepth: "C",
    minWords: Math.round(1.5 * LEN.PAGE_WORDS),
    minTables: 1,
    superPrompt: `
Minimaal 12 KPI/SLA’s met: KPI/SLA | Target | Meetmethode | Frequentie | Escalatie | Verantwoordelijke | Link W-xx/criterium.
- SMART, met meetfrequenties, responstijden en escalatie.
- Sluit af met "Benodigde input:" (leeg indien compleet).
`.trim(),
  },
  {
    filename: "Planning_Gantt.md",
    title: "Planning",
    targetDepth: "C",
    minWords: LEN.PAGE_WORDS,
    superPrompt: `
ASCII-Gantt met fasen, start/eind, gate-reviews en mijlpalen. Voeg tekstuele toelichting toe (1 pagina).
- Sluit af met "Benodigde input:" (leeg indien compleet).
`.trim(),
  },
  {
    filename: "Bewijsstukkenbundel.md",
    title: "Bewijsstukken",
    targetDepth: "B",
    minWords: LEN.PAGE_WORDS,
    minTables: 1,
    superPrompt: `
Overzicht met: Bijlage | Beschrijving | Relatie (W-xx/KO/REQ) | Status | Verwijzing (pag./sectie).
- Sluit af met "Benodigde input:" (leeg indien compleet).
`.trim(),
  },
  {
    filename: "Assumpties_Uitsluitingen.md",
    title: "Aannames & Uitsluitingen",
    targetDepth: "B",
    minWords: LEN.PAGE_WORDS,
    superPrompt: `
Heldere aannames, juridische uitsluitingen, en eventuele financiële consequenties. Structuur met bullets + korte toelichtingen.
- Sluit af met "Benodigde input:" (leeg indien compleet).
`.trim(),
  },
  {
    filename: "Clarificatievragen.md",
    title: "NvI",
    targetDepth: "B",
    minWords: LEN.PAGE_WORDS,
    superPrompt: `
5–10 gerichte clarificatievragen (prioriteit, impact, afhankelijkheden).
- Sluit af met "Benodigde input:" (leeg indien compleet).
`.trim(),
  },
  {
    filename: "Projectreferenties.md",
    title: "Referenties",
    targetDepth: "B",
    minWords: Math.round(1.5 * LEN.PAGE_WORDS),
    superPrompt: `
3–5 referentieprojecten met resultaten/KPI’s en contactpersonen. Gebruik uniforme opmaak + mini-tabel per project.
- Sluit af met "Benodigde input:" (leeg indien compleet).
`.trim(),
  },
];