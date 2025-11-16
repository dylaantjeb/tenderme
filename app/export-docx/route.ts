import { Document, Packer, Paragraph, HeadingLevel } from "docx";

export const runtime = "nodejs"; // docx gebruikt Node buffers

export async function POST(req: Request) {
  try {
    const { content, title } = await req.json();

    const lines: string[] = String(content || "").split(/\r?\n/);

    const children = lines.map((line) => {
      if (/^###\s+/.test(line)) return new Paragraph({ text: line.replace(/^###\s+/, ""), heading: HeadingLevel.HEADING_3 });
      if (/^##\s+/.test(line))  return new Paragraph({ text: line.replace(/^##\s+/, ""), heading: HeadingLevel.HEADING_2 });
      if (/^#\s+/.test(line))   return new Paragraph({ text: line.replace(/^#\s+/, ""), heading: HeadingLevel.HEADING_1 });
      return new Paragraph({ text: line || " " });
    });

    const doc = new Document({
      sections: [{ properties: {}, children }],
      creator: "TenderAI",
      title: title || "Proposal",
      description: "Generated tender proposal"
    });

    const buffer = await Packer.toBuffer(doc);
    const fileName = `${(title || "proposal").replace(/\s+/g, "-").toLowerCase()}.docx`;

    return new Response(buffer, {
      status: 200,
      headers: {
        "Content-Type": "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "Content-Disposition": `attachment; filename="${fileName}"`,
        "Content-Length": String(buffer.byteLength)
      }
    });
  } catch (e: any) {
    return Response.json({ error: e.message || "Export failed" }, { status: 500 });
  }
}