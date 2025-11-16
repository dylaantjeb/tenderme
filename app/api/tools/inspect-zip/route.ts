import { NextRequest, NextResponse } from "next/server";

type ReferenceIn = {
  client?: string;
  title?: string;
  period?: string;
  result?: string;
  contact?: string;
  value?: string;
  scope?: string;
};

function asCsv(rows: ReferenceIn[]) {
  const header = [
    "Opdrachtgever",
    "Projecttitel",
    "Periode",
    "Resultaat/Outcome",
    "Contactpersoon",
    "Contractwaarde",
    "Scope/Kernactiviteiten",
  ];
  const body = rows.map(r => [
    r.client || "-",
    r.title || "-",
    r.period || "-",
    r.result || "-",
    r.contact || "-",
    r.value || "-",
    (r.scope || "-").replace(/\n+/g, " "),
  ]);
  const all = [header, ...body]
    .map(cols => cols.map(v => `"${String(v).replace(/"/g, '""')}"`).join(","))
    .join("\n");
  return all;
}

function asMarkdown(rows: ReferenceIn[]) {
  const header = `| Opdrachtgever | Projecttitel | Periode | Resultaat | Contact | Waarde | Scope |
|---|---|---|---|---|---|---|`;
  const body = rows.map(r =>
    `| ${r.client || "-"} | ${r.title || "-"} | ${r.period || "-"} | ${r.result || "-"} | ${r.contact || "-"} | ${r.value || "-"} | ${(r.scope || "-").replace(/\n/g, " ")} |`
  );
  return [header, ...body].join("\n");
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({} as any));
    const {
      language = "nl-NL",
      company = {},
      tender = {},
      extracted,
    } = body || {};

    // 1) neem referenties van de UI mee (indien aanwezig)
    const uiRefs: ReferenceIn[] = Array.isArray(body?.references) ? body.references : [];

    // 2) probeer uit extract te vissen
    const seen = new Set<string>();
    const fromExtract: ReferenceIn[] = [];
    if (extracted?.references && Array.isArray(extracted.references)) {
      for (const r of extracted.references) {
        const key = JSON.stringify([r.client, r.title, r.period, r.result]);
        if (seen.has(key)) continue;
        seen.add(key);
        fromExtract.push({
          client: r.client,
          title: r.title,
          period: r.period,
          result: r.result,
          contact: r.contact,
          value: r.value,
          scope: r.scope,
        });
      }
    }

    // 3) fallback: maak tenminste 3 placeholders op basis van sector/tender
    const fallback: ReferenceIn[] = [
      {
        client: tender?.authority || "Publieke opdrachtgever",
        title: `Vergelijkbaar project — ${tender?.sector || "Sector"}`,
        period: "2023–2024",
        result: "Binnen planning en KPI’s >95% behaald",
        contact: "Naam contactpersoon • functie • email@domein.nl • +31 (0)6 …",
        value: "€ 250.000",
        scope: `Levering/uitvoering conform ${tender?.title || "aanbesteding"}; projectmanagement, kwaliteitsborging (ISO 9001), rapportage.`,
      },
      {
        client: "Gemeente / Ministerie",
        title: "Landelijke raamovereenkomst — onderhoud/dienstverlening",
        period: "2022–2025",
        result: "Continuïteit geborgd; gemiddelde klanttevredenheid 8,5",
        contact: "—",
        value: "€ 1.200.000",
        scope: "24/7 storingsdienst, preventief onderhoud, periodieke rapportages.",
      },
      {
        client: "Bedrijf X",
        title: "Implementatie — turn-key",
        period: "2024",
        result: "Succesvolle livegang zonder verstoring primaire processen",
        contact: "—",
        value: "€ 480.000",
        scope: "Analyse, ontwerp, realisatie, testen, kennisoverdracht.",
      },
    ];

    const merged: ReferenceIn[] = [...uiRefs, ...fromExtract];
    // waarborg minimaal 3 regels
    while (merged.length < 3) merged.push(fallback[merged.length] || fallback[0]);

    // 4) output beide varianten aanbieden (CSV + MD), UI kan kiezen
    const csv = asCsv(merged);
    const md = asMarkdown(merged);

    return NextResponse.json({
      filename: "Projectreferenties.csv",
      mime: "text/csv",
      base64: Buffer.from(csv, "utf8").toString("base64"),
      markdown: md,
      rows: merged,
      language,
      company,
      tender,
    });
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || "Failed to generate references" }, { status: 500 });
  }
}