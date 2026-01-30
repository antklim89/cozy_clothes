import { z } from 'zod/v4-mini';

import { latinsCharsCheck } from '@/shared/model/schemas/checks';
import { PayloadOptionsSchema } from '@/shared/model/schemas/payload-options-schema';

export const ProductFilterSchema = z.object({
  categories: z.optional(z.array(z.number().check(z.positive()))),
  countries: z.optional(z.array(z.number().check(z.positive()))),
  sizes: z.optional(z.array(z.number().check(z.positive()))),
  colors: z.optional(z.array(z.number().check(z.positive()))),
  search: z.optional(z.string().check(z.trim(), latinsCharsCheck)),
  minPrice: z.optional(z.number().check(z.minimum(0))),
  maxPrice: z.optional(z.number().check(z.minimum(0))),
});

export const GetProductListInputSchema = z.object({
  filter: ProductFilterSchema,
  options: z.pick(PayloadOptionsSchema, { page: true, sort: true }),
});

export const GetProductsFavoritesInputSchema = z.object({
  options: z.pick(PayloadOptionsSchema, { page: true }),
});
