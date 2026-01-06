import { z } from 'zod/v4-mini';

export const CartQtySchema = z.number().check(z.gte(1)).check(z.lte(100));

export const LocalCartItemSchema = z.object({
  productId: z.number(),
  qty: CartQtySchema,
});
