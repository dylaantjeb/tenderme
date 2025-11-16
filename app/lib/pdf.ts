// app/lib/pdf.ts
import puppeteer from "puppeteer";
import MarkdownIt from "markdown-it";

/**
 * Converteer Markdown → PDF met een nette titelpagina, paginanummers en A4-marges.
 */
export async function mdToPdfBuffer(
  md: string,
  title: string,
  subtitle?: string,
  logoUrl?: string
): Promise<Buffer> {
  const mdx = new MarkdownIt({ html: true, linkify: true, breaks: false });
  const bodyHtml = mdx.render(md);

  const cover = `
    <section class="cover">
      ${logoUrl ? `<img class="logo" src="${logoUrl}" alt="logo" />` : ""}
      <h1>${escapeHtml(title)}</h1>
      ${subtitle ? `<h2>${escapeHtml(subtitle)}</h2>` : ""}
      <div class="meta">
        <div>Datum: ${new Date().toLocaleDateString()}</div>
      </div>
    </section>
    <div class="page-break"></div>
  `;

  const html = `
<!doctype html>
<html>
<head>
<meta charset="utf-8" />
<title>${escapeHtml(title)}</title>
<style>
  @page { size: A4; margin: 22mm 18mm 22mm 18mm; }
  body { font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Inter,Arial,sans-serif; color: #111827; }
  .cover {
    height: calc(100vh - 44mm);
    display: flex; flex-direction: column; justify-content: center; align-items: center;
    text-align: center; gap: 12px;
  }
  .logo { max-height: 80px; max-width: 240px; margin-bottom: 6px; object-fit: contain; }
  h1 { font-size: 32px; line-height: 1.25; margin: 0 0 6px 0; }
  h2 { font-size: 18px; font-weight: 500; color: #6b7280; margin: 0 0 12px 0; }
  .meta { font-size: 12px; color: #6b7280; }
  .page-break { page-break-after: always; }
  main { font-size: 12.5px; line-height: 1.55; }
  main h1, main h2, main h3 { color: #0f172a; }
  main table { border-collapse: collapse; width: 100%; margin: 12px 0; font-size: 12px; }
  main th, main td { border: 1px solid #e5e7eb; padding: 6px 8px; vertical-align: top; }
  main th { background: #f3f4f6; font-weight: 600; }
  main code { background: #f9fafb; border: 1px solid #f1f5f9; padding: 1px 3px; border-radius: 3px; }
  main blockquote { border-left: 3px solid #e5e7eb; padding-left: 10px; color: #374151; }
</style>
</head>
<body>
  ${cover}
  <main>${bodyHtml}</main>
</body>
</html>`;

  const browser = await puppeteer.launch({
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
    headless: "new",
  });
  try {
    const page = await browser.newPage();
    await page.setContent(html, { waitUntil: "networkidle0" });
    const pdf = await page.pdf({
      format: "A4",
      printBackground: true,
      displayHeaderFooter: true,
      headerTemplate: `<div></div>`,
      footerTemplate: `
        <div style="font-size:9px; width:100%; color:#6b7280; padding:0 18mm; display:flex; justify-content:space-between;">
          <span>© ${new Date().getFullYear()} ${escapeHtml(subtitle || "")}</span>
          <span class="pageNumber"></span>/<span class="totalPages"></span>
        </div>`,
      margin: { top: "14mm", bottom: "16mm", left: "18mm", right: "18mm" },
    });
    return pdf;
  } finally {
    await browser.close();
  }
}

function escapeHtml(s: string) {
  return s.replace(/[&<>"']/g, (m) => (
    { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[m]!
  ));
}