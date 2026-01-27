import { getManyProducts } from '@/entities/products/services';
import { ErrorComponent } from '@/shared/ui/error-component';
import { ProductCatalogList } from '@/widgets/products-catalog/ui';
import { searchParamsSchema } from './params';

async function Page({ searchParams }: PageProps<'/products'>) {
  const { categories, colors, countries, maxPrice, minPrice, page, search, sizes, sort } =
    await searchParamsSchema.parseAsync(await searchParams);

  const getProductListResult = await getManyProducts({
    filter: { search, minPrice, maxPrice, categories, countries, colors, sizes },
    options: { page, sort },
  });
  if (getProductListResult.error) return <ErrorComponent error={getProductListResult.error} />;

  return <ProductCatalogList products={getProductListResult.result} />;
}

export default Page;

export { generateMetadata } from './seo';
