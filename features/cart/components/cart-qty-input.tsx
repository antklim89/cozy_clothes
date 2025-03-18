'use client';
import {
  InputNumber,
  InputNumberContent,
  InputNumberDecrement,
  InputNumberIncrement,
} from '@/components/ui/input-number';
import { useCartStore } from '@/features/cart/store';
import type { CartItem } from '@/features/cart/types';


type Props = Pick<CartItem, 'product' | 'variant'> & { className?: string };

export function CartQtyInput({ product, variant, className }: Props) {
  const currentCart = useCartStore(store => store.cartItems.find(i => i.product.id === product.id && i.variant.id === variant.id));
  const updateQty = useCartStore(store => store.updateQty);
  const qty = currentCart?.qty ?? 1;

  const handleChange = (newQty: number): void => {
    if (currentCart == null) return;
    updateQty({
      productId: currentCart.product.id,
      variantId: currentCart.variant.id,
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
