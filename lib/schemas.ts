import { z } from 'zod';

export const heroSchema = z.object({
  text: z.string(),
  imagePreview: z.string(),
});

export type HeroType = z.infer<typeof heroSchema>;
