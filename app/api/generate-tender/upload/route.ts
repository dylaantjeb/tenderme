import { NextResponse } from "next/server";
import { Document, Packer, Paragraph, HeadingLevel } from "docx";

export const runtime = "nodejs";        // docx gebruikt Node Buffers
export const dynamic = "force-dynamic"; // voorkom caching

export async function POST(req: Request) {
  try {
    const { content, title } = await req.json();

    // Eenvoudige markdown-achtige parsing per regel
    const lines: string[] = String(content || "").split(/\r?\n/);

    const children = lines.map((line) => {
      if (/^###\s+/.test(line)) {
        return new Paragraph({ text: line.replace(/^###\s+/, ""), heading: HeadingLevel.HEADING_3 });
      }
      if (/^##\s+/.test(line)) {
        return new Paragraph({ text: line.replace(/^##\s+/, ""), heading: HeadingLevel.HEADING_2 });
      }
      if (/^#\s+/.test(line)) {
        return new Paragraph({ text: line.replace(/^#\s+/, ""), heading: HeadingLevel.HEADING_1 });
      }
      return new Paragraph({ text: line || " " });
    });

    const doc = new Document({
      title: title || "Proposal",
      creator: "TenderAI",
      description: "Generated tender proposal",
      sections: [{ properties: {}, children }],
    });

    const buffer = await Packer.toBuffer(doc);

    const safeName = String(title || "proposal")
      .replace(/[^\w.-]+/g, "_")
      .toLowerCase();

    // Gebruik standaard Response voor Buffer body
    return new Response(buffer, {
      status: 200,
      headers: {
        "Content-Type":
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "Content-Disposition": `attachment; filename="${safeName}.docx"`,
        "Content-Length": String(buffer.byteLength),
      },
    });
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || "Export failed" }, { status: 500 });
  }
}