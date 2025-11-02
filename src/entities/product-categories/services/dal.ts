import 'server-only';
import { cache } from 'react';

import { getProductCategoriesRepository } from './repositories/get-products-categories-repository';

export const getProductCategories = cache(async () => {
  const result = await getProductCategoriesRepository();
  return result;
});
