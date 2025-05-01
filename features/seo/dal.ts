import '@/lib/server-only';
import { cache } from 'react';
import { getSeo } from '@/features/seo/services';
import type { SeoType } from '@/features/seo/types';
import type { PromiseResult } from '@/lib/result';


export const fetchSeo = cache(async (): PromiseResult<SeoType> => {
  const result = await getSeo();
  return result;
});
