// app/api/download/[jobId]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { stat, readFile } from "fs/promises";
import path from "path";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

async function tryRead(p: string) {
  try {
    const s = await stat(p);
    if (!s.isFile()) return null;
    return await readFile(p);
  } catch {
    return null;
  }
}

export async function GET(
  _req: NextRequest,
  { params }: { params: { jobId: string } }
) {
  const jobId = params?.jobId;
  if (!jobId) {
    return NextResponse.json({ error: "jobId ontbreekt" }, { status: 400 });
  }

  const baseDir = path.join(process.cwd(), "outputs", jobId);

  // 1) Probeer tender_bundle.zip
  const zipPath = path.join(baseDir, "tender_bundle.zip");
  const zipBuf = await tryRead(zipPath);
  if (zipBuf) {
    return new NextResponse(zipBuf, {
      status: 200,
      headers: {
        "Content-Type": "application/zip",
        "Content-Disposition": `attachment; filename="tender_bundle_${jobId}.zip"`,
        "Cache-Control": "no-store",
      },
    });
  }

  // 2) Fallback: als zip er (nog) niet is, geef duidelijke melding
  return NextResponse.json(
    {
      error:
        "ZIP niet gevonden. Controleer of de generatie is voltooid of download later opnieuw.",
      hint: `Zocht: ${zipPath}`,
    },
    { status: 404 }
  );
}