'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle2, Sparkles, FileText, Wand2, ShieldCheck, LineChart } from 'lucide-react';

/* =========================================================================
   Design tokens (Apple-style)
   ========================================================================= */

const primary = 'from-slate-900 to-slate-800';
const accent = 'bg-slate-900 text-white';
const subtleBorder = 'border border-slate-200/70 dark:border-slate-800/80';
const cardBase =
  'rounded-3xl bg-white/80 dark:bg-slate-900/70 shadow-[0_18px_60px_rgba(15,23,42,0.08)] backdrop-blur-xl ' +
  subtleBorder;

/* =========================================================================
   Page
   ========================================================================= */

export default function TenderMeLandingPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-50">
      <GradientBackground />

      <div className="relative z-10 flex min-h-screen flex-col">
        <Header />

        <main className="flex-1">
          <Hero />
          <TrustedBy />
          <ProblemSolution />
          <FlowSection />
          <FeatureBlocks />
          <WizardPreview />
          <PricingTeaser />
          <FinalCta />
        </main>

        <Footer />
      </div>
    </div>
  );
}

/* =========================================================================
   Header / Navbar
   ========================================================================= */

function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/60 bg-slate-50/80 backdrop-blur-xl dark:border-slate-800/80 dark:bg-slate-950/70">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-0">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-2xl bg-slate-900 text-white shadow-sm">
            <Sparkles size={16} />
          </div>
          <div className="flex flex-col leading-tight">
            <span className="text-sm font-semibold tracking-tight">TenderMe</span>
            <span className="text-[11px] tracking-[0.18em] text-slate-500">
               by Digital Ease
            </span>
          </div>
        </div>

        <nav className="hidden items-center gap-8 text-sm text-slate-600 dark:text-slate-300 md:flex">
          <a href="#features" className="hover:text-slate-900 dark:hover:text-white">
            Functionaliteit
          </a>
          <a href="#flow" className="hover:text-slate-900 dark:hover:text-white">
            Werkwijze
          </a>
          <a href="#pricing" className="hover:text-slate-900 dark:hover:text-white">
            Prijzen
          </a>
          <a href="#faq" className="hover:text-slate-900 dark:hover:text-white">
            Veelgestelde vragen
          </a>
        </nav>

        <div className="flex items-center gap-3">
          <a
            href="/login"
            className="hidden text-sm text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white md:inline-flex"
          >
            Inloggen
          </a>
          <a
            href="/wizard"
            className="inline-flex items-center gap-1.5 rounded-full bg-slate-900 px-4 py-1.5 text-xs font-medium text-white shadow-sm hover:bg-black"
          >
            Probeer de EMVI-wizard
            <ArrowRight size={14} />
          </a>
        </div>
      </div>
    </header>
  );
}

/* =========================================================================
   Hero
   ========================================================================= */

function Hero() {
  return (
    <section className="mx-auto max-w-6xl px-4 pb-16 pt-10 sm:px-6 lg:px-0 lg:pb-20 lg:pt-16">
      <div className="grid items-center gap-10 lg:grid-cols-1">
        {/* Left: text */}
        <div className="space-y-7">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/70 px-3 py-1 text-[11px] text-slate-500 shadow-sm backdrop-blur"
          >
            <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-slate-900 text-[10px] font-semibold text-white">
              AI
            </span>
            <span>EMVI-plannen in één AI-tenderstudio</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
            className="space-y-4"
          >
            <h1 className="text-balance text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl md:text-[2.6rem] md:leading-[1.05] dark:text-slate-50">
              Schrijf winnende EMVI-plannen
              <br className="hidden sm:block" />
              met TenderMe als AI-tenderstudio.
            </h1>
            <p className="max-w-md text-sm leading-relaxed text-slate-600 sm:text-[15px] dark:text-slate-300">
              Upload de leidraad, doorloop een korte wizard en ontvang een complete EMVI-bundel in
              minuten in plaats van weken. Inclusief EMVI-plan, risicodossier, KPI&apos;s en
              compliance-matrix.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.18, ease: 'easeOut' }}
            className="flex flex-wrap items-center gap-3"
          >
            <a
              href="/wizard"
              className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-5 py-2.5 text-sm font-medium text-white shadow-lg shadow-slate-900/10 hover:bg-black"
            >
              Probeer de EMVI-wizard
              <ArrowRight size={16} />
            </a>
            <a
              href="/wizard?demo=1"
              className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/70 px-4 py-2 text-xs font-medium text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-900/80 dark:text-slate-200 dark:hover:bg-slate-900"
            >
              Bekijk productdemo
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.26, ease: 'easeOut' }}
            className="flex flex-wrap gap-6 pt-1 text-xs text-slate-500"
          >
            <Metric label="Tijdswinst per tender" value="± 60% minder schrijftijd" />
            <Metric label="Gem. EMVI-score" value="8,3 / 10 (bestaande klanten)" />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.32, ease: 'easeOut' }}
            className="text-[11px] text-slate-500"
          >
            Geen implementatieproject. Maak een proefaccount aan, upload één leidraad en test de
            wizard op je eerstvolgende tender.
          </motion.p>
        </div>

      </div>
    </section>
  );
}

/* =========================================================================
   Trusted by
   ========================================================================= */

function TrustedBy() {
  return (
    <section className="mx-auto max-w-6xl px-4 pb-12 sm:px-6 lg:px-0">
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-3xl border border-slate-200 bg-white/70 px-4 py-4 text-[11px] text-slate-500 shadow-sm backdrop-blur dark:border-slate-800 dark:bg-slate-900/60">
        <span className="font-medium text-slate-600 dark:text-slate-300">
          Vertrouwd door teams in IT, facility en overheidsadvies
        </span>
        <div className="flex flex-wrap gap-4 text-[10px] uppercase tracking-[0.16em] text-slate-400">
          <span>ICT-dienstverleners</span>
          <span>Consultancy</span>
          <span>Detachering</span>
          <span>MKB & scale-ups</span>
        </div>
      </div>
    </section>
  );
}

/* =========================================================================
   Problem / Solution
   ========================================================================= */

function ProblemSolution() {
  return (
    <section className="mx-auto max-w-6xl px-4 pb-16 sm:px-6 lg:px-0">
      <div className="grid gap-8 lg:grid-cols-2">
        <div className="space-y-4">
          <h2 className="text-lg font-semibold tracking-tight text-slate-900 dark:text-slate-50">
            Vandaag: Excel-lijsten, losse Word-files en nachtwerk
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-300">
            Elke aanbesteding lijkt opnieuw uitvinden van het wiel. Leidraad lezen, eisen
            markeren, structuur bedenken, teksten schrijven, checken, herschrijven… En dan
            hopen dat er geen KO-vereiste of placeholder is blijven staan.
          </p>
          <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-300">
            <li className="flex gap-2">
              <span className="mt-[5px] h-[5px] w-[5px] rounded-full bg-slate-500" />
              Tenderteams verliezen dagen aan structuren, niet aan inhoudelijke scherpte.
            </li>
            <li className="flex gap-2">
              <span className="mt-[5px] h-[5px] w-[5px] rounded-full bg-slate-500" />
              Kennis zit in hoofden en oude documenten, niet in één centrale omgeving.
            </li>
            <li className="flex gap-2">
              <span className="mt-[5px] h-[5px] w-[5px] rounded-full bg-slate-500" />
              EMVI-plannen zijn moeilijk consistent tussen aanbestedingen en schrijvers.
            </li>
          </ul>
        </div>

        <div className={`${cardBase} p-5 sm:p-6`}>
          <h3 className="mb-3 text-sm font-semibold text-slate-900 dark:text-slate-50">
            Met TenderMe wordt de AI jouw tenderstudio
          </h3>
          <div className="space-y-3 text-sm text-slate-600 dark:text-slate-200">
            <div className="flex gap-3">
              <CheckCircle2 className="mt-0.5 h-4 w-4 text-emerald-500" />
              <div>
                <p className="font-medium text-slate-900 dark:text-white">
                  Eén wizard voor leidraad → structuur → teksten
                </p>
                <p className="text-xs text-slate-600 dark:text-slate-300">
                  Upload leidraad, vul kerngegevens in en TenderMe genereert concept-EMVI,
                  risicodossier, KPI&apos;s en compliance-matrix in één flow.
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <CheckCircle2 className="mt-0.5 h-4 w-4 text-emerald-500" />
              <div>
                <p className="font-medium text-slate-900 dark:text-white">
                  Geborgd op KO-eisen en beoordelingskader
                </p>
                <p className="text-xs text-slate-600 dark:text-slate-300">
                  De AI checkt op KO-vereisten, consistentie, placeholders en geeft een
                  kwaliteitsscore voordat je indient.
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <CheckCircle2 className="mt-0.5 h-4 w-4 text-emerald-500" />
              <div>
                <p className="font-medium text-slate-900 dark:text-white">
                  Klaar voor IT-, facility- en dienstverleningstenders
                </p>
                <p className="text-xs text-slate-600 dark:text-slate-300">
                  Geoptimaliseerd voor raamovereenkomsten, ICT-beheer, servicecontracten en
                  detachering, in helder Nederlands of zakelijk Engels.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* =========================================================================
   Flow (3 stappen)
   ========================================================================= */

function FlowSection() {
  const steps = [
    {
      title: '1. Upload & herkenning',
      icon: FileText,
      text: 'Upload leidraad/programma van eisen. TenderMe herkent opdrachtgever, deadlines, KO-vereisten en kernonderdelen.',
    },
    {
      title: '2. Wizard & fine-tuning',
      icon: Wand2,
      text: 'Vul bedrijfsspecifieke info in (referenties, aanpak, SLA’s). De AI bouwt volledig consistente plannen en dashboards.',
    },
    {
      title: '3. Export & controle',
      icon: ShieldCheck,
      text: 'Exporteer Word/PDF-bundels, bekijk validatierapport en voorkom KO-fouten, losse placeholders of lege paragrafen.',
    },
  ];

  return (
    <section id="flow" className="mx-auto max-w-6xl px-4 pb-16 sm:px-6 lg:px-0">
      <div className="mb-6 flex items-center justify-between gap-4">
        <h2 className="text-lg font-semibold tracking-tight text-slate-900 dark:text-slate-50">
          Van leidraad naar complete tenderbundel in 3 stappen
        </h2>
        <p className="hidden text-xs text-slate-500 md:block">
          Ontworpen voor tenderteams die structureel willen opschalen.
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-3">
        {steps.map((step, idx) => (
          <motion.div
            key={step.title}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: idx * 0.08, ease: 'easeOut' }}
            className={`${cardBase} relative p-4 sm:p-5`}
          >
            <div className="mb-4 flex items-center justify-between">
              <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-slate-900 text-white">
                <step.icon size={16} />
              </div>
              <span className="text-xs font-medium text-slate-400">Stap {idx + 1}</span>
            </div>
            <p className="mb-1 text-sm font-medium text-slate-900 dark:text-slate-50">
              {step.title}
            </p>
            <p className="text-xs leading-relaxed text-slate-600 dark:text-slate-300">
              {step.text}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

/* =========================================================================
   Feature blocks
   ========================================================================= */

function FeatureBlocks() {
  const features = [
    {
      icon: LineChart,
      title: 'EMVI-scores simuleren',
      text: 'Laat de AI per criterium inschatten waar je plan sterk/zwak staat en waar extra bewijslast nodig is.',
    },
    {
      icon: ShieldCheck,
      title: 'KO- & compliance-bewaking',
      text: 'Automatische checks op KO-vereisten, verplichte bijlagen en eisen per paragraaf.',
    },
    {
      icon: Sparkles,
      title: 'Stijlvaste AI-teksten',
      text: 'Herbruikbare tone-of-voice per opdrachtgever, sector of type dienstverlening.',
    },
    {
      icon: ShieldCheck,
      title: 'Data & beveiliging',
      text: 'Documenten worden alleen gebruikt voor jouw tender. AVG-first, optioneel uit te breiden met ISO 27001-kaders.',
    },
  ];

  return (
    <section id="features" className="mx-auto max-w-6xl px-4 pb-16 sm:px-6 lg:px-0">
      <div className="mb-6 flex items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-semibold tracking-tight text-slate-900 dark:text-slate-50">
            Gemaakt voor EMVI, niet voor losse AI-prompts
          </h2>
          <p className="text-xs text-slate-500">
            TenderMe is een gespecialiseerde studio bovenop grote taalmodellen.
          </p>
        </div>
      </div>

      <div className="grid gap-5 md:grid-cols-4 md:auto-rows-fr">
        {features.map((f, idx) => (
          <motion.div
            key={f.title}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: idx * 0.09, ease: 'easeOut' }}
            className={`${cardBase} p-4 sm:p-5 flex flex-col`}
          >
            <div className="mb-3 flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-2xl bg-slate-900 text-white">
                <f.icon size={16} />
              </div>
              <p className="text-sm font-medium text-slate-900 dark:text-slate-50">
                {f.title}
              </p>
            </div>
            <p className="text-xs leading-relaxed text-slate-600 dark:text-slate-300 flex-1">{f.text}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

/* =========================================================================
   Wizard preview (Apple-style “product hero”)
   ========================================================================= */

function WizardPreview() {
  return (
    <section className="mx-auto max-w-6xl px-4 pb-16 sm:px-6 lg:px-0">
      <div className={`${cardBase} overflow-hidden p-0`}>
        <div className="grid gap-0 md:grid-cols-[1.1fr_0.9fr]">
          <div className="border-b border-slate-200/80 p-5 sm:p-6 md:border-b-0 md:border-r dark:border-slate-800/80">
            <h3 className="mb-2 text-sm font-semibold text-slate-900 dark:text-slate-50">
              De TenderMe-wizard: alles in één flow
            </h3>
            <p className="mb-4 text-xs leading-relaxed text-slate-600 dark:text-slate-300">
              In plaats van tien tools en losse documenten begeleidt TenderMe je door één
              vaste flow: aanbesteding uploaden, bedrijfsgegevens, eisen, risico&apos;s,
              KPI&apos;s en proof. Aan het eind staat een complete bundel klaar die je direct
              naar Word of PDF exporteert.
            </p>
            <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-300">
              <li className="flex gap-2">
                <CheckCircle2 className="mt-[2px] h-3.5 w-3.5 text-emerald-500" />
                Fases: Upload → Bedrijf → Eisen → Bundel & validatie.
              </li>
              <li className="flex gap-2">
                <CheckCircle2 className="mt-[2px] h-3.5 w-3.5 text-emerald-500" />
                EMVI-plan, risicoregister, KPI/SLA, compliance-matrix & bundel in één keer.
              </li>
              <li className="flex gap-2">
                <CheckCircle2 className="mt-[2px] h-3.5 w-3.5 text-emerald-500" />
                Exporteer naar Word/PDF en deel intern met sales, operatie en directie.
              </li>
            </ul>
            <div className="mt-4 flex flex-wrap gap-3">
              <a
                href="/wizard"
                className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-4 py-2 text-xs font-medium text-white shadow hover:bg-black"
              >
                Open de EMVI-wizard
                <ArrowRight size={14} />
              </a>
              <a
                href="/wizard?demo=1"
                className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-4 py-2 text-[11px] font-medium text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-900"
              >
                Bekijk korte demo
              </a>
            </div>
          </div>

          {/* Fake UI preview */}
          <div className="relative bg-slate-900/95 p-4 sm:p-5">
            <div className="mb-3 flex items-center justify-between text-[11px] text-slate-300">
              <span>TenderMe · Wizard</span>
              <span className="rounded-full bg-slate-800 px-2 py-0.5 text-[10px] text-slate-200">
                Fase 3 · Details & eisen
              </span>
            </div>
            <div className="space-y-3 text-[11px] text-slate-100">
              <div className="flex gap-1.5">
                <span className="rounded-full bg-white/10 px-2 py-0.5">Eisen</span>
                <span className="rounded-full bg-white/5 px-2 py-0.5 text-slate-400">
                  Compliance
                </span>
                <span className="rounded-full bg-white/5 px-2 py-0.5 text-slate-400">
                  Risico&apos;s
                </span>
              </div>
              <div className="rounded-2xl bg-slate-800/80 p-3">
                <p className="mb-2 text-[11px] font-medium text-slate-50">
                  Belangrijke eisen (extract)
                </p>
                <ul className="space-y-1.5 text-[10px] text-slate-200">
                  <li>• KO: ISO 27001 gecertificeerd</li>
                  <li>• KO: 24/7 service & responstijd P1 &lt; 30 minuten</li>
                  <li>• SLA: Beschikbaarheid 99,8% per maand</li>
                </ul>
              </div>
              <div className="grid grid-cols-3 gap-2 text-[10px]">
                <StatChip label="KO gedekt" value="100%" />
                <StatChip label="Eisen" value="31 / 31" />
                <StatChip label="KPI's" value="7 actief" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* =========================================================================
   Pricing teaser
   ========================================================================= */

function PricingTeaser() {
  return (
    <section id="pricing" className="mx-auto max-w-6xl px-4 pb-16 sm:px-6 lg:px-0">
      <div className="mb-5 flex items-center justify-between gap-4">
        <h2 className="text-lg font-semibold tracking-tight text-slate-900 dark:text-slate-50">
          Eenvoudige pricing, schaalbaar voor jouw tendervolume
        </h2>
        <p className="hidden text-xs text-slate-500 md:block">
          Start met een klein team, schaal op zodra TenderMe structureel wordt ingezet.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-[1.1fr_0.9fr]">
        <div className={`${cardBase} p-5 sm:p-6`}>
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-slate-500">
            Aanbevolen
          </p>
          <h3 className="mt-1 text-sm font-semibold text-slate-900 dark:text-slate-50">
            Professional · voor serieuze tenderteams
          </h3>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
            Ideaal wanneer je maandelijks meerdere aanbestedingen uitwerkt en EMVI-kwaliteit
            structureel wilt verhogen.
          </p>
          <div className="mt-4 flex items-baseline gap-1">
            <span className="text-2xl font-semibold text-slate-900 dark:text-slate-50">
              € 199
            </span>
            <span className="text-xs text-slate-500">per maand · excl. btw</span>
          </div>
          <ul className="mt-4 space-y-2 text-xs text-slate-600 dark:text-slate-300">
            <li className="flex gap-2">
              <CheckCircle2 className="mt-[2px] h-3.5 w-3.5 text-emerald-500" />
              EMVI-wizard, risico&apos;s, KPI&apos;s, compliance & bundels
            </li>
            <li className="flex gap-2">
              <CheckCircle2 className="mt-[2px] h-3.5 w-3.5 text-emerald-500" />
              Tot 5 gebruikers · onbeperkt concepten
            </li>
            <li className="flex gap-2">
              <CheckCircle2 className="mt-[2px] h-3.5 w-3.5 text-emerald-500" />
              Export naar Word/PDF + validatie & score
            </li>
          </ul>
          <a
            href="mailto:info@digitalease.nl?subject=Demo%20TenderMe"
            className="mt-5 inline-flex items-center gap-2 rounded-full bg-slate-900 px-5 py-2 text-xs font-medium text-white shadow hover:bg-black"
          >
            Plan een demo
            <ArrowRight size={14} />
          </a>
        </div>

        <div className="flex flex-col justify-between gap-4 rounded-3xl border border-dashed border-slate-300/80 p-5 text-xs text-slate-600 dark:border-slate-700 dark:text-slate-300">
          <div>
            <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-slate-500">
              Scale & Enterprise
            </p>
            <p className="mt-1 text-sm font-semibold text-slate-900 dark:text-slate-50">
              Voor bureaus en organisaties met hoge tenderfrequentie
            </p>
            <p className="mt-2 text-xs leading-relaxed">
              Voor tenderbureaus, grote IT-dienstverleners en consultancybedrijven
              richten we TenderMe desgewenst in met eigen templates, beoordelingskaders,
              sector-specifieke bibliotheken en SSO.
            </p>
          </div>
          <div>
            <p className="mb-1 text-[11px] font-medium text-slate-500">Op aanvraag</p>
            <a
              href="mailto:info@digitalease.nl?subject=Adviesgesprek%20TenderMe"
              className="inline-flex items-center gap-2 rounded-full border border-slate-300 px-4 py-1.5 text-[11px] font-medium text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-900"
            >
              Plan een adviesgesprek
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* =========================================================================
   Final CTA
   ========================================================================= */

function FinalCta() {
  return (
    <section className="mx-auto max-w-6xl px-4 pb-16 sm:px-6 lg:px-0">
      <div className={`${accent} rounded-3xl px-5 py-6 sm:px-6 sm:py-7`}>
        <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-slate-300">
              Binnen één tender merk je het verschil
            </p>
            <h3 className="mt-1 text-[15px] font-semibold">
              Start met je eerstvolgende aanbesteding in TenderMe en vergelijk de score.
            </h3>
            <p className="mt-1 text-xs text-slate-300">
              Geen langdurig traject. Gewoon een proefaccount, een leidraad en je eerste
              EMVI-bundel via de wizard.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <a
              href="/wizard?demo=1"
              className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-medium text-slate-900 shadow-sm hover:bg-slate-100"
            >
              Maak een proefaccount aan
              <ArrowRight size={14} />
            </a>
            <a
              href="mailto:info@digitalease.nl?subject=Productdemo%20TenderMe"
              className="inline-flex items-center gap-2 rounded-full border border-white/40 px-4 py-2 text-xs font-medium text-slate-100 hover:bg-white/10"
            >
              Vraag een productdemo aan
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* =========================================================================
   Footer
   ========================================================================= */

function Footer() {
  return (
    <footer className="border-t border-slate-200/70 bg-slate-50/70 py-6 text-[11px] text-slate-500 dark:border-slate-800/80 dark:bg-slate-950/80">
      <div className="mx-auto flex max-w-6xl flex-col justify-between gap-3 px-4 sm:flex-row sm:px-6 lg:px-0">
        <div className="flex items-center gap-2">
          <span className="font-medium text-slate-700 dark:text-slate-200">TenderMe</span>
          <span className="text-slate-400">· by Digital Ease</span>
        </div>
        <div className="flex flex-wrap gap-4">
          <a href="#" className="hover:text-slate-800 dark:hover:text-slate-200">
            Privacy
          </a>
          <a href="#" className="hover:text-slate-800 dark:hover:text-slate-200">
            Algemene voorwaarden
          </a>
          <a href="mailto:info@digitalease.nl" className="hover:text-slate-800 dark:hover:text-slate-200">
            Contact
          </a>
        </div>
      </div>
    </footer>
  );
}

/* =========================================================================
   Small components
   ========================================================================= */

function GradientBackground() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0 bg-[radial-gradient(circle_at_top,_rgba(15,23,42,0.12),_transparent_55%),radial-gradient(circle_at_bottom,_rgba(148,163,184,0.22),_transparent_55%)]"
    />
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="space-y-0.5">
      <p className="text-[11px] text-slate-500">{label}</p>
      <p className="text-sm font-semibold text-slate-900 dark:text-slate-50">{value}</p>
    </div>
  );
}


function StatChip({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl bg-slate-800/80 px-3 py-1.5 text-[10px] text-slate-100">
      <p className="text-[9px] uppercase tracking-[0.16em] text-slate-400">{label}</p>
      <p className="mt-0.5 font-medium">{value}</p>
    </div>
  );
}