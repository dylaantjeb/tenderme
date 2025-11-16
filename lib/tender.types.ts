export type Milestone = { name: string; start: string; end: string; };
export type TeamRole = { role: string; name?: string; responsibilities?: string; };
export type ComplianceRow = { requirement: string; meets: "Ja"|"Nee"|"N.v.t."; notes?: string; };
export type RiskRow = { risk: string; mitigation: string; impact?: "Low"|"Med"|"High" };

export interface TenderInput {
  // Stap 1
  language: "Dutch"|"English"|"German"|"French";
  sector: string;
  tenderTitle: string;
  authority?: string;
  referenceId?: string;
  contact?: { name: string; email: string; phone?: string };

  // Stap 2
  scope: string;
  keyRequirements: string[]; // 3–5 bullets
  slaKpi?: string;

  // Stap 3
  company: {
    name: string;
    city?: string;
    kvk?: string;
    vat?: string;
    strengths: string[];       // 3 bullets
    certifications?: string[]; // ISO27001, NEN7510, WCAG, VCA, ...
  };

  // Stap 4
  methodology: "Agile"|"PRINCE2"|"Scrum"|"Hybrid";
  milestones: Milestone[];
  team: TeamRole[];

  // Pro Mode
  compliance?: ComplianceRow[];
  risks?: RiskRow[];
  references?: { client: string; year?: string; summary: string }[];
  pricing?: { model: "Fixed"|"Hourly"|"Subscription"; narrative?: string };

  // Uploads (server vult deze indien beschikbaar)
  extractedNotes?: string; // samenvatting uit uploads
}