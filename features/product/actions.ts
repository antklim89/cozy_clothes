'use server';
import { cache } from 'react';
import type { PaginatedDocs } from 'payload';
import type { z } from 'zod';
import { getAllProductIds, getManyProducts, getOneProduct } from '@/features/product/services';
import { err, success, UNEXPECTED_ERROR } from '@/lib/result';
import type { PromiseResult } from '@/lib/result';
import { FetchProductsInputSchema } from './schemas';
import type { ProductType } from './types';


export const fetchNewProducts = cache(async (): PromiseResult<ProductType[]> => {
  try {
    const result = await getManyProducts({
      sort: '-createdAt',
      pagination: false,
    });

    return success(result.docs);
  } catch {
    return err(UNEXPECTED_ERROR);
  }
});

export const fetchDiscountProducts = cache(async (): PromiseResult<ProductType[]> => {
  try {
    const result = await getManyProducts({
      sort: '-discount',
      pagination: false,
    });

    return success(result.docs);
  } catch {
    return err(UNEXPECTED_ERROR);
  }
});

export const fetchProductList = cache(async (input: z.infer<typeof FetchProductsInputSchema>): PromiseResult<PaginatedDocs<ProductType>> => {
  try {
    const validatedInput = await FetchProductsInputSchema.safeParseAsync(input);
    if (!validatedInput.success) return err({ type: 'validation', errors: validatedInput.error.flatten() });

    const result = await getManyProducts(validatedInput.data);

    return success(result);
  } catch {
    return err(UNEXPECTED_ERROR);
  }
});

export const fetchProduct = cache(async (id: ProductType['id']): PromiseResult<ProductType> => {
  try {
    const result = await getOneProduct(id);

    return success(result);
  } catch {
    return err(UNEXPECTED_ERROR);
  }
});

export const fetchAllProductIds = cache(async (): PromiseResult<ProductType['id'][]> => {
  try {
    const result = await getAllProductIds();

    return success(result);
  } catch {
    return err(UNEXPECTED_ERROR);
  }
});
