'use client';

import { useQuery } from '@tanstack/react-query';

import { cartQueryOptions } from '@/entities/cart/api';
import type { LocalCartItemType } from '@/entities/cart/model';
import { NumberField } from '@/shared/ui/number-field';
import { CartQtyInputFallback } from './cart-qty-input-fallback';
import { useUpdateCartMutation } from '../api/mutations/use-update-cart-mutation';

export function CartQtyInput({ productId }: { productId: LocalCartItemType['productId'] }) {
  const cartQuery = useQuery(cartQueryOptions());
  const { mutateAsync: updateQty } = useUpdateCartMutation();

  if (!cartQuery.isFetchedAfterMount || cartQuery.isPending) return <CartQtyInputFallback />;
  if (cartQuery.data == null) return null;

  const currentCartItem = cartQuery.data.find(item => item.product.id === productId);
  const qty = currentCartItem?.qty ?? 1;

  async function handleChange(newQty: number | null) {
    if (!newQty) return;
    if (cartQuery.data == null) return;
    await updateQty({
      productId,
      qty: newQty,
    });
  }

  if (currentCartItem == null) return <NumberField className="opacity-0" value={0} />;
  return <NumberField value={qty} min={1} max={10} onValueChange={handleChange} />;
}
