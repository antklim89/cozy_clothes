import 'server-only';
import { cache } from 'react';

import { getProductColorsRepository } from './repositories/get-product-colors-repository';

export const getProductColors = cache(async () => {
  const result = await getProductColorsRepository();
  return result;
});
