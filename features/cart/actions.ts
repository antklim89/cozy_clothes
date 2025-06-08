'use server';
import '@/lib/server-only';
import { auth } from '@/features/users';
import { err } from '@/lib/result';
import { CartQtySchema } from './schemas';
import {
  addCartItemService,
  getCartByVariantIdsService,
  getCartItemByVariantIdService,
  getCartService,
  removeCartItemService,
  updateCartQtyService,
} from './services';
import type { ProductVariantType } from '../product';


export async function fetchCartAction() {
  const user = await auth();
  if (user == null) return err({ type: 'unauthorized', message: 'You are not logged in' });

  const result = await getCartService({ userId: user.id });
  return result;
}

export async function fetchCartByVariantIdsAction({ variantIds }: { variantIds: ProductVariantType['id'][] }) {
  const result = await getCartByVariantIdsService({ variantIds });
  return result;
}

export async function fetchCartItemByVariantIdAction({ variantId }: { variantId: ProductVariantType['id'] }) {
  const result = await getCartItemByVariantIdService({ variantId });
  return result;
}


export async function addCartItemAction({ variantId, qty }: { variantId: number; qty?: number }) {
  const { success, data: validatedQty } = await CartQtySchema.optional().safeParseAsync(qty);
  if (!success) return err({ type: 'validation', message: 'Invalid quantity' });

  const user = await auth();
  if (user == null) return err({ type: 'unauthorized', message: 'You are not logged in' });

  const result = await addCartItemService({
    variantId,
    userId: user.id,
    qty: validatedQty,
  });
  return result;
}

export async function removeCartItemAction({ variantId }: { variantId: number }) {
  const user = await auth();
  if (user == null) return err({ type: 'unauthorized', message: 'You are not logged in' });

  const result = await removeCartItemService({
    variantId,
    userId: user.id,
  });
  return result;
}

export async function updateCartQtyAction({ variantId, qty }: { variantId: number; qty: number }) {
  const { success, data: validatedQty } = await CartQtySchema.safeParseAsync(qty);
  if (!success) return err({ type: 'validation', message: 'Invalid quantity' });

  const user = await auth();
  if (user == null) return err({ type: 'unauthorized', message: 'You are not logged in' });

  const result = await updateCartQtyService({
    variantId,
    qty: validatedQty,
    userId: user.id,
  });
  return result;
}
