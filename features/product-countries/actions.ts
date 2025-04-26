'use server';
import { cache } from 'react';
import { err, success, UNEXPECTED_ERROR } from '@/lib/result';
import type { PromiseResult } from '@/lib/result';
import { getCountries } from './services';
import type { ProductCountryType } from './types';


export const fetchCountries = cache(async ({ name }: { name?: string } = {}): PromiseResult<ProductCountryType[]> => {
  try {
    const result = await getCountries({ name });
    return success(result);
  } catch {
    return err(UNEXPECTED_ERROR);
  }
});
