import 'server-only';
import { cache } from 'react';
import type { PromiseResult } from '@/src/shared/lib/result';
import { getHeroRepository } from './repositories/get-hero-repository';
import type { HeroType } from '../model/types';


export const getHero = cache(async (): PromiseResult<HeroType> => {
  const result = await getHeroRepository();
  return result;
});
