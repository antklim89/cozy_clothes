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
    </div>
  );
};

export default HomePage;
