import type { ReactNode } from 'react';
import { ProductFilter } from '@/features/product';


async function Layout({ countries: countriesFilter }: { countries: ReactNode }) {
  return (
    <ProductFilter filters={countriesFilter} />
  );
}

export default Layout;
