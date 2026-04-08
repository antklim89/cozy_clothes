import type { ReactNode } from 'react';

import { Item, ItemContent, ItemHeader, ItemTitle } from '@/shared/ui/item';

export function OrdersWidget({ children }: { children: ReactNode }) {
  return (
    <Item className="container my-8 w-full">
      <ItemHeader className="flex-col items-start">
        <ItemTitle className="text-2xl">Orders</ItemTitle>
      </ItemHeader>

      <ItemContent>{children}</ItemContent>
    </Item>
  );
}
