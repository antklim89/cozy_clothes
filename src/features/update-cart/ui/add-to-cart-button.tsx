'use client';

import { useQuery } from '@tanstack/react-query';
import { ShoppingCartIcon, Trash2Icon } from 'lucide-react';
import Link from 'next/link';

import { cartQueryOptions } from '@/entities/cart/api';
import { Button, buttonVariants } from '@/shared/ui/button';
import { InputNumber, InputNumberContent, InputNumberDecrement, InputNumberIncrement } from '@/shared/ui/input-number';
import { AddToCartButtonFallback } from './add-to-cart-button-fallback';
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

  const isLoading = addCartMutation.isPending || removeCartMutation.isPending;

  if (!cartQuery.isFetchedAfterMount || cartQuery.isPending) return <AddToCartButtonFallback />;

  if (hasCartItem) {
    return (
      <div className="grid grid-cols-2 gap-2">
        <Link className={buttonVariants()} href="/cart">
          <ShoppingCartIcon /> Go to Cart
        </Link>
        <InputNumber value={qty} onChange={handleChange}>
          <InputNumberDecrement aria-label="Decrement product quantity" />
          <InputNumberContent />
          <InputNumberIncrement aria-label="Increment product quantity" />
        </InputNumber>
        <Button variant="destructive" disabled={isLoading} onClick={handleRemoveCartItem}>
          <Trash2Icon /> Remove
        </Button>
      </div>
    );
  }
  return (
    <Button disabled={isLoading} onClick={handleAddCartItem}>
      <ShoppingCartIcon /> Add To Cart
    </Button>
  );
}
