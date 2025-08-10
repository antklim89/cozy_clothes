import { z } from 'zod/v4';
import { PayloadOptionsSchema } from '@/shared/model/schemas';


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
