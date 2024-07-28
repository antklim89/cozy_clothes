import { ProductsList, Testimonials } from '@/components/feature';
import { Hero } from '@/components/layout';

const HomePage = () => {
  return (
    <div>
      <Hero />
      <h2 className="prose text-center text-2xl mt-4 font-bold">New products</h2>
      <ProductsList className="my-8" limit={8} />
      <Testimonials />
    </div>
  );
};

export default HomePage;
