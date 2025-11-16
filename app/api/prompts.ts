import { NextRequest, NextResponse } from "next/server";
import path from "path";
import { promises as fs } from "fs";

/* -------------------- configuratie -------------------- */
const EXPECTED_FILES = [
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

const MIN_KPIS = 12;
const MIN_RISKS = 10;
const MIN_REFS = 3;

/* -------------------- helpers -------------------- */
async function loadFile(jobId: string, name: string) {
  const p = path.join(process.cwd(), "outputs", jobId, name);
  try {
    return await fs.readFile(p, "utf8");
  } catch {
    return "";
  }
}

function tableRowCount(md: string) {
  const lines = (md || "").split("\n");
  const idxHeader = lines.findIndex((l) => l.trim().startsWith("|"));
  const idxDelim = lines.findIndex((l, i) => i > idxHeader && /^(\|\s*-{2,}\s*)+\|?$/.test(l.trim()));
  if (idxHeader === -1 || idxDelim === -1) return 0;
  return lines.slice(idxDelim + 1).filter((l) => l.trim().startsWith("|")).length;
}

function findAllW(md: string): string[] {
  const set = new Set<string>();
  const m = (md || "").match(/\bW-\d{2}\b/g) || [];
  m.forEach((w) => set.add(w));
  return Array.from(set).sort();
}

function hasPlaceholders(md: string) {
  return /\[(?:TO ?FILL|TBD|PLACEHOLDER|XXX)\]/i.test(md) || /lorem ipsum/i.test(md);
}

function hasEnding(md: string) {
  return /Benodigde input:\s*$/i.test((md || "").trim());
}

function extractWFromEmviTable(md: string): string[] {
  const w = (md || "").match(/\bW-\d{2}\b/g) || [];
  return Array.from(new Set(w)).sort();
}

/* -------------------- route -------------------- */
export async function POST(req: NextRequest) {
  try {
    const { jobId } = await req.json();
    if (!jobId) {
      return NextResponse.json({ ok: false, messages: ["jobId ontbreekt"], gates: {} }, { status: 400 });
    }

    // laad alle relevante bestanden
    const files: Record<string, string> = {};
    await Promise.all(
      EXPECTED_FILES.map(async (f) => {
        files[f] = await loadFile(jobId, f);
      })
    );

    const messages: string[] = [];
    const hints: string[] = [];
    const gates: Record<string, boolean> = {
      SECTIONS: true,
      PLACEHOLDERS: true,
      ENDING: true,
      KPI_MIN: true,
      RISK_MIN: true,
      REFS_MIN: true,
      W2KPI: true,
      W2RISKS: true,
      KO_OK: true,
    };

    // 1) Bestanden aanwezig + non-empty
    const missing = EXPECTED_FILES.filter((f) => !files[f]?.trim());
    if (missing.length) {
      gates.SECTIONS = false;
      messages.push(`Ontbrekende of lege bestanden: ${missing.join(", ")}`);
      hints.push("Genereer alle verplichte FILE-blokken volgens de vaste volgorde.");
    }

    // 2) Placeholders & “Benodigde input:” afsluiting per bestand
    for (const [name, md] of Object.entries(files)) {
      if (!md) continue;
      if (hasPlaceholders(md)) {
        gates.PLACEHOLDERS = false;
        messages.push(`Placeholders gedetecteerd in ${name}`);
        hints.push(`Vervang alle placeholders in ${name} door concrete, SMART geformuleerde tekst.`);
      }
      if (!hasEnding(md)) {
        gates.ENDING = false;
        messages.push(`Ontbrekende slotregel "Benodigde input:" in ${name}`);
        hints.push(`Voeg onderaan ${name} exact de regel "Benodigde input:" toe (laat leeg indien compleet).`);
      }
    }

    // 3) Minima KPI/Risico/Referenties
    const kpiRows = tableRowCount(files["KPI_SLA_Dashboard.md"] || "");
    if (kpiRows < MIN_KPIS) {
      gates.KPI_MIN = false;
      messages.push(`Te weinig KPI's: ${kpiRows}/${MIN_KPIS}`);
      hints.push(`Voeg minimaal ${MIN_KPIS - kpiRows} extra KPI's toe en koppel aan W-xx in "Link W-xx/criterium".`);
    }

    const riskRows = tableRowCount(files["Risicoregister.md"] || "");
    if (riskRows < MIN_RISKS) {
      gates.RISK_MIN = false;
      messages.push(`Te weinig risico's: ${riskRows}/${MIN_RISKS}`);
      hints.push(`Voeg minimaal ${MIN_RISKS - riskRows} extra risico's toe en vul "Link KPI/W-xx".`);
    }

    const refsRows = tableRowCount(files["Projectreferenties.md"] || "");
    if (refsRows < MIN_REFS) {
      gates.REFS_MIN = false;
      messages.push(`Te weinig referenties: ${refsRows}/${MIN_REFS}`);
      hints.push(`Voeg ${MIN_REFS - refsRows} extra referentieprojecten toe met resultaten/KPI's en contactpersoon.`);
    }

    // 4) W-xx ↔ KPI ↔ Risico consistentie
    const emviW = extractWFromEmviTable(files["EMVI.md"] || "");
    const kpiW = findAllW(files["KPI_SLA_Dashboard.md"] || "");
    const riskW = findAllW(files["Risicoregister.md"] || "");

    const missingInKpi = emviW.filter((w) => !kpiW.includes(w));
    if (missingInKpi.length) {
      gates.W2KPI = false;
      messages.push(`W-xx zonder KPI-link: ${missingInKpi.join(", ")}`);
      hints.push(`Voeg voor ${missingInKpi.join(", ")} KPI-regels toe of vul "Link W-xx/criterium" aan.`);
    }

    const missingInRisk = emviW.filter((w) => !riskW.includes(w));
    if (missingInRisk.length) {
      gates.W2RISKS = false;
      messages.push(`W-xx zonder risicolink: ${missingInRisk.join(", ")}`);
      hints.push(`Koppel risico’s aan ${missingInRisk.join(", ")} in "Link KPI/W-xx".`);
    }

    // 5) Compliance: KO moet “Ja” bevatten
    const compl = files["Compliance_Matrix.md"] || "";
    if (compl) {
      const lines = compl.split("\n").filter((l) => l.trim().startsWith("|"));
      const headerIdx = lines.findIndex((l) => /\|\s*Eis\s*\|\s*Type\s*\(KO\/REQ\)\s*\|\s*Voldoening/i.test(l));
      let koNotOk = 0;
      for (let i = headerIdx + 2; i < lines.length; i++) {
        const cells = lines[i].split("|").map((c) => c.trim().toLowerCase());
        const isKO = cells.some((c) => c === "ko" || c.includes("ko/"));
        const okJa = cells.some((c) => c === "ja");
        if (isKO && !okJa) koNotOk++;
      }
      if (koNotOk > 0) {
        gates.KO_OK = false;
        messages.push(`Compliance: ${koNotOk} KO-eis(en) niet op "Ja".`);
        hints.push(`Zet Voldoening = "Ja" en verwijs naar aantoonbaar bewijs (bijlage/nummer).`);
      }
    }

    const ok = Object.values(gates).every(Boolean);
    const detail = {
      counts: { kpis: kpiRows, risks: riskRows, refs: refsRows, wInEmvi: emviW.length },
      missingInKpi,
      missingInRisk,
      emviW,
    };

    return NextResponse.json({ ok, messages, gates, hints, detail });
  } catch (e: any) {
    console.error("❌ VALIDATE ERROR:", e);
    return NextResponse.json({ ok: false, messages: [e.message || String(e)], gates: {} }, { status: 400 });
  }
}