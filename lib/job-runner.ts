// lib/job-runner.ts
import { prisma } from './db';
import generateBundle, { GeneratePayload } from './generateBundle';

export async function runGenerationJob(jobId: string, payload: GeneratePayload) {
  const update = (progress: number, message: string) =>
    prisma.generationJob.update({ where: { id: jobId }, data: { progress, message } });

  await prisma.generationJob.update({ where: { id: jobId }, data: { status: 'RUNNING', progress: 1, message: 'Gestart…' } });

  try {
    const result = await generateBundle(payload, async (pct, msg) => {
      await update(Math.min(99, Math.max(1, Math.floor(pct))), msg);
    });

    await prisma.generationJob.update({
      where: { id: jobId },
      data: {
        status: 'DONE',
        progress: 100,
        message: 'Klaar',
        zipPath: result.zipPath,
        previewJson: result.preview ? JSON.stringify(result.preview) : null,
        validationJson: JSON.stringify(result.validation),
        scoreJson: JSON.stringify(result.score),
      },
    });
  } catch (err: any) {
    await prisma.generationJob.update({
      where: { id: jobId },
      data: { status: 'FAILED', message: err?.message || 'Mislukt', progress: 100 },
    });
  }
}