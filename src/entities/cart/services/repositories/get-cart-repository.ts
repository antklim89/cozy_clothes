import 'server-only';
import { cache } from 'react';

import { getPayload } from '@/shared/lib/payload';
import { err, ok } from '@/shared/lib/result';
import type { Product } from '@/shared/model/types/payload-types.generated';
import type { LocalCartItemType } from '../../model';
import { cartDto } from '../../model/dto';

export const getAndSyncCartRepository = cache(
  async ({ userId, localCart }: { userId: number; localCart?: LocalCartItemType[] }) => {
    try {
      const payload = await getPayload();
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

      if (localCart && localCart.length > 0) {
        await Promise.all(
          localCart.map(async localCartItem => {
            const isInServerCart = payloadResult.docs.some(i => (i.product as Product).id === localCartItem.productId);
            if (isInServerCart) return;

            const addedLocalCart = await payload.create({
              collection: 'cart',
              depth: 3,
              data: {
                user: userId,
                product: localCartItem.productId,
                qty: localCartItem.qty,
              },
            });

            payloadResult.docs.push(addedLocalCart);
          }),
        );
      }

      const cartResult = payloadResult.docs.map(cartDto);

      return ok(cartResult);
    } catch (error) {
      console.error(error);
      return err({ type: 'unexpected', message: 'Failed to get cart.' });
    }
  },
);
