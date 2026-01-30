import { ShoppingBasketIcon } from 'lucide-react';
import Link from 'next/link';

import { buttonVariants } from '@/shared/ui/button';
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from '@/shared/ui/empty';

export function CartListEmpty() {
  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <ShoppingBasketIcon />
        </EmptyMedia>
        <EmptyTitle>Cart is empty.</EmptyTitle>
        <EmptyDescription>
          You haven&apos;t added any product yet. Get started by browsing our catalog.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent className="flex-row justify-center gap-2">
        <Link className={buttonVariants({ size: 'lg' })} href="/products">
          Catalog
        </Link>
        <Link className={buttonVariants({ size: 'lg', variant: 'outline' })} href="/">
          Home
        </Link>
      </EmptyContent>
    </Empty>
  );
}
