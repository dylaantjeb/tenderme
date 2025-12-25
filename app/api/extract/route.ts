export const dynamic = "force-dynamic";
export const runtime = "nodejs";

import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

function emptyData() {
  return {
    tender: {
      id: null,
      title: null,
      authority: null,
      country: null,
      procedure: null,
      deadline: null,
      cpv: null,
    },
    criteria: [],
    requirements: { knockouts: [], musts: [], deliverables: [] },
    wensen: [],
  };
}

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

const MAX_SOURCE_CHARS = 180_000;

function pickFirstString(...candidates: any[]): { value: string; key: string } {
  for (const c of candidates) {
    if (typeof c === "string" && c.trim().length) return { value: c, key: "string" };
  }
  return { value: "", key: "" };
}

export async function POST(req: NextRequest) {
  const warnings: string[] = [];

  try {
    const body = await req.json().catch(() => ({} as any));

    // ✅ accepteer alle varianten die in je app rondzwerven
    const candidates: Array<{ key: string; value: any }> = [
      { key: "sourceText", value: body?.sourceText },
      { key: "extractedText", value: body?.extractedText },           // <-- dit miste
      { key: "text", value: body?.text },
      { key: "content", value: body?.content },
      { key: "extractedNotes", value: body?.extractedNotes },
      { key: "notes", value: body?.notes },
      { key: "upload.extractedText", value: body?.upload?.extractedText },
      { key: "upload.extractedTextRaw", value: body?.upload?.extractedTextRaw },
      { key: "upload.notes", value: body?.upload?.notes },
      { key: "upload.extractedNotes", value: body?.upload?.extractedNotes },
      { key: "meta.extractedText", value: body?.meta?.extractedText },
    ];

    let usedKey = "";
    let sourceText = "";
    for (const c of candidates) {
      if (typeof c.value === "string" && c.value.trim().length) {
        usedKey = c.key;
        sourceText = c.value;
        break;
      }
    }

    sourceText = String(sourceText || "");
    const sourceChars = sourceText.trim().length;

    // clamp om OpenAI 400 te vermijden
    if (sourceText.length > MAX_SOURCE_CHARS) {
      sourceText = sourceText.slice(0, MAX_SOURCE_CHARS);
      warnings.push(`Brontekst ingekort naar ${MAX_SOURCE_CHARS} tekens (token-budget).`);
    }

    // ✅ als er geen tekst is: nooit 400, maar ok:true + warning
    if (sourceText.trim().length < 10) {
      warnings.push(
        "Geen (bruikbare) bron-tekst gevonden voor extractie. " +
          "Controleer dat je bij /api/extract het veld 'extractedText' (of 'sourceText') meestuurt."
      );
      return NextResponse.json(
        {
          ok: true,
          data: emptyData(),
          extracted: emptyData(), // backward compat
          warnings,
          sourceChars,
          debug: { usedKey }, // helpt bij troubleshooting
        },
        { status: 200 }
      );
    }

    if (!process.env.OPENAI_API_KEY) {
      warnings.push("OPENAI_API_KEY ontbreekt. Extractie overgeslagen.");
      return NextResponse.json(
        {
          ok: true,
          data: emptyData(),
          extracted: emptyData(),
          warnings,
          sourceChars,
          debug: { usedKey },
        },
        { status: 200 }
      );
    }

    const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

    let raw = "";
    try {
      const resp = await client.chat.completions.create({
        model: process.env.OPENAI_MODEL || "gpt-5",
        max_completion_tokens: 4000,
        messages: [
          { role: "system", content: SYSTEM },
          { role: "user", content: sourceText },
        ],
      });
      raw = resp.choices[0]?.message?.content || "";
    } catch (e: any) {
      warnings.push(`OpenAI extractie faalde: ${e?.message || String(e)}`);
      return NextResponse.json(
        {
          ok: true,
          data: emptyData(),
          extracted: emptyData(),
          warnings,
          sourceChars,
          debug: { usedKey },
        },
        { status: 200 }
      );
    }

    let json: any;
    try {
      json = safeJsonParse(raw);
    } catch (e: any) {
      warnings.push(e?.message || "Extractor gaf geen valide JSON.");
      return NextResponse.json(
        {
          ok: true,
          data: emptyData(),
          extracted: emptyData(),
          warnings,
          sourceChars,
          debug: { usedKey },
        },
        { status: 200 }
      );
    }

    return NextResponse.json(
      {
        ok: true,
        data: json,
        extracted: json, // backward compat
        warnings,
        sourceChars,
        debug: { usedKey },
      },
      { status: 200 }
    );
  } catch (e: any) {
    warnings.push(`Extract endpoint error: ${e?.message || String(e)}`);
    return NextResponse.json(
      {
        ok: true,
        data: emptyData(),
        extracted: emptyData(),
        warnings,
        sourceChars: 0,
        debug: { usedKey: "" },
      },
      { status: 200 }
    );
  }
}