import { NextResponse } from "next/server";
import pdfParse from "pdf-parse";
import mammoth from "mammoth";

export const runtime = "nodejs";

// ---- limits ----
const MAX_BYTES = 20 * 1024 * 1024; // 20MB
const MAX_EXTRACT_CHARS = 200_000; // server-side cap; generate route will clamp further

// NOTE: UI accepts .doc too; we warn and ask for .docx
const ALLOWED_EXTS = [".pdf", ".docx", ".doc", ".txt", ".md", ".csv"] as const;
const ALLOWED_MIMES = [
  "application/pdf",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/msword",
  "text/plain",
  "text/markdown",
  "text/csv",
  "application/octet-stream", // some browsers omit correct mime; we validate by ext/magic
] as const;

// ---------- helpers ----------
const kb = (n: number) => `${Math.round(n / 1024)} KB`;
const clamp = (n: number, min: number, max: number) => Math.max(min, Math.min(max, n));

function normalize(text: string) {
  const cleaned = (text || "")
    .replace(/\r/g, "")
    .replace(/[ \t]+\n/g, "\n")
    .replace(/\u00A0/g, " ")
    .replace(/\n{3,}/g, "\n\n")
    .trim();

  const originalLength = cleaned.length;
  const truncated = originalLength > MAX_EXTRACT_CHARS;
  const out = truncated ? cleaned.slice(0, MAX_EXTRACT_CHARS) : cleaned;

  return { text: out, truncated, originalLength };
}

function pickFirst(arr: string[]) {
  return arr.find(Boolean) || "";
}

function getExt(name: string) {
  const lower = (name || "").toLowerCase();
  const dot = lower.lastIndexOf(".");
  return dot >= 0 ? lower.slice(dot) : "";
}

function isAllowedExt(ext: string) {
  return (ALLOWED_EXTS as readonly string[]).includes(ext);
}

function looksLikePdf(buf: Buffer) {
  // %PDF-
  return (
    buf.length >= 5 &&
    buf[0] === 0x25 &&
    buf[1] === 0x50 &&
    buf[2] === 0x44 &&
    buf[3] === 0x46 &&
    buf[4] === 0x2d
  );
}

function looksLikeZip(buf: Buffer) {
  // PK\x03\x04 (docx is a zip)
  return buf.length >= 4 && buf[0] === 0x50 && buf[1] === 0x4b && buf[2] === 0x03 && buf[3] === 0x04;
}

function textStats(s: string) {
  const chars = s.length;
  const words = s.trim() ? s.trim().split(/\s+/).filter(Boolean).length : 0;
  const lines = s ? s.split("\n").length : 0;
  return { chars, words, lines };
}

function classifyDocKind(text: string) {
  const t = (text || "").toLowerCase();
  const isAwardNotice =
    t.includes("aankondiging gegunde opdracht") ||
    t.includes("gegunde opdracht") ||
    t.includes("resultaat van de aanbesteding") ||
    t.includes("winnende") ||
    t.includes("gegund aan");

  const isGuideline =
    t.includes("leidraad") ||
    t.includes("programma van eisen") ||
    t.includes("pve") ||
    t.includes("beoordelingskader") ||
    t.includes("nota van inlichtingen") ||
    t.includes("gunningscriter") ||
    t.includes("inschrijving") ||
    t.includes("selectieleidraad") ||
    t.includes("offerteaanvraag");

  if (isAwardNotice && !isGuideline) return "award_notice";
  if (isGuideline) return "tender_guideline";
  return "unknown";
}

// Try parse dd/mm/yyyy or dd-mm-yyyy or yyyy-mm-dd (keep raw fallback)
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
  return s;
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

function extractStructured(text: string): Structured {
  const t = text;

  const title =
    pickFirst([
      (t.match(/Titel:\s*([^\n]+)/i) || [])[1],
      (t.match(/Naam van de opdracht:\s*([^\n]+)/i) || [])[1],
    ]) || undefined;

  const authority =
    pickFirst([
      (t.match(/Officiële naam:\s*([^\n]+)/i) || [])[1],
      (t.match(/Koper.*?\n.*?Officiële naam:\s*([^\n]+)/is) || [])[1],
    ]) || undefined;

  const cpv =
    pickFirst([
      (t.match(/CPV.*?:\s*([\d]{8})/i) || [])[1],
      (t.match(/classificatie.*?cpv.*?:\s*([\d]{8})/i) || [])[1],
    ]) || undefined;

  const referenceId =
    pickFirst([
      (t.match(/Identificatiecode.*?:\s*([a-z0-9\-]+)/i) || [])[1],
      (t.match(/Interne identificatiecode\s*:\s*([^\n]+)/i) || [])[1],
    ]) || undefined;

  const procedureType =
    pickFirst([
      (t.match(/Type procedure:\s*([^\n]+)/i) || [])[1],
      (t.match(/Procedure:\s*([^\n]+)/i) || [])[1],
    ]) || undefined;

  const nuts = (t.match(/NUTS\).*?:\s*([A-Z0-9]+)/i) || [])[1];
  const country = (t.match(/Land:\s*([^\n]+)/i) || [])[1];
  const city = (t.match(/Aanvullende informatie\s*:\s*([^\n]+)/i) || [])[1];

  const lotTitle = (t.match(/5\.1\s+Technische ID.*?\nTitel:\s*([^\n]+)/i) || [])[1];

  const startRaw = (t.match(/Begindatum:\s*([^\n]+)/i) || [])[1];
  const endRaw = (t.match(/Einddatum.*?:\s*([^\n]+)/i) || [])[1];
  const start = startRaw ? parseDateLike(startRaw) : undefined;
  const end = endRaw ? parseDateLike(endRaw) : undefined;
  const years = (t.match(/(\d+)\s*jaar/i) || [])[1];

  const extensionsMax = (t.match(/Maximumaantal\s*verlengingen:\s*(\d+)/i) || [])[1];

  const deadlines: { description: string; date: string }[] = [];
  const dlPatterns: { re: RegExp; label: string }[] = [
    { re: /Uiterste datum.*?inschrijvingen:\s*([^\n]+)/i, label: "Uiterste datum inschrijving" },
    { re: /Termijn voor.*?aanvullende informatie:\s*([^\n]+)/i, label: "Termijn aanvullende informatie" },
    { re: /Openingsdatum:\s*([^\n]+)/i, label: "Openingsdatum" },
  ];
  for (const { re, label } of dlPatterns) {
    const m = t.match(re);
    if (m?.[1]) deadlines.push({ description: label, date: parseDateLike(m[1]) });
  }

  const docsUrl = (t.match(/Adres van de aanbestedingsstukken:\s*(https?:\/\/\S+)/i) || [])[1];
  const submitUrl = (t.match(/Adres voor indiening:\s*(https?:\/\/\S+)/i) || [])[1];
  const genericUrls = Array.from(new Set((t.match(/https?:\/\/\S+/g) || []).filter((u) => !u.endsWith(".") && !u.endsWith(","))));

  const contactName = (t.match(/Contactpunt:\s*([^\n]+)/i) || [])[1];
  const email = (t.match(/E-mail:\s*([^\n]+)/i) || [])[1];
  const phone = (t.match(/Telefoon:\s*([^\n]+)/i) || [])[1];

  const criteria: Structured["criteria"] = [];
  const critBlockRe = /Criterium:([\s\S]*?)(?=Criterium:|5\.1\.12|5\.1\.11|$)/gi;
  let m;
  while ((m = critBlockRe.exec(t))) {
    const block = m[1];
    const type = (block.match(/Type:\s*([^\n]+)/i) || [])[1] || "Onbekend";
    const name = (block.match(/Naam:\s*([^\n]+)/i) || [])[1];
    const desc = (block.match(/Beschrijving:\s*([\s\S]*?)(?:\n[A-Z][^\n]+:|\n{2,}|$)/i) || [])[1]?.trim();
    const weightStr =
      (block.match(/Gunningscriterium.*?waarde:\s*([0-9]+(?:\.[0-9]+)?)/i) || [])[1] ||
      (block.match(/Gewicht.*?:\s*([0-9]+(?:\.[0-9]+)?)/i) || [])[1];
    const weight = weightStr ? clamp(parseFloat(weightStr), 0, 1000) : undefined;
    criteria.push({ type, name, description: desc, weight });
  }

  const priceWeight =
    criteria
      .filter((c) => /prijs/i.test(c.type) || /prijs/i.test(c.name || ""))
      .map((c) => c.weight || 0)
      .reduce((a, b) => a + b, 0) || undefined;

  const qualityWeight =
    criteria
      .filter((c) => /kwaliteit/i.test(c.type) || /kwaliteit/i.test(c.name || ""))
      .map((c) => c.weight || 0)
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
  return lines.join("\n");
}

function awardNoticeWarning() {
  return "Dit document lijkt een 'aankondiging gegunde opdracht' (award notice) en bevat meestal geen KO-eisen/gunningscriteria. Voor een EMVI-bundel heb je doorgaans een leidraad/PvE/beoordelingskader nodig.";
}

function buildFallbackSourceText(name: string, structured: any, notes: string, warnings: string[]) {
  const parts: string[] = [];
  parts.push(`DOCUMENT: ${name}`);
  if (notes) {
    parts.push("\nKERNGEGEVENS (automatisch uitgelezen):\n" + notes);
  }
  if (structured && Object.keys(structured).length) {
    parts.push("\nSTRUCTURED JSON:\n" + JSON.stringify(structured, null, 2));
  }
  if (warnings?.length) {
    parts.push("\nWAARSCHUWINGEN:\n- " + warnings.join("\n- "));
  }
  parts.push(
    "\nLET OP: In dit bestand is weinig/geen machineleesbare tekst gevonden. Voor een volledige EMVI-bundel is meestal een leidraad/PvE/beoordelingskader nodig (niet alleen een aankondiging gegunde opdracht)."
  );
  return parts.join("\n").trim();
}

function responseOk(payload: any, status = 200) {
  return NextResponse.json({ ok: true, ...payload }, { status });
}
function responseWarn(payload: any, status = 200) {
  // ok:false but 200 => UI kan door, toont waarschuwing
  return NextResponse.json({ ok: false, ...payload }, { status });
}

async function parsePdfBestEffort(buf: Buffer) {
  // Single, production-safe parser: pdf-parse.
  // IMPORTANT: We intentionally do NOT use pdfjs-dist here because it causes Next bundling errors
  // when the package/version/path is not present.
  try {
    const data = await pdfParse(buf);
    return {
      ok: true as const,
      text: (data?.text as string) || "",
      pages: (data as any)?.numpages ?? undefined,
      parser: "pdf-parse" as const,
    };
  } catch (err: any) {
    console.warn("[upload] pdf-parse failed", { message: err?.message || String(err) });
    return {
      ok: false as const,
      text: "",
      pages: undefined,
      parser: "none" as const,
      error: err?.message || "PDF kon niet worden uitgelezen (beveiligd/corrupt of geen selecteerbare tekst).",
    };
  }
}

// ---------- route ----------
export async function POST(req: Request) {
  try {
    const form = await req.formData();
    const file = form.get("file");

    if (!file || !(file instanceof File)) {
      return NextResponse.json({ ok: false, error: "No file uploaded (field 'file' required)" }, { status: 400 });
    }
    if (file.size > MAX_BYTES) {
      return NextResponse.json({ ok: false, error: `File too large (> ${Math.round(MAX_BYTES / (1024 * 1024))}MB)` }, { status: 413 });
    }

    const name = file.name || "upload";
    const ext = getExt(name);
    const type = file.type || "application/octet-stream";
    const buf = Buffer.from(await file.arrayBuffer());

    if (!isAllowedExt(ext)) {
      return NextResponse.json(
        { ok: false, error: `Unsupported file type (${ext || "no extension"}). Supported: ${ALLOWED_EXTS.join(", ")}` },
        { status: 415 }
      );
    }

    if (!(ALLOWED_MIMES as readonly string[]).includes(type)) {
      console.warn("[upload] unexpected mime", { name, type, ext });
    }

    if (ext === ".pdf" && !looksLikePdf(buf)) {
      return NextResponse.json({ ok: false, error: "File extension is .pdf but file does not look like a PDF" }, { status: 400 });
    }
    if (ext === ".docx" && !looksLikeZip(buf)) {
      return NextResponse.json({ ok: false, error: "File extension is .docx but file does not look like a DOCX (zip)" }, { status: 400 });
    }

    console.info("[upload] received", { name, size: file.size, type, ext });

    // .DOC legacy
    if (ext === ".doc") {
      return responseWarn({
        extractedText: "",
        notes: `Bestand ontvangen: ${name} (${kb(file.size)}). Dit is een .doc (legacy Word). Upload bij voorkeur .docx.`,
        structured: {},
        kind: "unknown",
        warnings: ["DOC (legacy) wordt niet ondersteund. Sla op als .docx en upload opnieuw."],
        meta: { name, ext, mime: type, bytes: file.size, truncated: false, originalChars: 0, stats: { chars: 0, words: 0, lines: 0 } },
      });
    }

    // PDF
    if (ext === ".pdf") {
      const parsed = await parsePdfBestEffort(buf);
      const norm = normalize(parsed.text || "");
      const raw = norm.text;
      const structured = raw ? extractStructured(raw) : {};
      const notes = buildNotes(name, file.size, structured as any);
      const stats = textStats(raw);
      const kind = classifyDocKind(raw);

      const warnings: string[] = [];
      if (!parsed.ok) warnings.push((parsed as any).error || "PDF kon niet worden uitgelezen.");
      if (kind === "award_notice") warnings.push(awardNoticeWarning());
      if (stats.chars < 200) warnings.push("Weinig/geen tekst gevonden. Upload bij voorkeur ook de volledige leidraad/PvE/beoordelingskader.");

      // Always return some source text so the UI/orchestrator doesn't error on empty input.
      // If we couldn't extract meaningful text, fall back to notes/structured as a minimal source.
      const sourceText = raw && raw.trim().length >= 50
        ? raw
        : buildFallbackSourceText(name, structured, notes, warnings);

      const base = {
        extractedText: sourceText,
        notes,
        structured,
        kind,
        warnings,
        meta: {
          name,
          ext,
          mime: type,
          bytes: file.size,
          pages: parsed.pages,
          parser: parsed.parser,
          truncated: norm.truncated,
          originalChars: norm.originalLength,
          stats,
          sourceChars: sourceText.length,
        },
      };

      return parsed.ok ? responseOk(base) : responseWarn(base);
    }

    // DOCX
    if (ext === ".docx") {
      try {
        const { value } = await mammoth.extractRawText({ buffer: buf });
        const norm = normalize(value || "");
        const raw = norm.text;

        const structured = extractStructured(raw);
        const notes = buildNotes(name, file.size, structured);
        const stats = textStats(raw);
        const kind = classifyDocKind(raw);

        const warnings: string[] = [];
        if (kind === "award_notice") warnings.push(awardNoticeWarning());
        if (stats.chars < 200) warnings.push("Weinig/geen tekst gevonden. Upload bij voorkeur ook de volledige leidraad/PvE/beoordelingskader.");

        const sourceText = raw && raw.trim().length >= 50
          ? raw
          : buildFallbackSourceText(name, structured, notes, warnings);

        return responseOk({
          extractedText: sourceText,
          notes,
          structured,
          kind,
          warnings,
          meta: {
            name,
            ext,
            mime: type,
            bytes: file.size,
            truncated: norm.truncated,
            originalChars: norm.originalLength,
            stats,
            sourceChars: sourceText.length,
          },
        });
      } catch (err: any) {
        console.error("[upload] docx extract failed", err);
        return responseWarn({
          extractedText: "",
          notes: `Bestand ontvangen: ${name} (${kb(file.size)}). DOCX kon niet worden uitgelezen.`,
          structured: {},
          kind: "unknown",
          warnings: ["DOCX kon niet worden uitgelezen. Probeer opnieuw te exporteren als .docx of upload een PDF."],
          meta: { name, ext, mime: type, bytes: file.size, truncated: false, originalChars: 0, stats: { chars: 0, words: 0, lines: 0 } },
        });
      }
    }

    // Text-like
    if (ext === ".txt" || ext === ".md" || ext === ".csv") {
      const norm = normalize(buf.toString("utf-8"));
      const raw = norm.text;

      const structured = extractStructured(raw);
      const notes = buildNotes(name, file.size, structured);
      const stats = textStats(raw);
      const kind = classifyDocKind(raw);

      const warnings: string[] = [];
      if (kind === "award_notice") warnings.push(awardNoticeWarning());

      const sourceText = raw && raw.trim().length >= 50
        ? raw
        : buildFallbackSourceText(name, structured, notes, warnings);

      return responseOk({
        extractedText: sourceText,
        notes,
        structured,
        kind,
        warnings,
        meta: {
          name,
          ext,
          mime: type,
          bytes: file.size,
          truncated: norm.truncated,
          originalChars: norm.originalLength,
          stats,
          sourceChars: sourceText.length,
        },
      });
    }

    // Fallback
    return NextResponse.json(
      {
        ok: false,
        extractedText: "",
        notes: `Bestand ontvangen: ${name} • type: ${type} • grootte: ${kb(file.size)}. Tekstextractie voor dit type is niet beschikbaar.`,
        structured: {},
        kind: "unknown",
        warnings: ["Onbekend bestandstype. Upload een PDF, DOCX, TXT, MD of CSV."],
        meta: { name, ext, mime: type, bytes: file.size, truncated: false, originalChars: 0, stats: { chars: 0, words: 0, lines: 0 } },
      },
      { status: 415 }
    );
  } catch (err: any) {
    console.error("upload error:", err);
    return NextResponse.json({ ok: false, error: err?.message ?? "Upload failed" }, { status: 500 });
  }
}