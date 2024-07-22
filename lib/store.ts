import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { ProductType } from './schemas';

export interface CartItem {
  id: string;
  product: ProductType;
  qty: number;
  size?: string | null;
  color?: string | null;
}

export interface CartStore {
  cartItems: CartItem[];
  addToCart: (newCartItem: CartItem) => void;
  removeFromCart: (cartId: CartItem['id']) => void;
  updateCart: (cartId: CartItem['id'], updatedCartItem: Partial<CartItem>) => void;
}

export const useCartStore = create(
  persist<CartStore>(
    (set) => ({
      cartItems: [],
      addToCart: (newCartItem: CartItem) => {
        set((state) => ({
          cartItems: [...state.cartItems, newCartItem],
        }));
      },

      removeFromCart: (cartId: string) => {
        set((state) => ({
          cartItems: state.cartItems.filter((cartItem) => cartItem.id !== cartId),
        }));
      },

      updateCart: (cartId: CartItem['id'], updatedCartItem: Partial<CartItem>) => {
        set((state) => ({
          cartItems: state.cartItems.map((cartItem) =>
            cartItem.id === cartId ? { ...cartItem, ...updatedCartItem } : cartItem,
          ),
        }));
      },
    }),
    { name: 'cozy_clothes_cart' },
  ),
);
