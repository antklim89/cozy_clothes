import '@/lib/server-only';
import { cache } from 'react';
import type { PromiseResult } from '@/lib/result';
import { getSeo } from './services';
import type { SeoType } from './types';


export const fetchSeo = cache(async (): PromiseResult<SeoType> => {
  const result = await getSeo();
  return result;
});
