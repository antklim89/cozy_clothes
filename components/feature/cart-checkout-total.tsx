'use client';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { useCartStore } from '@/lib/store';
import { calculatePrice, getPrice } from '@/lib/utils';

export const CartCheckoutTotal = () => {
  const cartItems = useCartStore((store) => store.cartItems);
  const totalPrice = cartItems.reduce(
    (total, { qty, product: { price, discount } }) => total + calculatePrice({ qty, price, discount }),
    0,
  );

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
};
