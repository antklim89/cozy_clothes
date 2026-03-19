import type { ReactNode } from 'react';
import { Suspense } from 'react';

import { FeedbackFilter, PriceFilter, ProductSearch } from '@/entities/products/ui';

// TODO: fix scroll
export function ProductCatalogAside({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col gap-8">
      <Suspense>
        <ProductSearch />
        <PriceFilter />
        <FeedbackFilter />
        {children}
      </Suspense>
    </div>
  );
}
