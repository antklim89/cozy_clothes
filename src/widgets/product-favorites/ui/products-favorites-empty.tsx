import { ShirtIcon } from 'lucide-react';
import Link from 'next/link';

import { Button } from '@/shared/ui/button';
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from '@/shared/ui/empty';

export function ProductsFavoritesEmpty() {
  return (
    <Empty className="border border-dashed">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <ShirtIcon />
        </EmptyMedia>
        <EmptyTitle>No Favorite Products</EmptyTitle>
        <EmptyDescription>You don&apos;t have any favorite products yet. Start adding some.</EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button size="sm" asChild>
          <Link href="/products">Catalog</Link>
        </Button>
      </EmptyContent>
    </Empty>
  );
}
