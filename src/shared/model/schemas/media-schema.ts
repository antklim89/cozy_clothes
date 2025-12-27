import { z } from 'zod/v4-mini';

export const MediaSchema = z.object({
  id: z.number(),
  blurDataUrl: z.string(),
  url: z.string(),
  filename: z.nullish(z.string()),
  width: z.number(),
  height: z.number(),
});
