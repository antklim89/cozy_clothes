import 'server-only';
import { cache } from 'react';
import { getPromoProductsRepository } from './repositories/get-promo-products-repository';


export const fetchNewProducts = cache(async () => {
  const result = await getPromoProductsRepository({ sort: 'createdAt' });
  return result;
});

export const fetchDiscountProducts = cache(async () => {
  const result = await getPromoProductsRepository({ sort: 'discount' });
  return result;
});
