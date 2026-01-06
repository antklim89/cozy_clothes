import 'server-only';
import { cache } from 'react';

import { getColorsRepository } from './repositories/get-colors-repository';

export const getProductColors = cache(async () => {
  const result = await getColorsRepository();
  return result;
});
