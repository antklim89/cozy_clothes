import { getOneProduct } from '@/entities/products/services';
import { ErrorComponent } from '@/shared/ui/error-component';
import { ProductImagesCarousel } from '@/widgets/product/ui';
import { ParamsSchema } from '../params';

async function Page({ params }: PageProps<'/products/[productId]'>) {
  const { productId } = await ParamsSchema.parseAsync(await params);

  const productResult = await getOneProduct(productId);
  if (productResult.error) return <ErrorComponent error={productResult.error} />;

  return <ProductImagesCarousel images={productResult.result.images} alt={productResult.result.title} />;
}

export default Page;
