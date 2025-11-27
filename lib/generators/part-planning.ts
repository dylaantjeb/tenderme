// lib/generators/part-planning.ts
import OpenAI from "openai";
import { ExtractedJson } from "@/lib/shared";
import { DomainPack } from "@/lib/domain-pack";

export type PlanningRow = { phase: string; start: string; end: string; deliverable: string; dependency: string };

export async function generatePlanning(
  client: OpenAI,
  { language, tender, extracted, PACK }:
  { language: string; tender: any; extracted: ExtractedJson; PACK: DomainPack }
): Promise<{ rows: PlanningRow[]; markdown: string }> {
  const system = `
Je bent planner.
- Taal: ${language}.
- Geef 1) JSON-rijen en 2) Markdown tabel.
- Gebruik placeholders voor data die onzeker is: [[YYYY-MM-DD]], [[DOORLOOPTIJD]].
`.trim();

  const user = `
Op basis van deze data:
${JSON.stringify(extracted?.planning || [], null, 2)}

Maak planning-rijen met schema:
[
  { "phase":"...", "start":"YYYY-MM-DD", "end":"YYYY-MM-DD", "deliverable":"...", "dependency":"..." }
]

Daarna dezelfde data als Markdown tabel met kolommen:
| Fase | Start | Eind | Deliverable | Afhankelijkheid |
`.trim();

  const res = await client.chat.completions.create({
    model: process.env.OPENAI_MODEL_WRITE || "gpt-4o-mini",
    temperature: 0.2,
    messages: [{ role: "system", content: system }, { role: "user", content: user }],
  });

  const raw = (res.choices[0]?.message?.content || "").trim();
  const jsonMatch = raw.match(/```json([\s\S]*?)```/);
  let rows: PlanningRow[] = [];
  if (jsonMatch) {
    try { rows = JSON.parse(jsonMatch[1].trim()); } catch {}
  }
  const mdMatch = raw.match(/(\| *Fase[\s\S]*)$/);
  const markdown = mdMatch ? mdMatch[1].trim() : raw;

  return { rows, markdown };
}