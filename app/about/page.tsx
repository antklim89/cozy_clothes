import { About } from '@/components/layout/about';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    default: 'Cozy Clothes',
    template: '&s | About',
  },
};

const AboutPage = () => {
  return <About />;
};

export default AboutPage;
