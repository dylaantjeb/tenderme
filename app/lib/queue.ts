// lib/queue.ts
import { Queue, QueueEvents, JobsOptions } from 'bullmq';
import IORedis from 'ioredis';

const connection = new IORedis(process.env.REDIS_URL!, { maxRetriesPerRequest: null });

export const generationQueue = new Queue('generation', { connection });
export const generationQueueEvents = new QueueEvents('generation', { connection });

export const defaultJobOpts: JobsOptions = {
  attempts: 2,
  backoff: { type: 'exponential', delay: 30_000 },
  removeOnComplete: 200,
  removeOnFail: false,
};