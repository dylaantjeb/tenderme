// app/lib/tenderValidation.ts
export function validateFiles(files: Record<string, string>) {
  const messages: string[] = [];
  const gates: Record<string, boolean> = {
    PLACEHOLDERS: true,
    KPI: true,
    RISKS: true,
    WLINKS: true,
    SECTIONS: true,
  };

  // 1) Placeholders?
  const hasPh = Object.values(files).some((t) =>
    /\[(TO ?FILL|TBD|LOREM IPSUM)[^\]]*\]/i.test(t)
  );
  if (hasPh) {
    messages.push("Placeholders gevonden — verwijder [TO FILL]/TBD.");
    gates.PLACEHOLDERS = false;
  }

  // 2) Minimale aantallen
  const kpiCount = (files["KPI_SLA_Dashboard.md"] || "")
    .split("\n")
    .filter((l) => l.includes("|")).length;
  if (kpiCount < 12) {
    messages.push(`Minimaal 12 KPI's vereist (nu ${kpiCount}).`);
    gates.KPI = false;
  }

  const riskCount = (files["Risicoregister.md"] || "")
    .split("\n")
    .filter((l) => l.includes("|")).length;
  if (riskCount < 10) {
    messages.push(`Minimaal 10 risico's vereist (nu ${riskCount}).`);
    gates.RISKS = false;
  }

  // 3) W-xx links aanwezig in KPI en Risico?
  const allW = new Set<string>();
  (files["EMVI.md"] || "")
    .match(/\bW-\d{2,3}\b/g)?.forEach((w) => allW.add(w));
  const kpiText = files["KPI_SLA_Dashboard.md"] || "";
  const riskText = files["Risicoregister.md"] || "";
  const missing: string[] = [];
  allW.forEach((w) => {
    const ok = new RegExp(`\\b${w}\\b`).test(kpiText) && new RegExp(`\\b${w}\\b`).test(riskText);
    if (!ok) missing.push(w);
  });
  if (missing.length) {
    messages.push(`W-xx zonder KPI- én risico-link: ${missing.join(", ")}`);
    gates.WLINKS = false;
  }

  // 4) Zijn alle beoogde secties er?
  const required = [
    "README_lees_mij.md",
    "EMVI.md",
    "Beoordelingsmethodiek_EMVI.md",
    "Compliance_Matrix.md",
    "Risicoregister.md",
    "KPI_SLA_Dashboard.md",
    "Planning_Gantt.md",
    "Bewijsstukkenbundel.md",
    "Assumpties_Uitsluitingen.md",
    "Clarificatievragen.md",
    "Projectreferenties.md",
  ];
  const missingFiles = required.filter((f) => !files[f]);
  if (missingFiles.length) {
    messages.push(`Ontbrekende bestanden: ${missingFiles.join(", ")}`);
    gates.SECTIONS = false;
  }

  return {
    ok: Object.values(gates).every(Boolean),
    messages,
    gates,
  };
}