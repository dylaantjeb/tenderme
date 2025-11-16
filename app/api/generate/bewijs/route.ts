import { NextResponse } from "next/server";
import OpenAI from "openai";

export const runtime = "nodejs";
const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! });

type EvidenceItem = {
  id?: string;                 // bv. "REQ-12" of "KO-3"
  requirement?: string;        // korte omschrijving van de eis
  description?: string;        // wat is het bewijsstuk?
  source?: string;             // waar te vinden (systeem/map/URL)
  filename?: string;           // bestandsnaam indien geüpload
  status?: "present" | "missing" | "n/a";
};

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const language = body.language || "nl-NL";
    const tender   = body.tender   || {};
    const company  = body.company  || {};

    // accepteer diverse sleutel-varianten vanuit je UI
    const raw: EvidenceItem[] =
      Array.isArray(body.evidence) ? body.evidence
      : Array.isArray(body.bewijs) ? body.bewijs
      : Array.isArray(body.items)   ? body.items
      : [];

    // normalize
    const items: EvidenceItem[] = raw.map((r, i) => ({
      id: r.id || r.requirement || `ITEM-${i + 1}`,
      requirement: r.requirement || "",
      description: r.description || r.filename || "—",
      source: r.source || (r.filename ? `upload://${r.filename}` : "—"),
      filename: r.filename || "",
      status: (r.status as any) || (r.filename ? "present" : "missing"),
    }));

    // simpele tabel in Markdown
    const header =
      `# Bewijsstukken\n\n` +
      `**Tender:** ${tender.title ?? "—"}  \n` +
      `**Opdrachtgever:** ${tender.authority ?? "—"}  \n` +
      `**Bedrijf:** ${company.name ?? "—"}\n\n` +
      `| ID | Eis (kort) | Bewijsstuk | Bron/Locatie | Status |\n` +
      `|---|---|---|---|---|\n`;

    const rows = items
      .map(it =>
        `| ${it.id ?? "—"} | ${it.requirement ?? "—"} | ${it.description ?? "—"} | ${it.source ?? "—"} | ${it.status ?? "—"} |`
      )
      .join("\n");

    let markdown = header + rows + "\n";

    // optioneel: laat LLM tekst kort aanscherpen (descripties zonder nieuwe claims)
    if (process.env.OPENAI_API_KEY && items.length) {
      const sys = `
Je bent een nauwkeurige aanbestedingsschrijver.
Verbeter uitsluitend formulering/consistentie van de tabelrijen hieronder (geen nieuwe claims).
Taal: ${language}. Houd het feitelijk en kort.`;
      const usr = `
Verbeter waar nodig de omschrijvingen van "Bewijsstuk" (kolom 3).
Laat kolomwaarden intact qua betekenis. Output ALLEEN de verbeterde Markdown-tabel (kop+rijen). 

Huidige tabel:
${markdown}
`.trim();

      try {
        const resp = await client.chat.completions.create({
          model: process.env.OPENAI_MODEL_WRITE || "gpt-4o-mini",
          temperature: 0.2,
          messages: [
            { role: "system", content: sys },
            { role: "user", content: usr },
          ],
        });
        const improved = resp.choices[0]?.message?.content?.trim();
        if (improved && improved.includes("|")) {
          // probeer alleen te vervangen als het op een tabel lijkt
          markdown = improved;
        }
      } catch {
        // bij fout: val terug op originele markdown
      }
    }

    return NextResponse.json({ markdown, items });
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || "evidence failed" }, { status: 500 });
  }
}