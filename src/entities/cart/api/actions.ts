'use server';

import { getAndSyncCart, getCart, getLocalCart, syncCart } from '../services/dal';

export const getCartAction = getCart;
export const syncCartAction = syncCart;
export const getAndSyncCartAction = getAndSyncCart;
export const getLocalCartAction = getLocalCart;
