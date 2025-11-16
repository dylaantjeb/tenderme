"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Link from "next/link";

const clientLogos = [
  "Acme Corp",
  "TechFlow",
  "BuildCo",
  "InnovateLab",
  "FutureTech",
  "SmartSolutions",
  "NextGen",
  "ProBuild",
  "TechVision",
  "GlobalTech",
];

export function HeroSection() {
  return (
    <section className="relative overflow-hidden gradient-bg">
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/5" />

      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
        <div className="text-center max-w-4xl mx-auto">
          {/* Hero headline */}
          <motion.h1
            className="text-4xl sm:text-5xl lg:text-7xl font-bold text-foreground mb-6 text-balance"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Win tenders with AI — <span className="text-primary">in minutes</span>
          </motion.h1>

          {/* Badge row */}
          <motion.div
            className="flex flex-wrap items-center justify-center gap-2 mb-4"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            {["DOCX", "PDF", "XLSX", "ZIP"].map((b) => (
              <span
                key={b}
                className="inline-flex items-center rounded-full border border-border px-3 py-1 text-xs tracking-wide bg-card"
              >
                {b}
              </span>
            ))}
          </motion.div>

          {/* Hero subtitle */}
          <motion.p
            className="text-lg sm:text-xl lg:text-2xl text-muted-foreground mb-6 max-w-3xl mx-auto text-pretty"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Genereer een complete inschrijfbundel: <b>EMVI/voorstel</b>, <b>Compliance Matrix</b>,{" "}
            <b>Planning</b>, <b>KPI/SLA</b> en <b>Risicoregister</b> — klaar om direct in te dienen.
          </motion.p>

          {/* Language hint */}
          <motion.p
            className="text-sm text-muted-foreground mb-10"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            Works in <span className="font-medium">Dutch, English, German, French</span>
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-20"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Link href="/wizard">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 text-lg">
                Start wizard
              </Button>
            </Link>
            <Link href="/pricing">
              <Button
                size="lg"
                variant="outline"
                className="border-border hover:bg-secondary px-8 py-6 text-lg bg-transparent"
              >
                View Pricing
              </Button>
            </Link>
          </motion.div>

          {/* Mini steps (inline) */}
          <motion.div
            className="text-sm text-muted-foreground"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <span className="inline-block">1. Account</span> ·{" "}
            <span className="inline-block">2. Upload documenten</span> ·{" "}
            <span className="inline-block">3. Bedrijfsinfo</span> ·{" "}
            <span className="inline-block">4. AI voorstel</span> ·{" "}
            <span className="inline-block">5. Review & export</span>
          </motion.div>
        </div>

        {/* Client logos marquee */}
        <motion.div
          className="mt-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <p className="text-center text-muted-foreground mb-8 text-sm uppercase tracking-wider">
            Trusted by leading companies
          </p>
          <div className="relative overflow-hidden">
            <div className="flex animate-marquee space-x-8">
              {[...clientLogos, ...clientLogos].map((logo, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 bg-slate-800/80 backdrop-blur-sm border border-slate-700/50 rounded-lg px-6 py-4 min-w-[160px] text-center"
                >
                  <span className="text-slate-100 font-medium">{logo}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}