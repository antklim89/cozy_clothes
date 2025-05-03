import '@/lib/server-only';
import { cache } from 'react';
import type { PromiseResult } from '@/lib/result';
import { getAbout } from './services';
import type { AboutType } from './types';


export const fetchAbout = cache(async (): PromiseResult<AboutType> => {
  const result = await getAbout();
  return result;
});
