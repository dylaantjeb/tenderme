"use client";
import { useState } from "react";

export default function UploadBox({ onExtract }: { onExtract: (data:any)=>void }) {
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string| null>(null);

  async function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (!e.target.files?.[0]) return;
    setBusy(true); setErr(null);
    const fd = new FormData();
    fd.append("file", e.target.files[0]);
    const res = await fetch("/api/extract", { method:"POST", body: fd });
    const j = await res.json();
    setBusy(false);
    if (!j.ok) { setErr(j.error ?? "Mislukt"); return; }
    onExtract(j.data);
  }

  return (
    <div className="border-2 border-dashed rounded-2xl p-6 text-center">
      <input type="file" onChange={handleChange} accept=".pdf,.docx,.txt" />
      {busy && <p className="mt-2 text-sm">Bezig met inlezen…</p>}
      {err && <p className="mt-2 text-sm text-red-600">{err}</p>}
    </div>
  );
}