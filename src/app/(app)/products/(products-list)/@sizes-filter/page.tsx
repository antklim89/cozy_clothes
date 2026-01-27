import { getProductSizes, productSizesCache } from '@/entities/product-sizes/services';
import { ProductSizeSelect } from '@/entities/product-sizes/ui';
import { ErrorComponent } from '@/shared/ui/error-component';

async function Page() {
  'use cache';
  productSizesCache();
  const { result: sizes, error } = await getProductSizes();
  if (error) return <ErrorComponent error={error} />;

  return <ProductSizeSelect sizes={sizes} />;
}

export default Page;
