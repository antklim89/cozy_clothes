import { ProductsList, ProductsListCard } from '@/entities/products/ui';
import { ErrorComponent } from '@/shared/ui/error-component';
import { getNewProducts } from '@/widgets/products-promo/services';

export async function NewProductsListSection() {
  const { result: products, error } = await getNewProducts();
  if (error) return <ErrorComponent error={error} />;

  return (
    <ProductsList>
      {products.map(product => (
        <ProductsListCard key={product.id} product={product} />
      ))}
    </ProductsList>
  );
}
