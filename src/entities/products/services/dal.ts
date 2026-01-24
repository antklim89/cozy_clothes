import 'server-only';

import { cache } from 'react';
import { z } from 'zod/v4-mini';

import type { ProductFilterType, ProductType } from '@/entities/products/model';
import { getMe } from '@/entities/user/services';
import { errUnauthenticated, errValidation } from '@/shared/lib/result';
import type { PayloadOptions } from '@/shared/model/types/types';
import { getFavoritesProductsRepository } from './repositories/get-favorites-products-repository';
import { getIsFavoriteProductRepository } from './repositories/get-is-favorite-product-repository';
import { getManyProductsRepository } from './repositories/get-many-products-repository';
import { getOneProductRepository } from './repositories/get-one-product-repository';
import { GetProductListInputSchema, GetProductsFavoritesInputSchema } from '../model/schemas';

export const getManyProducts = cache(
  async (input: { filter: ProductFilterType; options: Pick<PayloadOptions, 'page' | 'sort'> }) => {
    const { success, error, data: validatedInput } = await GetProductListInputSchema.safeParseAsync(input);
    if (!success) return errValidation(z.prettifyError(error));

    const result = await getManyProductsRepository(validatedInput);
    return result;
  },
);

export const getOneProduct = cache(async (id: ProductType['id']) => {
  const result = await getOneProductRepository(id);
  return result;
});

export const getIsFavoriteProduct = cache(async (id: ProductType['id']) => {
  const user = await getMe();
  if (!user) return errUnauthenticated();

  const result = await getIsFavoriteProductRepository(id, user.id);
  return result;
});

export const getFavoritesProducts = cache(async (input: { options: Pick<PayloadOptions, 'page'> }) => {
  const { success, error, data: validatedInput } = await GetProductsFavoritesInputSchema.safeParseAsync(input);
  if (!success) return errValidation(z.prettifyError(error));

  const user = await getMe();
  if (!user) return errUnauthenticated();

  const result = await getFavoritesProductsRepository({ user, options: validatedInput.options });
  return result;
});
