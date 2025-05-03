'use client';
import Link from 'next/link';
import type { ComponentProps } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { CartListFallback } from './fallbacks/cart-list-fallback';
import { CartListEmpty } from './ui/cart-list-empty';
import { CartListItem } from './ui/cart-list-item';
import { CartTotal } from './ui/cart-total';
import { useCartStoreIsHydrated } from '../hooks/useCartStoreHydrated';
import { useCartStore } from '../store';


export function CartList({ className, ...props }: ComponentProps<'section'>) {
  const cartItems = useCartStore(store => store.cartItems);

  if (!useCartStoreIsHydrated()) return <CartListFallback />;
  if (cartItems.length === 0) return <CartListEmpty />;
  return (
    <section className={cn('container my-8', className)} {...props}>
      <div className="grid gap-4 grid-cols-1 md:grid-cols-[3fr_1fr]">
        <div className="flex flex-col gap-4">
          {cartItems.map(cartItem => (
            <CartListItem
              cartItem={cartItem}
              key={`${cartItem.productId} - ${cartItem.variantId}`}
            />
          ))}
        </div>
        <div className="flex flex-col gap-2">
          <CartTotal />
          <Card className="p-8 flex justify-center w-full">
            <Button asChild>
              <Link href="/checkout">Checkout</Link>
            </Button>
          </Card>
        </div>
      </div>
    </section>
  );
}
