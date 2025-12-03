export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const SYSTEM = `
Je bent een strikte extractor. Antwoord ALLEEN met een JSON object, zonder uitleg, zonder codeblokken.
Velden:
{
  "tender": {
    "id": string|null,
    "title": string|null,
    "authority": string|null,
    "country": "NL"|"EU"|null,
    "procedure": string|null,
    "deadline": string|null,
    "cpv": string[]|null
  },
  "criteria": [
    { "name": string, "weight_pct": number|null, "description": string|null }
  ],
  "requirements": {
    "knockouts": string[]|null,
    "musts": string[]|null,
    "deliverables": string[]|null
  },
  "wensen": [
    { "code": string, "description": string, "weight": string|null }
  ]
}
Als iets ontbreekt → gebruik null of lege array. Nooit free text buiten JSON.
`;

function safeJsonParse<T = any>(text: string): T {
  try {
    return JSON.parse(text) as T;
  } catch {
    const m = text.match(/\{[\s\S]*\}$/);
    if (m) {
      try {
        return JSON.parse(m[0]) as T;
      } catch {}
    }
    throw new Error("Extractor gaf geen valide JSON.");
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const sourceText = String(body?.text || body?.content || "");

    if (!sourceText || sourceText.trim().length < 10) {
      return NextResponse.json(
        { error: "Geen bron-tekst aangeleverd voor extractie." },
        { status: 400 }
      );
    }

    const resp = await client.chat.completions.create({
      model: process.env.OPENAI_MODEL || "gpt-5",
      max_completion_tokens: 4000,
      messages: [
        { role: "system", content: SYSTEM },
        { role: "user", content: sourceText },
      ],
    });

    const raw = resp.choices[0]?.message?.content || "";
    const json = safeJsonParse(raw);

    return NextResponse.json({ ok: true, data: json });
  } catch (e: any) {
    console.error("extract error:", e);
    return NextResponse.json({ ok: false, error: e.message || String(e) }, { status: 500 });
  }
}