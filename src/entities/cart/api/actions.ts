'use server';
import {
  addCartItem,
  getCart,
  getCartByProductIds,
  getCartItemByProductId,
  removeCartItem,
  updateCartQty,
} from '../services/dal';

export const getCartAction = getCart;
export const addCartItemAction = addCartItem;
export const getCartItemByProductIdAction = getCartItemByProductId;
export const getCartByProductIdsAction = getCartByProductIds;
export const removeCartItemAction = removeCartItem;
export const updateCartQtyAction = updateCartQty;
