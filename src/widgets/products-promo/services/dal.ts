import { cache } from 'react';
import 'server-only';

import { getManyProductsRepository } from '@/entities/products/services';
import { getMe } from '@/entities/user/services';
import { okMap } from '@/shared/lib/result';
import { PRODUCTS_PROMO_PER_PAGE } from '../config/constants';

export const getNewProducts = cache(async () => {
  const user = await getMe();
  const result = await getManyProductsRepository({
    user,
    options: { sort: '-createdAt', limit: PRODUCTS_PROMO_PER_PAGE, pagination: false },
  });
  return okMap(result, v => v.docs);
});

export const getDiscountProducts = cache(async () => {
  const user = await getMe();
  const result = await getManyProductsRepository({
    user,
    options: { sort: '-discount', limit: PRODUCTS_PROMO_PER_PAGE, pagination: false },
  });
  return okMap(result, v => v.docs);
});
