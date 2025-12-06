import { redirect } from 'next/navigation';
import { createLoader, parseAsInteger } from 'nuqs/server';

import { getProductsFavorites } from '@/entities/products/services';
import { ProductsFavorites } from '@/widgets/product-favorites/ui';

const loadSearchParams = createLoader({
  page: parseAsInteger.withDefault(1),
});

async function Page({ searchParams }: PageProps<'/favorites'>) {
  const params = loadSearchParams(await searchParams);
  const { result: products, error } = await getProductsFavorites({ options: { page: params.page } });

  if (error && error.type === 'unauthenticated') return redirect('/');
  if (error) return <div>Error</div>;

  return <ProductsFavorites page={products.page} totalPages={products.totalPages} products={products.docs} />;
}

export default Page;
