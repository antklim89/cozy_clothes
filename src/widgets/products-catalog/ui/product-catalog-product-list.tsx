import type { ProductPreviewType } from '@/entities/products/model';
import { ProductPagination, ProductsList, ProductsListCard, ProductsListSort } from '@/entities/products/ui';
import type { PaginatedData } from '@/shared/model/types/types';

export function ProductCatalogProductList({ products }: { products: PaginatedData<ProductPreviewType> }) {
  return (
    <>
      <div className="flex flex-col gap-8 sm:flex-row">
        <ProductPagination page={products.page} totalPages={products.totalPages} />
        <ProductsListSort className="self-end" />
      </div>
      <ProductsList>
        {products.docs.map(product => (
          <ProductsListCard key={product.id} product={product} />
        ))}
      </ProductsList>
      <ProductPagination page={products.page} totalPages={products.totalPages} />
    </>
  );
}
