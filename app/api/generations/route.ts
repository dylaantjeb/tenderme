import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { enqueue } from '@/lib/job-runner';

export async function POST(req: Request) {
  const payload = await req.json(); // alles wat je nu naar /api/generate stuurde
  const job = await prisma.generationJob.create({
    data: { status: 'PENDING', progress: 0, payload },
    select: { id: true, createdAt: true, status: true, progress: true },
  });
  enqueue(job.id);
  return NextResponse.json(job);
}

export async function GET() {
  const jobs = await prisma.generationJob.findMany({
    orderBy: { createdAt: 'desc' },
    select: { id: true, createdAt: true, status: true, progress: true, message: true, zipPath: true },
  });
  return NextResponse.json(jobs);
}