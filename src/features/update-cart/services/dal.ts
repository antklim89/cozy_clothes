import 'server-only';
import { z } from 'zod/v4-mini';

import { CartQtySchema } from '@/entities/cart/model';
import { getMe } from '@/entities/user/services';
import { errUnauthenticated, errValidation } from '@/shared/lib/result';
import { addCartItemRepository } from './repositories/add-cart-item-repository';
import { removeCartItemRepository } from './repositories/remove-cart-item-repository';
import { updateCartQtyRepository } from './repositories/update-cart-qty-repository';

export async function addCartItem({ productId, qty }: { productId: number; qty?: number }) {
  const { success, data: validatedQty } = await z.optional(CartQtySchema).safeParseAsync(qty);
  if (!success) return errValidation('Invalid quantity');

  const user = await getMe();
  if (user == null) return errUnauthenticated('You are not logged in');

  const result = await addCartItemRepository({
    productId,
    userId: user.id,
    qty: validatedQty,
  });
  return result;
}

export async function removeCartItem({ productId }: { productId: number }) {
  const user = await getMe();
  if (user == null) return errUnauthenticated('You are not logged in');

  const result = await removeCartItemRepository({
    productId,
    userId: user.id,
  });
  return result;
}

export async function updateCartQty({ productId, qty }: { productId: number; qty: number }) {
  const { success, data: validatedQty } = await CartQtySchema.safeParseAsync(qty);
  if (!success) return errValidation('Invalid quantity');

  const user = await getMe();
  if (user == null) return errUnauthenticated('You are not logged in');

  const result = await updateCartQtyRepository({
    productId,
    qty: validatedQty,
    userId: user.id,
  });
  return result;
}
