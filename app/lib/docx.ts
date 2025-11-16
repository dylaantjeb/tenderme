// app/lib/docx.ts
import htmlToDocx from "html-to-docx";
import { marked } from "marked";

const BASE_CSS = `
  * { box-sizing: border-box; }
  body { font-family: "Calibri", Arial, sans-serif; font-size: 11pt; color: #1f2937; }
  h1 { font-size: 22pt; color: #0f172a; margin: 0 0 12pt; text-align: left; }
  h2 { font-size: 16pt; color: #111827; margin: 18pt 0 10pt; }
  h3 { font-size: 13pt; color: #111827; margin: 12pt 0 8pt; }
  p { line-height: 1.45; margin: 0 0 10pt; }
  ul, ol { margin: 0 0 10pt 18pt; }
  table { width: 100%; border-collapse: collapse; margin: 12pt 0; }
  th, td { border: 1px solid #CBD5E1; padding: 6pt 8pt; vertical-align: top; }
  th { background: #F1F5F9; font-weight: 600; text-align: left; }
  tfoot td { font-weight: 600; }
  .small { font-size: 9pt; color: #6B7280; }
  .page-break { page-break-after: always; }
  .cover {
    text-align: center;
    padding-top: 120pt;
  }
  .cover h1 {
    font-size: 32pt;
    color: #0f172a;
    margin-bottom: 12pt;
  }
  .cover h2 {
    font-size: 18pt;
    color: #475569;
    margin-bottom: 30pt;
  }
  .cover img {
    width: 120px;
    margin-bottom: 20pt;
  }
  .cover .meta {
    font-size: 12pt;
    color: #64748b;
    margin-top: 80pt;
  }
`;

/**
 * Converteer markdown → Word-proof HTML
 */
function mdToHtml(markdown: string): string {
  let md = (markdown || "").trim();

  if (md.length < 50) {
    md =
      "# [Automatisch gegenereerd document]\n" +
      "Dit document bevat (nog) beperkte inhoud. Vul dit document aan voordat je het indient.\n";
  }

  const body = marked(md, {
    mangle: false,
    headerIds: true,
    gfm: true,
  });

  return `<!doctype html>
<html lang="nl">
<head>
  <meta charset="utf-8" />
  <style>${BASE_CSS}</style>
</head>
<body>${body}</body>
</html>`;
}

/**
 * Bouw een nette titelpagina voor elk document
 */
export function withCover(
  markdown: string,
  title: string,
  subtitle?: string,
  logoUrl?: string
): string {
  const today = new Date().toLocaleDateString("nl-NL", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  const coverHTML = `
<div class="cover">
  ${logoUrl ? `<img src="${logoUrl}" alt="Logo" />` : ""}
  <h1>${title}</h1>
  ${subtitle ? `<h2>${subtitle}</h2>` : ""}
  <div class="meta">
    ${today}<br />
    Automatisch gegenereerd door <strong>TenderAI</strong>
  </div>
</div>
<div class="page-break"></div>
`;

  return `${coverHTML}\n\n${markdown || ""}`;
}

/**
 * Zet Markdown om naar DOCX Buffer met nette layout, marges, header/footer etc.
 */
export async function mdToDocxBuffer(
  markdown: string,
  title = "Document",
  subtitle?: string,
  logoUrl?: string
): Promise<Buffer> {
  const mdWithCover = withCover(markdown, title, subtitle, logoUrl);
  const html = mdToHtml(mdWithCover);

  const arrayBuffer = await htmlToDocx(html, null, {
    page: {
      margin: { top: 1440, right: 1440, bottom: 1440, left: 1440 }, // 1 inch marges
      size: "A4",
      orientation: "portrait",
    },
    table: { row: { cantSplit: true } },
    header: true,
    footer: true,
    pageNumber: true,
    font: "Calibri",
    title,
  });

  return Buffer.from(arrayBuffer as ArrayBuffer);
}