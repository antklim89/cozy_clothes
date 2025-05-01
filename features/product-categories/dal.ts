import '@/lib/server-only';
import { cache } from 'react';
import { getCategories } from '@/features/product-categories/services';
import type { ProductCategoryType } from '@/features/product-categories/types';
import type { PromiseResult } from '@/lib/result';


export const fetchCategories = cache(async (): PromiseResult<ProductCategoryType[]> => {
  const result = await getCategories();
  return result;
});
