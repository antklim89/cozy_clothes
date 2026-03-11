import { ProductsList, ProductsListCard } from '@/entities/products/ui';
import { ErrorComponent } from '@/shared/ui/error-component';
import { getDiscountProducts } from '@/widgets/products-promo/services';

export async function DiscountProductsListSection() {
  const { result: products, error } = await getDiscountProducts();
  if (error) return <ErrorComponent error={error} />;

  return (
    <ProductsList>
      {products.map(product => (
        <ProductsListCard key={product.id} product={product} />
      ))}
    </ProductsList>
  );
}
