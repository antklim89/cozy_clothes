import type { z } from 'zod';
import type { ProductType, ProductVariantType } from '@/features/product';
import type { CartItemSchema } from './schemas';


export type CartItem = z.infer<typeof CartItemSchema>;

export interface CartStore {
  cartItems: CartItem[];
  addToCart: (newCartItem: CartItem) => void;
  removeFromCart: (args: { productId: ProductType['id']; variantId: ProductVariantType['id'] }) => void;
  updateQty: (args: { productId: ProductType['id']; variantId: ProductVariantType['id']; qty: number }) => void;
}
