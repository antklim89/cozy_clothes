import 'server-only';
import { cache } from 'react';

import { getProductSizesRepository } from './repositories/get-product-sizes-repository';

export const getProductSizes = cache(async () => {
  const result = await getProductSizesRepository();
  return result;
});
