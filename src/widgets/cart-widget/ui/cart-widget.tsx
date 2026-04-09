'use client';
import type { ReactNode } from 'react';
import { useQuery } from '@tanstack/react-query';

import { cartQueryOptions } from '@/entities/cart/api';
import { CartListEmpty } from '@/entities/cart/ui';
import { Item, ItemContent, ItemGroup, ItemHeader, ItemTitle } from '@/shared/ui/item';

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
  if ((!cartQuery.data || cartQuery.data.length === 0) && !cartQuery.isPending) return <CartListEmpty />;

  return (
    <Item className="container my-4">
      <ItemHeader>
        <ItemTitle>Cart</ItemTitle>
      </ItemHeader>
      <ItemContent className="flex flex-col gap-4 lg:flex-row">
        <ItemGroup className="flex-3">{cartListSlot}</ItemGroup>

        <ItemGroup className="flex-1">
          {cartTotalSlot}

          {!cartQuery.isFetchedAfterMount || cartQuery.isPending ? null : orderSlot}
        </ItemGroup>
      </ItemContent>
    </Item>
  );
}
