import { CardFallback } from '@/features/product/components/fallbacks/card-fallback';
import { ProductGrid } from '@/features/product/components/ui/product-grid';
import { PRODUCTS_PER_PAGE } from '@/features/product/constants';


export function ProductGridFallback() {
  return (
    <ProductGrid>
      {Array.from({ length: PRODUCTS_PER_PAGE }, (_, i) => (
        <CardFallback key={i} />
      ))}
    </ProductGrid>
  );
}
