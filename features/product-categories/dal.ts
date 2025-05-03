import '@/lib/server-only';
import { cache } from 'react';
import type { PromiseResult } from '@/lib/result';
import { getCategories } from './services';
import type { ProductCategoryType } from './types';


export const fetchCategories = cache(async (): PromiseResult<ProductCategoryType[]> => {
  const result = await getCategories();
  return result;
});
