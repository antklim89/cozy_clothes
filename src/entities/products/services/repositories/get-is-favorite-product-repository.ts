import 'server-only';

import { getPayload } from '@/shared/lib/payload';
import { errNotFound, errUnexpected, ok } from '@/shared/lib/result';
import type { ProductType } from '../../model';

export async function getIsFavoriteProductRepository(id: ProductType['id'], userId: number) {
  try {
    const payload = await getPayload();

    const productPayloadResult = await payload.findByID({
      collection: 'products',
      id,
      depth: 0,
      select: {
        favorites: true,
        _status: true,
      },
      joins: {
        favorites: { limit: 1, where: { authorId: { equals: userId } } },
      },
    });
    if (productPayloadResult._status !== 'published') return errNotFound('Product not found.');

    return ok({
      id: productPayloadResult.id,
      isFavorite: productPayloadResult.favorites?.docs != null && productPayloadResult.favorites.docs.length > 0,
    });
  } catch (error) {
    console.error('[Error getFavoriteProductRepository]:', error);

    if (error instanceof Error && error.name === 'NotFound') {
      return errNotFound('Product not found.');
    }
    return errUnexpected('Failed to get product. Try again later.');
  }
}
