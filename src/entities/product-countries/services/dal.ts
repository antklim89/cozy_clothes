import 'server-only';
import { cache } from 'react';

import { getProductCountriesRepository } from './repositories/get-product-countries-repository';

export const getProductCountries = cache(async () => {
  const result = await getProductCountriesRepository();
  return result;
});
