import { ProductsList, Testimonials } from '@/components/feature';
import { Hero } from '@/components/layout';

const HomePage = () => {
  return (
    <div>
      <Hero />
      <ProductsList className="my-8" limit={8} />
      <Testimonials />
    </div>
  );
};

export default HomePage;
