import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { runGenerationJob } from '@/lib/job-runner';

export async function POST(req: Request) {
  const payload = await req.json(); // dit is jouw GeneratePayload
  const job = await prisma.generationJob.create({
    data: { status: 'QUEUED', progress: 0, message: 'In wachtrij', payloadJson: JSON.stringify(payload) }
  });

  // Fire-and-forget
  runGenerationJob(job.id, payload).catch(()=>{});

  return NextResponse.json({ id: job.id });
}

export async function GET() {
  const jobs = await prisma.generationJob.findMany({ orderBy: { createdAt: 'desc' }, take: 50 });
  return NextResponse.json(jobs);
}