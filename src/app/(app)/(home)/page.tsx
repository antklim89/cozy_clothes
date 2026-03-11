import { Suspense } from 'react';

import { ProductsListFallback } from '@/entities/products/ui';
import { ContactsSection } from './sections/contacts-section';
import { DiscountProductSection } from './sections/discount-products-section';
import { HeroSection } from './sections/hero-section';
import { NewProductSection } from './sections/new-products-section';
import { ProductCategoriesNavBarSection } from './sections/product-categories-nav-bar-section';
import { TestimonialsSection } from './sections/testimonials-section';

function Page() {
  return (
    <>
      <HeroSection />
      <ProductCategoriesNavBarSection />
      <Suspense
        fallback={
          <div className="container">
            <ProductsListFallback />
          </div>
        }
      >
        <NewProductSection />
      </Suspense>
      <TestimonialsSection />
      <Suspense
        fallback={
          <div className="container">
            <ProductsListFallback />
          </div>
        }
      >
        <DiscountProductSection />
      </Suspense>
      <ContactsSection />
    </>
  );
}

export default Page;
