'use client';
import { PRODUCTS_PER_PAGE } from '@/constants';
import { useSearchParamsState } from '@/lib/hooks';
import type { ProductType } from '@/lib/schemas';
import Fuse from 'fuse.js';
import { SearchIcon } from 'lucide-react';
import { useMemo } from 'react';
import { Input } from '../ui/input';
import { ProductsList } from './products-list';

export const Search = ({ products }: { products: ProductType[] }) => {
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
    () => fuse.search(searchQuery, { limit: PRODUCTS_PER_PAGE }).map((i) => i.item),
    [fuse.search, searchQuery],
  );

  return (
    <section className="container my-8">
      <div className="relative">
        <Input onChange={(e) => setSearchQuery(e.target.value)} value={searchQuery} placeholder="Search..." />
        <SearchIcon className="absolute top-1/2 -translate-y-1/2 right-4" />
      </div>
      <ProductsList products={foundProducts} className="my-8" />
    </section>
  );
};
