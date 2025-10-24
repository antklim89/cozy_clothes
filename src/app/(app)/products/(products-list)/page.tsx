import { createLoader, parseAsInteger } from 'nuqs/server';
import { fetchProductList } from '@/entities/products/services';
import { ProductCatalog } from '@/widgets/products-catalog/ui/product-catalog';


const loadSearchParams = createLoader({
  page: parseAsInteger.withDefault(1),
});


async function Page({ searchParams }: { searchParams: Promise<{ page: string }> }) {
  const { page } = loadSearchParams(await searchParams);

  const { type, result: products } = await fetchProductList({ filter: {}, options: { page } });
  if (type === 'error') return <p>Error</p>;

  return (
    <ProductCatalog filter={<div>HELLO</div>} products={products} />
  );
}

export default Page;
