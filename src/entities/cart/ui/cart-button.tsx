'use client';

import type { ComponentProps } from 'react';
import { useQuery } from '@tanstack/react-query';
import { ShoppingCartIcon } from 'lucide-react';
import Link from 'next/link';

import { cn } from '@/shared/lib/utils';
import { Button } from '@/shared/ui/button';
import { Skeleton } from '@/shared/ui/skeleton';
import { cartQueryOptions } from '../api';

export function CartButton({ className, ...props }: ComponentProps<'a'>) {
  const cartQuery = useQuery(cartQueryOptions());

  if (!cartQuery.isFetchedAfterMount || cartQuery.isPending) {
    return (
      <Skeleton>
        <Button variant="ghost">
          <ShoppingCartIcon />
        </Button>
      </Skeleton>
    );
  }

  return (
    <Button asChild variant="ghost" className="relative">
      <Link href="/cart" {...props} className={cn('flex flex-nowrap', className)}>
        <ShoppingCartIcon />
        {cartQuery.data?.length != null && cartQuery.data.length > 0 && (
          <span className="absolute top-0 right-1 flex h-6 w-6 items-center justify-center rounded-full bg-red-600 p-1 text-xs">
            {cartQuery.data.length}
          </span>
        )}
      </Link>
    </Button>
  );
}
