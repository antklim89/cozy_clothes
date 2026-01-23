import 'server-only';
import { cache } from 'react';

import { getPayload } from '@/shared/lib/payload';
import { errUnexpected, ok } from '@/shared/lib/result';

export const removeCartItemRepository = cache(async ({ productId, userId }: { productId: number; userId: number }) => {
  try {
    const payload = await getPayload();

    await payload.delete({
      collection: 'cart',
      where: {
        user: {
          equals: userId,
        },
        product: {
          equals: productId,
        },
      },
    });

    return ok(null);
  } catch (error) {
    console.error(error);
    return errUnexpected('Failed to remove cart item.');
  }
});
