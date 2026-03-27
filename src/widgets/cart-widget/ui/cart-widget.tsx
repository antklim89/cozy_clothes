'use client';
import type { ReactNode } from 'react';
import { useQuery } from '@tanstack/react-query';

import { cartQueryOptions } from '@/entities/cart/api';
import { Item, ItemContent, ItemGroup, ItemHeader, ItemTitle } from '@/shared/ui/item';
import { CartWidgetEmpty } from './cart-widget-empty';

export function CartWidget({
  orderSlot,
  cartListSlot,
  cartTotalSlot,
}: {
  orderSlot: ReactNode;
  cartListSlot: ReactNode;
  cartTotalSlot: ReactNode;
}) {
  const cartQuery = useQuery(cartQueryOptions());
  if ((!cartQuery.data || cartQuery.data.length === 0) && !cartQuery.isPending) return <CartWidgetEmpty />;

  return (
    <Item className="container my-4">
      <ItemHeader>
        <ItemTitle>Cart</ItemTitle>
      </ItemHeader>
      <ItemContent className="flex flex-col gap-4 lg:flex-row">
        <ItemGroup className="flex-3">{cartListSlot}</ItemGroup>

        <ItemGroup className="flex-1">
          {cartTotalSlot}

          {cartQuery.isPending ? null : orderSlot}
        </ItemGroup>
      </ItemContent>
    </Item>
  );
}
