import { z } from 'zod/v4-mini';

export const CartQtySchema = z.number().check(z.gte(1)).check(z.lte(100));

export const LocalCartItemSchema = z.object({
  productId: z.number(),
  qty: CartQtySchema,
});

export const CartItemSchema = z.object({
  id: z.optional(z.number()),
  productId: z.number(),
  size: z.enum(['sx', 's', 'm', 'l', 'xl', 'xxl', 'xxxl']),
  colorName: z.string(),
  title: z.string(),
  price: z.number(),
  discount: z.number(),
  image: z.string(),
  qty: z.number(),
});
