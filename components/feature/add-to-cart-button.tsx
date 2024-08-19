'use client';
import { Button } from '@/components/ui/button';
import type { ProductType } from '@/lib/schemas';
import { type CartItem, useCartStore } from '@/lib/store';
import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import {} from 'zustand/shallow';

interface Props {
  product: ProductType;
}

export const AddToCartButton = ({ product }: Props) => {
  const searchParams = useSearchParams();
  const qty = Number(searchParams.get('qty') ?? 1);
  const size = searchParams.get('size') ?? product.options.sizes?.[0] ?? null;
  const color = searchParams.get('color') ?? product.options.colors?.[0].name ?? null;
  const cartId = `${product.id}-${size}-${color}`;

  const addToCart = useCartStore((store) => store.addToCart);
  const removeFromCart = useCartStore((store) => store.removeFromCart);
  const updateCart = useCartStore((store) => store.updateCart);
  const hasCartItem = useCartStore((store) => store.cartItems.findIndex((i) => i.id === cartId) >= 0);

  const handleAddToCart = () => {
    const newCartItem: CartItem = {
      id: cartId,
      product,
      qty: Number(searchParams.get('qty') ?? 1),
      size,
      color,
    };
    addToCart(newCartItem);
  };

  const handleRemoveFromCart = () => {
    removeFromCart(cartId);
  };

  useEffect(() => {
    if (!hasCartItem) return;
    updateCart(cartId, {
      qty,
      size,
      color,
    });
  }, [cartId, qty, size, color, updateCart, hasCartItem]);

  if (hasCartItem) return <Button onClick={handleRemoveFromCart}>Remove From Cart</Button>;
  return <Button onClick={handleAddToCart}>Add To Cart</Button>;
};
