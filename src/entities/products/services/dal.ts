import 'server-only';
import { cache } from 'react';
import type { ProductType } from '@/entities/products/model';
import type { ProductFilterType } from '@/entities/products/model';
import { err } from '@/shared/lib/result';
import type { PayloadOptions } from '@/shared/model/types/types';
import { getManyProductsRepository } from './repositories/get-many-products-repository';
import { getOneProductRepository } from './repositories/get-one-product-repository';
import { FetchProductListInputSchema } from '../model/schemas';


export const fetchProductList = cache(async ({ filter, options }: {
  filter: ProductFilterType;
  options: Pick<PayloadOptions, 'page' | 'sort'>;
}) => {
  const validatedInput = await FetchProductListInputSchema.safeParseAsync({ filter, options });

  if (!validatedInput.success) return err({ type: 'validation', message: validatedInput.error.message });

  const result = await getManyProductsRepository(validatedInput.data);
  return result;
});

export const fetchProduct = cache(async (id: ProductType['id']) => {
  const result = await getOneProductRepository(id);
  return result;
});
