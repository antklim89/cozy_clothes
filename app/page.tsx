import { ProductsList } from '@/components/feature';
import { Hero } from '@/components/layout';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    default: 'Cozy Clothes',
    template: '&s | Home',
  },
};

const HomePage = () => {
  return (
    <div>
      <Hero />
      <ProductsList className="my-8" limit={8} />
    </div>
  );
};

export default HomePage;
