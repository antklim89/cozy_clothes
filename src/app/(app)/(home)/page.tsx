import { Suspense } from 'react';

import { ProductsListFallback } from '@/entities/products/ui';
import { ProductsPromo } from '@/widgets/products-promo/ui';
import { ContactsSection } from './sections/contacts-section';
import { DiscountProductsListSection } from './sections/discount-products-list-section';
import { HeroSection } from './sections/hero-section';
import { NewProductsListSection } from './sections/new-products-list-section';
import { ProductCategoriesNavBarSection } from './sections/product-categories-nav-bar-section';
import { TestimonialsSection } from './sections/testimonials-section';

function Page() {
  return (
    <>
      <HeroSection />
      <ProductCategoriesNavBarSection />
      <ProductsPromo title="New Products">
        <Suspense fallback={<ProductsListFallback />}>
          <NewProductsListSection />
        </Suspense>
      </ProductsPromo>
      <TestimonialsSection />
      <ProductsPromo title="Discount Products">
        <Suspense fallback={<ProductsListFallback />}>
          <DiscountProductsListSection />
        </Suspense>
      </ProductsPromo>
      <ContactsSection />
    </>
  );
}

export default Page;
