'use client';
import type { ComponentProps } from 'react';
import { ShoppingCart } from 'lucide-react';
import Link from 'next/link';

import { cn } from '@/shared/lib/utils';
import { Button } from '@/shared/ui/button';
import { useCartQuery } from '../hooks/use-cart-query';

export function CartButton({ className, ...props }: ComponentProps<'a'>) {
  const { data: cartItems } = useCartQuery();

  return (
    <Button asChild variant="ghost">
      <Link href="/cart" {...props} className={cn('flex flex-nowrap', className)}>
        <ShoppingCart />
        {cartItems.length != null && cartItems.length > 0 && (
          <span className="-ml-2 -mt-4 flex h-6 w-6 items-center justify-center rounded-full bg-red-600 p-1 text-xs">
            {cartItems.length}
          </span>
        )}
      </Link>
    </Button>
  );
}
