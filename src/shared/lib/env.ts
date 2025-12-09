import { z } from 'zod/v4-mini';

export const env = z
  .object({
    URL: z.string().check(z.url()),
  })
  .parse({
    URL: process.env.URL,
  });
