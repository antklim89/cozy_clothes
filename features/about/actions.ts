'use server';
import { cache } from 'react';
import { getAbout } from '@/features/about/services';
import type { AboutType } from '@/features/about/types';
import type { PromiseResult } from '@/lib/result';
import { err, success, UNEXPECTED_ERROR } from '@/lib/result';


export const fetchAbout = cache(async (): PromiseResult<AboutType> => {
  try {
    const result = await getAbout();

    return success(result);
  } catch {
    return err(UNEXPECTED_ERROR);
  }
});
