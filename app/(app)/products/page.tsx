import { notFound } from 'next/navigation';
import type { z } from 'zod';
import {
  fetchProductList,
  ProductFilter,
  ProductList,
  ProductPagination,
  ProductParamsSchema,
} from '@/features/product';
import { CategoryNavBar } from '@/features/product-categories';


export interface Props {
  searchParams: Promise<z.infer<typeof ProductParamsSchema>>;
}

async function Page({ searchParams }: Props) {
  const { success, data } = await ProductParamsSchema.safeParseAsync(await searchParams);
  if (!success) notFound();

  const { type, result: products } = await fetchProductList(data);
  if (type === 'error') return null;

  return (
    <>
      <CategoryNavBar />
      <ProductList
        filter={<ProductFilter />}
        pagination={<ProductPagination page={data.page} totalPages={products.totalPages} />}
        products={products.docs}
      />
    </>
  );
}

export default Page;
