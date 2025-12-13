import type { ReactNode } from 'react';
import { Suspense } from 'react';

import { PriceFilter, ProductSearch } from '@/entities/products/ui';

export function ProductCatalogAside({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col gap-8">
      <Suspense>
        <ProductSearch />
        <PriceFilter />
        {children}
      </Suspense>
    </div>
  );
}
