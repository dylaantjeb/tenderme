import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import JSZip from "jszip";
import { writeFile, mkdir } from "fs/promises";
import path from "path";

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// ---- 1) System prompt: PLAATS HIER JE HELE SUPERPROMPT-TEKST ----
const SUPERPROMPT = `... plak hier de volledige UNIVERSAL TENDER BUNDLE SUPERPROMPT (v2.0) ...`;

const FILE_BLOCK_REGEX = /<<<FILE:([^>]+)>>>\s*([\s\S]*?)(?=<<<FILE:|$)/g;
const TO_FILL_REGEX = /\[TO FILL[^\]]*\]/gi;
const KO_RISICO_REGEX = /KO-?RISICO/gi;

function splitFiles(llmText: string) {
  const files: Record<string, string> = {};
  let m;
  while ((m = FILE_BLOCK_REGEX.exec(llmText)) !== null) {
    const filename = m[1].trim();
    const content = m[2].trim();
    files[filename] = content;
  }
  if (!Object.keys(files).length) throw new Error("Geen <<<FILE:...>>> blokken gevonden.");
  return files;
}

function validateBundle(files: Record<string, string>) {
  const report = {
    missingFiles: [] as string[],
    toFillSummary: [] as { file: string; matches: string[] }[],
    koRisicoHits: [] as { file: string; count: number }[],
  };
  const required = [
    "README_lees_mij.md","EMVI.md","Compliance_Matrix.md","Risicoregister.md",
    "KPI_SLA_Dashboard.md","Planning_Gantt.md","Bewijsstukkenbundel.md",
    "Assumpties_Uitsluitingen.md","Clarificatievragen.md","Projectreferenties.md"
  ];
  for (const r of required) if (!files[r]) report.missingFiles.push(r);

  for (const [file, text] of Object.entries(files)) {
    const toFills = text.match(TO_FILL_REGEX) || [];
    if (toFills.length) report.toFillSummary.push({ file, matches: toFills });

    const koHits = (text.match(KO_RISICO_REGEX) || []).length;
    if (koHits) report.koRisicoHits.push({ file, count: koHits });
  }
  return report;
}

async function exportMarkdown(files: Record<string, string>, dir: string) {
  await mkdir(dir, { recursive: true });
  await Promise.all(
    Object.entries(files).map(([name, content]) =>
      writeFile(path.join(dir, name), content, "utf8")
    )
  );
}

export async function POST(req: NextRequest) {
  try {
    // ---- 2) JSON van gebruiker (tender/company/...) ----
    const userJson = await req.json(); // verwacht exact de JSON-structuur uit de superprompt

    // ---- 3) LLM call ----
    const completion = await client.chat.completions.create({
      model: "gpt-5-thinking", // of jouw voorkeursmodel
      temperature: 0.2,
      messages: [
        { role: "system", content: SUPERPROMPT },
        { role: "user", content: JSON.stringify(userJson) }
      ]
    });

    const llmText = completion.choices[0]?.message?.content || "";
    const files = splitFiles(llmText);
    const validation = validateBundle(files);

    // ---- 4) Schrijf .md-bestanden en maak ZIP ----
    const jobId = crypto.randomUUID();
    const outDir = path.join(process.cwd(), "outputs", jobId);
    await exportMarkdown(files, outDir);

    // optioneel: ook .docx renderen (zie sectie 5)
    // hier alleen ZIP van de .md's
    const zip = new JSZip();
    for (const [name, content] of Object.entries(files)) zip.file(name, content);
    const zipBuf = await zip.generateAsync({ type: "nodebuffer" });
    const zipPath = path.join(outDir, "tender_bundle.zip");
    await writeFile(zipPath, zipBuf);

    return NextResponse.json({
      jobId,
      files: Object.keys(files),
      validation, // -> toon deze in UI
      downloadZip: `/api/download/${jobId}`
    });
  } catch (e: any) {
    return NextResponse.json({ error: e.message || String(e) }, { status: 400 });
  }
}