import 'server-only';
import { cache } from 'react';
import { getPayload } from '@/src/shared/lib/payload';
import { err, ok } from '@/src/shared/lib/result';
import { cartDto } from '../../model/dto';


export const addCartItemRepository = cache(async ({
  variantId,
  userId,
  qty = 1,
}: {
  variantId: number;
  userId: number;
  qty?: number;
}) => {
  try {
    const payload = await getPayload();

    const payloadResult = await payload.create({
      collection: 'cart',
      depth: 3,
      data: {
        user: userId,
        variant: variantId,
        qty,
      },
    });

    const result = cartDto(payloadResult);

    return ok(result);
  } catch (error) {
    console.error(error);
    return err({ type: 'unexpected', message: 'Failed to add cart item.' });
  }
});
