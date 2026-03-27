'use client';

import type { CartItemType } from '@/entities/cart/model';
import { calculatePrice, getPrice } from '@/shared/lib/utils';
import { Item, ItemContent } from '@/shared/ui/item';

export function CartWidgetTotal({ cartItems }: { cartItems: CartItemType[] }) {
  const totalPrice = cartItems.reduce((total, { qty, product }) => {
    return total + calculatePrice({ qty, price: product.price, discount: product.discount });
  }, 0);

  return (
    <Item variant="outline">
      <ItemContent className="gap-8">
        <h3 className="text-2xl">
          Total Items: <span className="font-bold text-3xl">{cartItems.length}</span>
        </h3>
        <p className="text-2xl">
          Total price: <br />
          <span className="font-bold text-4xl">{getPrice({ price: totalPrice })}</span>
        </p>
      </ItemContent>
    </Item>
  );
}
