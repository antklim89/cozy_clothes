import 'server-only';
import { cache } from 'react';
import { getPayload } from '@/shared/lib/payload';
import { err, ok } from '@/shared/lib/result';
import { cartDto } from '../../model/dto';


export const getCartRepository = cache(async ({ userId }: { userId: number }) => {
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

    const cartResult = payloadResult.docs.map(cartDto);

    return ok(cartResult);
  } catch (error) {
    console.error(error);
    return err({ type: 'unexpected', message: 'Failed to get cart.' });
  }
});
