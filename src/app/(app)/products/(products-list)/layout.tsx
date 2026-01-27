import { ProductCatalog, ProductCatalogAside } from '@/widgets/products-catalog/ui';

function Page({
  children,
  'categories-filter': categoriesFilter,
  'colors-filter': colorsFilter,
  'countries-filter': countriesFilter,
  'sizes-filter': sizesFilter,
}: LayoutProps<'/products'>) {
  return (
    <ProductCatalog
      filter={
        <ProductCatalogAside>
          {categoriesFilter}
          {countriesFilter}
          {colorsFilter}
          {sizesFilter}
        </ProductCatalogAside>
      }
      products={children}
    />
  );
}

export default Page;
