import 'server-only';
import { z } from 'zod/v4-mini';

import { err } from '@/shared/lib/result';
import { addCartItemRepository } from './repositories/add-cart-item-repository';
import { getCartByProductIdsRepository } from './repositories/get-cart-by-product-ids-repository';
import { getCartItemByProductIdRepository } from './repositories/get-cart-item-by-product-id-repository';
import { getCartRepository } from './repositories/get-cart-repository';
import { removeCartItemRepository } from './repositories/remove-cart-item-repository';
import { updateCartQtyRepository } from './repositories/update-cart-qty-repository';
import { checkAuthentication } from '../@x/user/services';
import { CartQtySchema } from '../model';

export async function getCart() {
  const user = await checkAuthentication();
  if (user == null) return err({ type: 'unauthorized', message: 'You are not logged in' });

  const result = await getCartRepository({ userId: user.id });
  return result;
}

export async function getCartByProductIds({ productIds }: { productIds: number[] }) {
  const result = await getCartByProductIdsRepository({ productIds });
  return result;
}

export async function getCartItemByProductId({ productId }: { productId: number }) {
  const result = await getCartItemByProductIdRepository({ productId });
  return result;
}

export async function addCartItem({ productId, qty }: { productId: number; qty?: number }) {
  const { success, data: validatedQty } = await z.optional(CartQtySchema).safeParseAsync(qty);
  if (!success) return err({ type: 'validation', message: 'Invalid quantity' });

  const user = await checkAuthentication();
  if (user == null) return err({ type: 'unauthorized', message: 'You are not logged in' });

  const result = await addCartItemRepository({
    productId,
    userId: user.id,
    qty: validatedQty,
  });
  return result;
}

export async function removeCartItem({ productId }: { productId: number }) {
  const user = await checkAuthentication();
  if (user == null) return err({ type: 'unauthorized', message: 'You are not logged in' });

  const result = await removeCartItemRepository({
    productId,
    userId: user.id,
  });
  return result;
}

export async function updateCartQty({ productId, qty }: { productId: number; qty: number }) {
  const { success, data: validatedQty } = await CartQtySchema.safeParseAsync(qty);
  if (!success) return err({ type: 'validation', message: 'Invalid quantity' });

  const user = await checkAuthentication();
  if (user == null) return err({ type: 'unauthorized', message: 'You are not logged in' });

  const result = await updateCartQtyRepository({
    productId,
    qty: validatedQty,
    userId: user.id,
  });
  return result;
}
