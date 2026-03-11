import type { ProductFilterType } from '@/entities/products/model';
import { getManyProducts } from '@/entities/products/services';
import type { PayloadOptions } from '@/shared/model/types/types';
import { ErrorComponent } from '@/shared/ui/error-component';
import { ProductCatalogList } from '@/widgets/products-catalog/ui';

export async function ProductCatalogListSection({
  filter,
  options,
}: {
  filter: ProductFilterType;
  options: Pick<PayloadOptions, 'page' | 'sort'>;
}) {
  const { result: products, error } = await getManyProducts({ filter, options });
  if (error) return <ErrorComponent error={error} />;

  return <ProductCatalogList products={products} />;
}
