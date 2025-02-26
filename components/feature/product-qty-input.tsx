'use client';
import { useSearchParams } from 'next/navigation';
import {
  InputNumber,
  InputNumberContent,
  InputNumberDecrement,
  InputNumberIncrement,
} from '@/components/ui/input-number';
import { useCartStore } from '@/lib/cart-store';
import type { ProductType, ProductVariantType } from '@/lib/types';


interface Props {
  product: ProductType;
  variant?: ProductVariantType;
  qty?: number;
  className?: string;
}

export function ProductQtyInput({
  qty: qtyProp,
  product,
  variant: variantProp,
  ...props
}: Props) {
  const updateQty = useCartStore(store => store.updateQty);
  const variantParam = useSearchParams().get('v');
  const variantId = variantProp?.id ?? (variantParam != null ? Number(variantParam) : null) ?? product.variants[0]?.id;

  const qty = useCartStore(store => qtyProp
    ?? (store.cartItems.find(i => i.product.id === product.id && i.variant.id === variantId)?.qty)
    ?? 1,
  );

  const handleChange = (newQty: number): void => {
    if (variantId == null) return;
    return updateQty({
      productId: product.id,
      variantId,
      qty: newQty,
    });
  };

  return (
    <InputNumber value={qty} onChange={handleChange} {...props}>
      <InputNumberDecrement aria-label="Decrement product quantity" />
      <InputNumberContent />
      <InputNumberIncrement aria-label="Increment product quantity" />
    </InputNumber>
  );
}
