'use server';

import { addCartItem, removeCartItem, updateCartQty } from '../services/dal';

export const addCartItemAction = addCartItem;
export const removeCartItemAction = removeCartItem;
export const updateCartQtyAction = updateCartQty;
