'use client';
import { PRODUCTS_PER_PAGE } from '@/constants';
import type { ProductType } from '@/lib/schemas';
import flexsearch from 'flexsearch';
import { SearchIcon } from 'lucide-react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import { Input } from '../ui/input';
import { Skeleton } from '../ui/skeleton';
import { ProductsList } from './products-list';

export const Search = ({ products }: { products: ProductType[] }) => {
  const [index, setIndex] = useState<flexsearch.Document<unknown, false> | null>(null);
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();

  const searchQuery = searchParams.get('s') ?? '';

  const handleValueChange = (field: string, value: string | number) => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set(field, value.toString());
    replace(`${pathname}?${newSearchParams}`, { scroll: false });
  };

  useEffect(() => {
    const index = new flexsearch.Document<ProductType>({
      document: {
        id: 'id',
        index: ['description', 'title'] satisfies (keyof ProductType)[],
      },
    });

    for (const product of products) index.add(product);

    setIndex(index);
  }, [products]);

  const foundProducts = useMemo(() => {
    if (!index) return null;

    const searchResult = index.search(searchQuery, PRODUCTS_PER_PAGE).reduce((acc, i) => {
      acc.push(...i.result);
      return acc;
    }, [] as flexsearch.Id[]);

    const result = products.filter((i) => searchResult.includes(i.id));
    return result;
  }, [searchQuery, products, index]);

  if (!foundProducts) {
    return (
      <div className="container my-8">
        <Skeleton className="w-full h-[40px]" />
      </div>
    );
  }

  return (
    <section className="container my-8">
      <div className="relative">
        <Input onChange={(e) => handleValueChange('s', e.target.value)} value={searchQuery} placeholder="Search..." />
        <SearchIcon className="absolute top-1/2 -translate-y-1/2 right-4" />
      </div>
      <ProductsList products={foundProducts} className="my-8" />
    </section>
  );
};
