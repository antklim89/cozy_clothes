import 'server-only';

import { getPayload } from '@/shared/lib/payload';
import { errUnexpected, ok } from '@/shared/lib/result';
import { cartDto } from '../../model/dto';
import type { CartItemType, LocalCartItemType } from '../../model/types';

export async function getLocalCartRepository({ localCart }: { localCart: LocalCartItemType[] }) {
  try {
    const payload = await getPayload();
    const productIds = localCart.map(item => item.productId);

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

    const cartResult: CartItemType[] = payloadResult.docs.map(product => {
      const qty = localCart.find(item => item.productId === product.id)?.qty || 1;
      return cartDto({ qty, product });
    });

    return ok(cartResult);
  } catch (error) {
    console.error(error);
    return errUnexpected('Failed to get cart.');
  }
}
