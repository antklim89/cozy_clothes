'use server';
import {
  addCartItem,
  getCart,
  getCartByVariantIds,
  getCartItemByVariantId,
  removeCartItem,
  updateCartQty,
} from '../services/dal';

export const getCartAction = getCart;
export const addCartItemAction = addCartItem;
export const getCartItemByVariantIdAction = getCartItemByVariantId;
export const getCartByVariantIdsAction = getCartByVariantIds;
export const removeCartItemAction = removeCartItem;
export const updateCartQtyAction = updateCartQty;
