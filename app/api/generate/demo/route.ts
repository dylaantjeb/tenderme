import { NextResponse } from "next/server";

const DEMO_PAYLOAD = {
  generation_mode: "propose",
  language: "nl-NL",
  tender: {
    title: "Onderhoud en verduurzaming gemeentelijke wegen 2025–2029",
    reference: "UTR-MAINT-2025-041",
    contracting_authority: "Gemeente Utrecht",
    country: "NL",
    sector: "Civiele techniek / infrastructuur",
    scope_summary:
      "Preventief en correctief onderhoud aan asfalt- en klinkerverhardingen binnen de gemeente. Omvat inspectie, herstel, herprofilering, voegvulling, markering en winterdienst. Inclusief CO₂-reductieplan, emissiearm materieel, en verkeersveiligheidsmaatregelen. Digitale oplevering via het gemeentelijk GIS-portaal.",
    contract_type: "werken",
    award_method: "EMVI",
    award_criteria: [
      { name: "Kwaliteit", weight_pct: 40, what_good_looks_like: "Concreet plan van aanpak met PDCA-cyclus en kwaliteitsborging." },
      { name: "Duurzaamheid", weight_pct: 20, what_good_looks_like: "CO₂-reductie, emissiearm materieel en circulaire materialen." },
      { name: "Risicobeheersing", weight_pct: 20, what_good_looks_like: "Proactieve identificatie en beheersmaatregelen per risico." },
      { name: "Prijs", weight_pct: 20, what_good_looks_like: "Kostenefficiënt zonder kwaliteitsverlies." }
    ],
    requirements: {
      knockouts: ["ISO 9001", "ISO 14001"],
      musts: ["24/7 storingsdienst <2u", "Gebruik emissiearm materieel", "Digitale weekrapportages"],
      deliverables: ["Plan van Aanpak", "Risicodossier", "KPI-overzicht"],
      deadlines: { submission: "2025-12-01", execution_window: "2025–2029" }
    },
    site_constraints: ["toegankelijkheid", "milieunormen"],
    sla_definitions: [
      { name: "Klanttevredenheid", target: "≥ 8,0" },
      { name: "Responstijd storingen", target: "≤ 2 uur" },
      { name: "Opleveringen binnen planning", target: "≥ 95%" },
      { name: "CO₂-reductie t.o.v. referentie", target: "≥ 15%" },
      { name: "Ongevallen", target: "0" }
    ]
  },
  company: {
    name: "InfraTech Solutions B.V.",
    kvk: "78213456",
    vat: "NL782134567B01",
    hq_address: "Reactorweg 14, 3542 AD Utrecht",
    contacts: [
      {
        name: "Sanne de Groot",
        role: "Contractmanager Gemeente Utrecht",
        email: "sanne.degroot@utrecht.nl",
        phone: "+31 30 456 7890"
      }
    ],
    sector: "Civiele techniek",
    description: "InfraTech Solutions B.V. is een gecertificeerd GWW-aannemer met meer dan 20 jaar ervaring in onderhoud van infrastructuur.",
    capabilities: ["AI-ondersteunde planning", "CO₂-bewuste uitvoering", "24/7 onderhoudsdienst"],
    certs: ["ISO 9001", "ISO 14001", "VCA**", "CO₂-prestatieladder niveau 4"],
    co2_performance: "niveau 4",
    equipment: ["Emissiearme asfaltmachines", "Elektrische walsen", "Meetvoertuigen met sensoren"],
    key_staff: [
      { name: "Jan Peters", role: "Projectleider", quals: "Civiel Ingenieur", years_exp: 15 },
      { name: "Lisa Vermeer", role: "Duurzaamheidsmanager", quals: "MSc Environmental Engineering", years_exp: 8 }
    ],
    partners: ["EcoDrain Partners", "CleanRoads NL"],
    unique_strengths: ["Eigen materieel", "Snelle responstijden", "Datagedreven onderhoud"],
    references: [
      {
        client: "Gemeente Amersfoort",
        project: "Herinrichting stadswegen 2023",
        period: "2023–2024",
        scope: "Vervanging asfalt en rioolputten, onderhoud fietspaden",
        kpis: { tevredenheid: "8,4", planning: "100%", kwaliteit: "99%" },
        contact_permission: true
      },
      {
        client: "Provincie Utrecht",
        project: "Onderhoud N237",
        period: "2022–2023",
        scope: "Asfaltvervanging en bermversteviging",
        kpis: { tevredenheid: "8,1", planning: "97%", kwaliteit: "98%" },
        contact_permission: true
      }
    ]
  },
  assumptions_policy: {
    pricing_locked: true,
    dependencies_on_client: ["Tijdige vergunningverlening", "Vrije toegang werkterreinen"],
    warranty: "12 maanden"
  },
  visual_prefs: { tables: true, simple_gantt: true, max_pages_emvi: 6 }
};

export async function GET() {
  const origin = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
  const res = await fetch(`${origin}/api/generate`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(DEMO_PAYLOAD)
  });
  const data = await res.json();
  return NextResponse.json(data, { status: res.status });
}