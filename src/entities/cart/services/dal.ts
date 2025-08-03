import 'server-only';
import { z } from 'zod/v4-mini';
import { err } from '@/src/shared/lib/result';
import { addCartItemRepository } from './repositories/add-cart-item-repository';
import { getCartByVariantIdsRepository } from './repositories/get-cart-by-variant-ids-repository';
import { getCartItemByVariantIdRepository } from './repositories/get-cart-item-by-variant-id-repository';
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

export async function getCartByVariantIds({ variantIds }: { variantIds: number[] }) {
  const result = await getCartByVariantIdsRepository({ variantIds });
  return result;
}

export async function getCartItemByVariantId({ variantId }: { variantId: number }) {
  const result = await getCartItemByVariantIdRepository({ variantId });
  return result;
}


export async function addCartItem({ variantId, qty }: { variantId: number; qty?: number }) {
  const { success, data: validatedQty } = await z.optional((CartQtySchema)).safeParseAsync(qty);
  if (!success) return err({ type: 'validation', message: 'Invalid quantity' });

  const user = await checkAuthentication();
  if (user == null) return err({ type: 'unauthorized', message: 'You are not logged in' });

  const result = await addCartItemRepository({
    variantId,
    userId: user.id,
    qty: validatedQty,
  });
  return result;
}

export async function removeCartItem({ variantId }: { variantId: number }) {
  const user = await checkAuthentication();
  if (user == null) return err({ type: 'unauthorized', message: 'You are not logged in' });

  const result = await removeCartItemRepository({
    variantId,
    userId: user.id,
  });
  return result;
}

export async function updateCartQty({ variantId, qty }: { variantId: number; qty: number }) {
  const { success, data: validatedQty } = await CartQtySchema.safeParseAsync(qty);
  if (!success) return err({ type: 'validation', message: 'Invalid quantity' });

  const user = await checkAuthentication();
  if (user == null) return err({ type: 'unauthorized', message: 'You are not logged in' });

  const result = await updateCartQtyRepository({
    variantId,
    qty: validatedQty,
    userId: user.id,
  });
  return result;
}
