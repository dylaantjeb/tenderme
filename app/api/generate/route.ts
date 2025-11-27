// app/api/generate/route.ts
import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import { mkdir, writeFile } from "fs/promises";
import path from "path";
import JSZip from "jszip";
import crypto from "crypto";
import "encoding"; // voorkomt html-to-docx importfout

import * as Orchestrator from "@/lib/orchestrator";
import { mdToDocxBuffer } from "@/lib/docx";
import { mdToPdfBuffer } from "@/lib/pdf";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

/* -------------------------------------------------------
   Branding helpers (titelpagina .docx + .pdf)
------------------------------------------------------- */
function getHumanTitle(filename: string): string {
  const base = filename.replace(/\.md$/i, "");
  switch (base) {
    case "README_lees_mij":
      return "README — Lees Mij";
    case "EMVI":
      return "EMVI / Plan van Aanpak";
    case "Beoordelingsmethodiek_EMVI":
      return "Beoordelingsmethodiek (EMVI/BPKV)";
    case "Compliance_Matrix":
      return "Compliance Matrix (UEA / KO / REQ)";
    case "Risicoregister":
      return "Risicoregister";
    case "KPI_SLA_Dashboard":
      return "KPI / SLA Dashboard";
    case "Planning_Gantt":
      return "Planning (ASCII Gantt + Toelichting)";
    case "Bewijsstukkenbundel":
      return "Bewijsstukkenbundel";
    case "Assumpties_Uitsluitingen":
      return "Assumpties & Uitsluitingen";
    case "Clarificatievragen":
      return "Nota van Inlichtingen — Clarificaties";
    case "Projectreferenties":
      return "Projectreferenties";
    default:
      return base;
  }
}

function getBranding(payload: any) {
  const companyName: string =
    payload?.company?.name ||
    payload?.company?.legal_name ||
    "Aanbestedingsteam";

  const subtitle =
    payload?.tender?.name ||
    payload?.tender?.title ||
    companyName;

  const logoUrl: string | undefined =
    payload?.visual_prefs?.logo_url ||
    payload?.company?.logo_url ||
    undefined;

  return { subtitle: companyName + (subtitle ? ` — ${subtitle}` : ""), logoUrl };
}

/* -------------------------------------------------------
   ZIP bewaren: schrijf .md op schijf (voor validator),
   maar stop alleen .docx + .pdf in de ZIP.
------------------------------------------------------- */
async function saveZip(
  jobId: string,
  files: Record<string, string>,
  payload: any
) {
  const outDir = path.join(process.cwd(), "outputs", jobId);
  await mkdir(outDir, { recursive: true });

  const zip = new JSZip();
  const { subtitle, logoUrl } = getBranding(payload);

  for (const [name, content] of Object.entries(files)) {
    // 1) .md op schijf (NIET in zip) — voor /api/validate
    const mdPath = path.join(outDir, name);
    await writeFile(mdPath, content, "utf8");

    // 2) .docx (met titelpagina) — WEL in zip
    try {
      const docTitle = getHumanTitle(name);
      const docxName = `${name.replace(/\.md$/i, "")}.docx`;
      const docxBuf = await mdToDocxBuffer(content, docTitle, subtitle, logoUrl);
      await writeFile(path.join(outDir, docxName), docxBuf);
      zip.file(docxName, docxBuf);
    } catch (err) {
      console.warn(`⚠️ DOCX generatie mislukt voor ${name}:`, (err as Error)?.message);
    }

    // 3) .pdf (met titelpagina) — WEL in zip
    try {
      const pdfTitle = getHumanTitle(name);
      const pdfName = `${name.replace(/\.md$/i, "")}.pdf`;
      const pdfBuf = await mdToPdfBuffer(content, pdfTitle, subtitle, logoUrl);
      await writeFile(path.join(outDir, pdfName), pdfBuf);
      zip.file(pdfName, pdfBuf);
    } catch (err) {
      console.warn(`⚠️ PDF generatie mislukt voor ${name}:`, (err as Error)?.message);
    }
  }

  const zipBuf = await zip.generateAsync({ type: "nodebuffer" });
  await writeFile(path.join(outDir, "tender_bundle.zip"), zipBuf);
  return outDir;
}

/* -------------------------------------------------------
   API handler
------------------------------------------------------- */
export async function POST(req: NextRequest) {
  try {
    const payload = await req.json();

    const cheapModeEnv = process.env.CHEAP_MODE === "1";
    const isCheap = cheapModeEnv || payload?.cheap === true;

    const modelName = isCheap
      ? process.env.OPENAI_MODEL_CHEAP || "gpt-4o-mini"
      : process.env.OPENAI_MODEL || "gpt-5";

    console.log(`🚀 Using model: ${modelName} (${isCheap ? "CHEAP" : "FULL"})`);

    // 2) Documentgeneratie (markdown)
    const files1 = await Orchestrator.generateDocs(client, modelName, payload);

    // 3) Cross-file polish + ✅ AUTOFIX
    const files2 = Orchestrator.reconcileLinks(files1);
    const files3 = Orchestrator.autoFix(files2);        // ⬅️ NIEUW
    const files = Orchestrator.finalQuality(files3);

    // 4) Opslaan (.md op schijf) + ZIP maken (.docx + .pdf)
    const jobId = crypto.randomUUID();
    await saveZip(jobId, files, payload);

    // 5) Preview
    const emviPreview =
      files["EMVI.md"]?.split("\n").slice(0, 150).join("\n") || "Geen preview.";

    // 6) Validatie
    let validation: any = {};
    try {
      const base =
        process.env.NEXT_PUBLIC_BASE_URL || req.nextUrl?.origin || "http://localhost:3000";
      const res = await fetch(`${base}/api/validate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ jobId }),
      });
      validation = await res.json();
    } catch {
      validation = { ok: false, messages: ["Validator niet bereikbaar."], gates: {} };
    }

    // 7) Response
    return NextResponse.json({
      jobId,
      files: Object.keys(files),
      validation,
      preview: { "EMVI.md": emviPreview },
      downloadZip: `/api/download/${jobId}`,
      mode: isCheap ? "CHEAP (gpt-4o-mini)" : "FULL (gpt-5)",
    });
  } catch (e: any) {
    console.error("❌ GENERATE ERROR:", e);
    return NextResponse.json({ error: e.message || String(e) }, { status: 400 });
  }
}