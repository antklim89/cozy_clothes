import { createLoader, parseAsArrayOf, parseAsInteger, parseAsString } from 'nuqs/server';

import type { ProductFilterType } from '@/entities/products/model';
import { fetchProductList } from '@/entities/products/services';
import { ProductCatalogProductList } from '@/widgets/products-catalog/ui';

const loadSearchParams = createLoader({
  page: parseAsInteger.withDefault(1),
  search: parseAsString,
  category: parseAsInteger,
  countries: parseAsArrayOf(parseAsInteger),
  minPrice: parseAsInteger,
  maxPrice: parseAsInteger,
  sort: parseAsString,
});

async function Page({ searchParams }: { searchParams: Promise<{ page: string }> }) {
  const params = loadSearchParams(await searchParams);
  const filter: ProductFilterType = {};
  if (params.search != null) filter.search = params.search;
  if (params.minPrice != null) filter.minPrice = params.minPrice;
  if (params.maxPrice != null) filter.maxPrice = params.maxPrice;
  if (params.category != null) filter.category = params.category;
  if (params.countries != null) filter.countries = params.countries;

  const { type, result: products } = await fetchProductList({
    filter,
    options: { page: params.page, sort: params.sort ?? undefined },
  });
  if (type === 'error') return <p>Error</p>;

  return <ProductCatalogProductList products={products} />;
}

export default Page;
