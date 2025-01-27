import type { Metadata } from 'next';
import { About } from '@/components/layout/about';


export const metadata: Metadata = {
  title: {
    default: 'Cozy Clothes',
    template: '&s | About',
  },
};

function AboutPage() {
  return <About />;
}

export default AboutPage;
