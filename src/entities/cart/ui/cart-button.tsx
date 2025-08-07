'use client';
import { ShoppingCart } from 'lucide-react';
import Link from 'next/link';
import type { ComponentProps } from 'react';
import { cn } from '@/src/shared/lib/utils';
import { Button } from '@/src/shared/ui/button';
import { useCartQuery } from '../hooks/use-cart-query';


export function CartButton({ className, ...props }: ComponentProps<'a'>) {
  const { data: cartItems } = useCartQuery();

  return (
    <Button asChild variant="ghost">
      <Link href="/cart" {...props} className={cn('flex flex-nowrap', className)}>
        <ShoppingCart />
        {(cartItems.length != null && cartItems.length > 0) && (
          <span className="flex h-6 w-6 bg-red-600 p-1 text-xs rounded-full justify-center items-center -ml-2 -mt-4">
            {cartItems.length}
          </span>
        )}
      </Link>
    </Button>
  );
}
