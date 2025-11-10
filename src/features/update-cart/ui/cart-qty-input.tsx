'use client';

import { useSuspenseQuery } from '@tanstack/react-query';

import { cartQueryOptions } from '@/entities/cart/api';
import type { LocalCartItemType } from '@/entities/cart/model';
import { InputNumber, InputNumberContent, InputNumberDecrement, InputNumberIncrement } from '@/shared/ui/input-number';
import { useUpdateCartMutation } from '../api/mutations/use-update-cart-mutation';

interface Props {
  productId: LocalCartItemType['productId'];
  className?: string;
}

export function CartQtyInput({ productId, className }: Props) {
  const cartQuery = useSuspenseQuery(cartQueryOptions());
  const { mutateAsync: updateQty } = useUpdateCartMutation();
  if (cartQuery.data == null) return null;
  const currentCartItem = cartQuery.data.find(item => item.productId === productId);
  const qty = currentCartItem?.qty ?? 1;

  async function handleChange(newQty: number) {
    if (cartQuery.data == null) return;
    await updateQty({
      productId,
      qty: newQty,
    });
  }

  if (currentCartItem == null || !cartQuery.isFetched) {
    return (
      <InputNumber className="opacity-0" value={0}>
        <InputNumberContent />
      </InputNumber>
    );
  }
  return (
    <InputNumber className={className} value={qty} onChange={handleChange}>
      <InputNumberDecrement aria-label="Decrement product quantity" />
      <InputNumberContent />
      <InputNumberIncrement aria-label="Increment product quantity" />
    </InputNumber>
  );
}
