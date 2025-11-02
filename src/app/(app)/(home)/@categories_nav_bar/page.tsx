import { getProductCategories } from '@/entities/product-categories/services';
import { ProductCategoryNavBar } from '@/entities/product-categories/ui';

async function Page() {
  const { type, result: categories } = await getProductCategories();
  if (type === 'error') return <p>Error</p>;

  return <ProductCategoryNavBar categories={categories} />;
}

export default Page;
