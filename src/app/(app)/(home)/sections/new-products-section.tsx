import { ErrorComponent } from '@/shared/ui/error-component';
import { getNewProducts } from '@/widgets/products-promo/services';
import { ProductsPromo } from '@/widgets/products-promo/ui';

export async function NewProductSection() {
  const { result: products, error } = await getNewProducts();
  if (error) return <ErrorComponent error={error} />;

  return <ProductsPromo products={products} title="New Products" />;
}
