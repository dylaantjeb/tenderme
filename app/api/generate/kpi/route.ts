import { NextRequest, NextResponse } from "next/server";
import { promptKPI } from "../_prompts";
import { chat } from "../../generate/_llm";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const userPrompt = promptKPI(body, body.kpis ?? []);
    const markdown = await chat([{ role: "user", content: userPrompt }]);
    return NextResponse.json({ markdown, kpi: markdown });
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || "KPI failed" }, { status: 500 });
  }
}