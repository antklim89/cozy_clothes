'use server';
import { cache } from 'react';
import { getCategories } from '@/features/product-categories/services';
import type { ProductCategoryType } from '@/features/product-categories/types';
import { err, success, UNEXPECTED_ERROR } from '@/lib/result';
import type { PromiseResult } from '@/lib/result';


export const fetchCategories = cache(async (): PromiseResult<ProductCategoryType[]> => {
  try {
    const result = await getCategories();
    return success(result);
  } catch {
    return err(UNEXPECTED_ERROR);
  }
});
