import '@/lib/server-only';
import { cache } from 'react';
import type { PromiseResult } from '@/lib/result';
import { getHero } from './services';
import type { HeroType } from './types';


export const fetchHero = cache(async (): PromiseResult<HeroType> => {
  const result = await getHero();
  return result;
});
