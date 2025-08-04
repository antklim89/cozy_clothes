import 'server-only';
import type { Where } from 'payload';
import { paginationDto } from '@/src/shared/dto/pagination-dto';
import { getPayload } from '@/src/shared/lib/payload';
import { err, ok } from '@/src/shared/lib/result';
import type { PayloadOptions } from '@/src/shared/model/types';
import { PRODUCTS_PER_PAGE } from '../../config';
import type { ProductFilterType } from '../../model';
import { productPreviewDto } from '../../model/dto';


export async function getManyProductsRepository({
  options = {},
  filter: {
    category,
    countries,
    minPrice,
    maxPrice,
    search,
  } = {},
}: {
  options?: PayloadOptions;
  filter?: ProductFilterType;
}) {
  try {
    const payload = await getPayload();

    const where: Where = {};
    if (countries != null) where.country = { in: countries };
    if (category != null) where.category = { equals: category };
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
    });

    const productsResult = paginationDto(productsPayloadResult, productPreviewDto);

    return ok(productsResult);
  } catch (error) {
    console.error('[Error getManyProductsService]:', error);
    return err({ type: 'unexpected', message: 'Failed to fetch product list. Try again later.' });
  }
}
