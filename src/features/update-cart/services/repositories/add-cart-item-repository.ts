import 'server-only';
import { cache } from 'react';

import { cartDto } from '@/entities/cart/model';
import { getPayload } from '@/shared/lib/payload';
import { errUnexpected, ok } from '@/shared/lib/result';

export const addCartItemRepository = cache(
  async ({ productId, userId, qty = 1 }: { productId: number; userId: number; qty?: number }) => {
    try {
      const payload = await getPayload();

      const payloadResult = await payload.create({
        collection: 'cart',
        depth: 3,
        data: {
          user: userId,
          product: productId,
          qty,
        },
      });

      const cart = cartDto(payloadResult);

      return ok(cart);
    } catch (error) {
      console.error(error);
      return errUnexpected('Failed to add cart item.');
    }
  },
);
