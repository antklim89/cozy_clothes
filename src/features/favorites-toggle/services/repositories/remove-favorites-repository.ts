import 'server-only';
import { cache } from 'react';

import { getPayload } from '@/shared/lib/payload';
import { err, ok } from '@/shared/lib/result';

export const removeFavoritesRepository = cache(async ({ productId, userId }: { productId: number; userId: number }) => {
  try {
    const payload = await getPayload();
    const {
      docs: [favoriteToDelete],
    } = await payload.find({
      collection: 'product-favorites',
      pagination: false,
      where: {
        authorId: { equals: userId },
        productId: { equals: productId },
      },
    });
    if (!favoriteToDelete) return err({ type: 'not-found', message: 'Favorite to delete not found.' });

    await payload.delete({
      collection: 'product-favorites',
      id: favoriteToDelete.id,
      select: { productId: false, authorId: false },
    });

    return ok(null);
  } catch (error) {
    console.error(error);
    return err({ type: 'unexpected', message: 'Failed to add favorite product.' });
  }
});
