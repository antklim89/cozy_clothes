import { z } from 'zod';


export const ParamsSchema = z.object({
  category: z.coerce.number().min(1).optional().catch(undefined),
  page: z.coerce.number().min(1).default(1).catch(1),
});

export const ProductIdSchema = z.coerce.number();

export const FetchProductsInputSchema = z.object({
  category: z.number().min(1).optional().catch(undefined),
  page: z.number().min(1).default(1).catch(1),
});
