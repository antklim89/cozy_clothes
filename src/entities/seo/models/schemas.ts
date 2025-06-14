import { z } from 'zod/v4-mini';

export const SeoSchema = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string(),
  keywords: z.array(z.string()),
  creator: z.string(),
});
