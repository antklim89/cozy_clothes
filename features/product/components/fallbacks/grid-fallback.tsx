import { CardFallback } from './card-fallback';
import { PRODUCTS_PER_PAGE } from '../../constants';
import { ProductGrid } from '../ui/product-grid';


export function ProductGridFallback() {
  return (
    <ProductGrid>
      {Array.from({ length: PRODUCTS_PER_PAGE }, (_, i) => (
        <CardFallback key={i} />
      ))}
    </ProductGrid>
  );
}
