import { PRODUCTS_PER_PAGE } from '@/entities/products/config/constants';
import { ProductsList } from './products-list';
import { ProductsListCardFallback } from './products-list-card-fallback';


export function ProductsListFallback() {
  return (
    <ProductsList>
      {Array.from({ length: PRODUCTS_PER_PAGE }, (_, i) => (
        <ProductsListCardFallback key={i} />
      ))}
    </ProductsList>
  );
}
