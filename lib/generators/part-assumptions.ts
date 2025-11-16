// lib/generators/part-assumptions.ts
import OpenAI from "openai";
import { TenderMeta, ExtractedJson } from "@/lib/shared";
import { DomainPack } from "@/lib/domain-pack";

export async function generateAssumptions(
  client: OpenAI,
  { language, tender, extracted, PACK }:
  { language: string; tender: TenderMeta; extracted: ExtractedJson; PACK: DomainPack }
) {
  const system = `
Je bent contractmanager.
- Taal: ${language}.
- Output: Markdown met duidelijke aannames en uitsluitingen.
- Gebruik placeholders: [[SPECIFIEKE UITSLUITING]], [[VOORWAARDE]].
`.trim();

  const user = `
Schrijf "Aannames & Uitsluitingen" (bullet-lijst) die juridisch zuiver is.
Gebruik sectorhints alleen als het logisch is.
`.trim();

  const res = await client.chat.completions.create({
    model: process.env.OPENAI_MODEL_WRITE || "gpt-4o-mini",
    temperature: 0.2,
    messages: [{ role: "system", content: system }, { role: "user", content: user }],
  });

  return (res.choices[0]?.message?.content || "").trim();
}