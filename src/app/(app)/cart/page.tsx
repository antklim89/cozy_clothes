'use client';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';

import { cartQueryOptions } from '@/entities/cart/api';
import { CartList, CartListEmpty, CartListFallback, CartListItem, CartTotal } from '@/entities/cart/ui';
import { Button } from '@/shared/ui/button';
import { Card } from '@/shared/ui/card';

function Page() {
  const { data: cartItems, isFetched } = useQuery(cartQueryOptions());

  if (!isFetched) return <CartListFallback />;
  if (!cartItems) return <CartListEmpty />;

  return (
    <CartList
      checkoutSlot={
        <Card className="flex w-full justify-center p-8">
          <Button asChild>
            <Link href="/checkout">Checkout</Link>
          </Button>
        </Card>
      }
      totalSlot={<CartTotal cartItems={cartItems} />}
    >
      {cartItems.map(cartItem => (
        <CartListItem cartItem={cartItem} key={cartItem.productId} />
      ))}
    </CartList>
  );
}

export default Page;
