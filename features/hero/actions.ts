'use server';
import { cache } from 'react';
import type { HeroType } from '@/features/hero/types';
import { err, success, UNEXPECTED_ERROR } from '@/lib/result';
import type { PromiseResult } from '@/lib/result';
import { getHero } from './services';


export const fetchHero = cache(async (): PromiseResult<HeroType> => {
  try {
    const result = await getHero();
    return success(result);
  } catch {
    return err(UNEXPECTED_ERROR);
  }
});
