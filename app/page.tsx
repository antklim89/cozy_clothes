import { ProductsList } from '@/components/feature';
import { Hero } from '@/components/layout';

const HomePage = () => {
  return (
    <div>
      <Hero />
      <ProductsList className="my-8" limit={8} />
    </div>
  );
};

export default HomePage;
