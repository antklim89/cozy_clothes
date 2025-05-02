import { z } from 'zod';


export const ProductParamsSchema = z.object({
  category: z.coerce.number().min(1).optional().catch(undefined),
  page: z.coerce.number().min(1).optional().catch(undefined),
  search: z.string().trim().optional(),
  minPrice: z.coerce.number().positive().optional().catch(undefined),
  maxPrice: z.coerce.number().positive().optional().catch(undefined),
  countries: z.pipeline(
    z.string().transform(v => v.split(',')).optional(),
    z.string().trim().array().optional().catch(undefined),
  ),
});

export const FetchProductsInputSchema = z.object({
  page: z.number().min(1).optional(),
  category: z.number().min(1).optional(),
  search: z.string().trim().optional(),
  minPrice: z.number().positive().optional(),
  maxPrice: z.number().positive().optional(),
  countries: z.string().array().optional(),
});
