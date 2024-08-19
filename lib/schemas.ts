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
    colors: z
      .object({
        name: z.string(),
        code: z.string(),
      })
      .array()
      .nullish(),
  }),
});

export const testimonialSchema = z.object({
  id: z.string(),
  hidden: z.coerce.boolean(),
  image: z.string(),
  text: z.string(),
  name: z.string(),
});

export const contactSchema = z.object({
  id: z.string(),
  hidden: z.coerce.boolean(),
  title: z.string(),
  email: z.string().email(),
  phone: z.string(),
});

export const qtySchema = z.coerce
  .number()
  .min(1)
  .max(100)
  .catch(({ input }) => (input > 100 ? 100 : 1))
  .default(1);

export type HeroType = z.infer<typeof heroSchema>;
export type ProductType = z.infer<typeof productSchema>;
export type TestimonialType = z.infer<typeof testimonialSchema>;
