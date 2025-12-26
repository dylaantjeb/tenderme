"use client";

import { useEffect, useState } from "react";

type Issue = {
  code: string;
  severity: "BLOCKER" | "WARN";
  message: string;
  hint?: string;
  locations?: string[];
};

type Report = {
  score: number;
  blockers: Issue[];
  warnings: Issue[];
};

export default function TenderReadyPanel({
  emviText,
  criteriaTitles = [],
}: {
  emviText: string;
  criteriaTitles?: string[];
}) {
  const [report, setReport] = useState<Report | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!emviText || emviText.length < 200) return;

    const run = async () => {
      setLoading(true);
      const res = await fetch("/api/validate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ emviText, criteriaTitles }),
      });
      const data = await res.json();
      setReport(data);
      setLoading(false);
    };

    run();
  }, [emviText, criteriaTitles.join("|")]);

  if (!emviText) return null;

  return (
    <div className="rounded-2xl border p-4 space-y-3">
      <div className="flex items-center justify-between">
        <div className="font-semibold">Ready-to-submit check</div>
        <div className="text-sm opacity-70">
          {loading ? "Controleren..." : report ? `Score: ${report.score}/100` : ""}
        </div>
      </div>

      {report?.blockers?.length ? (
        <div className="rounded-xl border p-3">
          <div className="font-semibold mb-2">Blockers (moet je fixen)</div>
          <ul className="space-y-2">
            {report.blockers.map((b, i) => (
              <li key={i}>
                <div className="font-medium">{b.message}</div>
                {b.hint && <div className="text-sm opacity-70">{b.hint}</div>}
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      {report?.warnings?.length ? (
        <div className="rounded-xl border p-3">
          <div className="font-semibold mb-2">Verbeterpunten</div>
          <ul className="space-y-2">
            {report.warnings.map((w, i) => (
              <li key={i}>
                <div className="font-medium">{w.message}</div>
                {w.hint && <div className="text-sm opacity-70">{w.hint}</div>}
                {w.locations?.length ? (
                  <div className="text-xs opacity-60 mt-1">
                    Voorbeelden: {w.locations.join(" · ")}
                  </div>
                ) : null}
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      {!loading && report && report.score >= 80 && report.blockers.length === 0 ? (
        <div className="text-sm">
          ✅ Ziet er **inleverbaar** uit. Laat wel altijd iemand inhoudelijk checken of alle claims kloppen.
        </div>
      ) : null}
    </div>
  );
}