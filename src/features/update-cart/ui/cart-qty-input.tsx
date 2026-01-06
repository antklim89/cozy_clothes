'use client';

import { useQuery } from '@tanstack/react-query';

import { cartQueryOptions } from '@/entities/cart/api';
import type { LocalCartItemType } from '@/entities/cart/model';
import { InputNumber, InputNumberContent, InputNumberDecrement, InputNumberIncrement } from '@/shared/ui/input-number';
import { CartQtyInputFallback } from './cart-qty-input-fallback';
import { useUpdateCartMutation } from '../api/mutations/use-update-cart-mutation';

interface Props {
  productId: LocalCartItemType['productId'];
  className?: string;
}

export function CartQtyInput({ productId, className }: Props) {
  const cartQuery = useQuery(cartQueryOptions());
  const { mutateAsync: updateQty } = useUpdateCartMutation();

  if (!cartQuery.isFetchedAfterMount || cartQuery.isPending) return <CartQtyInputFallback />;
  if (cartQuery.data == null) return null;

  const currentCartItem = cartQuery.data.find(item => item.product.id === productId);
  const qty = currentCartItem?.qty ?? 1;

  async function handleChange(newQty: number) {
    if (cartQuery.data == null) return;
    await updateQty({
      productId,
      qty: newQty,
    });
  }

  if (currentCartItem != null)
    return (
      <InputNumber className={className} value={qty} onChange={handleChange}>
        <InputNumberDecrement aria-label="Decrement product quantity" />
        <InputNumberContent />
        <InputNumberIncrement aria-label="Increment product quantity" />
      </InputNumber>
    );

  return (
    <InputNumber className="opacity-0" value={0}>
      <InputNumberContent />
    </InputNumber>
  );
}
