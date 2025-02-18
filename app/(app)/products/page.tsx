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

// export async function generateMetadata({
//   params,
// }: Props): Promise<Metadata> {
//   const { category } = await params;
//   const { description, keywords } = await fetchSeo();
//   const title = category === ALL_CATEGORIES ? 'All Products' : category;

//   return {
//     title,
//     description: `${description} Browse our ${category === ALL_CATEGORIES ? '' : category} products.`,
//     keywords: [...keywords, title],
//     openGraph: {
//       title,
//     },
//     twitter: {
//       title,
//     },
//   };
// }


async function ProductPage({ searchParams }: Props) {
  const { category, page = 1 } = await paramsSchema.parseAsync(await searchParams);

  const products = await fetchProducts({
    pagination: true,
    page,
    where: {
      category: category != null ? { equals: category } : {},
    },
  });

  // if (category !== ALL_CATEGORIES) {
  //   products = products.filter(i => i.category === category);
  // }

  // const totalPages = Math.ceil(products.length / PRODUCTS_PER_PAGE);

  // if (totalPages > 1) {
  //   const start = PRODUCTS_PER_PAGE * page - PRODUCTS_PER_PAGE;
  //   const end = start + PRODUCTS_PER_PAGE;
  //   products = products.slice(start, end);
  // }

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

export default ProductPage;
