import '@/lib/server-only';
import { cache } from 'react';
import type { HeroType } from '@/features/hero/types';
import type { PromiseResult } from '@/lib/result';
import { getHero } from './services';


export const fetchHero = cache(async (): PromiseResult<HeroType> => {
  const result = await getHero();
  return result;
});
