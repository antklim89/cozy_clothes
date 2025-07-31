import { z } from 'zod/v4';
import { SIZES } from '@/src/shared/config';
import { MediaSchema, PayloadOptionsSchema, RichTextSchema } from '@/src/shared/model/schemas';


export const ProductSchema = z.object({
  id: z.number(),
  title: z.string(),
  description: RichTextSchema,
  price: z.number(),
  discount: z.number(),
  category: z.object({
    id: z.number(),
    name: z.string(),
  }),
  country: z.object({
    id: z.number(),
    name: z.string(),
  }),
  images: MediaSchema.array(),
  variants: z.object({
    id: z.number(),
    size: z.enum(SIZES),
    colorName: z.string(),
    colorCode: z.string(),
  }).array(),
  updatedAt: z.string(),
  createdAt: z.string(),
});

export const ProductFilterSchema = z.object({
  category: z.number().min(1).optional(),
  search: z.string().trim().optional(),
  minPrice: z.number().positive().optional(),
  maxPrice: z.number().positive().optional(),
  countries: z.string().array().optional(),
});

export const FetchProductListInputSchema = z.object({
  filter: ProductFilterSchema,
  options: PayloadOptionsSchema.pick({ page: true, sort: true }),
});
