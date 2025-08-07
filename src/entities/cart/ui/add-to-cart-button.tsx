'use client';
import { Button } from '@/src/shared/ui/button';
import {
  InputNumber,
  InputNumberContent,
  InputNumberDecrement,
  InputNumberIncrement,
} from '@/src/shared/ui/input-number';
import { useAddCartMutation } from '../hooks/use-add-cart-mutation';
import { useCartQuery } from '../hooks/use-cart-query';
import { useRemoveCartMutation } from '../hooks/use-remove-cart-mutation';
import { useUpdateCartMutation } from '../hooks/use-update-cart-mutation';

export function AddToCartButton({ productId }: { productId: number }) {
  const addCartMutation = useAddCartMutation();
  const removeCartMutation = useRemoveCartMutation();
  const updateCartMutation = useUpdateCartMutation();
  const cartQuery = useCartQuery();
  const currentCartItem = cartQuery.data.find(item => item.productId === productId);
  const qty = currentCartItem?.qty ?? 1;
  const hasCartItem = cartQuery.data.some(i => i.productId === productId);

  async function handleRemoveCartItem() {
    await removeCartMutation.mutateAsync({
      productId,
    });
  }
  async function handleAddCartItem() {
    await addCartMutation.mutateAsync({
      productId,
      qty: 1,
    });
  }

  async function handleChange(newQty: number) {
    await updateCartMutation.mutateAsync({
      productId,
      qty: newQty,
    });
  }

  const isLoading = cartQuery.isPending || addCartMutation.isPending || removeCartMutation.isPending;

  if (hasCartItem) {
    return (
      <div className="flex gap-4">
        <Button className="w-full" disabled={isLoading} onClick={handleRemoveCartItem}>
          Remove From Cart
        </Button>
        <InputNumber value={qty} onChange={handleChange}>
          <InputNumberDecrement aria-label="Decrement product quantity" />
          <InputNumberContent />
          <InputNumberIncrement aria-label="Increment product quantity" />
        </InputNumber>
      </div>
    );
  }
  return (
    <Button className="w-full" disabled={isLoading} onClick={handleAddCartItem}>
      Add To Cart
    </Button>
  );
}
