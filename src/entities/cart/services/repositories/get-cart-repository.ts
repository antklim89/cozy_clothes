import 'server-only';

import { getPayload } from '@/shared/lib/payload';
import { errUnexpected, ok } from '@/shared/lib/result';
import { cartDto } from '../../model/dto';

export async function getCartRepository({ userId }: { userId: number }) {
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

    return ok(payloadResult.docs.map(cartDto));
  } catch (error) {
    console.error(error);
    return errUnexpected('Failed to get cart.');
  }
}
