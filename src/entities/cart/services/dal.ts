import 'server-only';

import { cache } from 'react';

import { errUnauthenticated, ok } from '@/shared/lib/result';
import { getLocalCartRepository } from './repositories/get-cart-by-local-cart-repository';
import { getCartRepository } from './repositories/get-cart-repository';
import { syncCartRepository } from './repositories/sync-cart-repository';
import { getMe } from '../@x/user/services';
import type { LocalCartItemType } from '../model';

export const getAndSyncCart = cache(async ({ localCart }: { localCart: LocalCartItemType[] }) => {
  const user = await getMe();
  if (user == null) return errUnauthenticated();

  const cartResult = await getCartRepository({ userId: user.id });
  if (cartResult.error) return cartResult;

  const localCartFiltered = localCart.filter(
    localCartItem => !cartResult.result.some(i => i.product.id === localCartItem.productId),
  );
  const localCartResult = await syncCartRepository({ userId: user.id, localCart: localCartFiltered });
  if (localCartResult.error) return localCartResult;

  return ok([...cartResult.result, ...localCartResult.result]);
});

export const getCart = cache(async () => {
  const user = await getMe();
  if (user == null) return errUnauthenticated();

  const result = await getCartRepository({ userId: user.id });
  return result;
});

export const syncCart = cache(async ({ localCart }: { localCart: LocalCartItemType[] }) => {
  const user = await getMe();
  if (user == null) return errUnauthenticated();

  const result = await syncCartRepository({ userId: user.id, localCart });
  return result;
});

export const getLocalCart = cache(async ({ localCart }: { localCart: LocalCartItemType[] }) => {
  const result = await getLocalCartRepository({ localCart });
  return result;
});
