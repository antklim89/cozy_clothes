import 'server-only';
import type { Where } from 'payload';

import { getPayload } from '@/shared/lib/payload';
import { err, ok } from '@/shared/lib/result';
import { paginationDto } from '@/shared/model/dto/pagination-dto';
import type { PayloadOptions } from '@/shared/model/types/types';
import { getMe } from '../../@x/user/services';
import { PRODUCTS_PER_PAGE } from '../../config';
import type { ProductFilterType } from '../../model';
import { productPreviewDto } from '../../model/dto';

export async function getManyProductsRepository({
  options = {},
  filter: { category, countries, minPrice, maxPrice, search } = {},
}: {
  options?: PayloadOptions;
  filter?: ProductFilterType;
}) {
  try {
    const payload = await getPayload();
    const user = await getMe();

    const where: Where = {};
    if (countries != null) where['productBase.country'] = { in: countries };
    if (category != null) where['productBase.category'] = { in: category };
    if (search != null) where.or = [{ title: { contains: search } }, { description: { contains: search } }];

    if (minPrice != null && maxPrice != null) where.price = { greater_than_equal: minPrice, less_than_equal: maxPrice };
    else if (minPrice != null) where.price = { greater_than_equal: minPrice };
    else if (maxPrice != null) where.price = { less_than_equal: maxPrice };

    const productsPayloadResult = await payload.find({
      ...options,
      limit: options.limit ?? PRODUCTS_PER_PAGE,
      where,
      collection: 'products',
      depth: 2,
      sort: options.sort ?? 'createdAt',
      joins: {
        favorites: user ? { limit: 1, where: { authorId: { equals: user.id } } } : false,
      },
    });

    const productsResult = paginationDto(productsPayloadResult, productPreviewDto);

    return ok(productsResult);
  } catch (error) {
    console.error('[Error getManyProductsService]:', error);
    return err({ type: 'unexpected', message: 'Failed to get product list. Try again later.' });
  }
}
