import { cacheLife, cacheTag } from 'next/cache';

import { PRODUCT_CACHE_TAG } from '@/entities/products/config';
import { getOneProduct } from '@/entities/products/services';
import { ErrorComponent } from '@/shared/ui/error-component';
import { ProductPrice } from '@/widgets/product/ui';
import { ParamsSchema } from '../params';

async function Page({ params }: PageProps<'/products/[productId]'>) {
  'use cache';
  const { productId } = await ParamsSchema.parseAsync(await params);

  cacheLife('max');
  cacheTag(`${PRODUCT_CACHE_TAG}:${productId}`);

  const productResult = await getOneProduct(productId);
  if (productResult.error) return <ErrorComponent error={productResult.error} />;

  return <ProductPrice product={productResult.result} />;
}

export default Page;
