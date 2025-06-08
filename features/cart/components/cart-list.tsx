'use client';
import Link from 'next/link';
import type { ComponentProps } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { CartListEmpty } from './ui/cart-list-empty';
import { CartListItem } from './ui/cart-list-item';
import { CartTotal } from './ui/cart-total';
import { useCartQuery } from '../hooks/use-cart-query';


export function CartList({ className, ...props }: ComponentProps<'section'>) {
  const { data: cartItems, isFetched } = useCartQuery();

  if (!isFetched) return null;

  if (cartItems.length === 0) return <CartListEmpty />;
  return (
    <section className={cn('container my-8', className)} {...props}>
      <div className="grid gap-4 grid-cols-1 md:grid-cols-[3fr_1fr]">
        <div className="flex flex-col gap-4">
          {cartItems.map(cartItem => (
            <CartListItem
              cartItem={cartItem}
              key={cartItem.variantId}
            />
          ))}
        </div>
        <div className="flex flex-col gap-2">
          <CartTotal cartItems={cartItems} />
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
