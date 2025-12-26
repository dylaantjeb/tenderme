export type TenderReadyIssue = {
  code: string;
  severity: "BLOCKER" | "WARN";
  message: string;
  hint?: string;
  locations?: string[];
};

export type TenderReadyReport = {
  score: number; // 0-100
  blockers: TenderReadyIssue[];
  warnings: TenderReadyIssue[];
};

const PLACEHOLDER_PATTERNS: RegExp[] = [
  /\bW-\w+\b/gi,                // W-xx
  /\bN\.?T\.?B\.?\b/gi,         // NTB / N.T.B.
  /\bTODO\b/gi,
  /\bTBD\b/gi,
  /\[\s*invullen\s*\]/gi,
  /\{\{\s*[^}]+\s*\}\}/g,       // {{placeholder}}
];

function findMatches(text: string, re: RegExp, max = 5): string[] {
  const matches: string[] = [];
  let m: RegExpExecArray | null;
  const r = new RegExp(re.source, re.flags.includes("g") ? re.flags : re.flags + "g");
  while ((m = r.exec(text)) && matches.length < max) matches.push(m[0]);
  return matches;
}

export function validateTenderBundle(params: {
  emviText: string;
  criteriaTitles?: string[]; // uit jouw wizard / extracted tender
  requiredSections?: string[]; // optioneel
}): TenderReadyReport {
  const { emviText, criteriaTitles = [] } = params;

  const blockers: TenderReadyIssue[] = [];
  const warnings: TenderReadyIssue[] = [];

  // 1) Placeholders
  for (const re of PLACEHOLDER_PATTERNS) {
    const hits = findMatches(emviText, re, 8);
    if (hits.length) {
      blockers.push({
        code: "PLACEHOLDER_FOUND",
        severity: "BLOCKER",
        message: `Placeholder/onjuiste invultekst gevonden: ${hits.join(", ")}`,
        hint: "Vervang placeholders door echte criteria/waarden of genereer dit hoofdstuk opnieuw met correcte input.",
      });
      break;
    }
  }

  // 2) Basis EMVI structuur (Doel → Aanpak → Meerwaarde → Meetbaar)
  const mustHave = ["Doel", "Aanpak", "Toegevoegde waarde", "Meetbaar"];
  const missing = mustHave.filter(k => !new RegExp(`\\b${k}\\b`, "i").test(emviText));
  if (missing.length) {
    blockers.push({
      code: "STRUCTURE_MISSING",
      severity: "BLOCKER",
      message: `EMVI-structuur mist onderdelen: ${missing.join(", ")}`,
      hint: "Zorg dat elk criterium minimaal Doel/Aanpak/Meerwaarde/Meetbaarheid bevat.",
    });
  }

  // 3) Coverage per criterium (als je criteria-titels hebt)
  if (criteriaTitles.length) {
    const notFound = criteriaTitles.filter(t => {
      const safe = t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      return !new RegExp(safe, "i").test(emviText);
    });
    if (notFound.length) {
      warnings.push({
        code: "CRITERIA_NOT_REFERENCED",
        severity: "WARN",
        message: `Niet alle criteria-titels komen letterlijk terug in de EMVI-tekst (${notFound.length}).`,
        hint: "Gebruik exact dezelfde titel/terminologie als in de leidraad voor scoringsherkenning.",
        locations: notFound.slice(0, 5),
      });
    }
  }

  // 4) Meetbaarheid check (minimale KPI aanwezigheid)
  const hasPercent = /(\d{1,3}(\,\d+)?\s*%)/.test(emviText);
  const hasSlaWords = /\bKPI\b|\bSLA\b|\bbeschikbaarheid\b|\bresponstijd\b|\boploss?tijd\b/i.test(emviText);
  if (!hasPercent || !hasSlaWords) {
    warnings.push({
      code: "LOW_MEASURABILITY",
      severity: "WARN",
      message: "Weinig concrete meetbaarheid/KPI’s herkend in de tekst.",
      hint: "Voeg per criterium 2–5 KPI’s toe met streefwaarde, meetmethode en rapportagefrequentie.",
    });
  }

  // Score
  let score = 100;
  score -= blockers.length * 35;
  score -= warnings.length * 10;
  score = Math.max(0, Math.min(100, score));

  return { score, blockers, warnings };
}