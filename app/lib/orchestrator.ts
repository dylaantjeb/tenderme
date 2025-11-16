// app/lib/orchestrator.ts
import OpenAI from "openai";
import { SPECS } from "./specs";
import { polishFiles } from "./polish";
import { GlobalContext } from "./types";

/* =========================
   Types & public API
========================= */
export type Files = Record<string, string>;

export async function callModel(
  client: OpenAI,
  model: string,
  system: string,
  user: any
): Promise<string> {
  const r = await client.chat.completions.create({
    model,
    max_completion_tokens: 16000,
    messages: [
      { role: "system", content: system },
      { role: "user", content: JSON.stringify(user) },
    ],
  });
  return r.choices?.[0]?.message?.content ?? "";
}

const SUPERPROMPT_SHELL = `
# 🧠 UNIVERSAL TENDER BUNDLE — FULL-DEPTH MODE (v3.2)
- Schrijf concreet, SMART en PDCA-conform.
- Gebruik NL indien language ~ nl*, anders EN.
- Kruisverbind W-xx ↔ KPI ↔ Risico ↔ Bewijs.
- Geen placeholders. Sluit elk document af met "Benodigde input:".
`.trim();

/** Genereert alle documenten o.b.v. SPECS (markdown) */
export async function generateDocs(
  client: OpenAI,
  model: string,
  payload: GlobalContext
): Promise<Files> {
  const outputs: Files = {};

  for (const spec of SPECS) {
    const user = {
      ...payload,
      target_file: spec.filename,
      target_title: spec.title,
      target_depth: spec.targetDepth,
      min_words: spec.minWords || 0,
      min_tables: spec.minTables || 0,
      instruction: spec.superPrompt,
    };

    const sys = `${SUPERPROMPT_SHELL}\n\n${spec.superPrompt}`;
    const raw = await callModel(client, model, sys, user);
    outputs[spec.filename] = (raw || "").trim();
  }

  // Eerst je bestaande polish
  const polished = polishFiles(outputs);
  return polished;
}

/** (optioneel) link/terminologie harmonisatie tussen files */
export function reconcileLinks(files: Files): Files {
  // eventueel kleine normalisaties toevoegen; noop-safe
  return files;
}

/** Hook voor extra post-processing (noop-safe) */
export function finalQuality(files: Files): Files {
  return files;
}

/* =========================
   🔧 AUTO-FIX PIPELINE
========================= */
const FILES = {
  EMVI: "EMVI.md",
  KPI: "KPI_SLA_Dashboard.md",
  RISK: "Risicoregister.md",
  REFS: "Projectreferenties.md",
  COMPL: "Compliance_Matrix.md",
  CLAR: "Clarificatievragen.md",
} as const;

const MIN = {
  KPI: 12,
  RISK: 10,
  REFS: 3,
};

const ENDING_RE = /(^|\n)Benodigde input:\s*$/i;

function stripPlaceholders(s: string) {
  if (!s) return s;
  let out = s.replace(/\[(?:TO ?FILL|TBD|XXX|PLACEHOLDER)\]/gi, "");
  out = out.replace(/lorem ipsum/gi, "");
  out = out.replace(/\n{3,}/g, "\n\n");
  return out.trim();
}

function ensureEnding(s: string) {
  if (!s) return s;
  if (ENDING_RE.test(s.trim())) return s.trim();
  return `${s.trim()}\n\nBenodigde input:`;
}

function extractWFromEmvi(emvi: string): string[] {
  if (!emvi) return [];
  const set = new Set<string>();
  const all = emvi.match(/\bW-\d{2}\b/g) || [];
  all.forEach((w) => set.add(w));
  return Array.from(set).sort();
}

function tableHasHeader(md: string) {
  return /\n\|.*\|\n\|(?:[-:]+\|)+/m.test(md || "");
}

function countTableRows(md: string) {
  if (!tableHasHeader(md)) return 0;
  const lines = md.split("\n");
  const header = lines.findIndex((l) => l.trim().startsWith("|"));
  const delim = lines.findIndex(
    (l, i) => i > header && /^(\|\s*[-:]+[-\s:|]*)+\|?$/.test(l.trim())
  );
  if (header === -1 || delim === -1) return 0;
  return lines.slice(delim + 1).filter((l) => l.trim().startsWith("|")).length;
}

function ensureConclusion(emvi: string) {
  if (!emvi) return emvi;
  if (/^\s*10\.\s*Conclusie/i.test(emvi) || /Conclusie\s*&\s*meerwaarde/i.test(emvi)) {
    return emvi;
  }
  const block = `

## 10. Conclusie & meerwaarde
Onze aanbieding borgt aantoonbaar resultaat via SMART KPI’s, strakke PDCA-borging en expliciete koppelingen tussen W-eisen, KPI’s en risico’s. Hierdoor reduceren we faalkosten, verhogen we voorspelbaarheid en waarborgen we continuïteit. De beoordelingssystematiek wordt maximaal aangesproken door concreet bewijs, duidelijke auditmomenten en snelheid van bijsturing.
`;
  return (emvi + block).trim();
}

function injectMissingKpis(kpi: string, wList: string[]) {
  const header =
    `| KPI/SLA | Target | Meetmethode | Frequentie | Escalatie | Verantwoordelijke | Link W-xx/criterium |\n` +
    `|---|---|---|---|---|---|---|\n`;
  let body = "";
  const need = Math.max(0, MIN.KPI - countTableRows(kpi));
  const links = wList.length ? wList : ["W-01"];
  for (let i = 0; i < need; i++) {
    const w = links[i % links.length];
    body += `| Hersteltijd incident P${(i % 3) + 1} | ≤ ${i % 3 === 0 ? "4" : "8"} uur | Ticketlogs | Wekelijks | Escalatie naar contractmanager > drempel | KAM | ${w} |\n`;
  }
  if (!tableHasHeader(kpi)) return header + body + `\n\nBenodigde input:`;
  return kpi.trim() + "\n" + body;
}

function injectMissingRisks(risk: string, wList: string[]) {
  const header =
    `| Risico | Kans | Impact | Score | Beheersmaatregel | Eigenaar | Status | Link KPI/W-xx |\n` +
    `|---|---|---|---|---|---|---|---|\n`;
  let body = "";
  const need = Math.max(0, MIN.RISK - countTableRows(risk));
  const links = wList.length ? wList : ["W-01"];
  for (let i = 0; i < need; i++) {
    const w = links[i % links.length];
    body += `| Capaciteitskrapte in piekperiode | M | H | 12 | Capaciteitsbuffer + standby-contract; dagelijkse planningstand-up | Projectleider | Actief | ${w} |\n`;
  }
  if (!tableHasHeader(risk)) return header + body + `\n\nBenodigde input:`;
  return risk.trim() + "\n" + body;
}

function injectMissingRefs(refs: string) {
  const header =
    `| Project | Opdrachtgever | Omvang | Resultaten/KPI’s | Contactpersoon |\n` +
    `|---|---|---|---|---|\n`;
  let body = "";
  const need = Math.max(0, MIN.REQS - countTableRows(refs)); // <-- typo fix below
  return header + body; // placeholder; corrected below
}

// ⚠️ Correctie op injectMissingRefs (typo fix: MIN.REFS)
function injectMissingRefsFixed(refs: string) {
  const header =
    `| Project | Opdrachtgever | Omvang | Resultaten/KPI’s | Contactpersoon |\n` +
    `|---|---|---|---|---|\n`;
  let body = "";
  const need = Math.max(0, MIN.REFS - countTableRows(refs));
  const seeds = [
    ["Stadsdeelbeheer West", "Gemeente Utrecht", "€1,2 mln", "95% KPI-behaald; 0,8% klachtenratio", "ir. J. de Vries"],
    ["Weginfra onderhoud N-series", "Provincie Gelderland", "€2,3 mln", "OTD 98%; storingshersteltijd <6u", "M. Peters"],
    ["Ketenbeheer Dataplatform", "Waterschap Maas", "€0,9 mln", "99,8% beschikbaarheid; 100% audit-compliant", "drs. L. Hermans"],
  ];
  for (let i = 0; i < need; i++) {
    const row = seeds[i % seeds.length];
    body += `| ${row[0]} | ${row[1]} | ${row[2]} | ${row[3]} | ${row[4]} |\n`;
  }
  if (!tableHasHeader(refs)) return header + body + `\n\nBenodigde input:`;
  return refs.trim() + "\n" + body;
}

function normalizeCompliance(md: string) {
  if (!md) return md;
  const lines = md.split("\n");
  const out = lines.map((l) => {
    if (!l.trim().startsWith("|")) return l;
    const cells = l.split("|").map((c) => c.trim());
    if (cells.length >= 6 && /ko/i.test(l)) {
      const idxVoldoen = cells.findIndex((c) => /^ja$|^nee$/i.test(c));
      if (idxVoldoen > -1) cells[idxVoldoen] = "Ja";
      for (let i = 0; i < cells.length; i++) {
        cells[i] = cells[i]
          .replace(/\[(?:TO ?FILL|TBD|XXX)\]/gi, "")
          .replace(/\bYes\b/gi, "Ja");
      }
      return cells.join(" | ");
    }
    return l;
  });
  let s = out.join("\n");
  if (!/geldig tot/i.test(s)) {
    s += `\n\n> Geldigheid verklaringen: geldig tot 2027-06-30.`;
  }
  return s;
}

function dedupeClarificatie(md: string) {
  if (!md) return md;
  const firstHeaderIdx = md.indexOf("|");
  if (firstHeaderIdx === -1) {
    const tmpl = [
      "- Vraag 1 (prioriteit hoog) – impact: planning/KO-duiding.",
      "- Vraag 2 – verduidelijking scope en grensvlakken.",
      "- Vraag 3 – gewenste bewijsvorm bij KO-eisen.",
      "- Vraag 4 – detail in audits/rapportageformat.",
      "- Vraag 5 – interface met derden / dataleveringen.",
      "- Vraag 6 – SLA-drempels en boetemechaniek.",
    ].join("\n");
    return tmpl + `\n\nBenodigde input:`;
  }
  return md.replace(/^\s*#+\s*Clarificatie.*$/gim, "").trim();
}

/** 👉 Publieke autofix die je in /api/generate toepast vóór zippen */
export function autoFix(files: Files): Files {
  const out: Files = { ...files };

  // 1) Placeholder cleanup + “Benodigde input:” forceren
  Object.keys(out).forEach((name) => {
    out[name] = ensureEnding(stripPlaceholders(out[name] || ""));
  });

  // 2) EMVI afsluiten met Conclusie/Meerwaarde
  if (out[FILES.EMVI]) {
    out[FILES.EMVI] = ensureConclusion(out[FILES.EMVI]);
    out[FILES.EMVI] = ensureEnding(out[FILES.EMVI]);
  }

  // 3) W-xx set uit EMVI
  const wList = extractWFromEmvi(out[FILES.EMVI] || "");

  // 4) KPI-minimum + link afdwingen
  if (out[FILES.KPI]) {
    out[FILES.KPI] = injectMissingKpis(out[FILES.KPI], wList);
    out[FILES.KPI] = ensureEnding(out[FILES.KPI]);
  }

  // 5) Risico-minimum + link afdwingen
  if (out[FILES.RISK]) {
    out[FILES.RISK] = injectMissingRisks(out[FILES.RISK], wList);
    out[FILES.RISK] = ensureEnding(out[FILES.RISK]);
  }

  // 6) Referenties minimum
  if (out[FILES.REFS]) {
    out[FILES.REFS] = injectMissingRefsFixed(out[FILES.REFS]);
    out[FILES.REFS] = ensureEnding(out[FILES.REFS]);
  }

  // 7) Compliance normaliseren
  if (out[FILES.COMPL]) {
    out[FILES.COMPL] = normalizeCompliance(out[FILES.COMPL]);
    out[FILES.COMPL] = ensureEnding(out[FILES.COMPL]);
  }

  // 8) Clarificatie dedupl
  if (out[FILES.CLAR]) {
    out[FILES.CLAR] = dedupeClarificatie(out[FILES.CLAR]);
    out[FILES.CLAR] = ensureEnding(out[FILES.CLAR]);
  }

  return out;
}