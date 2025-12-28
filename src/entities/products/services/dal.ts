import { cache } from 'react';
import 'server-only';

import type { ProductFilterType, ProductType } from '@/entities/products/model';
import { getMe } from '@/entities/user/services';
import { err } from '@/shared/lib/result';
import type { PayloadOptions } from '@/shared/model/types/types';
import { getManyProductsRepository } from './repositories/get-many-products-repository';
import { getOneProductRepository } from './repositories/get-one-product-repository';
import { getProductsFavoritesRepository } from './repositories/get-products-favorites-repository';
import { FetchProductListInputSchema, GetProductsFavoritesInputSchema } from '../model/schemas';

export const fetchProductList = cache(
  async (input: { filter: ProductFilterType; options: Pick<PayloadOptions, 'page' | 'sort'> }) => {
    const validatedInput = await FetchProductListInputSchema.safeParseAsync(input);
    if (!validatedInput.success) return err({ type: 'validation', message: validatedInput.error.message });
    const { filter, options } = validatedInput.data;

    const result = await getManyProductsRepository({ filter, options });
    return result;
  },
);

export const fetchProduct = cache(async (id: ProductType['id']) => {
  const result = await getOneProductRepository(id);
  return result;
});

export const getProductsFavorites = cache(async (input: { options: Pick<PayloadOptions, 'page'> }) => {
  const validatedInput = await GetProductsFavoritesInputSchema.safeParseAsync(input);
  if (!validatedInput.success) return err({ type: 'validation', message: validatedInput.error.message });
  const { options } = validatedInput.data;

  const user = await getMe();
  if (!user) return err({ type: 'unauthenticated', message: 'You are not authenticated.' });

  const result = await getProductsFavoritesRepository({ user, options });
  return result;
});
