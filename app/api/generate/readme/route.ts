import { NextRequest, NextResponse } from "next/server";
import { promptREADME } from "../_prompts";
import { chat } from "../../generate/_llm";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const userPrompt = promptREADME(body);
    const markdown = await chat([{ role: "user", content: userPrompt }]);
    return NextResponse.json({ markdown, readme: markdown });
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || "Readme failed" }, { status: 500 });
  }
}