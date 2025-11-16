'use client';
import { useEffect, useState } from 'react';

export default function GenerationDetail({ params }: { params: { id: string } }) {
  const { id } = params;
  const [job, setJob] = useState<any>(null);

  useEffect(() => {
    let t = setInterval(async () => {
      const r = await fetch(`/api/generations/${id}`);
      if (r.ok) {
        const j = await r.json();
        setJob(j);
        if (j.status === 'DONE' || j.status === 'FAILED') clearInterval(t);
      }
    }, 1500);
    return () => clearInterval(t);
  }, [id]);

  const pct = job?.progress ?? 0;

  return (
    <main className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-4">Generatie #{id.slice(0,8)}</h1>

      <div className="border rounded-lg p-4 mb-4">
        <div className="text-sm mb-2">{job?.message || 'Bezig…'}</div>
        <div className="h-2 bg-neutral-200 rounded">
          <div className="h-2 bg-blue-600 rounded" style={{ width: `${pct}%` }} />
        </div>
      </div>

      {job?.status === 'DONE' && (
        <div className="space-y-3">
          {job.zipPath && (
            <a className="btn" href={job.zipPath}>Download ZIP</a>
          )}
          {job.previewJson && (
            <pre className="whitespace-pre-wrap text-sm border rounded p-3 bg-neutral-50">
              {JSON.parse(job.previewJson)['EMVI.md']}
            </pre>
          )}
        </div>
      )}

      {job?.status === 'FAILED' && (
        <div className="text-red-600">Mislukt: {job?.message}</div>
      )}
    </main>
  );
}