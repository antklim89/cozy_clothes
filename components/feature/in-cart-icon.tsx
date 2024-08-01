'use client';
import { useCartStore } from '@/lib/store';
import { ShoppingCart } from 'lucide-react';
import { Button } from '../ui';

export const InCartIcon = ({ productId }: { productId: string }) => {
  const isInCart = useCartStore((state) => state.cartItems.findIndex((i) => i.product.id === productId) >= 0);

  if (!isInCart) return null;
  return (
    <Button asChild className="absolute top-1 right-1 size-8 p-1 z-10">
      <ShoppingCart />
    </Button>
  );
};
