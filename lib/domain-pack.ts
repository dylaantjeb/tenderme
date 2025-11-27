// lib/domain-pack.ts
export type DomainPack = {
  name: string;
  typicalKpis: string[];
  typicalRisks: string[];
  typicalEvidence: string[];
  typicalStandards: string[];
  scopeHints: string[];
};

export function getDomainPack(sectorRaw?: string): DomainPack {
  const s = (sectorRaw || "").toLowerCase();

  const BASE: DomainPack = {
    name: "Algemeen",
    typicalKpis: [
      "Oplevering op tijd (100%)",
      "Eerste keuringen ≥ [[%]]",
      "Klanttevredenheid ≥ [[score/10]]",
      "Beschikbaarheid ≥ [[%]]",
      "Responstijd ≤ [[uren]]",
    ],
    typicalRisks: [
      "Leveringsvertraging",
      "Capaciteitskrapte",
      "Scope-ambiguïteit",
      "Niet-conforme kwaliteit",
      "Omgevingshinder",
    ],
    typicalEvidence: [
      "ISO 9001",
      "ISO 14001 / [[ANDERE NORM]]",
      "VCA/veiligheid (indien relevant)",
      "Referentieprojecten",
      "QA/ITP-proces",
    ],
    typicalStandards: ["Contract/RAW/[[CONTRACTVORM]]", "NEN/EN [[NORM]]", "AVG/Privacy (indien relevant)"],
    scopeHints: ["Werkpakketten", "Meetbare acceptatiecriteria", "Overdrachtsdossier/as-built"],
  };

  if (s.includes("ict")) {
    return {
      ...BASE,
      name: "ICT/Software",
      typicalKpis: ["Uptime ≥ [[%]]", "Incident-responstijd ≤ [[min]]", "MTTR ≤ [[uur]]", "Change-succes ≥ [[%]]", "Security patches ≤ [[dagen]]"],
      typicalRisks: ["Securitylekken", "Dataverlies", "Vendor lock-in", "Scope-creep", "Key-person dependency"],
      typicalEvidence: ["ISO 27001", "Pen-test rapport", "SLA/OLA", "Architectuurdiagrammen", "DR/BCP-plan"],
      typicalStandards: ["ISO 27001/27002", "BIO/AVG", "OWASP [[FRAMEWORK]]"],
      scopeHints: ["RACI", "Runbooks", "Change & Release"],
    };
  }
  if (s.includes("infra") || s.includes("civiel") || s.includes("bouw")) {
    return {
      ...BASE,
      name: "Infra/Civiel",
      typicalKpis: ["Oplevering per fase (100%)", "Keuring 1e keer goed ≥ [[%]]", "0 LTI", "Omgevingsklachten ≤ [[dagen]]", "Meetstaatsturing ≤ [[%]] afwijking"],
      typicalRisks: ["K&L-onverwacht", "Weersvertraging", "Vergunningen", "Kwaliteitsafkeur", "Hinder/veiligheid"],
      typicalEvidence: ["CE/DoP materiaal", "Kwaliteitsplan+ITP", "BLVC/V&G plan", "KLIC/tekeningen", "Referenties"],
      typicalStandards: ["RAW 2020/[[PARAGRAAF]]", "NEN-EN [[NORM]]"],
      scopeHints: ["Fasering", "Keurpunten", "As-built"],
    };
  }
  if (s.includes("schoonmaak") || s.includes("facilitair")) {
    return {
      ...BASE,
      name: "Schoonmaak/Facilitair",
      typicalKpis: ["Klanttevredenheid ≥ [[score]]", "Bezettingsgraad ≥ [[%]]", "Responstijd spoed ≤ [[min]]", "Audit-score ≥ [[%]]", "Ziekteverzuim ≤ [[%]]"],
      typicalRisks: ["Piekbelasting", "Personeel", "Duurzaamheidsmiddelen", "ARBO", "Scope-creep"],
      typicalEvidence: ["ISO 9001/14001", "Werkprogramma", "VOG/VCA", "Bezettingsplan", "KPI-rapportage"],
      typicalStandards: ["RIE/ARBO", "NEN 2075/[[NORM]]"],
      scopeHints: ["Werkprogramma per locatie", "Venstertijden", "SLA’s"],
    };
  }
  // voeg gemakkelijk meer sectoren toe...
  return BASE;
}