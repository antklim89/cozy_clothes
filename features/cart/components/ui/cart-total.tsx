'use client';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { calculatePrice, getPrice } from '@/lib/utils';
import { useCartStore } from '../../store';


export function CartTotal() {
  const cartItems = useCartStore(store => store.cartItems);
  const totalPrice = cartItems.reduce(
    (total, { qty, discount, price }) => total + calculatePrice({ qty, price, discount }),
    0,
  );

  return (
    <Card>
      <CardHeader>
        <h2>
          Total Items: (
          {' '}
          {cartItems.length}
          {' '}
          )
        </h2>
      </CardHeader>
      <CardContent>
        <p>
          Total price:
          {' '}
          <br />
          {' '}
          <span className="text-3xl">{getPrice({ price: totalPrice })}</span>
        </p>
      </CardContent>
    </Card>
  );
}
