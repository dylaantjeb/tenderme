'use client';
import useSWR from 'swr';

const fetcher = (url:string)=>fetch(url).then(r=>r.json());

export default function GenerationsPage() {
  const { data, isLoading } = useSWR('/api/generations', fetcher, { refreshInterval: 2000 });
  if (isLoading) return <div className="p-6">Laden…</div>;
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-4">Generaties</h1>
      <div className="space-y-3">
        {data?.map((j:any)=>(
          <div key={j.id} className="border rounded-xl p-4 flex items-center justify-between">
            <div>
              <div className="text-sm opacity-70">{new Date(j.createdAt).toLocaleString()}</div>
              <div className="font-medium">{j.status} — {j.message ?? ''}</div>
              <div className="w-64 h-2 bg-gray-200 rounded mt-2 overflow-hidden">
                <div className="h-2 bg-blue-600" style={{width:`${j.progress||0}%`}}/>
              </div>
            </div>
            <div>
              {j.status==='DONE' ? (
                <a className="px-3 py-2 rounded bg-green-600 text-white" href={j.zipPath} download>Download ZIP</a>
              ) : (
                <span className="text-sm text-gray-500">Bezig…</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}