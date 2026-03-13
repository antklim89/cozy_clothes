import type { ReactNode } from 'react';
import { Suspense } from 'react';

import { FeedbackFilter, PriceFilter, ProductSearch } from '@/entities/products/ui';

export function ProductCatalogAside({ children }: { children: ReactNode }) {
  return (
    <div className="fixed flex w-100 flex-col gap-8">
      <Suspense>
        <ProductSearch />
        <PriceFilter />
        <FeedbackFilter />
        {children}
      </Suspense>
    </div>
  );
}
