'use client';
import { ShoppingCart } from 'lucide-react';
import Link from 'next/link';
import type { ComponentProps } from 'react';
import { cn } from '@/src/shared/lib/utils';
import { useCartQuery } from '../hooks/use-cart-query';


export function CartButton({ className, ...props }: ComponentProps<'a'>) {
  const { data: cartItems } = useCartQuery();

  return (
    <Link href="/cart" {...props} className={cn('flex flex-nowrap mx-4', className)}>
      <ShoppingCart />
      {(cartItems.length != null && cartItems.length > 0) && (
        <span className="flex h-6 w-6 bg-red-600 p-1 text-xs rounded-full justify-center items-center -ml-4 -mt-2">
          {cartItems.length}
        </span>
      )}
    </Link>
  );
}
