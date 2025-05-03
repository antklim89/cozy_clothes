import { z } from 'zod';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CartItemSchema } from './schemas';
import type { CartStore } from './types';


export const useCartStore = create(
  persist<CartStore>(
    set => ({
      cartItems: [],

      addToCart: ({ qty, ...newCartItem }) => {
        const newQty = z.number().min(1).max(1000).catch(1).parse(qty);
        set(state => ({
          cartItems: [...state.cartItems, { qty: newQty, ...newCartItem }],
        }));
      },

      removeFromCart: ({ productId, variantId }) => {
        set(state => ({
          cartItems: state.cartItems.filter(cartItem => (
            cartItem.productId !== productId || cartItem.variantId !== variantId
          )),
        }));
      },

      updateQty: ({ productId, variantId, qty }) => {
        set(state => ({
          cartItems: state.cartItems.map(oldCartItem =>
            (oldCartItem.productId === productId && oldCartItem.variantId === variantId)
              ? { ...oldCartItem, qty }
              : oldCartItem,
          ),
        }));
      },
    }),
    {
      name: 'cozy_clothes_cart',
      merge: (persistedState, currentState) => {
        const { success, data } = z.object({ cartItems: CartItemSchema.array() }).safeParse(persistedState);
        if (success) currentState.cartItems = data.cartItems;
        return currentState;
      },
    },
  ),
);
