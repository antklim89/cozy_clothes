import type { Metadata } from 'next';
import { z } from 'zod';
import { CategoriesNavBar } from '@/components/feature/categories-nav-bar';
import { ProductCard } from '@/components/feature/product-card';
import { ProductsList, ProductsListContent, ProductsListPagination } from '@/components/feature/products-list';
import { ALL_CATEGORIES, PRODUCTS_PER_PAGE } from '@/lib/constants';
import { infoLoader, productsLoader } from '@/lib/content-loaders';


const paramsSchema = z.object({ category: z.string(), page: z.coerce.number().positive() });

export interface Props {
  params: Promise<{ category: string; page: string }>;
}

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const { category } = await params;
  const { description, keywords } = await infoLoader();
  const title = category === ALL_CATEGORIES ? 'All Products' : category;

  return {
    title,
    description: `${description} Browse our ${category === ALL_CATEGORIES ? '' : category} products.`,
    keywords: [...keywords, title],
    openGraph: {
      title,
    },
    twitter: {
      title,
    },
  };
}

export const dynamicParams = false;

export async function generateStaticParams() {
  const products = await productsLoader();

  const categoryCountMap: Record<string, number | undefined> = {};

  for (const product of products) {
    const categoryCount = categoryCountMap[product.category];
    if (categoryCount != null) {
      categoryCountMap[product.category] = categoryCount + 1;
    } else {
      categoryCountMap[product.category] = 1;
    }
  }

  const result: Awaited<Props['params']>[] = [];

  for (const [category, categoryCount = 0] of Object.entries(categoryCountMap)) {
    for (let page = 0; page < categoryCount / PRODUCTS_PER_PAGE; page++) {
      result.push({ category, page: `${page + 1}` });
    }
  }

  for (let page = 0; page < products.length / PRODUCTS_PER_PAGE; page++) {
    result.push({ category: ALL_CATEGORIES, page: `${page + 1}` });
  }

  return result;
}


async function ProductPage({ params }: Props) {
  const { category, page } = await paramsSchema.parseAsync(await params);

  let products = await productsLoader();

  if (category !== ALL_CATEGORIES) {
    products = products.filter(i => i.category === category);
  }

  const totalPages = Math.ceil(products.length / PRODUCTS_PER_PAGE);

  if (totalPages > 1) {
    const start = PRODUCTS_PER_PAGE * page - PRODUCTS_PER_PAGE;
    const end = start + PRODUCTS_PER_PAGE;
    products = products.slice(start, end);
  }

  return (
    <div className="flex flex-col gap-4 my-8">
      <CategoriesNavBar selectedCategory={category} />
      <ProductsList>
        <ProductsListPagination category={category} page={page} totalPages={totalPages} />
        <ProductsListContent>
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </ProductsListContent>
        <ProductsListPagination category={category} page={page} totalPages={totalPages} />
      </ProductsList>
    </div>
  );
}

export default ProductPage;
