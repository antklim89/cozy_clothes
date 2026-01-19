import { cache } from 'react';
import 'server-only';

import { getHeroRepository } from './repositories/get-hero-repository';

export const getHero = cache(async () => {
  const result = await getHeroRepository();
  return result;
});
