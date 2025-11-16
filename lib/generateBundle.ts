// lib/generateBundle.ts
import { randomUUID } from 'crypto';
import path from 'path';
import fs from 'fs/promises';
import zlib from 'zlib';

type ProgressFn = (pct: number, msg: string) => Promise<void> | void;

export type GeneratePayload = {
  generation_mode?: 'full_depth' | string;
  language: 'nl' | 'en' | string;
  tenderTitle: string;
  client: {
    organization: string;
    contactName?: string;
    contactEmail?: string;
    referenceId?: string;
    deadline?: string;
    contractTerm?: string;
  };
  company: {
    name: string;
    kvk?: string;
    vat?: string;
    visitAddress?: string;
    phone?: string;
    email?: string;
    consortium?: string;
    certifications?: string[];
  };
  keyRequirements?: string[];
  milestones?: Array<{ name: string; start: string; end: string; verantwoordelijke?: string; acceptatie?: string }>;
  compliance?: Array<{ requirement: string; knockout?: boolean; meets: 'Yes'|'No'|'Partial'; notes?: string; attachmentRef?: string }>;
  risks?: Array<{ risk: string; mitigation: string; probability?: string; impact?: string; owner?: string; status?: string }>;
  kpis?: Array<{ kpi: string; target: string; measure: string; frequency: string; escalation: string }>;
  assumptions?: string[];
  exclusions?: string[];
  _extracted?: any; // eventueel wat je parser al had gevonden
};

export type GenerateResult = {
  zipPath: string;                          // bv. /gen/<id>.zip (voor <a href>)
  preview: Record<string, string>;          // bv. { 'EMVI.md': '...' }
  validation: { ok: boolean; messages: string[]; gates?: Record<string, boolean> };
  score: { score: number; notes: string[] };
};

function mdEscape(s: string = '') {
  return s.replace(/\|/g, '\\|');
}

function buildEMVI(payload: GeneratePayload) {
  const p = payload;
  const L = (nl: string, en: string) => (p.language?.startsWith('nl') ? nl : en);

  const ko = (p.keyRequirements || []).filter(k => /(^|\s)KO(\s|:)|knock/i.test(k));
  const musts = (p.keyRequirements || []).filter(k => !/(^|\s)KO(\s|:)|knock/i.test(k));

  const milestonesTable = (p.milestones || []).map(m =>
    `| ${mdEscape(m.name)} | ${m.start || '-'} | ${m.end || '-'} | ${mdEscape(m.verantwoordelijke || '-')} | ${mdEscape(m.acceptatie || '-')} |`
  ).join('\n') || L('_Nog geen mijlpalen opgegeven._', '_No milestones provided._');

  const kpiTable = (p.kpis || []).map(k =>
    `| ${mdEscape(k.kpi)} | ${mdEscape(k.target)} | ${mdEscape(k.measure)} | ${mdEscape(k.frequency)} | ${mdEscape(k.escalation)} |`
  ).join('\n') || L('_Nog geen KPI’s opgegeven._', '_No KPIs provided._');

  const riskTable = (p.risks || []).map(r =>
    `| ${mdEscape(r.risk)} | ${mdEscape(r.mitigation)} | ${mdEscape(r.probability || '-')} | ${mdEscape(r.impact || '-')} | ${mdEscape(r.owner || '-')} | ${mdEscape(r.status || '-')} |`
  ).join('\n') || L('_Nog geen risico’s opgegeven._', '_No risks provided._');

  return `# ${p.tenderTitle || 'Offerte / EMVI'}

**${L('Opdrachtgever', 'Contracting authority')}:** ${p.client.organization}
${p.client.referenceId ? `**${L('Referentie', 'Reference')}:** ${p.client.referenceId}\n` : ''}${p.client.deadline ? `**${L('Inleverdatum', 'Submission date')}:** ${p.client.deadline}\n` : ''}

**${L('Inschrijver', 'Bidder')}:** ${p.company.name}
${p.company.kvk ? `**KvK:** ${p.company.kvk}\n` : ''}${p.company.vat ? `**BTW:** ${p.company.vat}\n` : ''}${p.company.visitAddress ? `**${L('Adres', 'Address')}:** ${p.company.visitAddress}\n` : ''}

---

## ${L('1. Aanpak & Scope', '1. Approach & Scope')}
${L('Wij leveren conform de scope en EMVI-methodiek (beste prijs-kwaliteit).', 'We deliver according to the scope and award method (best price-quality ratio).')}

### ${L('Knock-out eisen', 'Knock-out requirements')}
${ko.length ? ko.map(x => `- ${x}`).join('\n') : L('_Geen KO-eisen ingevuld._', '_No KO requirements provided._')}

### ${L('Vereisten', 'Requirements')}
${musts.length ? musts.map(x => `- ${x}`).join('\n') : L('_Geen overige vereisten ingevuld._', '_No other requirements provided._')}

---

## ${L('2. Planning & Mijlpalen', '2. Planning & Milestones')}
| ${L('Mijlpaal', 'Milestone')} | ${L('Start', 'Start')} | ${L('Eind', 'End')} | ${L('Verantwoordelijke', 'Owner')} | ${L('Acceptatie', 'Acceptance')} |
|---|---|---|---|---|
${milestonesTable}

---

## ${L('3. KPI’s / SLA', '3. KPIs / SLAs')}
| KPI | ${L('Doelwaarde', 'Target')} | ${L('Meting', 'Measure')} | ${L('Frequentie', 'Frequency')} | ${L('Escalatie', 'Escalation')} |
|---|---|---|---|---|
${kpiTable}

---

## ${L('4. Risico’s & Beheersmaatregelen', '4. Risks & Mitigations')}
| ${L('Risico', 'Risk')} | ${L('Maatregel', 'Mitigation')} | ${L('Kans', 'Probability')} | ${L('Impact', 'Impact')} | ${L('Eigenaar', 'Owner')} | ${L('Status', 'Status')} |
|---|---|---|---|---|---|
${riskTable}

---

## ${L('5. Aannames & Uitsluitingen', '5. Assumptions & Exclusions')}
**${L('Aannames', 'Assumptions')}**
${(p.assumptions||[]).length ? (p.assumptions||[]).map(a=>`- ${a}`).join('\n') : L('_Geen aannames opgegeven._', '_No assumptions provided._')}

**${L('Uitsluitingen', 'Exclusions')}**
${(p.exclusions||[]).length ? (p.exclusions||[]).map(e=>`- ${e}`).join('\n') : L('_Geen uitsluitingen opgegeven._', '_No exclusions provided._')}

---

## ${L('6. Organisatie & Kwaliteit', '6. Organisation & Quality')}
${L('Certificeringen', 'Certifications')}: ${(p.company.certifications||[]).join(', ') || L('n.v.t.', 'n/a')}

${L('Contactpersoon', 'Contact person')}: ${p.client.contactName || '-'} (${p.client.contactEmail || '-'})

`;
}

function simpleValidation(markdown: string, payload: GeneratePayload) {
  const messages: string[] = [];
  let ok = true;
  const gates: Record<string, boolean> = {};

  // Gate 1: KO aanwezig als user KO heeft opgegeven
  const hasKOsection = /Knock-out|Knockout|KO/i.test(markdown);
  const koGiven = (payload.keyRequirements || []).some(k => /(^|\s)KO(\s|:)|knock/i.test(k));
  gates['ko_section'] = !koGiven || hasKOsection;
  if (koGiven && !hasKOsection) { ok = false; messages.push('KO-sectie ontbreekt.'); }

  // Gate 2: Geen placeholders
  const hasPlaceholders = /\[\[.*?\]\]/.test(markdown);
  gates['no_placeholders'] = !hasPlaceholders;
  if (hasPlaceholders) { ok = false; messages.push('Er staan nog placeholders in de tekst.'); }

  // Gate 3: Basisvelden
  if (!payload.tenderTitle) { ok = false; messages.push('Titel ontbreekt.'); }
  if (!payload.client?.organization) { ok = false; messages.push('Opdrachtgever ontbreekt.'); }

  if (ok && messages.length === 0) messages.push('Validatie geslaagd.');
  return { ok, messages, gates };
}

function simpleScore(markdown: string, payload: GeneratePayload) {
  let score = 60;

  if ((payload.kpis || []).length >= 3) score += 10;
  if ((payload.risks || []).length >= 3) score += 10;
  if ((payload.milestones || []).length >= 3) score += 10;
  if ((payload.company?.certifications || []).length) score += 5;
  if ((payload.keyRequirements || []).length >= 3) score += 5;

  score = Math.max(0, Math.min(100, score));

  const notes: string[] = [];
  if ((payload.kpis || []).length < 3) notes.push('Voeg meer KPI’s toe voor een hogere score.');
  if ((payload.risks || []).length < 3) notes.push('Voeg meer risico’s + beheersmaatregelen toe.');
  if ((payload.milestones || []).length < 3) notes.push('Werk de planning uit met meerdere mijlpalen.');
  if (!(payload.company?.certifications || []).length) notes.push('Certificeringen verhogen de geloofwaardigheid.');
  if ((payload.keyRequirements || []).length < 3) notes.push('Neem meer (KO-)eisen op.');

  return { score, notes };
}

// Heel eenvoudige ZIP-writer (store) voor 1..n files (zonder dependency)
async function writeZip(files: Record<string, string>, absOutFile: string) {
  // Minimal ZIP implementatie is complex; we kiezen pragmatisch voor gz als container? Nee, moet ZIP.
  // => Gebruik Node 20: geen std ZIP. We doen een kleine fallback via `adm-zip` indien aanwezig.
  try {
    // Try dynamic import if user has adm-zip installed
    const AdmZip = (await import('adm-zip')).default;
    const zip = new AdmZip();
    for (const [name, content] of Object.entries(files)) {
      zip.addFile(name, Buffer.from(content, 'utf8'));
    }
    await fs.mkdir(path.dirname(absOutFile), { recursive: true });
    zip.writeZip(absOutFile);
    return true;
  } catch {
    // Fallback: schrijf 1 gz per bestand (niet ideaal, maar voorkomt crash)
    // Weer alsnog 1 bestand: .zip.gz (communiceer als gz)
    const concatenated = Object.entries(files)
      .map(([k, v]) => `-----FILE:${k}-----\n${v}\n`)
      .join('\n');
    const gz = zlib.gzipSync(Buffer.from(concatenated, 'utf8'));
    const gzPath = absOutFile.replace(/\.zip$/i, '.zip.gz');
    await fs.mkdir(path.dirname(gzPath), { recursive: true });
    await fs.writeFile(gzPath, gz);
    return false;
  }
}

export async function generateBundle(
  payload: GeneratePayload,
  onProgress?: ProgressFn
): Promise<GenerateResult> {
  const jobId = randomUUID();
  const pubDir = path.join(process.cwd(), 'public', 'gen');
  const outZipAbs = path.join(pubDir, `${jobId}.zip`);
  const outZipHref = `/gen/${jobId}.zip`; // voor <a href>

  const step = async (pct: number, msg: string) => { try { await onProgress?.(pct, msg); } catch {} };

  await step(6, 'Voorbereiden…');
  // 1) Bouw EMVI
  await step(18, 'EMVI opstellen…');
  const emvi = buildEMVI(payload);

  // 2) (optioneel) andere docs; voor nu minimaal
  await step(26, 'Metadata schrijven…');
  const metadata = {
    title: payload.tenderTitle,
    authority: payload.client.organization,
    reference: payload.client.referenceId ?? '',
    createdAt: new Date().toISOString(),
    language: payload.language,
    counts: {
      ko: (payload.keyRequirements || []).filter(k => /(^|\s)KO(\s|:)|knock/i.test(k)).length,
      req: (payload.keyRequirements || []).filter(k => !/(^|\s)KO(\s|:)|knock/i.test(k)).length,
      kpis: (payload.kpis || []).length,
      risks: (payload.risks || []).length,
      milestones: (payload.milestones || []).length
    }
  };

  // 3) Validatie
  await step(40, 'Validatie…');
  const validation = simpleValidation(emvi, payload);

  // 4) Score
  await step(55, 'Scoren…');
  const score = simpleScore(emvi, payload);

  // 5) ZIP maken
  await step(76, 'Bundelen (ZIP)…');
  const files: Record<string, string> = {
    'EMVI.md': emvi,
    'metadata.json': JSON.stringify(metadata, null, 2),
    // Je kunt hier later Plan-van-Aanpak.md, Risicodossier.md, KPI.md etc. bijschrijven
  };

  const okZip = await writeZip(files, outZipAbs);
  await step(92, okZip ? 'ZIP gereed…' : 'GZ fallback gereed…');

  await step(100, 'Klaar ✅');
  return {
    zipPath: okZip ? outZipHref : outZipHref.replace(/\.zip$/i, '.zip.gz'),
    preview: { 'EMVI.md': emvi },
    validation,
    score,
  };
}

export default generateBundle;