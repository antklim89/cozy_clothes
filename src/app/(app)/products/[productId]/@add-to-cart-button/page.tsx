import { AddToCartButton } from '@/features/update-cart/ui';
import { ParamsSchema } from '../params';

async function Page({ params }: PageProps<'/products/[productId]'>) {
  const { productId } = await ParamsSchema.parseAsync(await params);

  return <AddToCartButton productId={productId} />;
}

export default Page;
