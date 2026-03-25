import type { ReactNode } from 'react';

import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card';
import { Item, ItemContent, ItemHeader, ItemTitle } from '@/shared/ui/item';

export function OrderWidget({ userInfoSlot, cartSlot }: { userInfoSlot: ReactNode; cartSlot: ReactNode }) {
  return (
    <section className="container my-4 flex flex-col-reverse items-start gap-4 md:flex-row">
      <Card className="w-full flex-2">
        <CardHeader>
          <CardTitle>User info</CardTitle>
        </CardHeader>
        <CardContent>{userInfoSlot}</CardContent>
      </Card>
      <Item className="w-full flex-1">
        <ItemHeader>
          <ItemTitle>Cart</ItemTitle>
        </ItemHeader>
        <ItemContent>{cartSlot}</ItemContent>
      </Item>
    </section>
  );
}
