import { NextRequest, NextResponse } from "next/server";
import { promptPlanning } from "../_prompts";
import { chat } from "../../generate/_llm";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const userPrompt = promptPlanning(body, body.milestones ?? []);
    const markdown = await chat([{ role: "user", content: userPrompt }]);
    return NextResponse.json({ markdown, planning: markdown });
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || "Planning failed" }, { status: 500 });
  }
}