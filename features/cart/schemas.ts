import { z } from 'zod';


export const CartItemSchema = z.object({
  productId: z.number(),
  variantId: z.number(),
  image: z.string().optional(),
  title: z.string(),
  price: z.number(),
  discount: z.number(),
  colorName: z.string(),
  size: z.string(),
  qty: z.number(),
});
