'use client';
import Link from 'next/link';
import type { ComponentProps } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { CartListPlaceholder } from '@/features/cart/components/placeholders/cart-list-placeholder';
import { CartListEmpty } from '@/features/cart/components/ui/cart-list-empty';
import { CartListItem } from '@/features/cart/components/ui/cart-list-item';
import { CartTotal } from '@/features/cart/components/ui/cart-total';
import { useCartStoreIsHydrated } from '@/features/cart/hooks/useCartStoreHydrated';
import { useCartStore } from '@/features/cart/store';
import { cn } from '@/lib/utils';


export function CartList({ className, ...props }: ComponentProps<'section'>) {
  const cartItems = useCartStore(store => store.cartItems);

  if (!useCartStoreIsHydrated()) return <CartListPlaceholder />;
  if (cartItems.length === 0) return <CartListEmpty />;
  return (
    <section className={cn('container my-8', className)} {...props}>
      <div className="grid gap-4 grid-cols-1 md:grid-cols-[3fr_1fr]">
        <div className="flex flex-col gap-4">
          {cartItems.map(cartItem => (
            <CartListItem
              cartItem={cartItem}
              key={`${cartItem.product.id} - ${cartItem.variant.id}`}
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
