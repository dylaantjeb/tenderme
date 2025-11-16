// app/api/generations/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  const job = await prisma.generationJob.findUnique({
    where: { id: params.id },
    select: {
      id: true,
      status: true,
      progress: true,
      etaSeconds: true,
      error: true,
      resultZipUrl: true,
      createdAt: true,
      updatedAt: true,
      logs: true,
    },
  });

  if (!job) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json(job);
}