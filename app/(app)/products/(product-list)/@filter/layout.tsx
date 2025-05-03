import { Suspense } from 'react';
import type { ReactNode } from 'react';
import { ProductFilter } from '@/features/product';


async function Layout({ countries: countriesFilter }: { countries: ReactNode }) {
  return (
    <Suspense>
      <ProductFilter filters={countriesFilter} />
    </Suspense>
  );
}

export default Layout;
