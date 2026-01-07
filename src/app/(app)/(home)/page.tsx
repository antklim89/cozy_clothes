import { Suspense } from 'react';
import { cacheTag } from 'next/cache';

import { CONTACTS_CACHE_TAG } from '@/entities/contacts/config';
import { getContacts } from '@/entities/contacts/services';
import { Contacts } from '@/entities/contacts/ui';
import { HERO_CACHE_TAG } from '@/entities/hero/config';
import { getHero } from '@/entities/hero/services';
import { Hero } from '@/entities/hero/ui';
import { PRODUCT_CATEGORIES_CACHE_TAG } from '@/entities/product-categories/config';
import { getProductCategories } from '@/entities/product-categories/services';
import { ProductCategoriesNavBar } from '@/entities/product-categories/ui';
import { ProductsListFallback } from '@/entities/products/ui';
import { TESTIMONIALS_CACHE_TAG } from '@/entities/testimonials/config';
import { getTestimonials } from '@/entities/testimonials/services';
import { Testimonials } from '@/entities/testimonials/ui';
import { ErrorComponent } from '@/shared/ui/error-component';
import { getDiscountProducts, getNewProducts } from '@/widgets/products-promo/services';
import { ProductsPromo } from '@/widgets/products-promo/ui';

async function ProductCategoryNavBarPageSection() {
  'use cache';
  cacheTag(PRODUCT_CATEGORIES_CACHE_TAG);

  const { type, result: categories, error } = await getProductCategories();
  if (type === 'error') return <ErrorComponent error={error} />;

  return <ProductCategoriesNavBar categories={categories} />;
}
async function ContactsPageSection() {
  'use cache';
  cacheTag(CONTACTS_CACHE_TAG);

  const { type, result: contacts, error } = await getContacts();
  if (type === 'error') return <ErrorComponent error={error} />;

  return <Contacts contacts={contacts} />;
}
async function HeroPageSection() {
  'use cache';
  cacheTag(HERO_CACHE_TAG);

  const { type, result: hero, error } = await getHero();
  if (type === 'error') return <ErrorComponent error={error} />;

  return <Hero hero={hero} />;
}

async function NewProductsPageSection() {
  const { type, result: products, error } = await getNewProducts();
  if (type === 'error') return <ErrorComponent error={error} />;

  return <ProductsPromo products={products} title="New Products" />;
}

async function DiscountProductsPageSection() {
  const { type, result: products, error } = await getDiscountProducts();
  if (type === 'error') return <ErrorComponent error={error} />;

  return <ProductsPromo products={products} title="Big Discounts" />;
}

async function TestimonialsPageSection() {
  'use cache';
  cacheTag(TESTIMONIALS_CACHE_TAG);

  const { type, result: testimonials, error } = await getTestimonials();
  if (type === 'error') return <ErrorComponent error={error} />;

  return <Testimonials testimonials={testimonials} />;
}

function Layout() {
  return (
    <>
      <HeroPageSection />
      <ProductCategoryNavBarPageSection />
      <Suspense
        fallback={
          <div className="container">
            <ProductsListFallback />
          </div>
        }
      >
        <NewProductsPageSection />
      </Suspense>
      <TestimonialsPageSection />
      <Suspense
        fallback={
          <div className="container">
            <ProductsListFallback />
          </div>
        }
      >
        <DiscountProductsPageSection />
      </Suspense>
      <ContactsPageSection />
    </>
  );
}

export default Layout;
