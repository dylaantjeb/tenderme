"use client";

import { CheckCircle2, FileUp, Building2, Wand2, Download } from "lucide-react";

const steps = [
  {
    id: 1,
    title: "Create Account",
    desc: "Registreer je bedrijf en sla je basisprofiel (contact, certificeringen, USP’s) op.",
    Icon: Building2,
  },
  {
    id: 2,
    title: "Upload Documents",
    desc: "Upload PvE/leidraad/bijlagen. We lezen automatisch eisen, KO’s en deadlines uit.",
    Icon: FileUp,
  },
  {
    id: 3,
    title: "Add Company Info",
    desc: "Vul team, referenties, planning en risico’s aan voor maximale relevantie.",
    Icon: CheckCircle2,
  },
  {
    id: 4,
    title: "AI Proposal",
    desc: "Onze AI maakt een compleet voorstel, compliance matrix en checklist.",
    Icon: Wand2,
  },
  {
    id: 5,
    title: "Review & Export",
    desc: "Controleer, werk samen en exporteer naar DOCX/PDF/XLSX voor inzending.",
    Icon: Download,
  },
];

export function StepsSection() {
  return (
    <section className="relative py-20">
      <div className="container mx-auto max-w-6xl px-6">
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-semibold tracking-tight">How it works</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Vijf heldere stappen van upload tot winnende inzending.
          </p>
        </div>

        {/* Steps */}
        <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {steps.map(({ id, title, desc, Icon }) => (
            <li
              key={id}
              className="relative rounded-2xl border bg-card p-5 shadow-sm transition hover:shadow-md"
            >
              <div className="mb-3 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl border bg-background">
                  <Icon className="h-5 w-5" aria-hidden />
                </div>
                <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold">
                  {id}
                </span>
              </div>
              <h3 className="text-base font-semibold leading-snug">{title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{desc}</p>

              {/* Connector (desktop) */}
              {id !== steps.length && (
                <span
                  aria-hidden
                  className="absolute right-[-12px] top-12 hidden h-[2px] w-6 rounded bg-border lg:block"
                />
              )}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}