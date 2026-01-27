import { getProductColors, productColorsCache } from '@/entities/product-colors/services';
import { ProductColorsSelect } from '@/entities/product-colors/ui';
import { ErrorComponent } from '@/shared/ui/error-component';

async function Page() {
  'use cache';
  productColorsCache();
  const { result: colors, error } = await getProductColors();
  if (error) return <ErrorComponent error={error} />;

  return <ProductColorsSelect colors={colors} />;
}

export default Page;
