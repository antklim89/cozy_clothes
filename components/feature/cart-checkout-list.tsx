'use client';
import { Trash } from 'lucide-react';
import Link from 'next/link';
import type { ComponentProps } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import type { CartItem } from '@/lib/cart-store';
import { useCartStore } from '@/lib/cart-store';
import { cn, getPrice } from '@/lib/utils';


export function CartCheckoutList({ className, ...props }: ComponentProps<'section'>) {
  const cartItems = useCartStore(store => store.cartItems);

  return (
    <section className={cn('flex flex-col gap-4', className)} {...props}>
      {cartItems.length === 0 && (
        <Card>
          <CardHeader>
            <h3 className="text-xl">Your shopping cart is empty</h3>
          </CardHeader>
        </Card>
      )}
      {cartItems.map(cartItem => (
        <CartCheckoutItem
          cartItem={cartItem}
          key={`${cartItem.product.id} - ${cartItem.variant.id}`}
        />
      )) }
    </section>
  );
}

function CartCheckoutItem({ cartItem }: { cartItem: CartItem }) {
  const removeFromCart = useCartStore(store => store.removeFromCart);
  const {
    qty,
    product,
    variant,
  } = cartItem;

  return (
    <Card>
      <CardHeader>
        <h3 className="text-xl">
          <Link href={`/products/${product.id}?v=${variant.id}`}>{product.title}</Link>
        </h3>
        <div className="flex gap-4">
          <span className="text-gray-600 uppercase">{variant.colorName}</span>
          <span className="text-gray-600 uppercase">{variant.size}</span>
        </div>
      </CardHeader>

      <CardContent className="flex justify-between gap-4">
        <div>
          {qty > 1 && (
            <div className="flex items-center text-gray-600">
              <span className="text-sm">x</span>
              <span className="px-4 w-20 border-none text-md">1</span>
              <span className="text-xl">{getPrice({ price: product.price, discount: product.discount })}</span>
            </div>
          )}

          <div className="flex items-center ">
            <span className="text-sm">x</span>
            <span className="px-4 w-20 border-none text-lg">{qty}</span>
            <span className="text-2xl">{getPrice({ qty, price: product.price, discount: product.discount })}</span>
          </div>
        </div>

      </CardContent>
      <CardFooter className="flex justify-end">
        <Button
          aria-label={`delete ${product.title} from cart`}
          className="self-end bg-transparent border border-red-600 hover:bg-slate-100 p-2"
          onClick={() => removeFromCart({
            productId: product.id,
            variantId: variant.id,
          })}
        >
          <Trash className="size-4 text-red-600" />
        </Button>
      </CardFooter>
    </Card>
  );
}
