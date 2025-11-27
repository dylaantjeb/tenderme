// lib/generators/part-compliance.ts
import OpenAI from "openai";
import { ExtractedJson } from "@/lib/shared";
import { DomainPack } from "@/lib/domain-pack";

export type ComplianceRow = { id: string; description: string; comply: "Ja"|"Nee"|"N.v.t."; how: string; evidence: string };

export async function generateCompliance(
  client: OpenAI,
  { language, tender, extracted, PACK }:
  { language: string; tender: any; extracted: ExtractedJson; PACK: DomainPack }
): Promise<{ rows: ComplianceRow[]; markdown: string }> {
  const system = `
Je bent compliance-analist.
- Taal: ${language}.
- Output 1) JSON tabelrijen + 2) Markdown tabel.
- Waar bewijs onbekend is, gebruik [[VOEG BEWIJS TOE]].
- Verwijs naar [REQ-ID]/[KO-ID] in de omschrijving.
`.trim();

  const user = `
Genereer een compliance-matrix op basis van de extractie:
${JSON.stringify(extracted, null, 2)}

Maak eerst JSON met dit schema (max 100 items):
[
  { "id": "REQ-1", "description": "Omschrijving [REQ-1]", "comply": "Ja", "how": "Hoe aantoonbaar", "evidence": "Bewijs of [[VOEG BEWIJS TOE]]" }
]
Daarna geef je dezelfde data als Markdown tabel met kolommen:
| Eis-ID | Omschrijving | Voldoen? | Hoe aantoonbaar | Bewijs |
`.trim();

  const res = await client.chat.completions.create({
    model: process.env.OPENAI_MODEL_WRITE || "gpt-4o-mini",
    temperature: 0.2,
    messages: [{ role: "system", content: system }, { role: "user", content: user }],
  });

  const raw = (res.choices[0]?.message?.content || "").trim();
  // Verwacht: model geeft eerst JSON, daarna Markdown. Simpele split:
  const jsonMatch = raw.match(/```json([\s\S]*?)```/);
  let rows: ComplianceRow[] = [];
  if (jsonMatch) {
    try { rows = JSON.parse(jsonMatch[1].trim()); } catch {}
  }
  const mdMatch = raw.match(/(\| *Eis-ID[\s\S]*)$/);
  const markdown = mdMatch ? mdMatch[1].trim() : raw;

  return { rows, markdown };
}