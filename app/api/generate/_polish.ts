import { chat } from "./_llm";

export async function polishMarkdown(
  raw: string,
  ctx: {
    ko?: { id?: string; name?: string }[];
    req?: { id?: string; name?: string }[];
    kpi?: { id?: string; name?: string }[];
    tone?: "zakelijk" | "winnend" | "neutraal";
  } = {}
) {
  const koList = (ctx.ko||[]).map((k,i)=>k.id||`KO-${i+1}`);
  const reqList = (ctx.req||[]).map((r,i)=>r.id||`REQ-${i+1}`);

  const sys = `Je bent een senior tendermanager. Je levert opleverklaar, toetsbaar, helder NL.`;
  const usr = `
TEKST (MARKDOWN)
---
${raw}

DOEL
- Maak consistent en opleverklaar.
- Vul ontbrekende harde waarden met "[IN TE VULLEN: beschrijving]".
- Verwijs waar relevant naar eisen: ${reqList.join(", ") || "—"} en knock-outs: ${koList.join(", ") || "—"} met [REQ-..] / [KO-..].
- Houd toon: ${ctx.tone || "winnend"}.

TEUG
- Laat markdown-structuur intact.
- Geen meta-uitleg, alleen finale tekst.
`;

  return await chat([{role:"system",content:sys},{role:"user",content:usr}], 0.1);
}