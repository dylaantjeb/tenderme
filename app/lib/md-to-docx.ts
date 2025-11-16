// app/lib/md-to-docx.ts
import { Document, HeadingLevel, Packer, Paragraph, TextRun } from "docx";

/**
 * Superlichte markdown → DOCX (koppen, alinea's, bullets, bold/italic)
 * Voldoende voor nu; je kunt later uitbreiden (tabellen, lijsten met nesting, etc.).
 */
export async function markdownToDocxBuffer(md: string, title = "Document"): Promise<Buffer> {
  const lines = (md || "").replace(/\r\n/g, "\n").split("\n");

  const paras: Paragraph[] = [];
  let inBullet = false;

  const pushParagraph = (p: Paragraph) => paras.push(p);

  for (const raw of lines) {
    const line = raw.trimEnd();

    // Koppen
    const h = /^(#{1,6})\s+(.*)$/.exec(line);
    if (h) {
      const level = h[1].length;
      const text = h[2].trim();
      pushParagraph(new Paragraph({
        heading:
          level === 1 ? HeadingLevel.HEADING_1 :
          level === 2 ? HeadingLevel.HEADING_2 :
          level === 3 ? HeadingLevel.HEADING_3 :
          level === 4 ? HeadingLevel.HEADING_4 :
          level === 5 ? HeadingLevel.HEADING_5 : HeadingLevel.HEADING_6,
        children: [new TextRun(text)],
      }));
      continue;
    }

    // Bullets (één niveau)
    if (/^[-*]\s+/.test(line)) {
      inBullet = true;
      const txt = line.replace(/^[-*]\s+/, "");
      pushParagraph(new Paragraph({
        text: txt,
        bullet: { level: 0 },
      }));
      continue;
    } else {
      inBullet = false;
    }

    // Lege regel → lege paragraaf (witregel)
    if (!line.trim()) {
      pushParagraph(new Paragraph({ text: "" }));
      continue;
    }

    // Inline bold/italic heel simpel
    const runs: TextRun[] = [];
    let rest = line;
    while (rest.length) {
      const m =
        /\*\*(.+?)\*\*/.exec(rest) ||
        /__(.+?)__/.exec(rest) ||
        /\*(.+?)\*/.exec(rest) ||
        /_(.+?)_/.exec(rest);

      if (!m) {
        runs.push(new TextRun(rest));
        break;
      }

      const idx = m.index!;
      if (idx > 0) runs.push(new TextRun(rest.slice(0, idx)));

      const full = m[0];
      const inner = m[1];
      const isBold = full.startsWith("**") || full.startsWith("__");
      const isItalic = full.startsWith("*") || full.startsWith("_");

      runs.push(new TextRun({ text: inner, bold: isBold, italics: isItalic && !isBold }));
      rest = rest.slice(idx + full.length);
    }

    pushParagraph(new Paragraph({ children: runs }));
  }

  const doc = new Document({
    title,
    sections: [{ children: paras.length ? paras : [new Paragraph("")] }],
  });

  const buf = await Packer.toBuffer(doc);
  return Buffer.from(buf);
}