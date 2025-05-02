import { Contacts, fetchContacts } from '@/features/contacts';
import { fetchHero, Hero } from '@/features/hero';
import { fetchDiscountProducts, fetchNewProducts, ProductList } from '@/features/product';
// import { CategoryNavBar } from '@/features/product-categories';
import { fetchTestimonials, Testimonials } from '@/features/testimonials';


async function Page() {
  const [
    newProducts,
    discountProducts,
    hero,
    testimonials,
    contacts,
  ] = await Promise.all([
    fetchNewProducts(),
    fetchDiscountProducts(),
    fetchHero(),
    fetchTestimonials(),
    fetchContacts(),
  ]);

  return (
    <>
      {hero.type !== 'error'
        ? <Hero hero={hero.result} />
        : null}

      {/* <CategoryNavBar /> */}

      {newProducts.type !== 'error'
        ? <ProductList products={newProducts.result} title="New Products" />
        : null}

      {testimonials.type !== 'error'
        ? <Testimonials testimonials={testimonials.result} />
        : null}

      {discountProducts.type !== 'error'
        ? <ProductList products={discountProducts.result} title="Big Discount" />
        : null}

      {contacts.type !== 'error'
        ? <Contacts contacts={contacts.result} />
        : null}
    </>
  );
}

export const revalidate = 18000;
export const dynamic = 'force-static';

export default Page;
