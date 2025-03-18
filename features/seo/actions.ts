'use server';
import { cache } from 'react';
import { getSeo } from '@/features/seo/services';
import type { SeoType } from '@/features/seo/types';
import type { PromiseResult } from '@/lib/result';
import { err, success, UNEXPECTED_ERROR } from '@/lib/result';


export const fetchSeo = cache(async (): PromiseResult<SeoType> => {
  try {
    const result = await getSeo();
    return success(result);
  } catch {
    return err(UNEXPECTED_ERROR);
  }
});
