import { z } from 'zod/v4';

export const MediaSchema = z.object({
  id: z.number(),
  blurDataUrl: z.string(),
  url: z.string(),
  filename: z.string().nullish(),
  width: z.number(),
  height: z.number(),
});
