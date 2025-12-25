// app/lib/orchestrator.ts
import OpenAI from "openai";
import { SPECS } from "./specs";
import { polishFiles } from "./polish";
import { GlobalContext } from "./types";

/* =========================
   Types & public API
========================= */

async function sleep(ms: number) {
  await new Promise((r) => setTimeout(r, ms));
}

function isInsufficientQuota(err: any) {
  return (
    err?.code === "insufficient_quota" ||
    err?.error?.code === "insufficient_quota" ||
    err?.type === "insufficient_quota"
  );
}

function isRateLimit429(err: any) {
  return (
    err?.status === 429 ||
    err?.statusCode === 429 ||
    err?.code === 429 ||
    err?.name === "RateLimitError"
  );
}

export async function callModel(
  client: OpenAI,
  model: string,
  system: string,
  user: any
): Promise<string> {
  const maxAttempts = 4;
  let attempt = 0;

  while (attempt < maxAttempts) {
    attempt += 1;

    try {
      const r = await client.chat.completions.create({
        model,
        max_completion_tokens: 16000,
        messages: [
          { role: "system", content: system },
          { role: "user", content: JSON.stringify(user) },
        ],
      });

      return r.choices?.[0]?.message?.content ?? "";
    } catch (err: any) {
      // If account has no quota/billing -> do not retry
      if (isInsufficientQuota(err)) {
        const e: any = new Error(
          "OpenAI quota/billing probleem: je OpenAI account heeft geen (voldoende) tegoed. " +
            "Ga naar platform.openai.com → Billing om een betaalmethode/tegoed in te stellen."
        );
        e.status = 402;
        e.code = "insufficient_quota";
        e.original = err;
        throw e;
      }

      // Transient 429 -> exponential backoff
      if (isRateLimit429(err) && attempt < maxAttempts) {
        const wait = Math.min(30_000, 1000 * Math.pow(2, attempt - 1)); // 1s,2s,4s,8s
        console.warn(
          `[orchestrator] 429 rate limit, retrying in ${wait}ms (attempt ${attempt}/${maxAttempts})`
        );
        await sleep(wait);
        continue;
      }

      throw err;
    }
  }

  return "";
}

export type Files = Record<string, string>;

const FALLBACK_SYSTEM = `
Je bent TenderMe. Je schrijft in professioneel EMVI-Nederlands (tenzij anders gevraagd). 
Lever uitsluitend definitieve, inleverklare teksten zonder placeholders, zonder "voorbeeld", zonder concepttaal. 
Gebruik heldere koppen en zorg voor interne consistentie.
`.trim();

/** Genereert alle documenten o.b.v. SPECS (markdown) */
export async function generateDocs(
  client: OpenAI,
  model: string,
  payload: GlobalContext
): Promise<Files> {
  const outputs: Files = {};

  for (const spec of SPECS) {
    const systemFromServer = (payload as any)?.__tenderme_system_prompt as string | undefined;
    const ctxFromServer = (payload as any)?.__tenderme_context;
    const attempt = (payload as any)?.__attempt ?? 1;
    const validationFeedback = ((payload as any)?.__validation_feedback as string[]) || [];

    const user = {
      // Canonical context (bounded + cleaned in /api/generate)
      context: ctxFromServer || payload,

      // Target spec
      target_file: spec.filename,
      target_title: spec.title,
      target_depth: spec.targetDepth,
      min_words: spec.minWords || 0,
      min_tables: spec.minTables || 0,

      // Per-file instruction
      instruction: spec.superPrompt,

      // Retry feedback (if prior attempt failed hard gates)
      attempt,
      validation_feedback: validationFeedback,

      // Output contract
      output_requirements: {
        language: (ctxFromServer?.language || payload?.language || 'nl-NL') as string,
        no_markdown_noise: true,
        no_placeholders: true,
        no_concept_language: true,
        must_be_submittable: true,
      },
    };

    const sys = `${systemFromServer || FALLBACK_SYSTEM}\n\n${spec.superPrompt}\n\n` +
      `BELANGRIJK: Gebruik uitsluitend informatie uit de meegeleverde context. ` +
      `Als iets ontbreekt, los het logisch op binnen de context zonder placeholders en zonder "hier kunt u"-taal. ` +
      `Voeg geen sectie "Benodigde input" toe.`;

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

function stripPlaceholders(s: string) {
  if (!s) return s;
  let out = s;

  // Remove explicit placeholder markers
  out = out.replace(/\[(?:TO ?FILL|TBD|XXX|PLACEHOLDER)\]/gi, "");
  out = out.replace(/lorem ipsum/gi, "");

  // Remove the legacy ending if it appears
  out = out.replace(/(^|\n)Benodigde input:\s*$/gi, "");

  // Collapse whitespace
  out = out.replace(/\n{3,}/g, "\n\n");
  return out.trim();
}

/** 👉 Publieke autofix die je in /api/generate toepast vóór zippen */
export function autoFix(files: Files): Files {
  const out: Files = { ...files };
  Object.keys(out).forEach((name) => {
    out[name] = stripPlaceholders(out[name] || "");
  });
  return out;
}