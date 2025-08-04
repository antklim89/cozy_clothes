import 'server-only';
import { cache } from 'react';
import { getPayload } from '@/src/shared/lib/payload';
import { err, ok } from '@/src/shared/lib/result';
import { cartDto } from '../../model/dto';
import type { CartItemType } from '../../model/types';


export const getCartByProductIdsRepository = cache(async ({ productIds }: { productIds: number[] }) => {
  try {
    const payload = await getPayload();

    const payloadResult = await payload.find({
      collection: 'products',
      depth: 3,
      pagination: false,
      where: {
        id: {
          in: productIds,
        },
      },
    });

    const cartResult: CartItemType[] = payloadResult.docs.map(product => cartDto({ qty: 1, product }));

    return ok(cartResult);
  } catch (error) {
    console.error(error);
    return err({ type: 'unexpected', message: 'Failed to get cart.' });
  }
});
