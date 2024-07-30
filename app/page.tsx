import { ProductsList, Testimonials } from '@/components/feature';
import { Hero } from '@/components/layout';
import { productsLoader } from '@/lib/contentLoaders';

const HomePage = async () => {
  const products = (await productsLoader()).slice(0, 8);

  return (
    <div>
      <Hero />
      <h2 className="prose text-center text-2xl mt-4 font-bold">New products</h2>
      <ProductsList products={products} className="my-8" />
      <Testimonials />
    </div>
  );
};

export default HomePage;
