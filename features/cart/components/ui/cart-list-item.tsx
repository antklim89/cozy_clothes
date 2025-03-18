'use client';
import { Trash } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { CartQtyInput } from '@/features/cart/components/cart-qty-input';
import { useCartStore } from '@/features/cart/store';
import type { CartItem } from '@/features/cart/types';
import { getPrice } from '@/lib/utils';


export function CartListItem({ cartItem }: { cartItem: CartItem }) {
  const removeFromCart = useCartStore(store => store.removeFromCart);
  const {
    qty,
    product,
    variant,
  } = cartItem;

  return (
    <Card className="grid gap-4 grid-cols-[1fr_1fr] sm:grid-cols-[auto_1fr_auto] justify-between p-4">
      <div className="row-span-2 hidden sm:block">
        <Image
          alt={product.title}
          className="w-[100] h-[200] object-cover"
          height={200}
          src={product.images[0]?.url ?? '/placeholder.jpg'}
          width={100}
        />
      </div>

      <div className="col-span-2">
        <h3 className="text-xl">
          <Link href={`/products/${product.id}?v=${variant.id}`}>{product.title}</Link>
        </h3>
        <div className="flex">
          <span className="text-gray-600 uppercase">{variant.colorName}</span>
          <span className="text-gray-600 uppercase">{variant.size}</span>
        </div>
      </div>

      <div className="flex justify-between max-h-52">
        <div>
          <CartQtyInput
            className="my-8"
            product={product}
            variant={variant}
          />

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
      </div>

      <div className="flex justify-end row-span-2">
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
      </div>
    </Card>
  );
}
