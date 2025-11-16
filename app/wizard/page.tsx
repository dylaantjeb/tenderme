'use client';

import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { useDropzone } from 'react-dropzone';
import {
  Upload,
  CheckCircle2,
  AlertTriangle,
  FileText,
  Building2,
  ClipboardList,
  ChevronRight,
  ChevronLeft,
  DownloadCloud,
  RefreshCcw,
} from 'lucide-react';

/* =========================================================
   Types & Schemas
   ========================================================= */

type PriceModel = 'fixed' | 'hourly' | 'subscription' | '';

type UploadMeta = { name: string; size: number };

type ComplianceRow = {
  requirement: string;
  knockout?: boolean;
  meets: 'Yes' | 'No' | 'Partial';
  notes?: string;
  attachmentRef?: string;
};

type RiskRow = {
  risk: string;
  mitigation: string;
  probability?: string;
  impact?: string;
  owner?: string;
  status?: string;
};

type KpiRow = { kpi: string; target: string; measure: string; frequency: string; escalation: string };

type Milestone = {
  name: string;
  start: string;
  end: string;
  verantwoordelijke?: string;
  acceptatie?: string;
};

const ClientSchema = z.object({
  organization: z.string().min(2, 'Organisatie is verplicht'),
  contactName: z.string().min(2, 'Contact naam is verplicht'),
  contactEmail: z.string().email('Ongeldig e-mailadres'),
  referenceId: z.string().optional(),
  deadline: z.string().min(1, 'Deadline is verplicht'),
  contractTerm: z.string().optional(),
});

const CompanySchema = z.object({
  name: z.string().min(2, 'Bedrijfsnaam is verplicht'),
  kvk: z.string().optional(),
  vat: z.string().optional(),
  visitAddress: z.string().optional(),
  phone: z.string().optional(),
  email: z.string().optional(),
  consortium: z.string().optional(),
  certifications: z.array(z.string()).default([]),
});

const WizardSchema = z.object({
  language: z.string().min(2, 'Taal is verplicht'),
  sector: z.string().min(2, 'Sector is verplicht'),
  tenderTitle: z.string().min(2, 'Titel is verplicht'),
  techDetails: z.string().min(2, 'Scope/technische details zijn verplicht'),
  companyNarrative: z.string().min(5, 'Beschrijf je bedrijf kort'),
  pricingModel: z.enum(['fixed', 'hourly', 'subscription']).or(z.literal('')).default(''),
  client: ClientSchema,
  company: CompanySchema,
});

type WizardValues = z.infer<typeof WizardSchema>;

/* =========================================================
   Helpers
   ========================================================= */

const parseList = (txt: string) => txt.split('\n').map((s) => s.trim()).filter(Boolean);

const parseMilestones = (txt: string): Milestone[] =>
  parseList(txt).map((line) => {
    const [name, start, end, verantwoordelijke, acceptatie] = line.split('|').map((s) => s?.trim());
    return {
      name: name || '-',
      start: start || '-',
      end: end || '-',
      verantwoordelijke: verantwoordelijke || 'n.v.t.',
      acceptatie: acceptatie || 'n.v.t.',
    };
  });

const parseCompliance = (txt: string): ComplianceRow[] =>
  parseList(txt).map((line) => {
    const [requirement, ko, meets, notes, attachmentRef] = line.split('|').map((s) => s?.trim());
    return {
      requirement: requirement || '-',
      knockout: /^(ja|yes|true)$/i.test(ko || ''),
      meets: (['Yes', 'No', 'Partial'].includes((meets || '').trim()) ? (meets as any) : 'Yes') as 'Yes' | 'No' | 'Partial',
      notes: notes || '',
      attachmentRef: attachmentRef || '',
    };
  });

const parseRisks = (txt: string): RiskRow[] =>
  parseList(txt).map((line) => {
    const [risk, mitigation, probability, impact, owner, status] = line.split('|').map((s) => s?.trim());
    return { risk: risk || '-', mitigation: mitigation || '-', probability, impact, owner, status };
  });

const parseKpis = (txt: string): KpiRow[] =>
  parseList(txt).map((line) => {
    const [kpi, target, measure, frequency, escalation] = line.split('|').map((s) => s?.trim());
    return { kpi: kpi || '-', target: target || '-', measure: measure || '-', frequency: frequency || '-', escalation: escalation || '-' };
  });

function useAutosave<T>(key: string, value: T, delay = 600) {
  const t = useRef<any>();
  useEffect(() => {
    clearTimeout(t.current);
    t.current = setTimeout(() => {
      localStorage.setItem(key, JSON.stringify(value));
    }, delay);
    return () => clearTimeout(t.current);
  }, [key, value, delay]);
}

function loadAutosave<T>(key: string, fallback: T): T {
  try {
    return JSON.parse(localStorage.getItem(key) || '') as T;
  } catch {
    return fallback;
  }
}

/* =========================================================
   Loading Overlay
   ========================================================= */
function LoadingOverlay({ visible, progress, text }: { visible: boolean; progress: number; text: string }) {
  if (!visible) return null;
  return (
    <div className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm flex items-center justify-center">
      <div className="bg-white dark:bg-neutral-900 shadow-2xl rounded-2xl p-8 w-[92%] max-w-md">
        <h2 className="text-lg font-semibold mb-4">Documenten worden gegenereerd…</h2>
        <div className="w-full h-3 bg-neutral-200 dark:bg-neutral-700 rounded-full overflow-hidden mb-2">
          <div
            className="h-3 bg-blue-600 transition-[width] duration-500 ease-in-out"
            style={{ width: `${Math.max(0, Math.min(progress, 100))}%` }}
          />
        </div>
        <p className="text-sm text-neutral-600 dark:text-neutral-300">{text}</p>
      </div>
    </div>
  );
}

/* =========================================================
   Step 1 — Aanbesteding upload & detectie
   ========================================================= */
function StepUpload({
  form,
  extracted,
  setExtracted,
  onNext,
  handleUpload,
  uploads,
  setValue,
  runExtract,
  loading,
}: any) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const triggerPick = () => fileInputRef.current?.click();

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      'application/pdf': ['.pdf'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
      'application/msword': ['.doc'],
    },
    multiple: true,
    onDrop: async (files) => {
      for (const f of files) await handleUpload(f);
    },
  });

  const hasRequiredBasics = Boolean(form.watch('tenderTitle') && form.watch('client.organization'));

  return (
    <section className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="h-10 w-10 rounded-full bg-blue-600 text-white flex items-center justify-center">
          <Upload size={18} />
        </div>
        <div>
          <h2 className="text-xl font-semibold">1 — Upload aanbesteding</h2>
          <p className="text-sm text-neutral-500">
            Upload eerst de aankondiging/leidraad. We vullen dan automatisch titel, opdrachtgever, deadline en sector.
          </p>
        </div>
      </div>

      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer ${
          isDragActive ? 'bg-blue-50 dark:bg-blue-950/20' : 'bg-muted/30'
        }`}
      >
        <input {...getInputProps()} />
        <p className="text-sm">Sleep PDF/DOCX hierheen of klik om te kiezen</p>
        <button type="button" className="mt-3 h-9 px-4 rounded-md border" onClick={triggerPick}>
          Kies bestand
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf,.docx,.doc"
          hidden
          onChange={async (e) => {
            const f = e.target.files?.[0];
            if (f) await handleUpload(f);
            if (e.currentTarget) e.currentTarget.value = '';
          }}
        />
      </div>

      {!!uploads?.length && (
        <div className="rounded-lg border p-4">
          <p className="text-sm font-medium mb-2">Uploads</p>
          <ul className="text-sm list-disc pl-5">
            {uploads.map((u: UploadMeta, i: number) => (
              <li key={i}>
                {u.name} <span className="opacity-60">({Math.round(u.size / 1024)} KB)</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {extracted && (
        <div className="rounded-xl border p-4 bg-background grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-xs uppercase tracking-wide text-neutral-500">Gedetecteerde titel</label>
            <input
              className="w-full h-10 border rounded-md px-3 bg-input"
              value={form.watch('tenderTitle') || ''}
              onChange={(e) => setValue('tenderTitle', e.target.value, { shouldValidate: true })}
            />
          </div>
          <div>
            <label className="text-xs uppercase tracking-wide text-neutral-500">Opdrachtgever</label>
            <input
              className="w-full h-10 border rounded-md px-3 bg-input"
              value={form.watch('client.organization') || ''}
              onChange={(e) => setValue('client.organization', e.target.value, { shouldValidate: true })}
            />
          </div>
          <div>
            <label className="text-xs uppercase tracking-wide text-neutral-500">Deadline</label>
            <input
              type="date"
              className="w-full h-10 border rounded-md px-3 bg-input"
              value={form.watch('client.deadline') || ''}
              onChange={(e) => setValue('client.deadline', e.target.value, { shouldValidate: true })}
            />
          </div>
          <div>
            <label className="text-xs uppercase tracking-wide text-neutral-500">Sector/CPV</label>
            <input
              className="w-full h-10 border rounded-md px-3 bg-input"
              value={form.watch('sector') || ''}
              onChange={(e) => setValue('sector', e.target.value, { shouldValidate: true })}
            />
          </div>
          <div className="md:col-span-2">
            <label className="text-xs uppercase tracking-wide text-neutral-500">Samenvatting (AI)</label>
            <textarea
              className="w-full min-h-[90px] border rounded-md p-3 bg-input"
              value={form.watch('techDetails') || ''}
              onChange={(e) => setValue('techDetails', e.target.value, { shouldValidate: true })}
              placeholder="Kern van de scope / technische details"
            />
          </div>
        </div>
      )}

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm">
          {hasRequiredBasics ? (
            <span className="inline-flex items-center gap-1 text-green-600">
              <CheckCircle2 size={16} /> Basis ingevuld
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 text-amber-600">
              <AlertTriangle size={16} /> Upload om te starten
            </span>
          )}
        </div>
        <button
          type="button"
          className="h-10 px-4 rounded-md bg-primary text-primary-foreground disabled:opacity-50 inline-flex items-center gap-2"
          onClick={async () => {
            await runExtract();
            onNext();
          }}
          disabled={!uploads?.length || loading}
        >
          Volgende: Bedrijfsinfo <ChevronRight size={16} />
        </button>
      </div>
    </section>
  );
}

/* =========================================================
   Step 2 — Bedrijfsgegevens
   ========================================================= */
function StepCompany({ form, setValue, onPrev, onNext }: any) {
  const errors = form.formState.errors as any;
  return (
    <section className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="h-10 w-10 rounded-full bg-blue-600 text-white flex items-center justify-center">
          <Building2 size={18} />
        </div>
        <div>
          <h2 className="text-xl font-semibold">2 — Jouw bedrijfsgegevens</h2>
          <p className="text-sm text-neutral-500">Korte basis. We gebruiken dit in alle documenten.</p>
        </div>
      </div>

      <div className="rounded-xl border p-6 bg-card grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="text-sm">Bedrijfsnaam</label>
          <input className="w-full h-10 border rounded-md px-3 bg-input" {...form.register('company.name')} placeholder="Bedrijfsnaam B.V." />
          {errors?.company?.name && <p className="text-xs text-red-500">{errors.company.name.message}</p>}
        </div>
        <div>
          <label className="text-sm">KvK-nummer</label>
          <input className="w-full h-10 border rounded-md px-3 bg-input" {...form.register('company.kvk')} placeholder="00000000" />
        </div>
        <div>
          <label className="text-sm">BTW-nummer</label>
          <input className="w-full h-10 border rounded-md px-3 bg-input" {...form.register('company.vat')} placeholder="NL000000000B01" />
        </div>
        <div>
          <label className="text-sm">Telefoon</label>
          <input className="w-full h-10 border rounded-md px-3 bg-input" {...form.register('company.phone')} placeholder="+31 ..." />
        </div>
        <div className="md:col-span-2">
          <label className="text-sm">E-mail</label>
          <input className="w-full h-10 border rounded-md px-3 bg-input" {...form.register('company.email')} placeholder="contact@bedrijf.nl" />
        </div>
        <div className="md:col-span-2">
          <label className="text-sm">Adres</label>
          <input className="w-full h-10 border rounded-md px-3 bg-input" {...form.register('company.visitAddress')} placeholder="Straat 1, 1234 AB, Plaats" />
        </div>
        <div className="md:col-span-2">
          <label className="text-sm">Consortium / partners</label>
          <input className="w-full h-10 border rounded-md px-3 bg-input" {...form.register('company.consortium')} placeholder="Partner A, Partner B…" />
        </div>
        <CertsInput
          values={(form.watch('company.certifications') as string[]) || []}
          onChange={(vals) => setValue('company.certifications', vals)}
        />
      </div>

      <div>
        <label className="text-sm">Bedrijfsomschrijving / propositie</label>
        <textarea
          className="w-full min-h-[120px] border rounded-md p-3 bg-input"
          {...form.register('companyNarrative')}
          placeholder="Kernexpertise, onderscheidend vermogen, kwaliteitssystemen… (één punt per regel kan ook)"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="text-sm">Taal</label>
          <select className="w-full h-10 border rounded-md px-3 bg-input" {...form.register('language')}>
            <option value="">Select language</option>
            <option value="nl-NL">Dutch</option>
            <option value="en-GB">English</option>
            <option value="de-DE">German</option>
            <option value="fr-FR">French</option>
          </select>
        </div>
        <div>
          <label className="text-sm">Contact naam</label>
          <input className="w-full h-10 border rounded-md px-3 bg-input" {...form.register('client.contactName')} placeholder="Naam" />
        </div>
        <div>
          <label className="text-sm">Contact e-mail</label>
          <input className="w-full h-10 border rounded-md px-3 bg-input" {...form.register('client.contactEmail')} placeholder="email@domain.nl" />
        </div>
      </div>

      <div className="flex items-center justify-between">
        <button type="button" className="h-10 px-4 rounded-md border inline-flex items-center gap-2" onClick={onPrev}>
          <ChevronLeft size={16} /> Terug
        </button>
        <button
          type="button"
          className="h-10 px-4 rounded-md bg-primary text-primary-foreground inline-flex items-center gap-2"
          onClick={onNext}
        >
          Volgende: Details <ChevronRight size={16} />
        </button>
      </div>
    </section>
  );
}

/* =========================================================
   Step 3 — Details (Tabs)
   ========================================================= */
function StepDetails({
  form,
  keyRequirementsText,
  setKeyRequirementsText,
  milestonesText,
  setMilestonesText,
  complianceText,
  setComplianceText,
  risksText,
  setRisksText,
  kpisText,
  setKpisText,
  assumptionsText,
  setAssumptionsText,
  exclusionsText,
  setExclusionsText,
  onPrev,
  onGenerate,
  canGenerate,
}: any) {
  const [tab, setTab] = useState<'eisen' | 'compliance' | 'risico'>('eisen');

  return (
    <section className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="h-10 w-10 rounded-full bg-blue-600 text-white flex items-center justify-center">
          <ClipboardList size={18} />
        </div>
        <div>
          <h2 className="text-xl font-semibold">3 — Details & eisen</h2>
          <p className="text-sm text-neutral-500">Laat AI automatisch invullen en werk bij waar nodig. Zo is de generatie compleet.</p>
        </div>
      </div>

      <div className="inline-flex rounded-lg border overflow-hidden">
        <button className={`px-4 h-10 ${tab === 'eisen' ? 'bg-primary text-primary-foreground' : ''}`} onClick={() => setTab('eisen')}>
          Eisen & planning
        </button>
        <button
          className={`px-4 h-10 ${tab === 'compliance' ? 'bg-primary text-primary-foreground' : ''}`}
          onClick={() => setTab('compliance')}
        >
          Compliance & KPI
        </button>
        <button className={`px-4 h-10 ${tab === 'risico' ? 'bg-primary text-primary-foreground' : ''}`} onClick={() => setTab('risico')}>
          Risico’s & aannames
        </button>
      </div>

      {tab === 'eisen' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="text-sm">
              Belangrijke eisen (één per regel) <span className="opacity-60">Tip: zet KO-vereisten als “KO: …”</span>
            </label>
            <textarea
              className="w-full min-h-[140px] border rounded-md p-3 bg-input"
              value={keyRequirementsText}
              onChange={(e) => setKeyRequirementsText(e.target.value)}
              placeholder={'Voorbeeld:\nKO: ISO 22000 (geldig)\nResponstijd < 24 uur\nPersoneel spreekt NL op B1'}
            />
          </div>
          <div>
            <label className="text-sm">Planning / Milestones (Naam | Start | Einde | Verantwoordelijke | Acceptatie)</label>
            <textarea
              className="w-full min-h-[140px] border rounded-md p-3 bg-input"
              value={milestonesText}
              onChange={(e) => setMilestonesText(e.target.value)}
              placeholder={'Kick-off | 2026-01-05 | 2026-01-05 | PM | Opdrachtgever'}
            />
          </div>
          <div>
            <label className="text-sm">Prijsmodel</label>
            <select
              className="w-full h-10 border rounded-md px-3 bg-input"
              value={form.watch('pricingModel')}
              onChange={(e) => form.setValue('pricingModel', e.target.value as PriceModel)}
            >
              <option value="">Kies…</option>
              <option value="fixed">Fixed price</option>
              <option value="hourly">Uurtarief</option>
              <option value="subscription">Abonnement</option>
            </select>
          </div>
        </div>
      )}

      {tab === 'compliance' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="text-sm">Compliance (req | KO ja/nee | meets Yes/No/Partial | notes | attachment)</label>
            <textarea
              className="w-full min-h-[160px] border rounded-md p-3 bg-input"
              value={complianceText}
              onChange={(e) => setComplianceText(e.target.value)}
              placeholder={'ISO 9001 | ja | Yes | Certificaat NL-12345 | Bijlage A'}
            />
          </div>
          <div>
            <label className="text-sm">KPI/SLA (kpi | target | measure | frequency | escalation)</label>
            <textarea
              className="w-full min-h-[160px] border rounded-md p-3 bg-input"
              value={kpisText}
              onChange={(e) => setKpisText(e.target.value)}
              placeholder={'Klanttevredenheid | ≥ 8,2 | Enquêtes | Kwartaal | Escalatie naar directie < 7,8'}
            />
          </div>
        </div>
      )}

      {tab === 'risico' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="text-sm">Risico’s (risk | mitigation | probability | impact | owner | status)</label>
            <textarea
              className="w-full min-h-[160px] border rounded-md p-3 bg-input"
              value={risksText}
              onChange={(e) => setRisksText(e.target.value)}
              placeholder={'Ziekte-uitval | Flexpool inzet | Middel | Middel | PL | Open'}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
            <div>
              <label className="text-sm">Aannames (één per regel)</label>
              <textarea
                className="w-full min-h-[70px] border rounded-md p-3 bg-input"
                value={assumptionsText}
                onChange={(e) => setAssumptionsText(e.target.value)}
                placeholder={'Locaties toegankelijk binnen venster…'}
              />
            </div>
            <div>
              <label className="text-sm">Uitsluitingen (één per regel)</label>
              <textarea
                className="w-full min-h-[70px] border rounded-md p-3 bg-input"
                value={exclusionsText}
                onChange={(e) => setExclusionsText(e.target.value)}
                placeholder={'Applicatieontwikkeling valt buiten scope…'}
              />
            </div>
          </div>
        </div>
      )}

      <div className="flex items-center justify-between">
        <button type="button" className="h-10 px-4 rounded-md border inline-flex items-center gap-2" onClick={onPrev}>
          <ChevronLeft size={16} /> Terug
        </button>
        <button
          type="button"
          className="h-10 px-4 rounded-md bg-primary text-primary-foreground disabled:opacity-50 inline-flex items-center gap-2"
          onClick={onGenerate}
          disabled={!canGenerate}
        >
          Genereer bundel <DownloadCloud size={16} />
        </button>
      </div>
    </section>
  );
}

/* =========================================================
   Certs subcomponent
   ========================================================= */
function CertsInput({ values, onChange }: { values: string[]; onChange: (v: string[]) => void }) {
  const [certInput, setCertInput] = useState('');
  const add = () => {
    if (!certInput.trim()) return;
    onChange([...(values || []), certInput.trim()]);
    setCertInput('');
  };
  const remove = (i: number) => onChange(values.filter((_, idx) => idx !== i));
  return (
    <div className="md:col-span-2">
      <label className="text-sm">Certificeringen</label>
      <div className="flex gap-2 mt-2">
        <input
          className="flex-1 h-10 border rounded-md px-3 bg-input"
          value={certInput}
          onChange={(e) => setCertInput(e.target.value)}
          placeholder="bijv. ISO 9001, ISO 27001"
        />
        <button className="h-10 px-3 rounded-md bg-primary text-primary-foreground" type="button" onClick={add}>
          Voeg toe
        </button>
      </div>
      {!!values?.length && (
        <ul className="mt-3 text-sm flex flex-wrap gap-2">
          {values.map((c, i) => (
            <li key={i} className="px-2 py-1 rounded border inline-flex items-center gap-2">
              <span>{c}</span>
              <button type="button" className="text-xs opacity-70 underline" onClick={() => remove(i)}>
                verwijder
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

/* =========================================================
   Main — Wizard v2 (background jobs)
   ========================================================= */
export default function WizardV2Page() {
  const router = useRouter();

  const [step, setStep] = useState<number>(1); // 1 Upload → 2 Company → 3 Details → 4 Review

  // UI state
  const [uploads, setUploads] = useState<UploadMeta[]>([]);
  const [extractedNotes, setExtractedNotes] = useState<string>('');
  const [extracted, setExtracted] = useState<any | null>(null);
  const [coverage, setCoverage] =
    useState<{ ko: [number, number]; req: [number, number]; kpi: [number, number] } | null>(null);

  // Text model states
  const [keyRequirementsText, setKeyRequirementsText] = useState('');
  const [milestonesText, setMilestonesText] = useState('');
  const [complianceText, setComplianceText] = useState('');
  const [risksText, setRisksText] = useState('');
  const [kpisText, setKpisText] = useState('');
  const [assumptionsText, setAssumptionsText] = useState('');
  const [exclusionsText, setExclusionsText] = useState('');

  // Generation state (only for short overlays, not long-running)
  const [loading, setLoading] = useState(false);
  const [loadingVisible, setLoadingVisible] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [loadingStepText, setLoadingStepText] = useState('');
  const [error, setError] = useState<string | null>(null);

  // Legacy preview state (blijft beschikbaar voor demo)
  const [result, setResult] = useState<string | null>(null);
  const [downloadUrl, setDownloadUrl] = useState<string>('');
  const [validation, setValidation] =
    useState<null | { ok: boolean; messages: string[]; gates?: Record<string, boolean> }>(null);
  const [score, setScore] = useState<{ score: number; notes: string[] } | null>(null);

  // Form
  const saved = loadAutosave<Partial<WizardValues & { pricingModel: PriceModel }>>('wizard-values-v2', {
    language: '',
    sector: '',
    tenderTitle: '',
    techDetails: '',
    companyNarrative: '',
    pricingModel: '',
    client: { organization: '', contactName: '', contactEmail: '', referenceId: '', deadline: '', contractTerm: '' },
    company: { name: '', kvk: '', vat: '', visitAddress: '', phone: '', email: '', consortium: '', certifications: [] },
  });

  const form = useForm<WizardValues>({ resolver: zodResolver(WizardSchema), mode: 'onChange', defaultValues: saved as any });
  const { setValue, watch } = form;
  useAutosave('wizard-values-v2', watch());

  const canGenerate = useMemo(() => {
    const f = watch();
    return !!f.language && !!f.tenderTitle && !!f.company?.name && !!f.client?.organization && !!f.pricingModel;
  }, [watch]);

  const progressPct = useMemo(() => Math.round(((step - 1) / 3) * 100), [step]);

  const setProgress = (pct: number, text: string) => {
    setLoadingProgress(pct);
    setLoadingStepText(text);
  };

  // Upload handler
  const handleUpload = useCallback(
    async (file: File) => {
      setError(null);
      try {
        const fd = new FormData();
        fd.append('file', file);
        const res = await fetch('/api/upload', { method: 'POST', body: fd });
        const data = await res.json();
        if (!res.ok || data?.error) throw new Error(data?.error || 'Upload failed');
        setUploads((u) => [...u, { name: file.name, size: file.size }]);
        const text = data?.extractedText || data?.notes || '';
        if (text) setExtractedNotes((prev) => (prev ? `${prev}\n\n---\n\n${file.name}\n\n${text}` : `${file.name}\n\n${text}`));
        if (data?.structured) {
          setExtracted(data.structured);
          const s = data.structured as {
            title?: string;
            cpv?: string;
            authority?: string;
            referenceId?: string;
            deadlines?: { description: string; date: string }[];
          };
          const current = watch();
          if (!current.tenderTitle && s.title) setValue('tenderTitle', s.title, { shouldValidate: true, shouldDirty: true });
          if (!current.sector && s.cpv) setValue('sector', `CPV ${s.cpv}`, { shouldValidate: true, shouldDirty: true });
          setValue(
            'client',
            {
              ...current.client,
              organization: current.client?.organization || s.authority || '',
              referenceId: current.client?.referenceId || s.referenceId || '',
              deadline: current.client?.deadline || (s.deadlines?.[0]?.date ?? current.client?.deadline) || '',
              contactName: current.client?.contactName || '',
              contactEmail: current.client?.contactEmail || '',
            },
            { shouldValidate: true, shouldDirty: true },
          );
        }
      } catch (e: any) {
        setError(e.message || 'Upload failed');
      }
    },
    [setValue, watch],
  );

  // Extract — compute coverage and store canonical extracted
  async function runExtract() {
    try {
      const keyRequirements = parseList(keyRequirementsText);
      const milestones = parseMilestones(milestonesText || '');
      const compliance = parseCompliance(complianceText || '');
      const risks = parseRisks(risksText || '');
      const kpis = parseKpis(kpisText || '');
      const f = watch();

      const payload = {
        language: f.language || 'nl-NL',
        sector: f.sector,
        tenderTitle: f.tenderTitle,
        techDetails: f.techDetails,
        companyNarrative: f.companyNarrative,
        pricing: { model: f.pricingModel, narrative: '' },
        client: f.client,
        company: f.company,
        references: [],
        team: [],
        extractedNotes,
        keyRequirements,
        milestones,
        compliance,
        risks,
        kpis,
      };

      const res = await fetch('/api/extract', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const j = await res.json().catch(() => ({}));
        throw new Error(j?.error || 'Extract failed');
      }
      const j = await res.json();
      setExtracted(j.extracted);
      const koTotal = (j.extracted.knockouts || []).length;
      const reqTotal = (j.extracted.eisen || []).length;
      const kpiTotal = (j.extracted.kpi || []).length;
      setCoverage({ ko: [koTotal, koTotal], req: [reqTotal, reqTotal], kpi: [kpiTotal, kpiTotal] });
      return j;
    } catch (e) {
      console.error(e);
      return null;
    }
  }

  /* =======================================================
     Generate → start background job + redirect
     ======================================================= */
  const generate = useCallback(async () => {
    try {
      setError(null);

      // optioneel korte overlay voor "aanvraag gestart"
      setLoadingVisible(true);
      setProgress(10, 'Aanvraag wordt gestart…');

      // Bouw payload
      const keyRequirements = parseList(keyRequirementsText);
      const milestones = parseMilestones(milestonesText || '');
      const compliance = parseCompliance(complianceText || '');
      const risks = parseRisks(risksText || '');
      const kpis = parseKpis(kpisText || '');
      const assumptions = parseList(assumptionsText || '');
      const exclusions = parseList(exclusionsText || '');
      const f = watch();

      const payload = {
        generation_mode: 'full_depth',
        language: (f.language || 'nl').startsWith('nl') ? 'nl' : 'en',
        tenderTitle: f.tenderTitle,
        client: f.client,
        company: f.company,
        keyRequirements,
        milestones,
        compliance,
        risks,
        kpis,
        assumptions,
        exclusions,
      };

      // Start job
      const res = await fetch('/api/generations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error('Aanmaken generatie mislukt');
      const { id } = await res.json();

      // Sluit overlay en navigeer naar detail (progress-pagina)
      setLoadingVisible(false);
      router.push(`/generations/${id}`);
    } catch (e: any) {
      setLoadingVisible(false);
      setError(e.message || 'Genereren starten mislukt');
    }
  }, [
    assumptionsText,
    complianceText,
    exclusionsText,
    keyRequirementsText,
    kpisText,
    milestonesText,
    risksText,
    router,
    watch,
  ]);

  const copyToClipboard = async () => {
    if (!result) return;
    await navigator.clipboard.writeText(result);
    alert('Gekopieerd naar klembord ✅');
  };

  const exportDocx = async () => {
    if (!result) return;
    try {
      const res = await fetch('/api/export-docx', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ markdown: result, fileName: watch().tenderTitle || 'tender' }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.error || 'Export failed');
      }
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${(watch().tenderTitle || 'tender').replace(/\s+/g, '_')}.docx`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    } catch (e: any) {
      alert(e.message || 'Export failed');
    }
  };

  // Demo autofill via ?demo=1
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      if (url.searchParams.get('demo') === '1') {
        setValue('language', 'nl-NL');
        setValue('sector', 'Catering / bedrijfslunch');
        setValue('tenderTitle', 'Raamovereenkomst Duurzame Catering 2026–2030');
        setValue(
          'client',
          {
            organization: 'Gemeente Amsterdam',
            contactName: 'Laura van Dijk',
            contactEmail: 'aanbestedingen@amsterdam.nl',
            referenceId: 'GEM-AMS-2026-014',
            deadline: '2026-01-20',
            contractTerm: '4 + 2 jaar',
          } as any,
        );
        setValue('company', { name: 'Caternext B.V.', certifications: ['ISO 22000'] } as any);
        setStep(2);
      }
    }
  }, [setValue]);

  return (
    <div className="min-h-screen bg-background">
      <LoadingOverlay visible={loadingVisible} progress={loadingProgress} text={loadingStepText} />

      {/* Topbar */}
      <nav className="sticky top-0 z-40 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
        <div className="container mx-auto px-4 h-14 flex items-center justify-between">
          <a href="/" className="font-bold text-lg inline-flex items-center gap-2">
            <FileText size={18} /> TenderAI
          </a>
          {coverage && (
            <div className="hidden sm:flex gap-2 text-xs">
              <span className="px-2 py-1 rounded border">KO {coverage.ko[0]}/{coverage.ko[1]}</span>
              <span className="px-2 py-1 rounded border">REQ {coverage.req[0]}/{coverage.req[1]}</span>
              <span className="px-2 py-1 rounded border">KPI {coverage.kpi[0]}/{coverage.kpi[1]}</span>
            </div>
          )}
        </div>
      </nav>

      <main className="container mx-auto px-4 py-8 max-w-5xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold">AI Tender Assistent</h1>
          <p className="text-muted-foreground">Upload → Bevestig → Details → ✅ ZIP</p>
        </div>

        {/* Progress */}
        <div className="mb-6">
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>Fase {step} van 4</span>
            <span>{Math.max(0, progressPct)}% voltooid</span>
          </div>
          <div className="w-full h-2 bg-primary/20 rounded-full overflow-hidden mt-2">
            <div className="h-full bg-primary transition-all" style={{ width: `${Math.max(0, progressPct)}%` }} />
          </div>
        </div>

        {/* Card */}
        <div className="rounded-2xl border shadow-sm bg-card p-6 space-y-6">
          {step === 1 && (
            <StepUpload
              form={form}
              extracted={extracted}
              setExtracted={setExtracted}
              onNext={() => setStep(2)}
              handleUpload={handleUpload}
              uploads={uploads}
              setValue={setValue}
              runExtract={async () => {
                setLoadingVisible(true);
                setProgress(8, 'Analyseren (extract)…');
                await runExtract();
                setProgress(100, 'Gereed');
                setTimeout(() => setLoadingVisible(false), 400);
              }}
              loading={loading}
            />
          )}

          {step === 2 && <StepCompany form={form} setValue={setValue} onPrev={() => setStep(1)} onNext={() => setStep(3)} />}

          {step === 3 && (
            <StepDetails
              form={form}
              keyRequirementsText={keyRequirementsText}
              setKeyRequirementsText={setKeyRequirementsText}
              milestonesText={milestonesText}
              setMilestonesText={setMilestonesText}
              complianceText={complianceText}
              setComplianceText={setComplianceText}
              risksText={risksText}
              setRisksText={setRisksText}
              kpisText={kpisText}
              setKpisText={setKpisText}
              assumptionsText={assumptionsText}
              setAssumptionsText={setAssumptionsText}
              exclusionsText={exclusionsText}
              setExclusionsText={setExclusionsText}
              onPrev={() => setStep(2)}
              onGenerate={generate}
              canGenerate={canGenerate}
            />
          )}

          {/* Stap 4 is voor legacy inline-generatie; kun je laten staan voor demo */}
          {step === 4 && (
            <section className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-green-600 text-white flex items-center justify-center">
                  <CheckCircle2 size={18} />
                </div>
                <div>
                  <h2 className="text-xl font-semibold">Review & Download</h2>
                  <p className="text-sm text-neutral-500">Bekijk de validatie, score en download de bundel.</p>
                </div>
              </div>

              {error && <div className="p-3 rounded-md bg-red-100 text-red-700">{error}</div>}

              {validation && (
                <div className="rounded-md border p-4">
                  <h3 className="font-medium mb-2">Validatie</h3>
                  <ul className="text-sm list-disc pl-5 space-y-1">
                    {validation.messages.map((m, i) => (
                      <li key={i} className={validation.ok ? 'text-green-700' : 'text-red-600'}>
                        {m}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {score && (
                <div className="rounded-md border p-4">
                  <h3 className="font-medium mb-2">Kwaliteitsscore</h3>
                  <p className="text-2xl font-semibold">{score.score}/100</p>
                  <ul className="text-sm list-disc pl-5 space-y-1 mt-2">
                    {score.notes.map((n, i) => (
                      <li key={i}>{n}</li>
                    ))}
                  </ul>
                </div>
              )}

              {result && (
                <div className="rounded-md border p-4 bg-neutral-50">
                  <h3 className="font-medium mb-2">EMVI Preview</h3>
                  <div className="prose prose-sm max-w-none">
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>{result}</ReactMarkdown>
                  </div>
                </div>
              )}

              <div className="flex flex-wrap gap-3">
                {downloadUrl && (
                  <a href={downloadUrl} className="h-10 px-4 rounded-md bg-primary text-primary-foreground inline-flex items-center gap-2">
                    <DownloadCloud size={16} /> Download ZIP
                  </a>
                )}
                {result && (
                  <>
                    <button type="button" className="h-10 px-4 rounded-md border inline-flex items-center gap-2" onClick={copyToClipboard}>
                      <ClipboardList size={16} /> Kopieer tekst
                    </button>
                    <button type="button" className="h-10 px-4 rounded-md border inline-flex items-center gap-2" onClick={exportDocx}>
                      <FileText size={16} /> Exporteer DOCX
                    </button>
                  </>
                )}
                <button type="button" className="h-10 px-4 rounded-md bg-blue-600 text-white inline-flex items-center gap-2" onClick={() => setStep(1)}>
                  <RefreshCcw size={16} /> Nieuwe aanbesteding
                </button>
              </div>
            </section>
          )}
        </div>
      </main>
    </div>
  );
}