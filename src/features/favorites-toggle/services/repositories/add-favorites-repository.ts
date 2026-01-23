import 'server-only';
import { cache } from 'react';
import { ValidationError } from 'payload';

import { getPayload } from '@/shared/lib/payload';
import { errConflict, errUnexpected, ok } from '@/shared/lib/result';

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
    if (error instanceof ValidationError && error.data.errors.some(e => e.message === 'Value must be unique')) {
      return errConflict('Product already in favorites.');
    }
    return errUnexpected('Failed to add favorite product.');
  }
});
