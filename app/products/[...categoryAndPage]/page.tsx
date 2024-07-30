import { ProductsList, ProductsPagination } from '@/components/feature';
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

  const start = PRODUCTS_PER_PAGE * page - PRODUCTS_PER_PAGE;
  const end = start + PRODUCTS_PER_PAGE;

  const productsLoaded = await productsLoader();

  const products = productsLoaded
    .filter((i) => (category === ALL_CATEGORIES ? true : i.category === category))
    .slice(start, end);

  const totalPages = Math.ceil(productsLoaded.length / PRODUCTS_PER_PAGE);

  return (
    <div className="grid grid-rows-[auto_1fr_auto] h-full">
      <ProductsPagination className="mt-8" category={category} page={page} totalPages={totalPages} />
      <ProductsList className="my-4" products={products} />
      <ProductsPagination className="mb-8" category={category} page={page} totalPages={totalPages} />
    </div>
  );
};

export default ProductPage;
