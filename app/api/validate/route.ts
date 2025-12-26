// app/api/validate/route.ts
import { NextRequest, NextResponse } from "next/server";
import path from "path";
import { promises as fs } from "fs";
import { SPECS } from "../../lib/specs";

const EXPECTED_FILES = SPECS.map((s) => s.filename);
const MIN_KPIS = 12;
const MIN_RISKS = 10;
const MIN_REFS = 3;

function wordCount(md: string) {
  return (md.replace(/```[\s\S]*?```/g, "").match(/\b[\p{L}\p{N}’'-]+\b/gu) || []).length;
}
function tableCount(md: string) {
  return (md.match(/\n\|.*\|\n\|(?:[-:]+\|)+/g) || []).length;
}
function hasPlaceholders(md: string) {
  return (
    /\[(?:TO ?FILL|TBD|XXX|PLACEHOLDER)\]/i.test(md) ||
    /lorem ipsum/i.test(md) ||
    /\bW-xx\b/i.test(md) ||
    /\bW-\d{2}\b/i.test(md) ||
    /\bN\.?T\.?B\.?\b/i.test(md) ||
    /\bTODO\b/i.test(md) ||
    /\bTBD\b/i.test(md) ||
    /\{\{\s*[^}]+\s*\}\}/.test(md)
  );
}
function hasEnding(md: string) {
  return /(^|\n)Benodigde input:\s*$/i.test(md.trim());
}
function tableRowCount(md: string) {
  const lines = md.split("\n");
  const idxHeader = lines.findIndex((l) => l.trim().startsWith("|"));
  const idxDelim = lines.findIndex((l, i) => i > idxHeader && /^(\|\s*-{2,}\s*)+\|?$/.test(l.trim()));
  if (idxHeader === -1 || idxDelim === -1) return 0;
  return lines.slice(idxDelim + 1).filter((l) => l.trim().startsWith("|")).length;
}
function findAllW(md: string): string[] {
  return Array.from(new Set(md.match(/\bW-\d{2}\b/g) || [])).sort();
}
function extractWFromEmvi(md: string): string[] {
  const block = md.split(/Programma van Wensen|W-xx/i)[1] || "";
  const tblPart = block.split("\n\n")[0] || md;
  return Array.from(new Set((tblPart.match(/\bW-\d{2}\b/g) || []))).sort();
}
async function loadFile(jobId: string, name: string) {
  const p = path.join(process.cwd(), "outputs", jobId, name);
  try {
    return await fs.readFile(p, "utf8");
  } catch {
    return "";
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const jobId: string | undefined = body?.jobId;
    const emviText: string | undefined = body?.emviText;
    const criteriaTitles: string[] = Array.isArray(body?.criteriaTitles) ? body.criteriaTitles : [];

    // Mode B: validate a single EMVI text blob (no jobId/files)
    if (emviText && typeof emviText === "string") {
      const messages: string[] = [];
      const hints: string[] = [];

      // Blocker checks
      const placeholderHit = hasPlaceholders(emviText);
      if (placeholderHit) {
        messages.push("Placeholders gedetecteerd in EMVI-tekst (bijv. W-xx / NTB / TODO / {{...}}).");
        hints.push("Vervang alle placeholders door concrete, SMART geformuleerde tekst of genereer de betreffende sectie opnieuw.");
      }

      const mustHave = ["Doel", "Aanpak", "Toegevoegde waarde", "Meetbaar"];
      const missing = mustHave.filter((k) => !new RegExp(`\\b${k}\\b`, "i").test(emviText));
      if (missing.length) {
        messages.push(`EMVI-structuur mist onderdelen: ${missing.join(", ")}.`);
        hints.push("Zorg dat elk gunningscriterium minimaal Doel/Aanpak/Toegevoegde waarde/Meetbaar resultaat bevat.");
      }

      // Warning: criteria coverage (if provided)
      if (criteriaTitles.length) {
        const notFound = criteriaTitles.filter((t) => {
          const safe = String(t).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
          return safe && !new RegExp(safe, "i").test(emviText);
        });
        if (notFound.length) {
          messages.push(`Niet alle criteria-titels komen letterlijk terug in de EMVI-tekst (${notFound.length}).`);
          hints.push("Gebruik exact dezelfde titel/terminologie als in de leidraad voor scoringsherkenning.");
        }
      }

      // Simple score
      let score = 100;
      if (placeholderHit) score -= 40;
      if (missing.length) score -= 30;
      // only a mild penalty if the user supplied titles AND some are not found
      if (criteriaTitles.length) {
        const notFound = criteriaTitles.filter((t) => {
          const safe = String(t).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
          return safe && !new RegExp(safe, "i").test(emviText);
        });
        if (notFound.length) score -= 10;
      }
      score = Math.max(0, Math.min(100, score));

      const ok = !placeholderHit && missing.length === 0;
      return NextResponse.json({ ok, score, messages, hints, mode: "emviText" });
    }

    // Mode A: validate generated files by jobId
    if (!jobId) {
      return NextResponse.json(
        { ok: false, messages: ["jobId of emviText ontbreekt"], gates: {} },
        { status: 400 }
      );
    }

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
      LENGTH: true,
      TABLES: true,
    };

    // 1) Bestanden aanwezig
    const missing = EXPECTED_FILES.filter((f) => !files[f]?.trim());
    if (missing.length) {
      gates.SECTIONS = false;
      messages.push(`Ontbrekende of lege bestanden: ${missing.join(", ")}`);
      hints.push("Genereer alle verplichte FILE-blokken volgens de vaste volgorde.");
    }

    // 2) Per-spec lengte/tabel/placeholder/ending
    for (const spec of SPECS) {
      const md = files[spec.filename] || "";

      if (md && spec.minWords && wordCount(md) < spec.minWords) {
        gates.LENGTH = false;
        messages.push(`${spec.filename}: te kort (${wordCount(md)} < ${spec.minWords} woorden)`);
      }
      if (md && spec.minTables && tableCount(md) < spec.minTables) {
        gates.TABLES = false;
        messages.push(`${spec.filename}: te weinig tabellen (${tableCount(md)} < ${spec.minTables})`);
      }
      if (md && hasPlaceholders(md)) {
        gates.PLACEHOLDERS = false;
        messages.push(`Placeholders gedetecteerd in ${spec.filename}`);
        hints.push(`Vervang alle placeholders in ${spec.filename} door concrete, SMART geformuleerde tekst.`);
      }
      if (md && !hasEnding(md)) {
        gates.ENDING = false;
        messages.push(`Ontbrekende slotregel "Benodigde input:" in ${spec.filename}`);
        hints.push(`Voeg onderaan ${spec.filename} exact de regel "Benodigde input:" toe (laat leeg indien compleet).`);
      }
    }

    // 3) KPI/Risico/Referenties minima
    const kpiRows = tableRowCount(files["KPI_SLA_Dashboard.md"] || "");
    if (kpiRows < MIN_KPIS) {
      gates.KPI_MIN = false;
      messages.push(`Te weinig KPI's: ${kpiRows}/${MIN_KPIS}`);
      hints.push(`Voeg minimaal ${MIN_KPIS - kpiRows} extra KPI's toe (SMART) en koppel ze aan W-xx in de kolom "Link W-xx/criterium".`);
    }

    const riskRows = tableRowCount(files["Risicoregister.md"] || "");
    if (riskRows < MIN_RISKS) {
      gates.RISK_MIN = false;
      messages.push(`Te weinig risico's: ${riskRows}/${MIN_RISKS}`);
      hints.push(`Voeg minimaal ${MIN_RISKS - riskRows} extra risico's toe en vul de kolom "Link KPI/W-xx".`);
    }

    const refsRows = tableRowCount(files["Projectreferenties.md"] || "");
    if (refsRows < MIN_REFS) {
      gates.REFS_MIN = false;
      messages.push(`Te weinig referenties: ${refsRows}/${MIN_REFS}`);
      hints.push(`Voeg ${MIN_REFS - refsRows} extra referentieprojecten toe met resultaten/KPI's en contactpersoon.`);
    }

    // 4) W-xx koppelingen
    const emviW = extractWFromEmvi(files["EMVI.md"] || "");
    const kpiW = findAllW(files["KPI_SLA_Dashboard.md"] || "");
    const riskW = findAllW(files["Risicoregister.md"] || "");
    const missingInKpi = emviW.filter((w) => !kpiW.includes(w));
    const missingInRisk = emviW.filter((w) => !riskW.includes(w));
    if (missingInKpi.length) {
      gates.W2KPI = false;
      messages.push(`W-xx zonder KPI-link: ${missingInKpi.join(", ")}`);
      hints.push(`Voeg voor ${missingInKpi.join(", ")} KPI-regels toe of vul "Link W-xx/criterium" aan.`);
    }
    if (missingInRisk.length) {
      gates.W2RISKS = false;
      messages.push(`W-xx zonder risicolink: ${missingInRisk.join(", ")}`);
      hints.push(`Koppel risico’s aan ${missingInRisk.join(", ")} in "Link KPI/W-xx".`);
    }

    // 5) Compliance: KO = Ja
    const compl = files["Compliance_Matrix.md"] || "";
    if (compl) {
      const lines = compl.split("\n").filter((l) => l.trim().startsWith("|"));
      const headerIdx = lines.findIndex((l) => /\|\s*Eis\s*\|\s*Type.*\|\s*Voldoening/i.test(l));
      let koNotOk = 0;
      for (let i = headerIdx + 2; i < lines.length; i++) {
        const cells = lines[i].split("|").map((c) => c.trim().toLowerCase());
        const isKO = cells.some((c) => c.includes("ko"));
        const voldJa = cells.some((c) => c === "ja");
        if (isKO && !voldJa) koNotOk++;
      }
      if (koNotOk > 0) {
        gates.KO_OK = false;
        messages.push(`Compliance: ${koNotOk} KO-eis(en) niet op "Ja".`);
        hints.push(`Zet Voldoening = "Ja" en verwijs naar aantoonbaar bewijs (bijlage/nummer).`);
      }
    }

    // Eindresultaat
    const ok = Object.values(gates).every(Boolean);
    const total = Object.keys(gates).length;
    const passed = Object.values(gates).filter(Boolean).length;
    const score = Math.round((passed / total) * 100);
    return NextResponse.json({ ok, score, messages, gates, hints, detail: { emviW, kpiRows, riskRows, refsRows }, mode: "jobId" });
  } catch (e: any) {
    console.error("❌ VALIDATE ERROR:", e);
    return NextResponse.json({ ok: false, messages: [e.message || String(e)], gates: {} }, { status: 400 });
  }
}