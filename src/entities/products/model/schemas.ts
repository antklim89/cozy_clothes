import { z } from 'zod/v4-mini';

import { PayloadOptionsSchema } from '@/shared/model/schemas/payload-options-schema';

export const ProductFilterSchema = z.object({
  category: z.optional(z.array(z.number())),
  countries: z.optional(z.array(z.number())),
  search: z.optional(z.string().check(z.trim())),
  minPrice: z.catch(z.optional(z.number().check(z.minimum(0))), 0),
  maxPrice: z.catch(z.optional(z.number().check(z.minimum(0))), 0),
});

export const FetchProductListInputSchema = z.object({
  filter: ProductFilterSchema,
  options: z.pick(PayloadOptionsSchema, { page: true, sort: true }),
});

export const GetProductsFavoritesInputSchema = z.object({
  options: z.pick(PayloadOptionsSchema, { page: true }),
});
