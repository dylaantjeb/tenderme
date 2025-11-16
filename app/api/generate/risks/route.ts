import { NextRequest, NextResponse } from "next/server";
import { promptRisks } from "../_prompts";
import { chat } from "../../generate/_llm";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const userPrompt = promptRisks(body, body.risks ?? []);
    const markdown = await chat([{ role: "user", content: userPrompt }]);
    return NextResponse.json({ markdown, risks: markdown });
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || "Risks failed" }, { status: 500 });
  }
}