'use client';

import { useQuery } from '@tanstack/react-query';

import { cartQueryOptions } from '@/entities/cart/api';
import { Button } from '@/shared/ui/button';
import { InputNumber, InputNumberContent, InputNumberDecrement, InputNumberIncrement } from '@/shared/ui/input-number';
import { useAddCartMutation } from '../api/mutations/use-add-cart-mutation';
import { useRemoveCartMutation } from '../api/mutations/use-remove-cart-mutation';
import { useUpdateCartMutation } from '../api/mutations/use-update-cart-mutation';

export function AddToCartButton({ productId }: { productId: number }) {
  const addCartMutation = useAddCartMutation();
  const removeCartMutation = useRemoveCartMutation();
  const updateCartMutation = useUpdateCartMutation();
  const cartQuery = useQuery(cartQueryOptions());

  const currentCartItem = cartQuery.data?.find(item => item.productId === productId);
  const qty = currentCartItem?.qty ?? 1;
  const hasCartItem = cartQuery.data?.some(i => i.productId === productId) ?? false;

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
