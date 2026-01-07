import 'server-only';
import { cache } from 'react';

import { getSizesRepository } from './repositories/get-sizes-repository';

export const getProductSizes = cache(async () => {
  const result = await getSizesRepository();
  return result;
});
