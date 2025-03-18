import { notFound } from 'next/navigation';
import {
  fetchProductList,
  ParamsSchema,
  ProductList,
  ProductPagination,
} from '@/features/product';


export interface Props {
  searchParams: Promise<{
    category?: string;
    page?: string;
  }>;
}

async function Page({ searchParams }: Props) {
  const { success, data } = await ParamsSchema.safeParseAsync(await searchParams);
  if (!success) notFound();
  const { category, page } = data;

  const { type, result: products } = await fetchProductList({ page, category });
  if (type === 'error') return null;

  return (
    <ProductList
      pagination={<ProductPagination page={page} totalPages={products.totalPages} />}
      products={products.docs}
    />
  );
}

export default Page;
