import { LocalCartItemSchema } from './schemas';
import type { LocalCartItemType } from './types';


export function getCartFromLocalStorage(): LocalCartItemType[] {
  try {
    const cartString = localStorage.getItem('cart');
    if (cartString == null) return [];
    const cartJson = JSON.parse(cartString) as unknown;
    return LocalCartItemSchema.array().parse(cartJson);
  } catch {
    return [];
  }
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

export function removeCartItemFromLocalStorage({ variantId }: { variantId: number }): LocalCartItemType[] {
  const cart = getCartFromLocalStorage();
  const newCart = cart.filter(item => item.variantId !== variantId);
  localStorage.setItem('cart', JSON.stringify(newCart));
  return newCart;
}

export function updateCartQtyInLocalStorage({ variantId, qty }: { variantId: number; qty: number }): LocalCartItemType[] {
  const cart = getCartFromLocalStorage();
  const newCart = cart.map(item => item.variantId === variantId ? { ...item, qty } : item);
  localStorage.setItem('cart', JSON.stringify(newCart));

  return newCart;
}
