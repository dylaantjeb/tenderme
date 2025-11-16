/* app/api/generate/_prompts.ts
   TenderAI – “inleverklaar” generator prompts (deterministische templates)
   ---------------------------------------------------------------
   Alle functies hieronder returnen direct afgewerkte Markdown/CSV
   zodat je ze 1-op-1 naar .docx kunt converteren.
*/

type Lang = string;
type Tender = {
  title?: string;
  authority?: string;
  referenceId?: string;
  sector?: string;
  scope?: string;
  deadlines?: { description: string; date: string }[];
};
type Company = {
  name?: string;
  address?: string;
  kvk?: string;
  vat?: string;
  contact?: { name?: string; email?: string; phone?: string };
  strengths?: string[];
  certifications?: string[];
};
type Base = {
  language?: Lang;
  tender?: Tender;
  company?: Company;
  extracted?: any;
};

type Milestone = { name: string; start: string; end: string };
type ComplianceRow = {
  requirement: string;
  knockout?: boolean;
  meets: "Yes" | "No" | "Partial";
  notes?: string;
  attachmentRef?: string;
};
type RiskRow = { risk: string; mitigation: string; probability?: string; impact?: string; owner?: string; status?: string };
type KpiRow = { kpi: string; target: string; measure: string; frequency: string; escalation: string };

/* -------------------------- helpers -------------------------- */

const nonEmpty = (s?: string) => (s ?? "").trim().length > 0;
const list = (arr?: string[]) => (arr && arr.length ? arr : []);
const esc = (v?: string | number | null) => (v ?? "").toString().replace(/\r?\n/g, " ").trim();
const today = () => new Date().toISOString().slice(0, 10);

const mdHeader = (title: string) => `# ${title}\n`;
const mdH2 = (t: string) => `\n## ${t}\n`;
const mdH3 = (t: string) => `\n### ${t}\n`;
const mdKeyVal = (rows: [string, string | undefined][]) =>
  rows
    .filter(([, v]) => nonEmpty(v))
    .map(([k, v]) => `- **${k}:** ${v}`)
    .join("\n");

const mdTable = (headers: string[], rows: (string | number)[][]) => {
  const head = `| ${headers.join(" | ")} |`;
  const sep = `| ${headers.map(() => "---").join(" | ")} |`;
  const body = rows.map(r => `| ${r.map(c => esc(String(c))).join(" | ")} |`).join("\n");
  return `${head}\n${sep}\n${body}`;
};

const fallback = <T,>(v: T | undefined, f: T): T => (v === undefined || v === null ? f : v);

const tenderMeta = (b: Base) =>
  mdKeyVal([
    ["Opdrachtgever", b.tender?.authority],
    ["Aanbesteding", b.tender?.title],
    ["Referentie", b.tender?.referenceId],
    ["Sector", b.tender?.sector],
  ]);

const companyMeta = (b: Base) =>
  mdKeyVal([
    ["Inschrijver", b.company?.name],
    ["KvK", b.company?.kvk],
    ["BTW", b.company?.vat],
    ["Adres", b.company?.address],
    ["Contact", [b.company?.contact?.name, b.company?.contact?.email, b.company?.contact?.phone].filter(nonEmpty).join(" • ")],
  ]);

/* ---------------------- 1) EMVI / Voorstel ---------------------- */

export const promptEMVI = (b: Base & { keyRequirements?: string[] }) => {
  const reqs = list(b.keyRequirements);
  const strengths = list(b.company?.strengths);
  const certs = list(b.company?.certifications);

  const intro = [
    mdHeader("EMVI-Inschrijvingsplan"),
    tenderMeta(b),
    companyMeta(b),
    `- **Datum:** ${today()}`,
  ].filter(Boolean).join("\n");

  const samenvatting =
    mdH2("Managementsamenvatting") +
    `Deze inschrijving beschrijft onze aanpak voor **${b.tender?.title || "het project"}** van **${b.tender?.authority || "de opdrachtgever"}**. 
Wij voldoen aantoonbaar aan de gestelde (knock-out) eisen en bieden meerwaarde via kwaliteit, continuïteit en duurzaamheid. Alle claims zijn SMART uitgewerkt en belegd met KPI’s en bewijsstukken.`

  const eisen =
    mdH2("Traceerbaarheid naar eisen") +
    (reqs.length
      ? mdTable(["Eis / requirement", "Voldoening", "Bewijs / verwijzing"], reqs.map(r => [r, "Volledig conform", "Zie Compliance Matrix & Bewijsstukkenbundel"]))
      : "> Geen specifieke eisen aangeleverd via de wizard. Basisconformiteit geldt; zie Compliance Matrix.");

  const aanpak =
    mdH2("Aanpak & Werkmethodiek") +
    [
      mdH3("Planning & Fasering"),
      `We hanteren een strakke fasering met duidelijke mijlpalen, afhankelijkheden en beslismomenten. 
De initiële mobilisatie is binnen **5 werkdagen** na gunning, inclusief intake, definitieve planning en kick-off.`,
      mdH3("Kwaliteitsborging (PDCA)"),
      `- Plan: eisen vertalen naar werkpakketten, acceptatiecriteria en KPI’s\n- Do: uitvoering volgens standaard werkinstructies\n- Check: week- en maandrapportages, dashboards\n- Act: corrigerende maatregelen + structurele verbeteringen`,
      mdH3("Continuïteit & Beschikbaarheid"),
      `- Continuïteitsplan met escalatiematrix (24/7)\n- Flexibele bezetting via interne pool en partnernetwerk\n- Leveranciers-back-ups voor kritieke materialen`,
      mdH3("Duurzaamheid & Veiligheid"),
      `- Toepassing van **ISO 14001**-maatregelen\n- **VCA** geborgd, LMRA voor start werkzaamheden\n- Afvalscheiding en transportminimalisatie`,
    ].join("\n\n");

  const kpi =
    mdH2("KPI’s en Prestatiesturing (SMART)") +
    mdTable(
      ["KPI", "Norm/Target", "Meting", "Frequentie", "Escalatie"],
      [
        ["Klanttevredenheid", "≥ 8,0", "Enquête", "Maandelijks", "Projectleider → Directie"],
        ["Beschikbaarheid storingsdienst", "≥ 99,5%", "Registratiesysteem", "Dagelijks", "PL → Kwaliteitsmanager"],
        ["Reactietijd incidenten", "≤ 60 min", "Ticketsysteem", "Continu", "PL → MT"],
        ["First-Time-Right", "≥ 95%", "Controlelijsten", "Maandelijks", "PL → Kwaliteitsmanager"],
      ],
    );

  const bewijs =
    mdH2("Bewijsvoering & Bijlagen") +
    mdTable(
      ["Bewijsstuk", "Omschrijving", "Referentie"],
      [
        ["Certificaat ISO 9001", "Kwaliteitsmanagementsysteem", "Bijlage A"],
        ["VCA**", "Veiligheidsmanagement", "Bijlage B"],
        ["Continuïteitsplan", "Escalaties en fallback", "Bijlage C"],
        ["Risicoregister", "Beheersmaatregelen", "Bijlage D"],
      ],
    ) +
    (certs.length ? `\n\n**Aanvullende certificeringen:** ${certs.join(", ")}.` : "");

  const waarde =
    mdH2("Gunningswaarde (EMVI)") +
    mdTable(
      ["Gunningsaspect", "Meerwaarde", "Controleerbaarheid"],
      [
        ["Kwaliteit", "Aantoonbaar via KPI’s en audits", "Compliancematrix + dashboards"],
        ["Risicobeheersing", "Proactieve maatregelen en buffers", "Risicoregister + statusrapportage"],
        ["Continuïteit", "Pool + leveranciersback-ups", "Continuïteitsplan + responstijden"],
        ["Duurzaamheid", "ISO 14001-praktijk en reducties", "Rapportages CO₂/afval"],
      ],
    );

  const teamSterkten = strengths.length
    ? mdH2("Sterktes & Referenties") + strengths.map(s => `- ${s}`).join("\n")
    : "";

  const slot =
    mdH2("Slotverklaring") +
    `Met deze inschrijving leveren wij een **conforme** en **controleerbaar hoogwaardige** uitvoering, met duidelijke KPI’s, heldere rapportages en aantoonbare meerwaarde.`;

  return [intro, samenvatting, eisen, aanpak, kpi, bewijs, waarde, teamSterkten, slot].filter(Boolean).join("\n\n");
};

/* ---------------------- 2) Compliance Matrix (CSV of MD) ---------------------- */

export const promptCompliance = (b: Base & { compliance?: ComplianceRow[]; keyRequirements?: string[] }) => {
  const header = mdHeader("Compliance Matrix") + tenderMeta(b) + "\n" + companyMeta(b) + `\n- **Datum:** ${today()}\n`;
  const rows = (b.compliance || []).map((r) => [
    r.requirement || "-",
    r.knockout ? "KO" : "REQ",
    r.meets || "Yes",
    r.notes || (r.meets === "Yes" ? "Volledig conform" : "Nader toelichten"),
    r.attachmentRef || "",
  ]);

  const table = rows.length
    ? mdTable(["Eis", "Type", "Voldoening", "Toelichting/Bewijs", "Bijlage"], rows)
    : "> Geen afzonderlijke rijen ontvangen; basisconformiteit geldt met verwijzing naar bijlagen.";

  return [header, table].join("\n\n");
};

/* ---------------------- 3) Planning / Gantt (MD) ---------------------- */

export const promptPlanning = (b: Base & { milestones?: Milestone[] }) => {
  const ms = b.milestones && b.milestones.length ? b.milestones : [
    { name: "Kick-off", start: today(), end: today() },
  ];

  const header = mdHeader("Projectplanning (Gantt-overzicht)") + tenderMeta(b) + "\n" + companyMeta(b) + `\n- **Datum:** ${today()}\n`;

  const table = mdTable(["Mijlpaal", "Start", "Eind", "Opmerkingen"], ms.map(m => [
    m.name, m.start, m.end, "Conforme uitvoering; afhankelijkheden in weekplanning"
  ]));

  const borging =
    mdH2("Borging planning") +
    "- Weekplanning met afhankelijkheden en buffers\n- Gate-reviews per fase\n- Risico-gestuurde aanpassingen met opdrachtgever in Stuurgroep";

  return [header, table, borging].join("\n\n");
};

/* ---------------------- 4) KPI / SLA Dashboard (MD) ---------------------- */

export const promptKPI = (b: Base & { kpis?: KpiRow[] }) => {
  const header = mdHeader("KPI & SLA-overzicht") + tenderMeta(b) + "\n" + companyMeta(b) + `\n- **Datum:** ${today()}\n`;

  const rows = (b.kpis && b.kpis.length ? b.kpis : [
    { kpi: "Klanttevredenheid", target: "≥ 8,0", measure: "Enquête", frequency: "Maandelijks", escalation: "PL → Directie" },
    { kpi: "Beschikbaarheid", target: "≥ 99,5%", measure: "Registratiesysteem", frequency: "Dagelijks", escalation: "PL → Kwaliteitsmanager" },
    { kpi: "Reactietijd incidenten", target: "≤ 60 min", measure: "Ticketsysteem", frequency: "Continu", escalation: "PL → MT" },
  ]);

  const table = mdTable(["KPI/SLA", "Target", "Meting", "Frequentie", "Escalatie"], rows.map(r => [
    r.kpi, r.target, r.measure, r.frequency, r.escalation
  ]));

  const definities =
    mdH2("Definities") +
    "- **Beschikbaarheid**: percentage tijd dat dienstverlening operationeel is\n- **First Time Right**: in één keer goed, zonder herstelactie\n- **Reactietijd**: tijd tussen melding en start actie";

  return [header, table, definities].join("\n\n");
};

/* ---------------------- 5) Risicoregister (MD) ---------------------- */

export const promptRisks = (b: Base & { risks?: RiskRow[] }) => {
  const header = mdHeader("Risicoregister") + tenderMeta(b) + "\n" + companyMeta(b) + `\n- **Datum:** ${today()}\n`;

  const rows = (b.risks && b.risks.length ? b.risks : [
    { risk: "Weersomstandigheden veroorzaken vertraging", mitigation: "Buffer in planning + alternatieve werkwijze", probability: "Middel", impact: "Middel", owner: "PL", status: "Open" },
    { risk: "Leveringsproblemen bij leveranciers", mitigation: "Min. 3 leveranciers + veiligheidsvoorraad", probability: "Laag", impact: "Hoog", owner: "Inkoop", status: "Open" },
  ]);

  const table = mdTable(["Risico", "Maatregel", "Kans", "Impact", "Eigenaar", "Status"], rows.map(r => [
    r.risk, r.mitigation, r.probability || "-", r.impact || "-", r.owner || "-", r.status || "Open"
  ]));

  const toelichting =
    mdH2("Toelichting beheersing") +
    "- Proactieve monitoring in weekoverleg\n- Escalatie conform continuïteitsplan\n- Herbeoordeling na incident of wijziging";

  return [header, table, toelichting].join("\n\n");
};

/* ---------------------- 6) Projectreferenties (MD) ---------------------- */

export const promptReferences = (b: Base & { references?: { client: string; title: string; period: string; result: string }[] }) => {
  const header = mdHeader("Projectreferenties") + tenderMeta(b) + "\n" + companyMeta(b) + `\n- **Datum:** ${today()}\n`;

  const refs = (b.references && b.references.length ? b.references : [
    { client: "Gemeente Voorbeeldstad", title: "Onderhoud & aanleg civiele werken", period: "2023–2024", result: "Uitvoering conform planning en KPI >8,5" },
  ]);

  const table = mdTable(["Opdrachtgever", "Project", "Periode", "Resultaat / KPI"], refs.map(r => [
    r.client, r.title, r.period, r.result
  ]));

  return [header, table].join("\n\n");
};

/* ---------------------- 7) Aannames & Uitsluitingen (MD) ---------------------- */

export const promptAssumptions = (b: Base, assumptions: string[] = [], exclusions: string[] = []) => {
  const header = mdHeader("Aannames & Uitsluitingen") + tenderMeta(b) + "\n" + companyMeta(b) + `\n- **Datum:** ${today()}\n`;

  const aann = assumptions.length ? assumptions : ["Toegang tot locaties binnen overeengekomen vensters", "Vergunningen door opdrachtgever aangeleverd"];
  const uits = exclusions.length ? exclusions : ["Onvoorziene calamiteiten buiten invloedsfeer", "Werkzaamheden buiten scope zonder wijzigingsopdracht"];

  const aannTbl = mdTable(["Aanname", "Impact bij afwijking"], aann.map(a => [a, "Wijzigingsvoorstel en eventuele meer-/minderwerkafspraak"]));
  const uitsTbl = mdTable(["Uitsluiting", "Toelichting"], uits.map(u => [u, "Niet opgenomen in scope en prijs"]));

  return [header, mdH2("Aannames"), aannTbl, mdH2("Uitsluitingen"), uitsTbl].join("\n\n");
};

/* ---------------------- 8) Bewijsstukkenbundel (MD) ---------------------- */

export const promptEvidence = (b: Base & { compliance?: ComplianceRow[]; keyRequirements?: string[] }) => {
  const header = mdHeader("Bewijsstukkenbundel") + tenderMeta(b) + "\n" + companyMeta(b) + `\n- **Datum:** ${today()}\n`;

  const lines = [
    ["ISO 9001", "Kwaliteitsmanagement", "Bijlage A"],
    ["VCA**", "Veiligheidsmanagement", "Bijlage B"],
    ["Continuïteitsplan", "Escalaties en fallback", "Bijlage C"],
    ["Risicoregister", "Beheersmaatregelen", "Bijlage D"],
    ["KPI-overzicht", "Sturing en rapportage", "Bijlage E"],
  ];

  const table = mdTable(["Bewijs", "Omschrijving", "Referentie"], lines);

  return [header, table].join("\n\n");
};

/* ---------------------- 9) Clarificatievragen (MD) ---------------------- */

export const promptClarifications = (b: Base) => {
  const header = mdHeader("Inlichtingen / Clarificatievragen") + tenderMeta(b) + "\n" + companyMeta(b) + `\n- **Datum:** ${today()}\n`;

  const vragen = [
    {
      vraag: "Kunt u bevestigen of nachtwerk binnen scope valt en welke geluidsnormen gelden?",
      rationale: "Beïnvloedt planning, inzet en eventuele vergunningen",
      gevolg: "Planning / Compliance",
    },
    {
      vraag: "Welke definitie hanteert u voor storingsprioriteiten (P1–P3) en gewenste responstijden?",
      rationale: "Bepaalt KPI-inrichting en bezetting",
      gevolg: "KPI / Continuïteit",
    },
  ];

  const table = mdTable(["Vraag", "Rationale", "Gevolg (prijs/planning/compliance)"], vragen.map(v => [v.vraag, v.rationale, v.gevolg]));

  return [header, table].join("\n\n");
};

/* ---------------------- 10) README / Lees-mij (MD) ---------------------- */

export const promptREADME = (b: Base) => {
  const header = mdHeader("README / Lees-mij") + tenderMeta(b) + "\n" + companyMeta(b) + `\n- **Datum:** ${today()}\n`;

  const inhoud =
    mdH2("Inhoud bundel") +
    mdTable(
      ["Bestand", "Omschrijving"],
      [
        ["EMVI_Versie_1.0.docx", "Volledig inschrijvingsplan (EMVI)"],
        ["Compliance_Matrix.docx", "Traceerbaarheid KO/REQ & bewijs"],
        ["Planning_Gantt.docx", "Mijlpalen en borging"],
        ["KPI_SLA_Dashboard.docx", "KPI’s/SLA’s en definities"],
        ["Risicoregister.docx", "Risico’s en beheersing"],
        ["Assumpties_Uitsluitingen.docx", "Aannames en uitsluitingen"],
        ["Bewijsstukkenbundel.docx", "Overzicht relevante bijlagen"],
        ["Clarificatievragen.docx", "Vragen voor NvI"],
        ["Projectreferenties.docx", "Relevante referenties"],
      ],
    );

  const instructie =
    mdH2("Aanleverinstructie") +
    "- Controleer referenties op juistheid van namen/data\n- Vul optioneel contactpersonen en telefoonnummers aan\n- Exporteer alle bestanden naar .docx (gebeurt automatisch in de app)\n- Upload in TenderNed met referentie **" +
    (b.tender?.referenceId || "—") +
    "**";

  return [header, inhoud, instructie].join("\n\n");
};

/* ---------------------- 11) Scoring (korte kwaliteitscheck) ---------------------- */

export const promptScore = (text: string) => {
  // Simpele heuristische check (deterministisch). Eventueel later vervangen door LLM.
  const penalties: string[] = [];
  if (/lorem ipsum|tbd|vul in/i.test(text)) penalties.push("Verwijder placeholders (TBD/Lorem/Vul in).");
  if (!/KPI|SLA/i.test(text)) penalties.push("Voeg KPI/SLA-sectie toe met targets en metingen.");
  if (!/Compliance|Knock-out|KO|REQ/i.test(text)) penalties.push("Koppel tekst expliciet aan KO/REQ-eisen.");
  if (!/Bewijs|Bijlage|Certificaat/i.test(text)) penalties.push("Verwijs naar bewijsstukken (certificaten/plan/rapportages).");

  const scoreBase = 95;
  const score = Math.max(60, scoreBase - penalties.length * 8);
  return { score, notes: penalties.length ? penalties : ["Tekst is inleverklaar opgesteld."] };
};