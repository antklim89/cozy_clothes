import 'server-only';
import { cache } from 'react';

import { getPromoProductsRepository } from './repositories/get-promo-products-repository';

export const getNewProducts = cache(async () => {
  const result = await getPromoProductsRepository({ sort: 'createdAt' });
  return result;
});

export const getDiscountProducts = cache(async () => {
  const result = await getPromoProductsRepository({ sort: 'discount' });
  return result;
});
