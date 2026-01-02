import 'server-only';

import { getPayload } from '@/shared/lib/payload';
import { err, ok } from '@/shared/lib/result';
import type { ProductType } from '../../model';

export async function getFavoriteProductRepository(id: ProductType['id'], userId: number) {
  try {
    const payload = await getPayload();

    const productPayloadResult = await payload.findByID({
      collection: 'products',
      id,
      depth: 0,
      select: {
        favorites: true,
      },
      joins: {
        favorites: { limit: 1, where: { authorId: { equals: userId } } },
      },
    });

    return ok({
      id: productPayloadResult.id,
      isFavorite: productPayloadResult.favorites?.docs != null && productPayloadResult.favorites.docs.length > 0,
    });
  } catch (error) {
    console.error('[Error getFavoriteProductRepository]:', error);

    if (error instanceof Error && error.name === 'NotFound') {
      return err({ type: 'not-found', message: 'Product not found.' });
    }
    return err({ type: 'unexpected', message: 'Failed to get product. Try again later.' });
  }
}
