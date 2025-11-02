import { z } from 'zod/v4';
import { PayloadOptionsSchema } from '@/shared/model/schemas/payload-options-schema';


export const ProductFilterSchema = z.object({
  category: z.number().min(1).optional(),
  countries: z.number().array().optional(),
  search: z.string().trim().optional(),
  minPrice: z.number().positive().optional(),
  maxPrice: z.number().positive().optional(),
});

export const FetchProductListInputSchema = z.object({
  filter: ProductFilterSchema,
  options: PayloadOptionsSchema.pick({ page: true, sort: true }),
});
