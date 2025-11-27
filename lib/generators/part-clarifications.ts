// lib/generators/part-clarifications.ts
import OpenAI from "openai";
import { ExtractedJson } from "@/lib/shared";
import { DomainPack } from "@/lib/domain-pack";

export async function generateClarifications(
  client: OpenAI,
  { language, tender, extracted, PACK }:
  { language: string; tender: any; extracted: ExtractedJson; PACK: DomainPack }
) {
  const system = `
Je bent een kritische, beleefde vraagsteller.
- Taal: ${language}.
- Output: Markdown lijst (min. 3–7 vragen).
- Vragen zijn specifiek, niet triviaal, en helpen KO/REQ’s te verduidelijken.
`.trim();

  const user = `
Genereer gerichte clarificatievragen over scope, eisen, data, planning en contractkaders.
Gebruik placeholders als bron onduidelijk is: [[PARAGRAAF]], [[TEKENING]], [[DATUM]].
`.trim();

  const res = await client.chat.completions.create({
    model: process.env.OPENAI_MODEL_WRITE || "gpt-4o-mini",
    temperature: 0.3,
    messages: [{ role: "system", content: system }, { role: "user", content: user }],
  });

  return (res.choices[0]?.message?.content || "").trim();
}