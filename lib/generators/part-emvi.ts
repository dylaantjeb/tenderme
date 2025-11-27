// lib/generators/part-emvi.ts
import OpenAI from "openai";
import { safe, TenderMeta, CompanyMeta, ExtractedJson } from "@/lib/shared";
import { DomainPack } from "@/lib/domain-pack";

export async function generateEMVI(
  client: OpenAI,
  { language, tender, company, references, pricing, extracted, PACK }:
  { language: string; tender: TenderMeta; company: CompanyMeta; references: any[]; pricing: any; extracted: ExtractedJson; PACK: DomainPack }
) {
  const system = `
Je bent senior aanbestedingsschrijver (EMVI).
- Taal: ${language}, concreet en verifieerbaar.
- Verwijs naar eisen met [REQ-ID]/[KO-ID] als je een claim doet.
- Structureer met H2/H3 + tabellen waar zinvol.
- Gebruik [[VUL HIER ... IN]] voor ontbrekende klantspecifieke data.
- Geen bedragen; alleen prijsbenadering.
`.trim();

  const user = `
Schrijf een VOLLEDIG EMVI-plan (5–10 pagina’s tekst) met deze secties:
1) Begrip van de opdracht
2) Aanpak & methodiek (werkpakketten, ITP/QA, tooling)
3) Projectorganisatie (rollen, vervanging, escalatie)
4) Kwaliteitsborging (audits, keuringen, dossier)
5) Duurzaamheid & innovatie
6) Planning & fasering (tekstueel)
7) Risicobeheersing
8) Communicatie & stakeholdermanagement
9) Prijsbenadering (zonder bedragen)
10) Referenties (kort narratief)

Context:
- Tender: ${safe(tender.title)} (${safe(tender.authority)}, ref ${safe(tender.referenceId)})
- Scope: ${safe(tender.scope)}
- Sectorprofiel: ${PACK.name}
- Strengths: ${(company.strengths || []).join("; ") || "-"}
- Certificeringen: ${(company.certifications || []).join("; ") || "-"}
- Prijsmodel (indicatief): ${safe(pricing?.model)} — ${safe(pricing?.narrative)}

Extractie (gebruik ID’s expliciet bij claims):
${JSON.stringify(extracted, null, 2)}

Eisenverwijzing:
- Als je “voldoet” zegt, voeg [REQ-..] of [KO-..] toe.
- Waar brononzeker → gebruik [[BRON/PARAGRAAF INVULLEN]].

Toevoegen van placeholders:
- [[TEAMROL NAAM/CONTACT]]
- [[MIJLPAAL/DATUM]]
- [[NORM/PROCES]]
`.trim();

  const res = await client.chat.completions.create({
    model: process.env.OPENAI_MODEL_WRITE || "gpt-4o-mini",
    temperature: 0.3,
    messages: [{ role: "system", content: system }, { role: "user", content: user }],
  });

  return (res.choices[0]?.message?.content || "").trim();
}