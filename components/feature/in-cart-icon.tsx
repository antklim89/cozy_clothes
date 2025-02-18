'use client';
import { ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCartStore } from '@/lib/store';
import type { ProductType } from '@/lib/types';


export function InCartIcon({ productId }: { productId: ProductType['id'] }) {
  const isInCart = useCartStore(state => state.cartItems.findIndex(i => i.product.id === productId) >= 0);

  if (!isInCart) return null;
  return (
    <Button asChild className="absolute top-1 right-1 size-8 p-1 z-10">
      <ShoppingCart />
    </Button>
  );
}
