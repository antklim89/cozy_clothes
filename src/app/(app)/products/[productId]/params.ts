import { z } from 'zod/v4-mini';

export const ParamsSchema = z.object({
  productId: z.coerce.number(),
});
