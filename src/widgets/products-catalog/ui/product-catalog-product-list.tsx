import type { ProductPreviewType } from '@/entities/products/model';
import { ProductPagination, ProductsList, ProductsListCard } from '@/entities/products/ui';
import type { PaginatedData } from '@/shared/model/types/types';

export function ProductCatalogProductList({ products }: { products: PaginatedData<ProductPreviewType> }) {
  return (
    <>
      <ProductPagination page={products.page} totalPages={products.totalPages} />
      <ProductsList>
        {products.docs.map(product => (
          <ProductsListCard key={product.id} product={product} />
        ))}
      </ProductsList>
      <ProductPagination page={products.page} totalPages={products.totalPages} />
    </>
  );
}
