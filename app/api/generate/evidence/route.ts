import { NextRequest, NextResponse } from "next/server";
import { promptEvidence } from "../_prompts";
import { chat } from "../../generate/_llm";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const userPrompt = promptEvidence(body, body.compliance ?? [], body.keyRequirements ?? []);
    const markdown = await chat([{ role: "user", content: userPrompt }]);
    return NextResponse.json({ markdown, evidence: markdown });
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || "Evidence failed" }, { status: 500 });
  }
}