import 'server-only';
import { cache } from 'react';

import { getPayload } from '@/shared/lib/payload';
import { err, ok } from '@/shared/lib/result';

export const addFavoritesRepository = cache(async ({ productId, userId }: { productId: number; userId: number }) => {
  try {
    const payload = await getPayload();
    await payload.create({
      collection: 'product-favorites',
      data: {
        authorId: userId,
        productId,
      },
      select: { productId: false, authorId: false },
    });

    return ok(null);
  } catch (error) {
    console.error(error);
    return err({ type: 'unexpected', message: 'Failed to add favorite product.' });
  }
});
