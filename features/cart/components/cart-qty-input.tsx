'use client';
import {
  InputNumber,
  InputNumberContent,
  InputNumberDecrement,
  InputNumberIncrement,
} from '@/components/ui/input-number';
import { useCartStore } from '../store';
import type { CartItem } from '../types';


interface Props {
  productId: CartItem['productId'];
  variantId: CartItem['variantId'];
  className?: string;
}

export function CartQtyInput({ productId, variantId, className }: Props) {
  const currentCart = useCartStore(store => store.cartItems.find(i => i.productId === productId && i.variantId === variantId));
  const updateQty = useCartStore(store => store.updateQty);
  const qty = currentCart?.qty ?? 1;

  const handleChange = (newQty: number): void => {
    if (currentCart == null) return;
    updateQty({
      productId: currentCart.productId,
      variantId: currentCart.variantId,
      qty: newQty,
    });
  };

  if (currentCart == null) {
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
