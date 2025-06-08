'use client';
import {
  InputNumber,
  InputNumberContent,
  InputNumberDecrement,
  InputNumberIncrement,
} from '@/components/ui/input-number';
import { useCartQuery } from '../hooks/use-cart-query';
import { useUpdateCartMutation } from '../hooks/use-update-cart-mutation';
import type { LocalCartItemType } from '../types';


interface Props {
  variantId: LocalCartItemType['variantId'];
  className?: string;
}

export function CartQtyInput({ variantId, className }: Props) {
  const { data: currentCart, isFetched } = useCartQuery();
  const { mutateAsync: updateQty } = useUpdateCartMutation();
  if (currentCart == null) return null;
  const currentCartItem = currentCart.find(item => item.variantId === variantId);
  const qty = currentCartItem?.qty ?? 1;

  async function handleChange(newQty: number) {
    if (currentCart == null) return;
    await updateQty({
      variantId,
      qty: newQty,
    });
  }

  if (currentCartItem == null || !isFetched) {
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
