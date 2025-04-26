import { z } from 'zod';


export const ProductIdSchema = z.coerce.number();

export const ProductFilterSchema = z.object({
  search: z.string().trim().optional(),
  minPrice: z.coerce.number().positive().optional().catch(undefined),
  maxPrice: z.coerce.number().positive().optional().catch(undefined),
  countries: z.pipeline(
    z.union([z.string(), z.string().array()]).transform(v => Array.isArray(v) ? v : [v]).optional(),
    z.string().array().optional().catch(undefined),
  ),
});

export const ProductParamsSchema = z.object({
  category: z.coerce.number().min(1).optional().catch(undefined),
  page: z.coerce.number().min(1).optional().catch(undefined),
}).merge(ProductFilterSchema);

export const FetchProductsInputSchema = z.object({
  page: z.number().min(1).optional(),
  category: z.number().min(1).optional(),
  search: z.string().trim().optional(),
  minPrice: z.number().positive().optional(),
  maxPrice: z.number().positive().optional(),
  countries: z.string().array().optional(),
});
