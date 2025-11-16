import { NextResponse } from "next/server";

const MODEL = process.env.OPENAI_MODEL || "gpt-4o-mini";
const API_KEY = process.env.OPENAI_API_KEY!;

export type ChatTurn = { role: "system"|"user"|"assistant"; content: string };

export async function chat(messages: ChatTurn[], temperature = 0.2) {
  const r = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: { "Authorization": `Bearer ${API_KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify({ model: MODEL, temperature, messages }),
  });
  if (!r.ok) {
    const t = await r.text().catch(()=>"");
    throw new Error(`LLM error ${r.status}: ${t}`);
  }
  const j = await r.json();
  return j.choices?.[0]?.message?.content?.trim() || "";
}

export function ok(data: any) { return NextResponse.json(data, { status: 200 }); }
export function bad(msg: string, code = 400) { return NextResponse.json({ error: msg }, { status: code }); }