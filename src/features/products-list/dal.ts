import 'server-only';
import { cache } from 'react';
import { z } from 'zod/v4-mini';
import { ProductFilterSchema, type ProductFilterType } from '@/src/entities/products/model';
import { getManyProductsRepository } from '@/src/entities/products/repositories';
import { err, okMap } from '@/src/shared/lib/result';
import { PayloadOptionsSchema } from '@/src/shared/model/schemas';
import type { PayloadOptions } from '@/src/shared/model/types';


export const fetchNewProducts = cache(async () => {
  const result = await getManyProductsRepository({
    options: {
      sort: '-createdAt',
      pagination: false,
    },
  });

  return okMap(result, r => r.docs);
});

export const fetchDiscountProducts = cache(async () => {
  const result = await getManyProductsRepository({
    options: {
      sort: '-discount',
      pagination: false,
    },
  });

  return okMap(result, r => r.docs);
});

export const fetchProductList = cache(async ({ filter, options }: {
  filter: ProductFilterType;
  options: Pick<PayloadOptions, 'page'>;
}) => {
  const validatedInput = await z.object({
    filter: ProductFilterSchema,
    options: PayloadOptionsSchema.pick({ page: true }),
  }).safeParseAsync({ filter, options });

  if (!validatedInput.success) return err({ type: 'validation', message: validatedInput.error.message });

  const result = await getManyProductsRepository(validatedInput.data);
  return result;
});

