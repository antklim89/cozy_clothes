import 'server-only';
import { cache } from 'react';
import { getPayload } from '@/src/shared/lib/payload';
import { err, ok } from '@/src/shared/lib/result';


export const updateCartQtyRepository = cache(async ({
  variantId,
  userId,
  qty,
}: {
  variantId: number;
  userId: number;
  qty: number;
}) => {
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
        variant: {
          equals: variantId,
        },
      },
    });

    return ok(null);
  } catch (error) {
    console.error(error);
    return err({ type: 'unexpected', message: 'Failed to update cart item.' });
  }
});
