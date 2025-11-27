// lib/generators/part-executive.ts
import OpenAI from "openai";
import { safe, TenderMeta, CompanyMeta } from "@/lib/shared";
import { DomainPack } from "@/lib/domain-pack";

export async function generateExecutiveSummary(
  client: OpenAI,
  { language, tender, company, references, PACK }:
  { language: string; tender: TenderMeta; company: CompanyMeta; references: any[]; PACK: DomainPack }
) {
  const system = `
Je bent senior tenderconsultant.
- Taal: ${language}, zakelijk en overtuigend.
- Max 1 pagina, compact en concreet.
- Geen bedragen. Gebruik [[VUL HIER ... IN]] waar details ontbreken.
`.trim();

  const user = `
Schrijf een Executive Summary voor de aanbesteding.

Context:
- Tender: ${safe(tender.title)} (${safe(tender.authority)}, ref ${safe(tender.referenceId)})
- Scope: ${safe(tender.scope)}
- Sectorprofiel: ${PACK.name}
- Bedrijf: ${safe(company.name)} (${safe(company.city)})
- Sterktes: ${(company.strengths || []).join("; ") || "-"}
- Certificeringen: ${(company.certifications || []).join("; ") || "-"}
- Referenties (kort): ${(references || []).map((r:any)=>r?.client || "[[REFERENTIE]]").slice(0,3).join(", ") || "-"}

Doel:
- Overtuig waarom wij geschikt zijn (onderscheidend vermogen, kwaliteit, voorspelbaarheid).
- Benoem KO's/eisen alleen indien zeker, anders laat open en gebruik placeholder.
- Zet expliciet 3–5 bullets “waarom wij” met meetbare claims.

Gebruik 1–2 alinea’s + bullets. Voeg ten minste 3 placeholders toe: [[REFERENTIE/KPI]], [[TERMIJN]], [[CONTACTPERSOON]].
`.trim();

  const res = await client.chat.completions.create({
    model: process.env.OPENAI_MODEL_WRITE || "gpt-4o-mini",
    temperature: 0.25,
    messages: [{ role: "system", content: system }, { role: "user", content: user }],
  });

  return (res.choices[0]?.message?.content || "").trim();
}