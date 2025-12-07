import { getProductCategories } from '@/entities/product-categories/services';
import { CategoryFilter } from '@/entities/product-categories/ui';
import { ErrorComponent } from '@/shared/ui/error-component';

async function Page() {
  const { result: categories, type, error } = await getProductCategories();
  if (type === 'error') return <ErrorComponent error={error} />;

  return <CategoryFilter categories={categories} />;
}

export default Page;
