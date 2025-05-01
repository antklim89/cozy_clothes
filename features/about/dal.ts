import '@/lib/server-only';
import { cache } from 'react';
import { getAbout } from '@/features/about/services';
import type { AboutType } from '@/features/about/types';
import type { PromiseResult } from '@/lib/result';


export const fetchAbout = cache(async (): PromiseResult<AboutType> => {
  const result = await getAbout();
  return result;
});
