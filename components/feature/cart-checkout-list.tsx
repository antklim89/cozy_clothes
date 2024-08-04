'use client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { qtySchema } from '@/lib/schemas';
import { useCartStore } from '@/lib/store';
import { cn, getPrice } from '@/lib/utils';
import { Trash } from 'lucide-react';
import Link from 'next/link';
import type { ComponentProps } from 'react';

export const CartCheckoutList = ({ className, ...props }: ComponentProps<'section'>) => {
  const cartItems = useCartStore((store) => store.cartItems);
  const updateCart = useCartStore((store) => store.updateCart);
  const removeFromCart = useCartStore((store) => store.removeFromCart);

  return (
    <section className={cn('flex flex-col gap-4', className)} {...props}>
      {cartItems.length === 0 && (
        <Card>
          <CardHeader>
            <h3 className="text-xl">Your shopping cart is empty</h3>
          </CardHeader>
        </Card>
      )}
      {cartItems.map(({ id, qty, color, size, product }) => (
        <Card key={id}>
          <CardHeader>
            <h3 className="text-xl">
              <Link href={`/product/${product.id}?qty=${qty}&size=${size}&color=${color}`}>{product.title}</Link>
            </h3>
            <div className="flex gap-4">
              {color && <span className="text-gray-600 uppercase">{color}</span>}
              {size && <span className="text-gray-600 uppercase">{size}</span>}
            </div>
          </CardHeader>

          <CardContent className="flex justify-between gap-4">
            <div>
              <Label className="flex items-center">
                <span className="text-sm">x</span>
                <Input
                  min={1}
                  className="w-20 border-none hover:outline hover:outline-1 text-xl"
                  type="number"
                  value={qty}
                  onChange={(e) => updateCart(id, { qty: e.target.valueAsNumber })}
                  onBlur={(e) => updateCart(id, { qty: qtySchema.parse(e.target.valueAsNumber) })}
                />
                <span className="text-2xl">{getPrice({ qty, price: product.price, discount: product.discount })}</span>
              </Label>

              {qty > 1 && (
                <div className="flex items-center text-gray-600 text-sm">
                  <span className="text-sm">x</span>
                  <span className="px-4 w-20 border-none text-lg">1</span>
                  <span className="text-xl">{getPrice({ price: product.price, discount: product.discount })}</span>
                </div>
              )}
            </div>
            <Button
              aria-label={`delete ${product.title} from cart`}
              className="self-end bg-transparent border border-red-600 hover:bg-slate-100 p-2"
              onClick={() => removeFromCart(id)}
            >
              <Trash className="size-4 text-red-600" />
            </Button>
          </CardContent>
        </Card>
      ))}
    </section>
  );
};

export default CartCheckoutList;