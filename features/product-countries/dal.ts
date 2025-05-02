import '@/lib/server-only';
import { cache } from 'react';
import { getCountries } from './services';


export const fetchCountries = cache(async () => {
  const result = await getCountries();
  return result;
});
