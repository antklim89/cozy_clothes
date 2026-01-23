import 'server-only';
import { cache } from 'react';

import { getPayload } from '@/shared/lib/payload';
import { errUnexpected, ok } from '@/shared/lib/result';

export const updateCartQtyRepository = cache(
  async ({ productId, userId, qty }: { productId: number; userId: number; qty: number }) => {
    try {
      const payload = await getPayload();

      await payload.update({
        collection: 'cart',
        data: {
          qty,
        },
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
      return errUnexpected('Failed to update cart item.');
    }
  },
);
