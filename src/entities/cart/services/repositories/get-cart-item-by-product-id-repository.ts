import 'server-only';
import { cache } from 'react';

import { getPayload } from '@/shared/lib/payload';
import { err, ok } from '@/shared/lib/result';
import { cartDto } from '../../model/dto';

export const getCartItemByProductIdRepository = cache(async ({ productId }: { productId: number }) => {
  try {
    const payload = await getPayload();

    const payloadResult = await payload.findByID({
      collection: 'products',
      depth: 3,
      id: productId,
    });

    const cart = cartDto({ qty: 1, product: payloadResult });

    return ok(cart);
  } catch (error) {
    console.error(error);
    return err({ type: 'unexpected', message: 'Failed to get cart.' });
  }
});
