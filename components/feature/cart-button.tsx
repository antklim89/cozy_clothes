'use client';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import { useCartStore } from '@/lib/store';
import { cn } from '@/lib/utils';
import { ShoppingCart } from 'lucide-react';
import Link from 'next/link';
import type { ComponentProps } from 'react';
import { Card, CardContent } from '../ui/card';

export const CartButton = ({ className, ...props }: ComponentProps<'a'>) => {
  const cartItems = useCartStore((state) => state.cartItems);

  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Link href="/checkout" {...props} className={cn('flex flex-nowrap', className)}>
          <ShoppingCart />
          <p className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">{cartItems.length}</p>
        </Link>
      </HoverCardTrigger>
      {cartItems.length > 0 ? (
        <HoverCardContent className="min-w-80 p-1 flex flex-col gap-1">
          {cartItems.map(({ id, product, color, size }) => {
            const searchParams = new URLSearchParams();
            if (size) searchParams.set('size', size.toString());
            if (color) searchParams.set('color', color.toString());

            return (
              <Card key={id}>
                <CardContent className="relative">
                  <p className="text-md mb-2">{product.title}</p>
                  <div className="flex gap-2">
                    {size && <span className="text-sm text-gray-500 border p-1 uppercase">{size}</span>}
                    {color && <span className="text-sm text-gray-500 border p-1 uppercase">{color}</span>}
                  </div>
                  <Link href={`/product/${product.id}?${searchParams.toString()}`}>
                    <span aria-hidden="true" className="absolute inset-0" />
                  </Link>
                </CardContent>
              </Card>
            );
          })}
        </HoverCardContent>
      ) : null}
    </HoverCard>
  );
};
