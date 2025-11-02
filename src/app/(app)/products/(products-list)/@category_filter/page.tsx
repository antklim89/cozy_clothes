import { getProductCategories } from '@/entities/product-categories/services';
import { CategoryFilter } from '@/entities/product-categories/ui';

async function Page() {
  const { result: categories, type } = await getProductCategories();
  if (type === 'error') return null;

  return <CategoryFilter categories={categories} />;
}

export default Page;
