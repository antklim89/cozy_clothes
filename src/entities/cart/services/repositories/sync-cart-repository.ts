import 'server-only';

import { getPayload } from '@/shared/lib/payload';
import { errUnexpected, ok } from '@/shared/lib/result';
import { cartDto, type LocalCartItemType } from '../../model';

export async function syncCartRepository({ userId, localCart }: { userId: number; localCart: LocalCartItemType[] }) {
  try {
    const payload = await getPayload();

    const addedLocalCart = await Promise.all(
      localCart.map(async localCartItem => {
        try {
          return await payload.create({
            collection: 'cart',
            depth: 3,
            data: {
              user: userId,
              product: localCartItem.productId,
              qty: localCartItem.qty,
            },
          });
        } catch {
          return null;
        }
      }),
    ).then(d => d.filter(i => i != null));

    return ok(addedLocalCart.map(cartDto));
  } catch (error) {
    console.error(error);
    return errUnexpected('Failed to get cart.');
  }
}
