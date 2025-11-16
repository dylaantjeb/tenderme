import { NextRequest, NextResponse } from "next/server";
import { promptAssumptions } from "../_prompts";
export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const md = promptAssumptions(body, body?.assumptions || [], body?.exclusions || []);
    return NextResponse.json({ markdown: md });
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || "Assumptions failed" }, { status: 500 });
  }
}