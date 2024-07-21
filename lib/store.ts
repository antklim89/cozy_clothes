import { create } from 'zustand';
import type { ProductType } from './schemas';

export interface CartItem {
  product: ProductType;
  qty: number;
  size?: string | null;
  color?: string | null;
}

export interface CartStore {
  cartItems: CartItem[];
  addToCart: (newCartItem: CartItem) => void;
  removeFromCart: (productId: ProductType['id']) => void;
}

export const useCartStore = create<CartStore>((set) => ({
  cartItems: [],
  addToCart: (newCartItem: CartItem) => {
    set((state) => ({
      cartItems: [...state.cartItems, newCartItem],
    }));
  },

  removeFromCart: (productId: string) => {
    set((state) => ({
      cartItems: state.cartItems.filter((cartItem) => cartItem.product.id !== productId),
    }));
  },
}));
