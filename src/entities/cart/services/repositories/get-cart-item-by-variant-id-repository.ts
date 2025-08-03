import 'server-only';
import { cache } from 'react';
import { getPayload } from '@/src/shared/lib/payload';
import { err, ok } from '@/src/shared/lib/result';
import { cartDto } from '../../model/dto';


export const getCartItemByVariantIdRepository = cache(async ({ variantId }: { variantId: number }) => {
  try {
    const payload = await getPayload();

    const payloadResult = await payload.findByID({
      collection: 'product-variants',
      depth: 3,
      id: variantId,
    });

    const cartResult = cartDto({ variant: payloadResult });

    return ok(cartResult);
  } catch (error) {
    console.error(error);
    return err({ type: 'unexpected', message: 'Failed to get cart.' });
  }
});
