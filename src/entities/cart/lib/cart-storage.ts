import { z } from 'zod/v4-mini';

import type { LocalCartItemType } from '../model';
import { LocalCartItemSchema } from '../model';

export function getCartFromLocalStorage(): LocalCartItemType[] {
  try {
    const cartString = localStorage.getItem('cart');
    if (cartString == null) return [];
    const cartJson = JSON.parse(cartString) as unknown;
    return z.array(LocalCartItemSchema).parse(cartJson);
  } catch {
    return [];
  }
}

export function clearCartLocalStorage(): void {
  localStorage.setItem('cart', '[]');
}

export function setCartToLocalStorage(cart: LocalCartItemType[]): LocalCartItemType[] {
  localStorage.setItem('cart', JSON.stringify(cart));
  return cart;
}

export function addCartItemToLocalStorage(cartItem: LocalCartItemType): LocalCartItemType[] {
  const cart = getCartFromLocalStorage();
  const newCart = [...cart, cartItem];
  localStorage.setItem('cart', JSON.stringify(newCart));

  return newCart;
}

export function removeCartItemFromLocalStorage({ productId }: { productId: number }): LocalCartItemType[] {
  const cart = getCartFromLocalStorage();
  const newCart = cart.filter(item => item.productId !== productId);
  localStorage.setItem('cart', JSON.stringify(newCart));
  return newCart;
}

export function updateCartQtyInLocalStorage({
  productId,
  qty,
}: {
  productId: number;
  qty: number;
}): LocalCartItemType[] {
  const cart = getCartFromLocalStorage();
  const newCart = cart.map(item => (item.productId === productId ? { ...item, qty } : item));
  localStorage.setItem('cart', JSON.stringify(newCart));

  return newCart;
}
