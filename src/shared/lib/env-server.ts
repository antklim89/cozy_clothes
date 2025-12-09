import { z } from 'zod/v4-mini';

if (typeof window !== 'undefined') throw new Error('Server only.');

export const envServer = z
  .object({
    PAYLOAD_SECRET: z.string(),
  })
  .parse({
    PAYLOAD_SECRET: process.env.PAYLOAD_SECRET,
  });
