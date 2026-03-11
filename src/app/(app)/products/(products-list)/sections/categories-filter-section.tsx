import { getProductCategories, productCategoriesCache } from '@/entities/product-categories/services';
import { ProductCategoriesSelect } from '@/entities/product-categories/ui';
import { ErrorComponent } from '@/shared/ui/error-component';

export async function CategoriesFilterSection() {
  'use cache';
  productCategoriesCache();
  const { result: categories, error } = await getProductCategories();
  if (error) return <ErrorComponent error={error} />;

  return <ProductCategoriesSelect categories={categories} />;
}
