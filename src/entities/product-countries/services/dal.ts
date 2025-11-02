import 'server-only';
import { cache } from 'react';

import { getCountriesRepository } from './repositories/get-countries-repository';

export const getProductCountries = cache(async () => {
  const result = await getCountriesRepository();
  return result;
});
