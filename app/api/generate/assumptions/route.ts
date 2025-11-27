import { NextRequest, NextResponse } from "next/server";
import { promptAssumptions } from "../_prompts";
import { chat } from "../../generate/_llm";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const userPrompt = promptAssumptions(body, body.assumptions ?? [], body.exclusions ?? []);
    const markdown = await chat([{ role: "user", content: userPrompt }]);
    return NextResponse.json({ markdown, assumptions: markdown });
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || "Assumptions failed" }, { status: 500 });
  }
}