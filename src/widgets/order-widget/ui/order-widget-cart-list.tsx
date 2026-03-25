import Link from 'next/link';

import type { CartItemType } from '@/entities/cart/model';
import { getPrice } from '@/shared/lib/utils';
import { Badge } from '@/shared/ui/badge';
import { ColorCircle } from '@/shared/ui/color-circle';
import { Item, ItemContent, ItemGroup, ItemHeader, ItemTitle } from '@/shared/ui/item';

export function OrderWidgetCartList({ cart }: { cart: CartItemType[] }) {
  const totalPrice = cart.reduce((acc, cartItem) => acc + cartItem.product.price * cartItem.qty, 0);

  return (
    <ItemGroup>
      {cart.map(cartItem => (
        <Item render={<Link href={`/products/${cartItem.product.id}`} />} key={cartItem.id} variant="outline">
          <ItemHeader>
            <ItemTitle>
              <span className="font-bold text-lg">{cartItem.product.baseTitle}</span>
              <br />
              <span className="font-normal font-sm">{cartItem.product.title}</span>
            </ItemTitle>
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
        </Item>
      ))}
      <Item>
        <ItemContent className="text-xl">
          Total Price: <span className="text-4xl">{getPrice({ price: totalPrice })}</span>
        </ItemContent>
      </Item>
    </ItemGroup>
  );
}
