import type { ProductType, ProductVariantType } from '@/features/product';


export interface CartItem {
  product: ProductType;
  variant: ProductVariantType;
  qty: number;
}

export interface CartStore {
  cartItems: CartItem[];
  addToCart: (newCartItem: CartItem) => void;
  removeFromCart: (args: { productId: ProductType['id']; variantId: ProductVariantType['id'] }) => void;
  updateQty: (args: { productId: ProductType['id']; variantId: ProductVariantType['id']; qty: number }) => void;
}
