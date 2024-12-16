import { CategoriesNavBar } from '@/components/feature/categories-nav-bar';
import { ProductsList } from '@/components/feature/products-list';
import { Contacts } from '@/components/layout/contacts';
import { Hero } from '@/components/layout/hero';
import { Testimonials } from '@/components/layout/testimonials';
import { productsLoader } from '@/lib/contentLoaders';
import Script from 'next/script';


async function HomePage() {
  const products = await productsLoader();

  const newSortedProducts = products.slice(0, 8);
  const discountSortedProducts = products.toSorted((a, b) => b.discount - a.discount).slice(0, 8);

  return (
    <div>
      <Hero />
      <CategoriesNavBar className="my-4" />
      <h2 className="prose text-center text-2xl mt-4 font-bold">New products</h2>
      <ProductsList className="my-8" products={newSortedProducts} />
      <Testimonials />
      <h2 className="prose text-center text-2xl mt-4 font-bold">Big discounts</h2>
      <ProductsList className="my-8" products={discountSortedProducts} />
      <Contacts />
      <Script src="https://identity.netlify.com/v1/netlify-identity-widget.js" />
    </div>
  );
}

export default HomePage;
