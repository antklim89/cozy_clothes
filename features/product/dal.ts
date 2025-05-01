import '@/lib/server-only.ts';
import { cache } from 'react';
import type { z } from 'zod';
import { getAllProductIds, getManyProducts, getOneProduct } from '@/features/product/services';
import { err, okMap } from '@/lib/result';
import { FetchProductsInputSchema } from './schemas';
import type { ProductType } from './types';


export const fetchNewProducts = cache(async () => {
  const result = await getManyProducts({
    sort: '-createdAt',
    pagination: false,
  });

  return okMap(result, r => r.docs);
});

export const fetchDiscountProducts = cache(async () => {
  const result = await getManyProducts({
    sort: '-discount',
    pagination: false,
  });

  return okMap(result, r => r.docs);
});

export const fetchProductList = cache(async (input: z.infer<typeof FetchProductsInputSchema>) => {
  const validatedInput = await FetchProductsInputSchema.safeParseAsync(input);
  if (!validatedInput.success) return err({ type: 'validation', message: validatedInput.error.message });

  const result = await getManyProducts(validatedInput.data);
  return result;
});

export const fetchProduct = cache(async (id: ProductType['id']) => {
  const result = await getOneProduct(id);
  return result;
});

export const fetchAllProductIds = cache(async () => {
  const result = await getAllProductIds();
  return result;
});
