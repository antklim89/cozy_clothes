'use client';
import type { ProductType } from '@/lib/schemas';
import { Input } from '@/components/ui/input';
import { PRODUCTS_PER_PAGE } from '@/constants';
import { useSearchParamsState } from '@/lib/hooks';
import Fuse from 'fuse.js';
import { SearchIcon } from 'lucide-react';
import { useMemo } from 'react';
import { ProductsList } from './products-list';


export function Search({ products }: { products: ProductType[] }) {
  const [searchQuery, setSearchQuery] = useSearchParamsState('s', '');

  const fuse = useMemo(
    () =>
      new Fuse(products, {
        includeScore: true,
        keys: ['title', 'description'] satisfies (keyof ProductType)[],
      }),
    [products],
  );

  const foundProducts = useMemo(
    () => fuse.search(searchQuery, { limit: PRODUCTS_PER_PAGE }).map(i => i.item),
    [fuse, searchQuery],
  );

  return (
    <section className="container my-8">
      <div className="relative">
        <Input placeholder="Search..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} />
        <SearchIcon className="absolute top-1/2 -translate-y-1/2 right-4" />
      </div>
      {foundProducts.length === 0
        ? (
            <p className="text-center text-xl text-gray-500 mt-20">No products found.</p>
          )
        : null}
      <ProductsList className="my-8" products={foundProducts} />
    </section>
  );
}
