'use client';

import type { ComponentProps } from 'react';
import { useQuery } from '@tanstack/react-query';
import { ShoppingCartIcon } from 'lucide-react';
import Link from 'next/link';

import { cn } from '@/shared/lib/utils';
import { Badge } from '@/shared/ui/badge';
import { Button } from '@/shared/ui/button';
import { Skeleton } from '@/shared/ui/skeleton';
import { cartQueryOptions } from '../api';

export function CartButton({ className, ...props }: ComponentProps<'a'>) {
  const cartQuery = useQuery(cartQueryOptions());

  if (!cartQuery.isFetchedAfterMount || cartQuery.isPending) {
    return (
      <Skeleton>
        <Button variant="ghost" size="icon">
          <ShoppingCartIcon />
        </Button>
      </Skeleton>
    );
  }

  return (
    <Link {...props} href="/cart" className={cn('relative flex items-center', className)}>
      <Button variant="ghost" size="icon">
        <ShoppingCartIcon />
      </Button>
      {cartQuery.data != null && cartQuery.data.length > 0 && (
        <Badge variant="default" className="absolute top-0.5 left-4 bg-secondary/90 p-2 text-[0.5rem] shadow">
          {cartQuery.data.length}
        </Badge>
      )}
    </Link>
  );
}
