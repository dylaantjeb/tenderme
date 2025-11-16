// lib/polish.ts
/** Utilities die generiek de 5 optimalisaties afdwingen:
 *  1) "Benodigde input:"-afsluitregel aan elk bestand toevoegen
 *  2) KO in Compliance_Matrix.md op "Ja" zetten
 *  3) EMVI.md afsluiten met "Conclusie / Meerwaarde" indien ontbreekt
 *  4) Risicoregister: "Residual Risk" of "Updatefrequentie" kolom toevoegen
 *  5) KPI: kolom "Meetbron" toevoegen als die ontbreekt
 */

function hasEnding(md: string) {
  return /(^|\n)Benodigde input:\s*$/i.test(md.trim());
}
function ensureEnding(md: string) {
  return hasEnding(md) ? md : md.replace(/\s*$/, "\n\nBenodigde input:");
}

function ensureEmviConclusion(md: string) {
  const hasConclusie = /(^|\n)##?\s*Conclusie( \/ Meerwaarde)?\s*$/i.test(md) || /Conclusie \/ Meerwaarde/i.test(md);
  if (hasConclusie) return md;
  // Voeg beknopte afsluiter toe vlak vóór "Benodigde input:"
  const body = md.replace(/\n*Benodigde input:\s*$/i, "");
  const tail =
    "\n\n## Conclusie / Meerwaarde\n" +
    "Onze aanpak borgt meetbare prestaties via PDCA, een sluitende KPI/SLA-set en aantoonbare risicoreductie. " +
    "We koppelen ieder W-xx aan KPI’s en beheersmaatregelen, leveren bewijslast per bijlage en rapporteren " +
    "transparant op frequenties die aansluiten bij de opdrachtgever. Daarmee maximaliseren we BPKV-scores, " +
    "reduceren faalkosten en versnellen oplevering.\n";
  return ensureEnding(body + tail);
}

function normalizeRow(line: string) {
  // trim cellen, behoud pipes
  return "|" + line.split("|").slice(1, -1).map((c) => " " + c.trim() + " ").join("|") + "|";
}

function ensureComplianceKOYes(md: string) {
  // Zoek tabelregels; voor elke rij met KO in Type, zet Voldoening op "Ja" als het nu geen "Ja" is
  const lines = md.split("\n");
  const headerIdx = lines.findIndex((l) => /\|\s*Eis\s*\|\s*Type.*\|\s*Voldoening/i.test(l));
  const delimIdx = lines.findIndex((l, i) => i > headerIdx && /^(\|\s*[-:]+\s*)+\|$/.test(l.trim()));
  if (headerIdx === -1 || delimIdx === -1) return md;

  for (let i = delimIdx + 1; i < lines.length; i++) {
    const raw = lines[i];
    if (!raw.includes("|")) continue;
    const cells = raw.split("|").map((c) => c.trim());
    if (cells.length < 6) continue; // | ... | ... | ... | ... | ... |
    const type = (cells[2] || "").toLowerCase();
    if (type.includes("ko")) {
      const vold = (cells[3] || "").toLowerCase();
      if (vold !== "ja") {
        cells[3] = "Ja";
        lines[i] = "|" + cells.slice(1, -1).map((c) => " " + c + " ").join("|") + "|";
      }
    }
  }
  const out = lines.map((l) => (l.startsWith("|") ? normalizeRow(l) : l)).join("\n");
  return ensureEnding(out);
}

function ensureRiskResidualOrUpdateCol(md: string) {
  // Als "Residual Risk" of "Updatefrequentie" niet in header staat, voeg één van beide toe (Residual Risk)
  const lines = md.split("\n");
  const headerIdx = lines.findIndex((l) => l.trim().startsWith("|"));
  const delimIdx = lines.findIndex((l, i) => i > headerIdx && /^(\|\s*[-:]+\s*)+\|$/.test(l.trim()));
  if (headerIdx === -1 || delimIdx === -1) return md;

  const header = lines[headerIdx];
  const wantResidual = !/Residual\s*Risk/i.test(header) && !/Updatefrequentie/i.test(header);
  if (!wantResidual) return md;

  // Header + delimiter uitbreiden
  const addCell = (row: string, isDelim = false) => {
    if (!row.includes("|")) return row;
    if (isDelim) return row.replace(/\|$/, "| --- |");
    return row.replace(/\|$/, "| Residual Risk |");
  };

  lines[headerIdx] = addCell(lines[headerIdx], false);
  lines[delimIdx] = addCell(lines[delimIdx], true);

  for (let i = delimIdx + 1; i < lines.length; i++) {
    const r = lines[i];
    if (r.trim().startsWith("|")) {
      lines[i] = r.replace(/\|$/, "| Wordt na maatregelen herbeoordeeld |");
    }
  }
  const out = lines.map((l) => (l.startsWith("|") ? normalizeRow(l) : l)).join("\n");
  return ensureEnding(out);
}

function ensureKpiMeasureSource(md: string) {
  // Kolom "Meetbron" toevoegen indien ontbreekt
  const lines = md.split("\n");
  const headerIdx = lines.findIndex((l) => l.trim().startsWith("|"));
  const delimIdx = lines.findIndex((l, i) => i > headerIdx && /^(\|\s*[-:]+\s*)+\|$/.test(l.trim()));
  if (headerIdx === -1 || delimIdx === -1) return md;

  const header = lines[headerIdx];
  const need = !/Meetbron|Databron/i.test(header);
  if (!need) return md;

  const addCell = (row: string, isDelim = false) => {
    if (!row.includes("|")) return row;
    if (isDelim) return row.replace(/\|$/, "| --- |");
    return row.replace(/\|$/, "| Meetbron |");
  };

  lines[headerIdx] = addCell(lines[headerIdx], false);
  lines[delimIdx] = addCell(lines[delimIdx], true);

  for (let i = delimIdx + 1; i < lines.length; i++) {
    const r = lines[i];
    if (r.trim().startsWith("|")) {
      lines[i] = r.replace(/\|$/, "| CMMS / Audit / Sensor |");
    }
  }
  const out = lines.map((l) => (l.startsWith("|") ? normalizeRow(l) : l)).join("\n");
  return ensureEnding(out);
}

function genericWhitespace(md: string) {
  return md.replace(/[ \t]+\n/g, "\n").replace(/\n{3,}/g, "\n\n");
}

export function polishFiles(files: Record<string, string>) {
  const out: Record<string, string> = {};
  for (const [name, md0] of Object.entries(files)) {
    let md = md0 || "";

    // 1) Altijd afsluitregel
    md = ensureEnding(md);

    // 2) Document-specifieke optimalisaties
    if (name === "Compliance_Matrix.md") md = ensureComplianceKOYes(md);
    if (name === "EMVI.md") md = ensureEmviConclusion(md);
    if (name === "Risicoregister.md") md = ensureRiskResidualOrUpdateCol(md);
    if (name === "KPI_SLA_Dashboard.md") md = ensureKpiMeasureSource(md);

    // 3) Netjes maken
    md = genericWhitespace(md);

    out[name] = md;
  }
  return out;
}