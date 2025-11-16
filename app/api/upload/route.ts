// app/api/upload/route.ts
import { NextResponse } from "next/server";

export const runtime = "nodejs";
const MAX_BYTES = 20 * 1024 * 1024; // 20MB

// ---------- helpers ----------
const kb = (n: number) => `${Math.round(n / 1024)} KB`;
const clamp = (n: number, min: number, max: number) => Math.max(min, Math.min(max, n));

function normalize(text: string) {
  return text
    .replace(/\r/g, "")
    .replace(/[ \t]+\n/g, "\n")
    .replace(/\u00A0/g, " ")
    .replace(/\n{3,}/g, "\n\n")
    .trim()
    .slice(0, 80_000); // cap tegen reusachtige documenten
}

function pickFirst(arr: string[]) {
  return arr.find(Boolean) || "";
}

// Try parse dd/mm/yyyy or dd-mm-yyyy or yyyy-mm-dd (behoud raw als fallback)
function parseDateLike(s: string) {
  const dmy = s.match(/\b(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{4})\b/);
  if (dmy) {
    const [_, d, m, y] = dmy;
    return `${y}-${String(+m).padStart(2, "0")}-${String(+d).padStart(2, "0")}`;
  }
  const ymd = s.match(/\b(\d{4})[\/\-](\d{1,2})[\/\-](\d{1,2})\b/);
  if (ymd) {
    const [_, y, m, d] = ymd;
    return `${y}-${String(+m).padStart(2, "0")}-${String(+d).padStart(2, "0")}`;
  }
  return s; // geef raw terug
}

type Structured = {
  title?: string;
  referenceId?: string;
  authority?: string;
  cpv?: string;
  procedureType?: string;
  nuts?: string;
  country?: string;
  city?: string;
  lotTitle?: string;
  duration?: { start?: string; end?: string; years?: string };
  extensions?: { max?: string };
  deadlines?: { description: string; date: string }[];
  urls?: { documents?: string; submission?: string; generic?: string[] };
  criteria?: { type: "Prijs" | "Kwaliteit" | string; name?: string; weight?: number; description?: string }[];
  contact?: { name?: string; email?: string; phone?: string };
  weights?: { price?: number; qualityTotal?: number };
};

// Extract structured info from Dutch TED/TenderNed-like text
function extractStructured(text: string): Structured {
  const t = text;

  // Title
  const title =
    pickFirst([
      (t.match(/Titel:\s*([^\n]+)/i) || [])[1],
      (t.match(/Naam van de opdracht:\s*([^\n]+)/i) || [])[1],
      (t.match(/(?<=\n)\s*ICT [^\n]+/i) || [])[0],
    ]) || undefined;

  // Authority / Koper
  const authority =
    pickFirst([
      (t.match(/Officiële naam:\s*([^\n]+)/i) || [])[1],
      (t.match(/Koper.*?\n.*?Officiële naam:\s*([^\n]+)/is) || [])[1],
    ]) || undefined;

  // CPV
  const cpv =
    pickFirst([
      (t.match(/CPV.*?:\s*([\d]{8})/i) || [])[1],
      (t.match(/classificatie.*?cpv.*?:\s*([\d]{8})/i) || [])[1],
    ]) || undefined;

  // Reference/ID
  const referenceId =
    pickFirst([
      (t.match(/Identificatiecode.*?:\s*([a-z0-9\-]+)/i) || [])[1],
      (t.match(/Interne identificatiecode\s*:\s*([^\n]+)/i) || [])[1],
    ]) || undefined;

  // Procedure type
  const procedureType =
    pickFirst([
      (t.match(/Type procedure:\s*([^\n]+)/i) || [])[1],
      (t.match(/Procedure:\s*([^\n]+)/i) || [])[1],
    ]) || undefined;

  // Location
  const nuts = (t.match(/NUTS\).*?:\s*([A-Z0-9]+)/i) || [])[1];
  const country = (t.match(/Land:\s*([^\n]+)/i) || [])[1];
  const city = (t.match(/Aanvullende informatie\s*:\s*([^\n]+)/i) || [])[1];

  // Lot title
  const lotTitle = (t.match(/5\.1\s+Technische ID.*?\nTitel:\s*([^\n]+)/i) || [])[1];

  // Duration / start / end
  const startRaw = (t.match(/Begindatum:\s*([^\n]+)/i) || [])[1];
  const endRaw = (t.match(/Einddatum.*?:\s*([^\n]+)/i) || [])[1];
  const start = startRaw ? parseDateLike(startRaw) : undefined;
  const end = endRaw ? parseDateLike(endRaw) : undefined;
  const years = (t.match(/(\d+)\s*jaar/i) || [])[1];

  const extensionsMax = (t.match(/Maximumaantal\s*verlengingen:\s*(\d+)/i) || [])[1];

  // Deadlines (several)
  const deadlines: { description: string; date: string }[] = [];
  const dlPatterns: { re: RegExp; label: string }[] = [
    { re: /Uiterste datum.*?inschrijvingen:\s*([^\n]+)/i, label: "Uiterste datum inschrijving" },
    { re: /Termijn voor.*?aanvullende informatie:\s*([^\n]+)/i, label: "Termijn aanvullende informatie" },
    { re: /Openingsdatum:\s*([^\n]+)/i, label: "Openingsdatum" },
    { re: /Nota van Inlichtingen.*?(?:op|vanaf)\s*([0-9\/\-\.: ]+\+?\d*:?)/i, label: "Publicatie NVI" },
  ];
  for (const { re, label } of dlPatterns) {
    const m = t.match(re);
    if (m?.[1]) deadlines.push({ description: label, date: parseDateLike(m[1]) });
  }

  // URLs
  const docsUrl = (t.match(/Adres van de aanbestedingsstukken:\s*(https?:\/\/\S+)/i) || [])[1];
  const submitUrl = (t.match(/Adres voor indiening:\s*(https?:\/\/\S+)/i) || [])[1];
  const genericUrls = Array.from(new Set((t.match(/https?:\/\/\S+/g) || []).filter(u => !u.endsWith(".") && !u.endsWith(","))));

  // Contact
  const contactName = (t.match(/Contactpunt:\s*([^\n]+)/i) || [])[1];
  const email = (t.match(/E-mail:\s*([^\n]+)/i) || [])[1];
  const phone = (t.match(/Telefoon:\s*([^\n]+)/i) || [])[1];

  // Criteria (weigthing)
  // Capture blocks starting with "Criterium:" or lines with "Naam: ...", "Type: ..." and "Gunningscriterium [...] waarde: N"
  const criteria: Structured["criteria"] = [];
  const critBlockRe = /Criterium:([\s\S]*?)(?=Criterium:|5\.1\.12|5\.1\.11|$)/gi;
  let m;
  while ((m = critBlockRe.exec(t))) {
    const block = m[1];
    const type = (block.match(/Type:\s*([^\n]+)/i) || [])[1] || "Onbekend";
    const name = (block.match(/Naam:\s*([^\n]+)/i) || [])[1];
    const desc = (block.match(/Beschrijving:\s*([\s\S]*?)(?:\n[A-Z][^\n]+:|\n{2,}|$)/i) || [])[1]?.trim();
    // Gewicht / numerieke waarde
    const weightStr =
      (block.match(/Gunningscriterium.*?waarde:\s*([0-9]+(?:\.[0-9]+)?)/i) || [])[1] ||
      (block.match(/Gewicht.*?:\s*([0-9]+(?:\.[0-9]+)?)/i) || [])[1];
    const weight = weightStr ? clamp(parseFloat(weightStr), 0, 1000) : undefined;

    criteria.push({ type, name, description: desc, weight });
  }

  // Price vs quality quick weights (optional convenience)
  const priceWeight =
    criteria
      .filter(c => /prijs/i.test(c.type) || /prijs/i.test(c.name || ""))
      .map(c => c.weight || 0)
      .reduce((a, b) => a + b, 0) || undefined;

  const qualityWeight =
    criteria
      .filter(c => /kwaliteit/i.test(c.type) || /kwaliteit/i.test(c.name || ""))
      .map(c => c.weight || 0)
      .reduce((a, b) => a + b, 0) || undefined;

  return {
    title,
    referenceId,
    authority,
    cpv,
    procedureType,
    nuts,
    country,
    city,
    lotTitle,
    duration: { start, end, years },
    extensions: { max: extensionsMax },
    deadlines,
    urls: { documents: docsUrl, submission: submitUrl, generic: genericUrls },
    criteria,
    contact: { name: contactName, email, phone },
    weights: { price: priceWeight, qualityTotal: qualityWeight },
  };
}

function buildNotes(name: string, size: number, structured: Structured) {
  const lines: string[] = [];
  lines.push(`Bestand: ${name} (${kb(size)})`);
  if (structured.title) lines.push(`Titel: ${structured.title}`);
  if (structured.authority) lines.push(`Aanbestedende dienst: ${structured.authority}`);
  if (structured.referenceId) lines.push(`Referentie: ${structured.referenceId}`);
  if (structured.cpv) lines.push(`CPV: ${structured.cpv}`);
  if (structured.procedureType) lines.push(`Procedure: ${structured.procedureType}`);
  if (structured.nuts || structured.city || structured.country) {
    const loc = [structured.city, structured.nuts, structured.country].filter(Boolean).join(", ");
    if (loc) lines.push(`Locatie: ${loc}`);
  }
  if (structured.duration?.start || structured.duration?.end) {
    lines.push(
      `Looptijd: ${structured.duration?.start || "?"} → ${structured.duration?.end || "?"}${
        structured.duration?.years ? ` (± ${structured.duration.years} jaar)` : ""
      }`
    );
  }
  if (structured.extensions?.max) lines.push(`Max. verlengingen: ${structured.extensions.max}`);

  if (structured.deadlines?.length) {
    lines.push("Deadlines:");
    for (const d of structured.deadlines) lines.push(`- ${d.description}: ${d.date}`);
  }

  const price = structured.weights?.price;
  const qual = structured.weights?.qualityTotal;
  if (price || qual) {
    const bits = [];
    if (price != null) bits.push(`Prijs: ${price}`);
    if (qual != null) bits.push(`Kwaliteit (totaal): ${qual}`);
    if (bits.length) lines.push(`Weging → ${bits.join(" | ")}`);
  }

  if (structured.urls?.documents) lines.push(`Docs: ${structured.urls.documents}`);
  if (structured.urls?.submission) lines.push(`Inzenden: ${structured.urls.submission}`);
  if (structured.contact?.name || structured.contact?.email || structured.contact?.phone) {
    lines.push(
      `Contact: ${[structured.contact?.name, structured.contact?.email, structured.contact?.phone]
        .filter(Boolean)
        .join(" • ")}`
    );
  }

  return lines.join("\n");
}

// ---------- route ----------
export async function POST(req: Request) {
  try {
    const form = await req.formData();
    const file = form.get("file");

    if (!file || !(file instanceof File)) {
      return NextResponse.json({ error: "No file uploaded (field 'file' required)" }, { status: 400 });
    }
    if (file.size > MAX_BYTES) {
      return NextResponse.json({ error: `File too large (> ${Math.round(MAX_BYTES / (1024 * 1024))}MB)` }, { status: 413 });
    }

    const name = file.name || "upload";
    const lower = name.toLowerCase();
    const type = file.type || "application/octet-stream";
    const buf = Buffer.from(await file.arrayBuffer());

    // --- PDF ---
    if (lower.endsWith(".pdf")) {
      // Gebruik directe parser i.p.v. root (voorkomt ENOENT test asset bug)
      const pdfParse = (await import("pdf-parse/lib/pdf-parse.js")).default;
      const data = await pdfParse(buf);
      const raw = normalize(data.text || "");
      const structured = extractStructured(raw);
      const notes = buildNotes(name, file.size, structured);

      return NextResponse.json({
        extractedText: raw,
        notes,
        structured,
      });
    }

    // --- DOCX ---
    if (lower.endsWith(".docx")) {
      const mammoth = await import("mammoth");
      const { value } = await mammoth.extractRawText({ buffer: buf });
      const raw = normalize(value || "");
      const structured = extractStructured(raw);
      const notes = buildNotes(name, file.size, structured);

      return NextResponse.json({
        extractedText: raw,
        notes,
        structured,
      });
    }

    // --- Plain text-achtige formaten ---
    if (lower.endsWith(".txt") || lower.endsWith(".md") || lower.endsWith(".csv")) {
      const raw = normalize(buf.toString("utf-8"));
      const structured = extractStructured(raw);
      const notes = buildNotes(name, file.size, structured);

      return NextResponse.json({
        extractedText: raw,
        notes,
        structured,
      });
    }

    // --- Fallback voor overige formaten ---
    return NextResponse.json({
      extractedText: "",
      notes: `Bestand ontvangen: ${name} • type: ${type} • grootte: ${kb(file.size)}.\nTekstextractie voor dit type is (nog) niet geactiveerd.`,
      structured: {},
    });
  } catch (err: any) {
    console.error("upload error:", err);
    return NextResponse.json({ error: err?.message ?? "Upload failed" }, { status: 500 });
  }
}