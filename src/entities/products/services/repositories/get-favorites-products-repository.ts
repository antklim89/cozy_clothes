import 'server-only';

import { PRODUCTS_PER_PAGE } from '@/entities/products/config';
import { productPreviewDto } from '@/entities/products/model';
import type { UserType } from '@/entities/user/model';
import { getPayload } from '@/shared/lib/payload';
import { errUnexpected, ok } from '@/shared/lib/result';
import { paginationDto } from '@/shared/model/dto/pagination-dto';
import type { PayloadOptions } from '@/shared/model/types/types';

export async function getFavoritesProductsRepository({
  user,
  options,
}: {
  user: UserType;
  options: Pick<PayloadOptions, 'page'>;
}) {
  try {
    const payload = await getPayload();

    const productsPayloadResult = await payload.find({
      limit: PRODUCTS_PER_PAGE,
      collection: 'product-favorites',
      depth: 2,
      pagination: true,
      sort: '-createdAt',
      page: options.page,
      where: {
        authorId: { equals: user.id },
        'productId._status': { equals: 'published' },
      },
    });
    const products = {
      ...productsPayloadResult,
      docs: productsPayloadResult.docs.map(i => i.productId).filter(i => i != null && typeof i !== 'number'),
    };

    const productsResult = paginationDto(products, productPreviewDto);

    return ok(productsResult);
  } catch (error) {
    console.error(error);
    return errUnexpected('Failed to get product list. Try again later.');
  }
}
