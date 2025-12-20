'use client';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';

import { cartQueryOptions } from '@/entities/cart/api';
import { CartList, CartListEmpty, CartListFallback, CartListItem, CartTotal } from '@/entities/cart/ui';
import { buttonVariants } from '@/shared/ui/button';
import { Card } from '@/shared/ui/card';
import { ErrorComponent } from '@/shared/ui/error-component';

export function Cart() {
  const cartQuery = useQuery(cartQueryOptions());

  if (cartQuery.isError) return <ErrorComponent error={cartQuery.error} />;
  if (!cartQuery.isFetchedAfterMount || cartQuery.isPending) return <CartListFallback />;
  if (!cartQuery.data || cartQuery.data.length === 0) return <CartListEmpty />;

  return (
    <CartList
      checkoutSlot={
        <Card className="flex w-full justify-center p-8">
          <Link className={buttonVariants()} href="#">
            Checkout
          </Link>
        </Card>
      }
      totalSlot={<CartTotal cartItems={cartQuery.data} />}
    >
      {cartQuery.data.map(cartItem => (
        <CartListItem cartItem={cartItem} key={cartItem.productId} />
      ))}
    </CartList>
  );
}
