import { Product, ProductRightSide } from '@/widgets/product/ui';

function Page({
  'add-to-cart-button': addToCartButton,
  'product-carousel': productCarousel,
  'favorite-button': favoriteButton,
  'product-info': productInfo,
  'product-price': productPrice,
  'product-variants-select': productVariantsSelect,
}: LayoutProps<'/products/[productId]'>) {
  return (
    <Product>
      {productCarousel}
      <ProductRightSide>
        {favoriteButton}
        {productInfo}
        {productVariantsSelect}
        {productPrice}
        {addToCartButton}
      </ProductRightSide>
    </Product>
  );
}

export default Page;

export { generateMetadata } from './seo';
