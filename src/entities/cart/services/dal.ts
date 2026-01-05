import 'server-only';

import { err } from '@/shared/lib/result';
import { getLocalCartRepository } from './repositories/get-cart-by-local-cart-repository';
import { getAndSyncCartRepository } from './repositories/get-cart-repository';
import { getMe } from '../@x/user/services';
import type { LocalCartItemType } from '../model';

export async function getAndSyncCart({ localCart }: { localCart?: LocalCartItemType[] } = {}) {
  const user = await getMe();
  if (user == null) return err({ type: 'unauthorized', message: 'You are not logged in' });

  const result = await getAndSyncCartRepository({ userId: user.id, localCart });
  return result;
}

export async function getLocalCart({ localCart }: { localCart: LocalCartItemType[] }) {
  const result = await getLocalCartRepository({ localCart });
  return result;
}
