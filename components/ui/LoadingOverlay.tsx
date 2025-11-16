// components/ui/LoadingOverlay.tsx
"use client";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const steps = [
  "Executive Summary opstellen...",
  "EMVI-plan schrijven...",
  "Compliance Matrix samenstellen...",
  "Planning & mijlpalen opstellen...",
  "KPI's & SLA's definiëren...",
  "Risico’s in kaart brengen...",
  "Aannames & uitsluitingen toevoegen...",
  "Clarificatievragen genereren...",
];

export default function LoadingOverlay({ visible }: { visible: boolean }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!visible) {
      setProgress(0);
      return;
    }
    let i = 0;
    const interval = setInterval(() => {
      setProgress((p) => Math.min(p + 100 / steps.length, 100));
      i++;
      if (i >= steps.length) clearInterval(interval);
    }, 1500); // elke 1.5s naar volgende stap
    return () => clearInterval(interval);
  }, [visible]);

  if (!visible) return null;

  const currentStep = steps[Math.min(Math.floor((progress / 100) * steps.length), steps.length - 1)];

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex flex-col items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-neutral-900 shadow-xl rounded-2xl p-8 w-[90%] max-w-md text-center"
      >
        <h2 className="text-xl font-semibold mb-4">Documenten worden gegenereerd...</h2>

        {/* Progress bar */}
        <div className="w-full bg-neutral-200 dark:bg-neutral-700 rounded-full h-3 mb-3 overflow-hidden">
          <motion.div
            className="bg-blue-600 h-3"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ ease: "easeInOut", duration: 0.6 }}
          />
        </div>

        <p className="text-sm text-neutral-600 dark:text-neutral-300">{currentStep}</p>
      </motion.div>
    </div>
  );
}