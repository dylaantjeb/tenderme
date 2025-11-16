import { NextResponse } from "next/server";
import OpenAI from "openai";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type R = { risk: string; mitigation: string; probability?: string; impact?: string; owner?: string; status?: string };
const asArr = <T>(v: any, fb: T[] = []) => (Array.isArray(v) ? v : fb);

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const language = body?.language || "nl-NL";
    const risks = asArr<R>(body?.risks).map((r) => ({
      risk: r.risk || "-",
      mitigation: r.mitigation || "-",
      probability: r.probability || "-",
      impact: r.impact || "-",
      owner: r.owner || "-",
      status: r.status || "-",
    }));

    const header = `| Risico | Kans | Impact | Maatregel | Status | Eigenaar |
|---|---|---|---|---|---|`;
    const rows = risks.map(
      (r) => `| ${r.risk} | ${r.probability} | ${r.impact} | ${r.mitigation} | ${r.status} | ${r.owner} |`
    );
    let markdown = `## Risicoanalyse\n\n${header}\n${rows.join("\n")}\n`;

    const csv = ["risk,probability,impact,mitigation,status,owner"]
      .concat(
        risks.map((r) =>
          [
            r.risk.replaceAll(",", ";"),
            r.probability,
            r.impact,
            r.mitigation.replaceAll(",", ";"),
            r.status,
            r.owner,
          ].join(",")
        )
      )
      .join("\n");

    if (process.env.OPENAI_API_KEY) {
      const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! });
      const sys = `Je bent een ervaren tenderconsultant. Schrijf kort, concreet en audit-proof (${language}).`;
      const usr = `Verfijn waar nuttig (SMART) zonder nieuwe feiten toe te voegen. Houd de tabelstructuur.
${markdown}`;
      const resp = await client.chat.completions.create({
        model: process.env.OPENAI_MODEL_WRITE || "gpt-4o-mini",
        temperature: 0.2,
        messages: [{ role: "system", content: sys }, { role: "user", content: usr }],
      });
      markdown = resp.choices[0]?.message?.content?.trim() || markdown;
    }

    return NextResponse.json({ markdown, csv });
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || "Risk generation failed" }, { status: 500 });
  }
}