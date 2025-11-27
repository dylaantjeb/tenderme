// lib/shared.ts
export const asArr = <T>(v: any, fallback: T[] = []) => (Array.isArray(v) ? v : fallback);
export const safe = (v: any, dash = "-") =>
  v === null || v === undefined || (typeof v === "string" && v.trim() === "") ? dash : String(v);

export type TenderMeta = {
  title?: string;
  authority?: string;
  referenceId?: string;
  sector?: string;
  scope?: string;
  deadline?: string;
  contractTerm?: string;
  contact?: { name?: string; email?: string };
};

export type CompanyMeta = {
  name?: string;
  city?: string;
  strengths?: string[];
  certifications?: string[];
  team?: Array<{ role?: string; name?: string; responsibilities?: string }>;
};

export type ExtractedJson = {
  eisen?: Array<{ id?: string; tekst?: string; ko?: boolean }>;
  knockouts?: Array<{ id?: string; tekst?: string }>;
  kpi?: Array<{ kpi?: string; target?: string; measure?: string; frequency?: string; escalation?: string }>;
  planning?: Array<{ name?: string; start?: string; end?: string }>;
  team?: Array<{ role?: string; name?: string; responsibilities?: string }>;
  referenties?: Array<{ client?: string; year?: string; summary?: string }>;
  risico?: Array<{ risk?: string; probability?: string; impact?: string; mitigation?: string }>;
  open_vragen?: string[];
};

export function normalizeInput(data: any) {
  const language = data?.language || "nl-NL";
  const tender: TenderMeta = {
    title: data?.tenderTitle,
    authority: data?.client?.organization || data?.authority,
    referenceId: data?.client?.referenceId || data?.referenceId,
    sector: data?.sector,
    scope: data?.techDetails || data?.scope,
    deadline: data?.client?.deadline,
    contractTerm: data?.client?.contractTerm,
    contact: { name: data?.client?.contactName || data?.contact?.name, email: data?.client?.contactEmail || data?.contact?.email },
  };

  const company: CompanyMeta = {
    name: data?.company?.name,
    city: data?.company?.city || data?.company?.address,
    strengths: asArr<string>(data?.company?.strengths),
    certifications: asArr<string>(data?.company?.certifications),
    team: asArr<any>(data?.team),
  };

  const references = asArr<any>(data?.references);
  const pricing = {
    model: data?.pricing?.model,
    narrative: data?.pricing?.narrative || "",
  };

  const extracted: ExtractedJson = {
    eisen: asArr(data?.extracted?.eisen || data?.eisen),
    knockouts: asArr(data?.extracted?.knockouts || data?.knockouts),
    kpi: asArr(data?.extracted?.kpi || data?.kpi),
    planning: asArr(data?.extracted?.planning || data?.milestones),
    team: asArr(data?.extracted?.team || data?.team),
    referenties: asArr(data?.extracted?.referenties || references),
    risico: asArr(data?.extracted?.risico || data?.risks),
    open_vragen: asArr(data?.extracted?.open_vragen),
  };

  return { language, tender, company, references, pricing, extracted };
}