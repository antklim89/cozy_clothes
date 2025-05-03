'use client';
import { ShoppingCart } from 'lucide-react';
import Link from 'next/link';
import type { ComponentProps } from 'react';
import { cn } from '@/lib/utils';
import { useCartStoreIsHydrated } from '../hooks/useCartStoreHydrated';
import { useCartStore } from '../store';


export function CartButton({ className, ...props }: ComponentProps<'a'>) {
  const cartItemsLength = useCartStore(state => state.cartItems.length);
  const isHydrated = useCartStoreIsHydrated();

  return (
    <Link href="/cart" {...props} className={cn('flex flex-nowrap mx-4', className)}>
      <ShoppingCart />
      {(cartItemsLength > 0 && isHydrated) && (
        <span className="flex h-6 w-6 bg-red-600 p-1 text-xs rounded-full justify-center items-center -ml-4 -mt-2">
          {cartItemsLength}
        </span>
      )}
    </Link>
  );
}
