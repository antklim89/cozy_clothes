import 'server-only';
import { cache } from 'react';
import { ValidationError } from 'payload';

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
    if (error instanceof ValidationError) {
      if (error.data.errors.some(e => e.message === 'Value must be unique')) {
        return err({ type: 'conflict', message: 'Product already in favorites.' });
      }
    }
    return err({ type: 'unexpected', message: 'Failed to add favorite product.' });
  }
});
