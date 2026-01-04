import { cache } from 'react';
import 'server-only';

import { getManyProductsRepository } from '@/entities/products/services';
import { okMap } from '@/shared/lib/result';

export const getNewProducts = cache(async () => {
  const result = await getManyProductsRepository({ options: { sort: 'createdAt', limit: 8, pagination: false } });
  return okMap(result, v => v.docs);
});

export const getDiscountProducts = cache(async () => {
  const result = await getManyProductsRepository({ options: { sort: 'discount', limit: 8, pagination: false } });
  return okMap(result, v => v.docs);
});
