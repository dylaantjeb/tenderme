// app/api/generations/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { startBackgroundGeneration } from '@/lib/jobRunner';

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const input = await req.json();

    // Sla job op
    const job = await prisma.generationJob.create({
      data: {
        status: 'queued',
        progress: 0,
        etaSeconds: 0,
        inputJson: input,
        logs: [],
      },
      select: { id: true },
    });

    // Start background run (fire-and-forget)
    startBackgroundGeneration(job.id).catch((e) => {
      console.error('Background generation failed', e);
    });

    return NextResponse.json({ id: job.id });
  } catch (e: any) {
    console.error(e);
    return NextResponse.json({ error: e.message ?? 'Failed to create job' }, { status: 400 });
  }
}