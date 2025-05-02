import { notFound } from 'next/navigation';
import type { z } from 'zod';
import {
  fetchProductList,
  ProductList,
  ProductPagination,
  ProductParamsSchema,
} from '@/features/product';


export interface Props {
  searchParams: Promise<z.infer<typeof ProductParamsSchema>>;
}

async function Page({ searchParams }: Props) {
  const { success, data } = await ProductParamsSchema.safeParseAsync(await searchParams);
  if (!success) notFound();

  const { type, result: products } = await fetchProductList(data);
  if (type === 'error') return null;


  return (
    <div>
      <ProductPagination page={data.page} totalPages={products.totalPages} />
      <ProductList products={products.docs} />
      <ProductPagination page={data.page} totalPages={products.totalPages} />
    </div>
  );
}

export default Page;
