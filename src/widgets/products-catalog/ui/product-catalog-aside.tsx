import { Suspense } from 'react';
import type { ReactNode } from 'react';

export function ProductCatalogAside({ children}: { children: ReactNode }) {
  return (
    <div className="flex flex-col gap-8">
      <Suspense>
        {children}
      </Suspense>
    </div>
  );
}
