'use client';
import type { ReactNode } from 'react';
import { useQuery } from '@tanstack/react-query';

import { cartQueryOptions } from '@/entities/cart/api';
import { CartList, CartListEmpty, CartListFallback, CartListItem, CartTotal } from '@/entities/cart/ui';
import { ErrorComponent } from '@/shared/ui/error-component';

export function Cart({ orderSlot }: { orderSlot: ReactNode }) {
  const cartQuery = useQuery(cartQueryOptions());

  if (cartQuery.isError) return <ErrorComponent error={cartQuery.error} />;
  if (!cartQuery.isFetchedAfterMount || cartQuery.isPending) return <CartListFallback />;
  if (!cartQuery.data || cartQuery.data.length === 0) return <CartListEmpty />;

  return (
    <CartList orderSlot={orderSlot} total={<CartTotal cartItems={cartQuery.data} />}>
      {cartQuery.data.map(cartItem => (
        <CartListItem cartItem={cartItem} key={cartItem.product.id} />
      ))}
    </CartList>
  );
}
