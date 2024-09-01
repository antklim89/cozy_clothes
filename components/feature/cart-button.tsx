'use client';
import { ShoppingCart } from 'lucide-react';
import Link from 'next/link';
import type { ComponentProps } from 'react';
import { cn } from '@/lib/utils';
import { useCartStore } from '@/lib/store';


export function CartButton({ className, ...props }: ComponentProps<'a'>) {
  const cartItems = useCartStore(state => state.cartItems);

  return (
    <Link href="/checkout" {...props} className={cn('flex flex-nowrap', className)}>
      <ShoppingCart />
      <p className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
        <span className="bg-red-600 rounded-full min-w-4 p-[2px] text-xs flex justify-center items-center -ml-4 -mt-4">
          {cartItems.length}
        </span>
      </p>
    </Link>
  );
}
