'use client';
import Link from 'next/link';
import { useCartQuery } from '@/entities/cart/hooks/use-cart-query';
import {
  CartList,
  CartListEmpty,
  CartListFallback,
  CartListItem,
  CartTotal,
} from '@/entities/cart/ui';
import { Button } from '@/shared/ui/button';
import { Card } from '@/shared/ui/card';


function Page() {
  const { data: cartItems, isFetched } = useCartQuery();

  if (!isFetched) return <CartListFallback />;
  if (cartItems.length === 0) return <CartListEmpty />;

  return (
    <CartList
      checkoutSlot={(
        <Card className="p-8 flex justify-center w-full">
          <Button asChild>
            <Link href="/checkout">Checkout</Link>
          </Button>
        </Card>
      )}
      totalSlot={<CartTotal cartItems={cartItems} />}
    >
      {cartItems.map(cartItem => (
        <CartListItem
          cartItem={cartItem}
          key={cartItem.productId}
        />
      ))}
    </CartList>
  );
}

export default Page;
