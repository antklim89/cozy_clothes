import { redirect } from 'next/navigation';
import { z } from 'zod/v4-mini';

import { fetchProduct } from '@/entities/products/services';
import { ErrorComponent } from '@/shared/ui/error-component';
import { Product } from '@/widgets/product/ui';

async function Page({ params }: PageProps<'/products/[productId]'>) {
  const { success, data } = await z.object({ productId: z.coerce.number() }).safeParseAsync(await params);
  if (!success) return redirect('/products');
  const { productId } = data;

  const { type, result: product, error } = await fetchProduct(productId);
  if (type === 'error') return <ErrorComponent error={error} />;

  return <Product product={product} />;
}

export default Page;

export { generateMetadata } from './seo';
