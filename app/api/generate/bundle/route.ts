// app/api/generate/bundle/route.ts
import { NextRequest, NextResponse } from "next/server";
import JSZip from "jszip";
import { markdownToDocxBuffer } from "../../../lib/md-to-docx";
import { validateTenderBundle } from "../../../lib/tenderValidation";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Alle markdowns als string (nooit undefined)
    const entries: Array<[string, string]> = [
      ["EMVI_Versie_1.0.docx", String(body?.emvi ?? "")],
      ["Compliance_Matrix.docx", String(body?.compliance ?? "")],
      ["Planning_Gantt.docx", String(body?.planning ?? "")],
      ["KPI_SLA_Dashboard.docx", String(body?.kpi ?? "")],
      ["Risicoregister.docx", String(body?.risks ?? "")],
      ["Projectreferenties.docx", String(body?.references ?? "")],
      ["Assumpties_Uitsluitingen.docx", String(body?.assumptions ?? "")],
      ["Bewijsstukkenbundel.docx", String(body?.evidence ?? "")],
      ["Clarificatievragen.docx", String(body?.clarifications ?? "")],
      ["README_lees_mij.docx", String(body?.readme ?? "")],
    ];

    // Veilig valideren met harde defaults
    let val: { ok: boolean; reasons: string[]; scoreHints?: string[] } = {
      ok: true,
      reasons: [],
      scoreHints: [],
    };

    try {
      const v = validateTenderBundle?.(body);
      if (v && typeof v === "object") {
        val = {
          ok: Boolean((v as any).ok),
          reasons: Array.isArray((v as any).reasons) ? (v as any).reasons : [],
          scoreHints: Array.isArray((v as any).scoreHints) ? (v as any).scoreHints : [],
        };
      }
    } catch (e) {
      // Als validatie crasht, niet de bundler laten falen
      console.error("validateTenderBundle crashed:", e);
      val = { ok: true, reasons: [], scoreHints: [] };
    }

    const zip = new JSZip();

    // Markdown → DOCX voor elk bestand (ook lege strings zijn ok)
    await Promise.all(
      entries.map(async ([name, md]) => {
        const buf = await markdownToDocxBuffer(md, name.replace(/\.docx$/, ""));
        zip.file(name, buf);
      })
    );

    // Voeg waarschuwing toe als validatie niet ok is
    const reasons = val.reasons ?? [];
    const hints = val.scoreHints ?? [];
    if (!val.ok) {
      const warnMd =
`# Validatie

Status: **Niet inleverklaar**

## Redenen
${reasons.length ? reasons.map(r => `- ${r}`).join("\n") : "- (geen redenen aangeleverd)"}

${hints.length ? `## Tips\n${hints.map(h => `- ${h}`).join("\n")}\n` : ""}`;
      const warnDoc = await markdownToDocxBuffer(warnMd, "VALIDATIE_WARNINGS");
      zip.file("VALIDATIE_WARNINGS.docx", warnDoc);
    }

    const blob = await zip.generateAsync({ type: "nodebuffer" });

    // Header compact houden en ook hier veilig omgaan met val
    const statusHeader = val.ok ? "ok" : `fail`;

    return new NextResponse(blob, {
      status: 200,
      headers: {
        "Content-Type": "application/zip",
        "Content-Disposition": 'attachment; filename="tender_bundle_docx.zip"',
        "X-Tender-Validation": statusHeader,
      },
    });
  } catch (e: any) {
    console.error("bundle route failed:", e);
    return NextResponse.json(
      { error: e?.message || "Failed to build DOCX bundle" },
      { status: 500 }
    );
  }
}