import { NextRequest, NextResponse } from "next/server";
import { promptClarifications } from "../_prompts";
import { chat } from "../../generate/_llm";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const userPrompt = promptClarifications(body);
    const markdown = await chat([{ role: "user", content: userPrompt }]);
    return NextResponse.json({ markdown, clarifications: markdown });
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || "Clarifications failed" }, { status: 500 });
  }
}