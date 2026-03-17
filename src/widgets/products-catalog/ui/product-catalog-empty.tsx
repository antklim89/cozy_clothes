import { ShirtIcon } from 'lucide-react';
import Link from 'next/link';

import { buttonVariants } from '@/shared/ui/button';
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from '@/shared/ui/empty';

export function ProductCatalogEmpty() {
  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <ShirtIcon />
        </EmptyMedia>
        <EmptyTitle>Catalog is empty.</EmptyTitle>
        <EmptyDescription>No products were found. Try changing the filters.</EmptyDescription>
      </EmptyHeader>
      <EmptyContent className="flex-row justify-center gap-2">
        <Link className={buttonVariants({ size: 'lg' })} href="/products">
          Reset Filters
        </Link>
        <Link className={buttonVariants({ size: 'lg', variant: 'outline' })} href="/">
          Home
        </Link>
      </EmptyContent>
    </Empty>
  );
}
