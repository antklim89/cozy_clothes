import { ProductsList, Testimonials } from '@/components/feature';
import { CategoriesNavBar, Hero } from '@/components/layout';
import { productsLoader } from '@/lib/contentLoaders';

const HomePage = async () => {
  const products = await productsLoader();

  const newSortedProducts = products.slice(0, 8);
  const discountSortedProducts = products.toSorted((a, b) => b.discount - a.discount).slice(0, 8);

  return (
    <div>
      <Hero />
      <CategoriesNavBar className="my-4" />
      <h2 className="prose text-center text-2xl mt-4 font-bold">New products</h2>
      <ProductsList products={newSortedProducts} className="my-8" />
      <Testimonials />
      <h2 className="prose text-center text-2xl mt-4 font-bold">Big discounts</h2>
      <ProductsList products={discountSortedProducts} className="my-8" />
    </div>
  );
};

export default HomePage;
