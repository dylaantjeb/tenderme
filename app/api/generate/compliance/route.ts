import { NextRequest, NextResponse } from "next/server";
import { promptCompliance } from "../_prompts";
import { chat } from "../../generate/_llm";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const userPrompt = promptCompliance(body, body.compliance ?? [], body.keyRequirements ?? []);
    const csvOrMd = await chat([{ role: "user", content: userPrompt }]);
    // vaak CSV—laat beide keys terugkomen
    return NextResponse.json({ csv: csvOrMd, markdown: csvOrMd, text: csvOrMd });
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || "Compliance failed" }, { status: 500 });
  }
}