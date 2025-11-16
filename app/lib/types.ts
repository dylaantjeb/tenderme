// app/lib/types.ts
export type GlobalContext = {
  userJson: any;
  model: string;
};

export type CrossLink = {
  w: string;          // W-xx id
  kpi?: string[];     // gekoppelde KPI's
  risks?: string[];   // gekoppelde risico's
  files?: string[];   // waar komt W-xx voor
};

export type WItem = { id: string; text: string };

export type DocSpec = {
  filename: string;                // bv. "EMVI.md"
  title: string;                   // menselijk label
  superPrompt: string;             // de specifieke prompt voor dit bestand
  linkTo?: string[];               // verwachtte kruiskoppelingen (W-xx, KPI, etc.)
  minWords?: number;               // ✅ minimum woordaantal
  minTables?: number;              // optioneel: minimaal aantal tabellen
  minLists?: number;               // optioneel: minimaal aantal opsommingen
  targetDepth?: "A" | "B" | "C";   // jouw dynamic depth
};