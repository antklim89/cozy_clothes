import 'server-only';

import { cache } from 'react';

import { errUnauthenticated } from '@/shared/lib/result';
import { getOrdersRepository } from './repositories/get-orders-repository';
import { getMe } from '../@x/user/services';

export const getOrders = cache(async () => {
  const user = await getMe();
  if (user == null) return errUnauthenticated();

  const result = await getOrdersRepository({ userId: user.id });
  return result;
});
