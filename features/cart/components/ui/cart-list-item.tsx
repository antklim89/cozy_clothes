'use client';
import { Trash } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { getPrice } from '@/lib/utils';
import { useCartStore } from '../../store';
import type { CartItem } from '../../types';
import { CartQtyInput } from '../cart-qty-input';


export function CartListItem({ cartItem }: { cartItem: CartItem }) {
  const removeFromCart = useCartStore(store => store.removeFromCart);
  const {
    qty,
    productId,
    variantId,
    title,
    colorName,
    size,
    image,
    price,
    discount,
  } = cartItem;

  return (
    <Card className="grid gap-4 grid-cols-[1fr_1fr] sm:grid-cols-[auto_1fr_auto] justify-between p-4">
      <div className="row-span-2 hidden sm:block">
        <Image
          alt={title}
          className="w-[100] h-[200] object-cover"
          height={200}
          src={image ?? '/placeholder.jpg'}
          width={100}
        />
      </div>

      <div className="col-span-2">
        <h3 className="text-xl">
          <Link href={`/products/${productId}?v=${variantId}`}>{title}</Link>
        </h3>
        <div className="flex">
          <span className="text-gray-600 uppercase">{colorName}</span>
          <span className="text-gray-600 uppercase">{size}</span>
        </div>
      </div>

      <div className="flex justify-between max-h-52">
        <div>
          <CartQtyInput className="my-8" productId={cartItem.productId} variantId={cartItem.variantId} />

          {qty > 1 && (
            <div className="flex items-center text-gray-600">
              <span className="text-sm">x</span>
              <span className="px-4 w-20 border-none text-md">1</span>
              <span className="text-xl">{getPrice({ price, discount })}</span>
            </div>
          )}

          <div className="flex items-center ">
            <span className="text-sm">x</span>
            <span className="px-4 w-20 border-none text-lg">{qty}</span>
            <span className="text-2xl">{getPrice({ qty, price, discount })}</span>
          </div>
        </div>
      </div>

      <div className="flex justify-end row-span-2">
        <Button
          aria-label={`delete ${title} from cart`}
          className="self-end bg-transparent border border-red-600 hover:bg-slate-100 p-2"
          onClick={() => removeFromCart({
            productId,
            variantId,
          })}
        >
          <Trash className="size-4 text-red-600" />
        </Button>
      </div>
    </Card>
  );
}
