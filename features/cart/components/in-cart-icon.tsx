'use client';
import { ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { ProductType } from '@/features/product';
import { useCartQuery } from '../hooks/use-cart-query';


export function InCartIcon({ productId }: { productId: ProductType['id'] }) {
  const { data: cart } = useCartQuery();
  const isInCart = cart.some(item => item.productId === productId);

  if (!isInCart) return null;
  return (
    <Button asChild className="absolute top-1 right-1 size-8 p-1 z-10">
      <ShoppingCart />
    </Button>
  );
}
