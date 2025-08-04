import 'server-only';
import { cache } from 'react';
import { getPayload } from '@/src/shared/lib/payload';
import { err, ok } from '@/src/shared/lib/result';


export const removeCartItemRepository = cache(async ({
  productId,
  userId,
}: {
  productId: number;
  userId: number;
}) => {
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
    return err({ type: 'unexpected', message: 'Failed to remove cart item.' });
  }
});
