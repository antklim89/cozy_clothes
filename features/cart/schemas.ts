import { z } from 'zod';


export const CartQtySchema = z.number().min(1).max(100);

export const LocalCartItemSchema = z.object({
  variantId: z.number(),
  qty: CartQtySchema,
});
