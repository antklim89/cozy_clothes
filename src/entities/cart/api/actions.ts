'use server';

import { getCart, getCartByProductIds } from '../services/dal';

export const getCartAction = getCart;
export const getCartByProductIdsAction = getCartByProductIds;
