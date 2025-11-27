// lib/generators/part-kpisla.ts
import OpenAI from "openai";
import { ExtractedJson } from "@/lib/shared";
import { DomainPack } from "@/lib/domain-pack";

export type KpiRow = { kpi: string; target: string; measure: string; frequency: string; escalation: string };

export async function generateKPISLA(
  client: OpenAI,
  { language, tender, extracted, PACK }:
  { language: string; tender: any; extracted: ExtractedJson; PACK: DomainPack }
): Promise<{ rows: KpiRow[]; markdown: string }> {
  const system = `
Je bent KPI/SLA-consultant.
- Taal: ${language}.
- Output: eerst JSON-rijen, dan Markdown tabel.
- Zorg dat KPI's SMART zijn. Gebruik [[NORMWAARDE]], [[MEETFREQUENTIE]] als nodig.
`.trim();

  const user = `
Genereer KPI/SLA-rijen (minimaal 5) op basis van extractie en sector hints:
Extractie:
${JSON.stringify(extracted?.kpi || [], null, 2)}

Schema:
[
  { "kpi":"...", "target":"...", "measure":"...", "frequency":"...", "escalation":"..." }
]

Daarna als Markdown:
| KPI | Target | Meting | Frequentie | Escalatie |
`.trim();

  const res = await client.chat.completions.create({
    model: process.env.OPENAI_MODEL_WRITE || "gpt-4o-mini",
    temperature: 0.25,
    messages: [{ role: "system", content: system }, { role: "user", content: user }],
  });

  const raw = (res.choices[0]?.message?.content || "").trim();
  const jsonMatch = raw.match(/```json([\s\S]*?)```/);
  let rows: KpiRow[] = [];
  if (jsonMatch) {
    try { rows = JSON.parse(jsonMatch[1].trim()); } catch {}
  }
  const mdMatch = raw.match(/(\| *KPI[\s\S]*)$/);
  const markdown = mdMatch ? mdMatch[1].trim() : raw;

  return { rows, markdown };
}