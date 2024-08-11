import { CategoriesNavBar } from '@/components/feature/categories-nav-bar';
import { ProductsList } from '@/components/feature/products-list';
import { ProductsPagination } from '@/components/feature/products-pagination';
import { ALL_CATEGORIES, PRODUCTS_PER_PAGE } from '@/constants';
import { productsLoader } from '@/lib/contentLoaders';
import { z } from 'zod';

export const dynamicParams = false;
export const generateStaticParams = async () => {
  const products = await productsLoader();

  const categoryCountMap: Record<string, number | undefined> = {};

  for (const product of products) {
    const categoryCount = categoryCountMap[product.category];
    if (categoryCount) {
      categoryCountMap[product.category] = categoryCount + 1;
    } else {
      categoryCountMap[product.category] = 1;
    }
  }

  const result: { categoryAndPage: [category: string, page: string] }[] = [];

  for (const [category, categoryCount = 0] of Object.entries(categoryCountMap)) {
    for (let page = 0; page < categoryCount / PRODUCTS_PER_PAGE; page++) {
      result.push({ categoryAndPage: [category, `${page + 1}`] });
    }
  }

  for (let page = 0; page < products.length / PRODUCTS_PER_PAGE; page++) {
    result.push({ categoryAndPage: [ALL_CATEGORIES, `${page + 1}`] });
  }

  return result;
};

const paramsSchema = z.object({
  categoryAndPage: z.tuple([z.string(), z.coerce.number().positive()]),
});

const ProductPage = async ({ params }: { params: z.infer<typeof paramsSchema> }) => {
  const {
    categoryAndPage: [category, page],
  } = await paramsSchema.parseAsync(params);

  let products = await productsLoader();

  if (category !== ALL_CATEGORIES) {
    products = products.filter((i) => i.category === category);
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
      <ProductsPagination category={category} page={page} totalPages={totalPages} />
      <ProductsList products={products} />
      <ProductsPagination category={category} page={page} totalPages={totalPages} />
    </div>
  );
};

export default ProductPage;
