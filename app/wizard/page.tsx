'use client';

import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
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

type KpiRow = {
  kpi: string;
  target: string;
  measure: string;
  frequency: string;
  escalation: string;
};

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

const parseList = (txt: string) =>
  txt
    .split('\n')
    .map((s) => s.trim())
    .filter(Boolean);

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
    return {
      kpi: kpi || '-',
      target: target || '-',
      measure: measure || '-',
      frequency: frequency || '-',
      escalation: escalation || '-',
    };
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

async function postJson<T = any>(url: string, payload: any): Promise<T> {
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    let msg = `${res.status} ${res.statusText}`;
    try {
      const j = await res.json();
      if (j?.error) msg = j.error;
    } catch {}
    throw new Error(`Request failed: ${url} → ${msg}`);
  }
  return (await res.json()) as T;
}

/* =========================================================
   Defaults voor fase 3
   ========================================================= */

const DEFAULT_KEY_REQUIREMENTS = `KO: ISO 27001 gecertificeerd
KO: ISO 9001 gecertificeerd
KO: 24/7 bereikbaarheidsdienst
Maximale responstijd P1-incidenten: 30 minuten
Beschikbaarheid: 99,8% per maand
Monitoring & patchmanagement volledig geborgd
ITIL-gebaseerde servicedeskprocessen
Alle data wordt binnen de EU verwerkt
Escalatieprocedure voor incidenten & changes
Continuïteitsplan (BCP) beschikbaar
Personeel beschikt over VOG indien vereist
Proactieve monitoring van netwerk & endpoints
Ondersteuning Microsoft 365 omgeving`;

const DEFAULT_MILESTONES = `Kick-off | 2026-01-05 | 2026-01-05 | Projectmanager Leverancier | Opdrachtgever
Inventarisatiefase | 2026-01-06 | 2026-01-20 | Technisch Consultant | Opdrachtgever
Migratievoorbereiding | 2026-01-21 | 2026-02-05 | Architect | Opdrachtgever
Migratie & overdracht beheer | 2026-02-06 | 2026-02-20 | Migratieteam | Opdrachtgever
Stabilisatiefase | 2026-02-21 | 2026-03-10 | Service Manager | Opdrachtgever
Eerste maandrapportage | 2026-04-01 | 2026-04-01 | Service Manager | Opdrachtgever`;

const DEFAULT_COMPLIANCE = `ISO 27001 | true | Yes | Informatiebeveiliging gecertificeerd
ISO 9001 | true | Yes | Kwaliteitsmanagement geborgd
AVG-compliance | true | Yes | Data uitsluitend in EU, DPIA beschikbaar
ITIL-processen v4 | false | Yes | Incident, problem & change management ingericht
24/7 monitoring | false | Yes | Realtime monitoring via RMM/EDR
Disaster Recovery Plan | false | Yes | Jaarlijks getest en geverifieerd
Continuity Management (BCP) | false | Yes | Continuïteitsplan aanwezig
VOG medewerkers | false | Yes | Beschikbaar op verzoek`;

const DEFAULT_KPIS = `Beschikbaarheid kritieke systemen | 99,8% | Uptime monitoring | Maandelijks | Contractmanager
Responstijd P1 incidenten | < 30 min | Servicedesk-registratie | Maandelijks | IT-manager
Oplostijd P1 incidenten | < 4 uur | Incidentanalyse | Maandelijks | Directie leverancier
First Time Fix | ≥ 70% | Servicedesk KPI | Maandelijks | Service Manager
Patch compliance | 95% binnen 30 dagen | Patchrapportages | Maandelijks | Security Officer
Klanttevredenheid | ≥ 8,0 | KTO enquête | Kwartaal | Directie
Rapportage op tijd geleverd | 100% | Rapportagecontrole | Maandelijks | Contractmanager
Security-incidenten | 0 kritieke p/m | SIEM-monitoring | Maandelijks | CISO`;

const DEFAULT_RISKS = `Ziekte/uitval IT-beheerder | Back-up engineers beschikbaar | Middel | Middel | HR/Servicemanager | Open
Cyberaanval op klantomgeving | EDR, MFA, monitoring, hardening | Middel | Hoog | Security Officer | Beheerst
Verouderde hardware bij start | Gefaseerde migratie of vervanging | Laag | Middel | Projectmanager | Open
Afhankelijkheid derde leveranciers | Contractuele afspraken & escalaties | Middel | Middel | Inkoop | Open
Capaciteitsproblemen servicedesk | Flexibele opschaling | Middel | Hoog | Service Manager | Open
Onvoldoende documentatie | Inventarisatiefase + technische documentatie vastleggen | Middel | Middel | Projectmanager | Open`;

const DEFAULT_ASSUMPTIONS = `Opdrachtgever levert tijdig benodigde toegangen en informatie aan
Alle betrokken locaties zijn binnen reguliere kantoortijden toegankelijk
Besluitvorming door opdrachtgever vindt plaats binnen afgesproken termijnen
Internet- en netwerkverbindingen op locatie voldoen aan minimale eisen
Licenties voor Microsoft 365 en overige pakketten zijn rechtmatig verkregen`;

const DEFAULT_EXCLUSIONS = `Levering en beheer van onsite hardware valt buiten scope tenzij expliciet overeengekomen
Third-party SaaS- en applicatiesupport valt buiten directe verantwoordelijkheid
Projecten buiten reguliere beheerwerkzaamheden vallen niet onder het vaste maandtarief
Onvoorziene meerwerkzaamheden worden apart geoffreerd
Adoptie- en trainingsprogramma’s voor eindgebruikers uitsluitend op verzoek`;

/* =========================================================
   Tiny Apple-style UI helpers
   ========================================================= */

function AppleCard({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={`rounded-3xl border border-slate-200/70 bg-white/80 shadow-[0_20px_60px_rgba(15,23,42,0.12)] backdrop-blur-xl ${className}`}
    >
      {children}
    </div>
  );
}

function AppleSectionHeader({
  icon,
  title,
  subtitle,
}: {
  icon: React.ReactNode;
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="flex items-start gap-3">
      <div className="h-9 w-9 rounded-2xl bg-slate-900 text-white flex items-center justify-center shadow-sm">
        {icon}
      </div>
      <div>
        <h2 className="text-base sm:text-lg font-semibold tracking-tight text-slate-900">{title}</h2>
        {subtitle && <p className="text-xs sm:text-sm text-slate-500 mt-0.5">{subtitle}</p>}
      </div>
    </div>
  );
}

function AppleLabel({ children }: { children: React.ReactNode }) {
  return (
    <label className="text-xs font-medium text-slate-700 tracking-wide mb-1 block">
      {children}
    </label>
  );
}

function AppleInput(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className={`w-full h-10 rounded-2xl border border-slate-200 bg-white/60 px-3 text-sm text-slate-900 outline-none ring-0 transition focus:border-slate-900/80 focus:ring-[1.5px] focus:ring-slate-900/20 placeholder:text-slate-400 ${props.className || ''}`}
    />
  );
}

function AppleTextarea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      {...props}
      className={`w-full rounded-2xl border border-slate-200 bg-white/60 px-3 py-2.5 text-sm text-slate-900 outline-none ring-0 transition resize-none focus:border-slate-900/80 focus:ring-[1.5px] focus:ring-slate-900/20 placeholder:text-slate-400 ${props.className || ''}`}
    />
  );
}

function AppleSelect(props: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      {...props}
      className={`w-full h-10 rounded-2xl border border-slate-200 bg-white/60 px-3 text-sm text-slate-900 outline-none ring-0 transition focus:border-slate-900/80 focus:ring-[1.5px] focus:ring-slate-900/20 ${props.className || ''}`}
    />
  );
}

/* =========================================================
   Loading Overlay
   ========================================================= */

function LoadingOverlay({ visible, progress, text }: { visible: boolean; progress: number; text: string }) {
  if (!visible) return null;
  return (
    <div className="fixed inset-0 z-[100] bg-slate-950/40 backdrop-blur-md flex items-center justify-center">
      <AppleCard className="w-[92%] max-w-md p-6 sm:p-7">
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm font-medium text-slate-900 tracking-tight">Bundel wordt opgebouwd…</span>
          <span className="text-xs text-slate-500">{Math.round(Math.max(0, Math.min(progress, 100)))}%</span>
        </div>
        <div className="w-full h-2 rounded-full bg-slate-200/80 overflow-hidden mb-3">
          <div
            className="h-full rounded-full bg-slate-900 transition-[width] duration-500 ease-out"
            style={{ width: `${Math.max(0, Math.min(progress, 100))}%` }}
          />
        </div>
        <p className="text-xs text-slate-500">{text}</p>
      </AppleCard>
    </div>
  );
}

/* =========================================================
   Step 1 — Aanbesteding upload & detectie
   ========================================================= */

function StepUpload({
  form,
  extracted,
  onNext,
  handleUpload,
  uploads,
  setValue,
  runExtract,
  loading,
  error,
  uploadWarnings,
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

  const hasUpload = !!uploads?.length;
  const hasRequiredBasics = Boolean(form.watch('tenderTitle') && form.watch('client.organization'));

  const statusBadge = (() => {
    if (!hasUpload) {
      return {
        tone: 'warn',
        icon: <AlertTriangle size={14} />,
        text: 'Upload een leidraad om te starten',
      };
    }
    if (!hasRequiredBasics) {
      return {
        tone: 'warn',
        icon: <AlertTriangle size={14} />,
        text: 'Controleer titel, opdrachtgever en deadline',
      };
    }
    return {
      tone: 'ok',
      icon: <CheckCircle2 size={14} />,
      text: 'Basisgegevens staan klaar',
    };
  })();

  return (
    <div className="space-y-6">
      <AppleSectionHeader
        icon={<Upload size={16} />}
        title="Stap 1 — Upload aanbestedingsdocument"
        subtitle="Upload de leidraad / aankondiging. We lezen de belangrijkste gegevens automatisch uit."
      />

      <div
        {...getRootProps()}
        className={`group relative rounded-3xl border border-dashed px-6 py-8 sm:px-8 sm:py-10 text-center cursor-pointer transition
        ${
          isDragActive
            ? 'border-slate-900/70 bg-white'
            : 'border-slate-200/80 bg-white/70 hover:border-slate-900/40 hover:bg-white'
        }`}
      >
        <input {...getInputProps()} />
        <div className="mx-auto mb-3 flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-900 text-white shadow-sm">
          <Upload size={18} />
        </div>
        <p className="text-sm font-medium text-slate-900">
          Sleep PDF/DOCX hierheen <span className="text-slate-400">of klik om te kiezen</span>
        </p>
        <p className="mt-1 text-xs text-slate-500">We ondersteunen .pdf, .docx en .doc</p>

        <button
          type="button"
          onClick={triggerPick}
          className="mt-4 inline-flex h-9 items-center justify-center rounded-2xl border border-slate-200 px-4 text-xs font-medium text-slate-900 hover:border-slate-900/60 hover:bg-slate-900/5 transition"
        >
          Blader door bestanden
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

      {error && (
        <div className="rounded-3xl border border-red-200 bg-red-50/80 px-4 py-3 text-xs sm:text-sm text-red-700 mt-3">
          {error}
        </div>
      )}
      {uploadWarnings?.length > 0 && (
        <div className="rounded-3xl border border-amber-200 bg-amber-50/80 px-4 py-3 text-xs sm:text-sm text-amber-800 mt-3 space-y-1">
          <p className="font-medium">Let op bij upload:</p>
          <ul className="list-disc pl-4">
            {uploadWarnings.map((w: string, i: number) => (
              <li key={i}>{w}</li>
            ))}
          </ul>
        </div>
      )}

      {!!uploads?.length && (
        <div className="rounded-3xl border border-slate-200 bg-white/80 px-4 py-3 sm:px-5 sm:py-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-slate-900 tracking-wide uppercase">
              Uploads
            </span>
          </div>
          <ul className="text-xs sm:text-sm text-slate-700 space-y-1.5">
            {uploads.map((u: UploadMeta, i: number) => (
              <li key={i} className="flex items-center justify-between">
                <span className="truncate">{u.name}</span>
                <span className="ml-2 shrink-0 text-[11px] text-slate-400">
                  {Math.round(u.size / 1024)} KB
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {extracted && (
        <div className="rounded-3xl border border-slate-200 bg-white/90 p-4 sm:p-5 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <AppleLabel>Gedetecteerde titel</AppleLabel>
              <AppleInput
                value={form.watch('tenderTitle') || ''}
                onChange={(e) =>
                  setValue('tenderTitle', e.target.value, { shouldValidate: true })
                }
              />
            </div>
            <div>
              <AppleLabel>Opdrachtgever</AppleLabel>
              <AppleInput
                value={form.watch('client.organization') || ''}
                onChange={(e) =>
                  setValue('client.organization', e.target.value, { shouldValidate: true })
                }
              />
            </div>
            <div>
              <AppleLabel>Deadline</AppleLabel>
              <AppleInput
                type="date"
                value={form.watch('client.deadline') || ''}
                onChange={(e) =>
                  setValue('client.deadline', e.target.value, { shouldValidate: true })
                }
              />
            </div>
            <div>
              <AppleLabel>Sector / CPV</AppleLabel>
              <AppleInput
                value={form.watch('sector') || ''}
                onChange={(e) =>
                  setValue('sector', e.target.value, { shouldValidate: true })
                }
              />
            </div>
          </div>
          <div>
            <AppleLabel>Samenvatting (AI)</AppleLabel>
            <AppleTextarea
              rows={4}
              value={form.watch('techDetails') || ''}
              onChange={(e) =>
                setValue('techDetails', e.target.value, { shouldValidate: true })
              }
              placeholder="Kern van de scope / technische details"
            />
          </div>
        </div>
      )}

      <div className="flex items-center justify-between pt-2">
        <div className="flex items-center gap-2 text-xs sm:text-sm">
          <span
            className={`inline-flex items-center gap-1 rounded-2xl px-2.5 py-1 ${
              statusBadge.tone === 'ok'
                ? 'bg-emerald-50 text-emerald-700'
                : 'bg-amber-50 text-amber-700'
            }`}
          >
            {statusBadge.icon}
            {statusBadge.text}
          </span>
        </div>
        <button
          type="button"
          onClick={async () => {
            const out = await runExtract();
            if (out) onNext();
          }}
          disabled={!uploads?.length || loading}
          className="inline-flex items-center gap-1.5 rounded-2xl bg-slate-900 px-4 py-2 text-xs sm:text-sm font-medium text-white shadow-sm disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Volgende: Bedrijfsinfo <ChevronRight size={14} />
        </button>
      </div>
    </div>
  );
}


/* =========================================================
   Step 2 — Bedrijfsgegevens
   ========================================================= */

function StepCompany({ form, setValue, onPrev, onNext }: any) {
  const errors = form.formState.errors as any;

  const fillDemo = () => {
    const opts = { shouldValidate: true, shouldDirty: true };
    setValue('company.name', 'Digital Ease B.V.', opts);
    setValue('company.kvk', '88392011', opts);
    setValue('company.vat', 'NL004589230B12', opts);
    setValue('company.phone', '+31 6 12 34 56 78', opts);
    setValue('company.email', 'contact@digitalease.nl', opts);
    setValue('company.visitAddress', 'Innovatieplein 12, 1234 AB Amsterdam', opts);
    setValue('company.consortium', 'IT Infra Group, SecureOps NL', opts);
    setValue(
      'company.certifications',
      [
        'ISO 27001',
        'ISO 9001',
        'NEN 7510',
        'Microsoft Solutions Partner – Modern Work',
        'Fortinet NSE4',
      ],
      opts
    );
    setValue('language', 'nl-NL', opts);
    setValue('client.contactName', 'Laura van Dijk', opts);
    setValue('client.contactEmail', 'aanbestedingen@voorbeeldstad.nl', opts);
    setValue('client.organization', 'Gemeente Voorbeeldstad', opts);
    setValue('client.referenceId', 'GV-IT-2026-001', opts);
    setValue('client.deadline', '2026-01-20', opts);
    setValue(
      'client.contractTerm',
      '4 jaar met optie tot verlenging van 2 jaar',
      opts
    );
  };

  return (
    <div className="space-y-6">
      <AppleSectionHeader
        icon={<Building2 size={16} />}
        title="Stap 2 — Jouw bedrijfsprofiel"
        subtitle="We gebruiken deze gegevens in alle documenten, inclusief EMVI-plan, matrices en KPI-overzicht."
      />

      <div className="flex justify-end mb-2">
        <button
          type="button"
          onClick={fillDemo}
          className="inline-flex items-center gap-1.5 rounded-2xl border border-slate-200 bg-white px-3 py-1.5 text-[11px] font-medium text-slate-700 hover:border-slate-900/50 hover:bg-slate-50 transition"
        >
          Vul voorbeeldgegevens in
        </button>
      </div>

      <div className="rounded-3xl border border-slate-200 bg-white/90 p-4 sm:p-5 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <AppleLabel>Bedrijfsnaam</AppleLabel>
            <Controller
              control={form.control}
              name="company.name"
              render={({ field }) => (
                <AppleInput placeholder="Bijv. Digital Ease B.V." {...field} />
              )}
            />
            {errors?.company?.name && (
              <p className="mt-1 text-[11px] text-red-500">
                {errors.company.name.message}
              </p>
            )}
          </div>
          <div>
            <AppleLabel>KvK-nummer</AppleLabel>
            <Controller
              control={form.control}
              name="company.kvk"
              render={({ field }) => (
                <AppleInput placeholder="00000000" {...field} />
              )}
            />
          </div>
          <div>
            <AppleLabel>BTW-nummer</AppleLabel>
            <Controller
              control={form.control}
              name="company.vat"
              render={({ field }) => (
                <AppleInput placeholder="NL000000000B01" {...field} />
              )}
            />
          </div>
          <div>
            <AppleLabel>Telefoon</AppleLabel>
            <Controller
              control={form.control}
              name="company.phone"
              render={({ field }) => (
                <AppleInput placeholder="+31 ..." {...field} />
              )}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4">
          <div>
            <AppleLabel>E-mail</AppleLabel>
            <Controller
              control={form.control}
              name="company.email"
              render={({ field }) => (
                <AppleInput placeholder="contact@bedrijf.nl" {...field} />
              )}
            />
          </div>
          <div>
            <AppleLabel>Bezoekadres</AppleLabel>
            <Controller
              control={form.control}
              name="company.visitAddress"
              render={({ field }) => (
                <AppleInput placeholder="Straat 1, 1234 AB Plaats" {...field} />
              )}
            />
          </div>
          <div>
            <AppleLabel>Consortium / partners</AppleLabel>
            <Controller
              control={form.control}
              name="company.consortium"
              render={({ field }) => (
                <AppleInput placeholder="Partner A, Partner B…" {...field} />
              )}
            />
          </div>
        </div>

        <Controller
          control={form.control}
          name="company.certifications"
          render={({ field }) => (
            <CertsInput
              values={(field.value as string[]) || []}
              onChange={(vals) =>
                setValue('company.certifications', vals, {
                  shouldDirty: true,
                  shouldValidate: true,
                })
              }
            />
          )}
        />
      </div>

      <div className="rounded-3xl border border-slate-200 bg-white/90 p-4 sm:p-5">
        <AppleLabel>Bedrijfsomschrijving / propositie</AppleLabel>
        <Controller
          control={form.control}
          name="companyNarrative"
          render={({ field }) => (
            <AppleTextarea
              rows={5}
              {...field}
              placeholder={`Kernexpertise, onderscheidend vermogen, kwaliteitssystemen…\n\nBijvoorbeeld:\n• Gespecialiseerd in IT-beheer voor MKB\n• 24/7 servicedesk en monitoring\n• ISO 27001 & ISO 9001 gecertificeerd`}
            />
          )}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <AppleLabel>Taal</AppleLabel>
          <Controller
            control={form.control}
            name="language"
            render={({ field }) => (
              <AppleSelect {...field}>
                <option value="">Kies taal…</option>
                <option value="nl-NL">Nederlands</option>
                <option value="en-GB">Engels</option>
                <option value="de-DE">Duits</option>
                <option value="fr-FR">Frans</option>
              </AppleSelect>
            )}
          />
        </div>
        <div>
          <AppleLabel>Contactpersoon</AppleLabel>
          <Controller
            control={form.control}
            name="client.contactName"
            render={({ field }) => (
              <AppleInput placeholder="Naam contactpersoon" {...field} />
            )}
          />
        </div>
        <div>
          <AppleLabel>Contact e-mail</AppleLabel>
          <Controller
            control={form.control}
            name="client.contactEmail"
            render={({ field }) => (
              <AppleInput placeholder="email@domain.nl" {...field} />
            )}
          />
        </div>
      </div>

            <div className="flex items-center justify-between pt-2">
        <button
          type="button"
          onClick={onPrev}
          className="inline-flex items-center gap-1.5 rounded-2xl border border-slate-200 px-4 py-2 text-xs sm:text-sm font-medium text-slate-700 hover:border-slate-900/50 hover:bg-slate-50 transition"
        >
          <ChevronLeft size={14} /> Terug
        </button>
        <button
          type="button"
          onClick={async () => {
            const ok = await form.trigger([
              'company.name',
              'client.contactName',
              'client.contactEmail',
              'language',
            ]);
            if (!ok) {
              // errors in beeld brengen
              window.scrollTo({ top: 0, behavior: 'smooth' });
              return;
            }
            onNext();
          }}
          className="inline-flex items-center gap-1.5 rounded-2xl bg-slate-900 px-4 py-2 text-xs sm:text-sm font-medium text-white shadow-sm"
        >
          Volgende: Details <ChevronRight size={14} />
        </button>
      </div>
    </div>
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
  
  const f = form.watch();

  const requiredChecks = [
    { id: 'language', label: 'Taal', ok: !!f.language },
    { id: 'tenderTitle', label: 'Titel', ok: !!f.tenderTitle },
    { id: 'companyName', label: 'Bedrijfsnaam', ok: !!f.company?.name },
    { id: 'org', label: 'Opdrachtgever', ok: !!f.client?.organization },
    { id: 'pricingModel', label: 'Prijsmodel', ok: !!f.pricingModel },
  ];

  const missing: string[] = requiredChecks.filter((c) => !c.ok).map((c) => c.label);

  const tabButton = (id: typeof tab, label: string) => (
    <button
      type="button"
      onClick={() => setTab(id)}
      className={`relative flex-1 rounded-2xl px-3 py-1.5 text-xs sm:text-sm font-medium transition ${
        tab === id
          ? 'bg-slate-900 text-white shadow-sm'
          : 'text-slate-600 hover:bg-slate-900/5'
      }`}
    >
      {label}
    </button>
  );

  return (
    <div className="space-y-6">
      <AppleSectionHeader
        icon={<ClipboardList size={16} />}
        title="Stap 3 — Eisen, planning & risico’s"
        subtitle="Vul de belangrijkste eisen aan. We gebruiken dit voor EMVI, matrices, KPI’s en het risicodossier."
      />

      <div className="inline-flex items-center rounded-3xl border border-slate-200 bg-white/80 p-1 gap-1 w-full sm:w-auto">
        {tabButton('eisen', 'Eisen & planning')}
        {tabButton('compliance', 'Compliance & KPI')}
        {tabButton('risico', 'Risico’s & aannames')}
      </div>

      {tab === 'eisen' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          <div className="rounded-3xl border border-slate-200 bg-white/90 p-4 sm:p-5 space-y-2">
            <AppleLabel>
              Belangrijke eisen (één per regel){' '}
              <span className="font-normal text-slate-400">Tip: zet KO’s als “KO: …”</span>
            </AppleLabel>
            <AppleTextarea
              rows={8}
              value={keyRequirementsText}
              onChange={(e) => setKeyRequirementsText(e.target.value)}
            />
          </div>
          <div className="rounded-3xl border border-slate-200 bg-white/90 p-4 sm:p-5 space-y-2">
            <AppleLabel>Planning / Milestones</AppleLabel>
            <p className="text-[11px] text-slate-400 mb-1">
              Formaat: <span className="font-mono">Naam | Start | Einde | Verantwoordelijke | Acceptatie</span>
            </p>
            <AppleTextarea
              rows={8}
              value={milestonesText}
              onChange={(e) => setMilestonesText(e.target.value)}
            />
          </div>
          <div className="md:col-span-2">
            <AppleLabel>Prijsmodel</AppleLabel>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mt-1">
              {(['fixed', 'hourly', 'subscription'] as PriceModel[]).map((model) => {
                const labels: Record<PriceModel, string> = {
                  fixed: 'Fixed price',
                  hourly: 'Uurtarief',
                  subscription: 'Abonnement',
                  '': '',
                };
                const active = form.watch('pricingModel') === model;
                return (
                  <button
                    key={model}
                    type="button"
                    onClick={() => form.setValue('pricingModel', model)}
                    className={`flex items-center justify-between rounded-2xl border px-3 py-2 text-xs sm:text-sm transition ${
                      active
                        ? 'border-slate-900 bg-slate-900 text-white shadow-sm'
                        : 'border-slate-200 bg-white hover:border-slate-900/60 hover:bg-slate-50'
                    }`}
                  >
                    <span>{labels[model]}</span>
                    {active && <CheckCircle2 size={14} />}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {tab === 'compliance' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          <div className="rounded-3xl border border-slate-200 bg-white/90 p-4 sm:p-5 space-y-2">
            <AppleLabel>Compliance-matrix</AppleLabel>
            <p className="text-[11px] text-slate-400 mb-1">
              <span className="font-mono">req | KO ja/nee | meets Yes/No/Partial | notes | attachment</span>
            </p>
            <AppleTextarea
              rows={9}
              value={complianceText}
              onChange={(e) => setComplianceText(e.target.value)}
            />
          </div>
          <div className="rounded-3xl border border-slate-200 bg-white/90 p-4 sm:p-5 space-y-2">
            <AppleLabel>KPI / SLA</AppleLabel>
            <p className="text-[11px] text-slate-400 mb-1">
              <span className="font-mono">kpi | target | measure | frequency | escalation</span>
            </p>
            <AppleTextarea
              rows={9}
              value={kpisText}
              onChange={(e) => setKpisText(e.target.value)}
            />
          </div>
        </div>
      )}

      {tab === 'risico' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          <div className="rounded-3xl border border-slate-200 bg-white/90 p-4 sm:p-5 space-y-2">
            <AppleLabel>Risicoregister</AppleLabel>
            <p className="text-[11px] text-slate-400 mb-1">
              <span className="font-mono">risk | mitigation | probability | impact | owner | status</span>
            </p>
            <AppleTextarea
              rows={9}
              value={risksText}
              onChange={(e) => setRisksText(e.target.value)}
            />
          </div>
          <div className="space-y-4">
            <div className="rounded-3xl border border-slate-200 bg-white/90 p-4 sm:p-5 space-y-2">
              <AppleLabel>Aannames</AppleLabel>
              <AppleTextarea
                rows={4}
                value={assumptionsText}
                onChange={(e) => setAssumptionsText(e.target.value)}
                placeholder="Één aanname per regel"
              />
            </div>
            <div className="rounded-3xl border border-slate-200 bg-white/90 p-4 sm:p-5 space-y-2">
              <AppleLabel>Uitsluitingen</AppleLabel>
              <AppleTextarea
                rows={4}
                value={exclusionsText}
                onChange={(e) => setExclusionsText(e.target.value)}
                placeholder="Één uitsluiting per regel"
              />
            </div>
          </div>
        </div>
      )}

            <div className="flex flex-col items-end gap-1 pt-2 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="button"
          onClick={onPrev}
          className="order-2 inline-flex items-center gap-1.5 rounded-2xl border border-slate-200 px-4 py-2 text-xs sm:text-sm font-medium text-slate-700 hover:border-slate-900/50 hover:bg-slate-50 transition sm:order-1"
        >
          <ChevronLeft size={14} /> Terug
        </button>
        <div className="order-1 flex flex-col items-end gap-1 sm:order-2">
          <button
            type="button"
            onClick={onGenerate}
            disabled={!canGenerate}
            title={!canGenerate && missing.length ? `Vul eerst in: ${missing.join(', ')}` : ''}
            className="inline-flex items-center gap-1.5 rounded-2xl bg-slate-900 px-4 py-2 text-xs sm:text-sm font-medium text-white shadow-sm disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Genereer bundel <DownloadCloud size={14} />
          </button>
          {!canGenerate && (
            <div className="text-[11px] text-slate-500 space-y-1">
              <p className="font-medium">Nog vereist voor genereren:</p>
              <ul className="list-disc pl-4 space-y-0.5">
                {requiredChecks.map((c) => (
                  <li
                    key={c.id}
                    className={c.ok ? 'text-emerald-600' : 'text-amber-700'}
                  >
                    {c.ok ? '✔ ' : '• '} {c.label}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
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
    <div className="space-y-2">
      <AppleLabel>Certificeringen</AppleLabel>
      <div className="flex gap-2">
        <AppleInput
          value={certInput}
          onChange={(e) => setCertInput(e.target.value)}
          placeholder="Bijv. ISO 9001, ISO 27001"
        />
        <button
          type="button"
          onClick={add}
          className="shrink-0 inline-flex h-10 items-center justify-center rounded-2xl bg-slate-900 px-3 text-xs font-medium text-white"
        >
          Voeg toe
        </button>
      </div>
      {!!values?.length && (
        <ul className="mt-2 flex flex-wrap gap-2 text-xs">
          {values.map((c, i) => (
            <li
              key={i}
              className="inline-flex items-center gap-1 rounded-2xl border border-slate-200 bg-slate-50 px-2.5 py-1"
            >
              <span>{c}</span>
              <button
                type="button"
                className="text-[11px] text-slate-500 hover:text-slate-900"
                onClick={() => remove(i)}
              >
                ✕
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

/* =========================================================
   Main — Wizard v2 (Apple-style)
   ========================================================= */

export default function WizardV2Page() {
  const [step, setStep] = useState<number>(1); // 1 Upload → 2 Company → 3 Details → 4 Review

  // Upload state persistence
  const UPLOAD_SAVE_KEY = 'wizard-upload-v2';

  // UI state
  const [uploads, setUploads] = useState<UploadMeta[]>([]);
  const [extractedNotes, setExtractedNotes] = useState<string>('');
  const extractedNotesRef = useRef<string>('');

  // Keep ref in sync (prevents race conditions on immediate extract after upload)
  useEffect(() => {
    extractedNotesRef.current = extractedNotes || '';
  }, [extractedNotes]);
  const [extracted, setExtracted] = useState<any | null>(null);
  const [uploadWarnings, setUploadWarnings] = useState<string[]>([]);
  const [coverage, setCoverage] = useState<{
    ko: [number, number];
    req: [number, number];
    kpi: [number, number];
  } | null>(null);
  // Restore upload state on mount
  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      const raw = localStorage.getItem(UPLOAD_SAVE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed && typeof parsed === 'object') {
          if (Array.isArray(parsed.uploads)) setUploads(parsed.uploads);
          if (typeof parsed.extractedNotes === 'string') setExtractedNotes(parsed.extractedNotes);
          if (typeof parsed.extracted !== 'undefined') setExtracted(parsed.extracted);
          if (Array.isArray(parsed.uploadWarnings)) setUploadWarnings(parsed.uploadWarnings);
        }
      }
    } catch {}
    // eslint-disable-next-line
  }, []);

  // Save upload state to localStorage on change
  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      const toSave = {
        uploads,
        extractedNotes,
        extracted,
        uploadWarnings,
      };
      localStorage.setItem(UPLOAD_SAVE_KEY, JSON.stringify(toSave));
    } catch {}
  }, [uploads, extractedNotes, extracted, uploadWarnings]);

  // Text model states
  const [keyRequirementsText, setKeyRequirementsText] = useState(DEFAULT_KEY_REQUIREMENTS);
  const [milestonesText, setMilestonesText] = useState(DEFAULT_MILESTONES);
  const [complianceText, setComplianceText] = useState(DEFAULT_COMPLIANCE);
  const [risksText, setRisksText] = useState(DEFAULT_RISKS);
  const [kpisText, setKpisText] = useState(DEFAULT_KPIS);
  const [assumptionsText, setAssumptionsText] = useState(DEFAULT_ASSUMPTIONS);
  const [exclusionsText, setExclusionsText] = useState(DEFAULT_EXCLUSIONS);

  // Generation state
  const [loading, setLoading] = useState(false);
  const [loadingVisible, setLoadingVisible] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [loadingStepText, setLoadingStepText] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<string | null>(null);
  const [downloadUrl, setDownloadUrl] = useState<string>('');
  const [validation, setValidation] = useState<null | {
    ok: boolean;
    messages: string[];
    gates?: Record<string, boolean>;
  }>(null);
  const [score, setScore] = useState<{ score: number; notes: string[] } | null>(null);

  // Form
  const FALLBACK_DEFAULTS: Partial<WizardValues> = {
    language: 'nl-NL',
    sector: 'IT-beheer & managed services',
    tenderTitle: 'Raamovereenkomst Managed IT Services 2026–2030',
    techDetails:
      'De opdracht omvat het volledig ontzorgen van Gemeente Voorbeeldstad op het gebied van managed IT services, inclusief werkplekbeheer, serverbeheer, netwerkmonitoring, beveiliging, servicedesk en Microsoft 365-support. De opdrachtnemer levert 24/7 ondersteuning voor P1-incidenten, proactieve monitoring, patchmanagement, hardening en beheer van endpoints via een moderne beheeroplossing zoals Intune. De transitie start op 1 maart 2026 en omvat migratie van de huidige IT-omgeving, documentatie, adoptie en overdracht aan de beheerorganisatie.',
    companyNarrative: `Digital Ease is een specialist in managed IT services voor MKB en (semi)overheden. Wij combineren hoogwaardige expertise in cloud-, netwerk- en endpointbeheer met een pragmatische aanpak die gericht is op stabiliteit, veiligheid en continuïteit. Onze dienstverlening is volledig ingericht volgens ITIL, waarbij incident-, problem- en changemanagement aantoonbaar geborgd zijn.

Wij beschikken over gecertificeerde engineers (Microsoft, Fortinet, ISO 27001/9001) en een 24/7 responsteam voor prioritaire incidenten. Met proactieve monitoring, geautomatiseerd patchmanagement en security hardening minimaliseren wij risico’s en verhogen wij de beschikbaarheid van bedrijfskritische systemen.

Digital Ease onderscheidt zich door een zeer persoonlijke samenwerking, korte communicatielijnen en een hoge mate van betrokkenheid bij de bedrijfsdoelstellingen van de klant. Wij realiseren aantoonbare kwaliteitsverbeteringen via heldere KPI’s, maandelijkse rapportages en continue optimalisatie van de IT-omgeving.

Onze aanpak levert klanten rust, een voorspelbare IT-omgeving en een betrouwbare partner die meebeweegt met toekomstige technologische ontwikkelingen.`,
    pricingModel: 'subscription',
    client: {
      organization: 'Gemeente Voorbeeldstad',
      contactName: 'Laura van Dijk',
      contactEmail: 'aanbestedingen@voorbeeldstad.nl',
      referenceId: 'GV-IT-2026-001',
      deadline: '2026-01-20',
      contractTerm: '4 jaar met optie tot verlenging van 2 jaar',
    },
    company: {
      name: 'Digital Ease B.V.',
      kvk: '88392011',
      vat: 'NL004589230B12',
      visitAddress: 'Innovatieplein 12, 1234 AB Amsterdam',
      phone: '+31 6 12 34 56 78',
      email: 'contact@digitalease.nl',
      consortium: 'IT Infra Group, SecureOps NL',
      certifications: [
        'ISO 27001',
        'ISO 9001',
        'NEN 7510',
        'Microsoft Solutions Partner – Modern Work',
        'Fortinet NSE4',
      ],
    },
  };

  const raw = loadAutosave<any>('wizard-values-v2', {});

  const saved: Partial<WizardValues> = {
    ...FALLBACK_DEFAULTS,
    ...(raw || {}),
    client: {
      ...FALLBACK_DEFAULTS.client,
      ...(raw?.client || {}),
    },
    company: {
      ...FALLBACK_DEFAULTS.company,
      ...(raw?.company || {}),
    },
  };

  const form = useForm<WizardValues>({
    resolver: zodResolver(WizardSchema),
    mode: 'onChange',
    shouldUnregister: false, // keep values across step unmounts
    defaultValues: saved as any,
  });
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

      // Kleine bestanden niet direct afwijzen: sommige aankondigingen/nota’s zijn klein.
      // We beoordelen bruikbaarheid op extract-resultaat (tekstlengte / warnings), niet op filesize.
      const VERY_SMALL_BYTES = 1024; // 1 KB
      if (file.size < VERY_SMALL_BYTES) {
        setUploadWarnings((prev) => [
          ...prev,
          `${file.name}: bestand is erg klein. Als er geen tekst uit komt, upload ook de volledige leidraad/PvE.`,
        ]);
      }

      try {
        const fd = new FormData();
        fd.append('file', file);
        const res = await fetch('/api/upload', { method: 'POST', body: fd });
        const data = await res.json();
        if (!res.ok) throw new Error(data?.error || 'Upload failed');
        // If API returns ok:false but 200, do not hard-fail; show warning.
        if (data?.ok === false) {
          setUploadWarnings((prev) => [
            ...(prev || []),
            `${file.name}: ${data?.error || 'Upload kon niet volledig worden verwerkt; probeer ook een andere (niet-beveiligde) PDF of DOCX.'}`,
          ]);
        }

        setError(null);
        setUploads((u) => [...u, { name: file.name, size: file.size }]);

        // ---- Robust source text extraction (prevents "Geen bron-tekst" issues) ----
        const extractedText =
          (data?.extractedText as string | undefined) ||
          (data?.extracted_text as string | undefined) ||
          (data?.text as string | undefined) ||
          (data?.result?.extractedText as string | undefined) ||
          (data?.result?.text as string | undefined) ||
          '';

        const notes =
          (data?.notes as string | undefined) ||
          (data?.result?.notes as string | undefined) ||
          '';

        const structured = data?.structured || data?.result?.structured || null;
        const warningsFromApi: string[] = Array.isArray(data?.warnings)
          ? data.warnings
          : Array.isArray(data?.result?.warnings)
          ? data.result.warnings
          : [];

        // Build a guaranteed non-empty-ish source blob when PDF has little extractable text
        const sourceText = (
          extractedText?.trim()?.length
            ? extractedText.trim()
            : [
                notes?.trim() ? `NOTES:\n${notes.trim()}` : '',
                structured ? `STRUCTURED:\n${JSON.stringify(structured, null, 2)}` : '',
                warningsFromApi.length ? `WARNINGS:\n- ${warningsFromApi.join('\n- ')}` : '',
              ]
                .filter(Boolean)
                .join('\n\n')
        ).trim();

        // Always append something to extractedNotes so downstream extract/generate never sees empty source.
        // We keep it readable and separated per file.
        const nextNotes = (() => {
          const addition = sourceText.length
            ? `${file.name}\n\n${sourceText}`
            : `${file.name}\n\n[Geen tekst kunnen extraheren uit dit bestand]`;
          return extractedNotesRef.current
            ? `${extractedNotesRef.current}\n\n---\n\n${addition}`
            : addition;
        })();

        extractedNotesRef.current = nextNotes;
        setExtractedNotes(nextNotes);

        // Heuristics: if very little real text, show guidance but do not block.
        if (extractedText.trim().length < 200) {
          setUploadWarnings((prev) => [
            ...prev,
            `${file.name}: weinig/geen tekst gevonden. Upload bij voorkeur ook de leidraad/PvE (niet alleen aankondiging).`,
          ]);
        }

        // Merge warnings from API
        if (warningsFromApi.length) {
          setUploadWarnings((prev) => Array.from(new Set([...(prev || []), ...warningsFromApi])));
        }

        // Keep structured extraction for prefilling form fields
        if (structured) {
          setExtracted(structured);
          const s = structured as {
            title?: string;
            cpv?: string;
            authority?: string;
            referenceId?: string;
            deadlines?: { description: string; date: string }[];
          };
          const current = watch();
          if (!current.tenderTitle && s.title)
            setValue('tenderTitle', s.title, { shouldValidate: true, shouldDirty: true });
          if (!current.sector && s.cpv)
            setValue('sector', `CPV ${s.cpv}`, { shouldValidate: true, shouldDirty: true });
          setValue(
            'client',
            {
              ...current.client,
              organization: current.client?.organization || s.authority || '',
              referenceId: current.client?.referenceId || s.referenceId || '',
              deadline:
                current.client?.deadline ||
                (s.deadlines?.[0]?.date ?? current.client?.deadline) ||
                '',
              contactName: current.client?.contactName || '',
              contactEmail: current.client?.contactEmail || '',
            },
            { shouldValidate: true, shouldDirty: true }
          );
        }
      } catch (e: any) {
        setError(e.message || 'Upload failed');
      }
    },
    [setValue, watch]
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

      const src = (extractedNotesRef.current || '').trim();
      if (!src || src.length < 10) {
        setUploadWarnings((prev) => Array.from(new Set([...(prev || []), 'Geen (bruikbare) bron-tekst beschikbaar. Upload bij voorkeur de leidraad/PvE/beoordelingskader (niet alleen een aankondiging) of een tekst-PDF/DOCX.'])));
        setError(null);
        return { ok: true, extracted: { knockouts: [], eisen: [], kpi: [] }, warnings: ['Geen bron-tekst beschikbaar'] } as any;
      }

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
        extractedNotes: extractedNotesRef.current,
        sourceText: extractedNotesRef.current,
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

      const j = await res.json().catch(() => ({} as any));

      // Hard-fail only on HTTP errors or explicit ok:false
      if (!res.ok || j?.ok === false) {
        throw new Error(j?.error || j?.message || 'Extract failed');
      }

      // Backward/forward compatible: API may return { extracted }, { data }, or nested results.
      const extractedObj = (j?.extracted ?? j?.data ?? j?.result?.extracted ?? j?.result?.data ?? {}) as any;

      // Normalize arrays to prevent crashes
      const knockouts = Array.isArray(extractedObj?.knockouts) ? extractedObj.knockouts : [];
      const eisen = Array.isArray(extractedObj?.eisen) ? extractedObj.eisen : [];
      const kpi = Array.isArray(extractedObj?.kpi) ? extractedObj.kpi : [];

      setExtracted({ ...extractedObj, knockouts, eisen, kpi });
      setCoverage({
        ko: [knockouts.length, knockouts.length],
        req: [eisen.length, eisen.length],
        kpi: [kpi.length, kpi.length],
      });

      // Surface warnings as non-blocking upload warnings (optional)
      if (Array.isArray(j?.warnings) && j.warnings.length) {
        setUploadWarnings((prev) => Array.from(new Set([...(prev || []), ...j.warnings])));
      }

      setError(null);
      return { ...j, extracted: { ...extractedObj, knockouts, eisen, kpi } };
    } catch (e: any) {
      console.error(e);
      setError(e?.message || 'Extract failed');
      return null;
    }
  }

  // Generate
  const generate = useCallback(async () => {
    setLoading(true);
    setLoadingVisible(true);
    setProgress(6, 'Voorbereiden…');
    setError(null);
    setResult(null);
    setScore(null);
    setValidation(null);
    if (downloadUrl) {
      URL.revokeObjectURL(downloadUrl);
      setDownloadUrl('');
    }

    try {
      if (!uploads?.length) {
        setStep(1);
        throw new Error('Upload eerst minimaal één aanbestedingsdocument (PDF/DOCX).');
      }
      // We no longer require 200+ chars, because some valid uploads (bijv. aankondigingen) are small.
      // We do require *some* source blob to be present.
      if (!extractedNotes || extractedNotes.trim().length < 20) {
        setStep(1);
        throw new Error(
          'Geen bron-tekst beschikbaar na upload. Probeer een andere PDF (niet-beveiligd) of upload daarnaast de volledige leidraad/PvE.'
        );
      }

      setProgress(12, 'Analyseren documenten (extract)…');
      const extractedRes = ((await runExtract()) || {}) as any;
      const extractedObj = extractedRes?.extracted ?? extractedRes?.data ?? null;

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
        tender: {
          title: f.tenderTitle,
          reference: f.client.referenceId || '',
          contracting_authority: f.client.organization,
          country: 'NL',
          sector: f.sector,
          scope_summary: f.techDetails,
          contract_type: 'werken|diensten|leveringen|raamovereenkomst',
          award_method: 'EMVI',
          award_criteria: [
            { name: 'Kwaliteit', weight_pct: 40, what_good_looks_like: '' },
            { name: 'Duurzaamheid', weight_pct: 20, what_good_looks_like: '' },
            { name: 'Risicobeheersing', weight_pct: 20, what_good_looks_like: '' },
            { name: 'Prijs', weight_pct: 20, what_good_looks_like: '' },
          ],
          requirements: {
            knockouts: keyRequirements.filter((k) => /(^|\s)KO(\s|:)|knock/i.test(k)),
            musts: keyRequirements.filter((k) => !/(^|\s)KO(\s|:)|knock/i.test(k)),
            deliverables: ['Plan van Aanpak', 'Risicodossier', 'KPI-overzicht'],
            deadlines: { submission: f.client.deadline || '', execution_window: '' },
          },
          site_constraints: [],
          sla_definitions: kpis.slice(0, 3).map((k) => ({ name: k.kpi, target: k.target })),
        },
        company: {
          name: f.company.name,
          kvk: f.company.kvk || '',
          vat: f.company.vat || '',
          hq_address: f.company.visitAddress || '',
          contacts: [
            {
              name: f.client.contactName || '',
              role: 'Contact',
              email: f.client.contactEmail || '',
              phone: f.company.phone || '',
            },
          ],
          sector: f.sector,
          description: (f.companyNarrative || '').split('\n')[0] || '',
          capabilities: (f.companyNarrative || '').split('\n').filter(Boolean),
          certs: f.company.certifications || [],
          partners: (f.company.consortium || '').split(',').map((s) => s.trim()).filter(Boolean),
          unique_strengths: (f.companyNarrative || '').split('\n').filter(Boolean),
          references: [],
        },
        assumptions_policy: {
          pricing_locked: !!f.pricingModel,
          dependencies_on_client: [],
          warranty: '12 maanden',
        },
        visual_prefs: { tables: true, simple_gantt: true, max_pages_emvi: 6 },
        extras: { assumptions, exclusions },
        _extracted: extractedObj,
      } as const;

      setProgress(28, 'Genereren volledige bundel…');
      const gen = await postJson<{
        jobId: string;
        files: string[];
        validation: any;
        preview?: Record<string, string>;
        downloadZip: string;
      }>('/api/generate', payload);

      if (gen?.preview?.['EMVI.md']) setResult(gen.preview['EMVI.md']);

      setProgress(86, 'Valideren op KO / placeholders / secties…');
      try {
        const report = await postJson('/api/validate', { jobId: gen.jobId });
        setValidation({ ok: report.ok, messages: report.messages, gates: report.gates });
      } catch (e: any) {
        setValidation({ ok: false, messages: [e.message || 'Validatie mislukt'], gates: {} });
      }

      setProgress(96, 'Bundelen & downloaden…');
      if (gen.downloadZip) {
        setDownloadUrl(gen.downloadZip);
        const a = document.createElement('a');
        a.href = gen.downloadZip;
        a.download = `${(watch().tenderTitle || 'tender_bundle').replace(/\s+/g, '_')}.zip`;
        document.body.appendChild(a);
        a.click();
        a.remove();
      }

      setProgress(98, 'Kwaliteitsscore…');
      try {
        const s = await postJson('/api/score', { text: gen?.preview?.['EMVI.md'] || '' });
        setScore(s);
      } catch {}

      setProgress(100, 'Gereed ✅');
      setStep(4);
    } catch (e: any) {
      setError(e.message || 'Generation failed');
      setProgress(100, 'Mislukt ❌');
    } finally {
      setLoading(false);
      setTimeout(() => setLoadingVisible(false), 600);
      // setStep(4); // review screen - removed from finally, now only set in try after success
    }
  }, [
    assumptionsText,
    complianceText,
    exclusionsText,
    keyRequirementsText,
    kpisText,
    milestonesText,
    risksText,
    watch,
    downloadUrl,
    uploads,
    extractedNotes,
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
        body: JSON.stringify({
          markdown: result,
          fileName: watch().tenderTitle || 'tender',
        }),
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
        setValue('sector', 'IT-beheer & managed services');
        setValue('tenderTitle', 'Raamovereenkomst Managed IT Services 2026–2030');
        setValue(
          'client',
          {
            organization: 'Gemeente Amsterdam',
            contactName: 'Laura van Dijk',
            contactEmail: 'aanbestedingen@amsterdam.nl',
            referenceId: 'GEM-AMS-2026-014',
            deadline: '2026-01-20',
            contractTerm: '4 + 2 jaar',
          } as any
        );
        setValue(
          'company',
          { name: 'TenderMe / Digital Ease B.V.', certifications: ['ISO 27001', 'ISO 9001'] } as any
        );
        setStep(2);
      }
    }
  }, [setValue]);

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_#f5f5f7,_#e5e7eb)] text-slate-900">
      <LoadingOverlay visible={loadingVisible} progress={loadingProgress} text={loadingStepText} />

      {/* Topbar */}
      <header className="sticky top-0 z-40 border-b border-slate-200/70 bg-white/70 backdrop-blur-xl">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:px-6">
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-2xl bg-slate-900 text-white text-xs font-semibold">
              T
            </div>
            <div className="flex flex-col leading-tight">
              <span className="text-sm font-semibold tracking-tight">TenderMe</span>
              <span className="text-[11px] text-slate-500">AI Tender Assistant</span>
            </div>
          </div>
          {process.env.NODE_ENV !== 'production' && (
            <button
              type="button"
              onClick={() => {
                Object.entries(FALLBACK_DEFAULTS).forEach(([k, v]) =>
                  setValue(k as any, v as any, { shouldDirty: true, shouldValidate: true })
                );
                setStep(3);
              }}
              className="ml-3 inline-flex items-center rounded-2xl border border-slate-200 bg-white px-3 py-1.5 text-[11px] font-medium text-slate-700 hover:border-slate-900/40"
            >
              Vul alles (dev)
            </button>
          )}


          {coverage && (
            <div className="hidden sm:flex items-center gap-2 text-[11px]">
              <span className="rounded-full border border-slate-200 bg-white px-2 py-0.5">
                KO <span className="font-medium">{coverage.ko[0]}</span> / {coverage.ko[1]}
              </span>
              <span className="rounded-full border border-slate-200 bg-white px-2 py-0.5">
                REQ <span className="font-medium">{coverage.req[0]}</span> / {coverage.req[1]}
              </span>
              <span className="rounded-full border border-slate-200 bg-white px-2 py-0.5">
                KPI <span className="font-medium">{coverage.kpi[0]}</span> / {coverage.kpi[1]}
              </span>
            </div>
          )}
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 sm:px-6 py-8 sm:py-10">
        {/* Hero / Intro */}
        <div className="mb-8 sm:mb-10 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight text-slate-900">
              AI Tender Wizard
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              Van leidraad naar volledige EMVI-bundel, inclusief matrices, KPI’s en risicodossier.
            </p>
          </div>
          <div className="mt-1 sm:mt-0 flex flex-col items-start sm:items-end gap-1 text-xs">
            <span className="text-slate-500">
              Fase <span className="font-medium text-slate-900">{step}</span> van 4
            </span>
            <div className="flex items-center gap-1 text-[11px] text-slate-400">
              <span>Upload</span>·<span>Bedrijf</span>·<span>Details</span>·<span>Review</span>
            </div>
          </div>
        </div>

        {/* Progress */}
        <div className="mb-6">
          <div className="flex items-center justify-between text-[11px] text-slate-500">
            <span>Workflow voortgang</span>
            <span>{progressPct}% voltooid</span>
          </div>
          <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-slate-200/80">
            <div
              className="h-full rounded-full bg-slate-900 transition-all"
              style={{ width: `${progressPct}%` }}
            />
          </div>
        </div>

        {/* Main card */}
        <AppleCard className="p-5 sm:p-7 space-y-6">
          {step === 1 && (
            <StepUpload
              form={form}
              extracted={extracted}
              onNext={() => setStep(2)}
              handleUpload={handleUpload}
              uploads={uploads}
              setValue={setValue}
              uploadWarnings={uploadWarnings}
              runExtract={async () => {
                setLoadingVisible(true);
                setProgress(8, 'Analyseren (extract)…');
                const out = await runExtract();
                setProgress(100, 'Gereed');
                setTimeout(() => setLoadingVisible(false), 400);
                return out;
              }}
              loading={loading}
              error={error}
            />
          )}

          {step === 2 && (
            <StepCompany
              form={form}
              setValue={setValue}
              onPrev={() => setStep(1)}
              onNext={() => setStep(3)}
            />
          )}

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

          {step === 4 && (
            <section className="space-y-6">
              <AppleSectionHeader
                icon={<CheckCircle2 size={16} />}
                title="Stap 4 — Review & export"
                subtitle="Controleer de validatie, kwaliteitsscore en download de volledige bundel."
              />

              {error && (
                <div className="rounded-3xl border border-red-200 bg-red-50/80 px-4 py-3 text-xs sm:text-sm text-red-700">
                  {error}
                </div>
              )}

              {validation && (
                <div className="rounded-3xl border border-slate-200 bg-white/90 p-4 sm:p-5 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-slate-900">Validatie</span>
                    <span
                      className={`inline-flex items-center gap-1 rounded-2xl px-2 py-0.5 text-[11px] ${
                        validation.ok
                          ? 'bg-emerald-50 text-emerald-700'
                          : 'bg-amber-50 text-amber-700'
                      }`}
                    >
                      {validation.ok ? (
                        <>
                          <CheckCircle2 size={12} /> OK
                        </>
                      ) : (
                        <>
                          <AlertTriangle size={12} /> Let op
                        </>
                      )}
                    </span>
                  </div>
                  <ul className="mt-1 list-disc space-y-1 pl-5 text-xs sm:text-sm text-slate-700">
                    {validation.messages.map((m, i) => (
                      <li
                        key={i}
                        className={validation.ok ? 'text-emerald-700' : 'text-amber-700'}
                      >
                        {m}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {score && (
                <div className="rounded-3xl border border-slate-200 bg-white/90 p-4 sm:p-5 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-slate-900">Kwaliteitsscore</span>
                    <span className="text-2xl font-semibold text-slate-900">
                      {score.score}/100
                    </span>
                  </div>
                  <ul className="mt-2 list-disc space-y-1 pl-5 text-xs sm:text-sm text-slate-700">
                    {score.notes.map((n, i) => (
                      <li key={i}>{n}</li>
                    ))}
                  </ul>
                </div>
              )}

              {result && (
                <div className="rounded-3xl border border-slate-200 bg-slate-50/80 p-4 sm:p-5">
                  <h3 className="mb-2 text-sm font-medium text-slate-900">EMVI Preview</h3>
                  <div className="prose prose-sm max-w-none text-slate-900">
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>{result}</ReactMarkdown>
                  </div>
                </div>
              )}

              <div className="flex flex-wrap gap-3 pt-1">
                {downloadUrl && (
                  <a
                    href={downloadUrl}
                    className="inline-flex items-center gap-1.5 rounded-2xl bg-slate-900 px-4 py-2 text-xs sm:text-sm font-medium text-white shadow-sm"
                  >
                    <DownloadCloud size={14} /> Download ZIP
                  </a>
                )}
                {result && (
                  <>
                    <button
                      type="button"
                      onClick={copyToClipboard}
                      className="inline-flex items-center gap-1.5 rounded-2xl border border-slate-200 bg-white px-4 py-2 text-xs sm:text-sm font-medium text-slate-700 hover:border-slate-900/40 hover:bg-slate-50 transition"
                    >
                      <ClipboardList size={14} /> Kopieer tekst
                    </button>
                    <button
                      type="button"
                      onClick={exportDocx}
                      className="inline-flex items-center gap-1.5 rounded-2xl border border-slate-200 bg-white px-4 py-2 text-xs sm:text-sm font-medium text-slate-700 hover:border-slate-900/40 hover:bg-slate-50 transition"
                    >
                      <FileText size={14} /> Exporteer DOCX
                    </button>
                  </>
                )}
                <button
                  type="button"
                  onClick={() => {
                    localStorage.removeItem('wizard-values-v2');
                    localStorage.removeItem('wizard-upload-v2');
                    setUploads([]);
                    setExtracted(null);
                    setExtractedNotes('');
                    setUploadWarnings([]);
                    setCoverage(null);
                    setResult(null);
                    setValidation(null);
                    setScore(null);
                    if (downloadUrl) {
                      URL.revokeObjectURL(downloadUrl);
                      setDownloadUrl('');
                    }
                    setError(null);
                    setStep(1);
                  }}
                  className="inline-flex items-center gap-1.5 rounded-2xl bg-slate-900/5 px-4 py-2 text-xs sm:text-sm font-medium text-slate-800 hover:bg-slate-900/10 transition"
                >
                  <RefreshCcw size={14} /> Nieuwe aanbesteding
                </button>
              </div>
            </section>
          )}
        </AppleCard>
      </main>
    </div>
  );
}