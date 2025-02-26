import { z } from 'zod';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { ProductType, ProductVariantType } from './types';


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

const CartItemQtySchema = z.number().min(1).max(1000).catch(1);

export const useCartStore = create(
  persist<CartStore>(
    set => ({
      cartItems: [],

      addToCart: ({ qty, ...newCartItem }) => {
        const newQty = CartItemQtySchema.parse(qty);
        set(state => ({
          cartItems: [...state.cartItems, { qty: newQty, ...newCartItem }],
        }));
      },

      removeFromCart: ({ productId, variantId }) => {
        set(state => ({
          cartItems: state.cartItems.filter(cartItem => (
            cartItem.product.id !== productId || cartItem.variant.id !== variantId
          )),
        }));
      },

      updateQty: ({ productId, variantId, qty }) => {
        set(state => ({
          cartItems: state.cartItems.map(oldCartItem =>
            (oldCartItem.product.id === productId && oldCartItem.variant.id === variantId)
              ? { ...oldCartItem, qty }
              : oldCartItem,
          ),
        }));
      },
    }),
    { name: 'cozy_clothes_cart' },
  ),
);
