import { NextRequest, NextResponse } from "next/server";
import { promptReferences } from "../_prompts";
import { chat } from "../../generate/_llm";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const userPrompt = promptReferences(body, body.references ?? []);
    const markdown = await chat([{ role: "user", content: userPrompt }]);
    return NextResponse.json({ markdown, references: markdown });
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || "References failed" }, { status: 500 });
  }
}