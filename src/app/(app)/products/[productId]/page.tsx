import { z } from 'zod/v4-mini';
import { fetchProduct } from '@/src/entities/products/services';
import { ProductWidget } from '@/src/widgets/product-widget/ui';

async function Page({ params }: { params: Promise<{ productId: string }> }) {
  const { success, data } = await z.object({ productId: z.coerce.number() }).safeParseAsync(await params);
  if (!success) return <p>Error</p>;
  const { productId } = data;

  const { type, result: product } = await fetchProduct(productId);
  if (type === 'error') return <p>Error</p>;


  return (
    <>
      <ProductWidget product={product} />
    </>
  );
}

export default Page;
