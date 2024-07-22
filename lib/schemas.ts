import { z } from 'zod';

export const heroSchema = z.object({
  text: z.string(),
  imagePreview: z.string(),
});

export const productSchema = z.object({
  id: z.string(),
  discount: z.coerce.number(),
  price: z.coerce.number(),
  hidden: z.coerce.boolean(),
  imagePreview: z.string(),
  title: z.string(),
  images: z.array(z.string()),
  createdAt: z.string(),
  description: z.string(),
  category: z.string(),
  options: z.object({
    sizes: z.array(z.string()).nullish(),
    colors: z.array(z.string()).nullish(),
  }),
});

export type HeroType = z.infer<typeof heroSchema>;
export type ProductType = z.infer<typeof productSchema>;
