'use client';
import { Trash } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import { getPrice } from '@/shared/lib/utils';
import { Button } from '@/shared/ui/button';
import { Card } from '@/shared/ui/card';
import { CartQtyInput } from './cart-qty-input';
import { useRemoveCartMutation } from '../hooks/use-remove-cart-mutation';
import type { CartItemType } from '../model';

export function CartListItem({ cartItem }: { cartItem: CartItemType }) {
  const { mutateAsync: removeFromCart } = useRemoveCartMutation();

  const { qty, title, image, price, discount, productId, colorName, size } = cartItem;

  async function handleRemoveFromCart() {
    await removeFromCart({ productId });
  }

  return (
    <Card className="grid grid-cols-[1fr_1fr] justify-between gap-4 p-4 sm:grid-cols-[auto_1fr_auto]">
      <div className="row-span-2 hidden sm:block">
        <Image alt={title} className="h-[200] w-[100] object-cover" height={200} src={image} width={100} />
      </div>

      <div className="col-span-2">
        <h3 className="text-xl">
          <Link href={`/products/${productId}?v=${productId}`}>{title}</Link>
        </h3>
        <div className="flex gap-4">
          <span className="text-gray-600 uppercase">{colorName}</span>
          <span className="text-gray-600 uppercase">{size}</span>
        </div>
      </div>

      <div className="flex max-h-52 justify-between">
        <div>
          <CartQtyInput className="my-8" productId={productId} />

          {qty > 1 && (
            <div className="flex items-center text-gray-600">
              <span className="text-sm">x</span>
              <span className="w-20 border-none px-4 text-md">1</span>
              <span className="text-xl">{getPrice({ price, discount })}</span>
            </div>
          )}

          <div className="flex items-center">
            <span className="text-sm">x</span>
            <span className="w-20 border-none px-4 text-lg">{qty}</span>
            <span className="text-2xl">{getPrice({ qty, price, discount })}</span>
          </div>
        </div>
      </div>

      <div className="row-span-2 flex justify-end">
        <Button
          aria-label={`delete ${title} from cart`}
          className="self-end border border-red-600 bg-transparent p-2 hover:bg-slate-100"
          onClick={handleRemoveFromCart}
        >
          <Trash className="size-4 text-red-600" />
        </Button>
      </div>
    </Card>
  );
}
