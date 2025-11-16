import { NextRequest, NextResponse } from "next/server";
import path from "path";
import { promises as fs } from "fs";

function wc(s: string) { return (s.match(/\b[\p{L}\p{N}’'-]+\b/gu) || []).length; }
function tableRows(md: string) {
  const lines = md.split("\n");
  const iH = lines.findIndex(l=>l.trim().startsWith("|"));
  const iD = lines.findIndex((l,i)=>i>iH && /\|\s*-{2,}/.test(l));
  if (iH<0 || iD<0) return 0;
  return lines.slice(iD+1).filter(l=>l.trim().startsWith("|")).length;
}

export async function POST(req: NextRequest) {
  try {
    const { jobId } = await req.json();
    const base = path.join(process.cwd(), "outputs", jobId);
    const emvi = await fs.readFile(path.join(base, "EMVI.md"), "utf8").catch(()=> "");
    const kpi  = await fs.readFile(path.join(base, "KPI_SLA_Dashboard.md"), "utf8").catch(()=> "");
    const risk = await fs.readFile(path.join(base, "Risicoregister.md"), "utf8").catch(()=> "");

    let score = 50;
    const w = wc(emvi);
    if (w > 1200) score += 10; else if (w > 800) score += 6; else score += 2;
    const kpiRows = tableRows(kpi);
    const riskRows = tableRows(risk);
    if (kpiRows >= 12) score += 20; else score += Math.min(20, Math.floor((kpiRows/12)*20));
    if (riskRows >= 10) score += 20; else score += Math.min(20, Math.floor((riskRows/10)*20));

    score = Math.max(0, Math.min(100, score));
    const notes: string[] = [];
    if (kpiRows < 12) notes.push(`Voeg ${12-kpiRows} KPI's toe.`);
    if (riskRows < 10) notes.push(`Voeg ${10-riskRows} risico's toe.`);
    if (w < 1000) notes.push("Breid EMVI uit met meer SMART onderbouwing.");

    return NextResponse.json({ score, notes });
  } catch (e: any) {
    return NextResponse.json({ error: e.message || "score error" }, { status: 400 });
  }
}