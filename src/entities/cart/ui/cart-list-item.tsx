import type { ReactNode } from 'react';
import Link from 'next/link';

import { getPrice } from '@/shared/lib/utils';
import { Badge } from '@/shared/ui/badge';
import { ColorCircle } from '@/shared/ui/color-circle';
import { Item, ItemActions, ItemContent, ItemHeader, ItemTitle } from '@/shared/ui/item';
import type { CartItemType } from '../model';

export function CartListItem({ cartItem, actionsSlot }: { cartItem: CartItemType; actionsSlot?: ReactNode }) {
  return (
    <Item key={cartItem.id} variant="outline">
      <ItemHeader>
        <Link href={`/products/${cartItem.product.id}`}>
          <ItemTitle>
            <span className="font-bold text-lg">{cartItem.product.baseTitle}</span>
            <br />
            <span className="font-normal font-sm">{cartItem.product.title}</span>
          </ItemTitle>
        </Link>
      </ItemHeader>
      <ItemContent>
        <span className="flex items-center gap-2">
          Size: <Badge>{cartItem.product.size.name}</Badge>
        </span>
        <span className="flex items-center gap-2">
          Color:
          <Badge>
            <ColorCircle {...cartItem.product.color} />
          </Badge>
        </span>
        <span className="flex items-center gap-2">
          Quantity: <Badge className="font-bold text-md">{cartItem.qty}</Badge>
        </span>

        <span className="flex items-center gap-2">
          Price:
          <span className="text-2xl">{getPrice({ price: cartItem.product.price, qty: cartItem.qty })}</span>
        </span>
      </ItemContent>

      <ItemActions className="self-end">{actionsSlot}</ItemActions>
    </Item>
  );
}
