import { fetchNewProducts } from '@/src/widgets/products-promo/services';
import { ProductsPromo } from '@/src/widgets/products-promo/ui';

async function Page() {
  const { type, result: products } = await fetchNewProducts();
  if (type === 'error') return <p>Error</p>;

  return (
    <ProductsPromo products={products} title="New Products" />
  );
}

export default Page;
