import 'server-only';

import { err } from '@/shared/lib/result';
import { getCartByLocalCartRepository } from './repositories/get-cart-by-local-cart-repository';
import { getCartRepository } from './repositories/get-cart-repository';
import { getMe } from '../@x/user/services';
import type { LocalCartItemType } from '../model';

export async function getCart({ localCart }: { localCart?: LocalCartItemType[] } = {}) {
  const user = await getMe();
  if (user == null) return err({ type: 'unauthorized', message: 'You are not logged in' });

  const result = await getCartRepository({ userId: user.id, localCart });
  return result;
}

export async function getCartByProductIds({ localCart }: { localCart: LocalCartItemType[] }) {
  const result = await getCartByLocalCartRepository({ localCart });
  return result;
}
