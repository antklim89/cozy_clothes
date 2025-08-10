import { getProductCategories } from '@/src/entities/product-categories/services/dal';
import { ProductCategoryNavBar } from '@/src/entities/product-categories/ui';

async function Page() {
  const { type, result: categories } = await getProductCategories();
  if (type === 'error') return <p>Error</p>;

  return (
    <ProductCategoryNavBar categories={categories} />
  );
}

export default Page;
