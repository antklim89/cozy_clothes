import 'server-only';
import { cache } from 'react';

import { getPayload } from '@/shared/lib/payload';
import { err, ok } from '@/shared/lib/result';
import type { LocalCartItemType } from '../../model';
import { cartDto } from '../../model/dto';

export const getCartRepository = cache(
  async ({ userId, localCart }: { userId: number; localCart?: LocalCartItemType[] }) => {
    try {
      const payload = await getPayload();

      if (localCart && localCart.length > 0) {
        await Promise.all(
          localCart.map(i =>
            payload
              .create({
                collection: 'cart',
                data: {
                  user: userId,
                  product: i.productId,
                  qty: i.qty,
                },
              })
              .catch(() => null),
          ),
        );
      }

      const payloadResult = await payload.find({
        collection: 'cart',
        depth: 3,
        pagination: false,
        where: {
          user: {
            equals: userId,
          },
        },
      });

      const cartResult = payloadResult.docs.map(cartDto);

      return ok(cartResult);
    } catch (error) {
      console.error(error);
      return err({ type: 'unexpected', message: 'Failed to get cart.' });
    }
  },
);
