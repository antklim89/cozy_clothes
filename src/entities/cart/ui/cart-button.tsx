'use client';

import type { ComponentProps } from 'react';
import { useQuery } from '@tanstack/react-query';
import { ShoppingCart } from 'lucide-react';
import Link from 'next/link';

import { cn } from '@/shared/lib/utils';
import { Button } from '@/shared/ui/button';
import { cartQueryOptions } from '../api';

export function CartButton({ className, ...props }: ComponentProps<'a'>) {
  const cartQuery = useQuery(cartQueryOptions());

  return (
    <Button asChild variant="ghost">
      <Link href="/cart" {...props} className={cn('flex flex-nowrap', className)}>
        <ShoppingCart />
        {cartQuery.data?.length != null && cartQuery.data.length > 0 && (
          <span className="-ml-2 -mt-4 flex h-6 w-6 items-center justify-center rounded-full bg-red-600 p-1 text-xs">
            {cartQuery.data.length}
          </span>
        )}
      </Link>
    </Button>
  );
}
