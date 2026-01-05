'use server';

import { getAndSyncCart, getLocalCart } from '../services/dal';

export const getAndSyncCartAction = getAndSyncCart;
export const getLocalCartAction = getLocalCart;
