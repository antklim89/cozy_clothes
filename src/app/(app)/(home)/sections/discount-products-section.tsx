import { ErrorComponent } from '@/shared/ui/error-component';
import { getDiscountProducts } from '@/widgets/products-promo/services';
import { ProductsPromo } from '@/widgets/products-promo/ui';

export async function DiscountProductSection() {
  const { result: products, error } = await getDiscountProducts();
  if (error) return <ErrorComponent error={error} />;

  return <ProductsPromo products={products} title="Big Discounts" />;
}
