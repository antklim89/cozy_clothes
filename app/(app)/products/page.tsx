import { z } from 'zod';
import { fetchProducts } from '@/actions/products';
import { ProductCard } from '@/components/feature/product-card';
import { ProductsList, ProductsListContent, ProductsListPagination } from '@/components/feature/products-list';


const paramsSchema = z.object({
  category: z.coerce.number().min(1).optional().catch(undefined),
  page: z.coerce.number().min(1).optional().catch(undefined),
});

export interface Props {
  searchParams: Promise<{
    category?: string;
    page?: string;
  }>;
}


async function Page({ searchParams }: Props) {
  const { category, page = 1 } = await paramsSchema.parseAsync(await searchParams);

  const products = await fetchProducts({
    pagination: true,
    page,
    where: {
      category: category != null ? { equals: category } : {},
    },
  });

  return (
    <div className="flex flex-col gap-4 my-8">
      <ProductsList>
        <ProductsListPagination page={page} searchParams={await searchParams} totalPages={products.totalPages} />
        <ProductsListContent>
          {products.docs.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </ProductsListContent>
        <ProductsListPagination page={page} totalPages={products.totalPages} />
      </ProductsList>
    </div>
  );
}

export default Page;
