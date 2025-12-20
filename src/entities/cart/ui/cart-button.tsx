'use client';

import type { ComponentProps } from 'react';
import { useQuery } from '@tanstack/react-query';
import { ShoppingCartIcon } from 'lucide-react';
import Link from 'next/link';

import { cn } from '@/shared/lib/utils';
import { Badge } from '@/shared/ui/badge';
import { Button, buttonVariants } from '@/shared/ui/button';
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
    <Link {...props} href="/cart" className={cn(buttonVariants({ variant: 'ghost' }), className)}>
      <ShoppingCartIcon />
      {cartQuery.data != null && cartQuery.data.length > 0 && (
        <Badge variant="destructive">{cartQuery.data.length}</Badge>
      )}
    </Link>
  );
}
