import { ErrorComponent } from '@/shared/ui/error-component';
import { fetchNewProducts } from '@/widgets/products-promo/services';
import { ProductsPromo } from '@/widgets/products-promo/ui';

async function Page() {
  const { type, result: products, error } = await fetchNewProducts();
  if (type === 'error') return <ErrorComponent error={error} />;

  return <ProductsPromo products={products} title="New Products" />;
}

export default Page;
