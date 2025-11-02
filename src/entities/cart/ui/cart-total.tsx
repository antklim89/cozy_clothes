'use client';

import { calculatePrice, getPrice } from '@/shared/lib/utils';
import { Card, CardContent, CardHeader } from '@/shared/ui/card';
import type { CartItemType } from '../model';

export function CartTotal({ cartItems }: { cartItems: CartItemType[] }) {
  const totalPrice = cartItems.reduce((total, { qty, price, discount }) => {
    return total + calculatePrice({ qty, price, discount });
  }, 0);

  return (
    <Card>
      <CardHeader>
        <h2>Total Items: ( {cartItems.length} )</h2>
      </CardHeader>
      <CardContent>
        <p>
          Total price: <br /> <span className="text-3xl">{getPrice({ price: totalPrice })}</span>
        </p>
      </CardContent>
    </Card>
  );
}
