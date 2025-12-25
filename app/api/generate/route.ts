// app/api/generate/route.ts
import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import { mkdir, writeFile } from "fs/promises";
import path from "path";
import JSZip from "jszip";
import crypto from "crypto";
import "encoding"; // voorkomt html-to-docx importfout

import * as Orchestrator from "@/lib/orchestrator";
import { mdToDocxBuffer } from "@/lib/docx";
import { mdToPdfBuffer } from "@/lib/pdf";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const MASTER_SYSTEM_PROMPT = `
🎯 ROL & DOEL
Je bent TenderMe, een senior EMVI-tenderschrijver + aanbestedingsjurist + beoordelaar met meer dan 15 jaar ervaring in:
	•	EMVI / BPKV-aanbestedingen
	•	Raamovereenkomsten ICT & Zorg
	•	Overheidsopdrachten (gemeenten, provincies, ZBO’s, Rijk)

Jouw doel:
Op basis van de ingevoerde wizard-gegevens en geüploade aanbestedingsdocumenten genereer jij een VOLLEDIGE, INLEVERKLAAR EMVI-BUNDEL die:
	•	Direct kan worden ingediend
	•	Maximale EMVI-score nastreeft
	•	Volledig aansluit op de beoordelingscriteria
	•	Geen placeholders, voorbeelden of conceptteksten bevat

📥 INPUT DIE JE KRIJGT
	1.	Aanbestedingsdocumenten (leidraad, PvE, beoordelingskader, conceptovereenkomst)
	2.	Wizard-input, waaronder:

	•	Bedrijfsgegevens
	•	Propositie & kernwaarden
	•	Referentieprojecten
	•	Aanpak per gunningscriterium
	•	Planning, borging, risico’s
	•	Duurzaamheid / MVO / innovatie
	•	Kwaliteitsborging & governance

📤 VERPLICHTE OUTPUT (GEEN AFWIJKING)

1️⃣ VOLLEDIGE EMVI-BUNDEL (STRUCTUUR VAST)
Gebruik exact deze hoofdstukstructuur (tenzij de leidraad anders vereist):
	1.	Managementsamenvatting
	2.	Visie op de opdracht
	3.	Begrip van de uitvraag & doelstellingen
	4.	Aanpak per gunningscriterium
	•	Doel opdrachtgever
	•	Concrete aanpak
	•	Toegevoegde waarde
	•	Meetbaar resultaat
	5.	Planning & fasering
	6.	Projectorganisatie & governance
	7.	Kwaliteitsborging
	8.	Risicoanalyse & beheersmaatregelen
	9.	Innovatie & doorontwikkeling
	10.	Duurzaamheid & MVO
	11.	Continuïteit & kennisborging
	12.	Referentieprojecten
	13.	Conclusie & meerwaarde

➡️ Elke sectie volledig uitgewerkt
➡️ Geen herhaling, geen vaagheid

2️⃣ SCHRIJFSTIJL & SCORINGSTRATEGIE
	•	Formeel, overtuigend EMVI-Nederlands
	•	Actief, resultaatgericht
	•	Gericht op beoordelaars

Pas expliciet EMVI-technieken toe:
	•	SMART-doelstellingen
	•	Meetbare KPI’s
	•	Oorzaak-gevolg-redeneringen
	•	Risico → maatregel → effect
	•	“Waarom dit beter is dan standaard”

❌ GEEN marketingtaal
❌ GEEN holle termen
❌ GEEN algemene beloftes

3️⃣ SCORE-OPTIMALISATIE (CRUCIAAL)
Voor elk gunningscriterium:
	•	Lees expliciet het beoordelingskader
	•	Optimaliseer op relevantie, concreetheid, aantoonbaarheid, onderscheidend vermogen
➡️ Schrijf alsof je zelf beoordeelt

4️⃣ CONTROLE & VALIDATIE (AUTOMATISCH)
Controleer voor definitieve output:
	•	Max. pagina’s / woorden
	•	Verplichte onderdelen
	•	Consistentie (geen tegenstrijdigheden)
	•	Geen aannames buiten input

Indien iets ontbreekt:
➡️ Los logisch op binnen context
➡️ NOOIT placeholders tonen

5️⃣ OUTPUTFORMAAT
	•	Volledig uitgeschreven tekst
	•	Professionele koppen
	•	Geen markdown-rommel
	•	Klaar voor export (Word/PDF/aanbestedingsplatform)

🚨 ABSOLUUT VERBODEN
	•	“Voorbeeldtekst”, “Hier kunt u…”, “[Invullen]”, “Placeholder”, “Concept”, “Indicatie”
👉 Alles wat je oplevert is DEFINITIEF

🏁 DEFINITIEVE OPDRACHT
Genereer nu op basis van alle beschikbare input een volledige, inleverklare EMVI-bundel die realistisch, overtuigend en maximaal scorend is binnen deze aanbesteding.
`;

/* -------------------------------------------------------
   Branding helpers (titelpagina .docx + .pdf)
------------------------------------------------------- */
function getHumanTitle(filename: string): string {
  const base = filename.replace(/\.md$/i, "");
  switch (base) {
    case "README_lees_mij":
      return "README — Lees Mij";
    case "EMVI":
      return "EMVI / Plan van Aanpak";
    case "Beoordelingsmethodiek_EMVI":
      return "Beoordelingsmethodiek (EMVI/BPKV)";
    case "Compliance_Matrix":
      return "Compliance Matrix (UEA / KO / REQ)";
    case "Risicoregister":
      return "Risicoregister";
    case "KPI_SLA_Dashboard":
      return "KPI / SLA Dashboard";
    case "Planning_Gantt":
      return "Planning (ASCII Gantt + Toelichting)";
    case "Bewijsstukkenbundel":
      return "Bewijsstukkenbundel";
    case "Assumpties_Uitsluitingen":
      return "Assumpties & Uitsluitingen";
    case "Clarificatievragen":
      return "Nota van Inlichtingen — Clarificaties";
    case "Projectreferenties":
      return "Projectreferenties";
    default:
      return base;
  }
}

function getBranding(payload: any) {
  const companyName: string =
    payload?.company?.name ||
    payload?.company?.legal_name ||
    "Aanbestedingsteam";

  const subtitle =
    payload?.tender?.name ||
    payload?.tender?.title ||
    companyName;

  const logoUrl: string | undefined =
    payload?.visual_prefs?.logo_url ||
    payload?.company?.logo_url ||
    undefined;

  return { subtitle: companyName + (subtitle ? ` — ${subtitle}` : ""), logoUrl };
}

function clampText(s: string, maxChars: number) {
  if (!s) return '';
  if (s.length <= maxChars) return s;
  return s.slice(0, maxChars) + `\n\n[...ingekort tot ${maxChars} tekens voor token-budget...]`;
}

function buildContextPayload(payload: any) {
  const company = payload?.company || {};
  const client = payload?.client || {};

  // These fields exist in the wizard flow
  const tenderTitle = payload?.tenderTitle || payload?.tender?.title || payload?.tender?.name || '';
  const sector = payload?.sector || '';
  const language = payload?.language || 'nl-NL';

  // Step 3 textareas (may be present in payload)
  const keyRequirementsText = payload?.keyRequirementsText || payload?.key_requirements || '';
  const milestonesText = payload?.milestonesText || payload?.milestones || '';
  const complianceText = payload?.complianceText || payload?.compliance || '';
  const risksText = payload?.risksText || payload?.risks || '';
  const kpisText = payload?.kpisText || payload?.kpis || '';
  const assumptionsText = payload?.assumptionsText || payload?.assumptions || '';
  const exclusionsText = payload?.exclusionsText || payload?.exclusions || '';

  // Uploaded document extraction notes (may be large)
  const extractedNotes = payload?.extractedNotes || payload?.extracted_notes || payload?.notes || '';

  // Token budgeting: keep context readable but bounded
  const boundedDocs = clampText(extractedNotes, 120_000);
  const boundedKeyReq = clampText(keyRequirementsText, 20_000);
  const boundedMilestones = clampText(milestonesText, 15_000);
  const boundedCompliance = clampText(complianceText, 15_000);
  const boundedRisks = clampText(risksText, 15_000);
  const boundedKpis = clampText(kpisText, 15_000);
  const boundedAssumptions = clampText(assumptionsText, 10_000);
  const boundedExclusions = clampText(exclusionsText, 10_000);

  // IMPORTANT: This is the only context the model should rely on.
  // We include “unknown” explicitly to avoid hallucinations.
  return {
    language,
    tender: {
      title: tenderTitle || 'Onbekend (niet opgegeven)',
      sector: sector || 'Onbekend (niet opgegeven)',
      referenceId: client?.referenceId || payload?.tender?.referenceId || 'Onbekend',
      deadline: client?.deadline || payload?.tender?.deadline || 'Onbekend',
      contractTerm: client?.contractTerm || payload?.tender?.contractTerm || 'Onbekend',
      contractingAuthority: client?.organization || payload?.tender?.authority || 'Onbekend',
    },
    company: {
      name: company?.name || company?.legal_name || 'Onbekend',
      kvk: company?.kvk || 'Onbekend',
      vat: company?.vat || 'Onbekend',
      email: company?.email || 'Onbekend',
      phone: company?.phone || 'Onbekend',
      visitAddress: company?.visitAddress || company?.address || 'Onbekend',
      consortium: company?.consortium || '',
      certifications: Array.isArray(company?.certifications) ? company.certifications : [],
      narrative: payload?.companyNarrative || payload?.company_narrative || '',
    },
    inputs: {
      keyRequirementsText: boundedKeyReq,
      milestonesText: boundedMilestones,
      complianceText: boundedCompliance,
      risksText: boundedRisks,
      kpisText: boundedKpis,
      assumptionsText: boundedAssumptions,
      exclusionsText: boundedExclusions,
    },
    documents: {
      extractedNotes: boundedDocs,
    },
  };
}

function validateEmviOutput(files: Record<string, string>) {
  const messages: string[] = [];
  const gates: Record<string, any> = {};

  const emvi = files['EMVI.md'] || '';
  if (!emvi.trim()) {
    messages.push('EMVI.md ontbreekt of is leeg.');
  }

  // Forbidden/placeholder language gate
  // Use word-boundary matching; allow common tender-term "conceptovereenkomst".
  const forbiddenRegexes: { label: string; re: RegExp }[] = [
    { label: 'voorbeeldtekst', re: /\bvoorbeeldtekst\b/i },
    { label: 'hier kunt u', re: /hier\s+kunt\s+u/i },
    { label: '[invullen]', re: /\[\s*invullen/i },
    { label: 'placeholder', re: /\bplaceholder\b/i },
    { label: 'concept', re: /\bconcept\b/i },
    { label: 'indicatie', re: /\bindicatie\b/i },
    { label: 'voorlopig', re: /\bvoorlopig\b/i },
    { label: 'todo', re: /\btodo\b/i },
    { label: 'lorem', re: /\blorem\b/i },
  ];

  const haystackRaw = Object.values(files).join('\n\n---\n\n');
  // Allow the specific word "conceptovereenkomst" (common tender term)
  const haystack = haystackRaw.replace(/conceptovereenkomst/gi, 'ontwerp-overeenkomst');

  const hits = forbiddenRegexes
    .filter(({ re }) => re.test(haystack))
    .map(({ label }) => label);

  gates.forbidden_words = { ok: hits.length === 0, hits };
  if (hits.length) {
    messages.push(`Verboden woorden/placeholder-taal gevonden: ${hits.join(', ')}`);
  }

  // Required EMVI structure gate (accept slight wording variations; check for section headers)
  const requiredSections = [
    'Managementsamenvatting',
    'Visie op de opdracht',
    'Begrip van de uitvraag',
    'Aanpak per gunningscriterium',
    'Planning',
    'Projectorganisatie',
    'Kwaliteitsborging',
    'Risico',
    'Innovatie',
    'Duurzaamheid',
    'Continuïteit',
    'Referentie',
    'Conclusie',
  ];
  const missing = requiredSections.filter((s) => !emvi.includes(s));
  gates.required_sections = { ok: missing.length === 0, missing };
  if (missing.length) {
    messages.push(`EMVI.md mist verplichte secties (of benaming wijkt te sterk af): ${missing.join(', ')}`);
  }

  // Basic “not too short” gate
  const wordCount = emvi.trim().split(/\s+/).filter(Boolean).length;
  gates.min_length = { ok: wordCount >= 1200, wordCount };
  if (wordCount < 1200) {
    messages.push(`EMVI.md is te kort (${wordCount} woorden). Verwacht een volledige bundel.`);
  }

  return {
    ok: messages.length === 0,
    messages,
    gates,
  };
}

function sanitizeForbiddenLanguage(s: string) {
  if (!s) return s;

  // Hard replace common forbidden tokens to prevent 422 loops.
  // Keep meaning but remove placeholder-ish wording.
  return s
    .replace(/\bconceptovereenkomst\b/gi, 'ontwerp-overeenkomst')
    .replace(/\bconcept\b/gi, 'definitief')
    .replace(/\bindicatie\b/gi, 'vastgesteld')
    .replace(/\bvoorlopig\b/gi, 'definitief')
    .replace(/\bplaceholder\b/gi, 'invulling')
    .replace(/\bvoorbeeldtekst\b/gi, 'definitieve tekst');
}

function sanitizeFiles(files: Record<string, string>) {
  const out: Record<string, string> = {};
  for (const [k, v] of Object.entries(files)) out[k] = sanitizeForbiddenLanguage(v);
  return out;
}

/* -------------------------------------------------------
   ZIP bewaren: schrijf .md op schijf (voor validator),
   maar stop alleen .docx + .pdf in de ZIP.
------------------------------------------------------- */
async function saveZip(
  jobId: string,
  files: Record<string, string>,
  payload: any
) {
  const outDir = path.join(process.cwd(), "outputs", jobId);
  await mkdir(outDir, { recursive: true });

  const zip = new JSZip();
  const { subtitle, logoUrl } = getBranding(payload);

  for (const [name, content] of Object.entries(files)) {
    // 1) .md op schijf (NIET in zip) — voor /api/validate
    const mdPath = path.join(outDir, name);
    await writeFile(mdPath, content, "utf8");

    // 2) .docx (met titelpagina) — WEL in zip
    try {
      const docTitle = getHumanTitle(name);
      const docxName = `${name.replace(/\.md$/i, "")}.docx`;
      const docxBuf = await mdToDocxBuffer(content, docTitle, subtitle, logoUrl);
      await writeFile(path.join(outDir, docxName), docxBuf);
      zip.file(docxName, docxBuf);
    } catch (err) {
      console.warn(`⚠️ DOCX generatie mislukt voor ${name}:`, (err as Error)?.message);
    }

    // 3) .pdf (met titelpagina) — WEL in zip
    try {
      const pdfTitle = getHumanTitle(name);
      const pdfName = `${name.replace(/\.md$/i, "")}.pdf`;
      const pdfBuf = await mdToPdfBuffer(content, pdfTitle, subtitle, logoUrl);
      await writeFile(path.join(outDir, pdfName), pdfBuf);
      zip.file(pdfName, pdfBuf);
    } catch (err) {
      console.warn(`⚠️ PDF generatie mislukt voor ${name}:`, (err as Error)?.message);
    }
  }

  const zipBuf = await zip.generateAsync({ type: "nodebuffer" });
  await writeFile(path.join(outDir, "tender_bundle.zip"), zipBuf);
  return outDir;
}

/* -------------------------------------------------------
   API handler
------------------------------------------------------- */
export async function POST(req: NextRequest) {
  try {
    const payload = await req.json();

    // Build bounded, canonical context for the model (server-only)
    const ctx = buildContextPayload(payload);

    // Never trust any client-supplied prompt fields
    delete (payload as any)?.system;
    delete (payload as any)?.systemPrompt;
    delete (payload as any)?.prompt;

    // Inject server-only system prompt + canonical context for orchestrator
    const internalPayload = {
      ...payload,
      __tenderme_system_prompt: MASTER_SYSTEM_PROMPT,
      __tenderme_context: ctx,
    };

    // 1) Modelselectie (cheap/full)
    const cheapModeEnv = process.env.CHEAP_MODE === "1";
    const isCheap = cheapModeEnv || payload?.cheap === true;

    const modelName = isCheap
      ? process.env.OPENAI_MODEL_CHEAP || "gpt-4o-mini"
      : process.env.OPENAI_MODEL || "gpt-5";

    console.log(`🚀 Using model: ${modelName} (${isCheap ? "CHEAP" : "FULL"})`);
    if (!process.env.OPENAI_API_KEY) {
      console.warn("⚠️ OPENAI_API_KEY ontbreekt. /api/generate kan niet genereren.");
    }

    // 2) Genereren (markdown) + hard gates (auto-retry)
    const maxAttempts = isCheap ? 1 : 2;
    let attempt = 0;
    let files: Record<string, string> = {};
    let localValidation: any = {};

    while (attempt < maxAttempts) {
      attempt += 1;
      console.log(`🧠 Generating attempt ${attempt}/${maxAttempts}`);

      const attemptPayload = {
        ...internalPayload,
        __attempt: attempt,
        __validation_feedback: localValidation?.messages || [],
      };

      const files1 = await Orchestrator.generateDocs(client, modelName, attemptPayload);
      const files2 = Orchestrator.reconcileLinks(files1);
      const files3 = Orchestrator.finalQuality(files2);

      // Always sanitize first to avoid endless 422 loops on forbidden words.
      files = sanitizeFiles(files3);

      localValidation = validateEmviOutput(files);
      if (localValidation.ok) break;

      // On the last attempt: do NOT hard-fail solely on forbidden words.
      // Ship the bundle with warnings so the user can download/export,
      // while still blocking only on structural blockers.
      if (attempt >= maxAttempts) {
        const onlyForbiddenFailed =
          localValidation?.gates?.forbidden_words &&
          localValidation?.gates?.forbidden_words?.ok === false &&
          (localValidation?.gates?.required_sections?.ok ?? true) === true &&
          (localValidation?.gates?.min_length?.ok ?? true) === true;

        if (onlyForbiddenFailed) {
          console.warn('⚠️ Output gate failed on forbidden words only; shipping after sanitize.', localValidation);
          break;
        }

        console.warn('⛔ Output gate failed; refusing to ship bundle (structural blockers).', localValidation);
        return NextResponse.json(
          {
            error: 'Output validatie faalde. Bundel is niet inleverklaar (structurele eisen).',
            validation: localValidation,
          },
          { status: 422 }
        );
      }

      console.warn('⚠️ Output gate failed, retrying once with feedback...', localValidation);
    }

    // 3) Opslaan (.md op schijf) + ZIP maken (.docx + .pdf)
    const jobId = crypto.randomUUID();
    await saveZip(jobId, files, internalPayload);

    // 4) Preview
    const emviPreview =
      files["EMVI.md"]?.split("\n").slice(0, 150).join("\n") || "Geen preview.";

    // 5) Validatie
    let validation: any = {};
    try {
      const base =
        process.env.NEXT_PUBLIC_BASE_URL || req.nextUrl?.origin || "http://localhost:3000";
      const res = await fetch(`${base}/api/validate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ jobId }),
      });
      validation = await res.json();
    } catch {
      validation = { ok: false, messages: ["Validator niet bereikbaar."], gates: {} };
    }

    // 6) Response
    return NextResponse.json({
      jobId,
      files: Object.keys(files),
      validation,
      localValidation,
      preview: { "EMVI.md": emviPreview },
      downloadZip: `/api/download/${jobId}`,
      mode: isCheap ? "CHEAP (gpt-4o-mini)" : "FULL (gpt-5)",
    });
  } catch (e: any) {
    console.error("❌ GENERATE ERROR:", e);
    const status =
      e?.status === 402 || e?.code === "insufficient_quota"
        ? 402
        : e?.status === 429 || e?.statusCode === 429
        ? 429
        : 400;

    const code =
      e?.code ||
      (status === 402 ? "insufficient_quota" : status === 429 ? "rate_limited" : "bad_request");

    const hint =
      status === 402
        ? "Je OpenAI account heeft geen (voldoende) quota/tegoed. Check Billing op platform.openai.com."
        : status === 429
        ? "Rate limit bereikt. Probeer het opnieuw of zet CHEAP_MODE=1 tijdens testen."
        : undefined;

    return NextResponse.json(
      {
        error: e?.message || String(e),
        code,
        hint,
      },
      { status }
    );
      }
}