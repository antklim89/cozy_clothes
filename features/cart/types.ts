import type { z } from 'zod';
import type { ProductType, ProductVariantType } from '@/features/product';
import type { LocalCartItemSchema } from './schemas';


export interface CartItemType {
  id?: number;
  variantId: ProductVariantType['id'];
  productId: ProductType['id'];
  size: ProductVariantType['size'];
  colorName: ProductVariantType['colorName'];
  title: ProductType['title'];
  price: ProductType['price'];
  discount: ProductType['discount'];
  image: string;
  qty: number;
}

export type LocalCartItemType = z.infer<typeof LocalCartItemSchema>;
