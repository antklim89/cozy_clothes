'use client';

import { useQuery } from '@tanstack/react-query';
import { ShoppingCartIcon, TrashIcon } from 'lucide-react';
import Link from 'next/link';

import { cartQueryOptions } from '@/entities/cart/api';
import { Button, buttonVariants } from '@/shared/ui/button';
import { NumberField } from '@/shared/ui/number-field';
import { AddToCartButtonFallback } from './add-to-cart-button-fallback';
import { useAddCartMutation } from '../api/mutations/use-add-cart-mutation';
import { useRemoveCartMutation } from '../api/mutations/use-remove-cart-mutation';
import { useUpdateCartMutation } from '../api/mutations/use-update-cart-mutation';

export function AddToCartButton({ productId }: { productId: number }) {
  const addCartMutation = useAddCartMutation();
  const removeCartMutation = useRemoveCartMutation();
  const updateCartMutation = useUpdateCartMutation();
  const cartQuery = useQuery(cartQueryOptions());

  const currentCartItem = cartQuery.data?.find(item => item.product.id === productId);
  const qty = currentCartItem?.qty ?? 1;
  const hasCartItem = cartQuery.data?.some(i => i.product.id === productId) ?? false;

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

  async function handleChange(newQty: number | null) {
    if (newQty == null) return;
    await updateCartMutation.mutateAsync({
      productId,
      qty: newQty,
    });
  }

  const isLoading = addCartMutation.isPending || removeCartMutation.isPending;

  if (!cartQuery.isFetchedAfterMount || cartQuery.isPending) return <AddToCartButtonFallback />;

  if (hasCartItem) {
    return (
      <div className="flex gap-2">
        <Link className={buttonVariants({ size: 'lg', className: 'grow basis-0' })} href="/cart">
          <ShoppingCartIcon className="hidden sm:inline-block" /> Go to Cart
        </Link>
        <Button
          aria-label="Remove from cart"
          size="icon-lg"
          variant="destructive"
          disabled={isLoading}
          onClick={handleRemoveCartItem}
        >
          <TrashIcon />
        </Button>
        <NumberField size="lg" value={qty} min={1} max={10} onValueChange={handleChange} />
      </div>
    );
  }
  return (
    <Button disabled={isLoading} onClick={handleAddCartItem}>
      <ShoppingCartIcon /> Add To Cart
    </Button>
  );
}
