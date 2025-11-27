// app/api/generate/demo/route.ts
import { NextResponse } from 'next/server';

// Zorg dat Next dit niet probeert statisch te prerenderen
export const dynamic = 'force-dynamic';

export async function GET() {
  // Simpele stub: in productie doen we hier niks zwaars meer
  return NextResponse.json(
    {
      ok: true,
      message:
        'Demo endpoint is uitgeschakeld in de production build. Gebruik de echte wizard /api/generate/bundle in de app zelf.',
    },
    { status: 200 },
  );
}